const fs = require('fs');
const path = require('path');

// Configuration
const ROUTES_FILE = path.join(__dirname, '../src/config/routes.js');
const SRC_DIR = path.join(__dirname, '../src');

console.log('🔍 Starting Route Validation...');
console.log(`📂 Checking routes in: ${ROUTES_FILE}`);

try {
    const content = fs.readFileSync(ROUTES_FILE, 'utf8');

    // Regex to find dynamic imports: import('../path/to/file')
    // Matches both single and double quotes
    const importRegex = /import\s*\(['"]([^'"]+)['"]\)/g;

    let match;
    let totalRoutes = 0;
    let brokenRoutes = 0;

    while ((match = importRegex.exec(content)) !== null) {
        totalRoutes++;
        const relativeImportPath = match[1];

        // Resolve the absolute path
        // The import is relative to src/config/routes.js
        // So we join the dir of routes.js with the import path
        const absolutePath = path.resolve(path.dirname(ROUTES_FILE), relativeImportPath);

        // We need to check if it exists with .js or .jsx extension since imports might omit it
        let exists = false;
        let actualPath = absolutePath;

        if (fs.existsSync(absolutePath)) {
            exists = true;
        } else if (fs.existsSync(`${absolutePath}.js`)) {
            exists = true;
            actualPath = `${absolutePath}.js`;
        } else if (fs.existsSync(`${absolutePath}.jsx`)) {
            exists = true;
            actualPath = `${absolutePath}.jsx`;
        } else if (fs.existsSync(path.join(absolutePath, 'index.js'))) {
            exists = true;
            actualPath = path.join(absolutePath, 'index.js');
        }

        if (exists) {
            console.log(`✅ OK: ${relativeImportPath}`);
        } else {
            console.error(`❌ MISSING: ${relativeImportPath}`);
            console.error(`   -> Expected at: ${absolutePath}.(js|jsx)`);
            brokenRoutes++;
        }
    }

    console.log('\n-----------------------------------');
    console.log(`📊 Validation Complete.`);
    console.log(`Total Routes Checked: ${totalRoutes}`);
    console.log(`Broken Routes: ${brokenRoutes}`);

    if (brokenRoutes > 0) {
        console.error('⚠️  Route validation FAILED.');
        process.exit(1);
    } else {
        console.log('🎉 All routes are valid!');
        process.exit(0);
    }

} catch (err) {
    console.error('Error reading routes file:', err);
    process.exit(1);
}
