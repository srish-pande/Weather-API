# Weather-API
This project makes a HTTP request (fetch) to a third party web API (REST) (using GET method). The API returns data in Json format from which the information is extracted using 'key' names from the Json. The script also handles errors for invalid locations and failed requests.

The web API used here is from weatherapi.com. It is free and easy to use. 

This is an extended versionof the AWS api project where a serverless api was developed and successfully hit. That was deployed using Lambda and API Gateway.

The API key used is deprecated because only a limited number of hits are possible per unique key. Hence, person willing to download and used this project would need to insert their own unique API key.
