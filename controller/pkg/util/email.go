package util

import (
	"bytes"
	"image"
	"image/png"
	"log"
	"os"
	"time"

	mail "github.com/xhit/go-simple-mail/v2"
)

// SendMail sends an email.
func SendEmail(name, recipientEmail, qrImgName string, qrCode []byte) error {
	img, _, err := image.Decode(bytes.NewReader(qrCode))
	if err != nil {
		log.Fatalln(err)
	}

	out, _ := os.Create("./" + qrImgName + ".png")
	defer out.Close()

	err = png.Encode(out, img)
	if err != nil {
		log.Println(err)
	}

	htmlBody :=
		`<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Iamza Cornerstone Issuer</title>
	</head>
	<body>
		<p>Hi ` + name + `</p>
		<p>Please scan the following <b>QR Code</b> with you wallet app to get your <b>Cornerstone Credential</b>: <br/><br/><img src="cid:` + qrImgName + `.png" alt="QR Code" /></p>
		<p>Regards<br/>Iamza Cornerstone Issuer</p>
	</body>
</html>`

	server := mail.NewSMTPClient()

	//SMTP Server
	server.Host = "smtp.gmail.com"
	// server.Host = "smtp.office365.com"
	server.Port = 587
	server.Username = "imtiyaazleslie@gmail.com"
	// server.Username = "aws_iamzanet@bankservafrica.com"
	server.Password = "bxhiglfjowsgpwyj"
	server.Encryption = mail.EncryptionSTARTTLS

	//Variable to keep alive connection
	server.KeepAlive = true

	//Timeout for connect to SMTP Server
	server.ConnectTimeout = 10 * time.Second

	//Timeout for send the data and wait respond
	server.SendTimeout = 10 * time.Second

	//SMTP client
	smtpClient, err := server.Connect()

	if err != nil {
		log.Fatal(err)
	}

	//New email simple html with inline and CC
	email := mail.NewMSG()

	email.SetFrom("imtiyaazleslie@gmail.com").
		// email.SetFrom("aws_iamzanet@bankservafrica.com").
		AddTo(recipientEmail).
		// AddCc("otherto@example.com").
		SetSubject("Get your Cornerstone Credential")

	email.SetBody(mail.TextHTML, htmlBody)

	email.Attach(&mail.File{FilePath: "./" + qrImgName + ".png", Inline: true})

	// always check error after send
	if email.Error != nil {
		log.Fatal(email.Error)
	}

	// Call Send and pass the client
	err = email.Send(smtpClient)
	if err != nil {
		log.Println(err)
	} else {
		log.Println("Email Sent")
	}

	return nil
}
