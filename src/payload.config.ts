import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    // Users
    {
      slug: "users",
      auth: true,
      admin: {
        useAsTitle: "email",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
      ],
    },
    // Posts
    {
      slug: "posts",
      admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "status", "publishDate"],
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "draft",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
          ],
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "author",
          type: "text",
          defaultValue: "Ani Potts",
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "excerpt",
          type: "textarea",
          required: true,
        },
        {
          name: "content",
          type: "richText",
          required: true,
        },
        {
          name: "coverImage",
          type: "upload",
          relationTo: "media",
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "tags",
          type: "select",
          hasMany: true,
          options: [
            { label: "Engineering", value: "engineering" },
            { label: "Math", value: "math" },
            { label: "Product", value: "product" },
            { label: "Devlog", value: "devlog" },
          ],
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "metaTitle",
          type: "text",
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "metaDescription",
          type: "textarea",
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "publishDate",
          type: "date",
          required: true,
          defaultValue: () => new Date().toISOString(),
          admin: {
            position: "sidebar",
          },
        },
      ],
    },
    // Projects
    {
      slug: "projects",
      admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "status", "public"],
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "shortSummary",
          type: "textarea",
          required: true,
          maxLength: 200,
        },
        {
          name: "longDescription",
          type: "richText",
        },
        {
          name: "stack",
          type: "array",
          required: true,
          fields: [
            {
              name: "technology",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "category",
          type: "select",
          required: true,
          options: [
            { label: "AI", value: "ai" },
            { label: "Product", value: "product" },
            { label: "Quant", value: "quant" },
            { label: "Music", value: "music" },
          ],
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "duration",
          type: "text",
          required: true,
          admin: {
            description: 'e.g., "2 weeks", "4 hours"',
          },
        },
        {
          name: "role",
          type: "text",
          required: true,
        },
        {
          name: "repoUrl",
          type: "text",
          admin: {
            description: "GitHub repository URL",
          },
        },
        {
          name: "demoUrl",
          type: "text",
          admin: {
            description: "Live demo URL",
          },
        },
        {
          name: "media",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Screenshot or thumbnail",
          },
        },
        {
          name: "hasVideo",
          type: "checkbox",
          defaultValue: false,
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "videoFilename",
          type: "text",
          admin: {
            description: "Video filename in /public/assets/projects/videos/",
            condition: (data) => data.hasVideo,
          },
        },
        {
          name: "public",
          type: "checkbox",
          defaultValue: true,
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "caseStudy",
          type: "checkbox",
          defaultValue: false,
          admin: {
            position: "sidebar",
            description: "Show full case study page",
          },
        },
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "published",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
            { label: "Revamp Pending", value: "revamp_pending" },
          ],
          admin: {
            position: "sidebar",
          },
        },
        {
          name: "keyPoints",
          type: "array",
          maxRows: 5,
          fields: [
            {
              name: "point",
              type: "textarea",
              required: true,
            },
          ],
        },
      ],
    },
    // Testimonials
    {
      slug: "testimonials",
      admin: {
        useAsTitle: "name",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "role",
          type: "text",
          required: true,
        },
        {
          name: "text",
          type: "textarea",
          required: true,
        },
        {
          name: "clientCompany",
          type: "text",
        },
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    // Pricing
    {
      slug: "pricing",
      admin: {
        useAsTitle: "name",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "placeholder",
          type: "text",
          required: true,
          admin: {
            description: 'e.g., "$5k-15k"',
          },
        },
        {
          name: "features",
          type: "array",
          required: true,
          fields: [
            {
              name: "feature",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "order",
          type: "number",
          required: true,
          defaultValue: 0,
          admin: {
            description: "Display order (lower first)",
          },
        },
      ],
    },
    // Contacts
    {
      slug: "contacts",
      admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "email", "submittedAt"],
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "email",
          type: "email",
          required: true,
        },
        {
          name: "company",
          type: "text",
        },
        {
          name: "projectType",
          type: "select",
          required: true,
          options: [
            { label: "AI App", value: "ai-app" },
            { label: "Product", value: "product" },
            { label: "Quant", value: "quant" },
            { label: "Music", value: "music" },
            { label: "Other", value: "other" },
          ],
        },
        {
          name: "timeline",
          type: "select",
          required: true,
          options: [
            { label: "<1 month", value: "less-than-1-month" },
            { label: "1-3 months", value: "1-3-months" },
            { label: "3+ months", value: "3-plus-months" },
          ],
        },
        {
          name: "budgetRange",
          type: "select",
          required: true,
          options: [
            { label: "$5k-15k", value: "5k-15k" },
            { label: "$15k-30k", value: "15k-30k" },
            { label: "$30k+", value: "30k-plus" },
            { label: "Let's discuss", value: "discuss" },
          ],
        },
        {
          name: "message",
          type: "textarea",
          required: true,
        },
        {
          name: "submittedAt",
          type: "date",
          required: true,
          defaultValue: () => new Date().toISOString(),
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    // Media
    {
      slug: "media",
      upload: {
        staticDir: "../public/media",
        mimeTypes: ["image/*", "video/*"],
      },
      fields: [
        {
          name: "alt",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
});
