package api

import (
	"encoding/json"
	"net/http"
	"os"
	"strconv"

	acapy "cornerstone_issuer/pkg/acapy_client"
	"cornerstone_issuer/pkg/config"
	"cornerstone_issuer/pkg/log"
	"cornerstone_issuer/pkg/models"
	"cornerstone_issuer/pkg/server"
	"cornerstone_issuer/pkg/util"

	"github.com/skip2/go-qrcode"
)

func prepareCornerstoneData(config *config.Config, acapyClient *acapy.Client, cache *util.BigCache) http.HandlerFunc {
	mdw := []server.Middleware{
		server.NewLogRequest,
	}

	return server.ChainMiddleware(prepareCornerstoneDataHandler(config, acapyClient, cache), mdw...)
}
func prepareCornerstoneDataHandler(config *config.Config, acapyClient *acapy.Client, cache *util.BigCache) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		header := w.Header()
		header.Add("Access-Control-Allow-Origin", config.GetClientURL())
		header.Add("Access-Control-Allow-Methods", "POST, OPTIONS")
		header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		if r.Method != http.MethodPost {
			log.Warning.Print("Incorrect request method!")
			w.WriteHeader(http.StatusMethodNotAllowed)
			res := server.Res{
				"success": false,
				"msg":     "Warning: Incorrect request method!",
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		defer r.Body.Close()

		log.Info.Println("Preparing credential data...")

		var data models.PrepareCornerstoneData
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			log.Error.Printf("Failed to decode credential data: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			res := server.Res{
				"success": false,
				"msg":     "Failed to decode credential data: " + err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		// Step 1: Validate ID number
		log.Info.Println("Validating ID number...")
		idNumber := data.IDNumber
		gender := data.Gender
		country := data.CountryOfBirth
		id, err := util.IDValidator(idNumber, gender, country)
		if err != nil {
			log.Error.Printf("ID validation failed: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			res := server.Res{
				"success": false,
				"msg":     "ID validation failed: " + err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}
		log.Info.Println("ID Validation passed")

		// Step 2: Call DHA API using ID number to get user data and compare
		log.Info.Println("Calling DHA API to get user data...")

		client := &http.Client{}
		req, err := http.NewRequest(http.MethodGet, "https://dhaapi.iamza-sandbox.com/redis/getIDRecord", nil)
		if err != nil {
			log.Error.Printf("Failed to create request for DHA API call: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			res := server.Res{
				"success": false,
				"msg":     "Failed to create request for DHA API call: " + err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		req.Header.Set("Content-Type", "application/json")

		// appending to existing query args
		q := req.URL.Query()
		q.Add("id", id)

		// assign encoded query string to http request
		req.URL.RawQuery = q.Encode()

		resp, err := client.Do(req)
		if err != nil {
			log.Error.Printf("Failed to get user data from DHA API: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			res := server.Res{
				"success": false,
				"msg":     "Failed to get user data from DHA API: " + err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		defer resp.Body.Close()

		var dhaData models.DhaData
		err = json.NewDecoder(resp.Body).Decode(&dhaData)
		if err != nil {
			log.Error.Printf("Failed to decode DHA data: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			res := server.Res{
				"success": false,
				"msg":     "Failed to decode DHA data: " + err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		subGender := string(data.Gender[0])
		dob := string(data.DateOfBirth[0:4]) + "/" + string(data.DateOfBirth[5:7]) + "/" + string(data.DateOfBirth[8:10])
		countryOfBirth := ""
		if data.CountryOfBirth == "South Africa" {
			countryOfBirth = "RSA"
		}

		// fmt.Println("IDs: " + dhaData.IDNumber + "-" + id)
		// fmt.Println("Names: " + dhaData.Forenames + "-" + data.Forenames)
		// fmt.Println("Surname: " + dhaData.Surname + "-" + data.Surname)
		// fmt.Println("Gender: " + dhaData.Gender + "-" + subGender)
		// fmt.Println("DOB: " + dhaData.DateOfBirth + "-" + dob)
		// fmt.Println("Country: " + dhaData.CountryOfBirth + "-" + countryOfBirth)

		if !(dhaData.IDNumber == id && dhaData.Forenames == data.Forenames && dhaData.Surname == data.Surname &&
			dhaData.Gender == subGender && dhaData.DateOfBirth == dob && dhaData.CountryOfBirth == countryOfBirth) {
			log.Error.Println("Failed: user data does not match DHA data!")
			w.WriteHeader(http.StatusInternalServerError)
			res := server.Res{
				"success": false,
				"msg":     "Failed: data does not match DHA data!",
			}
			json.NewEncoder(w).Encode(res)
			return
		}
		// fmt.Println(dhaData)

		// Step 3: Create invitation
		request := models.CreateInvitationRequest{}

		alias := r.URL.Query().Get("alias")
		autoAccept, _ := strconv.ParseBool(r.URL.Query().Get("auto_accept"))
		multiuse, _ := strconv.ParseBool(r.URL.Query().Get("multi_use"))
		public, _ := strconv.ParseBool(r.URL.Query().Get("public"))

		queryParams := models.CreateInvitationParams{
			Alias:      alias,
			AutoAccept: autoAccept,
			MultiUse:   multiuse,
			Public:     public,
		}

		invitation, err := acapyClient.CreateInvitation(request, &queryParams)
		if err != nil {
			log.Error.Printf("Failed to prepare cornerstone data: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			res := server.Res{
				"success": false,
				"msg":     "Failed to prepare cornerstone data: " + err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		// Step 4: Generate qr code
		qrCodePng, err := qrcode.Encode(invitation.InvitationURL, qrcode.Medium, 256)
		if err != nil {
			log.Warning.Print("Failed to create QR code: ", err)
			w.WriteHeader(http.StatusInternalServerError)
			res := server.Res{
				"success": false,
				"msg":     "Failed to create QR code: " + err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		// Step 5: Cache user data
		cornerstoneData := models.CornerstoneData{
			IDNumber:       data.IDNumber,
			Surname:        data.Surname,
			Forenames:      data.Forenames,
			Gender:         data.Gender,
			DateOfBirth:    data.DateOfBirth,
			CountryOfBirth: data.CountryOfBirth,
		}

		err = cache.UpdateDataCache(invitation.Invitation.RecipientKeys[0], cornerstoneData)
		if err != nil {
			log.Error.Printf("Failed to cache cornerstone data: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			res := server.Res{
				"success": false,
				"msg":     "Failed to cache cornerstone data: " + err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		// Step 6: Send email

		var prefix string
		if data.Gender == "Female" {
			prefix = "Ms/Mrs "
		}
		if data.Gender == "Male" {
			prefix = "Mr "
		}

		err = util.SendEmail(prefix+data.Surname, data.Email, invitation.Invitation.RecipientKeys[0], qrCodePng)
		if err != nil {
			log.Warning.Print("Failed to send credential email: ", err)
			w.WriteHeader(http.StatusInternalServerError)
			res := server.Res{
				"success": false,
				"msg":     "Failed to send credential email: " + err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		err = os.Remove("./" + invitation.Invitation.RecipientKeys[0] + ".png")
		if err != nil {
			log.Warning.Print("Failed to remove QR code: ", err)
			// w.WriteHeader(http.StatusInternalServerError)
			// res := server.Res{
			// 	"success": false,
			// 	"msg":     "Failed to remove QR code: " + err.Error(),
			// }
			// json.NewEncoder(w).Encode(res)
		}

		log.Info.Println("Cornerstone data prepared!")

		// w.Write(qrCodePng)
		// w.Header().Set("Content-Type", "image/png")
		res := server.Res{
			"success":    true,
			"credential": invitation.InvitationURL,
		}
		json.NewEncoder(w).Encode(res)
	}
}

func issueCredential(config *config.Config, acapyClient *acapy.Client, cache *util.BigCache) http.HandlerFunc {
	mdw := []server.Middleware{
		server.NewLogRequest,
	}

	return server.ChainMiddleware(issueCredentialHandler(config, acapyClient, cache), mdw...)
}
func issueCredentialHandler(config *config.Config, acapyClient *acapy.Client, cache *util.BigCache) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		header := w.Header()
		header.Add("Access-Control-Allow-Origin", config.GetClientURL())
		header.Add("Access-Control-Allow-Methods", "POST, OPTIONS")
		header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		if r.Method != http.MethodPost {
			log.Warning.Print("Incorrect request method!")
			w.WriteHeader(http.StatusMethodNotAllowed)
			res := server.Res{
				"success": false,
				"msg":     "Warning: Incorrect request method!",
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		defer r.Body.Close()

		var request models.Connection
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			log.Error.Printf("Fail to decode request body: %s", err)
			w.WriteHeader(http.StatusBadRequest)
			res := server.Res{
				"success": false,
				"msg":     "Failed to decode request body: " + err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		if request.State == "response" {
			if request.InvitationMode == "multi" {
				_, err := acapyClient.PingConnection(request.ConnectionID)
				if err != nil {
					log.Error.Printf("Failed to ping connection: %s", err)
					w.WriteHeader(http.StatusInternalServerError)
					res := server.Res{
						"success": false,
						"msg":     "Failed to ping connection: " + err.Error(),
					}
					json.NewEncoder(w).Encode(res)
					return
				}
			}

			_, err := acapyClient.PingConnection(request.ConnectionID)
			if err != nil {
				log.Error.Printf("Failed to ping connection: %s", err)
				w.WriteHeader(http.StatusInternalServerError)
				res := server.Res{
					"success": false,
					"msg":     "Failed to ping connection: " + err.Error(),
				}
				json.NewEncoder(w).Encode(res)
				return
			}

			cornerstoneData, err := cache.ReadDataCache(request.InvitationKey)
			if err != nil {
				log.Error.Printf("Failed to read cornerstone data: %s", err)
				w.WriteHeader(http.StatusInternalServerError)
				res := server.Res{
					"success": false,
					"msg":     "Failed to read cornerstone data: " + err.Error(),
				}
				json.NewEncoder(w).Encode(res)
				return
			}

			credDefID := config.GetCredDefID()
			if credDefID == "" {
				credDefID = "BER7WwiAMK9igkiRjPYpEp:3:CL:40479:cornerstone_1.2"
			}

			schemaID := config.GetSchemaID()
			if schemaID == "" {
				schemaID = "BER7WwiAMK9igkiRjPYpEp:2:Cornerstone_Credential:1.2"
			}

			schema, err := acapyClient.GetSchema(schemaID)
			if err != nil {
				log.Error.Printf("Failed to get schema: %s", err)
				w.WriteHeader(http.StatusInternalServerError)
				res := server.Res{
					"success": false,
					"msg":     "Failed to get schema: " + err.Error(),
				}
				json.NewEncoder(w).Encode(res)
				return
			}

			did := config.GetDID()
			if did == "" {
				publicDID, err := acapyClient.GetDID()
				if err != nil {
					log.Error.Printf("Failed to get DID: %s", err)
					w.WriteHeader(http.StatusInternalServerError)
					res := server.Res{
						"success": false,
						"msg":     "Failed to get DID: " + err.Error(),
					}
					json.NewEncoder(w).Encode(res)
					return
				}
				did = publicDID.Result.Did
			}

			issueCornerstoneCredentialRequest := models.IssueCornerstoneCredentialRequest{
				AutoRemove:      false,
				Comment:         "Cornerstone Credential for " + cornerstoneData.Forenames + " " + cornerstoneData.Surname,
				ConnectionID:    request.ConnectionID,
				CredDefID:       credDefID,
				IssuerDid:       did,
				SchemaID:        schemaID,
				SchemaIssuerDid: did,
				SchemaName:      schema.Schema.Name,
				SchemaVersion:   schema.Schema.Version,
				CredentialProposal: models.CredentialProposal{
					Type: "issue-credential/1.0/credential-preview",
					Attributes: []models.Attribute{
						{
							Name:  "IDNumber",
							Value: cornerstoneData.IDNumber,
						},
						{
							Name:  "Surname",
							Value: cornerstoneData.Surname,
						},
						{
							Name:  "Forenames",
							Value: cornerstoneData.Forenames,
						},
						{
							Name:  "Gender",
							Value: cornerstoneData.Gender,
						},
						{
							Name:  "DateOfBirth",
							Value: cornerstoneData.DateOfBirth,
						},
						{
							Name:  "CountryOfBirth",
							Value: cornerstoneData.CountryOfBirth,
						},
					},
				},
				Trace: false,
			}

			_, err = acapyClient.IssueCornerstoneCredential(issueCornerstoneCredentialRequest)
			if err != nil {
				log.Error.Printf("Failed to issue credential: %s", err)
				w.WriteHeader(http.StatusInternalServerError)
				res := server.Res{
					"success": false,
					"msg":     "Failed to issue credential: " + err.Error(),
				}
				json.NewEncoder(w).Encode(res)
				return
			}

			cache.DeleteDataCache(request.InvitationKey)

			log.Info.Println("Issued credential successfully!")

			w.WriteHeader(http.StatusOK)
			res := server.Res{
				"success": true,
				"msg":     "Issued credential successfully!",
			}
			json.NewEncoder(w).Encode(res)
			return
		}
	}
}

func listCredentials(config *config.Config, acapyClient *acapy.Client) http.HandlerFunc {
	mdw := []server.Middleware{
		server.NewLogRequest,
	}

	return server.ChainMiddleware(listCredentialsHandler(config, acapyClient), mdw...)
}
func listCredentialsHandler(config *config.Config, acapyClient *acapy.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		header := w.Header()
		header.Add("Access-Control-Allow-Origin", config.GetClientURL())
		header.Add("Access-Control-Allow-Methods", "GET, OPTIONS")
		header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		if r.Method != http.MethodGet {
			log.Warning.Print("Incorrect request method!")
			w.WriteHeader(http.StatusMethodNotAllowed)
			res := server.Res{
				"success": false,
				"msg":     "Warning: Incorrect request method!",
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		defer r.Body.Close()

		log.Info.Println("Listing credential requests...")

		connectionID := r.URL.Query().Get("connection_id")
		role := r.URL.Query().Get("role")
		state := r.URL.Query().Get("state")
		threadID := r.URL.Query().Get("thread_id")

		queryParams := models.ListCredentialRecordsParams{
			ConnectionID: connectionID,
			Role:         role,
			State:        state,
			ThreadID:     threadID,
		}

		exchangeRecords, err := acapyClient.ListCredentialRecords(&queryParams)
		if err != nil {
			log.Error.Printf("Failed to list credential requests: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
			res := server.Res{
				"success": false,
				"msg":     "Failed to list credential requests: " + err.Error(),
			}
			json.NewEncoder(w).Encode(res)
			return
		}

		log.Info.Print("Credential requests listed successfully!")

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(exchangeRecords.Results)
	}
}
