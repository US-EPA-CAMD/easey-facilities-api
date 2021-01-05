# `EASEY Facilities API`
[![GitHub](https://img.shields.io/github/license/US-EPA-CAMD/easey-facilities-api)](https://github.com/US-EPA-CAMD/easey-facilities-api/blob/develop/LICENSE.md)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=US-EPA-CAMD_easey-facilities-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=US-EPA-CAMD_easey-facilities-api)
[![Develop Branch Pipeline](https://github.com/US-EPA-CAMD/easey-facilities-api/workflows/Develop%20Branch%20Workflow/badge.svg)](https://github.com/US-EPA-CAMD/easey-facilities-api/actions)<br>
Facilities data API for the EPA CAMD Business Systems EASEY Application

The facilities API endpoint returns a list of all the regulated facilities. Each facility in the list includes attributes such as the location, monitoring configurations, associated units, and contacts.
​
## Getting Started
​
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to set up the following in order to access the database:
- Environment variables
- Cloud.gov SSH tunnel

**Environment Variables**

Please reach out to an EPA tech lead (see Mike Heese or Jason Whitehead) to get the values for these variables:

- EASEY_DB_HOST
- EASEY_DB_NAME
- EASEY_DB_PORT
- EASEY_DB_PWD
- EASEY_DB_USER

These are to be used for developmental purposes only. 

**Cloud.gov SSH tunnel**

1. Log into cloud.gov
2. Go to https://login.fr.cloud.gov/passcode 
3. Enter in the temporary token code from your authentication app (Google Authenticator) to recieve a temporary authentication code
3. In your terminal input the following:
```bash
cf login -a api.fr.cloud.gov --sso
```
4. Type in the authenthication code recieved earlier
5. Target the development org (you will need to be granted permission for access to this):
```bash
cf target -o <ORGNAME> -s dev
```
6. Open SSH tunnel
7. Keep the SSH tunnel open while running the application

### Installing
1. Open your terminal and navigate to the directory you wish to store this repository.

2. Clone this repository

    ```shell
    # If using SSH
    git clone git@github.com:US-EPA-CAMD/easey-facilities-api.git
    
    # If using HTTPS
    git clone https://github.com/US-EPA-CAMD/easey-facilities-api.git
    ```

3. Navigate to the root project directory

    ```
    cd easey-facilities-api
    ```

4. Install dependencies 
    
    ```
    npm install
    ```
### Run the appication 

From within the `easey-facilities-api` project directory, you can run:

```bash
# Runs the api in the development mode
npm run start:dev
```

Open [http://localhost:8080/api/facility-mgmt/swagger/](http://localhost:8080/api/facility-mgmt/swagger/) to view swagger documentation.
> NOTE: The port can be changed by setting the EASEY_FACILITY_MGMT_API_PORT environment variable

The page will reload if you make edits via the use of nodemon.<br />
You will also see any lint errors in the console.

```bash
# for production mode
npm run start
```

### Run the tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## API Endpoints

**Facilities** 
### GET /api/facility-mgmt/facilities
Gets all facilities. 

Parameters:
Name | Required | Type | Path/Query
-- | -- | -- | --
page | optional | number | query
perPage | optional | number | query
orderBy | optional | string | query
state | optional | string | query
region | optional | string | query
<br />

### GET /api/facility-mgmt/facilities/{id}
Gets facility by specified id. 

Parameters:
Name | Required | Type | Path/Query
-- | -- | -- | --
id | required | number | path
<br />

### GET /api/facility-mgmt/facilities/{id}/units
Gets all units for specified facility. 

Parameters:

Name | Required | Type | Path/Query
-- | -- | -- | --
id | required | number | path
<br />

## Built With
​
[NestJS](https://nestjs.com/) - server-side Node.js framework

cloud.gov - Platform as a Service (PaaS)
​ 
​
## License
​
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details





