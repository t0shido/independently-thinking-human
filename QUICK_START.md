# 🚀 Quick Start - Secure Admin Setup

## TL;DR
Your blog had a critical security issue. It's **fixed and safe now**. Follow these 3 steps to enable the secure admin panel.

---

## 3-Step Setup

### 1️⃣ Run Setup Script (2 minutes)
```bash
./setup_security.sh
```
- Creates admin user
- Runs database migrations
- Sets up authentication

### 2️⃣ Start Servers
```bash
# Terminal 1 - Backend
cd django_backend && source venv/bin/activate && python manage.py runserver

# Terminal 2 - Frontend  
npm run dev
```

### 3️⃣ Enable Admin Route
Edit `src/App.jsx` line 160, uncomment:
```javascript
<Route path="/admin" element={<AdminSecure />} />
```

**Done!** Visit `http://localhost:5173/admin`

---

## What Changed?

| Before | After |
|--------|-------|
| ❌ Password in code: `admin123` | ✅ Secure backend auth |
| ❌ No API protection | ✅ Token required |
| ❌ Anyone could admin | ✅ Login required |

---

## Test Checklist

- [ ] Run `./setup_security.sh`
- [ ] Create superuser when prompted
- [ ] Start both servers
- [ ] Uncomment admin route
- [ ] Login at `/admin`
- [ ] Create test article
- [ ] Logout works

---

## Need Help?

- **Detailed Guide**: `SECURITY_FIXES.md`
- **Full Summary**: `SECURITY_SUMMARY.md`
- **Logs**: `django_backend/django_debug.log`

---

## Current Status

✅ **Your site is SECURE**
- Admin route disabled
- Write endpoints protected
- No hardcoded passwords

⏳ **Action needed**: Run setup script (non-urgent)

---

**Questions?** Read `SECURITY_SUMMARY.md` first!
