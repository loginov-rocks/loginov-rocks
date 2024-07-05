# https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-create-from-base
# https://gallery.ecr.aws/lambda/nodejs
FROM public.ecr.aws/lambda/nodejs:20.2024.07.04.12-x86_64
COPY . ${LAMBDA_TASK_ROOT}
RUN npm ci
# UNSAFE: Enable legacy OpenSSL provider to allow migration from Node.js v16.
ENV OPENSSL_MODULES=/var/lang/lib/ossl-modules
CMD ["lambda/index.handler"]
