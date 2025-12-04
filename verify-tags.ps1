$chapters = @(
    "Chapter7.jsx", "Chapter8.jsx", "Chapter9.jsx",
    "Chapter10.jsx", "Chapter11.jsx",
    "Chapter13.jsx", "Chapter14.jsx", "Chapter15.jsx", "Chapter16.jsx"
)

$basePath = "c:\Users\natha\OneDrive\Desktop\frontend\ebook-frontend\src\pages\chapters"

Write-Host "=== PasswordGate Tag Verification ===" 
Write-Host ""

$allGood = $true

foreach ($chapter in $chapters) {
    $file = Join-Path $basePath $chapter
    $content = Get-Content $file -Raw
    
    $openingTags = ([regex]::Matches($content, '<PasswordGate partNumber={\d+}>') | Measure-Object).Count
    $closingTags = ([regex]::Matches($content, '</PasswordGate>') | Measure-Object).Count
    
    $status = if ($openingTags -eq 1 -and $closingTags -eq 1) { "✓ OK" } else { "✗ MISMATCH" }
    
    Write-Host "$chapter : Opening=$openingTags, Closing=$closingTags  $status"
    
    if ($openingTags -ne 1 -or $closingTags -ne 1) {
        $allGood = $false
    }
}

Write-Host ""
if ($allGood) {
    Write-Host "✅ All chapters have correct PasswordGate tags (1 opening, 1 closing each)"
}
else {
    Write-Host "❌ Some chapters have mismatched tags"
}
