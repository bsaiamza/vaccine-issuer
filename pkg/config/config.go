package config

import (
	"os"
)

type Config struct {
}

func LoadConfig() *Config {
	return &Config{}
}

func getEnvVarByName(name string) string {
	return os.Getenv(name)
}

func (c *Config) GetAcapyURL() string {
	return getEnvVarByName("ACAPY_URL")
}

func (c *Config) GetSchemaID() string {
	return getEnvVarByName("SCHEMA_ID")
}

func (c *Config) GetSchemaName() string {
	return getEnvVarByName("SCHEMA_NAME")
}

func (c *Config) GetSchemaVersion() string {
	return getEnvVarByName("SCHEMA_VERSION")
}

func (c *Config) GetCredDefID() string {
	return getEnvVarByName("CRED_DEF_ID")
}

func (c *Config) GetPublicDID() string {
	return getEnvVarByName("PUBLIC_DID")
}

func (c *Config) GetServerAddress() string {
	return getEnvVarByName("SERVER_ADDRESS")
}

func (c *Config) GetEmailUsername() string {
	return getEnvVarByName("EMAIL_USERNAME")
}

func (c *Config) GetEmailPassword() string {
	return getEnvVarByName("EMAIL_PASSWORD")
}

func (c *Config) GetSmtpServer() string {
	return getEnvVarByName("EMAIL_SMTP_SERVER")
}

func (c *Config) GetSmtpPort() string {
	return getEnvVarByName("EMAIL_SMTP_PORT")
}
