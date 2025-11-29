const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../public/assets');
const files = fs.readdirSync(assetsDir);

files.forEach(file => {
    if (file.endsWith('.png')) {
        const inputPath = path.join(assetsDir, file);
        const outputPath = path.join(assetsDir, file.replace('.png', '.webp'));

        sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath)
            .then(info => {
                console.log(`Converted ${file} to WebP: ${info.size} bytes`);
            })
            .catch(err => {
                console.error(`Error converting ${file}:`, err);
            });
    }
});
