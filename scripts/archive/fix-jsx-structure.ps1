# Fix 2: Fix JSX structure - Helmet should be INSIDE SpeedRunContext for chapters 7-13

$chapters = @(7, 8, 9, 10, 11, 13)
$basePath = "c:\Users\natha\OneDrive\Desktop\frontend\ebook-frontend\src\pages\chapters"

foreach ($num in $chapters) {
    $file = Join-Path $basePath "Chapter$num.jsx"
    $content = Get-Content $file -Raw
    
    # The problem: Helmet is outside SpeedRunContext, causing adjacent JSX elements
    # Pattern: </Helmet>\r\n\r\n<SpeedRunContext
    # Fix: Move Helmet INSIDE SpeedRunContext
    
    # Find the Helmet block and SpeedRunContext start
    $pattern = "(<Helmet>.*?</Helmet>)\r\n\s+\r\n\s+(<SpeedRunContext.Provider value={speedRun}>)"
    $replacement = "`$2`r`n            `$1`r`n            "
    
    $newContent = $content -replace $pattern, $replacement
    
    if ($newContent -ne $content) {
        Set-Content $file -Value $newContent -NoNewline
        Write-Host "[OK] Fixed JSX structure in Chapter $num" -ForegroundColor Green
    }
    else {
        Write-Host "[SKIP] Pattern not found in Chapter $num" -ForegroundColor Yellow
    }
}

Write-Host "JSX structure fixed!" -ForegroundColor Cyan
