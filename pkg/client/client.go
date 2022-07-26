package client

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"io/ioutil"
	"net/http"
	"strings"
	"time"

	"vaccine_issuer/pkg/log"
	"vaccine_issuer/pkg/models"
)

type Client struct {
	acapyURL string
	apiKey   string
	client   http.Client
}

func NewClient(acapyURL string) *Client {
	t := http.DefaultTransport.(*http.Transport).Clone()
	t.MaxIdleConns = 100
	t.MaxConnsPerHost = 100
	t.MaxIdleConnsPerHost = 100

	client := http.Client{
		Timeout:   10 * time.Second,
		Transport: t,
	}

	return &Client{
		acapyURL: strings.TrimRight(acapyURL, "/"),
		client:   client,
	}
}

func (c *Client) post(arg models.AcapyPostRequest) error {
	requestArgs := models.AcapyRequest{
		Method:         http.MethodPost,
		URL:            c.acapyURL + arg.Endpoint,
		QueryParams:    arg.QueryParams,
		Body:           arg.Body,
		ResponseObject: arg.Response,
	}

	return c.acapyRequest(requestArgs)
}

func (c *Client) get(arg models.AcapyGetRequest) error {
	requestArgs := models.AcapyRequest{
		Method:         http.MethodGet,
		URL:            c.acapyURL + arg.Endpoint,
		QueryParams:    arg.QueryParams,
		ResponseObject: arg.Response,
	}

	return c.acapyRequest(requestArgs)
}

func (c *Client) acapyRequest(arg models.AcapyRequest) error {
	input := inputReader(arg.Body)

	request, err := http.NewRequest(arg.Method, arg.URL, input)
	if err != nil {
		return err
	}

	if c.apiKey != "" {
		request.Header.Add("X-API-KEY", c.apiKey)
	}
	request.Header.Add("Content-Type", "application/json")

	q := request.URL.Query()
	for k, v := range arg.QueryParams {
		if k != "" && v != "" {
			q.Add(k, v)
		}
	}
	request.URL.RawQuery = q.Encode()

	response, err := c.client.Do(request)
	if err != nil || response.StatusCode >= 300 {
		if response != nil {
			log.Error.Printf("ACA-py Request failed: %s", response.Status)
			if body, err := ioutil.ReadAll(response.Body); err != nil {
				log.Error.Printf("ACA-py Response body: %s", body)
			}
			return errors.New("ACA-py Request failed " + err.Error())
		}
		return err
	}
	defer response.Body.Close()

	if arg.ResponseObject != nil {
		err = json.NewDecoder(response.Body).Decode(arg.ResponseObject)
		if err != nil {
			return err
		}
	}
	return nil
}

func inputReader(body interface{}) io.Reader {
	var input io.Reader
	if body != "" {
		jsonInput, err := json.Marshal(body)
		if err != nil {
			return nil
		}
		input = bytes.NewReader(jsonInput)
	}

	return input
}
