# Deployment Guide

This guide covers deploying the Ani Potts portfolio to production.

## Architecture Overview

- **Frontend + API Routes**: Vercel
- **CMS** (when enabled): Render.com or AWS
- **Database** (when enabled): MongoDB Atlas
- **Media Storage**: Vercel Blob or S3
- **Domain**: anipotts.com

---

## Frontend Deployment (Vercel)

### Prerequisites

- GitHub repository with code pushed
- Vercel account
- Domain already pointing to Vercel (anipotts.com)

### Step 1: Push to GitHub

```bash
cd /Users/anipotts/Desktop/Programming/portfolio_websites/anipotts.com

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Portfolio v2"

# Create new repo on GitHub: anipotts
# Then push
git remote add origin git@github.com:anipotts/anipotts.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `anipotts` repository
3. Framework preset: **Next.js**
4. Root directory: `./`
5. Build command: `npm run build` (default)
6. Output directory: `.next` (default)

### Step 3: Add Environment Variables

In Vercel dashboard → Project Settings → Environment Variables, add:

```bash
# Resend Email (REQUIRED for contact form)
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=contact@anipotts.com
RESEND_TO_EMAIL=ani@anipotts.com

# PostHog Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://anipotts.com

# Payload CMS (add when ready to enable)
# DATABASE_URI=mongodb+srv://user:pass@cluster.mongodb.net/anipotts
# PAYLOAD_SECRET=your-production-secret-32-chars-minimum
```

### Step 4: Connect Domain

1. **Domain already connected**: Your domain `anipotts.com` should already be pointing to Vercel from your old portfolio.
2. In Vercel → Project Settings → Domains, verify `anipotts.com` and `www.anipotts.com` are connected.
3. If re-configuring:
   - Add domain: `anipotts.com`
   - Add redirect: `www.anipotts.com` → `anipotts.com`

### Step 5: Deploy

Click **Deploy** in Vercel. Your site will be live at `https://anipotts.com` in ~2 minutes.

### Automatic Deployments

- **`main` branch** → Production (`anipotts.com`)
- **Other branches** → Preview deployments

---

## Required External Services

### 1. Resend (Email)

**Purpose**: Send contact form notifications

**Setup**:
1. Go to [resend.com](https://resend.com)
2. Sign up / log in
3. Add and verify domain: `anipotts.com`
   - Add DNS records provided by Resend
4. Create API key in dashboard
5. Add `RESEND_API_KEY` to Vercel environment variables

**Pricing**: Free tier includes 100 emails/day

### 2. PostHog (Analytics) - Optional

**Purpose**: Track user behavior and events

**Setup**:
1. Go to [posthog.com](https://posthog.com)
2. Sign up / log in
3. Create new project
4. Copy Project API key and Host
5. Add to Vercel environment variables:
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`

**Pricing**: Free tier includes 1M events/month

---

## Payload CMS Deployment (Optional - When Ready)

### Option 1: Render.com (Recommended for Simplicity)

**Setup**:

1. **Create MongoDB Database**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Create database user
   - Whitelist Render IPs (or allow all: `0.0.0.0/0`)
   - Copy connection string

2. **Deploy Payload to Render**:
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect GitHub repo
   - Build command: `npm install && npm run build`
   - Start command: `npm run start`
   - Add environment variables:
     - `DATABASE_URI=mongodb+srv://...`
     - `PAYLOAD_SECRET=your-production-secret-min-32-chars`
     - `NEXT_PUBLIC_SITE_URL=https://anipotts.com`

3. **Enable Payload in Vercel**:
   - Add environment variable in Vercel:
     - `PAYLOAD_URL=https://your-render-app.onrender.com`
   - Uncomment Payload integration in `next.config.ts`
   - Push changes to trigger new deployment

**Pricing**: Render free tier available

### Option 2: AWS (for Advanced Users)

If you prefer AWS:

1. **Database**: RDS PostgreSQL or MongoDB Atlas
2. **Compute**: EC2 t3.micro or ECS Fargate
3. **Storage**: S3 for media uploads
4. **CDN**: CloudFront for media delivery

**Estimated Cost**: ~$20-50/month depending on usage

---

## Branch Strategy

### Branch Protection

Protect the `main` branch in GitHub:
1. Go to repo → Settings → Branches
2. Add rule for `main`:
   - ✅ Require pull request before merging
   - ✅ Require approvals: 1
   - ✅ Require status checks to pass

### Workflow

```bash
# Feature development
git checkout -b feat/new-feature
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin feat/new-feature
# Create PR to main on GitHub

# Bug fixes
git checkout -b fix/bug-description
# Fix bug
git commit -m "fix: resolve issue"
git push origin fix/bug-description

# Hotfixes (production)
git checkout -b hotfix/critical-fix
# Fix critical issue
git commit -m "hotfix: critical production fix"
# Fast-track PR and merge to main
```

---

## DNS Configuration

Your domain `anipotts.com` should have these records:

```
Type    Name    Value                       TTL
A       @       76.76.21.21                 Auto (Vercel)
CNAME   www     cname.vercel-dns.com        Auto (Vercel)
```

**Vercel will manage these automatically** when you connect your domain.

For Resend email verification, add:
```
TXT     @       resend verification string  Auto
```

---

## SSL/HTTPS

Vercel provides automatic SSL certificates via Let's Encrypt.
- Certificates auto-renew
- HTTPS enforced by default
- No manual configuration needed

---

## Monitoring & Rollback

### Check Deployment Status

- Vercel dashboard shows build logs and deployment status
- Access via: `https://vercel.com/your-username/anipotts`

### Rollback

If a deployment has issues:
1. Go to Vercel → Deployments
2. Find previous working deployment
3. Click **"..."** → **Promote to Production**

Or roll back via Git:
```bash
git revert HEAD
git push origin main
```

---

## Performance Checklist

Before going live, verify:

- [ ] Lighthouse score ≥ 90 on all core pages
- [ ] Images optimized (WebP/AVIF)
- [ ] Videos compressed and < 10MB
- [ ] Contact form working
- [ ] Analytics tracking correctly
- [ ] All links functional
- [ ] Mobile responsive
- [ ] Theme toggle working
- [ ] SEO meta tags complete

Run Lighthouse audit:
```bash
npm install -g @lhci/cli
lhci autorun --collect.url=https://anipotts.com
```

---

## Environment Variables Checklist

### Required for Production

- [x] `RESEND_API_KEY`
- [x] `RESEND_FROM_EMAIL`
- [x] `RESEND_TO_EMAIL`
- [x] `NEXT_PUBLIC_SITE_URL`

### Optional

- [ ] `NEXT_PUBLIC_POSTHOG_KEY`
- [ ] `NEXT_PUBLIC_POSTHOG_HOST`

### Required for Payload (when enabled)

- [ ] `DATABASE_URI`
- [ ] `PAYLOAD_SECRET`

---

## Troubleshooting

### Build Fails

**Issue**: Build error in Vercel
**Solution**: 
- Check build logs in Vercel
- Run `npm run build` locally first
- Ensure all dependencies in `package.json`

### Contact Form Not Working

**Issue**: Form submits but no email received
**Solution**:
- Verify `RESEND_API_KEY` is set in Vercel
- Check Resend dashboard for delivery logs
- Verify domain is verified in Resend

### Images Not Loading

**Issue**: 404 on images
**Solution**:
- Ensure images are in `/public/assets/`
- Verify paths start with `/assets/` not `/public/assets/`
- Check file names match exactly (case-sensitive)

### Analytics Not Tracking

**Issue**: PostHog not receiving events
**Solution**:
- Verify `NEXT_PUBLIC_POSTHOG_KEY` is set
- Check browser console for errors
- Ensure ad blockers are disabled when testing

---

## Support

For deployment issues:
- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Render**: [render.com/docs](https://render.com/docs)
- **Email**: ani@anipotts.com

---

## Post-Deployment Checklist

After first deployment:

- [ ] Visit `https://anipotts.com` and verify site loads
- [ ] Test contact form submission
- [ ] Verify analytics tracking (check PostHog dashboard)
- [ ] Test all navigation links
- [ ] Verify projects load correctly
- [ ] Test theme toggle
- [ ] Check mobile responsive design
- [ ] Run Lighthouse audit
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Share with friends for feedback!

---

**Deployment complete!** 🚀

Your portfolio is now live at [https://anipotts.com](https://anipotts.com)

