# Backend Application README
This repository contains the backend application for a RESTful API that fetch information from an external API (https://echo-serv.tbxnet.com), reformats it, and exposes it.

Getting Started
Prerequisites

    NodeJS 14


Install dependencies.

    $ npm install



## Usage
Starting the API

To start the API server, run the following command:

    bash npm start

The API will be available at http://localhost:3000.

API Endpoint

    Endpoint: GET /files/data
    Description: Retrieves and formats information from the external API according to the specified steps.
    Example:
        bash curl -X GET "http://localhost:3000/files/data" -H "accept: application/json"

    Response Format:
        The API response will be in JSON format and structured as follows:
        [
         {
            "file": "file1.csv",
            "lines": [
             {
              "text": "RgTya",
              "number": 64075909,
              "hex": "70ad29aacf0b690b0467fe2b2767f765"
             }
            ]
         }
        ]

## Testing
Running Tests

To execute tests using Mocha and Chai, use the following command:

    bash npm test