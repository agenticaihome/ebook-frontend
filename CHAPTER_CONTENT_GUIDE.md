# How to Add Your Chapter Content

## Overview
All 15 chapter template files have been created in `src/pages/chapters/`. Each file is ready for you to add your content.

## File Structure
```
src/pages/chapters/
├── Chapter1.jsx  → Part 1, Chapter 1: The Cost of Chaos
├── Chapter2.jsx  → Part 1, Chapter 2: The Agentic Shift
├── Chapter3.jsx  → Part 1, Chapter 3: [Your Title]
├── Chapter4.jsx  → Part 2, Chapter 1: Morning Routines
├── Chapter5.jsx  → Part 2, Chapter 2: Kitchen & Grocery
├── Chapter6.jsx  → Part 2, Chapter 3: Household Management
├── Chapter7.jsx  → Part 3, Chapter 1: [Your Title]
├── Chapter8.jsx  → Part 3, Chapter 2: [Your Title]
├── Chapter9.jsx  → Part 3, Chapter 3: [Your Title]
├── Chapter10.jsx → Part 4, Chapter 1: [Your Title]
├── Chapter11.jsx → Part 4, Chapter 2: [Your Title]
├── Chapter12.jsx → Part 4, Chapter 3: [Your Title]
├── Chapter13.jsx → Part 5, Chapter 1: [Your Title]
├── Chapter14.jsx → Part 5, Chapter 2: [Your Title]
└── Chapter15.jsx → Part 5, Chapter 3: [Your Title]
```

## How to Add Content to Each Chapter

### Step 1: Open the Chapter File
Open any chapter file, for example `src/pages/chapters/Chapter4.jsx`

### Step 2: Find the Content Section
Look for this comment in each file:
```jsx
{/* 
  TODO: Add your Chapter X content here
  ... 
*/}
```

### Step 3: Add Your Content
Replace the placeholder with your actual chapter content. You can copy content from your existing Part files.

**Example:**
```jsx
<div className="min-h-screen bg-[#0f0f1a] text-white py-16 px-6">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-5xl font-bold mb-6">Chapter 4: Morning Routines</h1>
    <p className="text-slate-400 text-lg mb-8">Part 2: Daily Operations</p>
    
    {/* ADD YOUR CONTENT HERE */}
    <div className="prose prose-invert max-w-none">
      <p>Your chapter content goes here...</p>
      
      {/* You can use all your existing components */}
      <Suspense fallback={<div className="animate-pulse" />}>
        <CaptainHero 
          message="Your message here"
          pose="thinking"
        />
      </Suspense>
      
      {/* More content */}
    </div>
  </div>
</div>
```

### Step 4: Update the Title (If Needed)
For chapters with placeholder titles like `[Chapter 3]`, update:
1. The `<Helmet>` title
2. The `<h1>` heading
3. The meta description

```jsx
<Helmet>
  <title>Chapter 3: Your Actual Title - Agentic AI Home</title>
  <meta name="description" content="Your chapter description" />
</Helmet>
```

## What's Already Set Up For You

✅ **Password Gates**: Automatically applied by part
- Part 1 (Chapters 1-3): No password
- Parts 2-5 (Chapters 4-15): Password protected

✅ **Navigation**: Previous/Next buttons automatically configured
- Chapter 1 → No previous button, next goes to Chapter 2
- Chapter 15 → Previous goes to Chapter 14, "Complete Part 5" button

✅ **Sidebar**: All chapters appear in the sidebar navigation
- Clicking a part expands to show its 3 chapters
- Active chapter is highlighted
- Locked chapters show lock icon

✅ **Routing**: All URLs work
- `/part1/chapter1`, `/part1/chapter2`, etc.
- `/part1`, `/part2`, etc. redirect to first chapter

## Tips for Migration

### Copying from Existing Part Files
1. Open your current Part file (e.g., `Part2.jsx`)
2. Find the section for that chapter (use the chapter ID or title)
3. Copy just the content section (not the layout wrapper)
4. Paste into the corresponding Chapter file
5. Make sure to include any `Suspense` wrappers for lazy-loaded components

### Preserving Components
All your existing components will work:
- `<CaptainHero />`
- `<CopyPrompt />`
- `<TryThisNow />`
- `<WorkflowVisual />`
- Custom calculators, etc.

Just make sure they're imported at the top of the file if not already.

## Testing Your Changes

After adding content to a chapter:
1. Save the file
2. Visit the chapter URL (e.g., `http://localhost:3000/part1/chapter1`)
3. Check:
   - Content displays correctly
   - Previous/Next buttons work
   - Sidebar shows active state
   - Password gate works (for chapters 4+)

## Next Steps

1. Add content to Chapter 1-3 first (no password needed)
2. Test navigation between them
3. Continue with Chapters 4-15
4. Update placeholder titles for chapters without names yet
5. Deploy when ready!

## Need Help?
- All templates follow the same structure
- ChapterNavigation handles Previous/Next automatically
- Password gates are already configured
- Just focus on adding your content!
