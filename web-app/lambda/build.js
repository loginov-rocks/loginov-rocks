const { spawn } = require('child_process');

const build = (stdout, stderr) => new Promise((resolve, reject) => {
  const buildProcess = spawn('npm', ['run', 'build']);

  buildProcess.stdout.on('data', (data) => {
    stdout(data.toString());
  });

  buildProcess.stderr.on('data', (data) => {
    stderr(data.toString());
  });

  buildProcess.on('error', reject);

  buildProcess.on('close', resolve);
});

module.exports = build;
