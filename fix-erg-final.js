const fs = require('fs');
const path = require('path');

// Fix 1: ErgoPaymentPage.jsx
const ergoPath = path.join(__dirname, 'src', 'ErgoPaymentPage.jsx');
let ergoContent = fs.readFileSync(ergoPath, 'utf8');

const ergoOld = `        // Redirect to account creation page after 2 seconds
        setTimeout(() => {
            navigate(\`/create-account?payment_id=\${txId}&type=ergo\`);
        }, 2000);`;

const ergoNew = `        // Generate temporary email for ERG payments  
        const tempEmail = \`\${txId.substring(0, 12)}@temp.ergo\`;

        // Redirect to account creation page after 2 seconds
        setTimeout(() => {
            navigate(\`/create-account?payment_id=\${txId}&type=ergo&email=\${encodeURIComponent(tempEmail)}\`);
        }, 2000);`;

if (ergoContent.includes(ergoOld)) {
    ergoContent = ergoContent.replace(ergoOld, ergoNew);
    fs.writeFileSync(ergoPath, ergoContent);
    console.log('✅ Fixed ErgoPaymentPage.jsx');
} else {
    console.log('⚠️ Could not find pattern in ErgoPaymentPage.jsx (might already be fixed)');
}

// Fix 2: CreateAccountPage.jsx
const accountPath = path.join(__dirname, 'src', 'pages', 'CreateAccountPage.jsx');
let accountContent = fs.readFileSync(accountPath, 'utf8');

// Fix readOnly
if (accountContent.includes('readOnly={true}')) {
    accountContent = accountContent.replace('readOnly={true}', "readOnly={paymentType === 'stripe'}");
    console.log('✅ Fixed readOnly in CreateAccountPage.jsx');
}

// Fix className
const classOld = 'cursor-not-allowed opacity-75';
const classNew = "${paymentType === 'stripe' ? 'cursor-not-allowed opacity-75' : ''}";

if (accountContent.includes(classOld) && !accountContent.includes(classNew)) {
    accountContent = accountContent.replace(classOld, classNew);
    console.log('✅ Fixed className in CreateAccountPage.jsx');
}

fs.writeFileSync(accountPath, accountContent);
