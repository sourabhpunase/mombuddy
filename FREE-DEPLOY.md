# 🆓 FREE Deployment on Render

## Step 1: Deploy Frontend (Static Site - FREE)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New" → "Static Site"**
3. Connect GitHub: `sourabhpunase/mombuddy`
4. Configure:
   - **Name**: `mombuddy-frontend`
   - **Root Directory**: `pregnancy`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Auto-Deploy**: Yes

## Step 2: Deploy Backend (Web Service - FREE)

1. Click **"New" → "Web Service"**
2. Connect GitHub: `sourabhpunase/mombuddy`
3. Configure:
   - **Name**: `mombuddy-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
   - **Instance Type**: Free

## ✅ FREE Tier Limits:
- ✅ Static sites: Unlimited
- ✅ Web services: 750 hours/month (enough for 24/7)
- ✅ No credit card required
- ⚠️ Services sleep after 15 min of inactivity (wake up automatically)

## 🔗 Your URLs:
- Frontend: `https://mombuddy-frontend.onrender.com`
- Backend: `https://mombuddy-backend.onrender.com`

## 🚀 Deploy Now:
Just follow the steps above - no payment required!