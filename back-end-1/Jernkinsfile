pipeline{
    agent any
    tools{
        maven "maven"

    }
    stages{
        stage("Build JAR File"){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions:[], userRemoteConfigs: [[url: 'https://github.com/NicolitoG/TingesoLab1']])
                dir ("back-end-1"){
                    bat "mvn clean install"
                }
            }
        }
        stage("Test"){
            steps{
                dir ("back-end-1"){
                    bat "mvn test"
                }
            }
        }
        stage("Build and Push Docker Image"){
            steps{
                dir ("back-end-1"){
                    script{
                        withDockerRegistry(credentialsId: 'docker-credentials'){
                            bat "docker build -t nicolitog/back-end-1 ."
                            bat "docker push nicolitog/back-end-1"
                        }
                    }
                }
            }
        }
    }
}