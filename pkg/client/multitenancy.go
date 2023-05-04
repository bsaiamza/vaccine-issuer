package client

import (
	"fmt"

	"vaccine_issuer/pkg/log"
	"vaccine_issuer/pkg/models"
)

func (c *Client) GetToken(walletID string, request models.GetTokenRequest) (models.GetTokenResponse, error) {
	endpoint := fmt.Sprintf("/multitenancy/wallet/%s/token", walletID)
	var token models.GetTokenResponse

	arg := models.AcapyPostRequest{
		Endpoint: endpoint,
		Body:     request,
		Response: &token,
	}

	err := c.post(arg, "")
	if err != nil {
		log.Error.Printf("Failed on ACA-py /multitenancy/wallet/{wallet_id}/token: %s", err.Error())
		return models.GetTokenResponse{}, err
	}
	return token, nil
}
