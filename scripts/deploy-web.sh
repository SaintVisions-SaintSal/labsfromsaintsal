#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# LABS FROM SAINTSAL — WEB DEPLOYMENT SCRIPT
# Deploys the Next.js web companion app to Vercel
# ═══════════════════════════════════════════════════════════════════════════════

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
WEB_DIR="$PROJECT_ROOT/web"

echo "═══════════════════════════════════════════════════════════════"
echo "  LABS FROM SAINTSAL — WEB DEPLOYMENT"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check if we're in the right directory
if [ ! -d "$WEB_DIR" ]; then
  echo "❌ Error: web directory not found at $WEB_DIR"
  exit 1
fi

cd "$WEB_DIR"

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Building Next.js app..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""
echo "To deploy to Vercel:"
echo "  1. Install Vercel CLI: npm i -g vercel"
echo "  2. Run: cd web && vercel"
echo ""
echo "Or connect the /web directory to Vercel via the dashboard:"
echo "  - Root Directory: web"
echo "  - Framework Preset: Next.js"
echo ""
echo "═══════════════════════════════════════════════════════════════"
