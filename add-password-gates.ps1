$chapters = @(
    @{file="Chapter7.jsx"; part=3},
    @{file="Chapter8.jsx"; part=3},
    @{file="Chapter9.jsx"; part=3},
    @{file="Chapter10.jsx"; part=4},
    @{file="Chapter11.jsx"; part=4},
    @{file="Chapter13.jsx"; part=5},
    @{file="Chapter14.jsx"; part=5},
    @{file="Chapter15.jsx"; part=5},
    @{file="Chapter16.jsx"; part=5}
)

$basePath = "c:\Users\natha\OneDrive\Desktop\frontend\ebook-frontend\src\pages\chapters"

foreach ($chapter in $chapters) {
    $file = Join-Path $basePath $chapter.file
    $part = $chapter.part
    
    Write-Host "Processing $($chapter.file)..."
    
    # Read file
    $content = Get-Content $file -Raw
    
    # Check if PasswordGate is already imported
    if ($content -match "import PasswordGate") {
        Write-Host "  PasswordGate already imported in $($chapter.file)"
    } else {
        # Add import after ChapterNavigation
        $content = $content -replace "(import ChapterNavigation from '../../components/common/ChapterNavigation';)", "`$1`r`nimport PasswordGate from '../../components/common/PasswordGate';"
        Write-Host "  Added import to $($chapter.file)"
    }
    
    # Check if PasswordGate wrapper exists
    if ($content -match "<PasswordGate") {
        Write-Host "  PasswordGate wrapper already exists in $($chapter.file)"
    } else {
        # Find pattern after TLDRCard or similar intro content and before CAPTAIN/first major content
        # Add opening tag after the last navigation/intro element and before main content
        
        # Pattern 1: After TLDRCard
        if ($content -match "(\s+\/\>)\r\n\r\n(\s+\{/\* CAPTAIN|<Suspense|<SEO|{!speedRun)") {
            $content = $content -replace "(\s+\/\>)\r\n\r\n(\s+)(\{/\* CAPTAIN|<Suspense|<SEO|{!speedRun)", "`$1`r`n`r`n`$2<PasswordGate partNumber={$part}>`r`n`$2    `$3"
            Write-Host "  Added opening PasswordGate to $($chapter.file)"
        }
        
        # Add closing tag before final closing divs
        # Pattern: before </div></div></SpeedRunContext.Provider> or similar
        if ($content -match "(\s+)\u003c/div\u003e\r\n(\s+)\u003c/div\u003e\r\n(\s+)\u003c/.*Provider\u003e") {
            $content = $content -replace "(\s+)(\u003c/div\u003e)\r\n(\s+)(\u003c/div\u003e)\r\n(\s+)(\u003c/.*Provider\u003e)", "`$1</PasswordGate>`r`n`r`n`$1`$2`r`n`$3`$4`r`n`$5`$6"
            Write-Host "  Added closing PasswordGate to $($chapter.file)"
        }
    }
    
    # Save file
    Set-Content $file -Value $content -NoNewline
    Write-Host "  Saved $($chapter.file)"
}

Write-Host "`nAll chapters processed!"
