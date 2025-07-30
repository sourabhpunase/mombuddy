# 🚀 Deploy MomBuddy on Vercel (FAST!)

## Option 1: Full-Stack Deployment (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import from GitHub**: `sourabhpunase/mombuddy`
4. **Configure:**
   - **Framework Preset**: Vite
   - **Root Directory**: `pregnancy`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## Option 2: Separate Deployments

### Frontend:
1. **New Project** → Import `sourabhpunase/mombuddy`
2. **Root Directory**: `pregnancy`
3. **Deploy**

### Backend:
1. **New Project** → Import `sourabhpunase/mombuddy` 
2. **Root Directory**: `server`
3. **Deploy**

## ⚡ Why Vercel is Faster:
- ✅ **Instant builds** (2-3 minutes vs 15+ on Render)
- ✅ **Global CDN** for frontend
- ✅ **Serverless functions** for backend
- ✅ **Auto-scaling**
- ✅ **Free tier** with great limits

## 🔗 Your URLs:
- **Frontend**: `https://mombuddy-frontend.vercel.app`
- **Backend**: `https://mombuddy-backend.vercel.app`

## 🎯 One-Click Deploy:
Just click "Deploy" on Vercel - it will auto-detect everything!