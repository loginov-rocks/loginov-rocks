# https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-create-from-base
# https://gallery.ecr.aws/lambda/nodejs
FROM public.ecr.aws/lambda/nodejs:16.2022.10.26.07-x86_64
COPY . ${LAMBDA_TASK_ROOT}
RUN npm ci
CMD ["lambda/index.handler"]
