# MomBuddy Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended for Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd pregnancy
vercel --prod
```

### 2. Netlify
```bash
# Build the project
cd pregnancy
npm run build

# Deploy dist folder to Netlify
```

### 3. Railway (For Full Stack)
```bash
# Connect to Railway
railway login
railway link
railway up
```

### 4. Render
- Connect GitHub repo
- Set build command: `cd pregnancy && npm run build`
- Set start command: `cd server && npm start`

## Environment Setup

Create `.env` files:

### Frontend (.env in pregnancy folder):
```
VITE_API_URL=http://localhost:5000
VITE_AI_API_KEY=your_ai_api_key
```

### Backend (.env in server folder):
```
PORT=5000
NODE_ENV=production
AI_API_KEY=your_ai_api_key
```

## Build Commands
- Frontend: `cd pregnancy && npm run build`
- Backend: `cd server && npm start`
- Full project: `npm run build`