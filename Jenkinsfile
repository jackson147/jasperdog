node {
    def app
    def props = readJSON file: 'package.json'
    def version = props['version']

    def remote = [:]
    remote.name = "dev-server"
    remote.host = "newlinkedlist.xyz"
    remote.allowAnyHosts = true


    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
        * docker build on the command line */

        app = docker.build("jackson147/jasperdog")
    }

    stage('Test image') {
        /* Ideally, we would run a test framework against our image.
        * For this example, we're using a Volkswagen-type approach ;-) */

        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        /* Finally, we'll push the image with two tags:
        * First, the incremental build number from Jenkins
        * Second, the 'latest' tag.
        * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push(version)
            app.push("latest")
        }
    }

    withCredentials([sshUserPrivateKey(credentialsId: '	dev-server', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
        remote.user = userName
        remote.identityFile = identity
        stage("Deploy") {
            sshCommand remote: remote, command: 'mkdir -p ./deployments/jasperdog/'
            sshPut remote: remote, from: 'docker-compose.yml', into: './deployments/jasperdog/' , override: true
            sshCommand remote: remote, command: 'docker stack rm jasperdog && sleep 3 && docker stack deploy -c ./deployments/jasperdog/docker-compose.yml jasperdog'
        }
    }
}