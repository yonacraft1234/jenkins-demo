pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Docker Build') {
            steps {
                bat 'docker buildx buiild -t jenkins-demo:${BUILD_NUMBER} .'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success { 
            bat 'docker rmi jenkins-demo:${BUILD_NUMBER}'
        }
    }
}
