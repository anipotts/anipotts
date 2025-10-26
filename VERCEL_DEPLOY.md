# Deploy to Vercel - Step by Step

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `anipotts` (or `anipotts-portfolio`)
3. Keep it **Public** (required for free Vercel hosting)
4. **Do NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 2: Push Your Code to GitHub

Run these commands in your terminal:

```bash
cd /Users/anipotts/Desktop/Programming/portfolio_websites/anipotts.com

# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/anipotts.git

# Rename branch to main (Vercel prefers main)
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `anipotts` repository
4. Configure project:
   - **Project Name**: `anipotts`
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
5. **Environment Variables** (Important!):

   ```
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   RESEND_API_KEY=your_resend_key
   ```

6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel --prod
```

## Step 4: Configure Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add domain: `anipotts.com`
4. Follow DNS configuration instructions:
   - Add A record: `76.76.21.21`
   - Add CNAME for www: `cname.vercel-dns.com`

## Step 5: Set Up Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```env
# PostHog Analytics (Optional but recommended)
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Resend Email API (For contact form)
RESEND_API_KEY=re_your_key_here
```

Get your keys:

- PostHog: https://app.posthog.com/project/settings
- Resend: https://resend.com/api-keys

## Troubleshooting

### Build Errors

If you get build errors about missing environment variables:

1. Go to Vercel → Project Settings → Environment Variables
2. Add all required variables
3. Redeploy: Deployments → Click ⋯ → Redeploy

### Domain Not Working

1. Check DNS propagation: https://www.whatsmydns.net/
2. DNS can take 24-48 hours to propagate
3. Verify DNS records match Vercel's requirements

### Images Not Loading

If profile image or project screenshots don't load:

1. Ensure all images are in `/public` directory
2. Check file paths start with `/` (e.g., `/assets/images/ani_pfp.jpg`)
3. Verify image files were committed to Git

## Post-Deployment Checklist

- [ ] Site loads at vercel-generated URL
- [ ] Custom domain configured (anipotts.com)
- [ ] All images loading correctly
- [ ] Contact form works
- [ ] Analytics tracking (check PostHog)
- [ ] Mobile responsive on real devices
- [ ] Dark/light mode toggle works
- [ ] All project links work
- [ ] Resume PDF downloads

## Auto-Deploy Setup

Vercel automatically deploys when you push to `main` branch:

```bash
# Make changes
git add .
git commit -m "your message"
git push origin main

# Vercel will auto-deploy in ~2 minutes
```

## Useful Links

- Your Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- GitHub Repo: https://github.com/YOUR_USERNAME/anipotts
- PostHog Setup: https://posthog.com/docs/libraries/next-js
- Resend Setup: https://resend.com/docs/send-with-nextjs

---

**Current Status**: Ready to deploy  
**Estimated Time**: 10-15 minutes  
**Cost**: $0 (Free tier covers everything)
