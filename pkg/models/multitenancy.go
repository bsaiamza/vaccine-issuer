package models

type GetTokenRequest struct {
	WalletKey string `json:"wallet_key"`
}

type GetTokenResponse struct {
	Token string `json:"token"`
}
