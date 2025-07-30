# MomBuddy Deployment on Render

## Step 1: Push to GitHub

1. **Authenticate with GitHub** (choose one method):
   ```bash
   # Method 1: GitHub CLI (recommended)
   gh auth login
   
   # Method 2: Set up SSH key
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Add the public key to GitHub
   
   # Method 3: Use Personal Access Token
   # Generate token at: https://github.com/settings/tokens
   ```

2. **Push your code**:
   ```bash
   git push -u origin main
   ```

## Step 2: Deploy on Render

### Option A: Deploy Both Services Together
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository: `https://github.com/sourabhpunase/mombuddy`
4. Render will automatically detect the `render.yaml` file
5. Click "Apply" to deploy both frontend and backend

### Option B: Deploy Services Separately

#### Backend Deployment:
1. Click "New" → "Web Service"
2. Connect GitHub repo: `sourabhpunase/mombuddy`
3. Configure:
   - **Name**: `mombuddy-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
   - **Node Version**: 18

#### Frontend Deployment:
1. Click "New" → "Static Site"
2. Connect GitHub repo: `sourabhpunase/mombuddy`
3. Configure:
   - **Name**: `mombuddy-frontend`
   - **Root Directory**: `pregnancy`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

## Step 3: Environment Variables

### Backend (.env):
```
PORT=5000
NODE_ENV=production
```

### Frontend:
- No environment variables needed for basic setup
- Add `VITE_API_URL` if you need to connect to backend

## Step 4: Custom Domain (Optional)
1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Add your domain and configure DNS

## Troubleshooting

### Build Failures:
- Check Node.js version (use 18)
- Verify package.json scripts
- Check build logs in Render dashboard

### Connection Issues:
- Ensure CORS is configured in backend
- Check API URLs in frontend
- Verify environment variables

## URLs After Deployment:
- Backend: `https://mombuddy-backend.onrender.com`
- Frontend: `https://mombuddy-frontend.onrender.com`