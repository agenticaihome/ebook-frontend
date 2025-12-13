# Add ChapterNavigation to chapters 7-11, 13-16
$navInfo = @(
    @{num = 7; prev = "/part2/chapter3"; next = "/part3/chapter2"; part = 3; ch = 1 },
    @{num = 8; prev = "/part3/chapter1"; next = "/part3/chapter3"; part = 3; ch = 2 },
    @{num = 9; prev = "/part3/chapter2"; next = "/part4/chapter1"; part = 3; ch = 3 },
    @{num = 10; prev = "/part3/chapter3"; next = "/part4/chapter2"; part = 4; ch = 1 },
    @{num = 11; prev = "/part4/chapter1"; next = "/part4/chapter3"; part = 4; ch = 2 },
    @{num = 13; prev = "/part4/chapter3"; next = "/part5/chapter2"; part = 5; ch = 1 },
    @{num = 14; prev = "/part5/chapter1"; next = "/part5/chapter3"; part = 5; ch = 2 },
    @{num = 15; prev = "/part5/chapter2"; next = "/part5/chapter4"; part = 5; ch = 3 },
    @{num = 16; prev = "/part5/chapter3"; next = "null"; part = 5; ch = 4 }
)

$basePath = "c:\Users\natha\OneDrive\Desktop\frontend\ebook-frontend\src\pages\chapters"

foreach ($info in $navInfo) {
    $file = Join-Path $basePath "Chapter$($info.num).jsx"
    $content = Get-Content $file -Raw
    
    $nextVal = if ($info.next -eq "null") { "null" } else { "`"$($info.next)`"" }
    
    $nav = "`r`n                <ChapterNavigation`r`n                    previousChapter=`"$($info.prev)`"`r`n                    nextChapter=$nextVal`r`n                    partNumber={$($info.part)}`r`n                    chapterNumber={$($info.ch)}`r`n                />`r`n"
    
    # Add before closing tags - pattern depends on chapter structure
    if ($content -match "</SpeedRunContext.Provider>") {
        # Chapters 7-13 
        $pattern = "(\r\n\s+)(</div>\r\n\s+</div>\r\n\s+</SpeedRunContext.Provider>)"
        $replacement = "$nav`$1`$2"
    }
    else {
        # Chapters 14-16
        $pattern = "(\r\n\s+)(</div>\r\n\s+</div>\r\n\s+</SpeedRunContext.Provider>)"
        $replacement = "$nav`$1`$2"
    }
    
    $newContent = $content -replace $pattern, $replacement
    
    if ($newContent -ne $content) {
        Set-Content $file -Value $newContent -NoNewline
        Write-Host "[OK] Chapter $($info.num)" -ForegroundColor Green
    }
    else {
        Write-Host "[SKIP] Chapter $($info.num)" -ForegroundColor Yellow
    }
}
