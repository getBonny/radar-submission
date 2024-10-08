const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'src', 'db', 'schema');
const targetDir = path.join(__dirname, '..', '..', 'api-types', 'schema');

// Create the target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Read all files in the source directory
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Error reading source directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.ts') && file !== 'schema.ts') {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      // Copy the file
      fs.copyFile(sourcePath, targetPath, err => {
        if (err) {
          console.error(`Error copying ${file}:`, err);
        } else {
          console.log(`Copied ${file} successfully.`);
        }
      });
    }
  });
});

// Copy schema.ts separately
const schemaSourcePath = path.join(__dirname, '..', 'src', 'db', 'schema.ts');
const schemaTargetPath = path.join(targetDir, '..', 'index.ts');

fs.copyFile(schemaSourcePath, schemaTargetPath, err => {
  if (err) {
    console.error('Error copying schema.ts:', err);
  } else {
    console.log('Copied schema.ts successfully.');
  }
});