# Ani Potts Portfolio

A modern, high-performance portfolio website showcasing software engineering work, built with Next.js 15, TypeScript, and Tailwind CSS.

## Overview

This is a production-ready portfolio site featuring:
- **Hero section** with animated tagline
- **Project gallery** with filtering and case studies
- **Blog** with MDX support (ready for Payload CMS integration)
- **Hire Me / Pricing page** with intake form
- **Contact form** with Resend email integration
- **Dark/Light theme** toggle
- **PostHog analytics** integration

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API
- **Analytics**: PostHog
- **CMS**: Payload 3.x (configuration ready, not yet connected)
- **Hosting**: Vercel (frontend)

## Prerequisites

- Node.js 20+ 
- npm or yarn
- (Optional) MongoDB for Payload CMS

## Local Development Setup

### 1. Clone and Install

```bash
cd /path/to/anipotts.com
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Payload CMS (optional for now)
DATABASE_URI=mongodb://localhost:27017/anipotts-portfolio
PAYLOAD_SECRET=your-secret-key-min-32-chars-long

# Resend Email (required for contact form)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=contact@anipotts.com
RESEND_TO_EMAIL=ani@anipotts.com

# PostHog Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/anipotts.com/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes
│   │   │   └── contact/        # Contact form handler
│   │   ├── blog/               # Blog pages
│   │   ├── hire/               # Pricing page
│   │   ├── contact/            # Contact page
│   │   ├── projects/           # Projects gallery + case studies
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── navbar/             # Navigation
│   │   ├── footer/             # Footer
│   │   ├── home/               # Hero, Stats
│   │   ├── projects/           # Project grid and cards
│   │   ├── forms/              # Contact intake form
│   │   └── providers/          # Theme provider
│   ├── data/                   # Mock data (projects, blog)
│   ├── lib/                    # Utils, PostHog
│   └── payload.config.ts       # Payload CMS config (not active yet)
├── public/
│   ├── assets/
│   │   ├── images/             # Profile images
│   │   ├── projects/
│   │   │   ├── screenshots/    # Project screenshots
│   │   │   └── videos/         # Video demos (add your videos here)
│   │   ├── logos/              # Company logos
│   │   └── ani.pottammal_nyu_2026_resume.pdf
└── tailwind.config.ts
```

## Adding Screen Recordings / Videos

### Where to Place Videos

Put video files in:
```
/public/assets/projects/videos/
```

### Expected Video Files

Based on your project data, add these videos:
1. `chainedchat.mp4` - ChainedChat demo
2. `purity-test.mp4` - NYU Purity Test demo  
3. `quant-platform.mp4` - 300-member platform demo

### Optimizing Videos

Use ffmpeg to optimize videos for web:

```bash
# Compress and optimize for web
ffmpeg -i input.mov \
  -vcodec libx264 \
  -crf 23 \
  -preset medium \
  -vf scale=1920:-2 \
  -movflags +faststart \
  -acodec aac \
  -b:a 128k \
  output.mp4
```

**Recommended settings:**
- Resolution: 1920x1080 or 1280x720
- Format: MP4 (H.264)
- Duration: 10-30 seconds
- File size: < 10MB per video

## Content Management

### Current Setup (Static Data)

Projects and blog posts are currently defined in:
- `/src/data/projects.ts`
- `/src/data/blog.ts`

To edit content, modify these files directly.

### Payload CMS Integration (Coming Soon)

Payload CMS is configured but not yet connected. Once you set up MongoDB:

1. Uncomment Payload integration in `next.config.ts`:
```typescript
import { withPayload } from '@payloadcms/next/withPayload'
export default withPayload(nextConfig)
```

2. Start MongoDB and run:
```bash
npm run dev
```

3. Access Payload admin at `/admin`

See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for full CMS documentation.

## Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Editing Pricing Copy

Pricing tiers are in `/src/app/hire/page.tsx`. Update the `pricingTiers` array:

```typescript
const pricingTiers = [
  {
    name: 'Starter',
    description: '...',
    placeholder: '$5k-15k',
    features: ['...'],
  },
  // ...
]
```

## Contact

- **Website**: https://anipotts.com
- **Email**: ani@anipotts.com
- **GitHub**: https://github.com/anipotts

## License

All rights reserved © 2025 Ani Potts
