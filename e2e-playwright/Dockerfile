FROM mcr.microsoft.com/playwright:v1.40.0-focal

USER root

COPY . /e2e-playwright

WORKDIR /e2e-playwright

RUN npm install

CMD [ "npx", "playwright", "test", "--reporter=list" ]