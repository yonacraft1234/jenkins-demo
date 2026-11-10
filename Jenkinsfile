pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Docker Build') {
            steps {
                sh 'docker buildx buiild -t jenkins-demo:${BUILD_NUMBER} .'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success { 
            sh 'docker rmi jenkins-demo:${BUILD_NUMBER}'
        }
    }
}
