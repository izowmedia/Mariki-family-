# 🔥 Mariki Family Portal

> **Umoja Wetu Ni Nguvu Yetu**
> A premium, luxury family management portal — static HTML/CSS/Vanilla JS + Firebase.

## ✨ What's included

A complete, deploy-ready static site:

| Page | Purpose |
|---|---|
| `index.html` | Animated landing page (hero, features, events, gallery, testimonials) |
| `login.html` | Email/password + Google sign in, "Remember me" persistence |
| `register.html` | 4-step registration: Personal → Contact → Family → Profile (Cloudinary photo upload, TZ phone validation) |
| `forgot.html` | Password reset email |
| `pending.html` | Shown to members awaiting approval |
| `dashboard.html` | Stat cards + Chart.js analytics + recent payments + upcoming events |
| `members.html` | Searchable directory of approved members |
| `contributions.html` | Treasurer creates, members pay via ClickPesa |
| `payments.html` | Full payment history with status filter |
| `events.html` | Admins create events; members RSVP; live countdowns |
| `gallery.html` | Image/video gallery with lightbox; admin upload via Cloudinary |
| `admin.html` | Approve/reject pending members; role assignment (superadmin); block/unblock; activity logs |
| `messaging.html` | Bulk SMS / Email broadcast composer with templates and delivery queue |
| `profile.html` | Edit personal & family info; change photo |
| `settings.html` | Password change, verification email, sign out |

## 🛠 Stack

- HTML5 + CSS3 (custom luxury design system — gold gradients on deep black)
- Vanilla JavaScript (ES modules, no build step)
- [Firebase](https://firebase.google.com/) — Auth + Firestore + Storage
- [Cloudinary](https://cloudinary.com/) — image/video uploads
- [ClickPesa](https://clickpesa.com/) — payments (TZS)
- [Chart.js](https://www.chartjs.org/) — analytics charts
- [FontAwesome](https://fontawesome.com/) — icons
- Google Fonts: Playfair Display + Plus Jakarta Sans

## 🚀 Setup (5 minutes)

### 1. Firebase

1. Create a Firebase project: https://console.firebase.google.com
2. Enable **Authentication** → Sign-in methods → enable **Email/Password** and **Google**
3. Enable **Firestore Database** (start in production mode)
4. Enable **Storage** (optional — Cloudinary handles uploads)
5. Open `firebase.js` and replace `firebaseConfig` with **your** project's config
   (Project Settings → Your Apps → Web App → "Firebase SDK snippet" → Config)
6. Deploy security rules:
   - Firebase Console → Firestore → Rules → paste contents of `firestore.rules` → Publish

### 2. Cloudinary (for photos/gallery)

1. Sign up at https://cloudinary.com
2. Dashboard → Settings → Upload → **Add upload preset** → set **Signing Mode = Unsigned**
3. Note your **Cloud name** and the **Upload preset name**
4. Open `firebase.js` and fill in `cloudinaryConfig`

### 3. ClickPesa (for payments)

1. Sign up at https://clickpesa.com and obtain API keys
2. The client never sees the secret — payments go through `netlify/functions/clickpesa.js`
3. In Netlify dashboard → **Site settings → Environment variables** add:
   - `CLICKPESA_API_KEY`
   - `CLICKPESA_SECRET_KEY`
   - `CLICKPESA_MERCHANT_ID`
4. (Optional) Update the endpoint paths in `netlify/functions/clickpesa.js` to match ClickPesa's current API docs.

### 4. Create the Superadmin

Since the first user has no one to approve them, do this once manually:

1. Register via `register.html` (creates a `users/{uid}` doc with `status:"pending"`, `role:"member"`)
2. Open Firebase Console → Firestore → `users/{your-uid}`
3. Edit fields: set `role: "superadmin"` and `status: "approved"`
4. You can now sign in and approve everyone else from the Admin panel.

### 5. (Optional) Bulk SMS / Email delivery worker

The `messaging.html` page **queues** messages into the `messages` Firestore collection
with `status:"queued"`. To actually send them, wire a small worker (Netlify scheduled
function, Cloud Function, etc.) that:

1. Reads `messages` where `status == "queued"`
2. For each recipient, sends via your provider:
   - **SMS** → Africa's Talking, Beem Africa, Twilio, etc.
   - **Email** → SendGrid, Resend, Mailgun, etc.
3. Updates `status` to `"sent"` (or `"failed"`)

## 🌐 Deploy to Netlify

**Option A — Drag & drop**
1. Zip this folder
2. Go to https://app.netlify.com/drop and drop the folder
3. Done.

**Option B — Git**
1. Push this folder to GitHub
2. Netlify → Add new site → Import from Git → select repo
3. Build command: *(leave empty)* — Publish directory: `.`

**Option C — Open locally**
Because everything is static, you can just open `index.html` — but Firebase Auth
popups require a real origin, so use a quick local server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## 🔐 User roles

| Role | Can |
|---|---|
| `superadmin` | Everything. Assigns roles. Deletes users. Sees activity logs. |
| `admin` | Approves/rejects members. Blocks users. Manages events, gallery, broadcasts. Can pause/delete contributions. |
| `treasurer` | Creates/edits contributions. Tracks payments. |
| `member` | Views dashboard, pays contributions, RSVPs to events, edits own profile. |

Roles are enforced both by Firestore rules and by the client guard (`assets/js/auth-guard.js`).

## 📁 File structure

```
/
├── index.html
├── login.html
├── register.html
├── forgot.html
├── pending.html
├── dashboard.html
├── admin.html
├── members.html
├── contributions.html
├── payments.html
├── gallery.html
├── events.html
├── messaging.html
├── profile.html
├── settings.html
├── firebase.js
├── firestore.rules
├── netlify.toml
├── netlify/functions/clickpesa.js
├── README.md
└── assets/
    ├── css/styles.css
    ├── js/common.js
    ├── js/auth-guard.js
    ├── js/sidebar.js
    ├── js/cloudinary.js
    └── js/clickpesa.js
```

## 🎨 Design system

Edit `assets/css/styles.css` — all colors, gradients and tokens are at the top:

```css
--gold:#d4af37;
--gold-grad: linear-gradient(135deg,#bf953f,#fcf6ba,#b38728,#fbf5b7,#aa771c);
--bg:#0a0a0a;
```

## 📝 License

Built for the Mariki family. Reuse with attribution.
