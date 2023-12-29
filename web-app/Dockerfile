# https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-create-from-base
# https://gallery.ecr.aws/lambda/nodejs
FROM public.ecr.aws/lambda/nodejs:18.2023.12.22.14-x86_64
# TODO: Remove the next line when the AWS Node.js image is upgraded to use npm v10.
RUN npm i -g npm
COPY . ${LAMBDA_TASK_ROOT}
RUN npm ci
# UNSAFE: Enable legacy OpenSSL provider to allow migration from Node.js v16.
ENV OPENSSL_MODULES=/var/lang/lib/ossl-modules
CMD ["lambda/index.handler"]
