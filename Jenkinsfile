pipeline {
    agent any
    
    tools {
        nodejs 'Node16' // Configure this in Jenkins Global Tool Configuration
    }
    
    environment {
        CI = 'true'
        NODE_ENV = 'test'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci --no-audit'
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Clean Previous Results') {
            steps {
                sh 'npm run test:clean || echo "Clean command might have failed but continuing"'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm run test:run'
            }
            
            post {
                always {
                    junit 'playwright-reports/report.xml'
                    archiveArtifacts artifacts: 'test-results/artifacts/**/*', allowEmptyArchive: true
                }
            }
        }
        
        stage('Generate Reports') {
            steps {
                publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-reports/html-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
            }
        }
    }
    
    post {
        always {
            echo "Build completed: ${currentBuild.currentResult}"
        }
    }
}