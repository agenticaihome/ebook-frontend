# Chapter SEO & Navigation Fix Script

$chapterInfo = @(
    @{num = 1; title = "The Everything-Manager"; desc = "Understanding the mental load of modern life and how AI agents can help"; hasHelmet = $false; hasNav = $true; prev = $null; next = "/part1/chapter2"; part = 1; ch = 1 },
    @{num = 2; title = "Building Your AI Team"; desc = "How to create and manage your first AI agents"; hasHelmet = $false; hasNav = $true; prev = "/part1/chapter1"; next = "/part1/chapter3"; part = 1; ch = 2 },
    @{num = 3; title = "The Agentic Principles"; desc = "Core principles for effective AI agent design"; hasHelmet = $false; hasNav = $true; prev = "/part1/chapter2"; next = "/part2/chapter1"; part = 1; ch = 3 },
    @{num = 4; title = "Morning Routines"; desc = "Automate your morning briefing and start every day ahead"; hasHelmet = $false; hasNav = $true; prev = "/part1/chapter3"; next = "/part2/chapter2"; part = 2; ch = 1 },
    @{num = 5; title = "Kitchen & Grocery Automation"; desc = "Never run out of essentials again with automated grocery management"; hasHelmet = $false; hasNav = $true; prev = "/part2/chapter1"; next = "/part2/chapter3"; part = 2; ch = 2 },
    @{num = 6; title = "Household Management"; desc = "Your home runs itself with smart automation agents"; hasHelmet = $false; hasNav = $true; prev = "/part2/chapter2"; next = "/part3/chapter1"; part = 2; ch = 3 },
    @{num = 7; title = "Email Triage"; desc = "Stop drowning in your inbox with intelligent email filtering"; hasHelmet = $false; hasNav = $false; prev = "/part2/chapter3"; next = "/part3/chapter2"; part = 3; ch = 1 },
    @{num = 8; title = "Calendar Defense"; desc = "Protect your time from meeting creep and reclaim your schedule"; hasHelmet = $false; hasNav = $false; prev = "/part3/chapter1"; next = "/part3/chapter3"; part = 3; ch = 2 },
    @{num = 9; title = "Admin & Finances"; desc = "Automate the life admin tasks you hate"; hasHelmet = $false; hasNav = $false; prev = "/part3/chapter2"; next = "/part4/chapter1"; part = 3; ch = 3 },
    @{num = 10; title = "Health & Wellness"; desc = "Track and improve your health automatically"; hasHelmet = $false; hasNav = $false; prev = "/part3/chapter3"; next = "/part4/chapter2"; part = 4; ch = 1 },
    @{num = 11; title = "Relationships"; desc = "Remember birthdays, stay connected, and nurture relationships effortlessly"; hasHelmet = $false; hasNav = $false; prev = "/part4/chapter1"; next = "/part4/chapter3"; part = 4; ch = 2 },
    @{num = 12; title = "[Chapter Title]"; desc = "[Add chapter description]"; hasHelmet = $true; hasNav = $true; prev = "/part4/chapter2"; next = "/part5/chapter1"; part = 4; ch = 3 },
    @{num = 13; title = "Your Life OS"; desc = "Bringing it all together into a complete life operating system"; hasHelmet = $false; hasNav = $false; prev = "/part4/chapter3"; next = "/part5/chapter2"; part = 5; ch = 1 },
    @{num = 14; title = "Advanced Prompting"; desc = "Master prompt engineering for maximum agent effectiveness"; hasHelmet = $true; hasNav = $false; prev = "/part5/chapter1"; next = "/part5/chapter3"; part = 5; ch = 2 },
    @{num = 15; title = "Troubleshooting"; desc = "Fix common agent problems and maintain your system"; hasHelmet = $true; hasNav = $false; prev = "/part5/chapter2"; next = "/part5/chapter4"; part = 5; ch = 3 },
    @{num = 16; title = "The Future You"; desc = "Your complete transformation and what comes next"; hasHelmet = $true; hasNav = $false; prev = "/part5/chapter3"; next = $null; part = 5; ch = 4 }
)

$basePath = "c:\Users\natha\OneDrive\Desktop\frontend\ebook-frontend\src\pages\chapters"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Chapter SEO & Navigation Updater" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

foreach ($info in $chapterInfo) {
    $file = Join-Path $basePath "Chapter$($info.num).jsx"
    
    Write-Host "Chapter $($info.num): $($info.title)" -ForegroundColor Yellow
    
    # Read file
    $content = Get-Content $file -Raw
    $modified = $false
    
    # ADD HELMET if missing
    if (-not $info.hasHelmet) {
        Write-Host "  [+] Adding Helmet SEO tags..." -ForegroundColor Green
        
        $helmetBlock = @"
            <Helmet>
                <title>Chapter $($info.num): $($info.title) | Agentic AI at Home</title>
                <meta name="description" content="$($info.desc)" />
            </Helmet>

"@
        
        # Insert after <WebbookLayout> or after <SpeedRunContext.Provider> if exists
        if ($content -match "(\s+)<WebbookLayout>") {
            $content = $content -replace "(<WebbookLayout>\r?\n)", "`$1$helmetBlock"
            $modified = $true
            Write-Host "    Added after WebbookLayout" -ForegroundColor DarkGreen
        }
    }
    else {
        Write-Host "  [√] Helmet already present" -ForegroundColor DarkGray
    }
    
    # ADD CHAPTERNAVIGATION if missing
    if (-not $info.hasNav) {
        Write-Host "  [+] Adding ChapterNavigation..." -ForegroundColor Green
        
        $navBlock = @"

                <ChapterNavigation
                    previousChapter=$(if($info.prev){"```"$($info.prev)```"}else{"null"})
                    nextChapter=$(if($info.next){"```"$($info.next)```"}else{"null"})
                    partNumber={$($info.part)}
                    chapterNumber={$($info.ch)}
                />
"@
        
        # Find where to insert - before final </div></div></WebbookLayout> or similar
        # Look for pattern before closing tags
        if ($content -match "(\r?\n\s+)</div>\r?\n\s+</div>\r?\n\s+</WebbookLayout>") {
            $content = $content -replace "(\r?\n\s+)(</div>\r?\n\s+</div>\r?\n\s+</WebbookLayout>)", "$navBlock`r`n`r`n`$1`$2"
            $modified = $true
            Write-Host "    Added before closing tags" -ForegroundColor DarkGreen
        }
    }
    else {
        Write-Host "  [√] ChapterNavigation already present" -ForegroundColor DarkGray
    }
    
    # Save if modified
    if ($modified) {
        Set-Content $file -Value $content -NoNewline
        Write-Host "  [SAVED] $file" -ForegroundColor Cyan
    }
    else {
        Write-Host "  [SKIP] No changes needed" -ForegroundColor DarkGray
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Update Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
