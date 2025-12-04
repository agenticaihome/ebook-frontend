$chapters = @("Chapter7.jsx", "Chapter8.jsx", "Chapter9.jsx", "Chapter10.jsx",  "Chapter11.jsx", "Chapter13.jsx", "Chapter14.jsx", "Chapter15.jsx", "Chapter16.jsx")

$basePath = "c:\Users\natha\OneDrive\Desktop\frontend\ebook-frontend\src\pages\chapters"

foreach ($chapter in $chapters) {
    $file = Join-Path $basePath $chapter
    
    Write-Host "Checking $chapter for duplicate PasswordGate tags..."
    
    # Read file
    $content = Get-Content $file -Raw
    
    # Remove duplicate closing PasswordGate tags
    # Pattern: </PasswordGate>\r\n\r\n                </PasswordGate>
    if ($content -match "</PasswordGate>\r\n\r\n\s+</PasswordGate>") {
        $content = $content -replace "</PasswordGate>\r\n\r\n\s+</PasswordGate>", "</PasswordGate>"
        Write-Host "  Removed duplicate closing tag from $chapter"
        Set-Content $file -Value $content -NoNewline
    } else {
        Write-Host "  No duplicates found in $chapter"
    }
}

Write-Host "`nCleanup complete!"
