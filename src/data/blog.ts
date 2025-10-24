export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  tags: string[]
  publishDate: string
  author: string
  readTime: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building ChainedChat in 2 Weeks',
    slug: 'building-chainedchat-in-2-weeks',
    excerpt: 'How I shipped a production-ready AI chat app in 14 days, from idea to deployment.',
    content: `
# Building ChainedChat in 2 Weeks

Building fast doesn't mean building poorly. Here's how I shipped ChainedChat—a full-stack AI chat application—in just two weeks.

## The Challenge

The goal was simple: create a production-ready AI chat application that could chain multiple AI models together for more intelligent conversations. But simple goals often hide complex implementations.

## The Stack

I chose technologies I knew would let me move fast without sacrificing quality:

- **Next.js 14** for the frontend and API routes
- **TypeScript** for type safety
- **Supabase** for database and real-time features
- **OpenAI API** for AI capabilities
- **Tailwind CSS** for styling

## Week 1: Core Features

The first week was all about getting the core functionality working:

1. **Day 1-2**: Set up the project structure and authentication
2. **Day 3-4**: Implemented the chat interface and message streaming
3. **Day 5-7**: Built the AI model chaining logic and tested extensively

## Week 2: Polish and Deploy

The second week focused on making it production-ready:

1. **Day 8-10**: Added error handling, loading states, and edge cases
2. **Day 11-12**: Optimized performance and achieved 95+ Lighthouse score
3. **Day 13-14**: Deployed to Vercel and gathered initial feedback

## Key Learnings

1. **Start with the core**: Don't build features you might not need
2. **Use familiar tools**: This isn't the time to learn new frameworks
3. **Deploy early**: Get feedback as soon as possible
4. **Performance matters**: Users notice slow apps immediately

## Results

ChainedChat launched with:
- Sub-second response times
- 95+ Lighthouse performance score
- Zero downtime since launch
- Positive user feedback

The key to shipping fast is knowing what to build and what to skip. Focus on the core value proposition and iterate from there.
    `,
    coverImage: '/assets/projects/screenshots/habittracker.jpg',
    tags: ['Engineering', 'Product', 'Devlog'],
    publishDate: '2024-01-15',
    author: 'Ani Potts',
    readTime: '5 min read',
  },
]

export function getBlogPosts() {
  return blogPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPostsByTag(tag: string) {
  return blogPosts.filter((post) => post.tags.includes(tag))
}

