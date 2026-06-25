# ZimHipHopZone Website — Deployment Guide

Zimbabwe's #1 Hip Hop Platform · github.io deployment

---

## 📁 Project Structure

```
zimhiphopzone/
├── index.html          ← Main website
├── css/
│   └── style.css       ← All styling
├── js/
│   └── main.js         ← Interactions & animations
├── images/             ← Add your images here
└── README.md           ← This file
```

---

## 🚀 HOW TO DEPLOY ON GITHUB PAGES (Step-by-Step)

### STEP 1 — Create a GitHub Account
1. Go to **https://github.com**
2. Click **Sign up**
3. Use your email, create a username (e.g. `zimhiphopzone`) and a password
4. Verify your email address

---

### STEP 2 — Create a New Repository
1. Once logged in, click the **"+"** button (top right) → **New repository**
2. Set **Repository name** to: `zimhiphopzone.github.io`
   > ⚠️ IMPORTANT: The repo name MUST follow this exact format: `yourusername.github.io`
   > Example: if your GitHub username is `zimhiphopzone`, name it `zimhiphopzone.github.io`
3. Set it to **Public**
4. Do NOT tick "Add a README file" (we already have one)
5. Click **Create repository**

---

### STEP 3 — Install Git on Your Computer

**Windows:**
1. Go to https://git-scm.com/download/win
2. Download and install Git
3. Open **Git Bash** (search in Start Menu)

**Mac:**
- Open Terminal, type `git --version` — if not installed, macOS will prompt you to install it

**Linux (Ubuntu/Debian):**
```bash
sudo apt update && sudo apt install git
```

---

### STEP 4 — Configure Git (First Time Only)
Open Git Bash / Terminal and run:
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

### STEP 5 — Upload Your Website Files

In Git Bash / Terminal, navigate to your project folder and run these commands one by one:

```bash
# 1. Go to your project folder
cd path/to/zimhiphopzone
# Example on Windows: cd C:/Users/YourName/Desktop/zimhiphopzone
# Example on Mac/Linux: cd ~/Desktop/zimhiphopzone

# 2. Initialize git
git init

# 3. Add all files
git add .

# 4. Commit the files
git commit -m "Launch ZimHipHopZone website"

# 5. Connect to your GitHub repo (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git

# 6. Push files to GitHub
git branch -M main
git push -u origin main
```

When prompted, enter your GitHub username and password (or a Personal Access Token — see Step 5b below).

---

### STEP 5b — GitHub Personal Access Token (if password doesn't work)
GitHub no longer accepts plain passwords for Git. Do this instead:
1. GitHub → **Settings** (top right profile) → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a name, set expiry (90 days or no expiry), tick **repo** checkbox
4. Click **Generate token** — COPY the token now (you won't see it again)
5. When Git asks for password, paste the token instead

---

### STEP 6 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (tab near the top)
3. In the left sidebar, click **Pages**
4. Under **Branch**, select `main` and folder `/root`
5. Click **Save**
6. Wait 1–3 minutes

---

### STEP 7 — Visit Your Live Website 🎉
Your site will be live at:
```
https://USERNAME.github.io
```
> Example: https://zimhiphopzone.github.io

---

## 🔄 HOW TO UPDATE YOUR WEBSITE

Whenever you make changes to your files, run:
```bash
git add .
git commit -m "Update: describe what you changed"
git push
```
Changes go live within 1–2 minutes.

---

## 🖼️ ADDING YOUR OWN IMAGES

1. Put your images inside the `images/` folder
2. In `index.html`, replace placeholder background styles with:
```css
background-image: url('images/your-image.jpg');
background-size: cover;
background-position: center;
```
Or for `<img>` tags:
```html
<img src="images/artist-name.jpg" alt="Artist Name" />
```

**Recommended image sizes:**
- Hero background: 1920×1080px (JPG, max 300KB)
- News card thumbnails: 800×600px
- Artist avatars: 200×200px (square)
- Open Graph cover (og-cover.jpg): 1200×630px

---

## 🎨 CUSTOMIZING YOUR SITE

### Change Brand Colors
Open `css/style.css`, edit the `:root` section at the top:
```css
:root {
  --green: #39FF14;   /* Electric green — change to your colour */
  --gold: #FFD700;    /* Gold — change to your colour */
}
```

### Add Real Artist Names to the Cup
Open `js/main.js`, find `matchData` and update:
```javascript
const matchData = {
  'A-1': { a: 'Cal_Vin', b: 'Killa T' },
  'A-2': { a: 'Lady Bee', b: 'Dope Dollar' },
  // ... add all 16 real artist names
};
```
Also update the artist names in the HTML `index.html` (search for "Artist 01" etc.)

### Change News Articles
In `index.html`, find the `news-section` and edit the card titles, excerpts, dates and tags.

---

## 🌐 CUSTOM DOMAIN (Optional — e.g. zimhiphopzone.com)

1. Buy a domain from Namecheap, GoDaddy, or Porkbun
2. In GitHub → Repository → Settings → Pages → **Custom domain** → enter your domain
3. In your domain registrar's DNS settings, add these records:
   ```
   A     185.199.108.153
   A     185.199.109.153
   A     185.199.110.153
   A     185.199.111.153
   CNAME www → USERNAME.github.io
   ```
4. Wait up to 24 hours for DNS to propagate
5. Tick **Enforce HTTPS** in GitHub Pages settings

---

## 📞 NEED HELP?
- GitHub Pages Docs: https://docs.github.com/en/pages
- GitHub Community: https://github.com/orgs/community/discussions
- ZimHipHopZone Facebook: https://www.facebook.com/zimhiphopzone

---

*Built with 🔥 by ZimHipHopZone — Shona Bars. Real Talk. Zim Hip Hop.*
