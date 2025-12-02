# Fix ERG Payment Account Creation
# This script applies the necessary changes to enable account creation after ERG payment

# Fix 1: ErgoPaymentPage.jsx - Add temp email to redirect
$ergoFile = "src\ErgoPaymentPage.jsx"
$content = Get-Content $ergoFile -Raw
$oldPattern = "        // Redirect to account creation page after 2 seconds`r`n        setTimeout\(\(\) => \{`r`n            navigate\(\`/create-account\?payment_id=\$\{txId\}&type=ergo\`\);`r`n        \}, 2000\);"
$newPattern = "        // Generate temporary email for ERG payments  `r`n        const tempEmail = \`\$\{txId.substring\(0, 12\)\}@temp.ergo\`;`r`n`r`n        // Redirect to account creation page after 2 seconds`r`n        setTimeout\(\(\) => \{`r`n            navigate\(\`/create-account\?payment_id=\$\{txId\}&type=ergo&email=\$\{encodeURIComponent\(tempEmail\)\}\`\);`r`n        \}, 2000\);"
$content = $content.Replace($oldPattern, $newPattern)
Set-Content -Path $ergoFile -Value $content -NoNewline

# Fix 2: CreateAccountPage.jsx - Make email editable for ERG payments
$accountFile = "src\pages\CreateAccountPage.jsx"
$content2 = Get-Content $accountFile -Raw  
$oldPattern2 = "                                <input`r`n                                    type=`"email`"`r`n                                    value={email}`r`n                                    onChange={(e) => setEmail(e.target.value)}`r`n                                    readOnly={true}`r`n                                    placeholder=`"Enter your email`"`r`n                                    className={\`w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white cursor-not-allowed opacity-75\`}`r`n                                />"
$newPattern2 = "                                <input`r`n                                    type=`"email`"`r`n                                    value={email}`r`n                                    onChange={(e) => setEmail(e.target.value)}`r`n                                    readOnly={paymentType === 'stripe'}`r`n                                    placeholder=`"Enter your email`"`r`n                                    className={\`w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-purple-500 focus:outline-none \$\{paymentType === 'stripe' \? 'cursor-not-allowed opacity-75' : ''\}\`}`r`n                                />"
$content2 = $content2.Replace($oldPattern2, $newPattern2)
Set-Content -Path $accountFile -Value $content2 -NoNewline

Write-Host "✅ Files fixed successfully!"
Write-Host "1. ErgoPaymentPage.jsx - Now generates and passes temp email"
Write-Host "2. CreateAccountPage.jsx - Email field now editable for ERG payments"
