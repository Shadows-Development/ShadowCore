const fs = require('fs');
const path = require('path');

const cliJsPath = path.join(__dirname, '../dist/cli/cli.js');
const shebang = '#!/usr/bin/env node\n';

fs.readFile(cliJsPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading cli.js:', err);
    return;
  }

  if (!data.startsWith(shebang)) {
    fs.writeFile(cliJsPath, shebang + data, 'utf8', (err) => {
      if (err) {
        console.error('Error adding shebang to cli.js:', err);
      } else {
        console.log('Shebang added to cli.js');
      }
    });
  }
});
