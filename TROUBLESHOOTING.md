# 🔧 Troubleshooting Guide

## Medium Content Showing "1 words" or Empty

If you're seeing empty Medium content or "1 words", follow these steps:

### Solution 1: Clear Next.js Cache (Most Common)

```bash
# Stop the dev server (Ctrl+C)

# Delete cache and build folders
rm -rf .next
rm -rf node_modules/.cache

# Restart dev server
npm run dev
```

### Solution 2: Hard Refresh Browser

1. Open the page
2. Press `Ctrl + Shift + R` (Windows/Linux)
3. Or `Cmd + Shift + R` (Mac)

### Solution 3: Verify Markdown Files

Test the parser manually:

```bash
# Run the test script
node test-parser.js
```

You should see output like:
```
Topic_01_Zero_Trust_Architecture.md: 703 words
Topic_02_AI_Powered_Cyber_Attacks.md: 1142 words
Topic_03_Cloud_Security_Misconfigurations.md: 1103 words
```

If the test shows correct word counts but the web page doesn't, it's a caching issue.

### Solution 4: Complete Reset

```bash
# Stop dev server
# Delete everything
rm -rf .next node_modules

# Reinstall
npm install

# Rebuild
npm run dev
```

### Solution 5: Check File Encoding

Make sure all `.md` files are UTF-8 encoded:

```bash
file content/*.md
```

Should show: `UTF-8 Unicode text`

## Common Issues

### "Cannot find module" errors

```bash
npm install
```

### Port 3000 already in use

```bash
# Use different port
npm run dev -- -p 3001
```

### TypeScript errors

```bash
# Rebuild TypeScript
npx tsc --noEmit
```

## Verification Checklist

✅ Markdown files in `/content` directory  
✅ All files are `.md` extension  
✅ Files named: `Topic_01_*.md`, `Topic_02_*.md`, etc.  
✅ `.next` folder deleted  
✅ Browser cache cleared  
✅ Dev server restarted  

## Still Not Working?

1. Check console for errors (F12 in browser)
2. Check terminal for server errors
3. Verify `lib/markdown.ts` has latest version
4. Ensure all dependencies installed

## Test Individual Topic

```typescript
// Add to app/page.tsx temporarily
console.log('Topics loaded:', topics.length);
topics.forEach(t => {
  console.log(`${t?.title}: Medium ${t?.medium.wordCount} words`);
});
```

Check browser console (F12) for output.
