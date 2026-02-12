# 🚀 Quick Start Guide

## Installation & Setup

### 1. Extract & Install

```bash
# Extract the archive
tar -xzf cybersecurity-nextjs-project.tar.gz
cd cybersecurity-content-hub

# Install dependencies
npm install
```

### 2. First Run

```bash
# Start development server
npm run dev
```

**Important:** If you see issues with content not loading:

```bash
# Stop the server (Ctrl+C)
# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
```

### 3. Open Browser

Navigate to: **http://localhost:3000**

You should see:
- ✅ 10 topics listed
- ✅ Click to expand accordion
- ✅ Copy buttons working
- ✅ Medium content showing proper word counts (700-1900 words)

## 🔍 Verify Everything Works

Run the parser test:

```bash
node test-parser.js
```

Expected output:
```
Topic_01_Zero_Trust_Architecture.md: 703 words
Topic_02_AI_Powered_Cyber_Attacks.md: 1142 words
Topic_03_Cloud_Security_Misconfigurations.md: 1103 words
...
```

If test shows correct words but web doesn't → **Clear .next cache**

## 🎯 What You'll See

### Collapsed View (Default)
```
TOPIC 1  🔐 Zero Trust Architecture - The New Security Paradigm  ▼
TOPIC 2  🤖 AI-Powered Cyber Attacks - The Arms Race Accelerates  ▼
TOPIC 3  ☁️ Cloud Security Misconfigurations - The $4.5M Mistake  ▼
...
```

### Expanded View (After Click)
```
TOPIC 1  🔐 Zero Trust Architecture...  ▲

📱 X (Twitter)  252/280        [Copy]
[Gray box with Twitter content]

💼 LinkedIn  154 words          [Copy]
[Gray box with LinkedIn content]

📝 Medium  703 words            [Copy]
[Gray box with Medium article - properly formatted markdown]
```

## 🔧 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Medium shows "1 words" | `rm -rf .next && npm run dev` |
| Port 3000 in use | `npm run dev -- -p 3001` |
| Module not found | `npm install` |
| Old content showing | `Ctrl+Shift+R` (hard refresh) |

## 📝 Project Structure

```
cybersecurity-content-hub/
├── content/              ← Your markdown files (edit these!)
│   └── Topic_*.md
├── app/                  ← Next.js pages
│   ├── page.tsx         ← Main page
│   └── layout.tsx       ← Layout wrapper
├── components/           ← React components
│   └── TopicAccordion.tsx
├── lib/                  ← Utilities
│   └── markdown.ts      ← Markdown parser
└── test-parser.js       ← Test script
```

## ✏️ Editing Content

1. Edit any file in `/content` directory
2. Save
3. Page auto-refreshes (hot reload)
4. Changes appear instantly

Example:
```bash
# Edit a topic
nano content/Topic_01_Zero_Trust_Architecture.md

# Save and watch browser auto-update!
```

## 🚢 Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start

# Or deploy to Vercel
npm i -g vercel
vercel
```

## 🎨 Customization

**Change colors:**
```typescript
// tailwind.config.ts
colors: {
  primary: "#your-color"
}
```

**Add new topic:**
```bash
# Create new file
touch content/Topic_11_New_Topic.md

# Follow the structure from existing files
# Auto-detected and displayed!
```

## 💡 Pro Tips

1. ✅ Use `test-parser.js` to verify markdown parsing
2. ✅ Clear `.next` cache if content looks wrong
3. ✅ Hard refresh browser (Ctrl+Shift+R)
4. ✅ Check console (F12) for errors
5. ✅ Markdown files auto-reload in dev mode

## 📚 Need Help?

See `TROUBLESHOOTING.md` for detailed solutions.

---

**Ready to go!** 🎉

Open http://localhost:3000 and start using your content hub.
