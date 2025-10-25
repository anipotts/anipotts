# Payload CMS Admin Guide

This guide explains how to manage content on your portfolio using Payload CMS once it's enabled.

## Table of Contents

- [Accessing the Admin Panel](#accessing-the-admin-panel)
- [Managing Projects](#managing-projects)
- [Managing Blog Posts](#managing-blog-posts)
- [Managing Pricing](#managing-pricing)
- [Viewing Contact Submissions](#viewing-contact-submissions)
- [Media Library](#media-library)
- [User Management](#user-management)

---

## Accessing the Admin Panel

### URL

Once Payload is enabled, access the admin panel at:

```
https://anipotts.com/admin
```

Or during local development:

```
http://localhost:3000/admin
```

### First Time Setup

1. When you first visit `/admin`, you'll be prompted to create an admin user
2. Enter your:
   - **Name**: Your full name
   - **Email**: Your email address
   - **Password**: Strong password (min 8 characters)
3. Click **Create**
4. You'll be logged in automatically

### Logging In

Use the same email and password to log in on future visits.

---

## Managing Projects

Projects appear in the **Projects Gallery** on your homepage and `/projects` page.

### Adding a New Project

1. Navigate to **Collections** → **Projects**
2. Click **Create New**
3. Fill in required fields:

   **Basic Info**:
   - **Title**: Project name (e.g., "ChainedChat")
   - **Slug**: URL-friendly name (auto-generated from title)
   - **Short Summary**: 1-line pitch (<200 chars)
   - **Category**: Select from AI / Product / Quant / Music
   - **Duration**: e.g., "2 weeks"
   - **Role**: e.g., "Full-stack Developer"

   **Technical Details**:
   - **Stack**: Click **Add Item** for each technology
     - Enter each tech: "Next.js", "TypeScript", etc.
   - **Repo URL**: GitHub link (optional)
   - **Demo URL**: Live demo link (optional)

   **Media**:
   - **Media**: Upload screenshot/thumbnail
   - **Has Video**: Check if you have a video demo
   - **Video Filename**: Enter filename (e.g., "chainedchat.mp4")
     - Place actual video in `/public/assets/projects/videos/`

   **Visibility**:
   - **Public**: Show on website (default: checked)
   - **Case Study**: Show full case study page (for featured projects)
   - **Status**: Draft / Published / Revamp Pending

   **Key Points**:
   - Click **Add Item** to add each key result/feature
   - Add 3-5 bullet points highlighting impact

4. **Optional**: Add **Long Description** (for case study page)
   - Use the rich text editor
   - Add sections: Overview, Technical Approach, Challenges, Results

5. Click **Save** or **Save and Publish**

### Editing a Project

1. Go to **Collections** → **Projects**
2. Click on project title
3. Make changes
4. Click **Save**

### Hiding a Project

To temporarily hide a project without deleting:

1. Open the project
2. Uncheck **Public**
3. Or set **Status** to "Draft"
4. Save

### Deleting a Project

1. Open the project
2. Click **Delete** (bottom of page)
3. Confirm deletion

---

## Managing Blog Posts

Blog posts appear on `/blog` and `/blog/[slug]`.

### Creating a Blog Post

1. Navigate to **Collections** → **Posts**
2. Click **Create New**
3. Fill in fields:

   **Basic Info**:
   - **Title**: Post title
   - **Slug**: URL-friendly (auto-generated)
   - **Status**: Draft / Published
   - **Author**: Your name (default: "Ani Potts")
   - **Excerpt**: Short summary for listing page
   - **Publish Date**: When to publish (default: today)

   **Content**:
   - **Content**: Main post content (rich text editor)
     - Use headings (H2, H3) to structure content
     - Add images via media library
     - Format code blocks with ` ``` `
     - Embed Reactbits components (advanced)

   **Media**:
   - **Cover Image**: Upload featured image for post

   **Categorization**:
   - **Tags**: Select from Engineering / Math / Product / Devlog

   **SEO**:
   - **Meta Title**: Custom SEO title (optional)
   - **Meta Description**: SEO description (optional)

4. Click **Save Draft** or **Publish**

### Embedding Reactbits Components in MDX

You can embed interactive components in blog posts:

```mdx
# My Post Title

Regular markdown content here.

<!-- Embed a component -->

<AnimatedCounter end={100} />

More content...
```

Available components will depend on what you import in your MDX configuration.

### Scheduling Posts

Set **Publish Date** to a future date. The post will appear on that date automatically.

### Post Categories/Tags

Filter posts by tag on the blog page. Available tags:

- Engineering
- Math
- Product
- Devlog

Add new tags by editing the `posts` collection schema in `payload.config.ts`.

---

## Managing Pricing

Pricing tiers appear on `/hire` page.

### Editing Pricing Tiers

1. Navigate to **Collections** → **Pricing**
2. Click on tier to edit (Starter / Standard / Product)
3. Edit fields:
   - **Name**: Tier name
   - **Description**: One-line description
   - **Placeholder**: Price range (e.g., "$5k-15k")
   - **Features**: Click **Add Item** for each feature
   - **Order**: Display order (lower = first)
4. Click **Save**

### Adding a New Tier

1. Go to **Collections** → **Pricing**
2. Click **Create New**
3. Fill in details
4. Set **Order** number (0 = first, 1 = second, etc.)
5. Save

The pricing page will automatically update.

---

## Viewing Contact Submissions

All contact form submissions are stored in Payload.

### Accessing Submissions

1. Navigate to **Collections** → **Contacts**
2. View list of all submissions sorted by date
3. Click on any submission to view full details

### Submission Details

Each submission includes:

- Name
- Email
- Company (if provided)
- Project Type
- Timeline
- Budget Range
- Message
- Submitted At (timestamp)

### Exporting Submissions

To export all submissions:

1. Go to **Collections** → **Contacts**
2. Select items (or select all)
3. Click **Export** (if enabled) or manually copy data

### Responding to Inquiries

Submissions are also sent to your email via Resend. Reply directly from your email.

---

## Media Library

Upload and manage images and files.

### Uploading Media

1. Navigate to **Media**
2. Click **Upload**
3. Select file(s) from your computer
4. Each upload prompts for:
   - **Alt Text**: Describe the image (required for accessibility)
5. Click **Save**

### Using Uploaded Media

When editing projects or blog posts:

1. Click **Select Media** or **Upload**
2. Choose from media library
3. Image will be embedded/referenced

### Organizing Media

Media files are stored in `/public/media/` directory on the server.

### Deleting Media

1. Go to **Media**
2. Click on image
3. Click **Delete**
4. Confirm

**Warning**: Deleting media will break any references to it in projects/posts.

---

## User Management

Manage who has access to the admin panel.

### Adding Users

1. Navigate to **Collections** → **Users**
2. Click **Create New**
3. Enter:
   - **Name**: Full name
   - **Email**: Login email
   - **Password**: Secure password
4. Click **Save**

New user can log in at `/admin`.

### Changing Password

#### Your Own Password

1. Click your profile (top-right)
2. Click **Account**
3. Enter new password
4. Save

#### Another User's Password

1. Go to **Collections** → **Users**
2. Click on user
3. Edit **Password** field
4. Save

### Removing Users

1. Go to **Collections** → **Users**
2. Click on user
3. Click **Delete**
4. Confirm

**Note**: You cannot delete your own account while logged in.

---

## Advanced: Editing Collection Schemas

To add new fields or collections, edit `/src/payload.config.ts`.

Example: Adding a new field to Projects:

```typescript
{
  name: 'featured',
  type: 'checkbox',
  defaultValue: false,
  admin: {
    position: 'sidebar',
  },
}
```

After editing, restart the dev server:

```bash
npm run dev
```

---

## Tips & Best Practices

### Projects

- Keep **Short Summary** under 200 characters
- Add 3-5 **Key Points** max (more is overwhelming)
- Use **Case Study** only for your best work
- Set **Status** to "Revamp Pending" for WIP projects

### Blog Posts

- Write **Excerpt** carefully—this shows in previews
- Use **Cover Images** for better engagement
- Add **Tags** to help categorize content
- Keep paragraphs short (3-4 lines) for readability

### Media

- Optimize images before uploading (< 500KB)
- Always add **Alt Text** for accessibility
- Use descriptive file names

### SEO

- Fill in **Meta Title** and **Meta Description** for important posts/projects
- Keep Meta Title under 60 characters
- Keep Meta Description under 155 characters

---

## Troubleshooting

### Can't Log In

**Issue**: "Invalid email or password"
**Solution**:

- Double-check email and password
- Try password reset (if configured)
- Check that user account exists in database

### Changes Not Appearing on Site

**Issue**: Made changes but website doesn't update
**Solution**:

- Ensure item is **Published** (not Draft)
- Clear browser cache
- For Vercel, changes may take 1-2 minutes to deploy

### Media Upload Fails

**Issue**: Can't upload images
**Solution**:

- Check file size (< 5MB recommended)
- Ensure file format is supported (jpg, png, webp)
- Check available storage

### Rich Text Editor Not Loading

**Issue**: Can't edit content field
**Solution**:

- Refresh page
- Clear browser cache
- Try different browser
- Check console for errors

---

## Support

For CMS-related issues:

- **Payload Docs**: [payloadcms.com/docs](https://payloadcms.com/docs)
- **Email**: ani@anipotts.com

---

## Quick Reference

### Common Tasks

| Task            | Navigation                          |
| --------------- | ----------------------------------- |
| Add project     | Collections → Projects → Create New |
| Write blog post | Collections → Posts → Create New    |
| Edit pricing    | Collections → Pricing → Select tier |
| View contacts   | Collections → Contacts              |
| Upload image    | Media → Upload                      |
| Add user        | Collections → Users → Create New    |
| Change password | Profile → Account                   |

---

**Happy content editing!** 🎉
