package client

import (
	"vaccine_issuer/pkg/log"
	"vaccine_issuer/pkg/models"
)

func (c *Client) ListCredentialRecords(token string) (models.ListCredentialRecordsResponse, error) {
	var credentialRecords models.ListCredentialRecordsResponse

	arg := models.AcapyGetRequest{
		Endpoint: "/issue-credential/records",
		Response: &credentialRecords,
	}

	err := c.get(arg, token)
	if err != nil {
		log.Error.Printf("Failed on ACA-py /issue-credential/records: %s", err.Error())
		return models.ListCredentialRecordsResponse{}, err
	}
	return credentialRecords, nil
}

func (c *Client) IssueCredential(token string, request models.IssueCredentialRequest) (models.IssueCredentialResponse, error) {
	var credential models.IssueCredentialResponse

	arg := models.AcapyPostRequest{
		Endpoint: "/issue-credential/send",
		Body:     request,
		Response: &credential,
	}

	err := c.post(arg, token)
	if err != nil {
		log.Error.Printf("Failed on ACA-py /issue-credential/send: %s", err.Error())
		return models.IssueCredentialResponse{}, err
	}
	return credential, nil
}

func (c *Client) CreateCredential(token string, request models.CreateCredentialRequest) (models.IssueCredentialResponse, error) {
	var credential models.IssueCredentialResponse

	arg := models.AcapyPostRequest{
		Endpoint: "/issue-credential/create",
		Body:     request,
		Response: &credential,
	}

	err := c.post(arg, token)
	if err != nil {
		log.Error.Printf("Failed on ACA-py /issue-credential/create: %s", err.Error())
		return models.IssueCredentialResponse{}, err
	}
	return credential, nil
}
