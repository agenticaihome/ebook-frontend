# Fix 1: Add missing imports

# Add Helmet import to chapters 4, 5, 6
$chapters = @(4, 5, 6)
$basePath = "c:\Users\natha\OneDrive\Desktop\frontend\ebook-frontend\src\pages\chapters"

foreach ($num in $chapters) {
    $file = Join-Path $basePath "Chapter$num.jsx"
    $content = Get-Content $file -Raw
    
    # Add import after react import
    if ($content -notmatch "import.*Helmet.*from") {
        $content = $content -replace "(import React.*\r\n)", "`$1import { Helmet } from 'react-helmet-async';`r`n"
        Set-Content $file -Value $content -NoNewline
        Write-Host "[OK] Added Helmet import to Chapter $num" -ForegroundColor Green
    }
}

# Add ChapterNavigation import to chapters 14, 15, 16 (if missing)
$chapters = @(14, 15, 16)
foreach ($num in $chapters) {
    $file = Join-Path $basePath "Chapter$num.jsx"
    $content = Get-Content $file -Raw
    
    if ($content -notmatch "import ChapterNavigation") {
        $content = $content -replace "(import.*from 'react-helmet-async';\r\n)", "`$1import ChapterNavigation from '../../components/common/ChapterNavigation';`r`n"
        Set-Content $file -Value $content -NoNewline
        Write-Host "[OK] Added ChapterNavigation import to Chapter $num" -ForegroundColor Green
    }
}

Write-Host "Imports fixed!" -ForegroundColor Cyan
