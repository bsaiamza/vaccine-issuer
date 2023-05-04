package main

import (
	"vaccine_issuer/api"
	"vaccine_issuer/pkg/client"
	"vaccine_issuer/pkg/config"
	"vaccine_issuer/pkg/log"
	"vaccine_issuer/pkg/server"
	"vaccine_issuer/pkg/utils"
)

func main() {
	runServer()
}

func runServer() {
	config := config.LoadConfig()
	acapyClient := client.NewClient(config.GetAcapyURL())
	cache := utils.NewBigCache()

	srv := server.NewServer().
		WithAddress(config.GetServerAddress()).
		WithRouter(api.NewRouter(config, acapyClient, cache)).
		WithErrorLogger(log.ServerError)

	go func() {
		log.ServerInfo.Println("--------------------------------")
		log.ServerInfo.Println("|		Vaccine Issuer		|")
		log.ServerInfo.Println("--------------------------------")
		log.ServerInfo.Println("")
		log.ServerInfo.Printf("Server started on: %s", config.GetServerAddress())
		if err := srv.Start(); err != nil {
			log.ServerError.Fatal(err)
		}
	}()

	utils.GracefulServerExit(func() {
		if err := srv.Stop(); err != nil {
			log.ServerError.Printf("Failed to stop server: %s", err.Error())
		}
	})
}
