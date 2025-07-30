#!/bin/bash

echo "🚀 MomBuddy - Quick Deploy Script"
echo "================================="

# Check if GitHub CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found"
    echo "🔐 Authenticating with GitHub..."
    gh auth login
    echo "📤 Pushing to GitHub..."
    git push -u origin main
else
    echo "⚠️  GitHub CLI not found. Installing..."
    echo "Please install GitHub CLI first:"
    echo "curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg"
    echo "echo \"deb [arch=\$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main\" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null"
    echo "sudo apt update && sudo apt install gh"
    echo ""
    echo "Or push manually with:"
    echo "git push -u origin main"
fi

echo ""
echo "🎉 Next Steps:"
echo "1. Go to https://dashboard.render.com"
echo "2. Click 'New' → 'Blueprint'"
echo "3. Connect your repo: https://github.com/sourabhpunase/mombuddy"
echo "4. Render will auto-deploy using render.yaml"
echo ""
echo "📖 Full instructions in DEPLOYMENT.md"