package models

type VaccineCredentialRequest struct {
	IDNumber             string `json:"id_number"`
	Forenames            string `json:"forenames"`
	Surname              string `json:"surname"`
	DOB                  string `json:"date_of_birth"`
	VaccineType          string `json:"vaccine_type"`
	VaccineDose          string `json:"vaccine_dose"`
	DateOfVaccination    string `json:"date_of_vaccination"`
	AdministeringCentre  string `json:"administering_centre"`
	CountryOfVaccination string `json:"country_of_vaccination"`
	NextVaccinationDate  string `json:"next_vaccination_date"`
	VaccineReceived      string `json:"vaccine_received"`
	ExpiryDate           string `json:"expiry_date"`
	Email                string `json:"email"`
}

// type VaccineCredentialRequest struct {
// 	Email                            string `json:"email"`
// 	IDNumber                         string `json:"id_number"`
// 	Surname                          string `json:"surname"`
// 	Forenames                        string `json:"forenames"`
// 	DiseaseOrGentTargeted            string `json:"disease_or_gent_targeted"`
// 	VaccineProphylaxis               string `json:"vaccine_prophylaxis"`
// 	VaccineMedicinalProduct          string `json:"vaccine_medicinal_product"`
// 	VaccinationMfgr                  string `json:"vaccination_mfgr"`
// 	OrderInCourse                    string `json:"order_in_course"`
// 	BatchLot                         string `json:"batch_lot"`
// 	DateOfVaccination                string `json:"date_of_vaccination"`
// 	AdministeringCentre              string `json:"administering_centre"`
// 	HealthProfessionalIdentification string `json:"healthProfessional_identification"`
// 	CountryOfVaccination             string `json:"country_of_vaccination"`
// 	NextVaccinationDate              string `json:"next_vaccination_date"`
// 	Serial                           string `json:"serial"`
// 	ExpiryDate                       string `json:"expiry_date"`
// }
