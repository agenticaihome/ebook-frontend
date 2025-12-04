# Add Helmet SEO tags to chapters missing them
# Chapters needing Helmet: 2-11, 13

$chapters = @(
    @{num = 2; title = "Building Your AI Team"; desc = "How to create and manage your first AI agents for maximum efficiency" },
    @{num = 3; title = "The Agentic Principles"; desc = "Core principles for designing effective AI agents that actually work" },
    @{num = 4; title = "Morning Routines"; desc = "Automate your morning briefing and start every day ahead" },
    @{num = 5; title = "Kitchen & Grocery Automation"; desc = "Never run out of essentials again with automated grocery management" },
    @{num = 6; title = "Household Management"; desc = "Your home runs itself with smart automation agents" },
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
    
    Write-Host "Processing Chapter $($ch.num)..." -ForegroundColor Cyan
    
    $content = Get-Content $file -Raw
    
    $helmet = "            <Helmet>`r`n                <title>Chapter $($ch.num): $($ch.title) | Agentic AI at Home</title>`r`n                <meta name=`"description`" content=`"$($ch.desc)`" />`r`n            </Helmet>`r`n            `r`n            "
    
    # Find and replace pattern - after <WebbookLayout> opening tag
    $pattern = "(\s+)<WebbookLayout>\r\n(\s+)<"
    $replacement = "`$1<WebbookLayout>`r`n$helmet`$2<"
    
    $newContent = $content -replace $pattern, $replacement
    
    if ($newContent -ne $content) {
        Set-Content $file -Value $newContent -NoNewline
        Write-Host "  [SUCCESS] Helmet added to Chapter $($ch.num)" -ForegroundColor Green
    }
    else {
        Write-Host "  [SKIP] Pattern not found in Chapter $($ch.num)" -ForegroundColor Yellow
    }
}

Write-Host "`nHelmet SEO tags added!" -ForegroundColor Green
