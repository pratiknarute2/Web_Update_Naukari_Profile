const fs = require('fs');
const path = require('path');

class CustomReporter {
  constructor() {
    this.logFilePath = path.join(__dirname, 'test-log.txt');
    fs.writeFileSync(this.logFilePath, 'Test Execution Logs:\n'); // Clear log file at start
    this.logMessage('Custom Reporter Initialized');
  }

  logMessage(message) {
    const separator = '*'.repeat(100);
    const fullMessage = `${separator}\n${message}\n${separator}`;

    process.stdout.write(fullMessage + '\n'); // Immediate output
    fs.appendFileSync(this.logFilePath, message + '\n');
  }

  onBegin(config, suite) {
    this.logMessage(`Starting the test run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test) {
    this.logMessage(`Starting test: ${test.title}`);
  }

  onTestEnd(test, result) {
    this.logMessage(`Test "${test.title}" finished with status: ${result.status}`);

    // Attach log file to test result
    result.attachments = result.attachments || [];
    result.attachments.push({
      name: 'Custom Log',
      path: this.logFilePath,
      contentType: 'text/plain'
    });
  }

  onEnd(result) {
    this.logMessage(`Test run finished with status: ${result.status}`);
  }
}

module.exports = CustomReporter;
