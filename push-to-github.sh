#!/bin/bash

echo "🚀 MomBuddy - Push to GitHub Script"
echo "=================================="

# Check if git is configured
if ! git config user.name > /dev/null; then
    echo "⚠️  Git user not configured. Please run:"
    echo "git config --global user.name 'Your Name'"
    echo "git config --global user.email 'your.email@example.com'"
    exit 1
fi

echo "📦 Current repository status:"
git status

echo ""
echo "🔗 Remote repository:"
git remote -v

echo ""
echo "📤 Pushing to GitHub..."
echo "You'll need to authenticate with GitHub."
echo "Options:"
echo "1. Use GitHub CLI: gh auth login"
echo "2. Use personal access token"
echo "3. Use SSH key"

echo ""
echo "To push manually, run:"
echo "git push -u origin main"

echo ""
echo "✅ Repository is ready for deployment!"
echo "Check deploy.md for deployment instructions."