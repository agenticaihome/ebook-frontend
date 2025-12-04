# Add Helmet to chapters 7-11, 13 (they use SpeedRunContext pattern)
$chapters = @(
    @{num = 7; title = "Email Triage"; desc = "Stop drowning in your inbox with intelligent email filtering" },
    @{num = 8; title = "Calendar Defense"; desc = "Protect your time from meeting creep and reclaim your schedule" },
    @{num = 9; title = "Admin & Finances"; desc = "Automate the life admin tasks you hate" },
    @{num = 10; title = "Health & Wellness"; desc = "Track and improve your health automatically" },
    @{num = 11; title = "Relationships"; desc = "Remember birthdays, stay connected, and nurture relationships effortlessly" },
    @{num = 13; title = "Your Life OS"; desc = "Bringing it all together into a complete life operating system" }
)

$basePath = "c:\Users\natha\OneDrive\Desktop\frontend\ebook-frontend\src\pages\chapters"

foreach ($ch in $chapters) {
    $file = Join-Path $basePath "Chapter$($ch.num).jsx"
    $content = Get-Content $file -Raw
    
    $helmet = "            <Helmet>`r`n                <title>Chapter $($ch.num): $($ch.title) | Agentic AI at Home</title>`r`n                <meta name=`"description`" content=`"$($ch.desc)`" />`r`n            </Helmet>`r`n            `r`n            "
    
    # Pattern for chapters with SpeedRunContext at top
    $pattern = "(\s+)<SpeedRunContext.Provider value={speedRun}>\r\n(\s+)<div"
    $replacement = "$helmet`$1<SpeedRunContext.Provider value={speedRun}>`r`n`$2<div"
    
    $newContent = $content -replace $pattern, $replacement
    
    if ($newContent -ne $content) {
        Set-Content $file -Value $newContent -NoNewline
        Write-Host "[OK] Chapter $($ch.num)" -ForegroundColor Green
    }
    else {
        Write-Host "[SKIP] Chapter $($ch.num)" -ForegroundColor Yellow
    }
}
