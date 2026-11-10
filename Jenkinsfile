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
        always {
            cleanWs()
        }
        success { 
            bat "docker rmi jenkins-demo:${env.BUILD_NUMBER}"
        }
    }
}
