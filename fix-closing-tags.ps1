$chapters = @(
    @{file = "Chapter7.jsx"; line = 997 },
    @{file = "Chapter8.jsx"; line = 1049 },
    @{file = "Chapter9.jsx"; line = 1105 },
    @{file = "Chapter10.jsx"; line = 1024 },
    @{file = "Chapter11.jsx"; line = 991 },
    @{file = "Chapter13.jsx"; line = 1049 },
    @{file = "Chapter14.jsx"; line = 1100 },
    @{file = "Chapter15.jsx"; line = 899 },
    @{file = "Chapter16.jsx"; line = 671 }
)

$basePath = "c:\Users\natha\OneDrive\Desktop\frontend\ebook-frontend\src\pages\chapters"

foreach ($chapter in $chapters) {
    $file = Join-Path $basePath $chapter.file
    
    Write-Host "Fixing $($chapter.file)..."
    
    # Read file
    $content = Get-Content $file -Raw
    
    # The problem is that we have opening <PasswordGate> tags but missing closing tags
    # We need to add </PasswordGate> before the final </div></div> closing tags
    
    # Pattern: Find the last </div></div> before the component closing
    # Add </PasswordGate> right before that
    
    if ($content -match "(\s+)\u003c/div\u003e\r\n(\s+)\u003c/div\u003e\r\n(\s+)\u003c/\u003e") {
        # Chapter 16 special case with fragment <>
        $content = $content -replace "(\s+)(\u003c/div\u003e)\r\n(\s+)(\u003c/div\u003e)\r\n(\s+)(\u003c/\u003e)", "`$1</PasswordGate>`r`n`r`n`$1`$2`r`n`$3`$4`r`n`$5`$6"
        Write-Host "  Fixed $($chapter.file) (Fragment pattern)"
    }
    elseif ($content -match "(\s+)\u003c/div\u003e\r\n(\s+)\u003c/div\u003e\r\n(\s+)\u003c/SpeedRunContext") {
        # Normal pattern with SpeedRunContext.Provider
        $content = $content -replace "(\s+)(\u003c/div\u003e)\r\n(\s+)(\u003c/div\u003e)\r\n(\s+)(\u003c/SpeedRunContext)", "`$1</PasswordGate>`r`n`r`n`$1`$2`r`n`$3`$4`r`n`$5`$6"
        Write-Host "  Fixed $($chapter.file) (SpeedRunContext pattern)"
    }
    else {
        Write-Host "  WARNING: Could not find pattern in $($chapter.file)"
    }
    
    # Save file
    Set-Content $file -Value $content -NoNewline
    Write-Host "  Saved $($chapter.file)"
}

Write-Host "`nAll chapters fixed!"
