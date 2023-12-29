# Development

## Without Docker

```sh
node lambda/without-docker
```

## With Docker

### Build

```sh
docker build -t loginov-rocks-persistent-web-app-repository .
```

### Run

```sh
docker run --env-file .env -p 9000:8080 loginov-rocks-persistent-web-app-repository
```

### Test

```sh
curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
```

### Enter container

```sh
docker ps
docker exec -it <CONTAINER ID> bash
```

## Reference

* [Running Gatsby in an AWS Lambda](https://www.jameshill.dev/articles/running-gatsby-within-aws-lambda/)
* [Creating Lambda container images](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html)
* [Creating Lambda functions defined as container images](https://docs.aws.amazon.com/lambda/latest/dg/configuration-images.html)
