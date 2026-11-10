# Jenkins Demo

A small Vite + JavaScript application used to demonstrate a Jenkins CI pipeline.

## Pipeline

The declarative `Jenkinsfile` runs Checkout, Install, Test, Build, and Docker Build stages. The Docker image is built locally as `jenkins-demo:<BUILD_NUMBER>`; it is not pushed to a registry.

## Run locally

Requires Node.js 22 or newer and npm.

```bash
npm install
npm test
npm run build
npm run dev
```

## Run with Docker

```bash
docker build -t jenkins-demo:local .
docker run --rm -p 8080:80 jenkins-demo:local
```

Open http://localhost:8080.

## Jenkins setup

Create a Pipeline job, configure this Git repository as its SCM, select **Pipeline script from SCM**, choose **Git**, and set the script path to `Jenkinsfile`.

The Jenkins agent needs Git, Node.js 22+, npm, and Docker CLI/daemon access. Configure the Jenkins NodeJS tool named `NodeJS-22` (or change the tool name in the Jenkinsfile). The Docker build stage requires permission to access the Docker daemon.
