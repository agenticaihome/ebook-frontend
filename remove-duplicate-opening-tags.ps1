$chapters = @(
    "Chapter7.jsx", "Chapter8.jsx", "Chapter9.jsx",
    "Chapter10.jsx", "Chapter11.jsx", 
    "Chapter13.jsx", "Chapter14.jsx", "Chapter15.jsx", "Chapter16.jsx"
)

$basePath = "c:\Users\natha\OneDrive\Desktop\frontend\ebook-frontend\src\pages\chapters"

foreach ($chapter in $chapters) {
    $file = Join-Path $basePath $chapter
    
    Write-Host "Processing $chapter..."
    
    # Read file
    $content = Get-Content $file -Raw
    
    # Count PasswordGate opening and closing tags
    $openingTags = ([regex]::Matches($content, '<PasswordGate partNumber={\d+}>') | Measure-Object).Count
    $closingTags = ([regex]::Matches($content, '</PasswordGate>') | Measure-Object).Count
    
    Write-Host "  Opening tags: $openingTags, Closing tags: $closingTags"
    
    if ($openingTags -gt 1) {
        # Find and remove duplicate opening tags (keep only the first one)
        $pattern = '(<PasswordGate partNumber={\d+}>)\r\n(\s+{/\* CAPTAIN)'
        if ($content -match $pattern) {
            # Remove the second PasswordGate opening that appears later
            $content = $content -replace '(\r\n\s+)<PasswordGate partNumber={\d+}>\r\n(\s+{/\* CAPTAIN CLOSER)', '$1$2'
            Write-Host "  Removed duplicate opening tag before CAPTAIN CLOSER"
        }
        
        # Save
        Set-Content $file -Value $content -NoNewline
        Write-Host "  Saved $chapter"
    }
    else {
        Write-Host "  No duplicates in $chapter"
    }
}

Write-Host "`nAll chapters processed!"
