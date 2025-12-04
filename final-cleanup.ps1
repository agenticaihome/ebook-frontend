$chapters = @("Chapter7.jsx", "Chapter8.jsx", "Chapter9.jsx", "Chapter10.jsx", "Chapter11.jsx", "Chapter13.jsx", "Chapter14.jsx", "Chapter15.jsx")

$basePath = "c:\Users\natha\OneDrive\Desktop\frontend\ebook-frontend\src\pages\chapters"

foreach ($chapter in $chapters) {
    $file = Join-Path $basePath $chapter
    
    Write-Host "Checking $chapter for duplicate closing tags..."
    
    # Read file
    $content = Get-Content $file -Raw
    
    # Remove duplicate closing PasswordGate tags that are very close together
    $originalLength = $content.Length
    
    # Pattern: </PasswordGate> followed by whitespace and another </PasswordGate> within a few lines
    while ($content -match "</PasswordGate>\r\n\r\n\s+</PasswordGate>") {
        $content = $content -replace "</PasswordGate>(\r\n\r\n\s+)</PasswordGate>", "</PasswordGate>"
        Write-Host "  Removed duplicate from $chapter"
    }
    
    if ($content.Length -ne $originalLength) {
        Set-Content $file -Value $content -NoNewline
        Write-Host "  Saved $chapter with duplicates removed"
    }
    else {
        Write-Host "  No duplicates in $chapter"
    }
}

Write-Host "`nCleanup complete!"
