## Spacexl-api
### Author: Nenad Kostic

This is example api.

This API is publicly exposed on heroku free tier: https://spacexl-api.herokuapp.com/

Demo of the app that consumes this api is publicly available on Netlify: https://spacexl.netlify.com/

Demo app source is available on github: https://github.com/nkostic/spacexl-ui

#### Spin up the backend locally with docker-compose 
This command will download required dependencies, bootstrap node api and initialize db. 
API will be exposed on port 3001 and db on port 5432.

Configuration can be found in docker-compose.yaml located in the root of this repo.
```sh
docker-compose up -d
```
This command will stop all containers
```sh
docker-compose stop
```
This command will stop and destroy all containers
```sh
docker-compose down
```

#### Seeding
```sh
npm run seed
```

#### Testing 
Make sure you db is running for this integration tests to pass
```sh
npm run test

# to exit test control c on mac, ctrl c on windows 
```

#### Develop with
```sh
npm run dev
# nodemon will reload the server on file save
```

