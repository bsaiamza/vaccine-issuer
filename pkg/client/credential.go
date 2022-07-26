package client

import (
	"vaccine_issuer/pkg/log"
	"vaccine_issuer/pkg/models"
)

func (c *Client) ListCredentialRecords() (models.ListCredentialRecordsResponse, error) {
	var credentialRecords models.ListCredentialRecordsResponse

	arg := models.AcapyGetRequest{
		Endpoint: "/issue-credential/records",
		Response: &credentialRecords,
	}

	err := c.get(arg)
	if err != nil {
		log.Error.Printf("Failed on ACA-py /issue-credential/records: %s", err.Error())
		return models.ListCredentialRecordsResponse{}, err
	}
	return credentialRecords, nil
}

func (c *Client) IssueCredential(request models.IssueCredentialRequest) (models.IssueCredentialResponse, error) {
	var credential models.IssueCredentialResponse

	arg := models.AcapyPostRequest{
		Endpoint: "/issue-credential/send",
		Body:     request,
		Response: &credential,
	}

	err := c.post(arg)
	if err != nil {
		log.Error.Printf("Failed on ACA-py /issue-credential/send: %s", err.Error())
		return models.IssueCredentialResponse{}, err
	}
	return credential, nil
}

func (c *Client) CreateCredential(request models.CreateCredentialRequest) (models.IssueCredentialResponse, error) {
	var credential models.IssueCredentialResponse

	arg := models.AcapyPostRequest{
		Endpoint: "/issue-credential/create",
		Body:     request,
		Response: &credential,
	}

	err := c.post(arg)
	if err != nil {
		log.Error.Printf("Failed on ACA-py /issue-credential/create: %s", err.Error())
		return models.IssueCredentialResponse{}, err
	}
	return credential, nil
}
