# Cybersecurity Content Hub 2026

A modern Next.js application that reads markdown files and displays cybersecurity content across multiple platforms (X/Twitter, LinkedIn, Medium).

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Accordion UI** - Click to expand topics
- **Markdown Support** - Reads .md files directly
- **Copy to Clipboard** - One-click content copying
- **Responsive Design** - Works on all devices

## 📁 Project Structure

```
cybersecurity-content-hub/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   └── TopicAccordion.tsx  # Accordion component
├── lib/
│   └── markdown.ts         # Markdown parsing utilities
├── types/
│   └── index.ts            # TypeScript types
├── content/
│   └── Topic_*.md          # Markdown content files
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 How It Works

1. **Markdown Files**: All content is stored in `/content` directory as `.md` files
2. **Parsing**: `lib/markdown.ts` reads and parses the markdown files
3. **Display**: Components render the content with accordion UI
4. **Styling**: Tailwind CSS provides clean, minimal design

## 🎨 Customization

### Adding New Topics

1. Create a new markdown file in `/content` directory:
   ```
   Topic_11_Your_New_Topic.md
   ```

2. Follow this structure:
   ```markdown
   # 🔐 Your Topic Title

   ## 📱 X (Twitter) Post
   **Character Count:** 280/280

   ```
   Your Twitter content here
   ```

   ## 💼 LinkedIn Post
   **Word Count:** ~300 words

   Your LinkedIn content here

   ## 📝 Medium Article
   **Word Count:** ~1500 words

   # Article Title

   Your full Medium article here
   ```

3. The app will automatically pick it up!

### Styling

Edit `tailwind.config.ts` to customize colors:

```typescript
theme: {
  extend: {
    colors: {
      // Your custom colors
    },
  },
},
```

## 📦 Dependencies

- **next**: React framework
- **react-markdown**: Markdown rendering
- **gray-matter**: Frontmatter parsing
- **tailwindcss**: Utility-first CSS

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

```bash
npm run build
npm start
```

## 📄 License

MIT

## 👤 Author

Created for professional cybersecurity content management
