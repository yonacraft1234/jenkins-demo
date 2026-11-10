pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Docker Build') {
            steps {
                bat "docker buildx build -t jenkins-demo:${env.BUILD_NUMBER} ."
            }
        }
    }

    post {
        failure {
            checkout scm
            withCredentials([usernamePassword(credentialsId: 'jenkins-api-token', usernameVariable: 'JENKINS_USER', passwordVariable: 'JENKINS_TOKEN')]) {
                aiAgent(
                    agent: omp(),
                    yoloMode: true,
                    prompt: """You are running as a Jenkins post-failure step for build #${env.BUILD_NUMBER} of job '${env.JOB_NAME}'.
The build URL is ${env.BUILD_URL} and the branch under test is '${env.BRANCH_NAME}'.

Mission, in order:
1. Read the build console log: curl -s -u "\$JENKINS_USER:\$JENKINS_TOKEN" ${env.BUILD_URL}consoleText — do NOT print the credentials.
2. Classify the failure as one of: codebase / dockerfile / jenkinsfile (if ambiguous, say so and pick the most likely).
3. Locate the exact file and cause of the error.
4. Make sure you are on the branch this build ran on (git checkout the branch; create a local tracking branch if detached).
5. Edit and fix the error with the minimal change that makes the Docker build pass.
6. Commit and push the fix to that same branch. If the fix is major (schema/data changes, deleting code, rewriting pipeline logic, touching secrets, or changing behavior beyond making the build green), STOP: do not commit or push; print a clear summary of the proposed changes and exit — a human will review and re-run. For small, obvious fixes, commit and push without asking.

Rules: never force-push, never push to a different branch, never commit secrets, keep the diff minimal. If you cannot determine a safe fix, say so and exit without pushing."""
                )
            }
        }
        success {
            bat "docker rmi jenkins-demo:${env.BUILD_NUMBER}"
        }
        cleanup {
            cleanWs()
        }
    }
}
