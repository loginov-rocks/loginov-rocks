# Development

## Web App

* `npm start` - start in development mode
* `npm run build` - build in production mode
* `npm run serve` - serve production build
* `node lambda/without-docker` - test Lambda function code locally that builds and deploys Web App without Docker (make
sure to set up environment variables in the `.env` file, see `.env.example`)

### Docker

#### Build

```sh
docker build -t loginov-rocks-persistent-web-app-repository .
```

#### Run

```sh
docker run --env-file .env -p 9000:8080 loginov-rocks-persistent-web-app-repository
```

#### Test

```sh
curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```

#### Explore Container

```sh
docker ps
docker exec -it <CONTAINER ID> bash
```
