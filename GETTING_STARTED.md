# 🚀 Getting Started - Islamic Duas App

Welcome to the Islamic Duas Application! This guide will help you get started, understand the app's features, and customize it for your needs.

## ⚡ Quick Start (30 seconds)

### 1. Start the Server
```bash
cd duas-app
node server.js
```

You'll see:
```
✅ Server running at: http://localhost:8000
```

### 2. Open in Browser
Navigate to: **http://localhost:8000**

That's it! The app is ready to use. 🎉

---

## 🎯 First Time User Guide

### Home Page Overview
When you first open the app, you'll see:

1. **Header** (Top)
   - App title: "🤲 Islamic Duas"
   - Dark mode toggle (🌙)
   - Favorites button (❤️)

2. **Search & Filter Section**
   - Search bar: Find duas by keyword
   - Category tabs: Filter by type
   - Subcategories: Further refine results

3. **Dua of the Day**
   - Featured daily supplication
   - Changes automatically each day
   - Complete with Arabic, transliteration, translation

4. **Main Grid**
   - Cards showing all duas
   - Organized in responsive layout
   - Search results update in real-time

### Essential Features

#### 🔍 Search Duas
- Click the search bar (or press Ctrl+K)
- Type any keyword: "morning", "prayer", "fear", "gratitude"
- Results filter instantly
- Works across all fields (title, translation, source, category)

#### 🏷️ Filter by Category
Click any category tab:
- **All Duas** - Show everything
- **By Source** - Quranic vs Prophetic
- **By Time** - Morning, evening, specific prayers
- **By Situation** - Travel, home, eating, etc.
- **By Content** - Forgiveness, gratitude, protection
- **By Days/Months** - Ramadan, Hajj, Friday
- **By Emotional State** - Fear, anxiety, peace
- And more!

#### ❤️ Save Favorites
- Click heart icon (🤍) on any dua card
- Heart fills with color (❤️) when saved
- Favorites stored in your browser
- Persists across sessions
- Future: Filter by favorites only

#### 📋 Copy to Clipboard
- Click "Copy" button on any dua
- Arabic text copied automatically
- Share via email, social media, messaging
- Perfect for personal collections

#### 🌙 Dark Mode
- Click moon icon (🌙) in header
- App switches to dark theme
- Setting saved automatically
- Or press Ctrl+D

#### 🌍 Change Language
- Select English or Albanian
- All two-letter translations change instantly
- Preference saved

---

## 📱 Using on Different Devices

### Mobile (Phone)
✅ Touch-optimized buttons  
✅ Large, readable text  
✅ Single-column layout  
✅ Optimized performance  

**Tips:**
- Landscape mode gives you more width
- All features work great on small screens
- Tap and hold on Arabic text to select/copy

### Tablet
✅ Two-column layout  
✅ Spacious card design  
✅ Easy thumb reach  

### Desktop / Laptop
✅ Three-column grid  
✅ Full feature access  
✅ Keyboard shortcuts work great  

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` (or `Cmd+K` on Mac) | Focus search bar |
| `Ctrl+D` (or `Cmd+D` on Mac) | Toggle dark mode |

---

## 📖 Understanding Dua Cards

Each dua displays:

```
┌─────────────────────────────────────┐
│  [Badge: Category]           [❤️]   │  ← Category & Favorite
├─────────────────────────────────────┤
│  اللَّهُمَّ بِك أَصْبَحْنَا...     │  ← Arabic (RTL)
├─────────────────────────────────────┤
│  Allahumma bika asbahna...          │  ← Transliteration
├─────────────────────────────────────┤
│  O Allah, by You we enter the      │
│  morning, by You we enter the...   │  ← Translation
├─────────────────────────────────────┤
│  📖 At-Tirmidhi        [Copy]       │  ← Source & Actions
└─────────────────────────────────────┘
```

### What Each Part Means

- **Badge**: The subcategory (e.g., "Morning Adhkar")
- **Arabic**: Original supplication in Arabic
- **Transliteration**: How to pronounce it in English letters
- **Translation**: Meaning in your selected language
- **Source**: Where this dua comes from (Quran, Hadith collection)

---

## 🎨 Customization Guide

### Change Color Scheme

Edit `css/style.css`, find `:root {}`:

```css
:root {
    --primary-green: #1a7d5f;        /* Main color */
    --primary-dark-green: #0d5a47;   /* Dark shade */
    --accent-gold: #d4af37;          /* Highlight color */
    --accent-light-gold: #f4e4c1;    /* Light shade */
    /* ... more colors ... */
}
```

**Popular Color Schemes:**

*Ocean Blue*
```css
--primary-green: #006b8a;
--accent-gold: #00bcd4;
```

*Purple Twilight*
```css
--primary-green: #5e35b1;
--accent-gold: #ce93d8;
```

*Rose Garden*
```css
--primary-green: #c2185b;
--accent-gold: #f48fb1;
```

### Change Fonts

Edit in `css/style.css`:

```css
--font-primary: 'Poppins', sans-serif;      /* UI font - change this */
--font-arabic: 'Amiri', serif;              /* Arabic font - change this */
```

**Available Google Fonts** (add to HTML):
- Playfair Display (elegant)
- Lato (modern)
- Raleway (clean)
- Roboto (professional)

### Modify Card Layout

**Show More Cards per Row** (wider cards):
```css
.duas-grid {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
```

**Show Fewer Cards** (larger cards):
```css
.duas-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
```

---

## 📚 Adding New Duas

### Step 1: Edit `data/duas.json`

```json
{
  "id": 51,
  "arabic": "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ",
  "transliteration": "Allahumma a'inni 'ala dhikrika",
  "translation_en": "O Allah, help me remember You",
  "translation_sq": "O Allah, më ndihmo të të kujtoj",
  "category_main": "By Time",
  "category_sub": "Morning Adhkar",
  "tags": ["morning", "remembrance"],
  "source": "Abu Dawud",
  "audio": "duas-051.mp3"
}
```

### Step 2: Important Rules

✅ Must have all fields:
- `id` (unique number)
- `arabic` (original Arabic text)
- `transliteration` (English pronunciation)
- `translation_en` (English meaning)
- `translation_sq` (Albanian meaning - if not available, use English)
- `category_main` (one of the 6 main categories)
- `category_sub` (specific subcategory)
- `tags` (array of keywords for search)
- `source` (where this dua is from)
- `audio` (optional, for future audio feature)

### Step 3: Verify Before Saving

- ✅ Is the dua from an authentic source?
- ✅ Is the translation accurate?
- ✅ Is the transcription correct?
- ✅ Does the category make sense?
- ✅ Are the tags helpful for search?

**Example: Adding a Dua:**

```json
{
  "id": 51,
  "arabic": "رَبِّ أَشْرَحْ لِي صَدْرِي",
  "transliteration": "Rabbi ishrah li sadri",
  "translation_en": "My Lord, open my heart for me",
  "translation_sq": "Zoti im, zgjeroji kraharorin tim",
  "category_main": "By Situation",
  "category_sub": "Fear & Anxiety",
  "tags": ["fear", "anxiety", "heart", "openness"],
  "source": "Quran 20:25",
  "audio": "duas-051.mp3"
}
```

---

## 🌍 Adding New Languages

### Example: Adding Arabic (Modern Standard Arabic)

**Step 1:** Add field to each dua in `data/duas.json`:
```json
"translation_ar": "يا إلهي، أرجو منك..."
```

**Step 2:** Add button to HTML (in header):
```html
<button id="langAr" class="lang-btn" data-lang="ar">العربية</button>
```

**Step 3:** JavaScript automatically handles it! No code changes needed.

---

## 📊 App Structure Explained

```
duas-app/
│
├── index.html
│   └── Complete page structure, form elements, containers
│       → Define what appears on screen
│       → Add new categories, buttons here
│
├── css/style.css
│   └── All styling, colors, layout, animations
│       → Change look & feel here
│       → Add new styles for custom features
│
├── js/app.js
│   └── Core functionality, filtering, search, events
│       → Add new features here
│       → Handles all interactive behavior
│
├── data/duas.json
│   └── All the dua content
│       → Database of supplications
│       → Add more duas here
│       → Add new languages here
│
└── server.js
    └── Simple Node.js server
        → Serves files locally
        → Handles requests
```

---

## 🐛 Troubleshooting

### "Duas Not Loading"
**Problem**: Duas grid is empty  
**Solution**: 
- Check browser console (F12 → Console)
- Verify `data/duas.json` exists
- Check server is running
- Ensure no typos in JSON

### "Styles Look Wrong"
**Problem**: CSS not applied  
**Solution**:
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R)
- Clear browser cache
- Check CSS file path in HTML

### "Search Not Working"
**Problem**: Filtering doesn't return results  
**Solution**:
- Try different keywords
- Check subcategories filter
- Verify data exists in duas.json
- Look at browser console for errors

### "LocalStorage Not Working"
**Problem**: Favorites not saving  
**Solution**:
- Check if incognito/private mode (disables storage)
- Enable localStorage in browser settings
- Try different browser
- Clear cache and try again

---

## 🎓 Learning Resources

### About Islamic Duas
- 📖 **Book**: "The Accepted Whispers" - Collection of Duas
- 👨‍🏫 **YouTube**: Search "Islamic Duas" for pronunciation
- 📚 **Website**: IslamicGate.com - Authentic duas
- 🌐 **Forum**: IslamQA.info - Questions about duas

### Web Development
- 📘 **HTML/CSS**: MDN Web Docs
- 🎯 **JavaScript**: JavaScript.info
- 🎨 **Colors**: Coolors.co - Color palette generator
- ✏️ **Fonts**: Google Fonts

---

## 💡 Tips for Best Experience

### For Daily Use
1. Open the app at the same time each day
2. Read "Dua of the Day" first
3. Use search to find duas for your situation
4. Save favorite duas for quick access
5. Switch to dark mode before bed

### For Learning
1. Learn 2-3 duas per week
2. Practice pronunciation (from transliteration)
3. Understand the meaning (read both languages)
4. Note the source (memorize authentic references)
5. Use them naturally in daily life

### For Teaching
1. Share the app link with students
2. Assign specific categories to read
3. Quiz them on sources and meanings
4. Have them add new duas (with verification)
5. Use "Dua of the Day" in class

---

## 📞 Support & Feedback

If you have:
- 🐛 **Bugs**: Report with browser/device info
- 💡 **Ideas**: Suggest features
- 📝 **Corrections**: Fix errors in duas or translations
- 🌍 **Translations**: Contribute new languages

---

## ✨ Advanced Tips

### Browser Developer Tools
Useful for customization:
- **Right-click** → "Inspect Element"
- **F12** → Opens developer tools
- **Console tab** → Debug JavaScript
- **Elements tab** → Inspect HTML/CSS

### Testing on Mobile
- **Chrome DevTools** → Toggle device toolbar (Ctrl+Shift+M)
- **View mobile version** → F12 → Device simulator
- **Real device**: Use same WiFi, open `http://[your-ip]:8000`

### Multiple Servers
If port 8000 is in use:
```bash
PORT=3000 node server.js
# Or
PORT=5000 node server.js
```

---

## 🙏 Final Notes

> "The greatest power in the universe is Dua (supplication). It is the weapon of the believer."
> 
> — Prophet Muhammad ﷺ

May this application bring you closer to Allah and help you in your spiritual journey. 

**Wa iyyak** (And you as well) 🤲

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Questions?** Check the README.md file for more details
