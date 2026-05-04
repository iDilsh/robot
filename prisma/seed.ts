import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Blog Posts
  const blogPosts = [
    {
      id: 'bp-1',
      slug: '10-branding-mistakes-killing-your-business',
      title: '10 Branding Mistakes That Are Killing Your Business',
      excerpt: 'Discover the most common branding errors that small businesses make and learn how to fix them before they damage your reputation.',
      content: 'Branding is more than just a logo — it\'s the entire experience your customers have with your business. Unfortunately, many small businesses make critical branding mistakes that undermine their growth and credibility. In this comprehensive guide, we\'ll explore the top 10 branding mistakes and how to fix them.\n\n## 1. Inconsistent Visual Identity\n\nOne of the most common mistakes is inconsistency across your branding materials. When your logo, colors, and fonts vary across platforms, it creates confusion and erodes trust. Establish a clear brand style guide and stick to it religiously.\n\n## 2. Ignoring Your Target Audience\n\nYour brand should speak directly to your ideal customer. Many businesses try to appeal to everyone, which dilutes their message and makes them forgettable. Define your target audience precisely and craft your brand voice accordingly.\n\n## 3. Neglecting Brand Story\n\nPeople connect with stories, not sales pitches. Your brand story — why you started, what you believe, and how you help — is your most powerful asset. Share it authentically across all touchpoints.\n\n## 4. Copying Competitors\n\nWhile it\'s important to be aware of your competition, directly copying their branding strategy is a recipe for failure. Your brand should be uniquely yours, reflecting your distinct value proposition.\n\n## 5. Overcomplicating Your Logo\n\nA complex logo is hard to reproduce, doesn\'t scale well, and is quickly forgotten. The most iconic brands have simple, memorable logos. Keep it clean and versatile.\n\n## 6. Not Investing in Professional Design\n\nDIY design might save money upfront, but it costs more in the long run through lost credibility and missed opportunities. Professional design is an investment, not an expense.\n\n## 7. Ignoring Social Media Branding\n\nYour social media profiles are often the first impression potential customers have. Inconsistent or unprofessional social media branding can immediately turn people away.\n\n## 8. Failing to Evolve\n\nBrands that stay stagnant become irrelevant. While consistency is important, your brand should evolve with your audience and market trends. Regular brand audits help you stay current.\n\n## 9. Not Defining Brand Values\n\nWithout clear values, your brand lacks direction and authenticity. Define what your brand stands for and let those values guide every decision and communication.\n\n## 10. Treating Branding as a One-Time Task\n\nBranding is an ongoing process, not a checkbox. It requires continuous attention, refinement, and investment to remain effective and relevant.',
      category: 'Branding',
      date: '2026-04-28',
      readTime: '6 min read',
      featured: true,
      published: true,
      keywords: ['branding', 'business mistakes', 'brand identity', 'logo design', 'small business'],
      featuredImage: '',
    },
    {
      id: 'bp-2',
      slug: 'complete-guide-social-media-2026',
      title: 'The Complete Guide to Social Media Marketing in 2026',
      excerpt: 'Everything you need to know about social media strategy, content creation, and audience growth in the modern landscape.',
      content: 'Social media marketing continues to evolve at a rapid pace. What worked last year may not work today. In this complete guide, we\'ll walk you through everything you need to know to succeed in social media marketing in 2026.\n\n## Understanding the 2026 Landscape\n\nThe social media landscape has shifted dramatically. Short-form video dominates, AI-powered content tools are mainstream, and authenticity trumps polish. Understanding these trends is crucial for building an effective strategy.\n\n## Platform-by-Platform Strategy\n\nEach platform has its own culture, algorithm, and best practices. We break down exactly how to approach Instagram, TikTok, LinkedIn, YouTube, and emerging platforms for maximum impact.\n\n## Content Creation Framework\n\nCreating consistent, high-quality content is the backbone of social media success. We share our proven content creation framework that helps you plan, create, and schedule content efficiently.\n\n## Measuring What Matters\n\nVanity metrics don\'t pay the bills. Learn which metrics actually matter for your business goals and how to track them effectively using free and paid tools.',
      category: 'Marketing',
      date: '2026-04-20',
      readTime: '12 min read',
      featured: false,
      published: true,
      keywords: ['social media', 'marketing', 'content strategy', 'digital marketing', '2026'],
      featuredImage: '',
    },
    {
      id: 'bp-3',
      slug: 'ai-graphic-design-what-you-need-to-know',
      title: 'AI in Graphic Design: What You Need to Know in 2026',
      excerpt: 'How artificial intelligence is transforming the design industry and what it means for your business.',
      content: 'Artificial intelligence is no longer a futuristic concept in graphic design — it\'s here, and it\'s transforming how we create. From AI-generated images to automated layouts, the design industry is experiencing a seismic shift.\n\n## The Current State of AI in Design\n\nAI tools can now generate logos, create layouts, enhance photos, and even suggest color palettes. But what does this mean for professional designers and businesses?\n\n## Tools You Should Know\n\nWe review the top AI design tools available in 2026, including their strengths, limitations, and best use cases for different types of projects.\n\n## The Human Element\n\nWhile AI is powerful, the human element — creativity, emotion, and strategic thinking — remains irreplaceable. The best results come from combining AI efficiency with human artistry.',
      category: 'AI',
      date: '2026-04-15',
      readTime: '8 min read',
      featured: false,
      published: true,
      keywords: ['AI', 'graphic design', 'artificial intelligence', 'design tools', 'automation'],
      featuredImage: '',
    },
    {
      id: 'bp-4',
      slug: 'how-to-choose-logo-designer-red-flags',
      title: 'How to Choose a Logo Designer (Red Flags to Watch For)',
      excerpt: 'Not all designers are created equal. Learn the warning signs and find the right designer for your brand.',
      content: 'Choosing the right logo designer is one of the most important decisions you\'ll make for your brand. Your logo is the visual cornerstone of your business identity, and a poor choice can cost you time, money, and credibility.\n\n## Red Flags to Watch For\n\nBe wary of designers who can\'t show a portfolio, offer unrealistically low prices, or promise unlimited revisions without clear terms. These are often signs of inexperience or poor business practices.\n\n## What to Look For\n\nA great logo designer will have a strong portfolio, clear process, good communication, and realistic timelines. They\'ll ask about your business, audience, and goals before starting.\n\n## Questions to Ask\n\nBefore hiring a designer, ask about their process, timeline, revision policy, file formats included, and ownership rights. Their answers will tell you a lot about their professionalism.',
      category: 'Design',
      date: '2026-04-10',
      readTime: '5 min read',
      featured: false,
      published: true,
      keywords: ['logo design', 'designer', 'branding', 'hiring', 'red flags'],
      featuredImage: '',
    },
    {
      id: 'bp-5',
      slug: 'video-marketing-statistics-2026',
      title: 'Video Marketing Statistics That Will Shock You in 2026',
      excerpt: 'Data-driven insights into why video content dominates social media and how to leverage it for growth.',
      content: 'Video content continues to dominate the digital landscape in 2026. The statistics are clear: businesses that invest in video marketing see significantly higher engagement, conversion rates, and brand recall.\n\n## Key Statistics\n\nOver 85% of businesses now use video as a marketing tool, and viewers retain 95% of a message when delivered via video compared to just 10% when reading text. These numbers alone make a compelling case for video investment.\n\n## Platform-Specific Insights\n\nDifferent platforms favor different video formats. Understanding these nuances is key to maximizing your video marketing ROI.\n\n## Getting Started with Video\n\nYou don\'t need a Hollywood budget to create effective marketing videos. With the right strategy and tools, even small businesses can produce compelling video content.',
      category: 'Video',
      date: '2026-04-05',
      readTime: '7 min read',
      featured: false,
      published: true,
      keywords: ['video marketing', 'statistics', 'social media video', 'content marketing'],
      featuredImage: '',
    },
    {
      id: 'bp-6',
      slug: 'why-every-small-business-needs-website',
      title: 'Why Every Small Business Needs a Website in 2026',
      excerpt: 'Still relying on social media alone? Here\'s why a professional website is non-negotiable for business success.',
      content: 'In 2026, having a professional website isn\'t optional — it\'s essential. Yet many small businesses still rely solely on social media profiles, missing out on enormous opportunities for growth and credibility.\n\n## The Problem with Social Media Only\n\nSocial media platforms change their algorithms constantly, and you don\'t own your audience there. A website gives you complete control over your online presence and customer experience.\n\n## Benefits of a Professional Website\n\nA website provides credibility, 24/7 availability, better SEO visibility, and a centralized hub for all your business information. It\'s an investment that pays dividends for years.\n\n## Getting Started\n\nModern web design makes it easier and more affordable than ever to get a professional website. Whether you need a simple landing page or a full e-commerce solution, the ROI is clear.',
      category: 'Web Design',
      date: '2026-03-28',
      readTime: '6 min read',
      featured: false,
      published: true,
      keywords: ['website', 'small business', 'web design', 'online presence', 'digital strategy'],
      featuredImage: '',
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { id: post.id },
      update: post,
      create: post,
    });
  }
  console.log(`Seeded ${blogPosts.length} blog posts`);

  // Seed Portfolio Projects
  const projects = [
    {
      title: 'BrightStar Brand Identity',
      client: 'BrightStar Co.',
      category: 'Branding',
      description: 'Complete brand identity design including logo, business cards, and style guide for a tech startup.',
      imageUrl: '',
      published: true,
    },
    {
      title: 'TechVentures Promotional Video',
      client: 'TechVentures',
      category: 'Video',
      description: 'Dynamic promotional video showcasing the company\'s innovative solutions and company culture.',
      imageUrl: '',
      published: true,
    },
    {
      title: 'NovaBrand E-commerce Website',
      client: 'NovaBrand',
      category: 'Web',
      description: 'Full e-commerce website design and development with custom product configurator.',
      imageUrl: '',
      published: true,
    },
    {
      title: 'StartUp Hub Social Campaign',
      client: 'StartUp Hub',
      category: 'Social Media',
      description: '6-month social media strategy and content creation that tripled engagement rates.',
      imageUrl: '',
      published: true,
    },
    {
      title: 'Aurora AI Art Collection',
      client: 'Aurora Gallery',
      category: 'AI Creations',
      description: 'AI-generated art collection combined with traditional design for a unique gallery exhibition.',
      imageUrl: '',
      published: true,
    },
    {
      title: 'FreshBite Restaurant Branding',
      client: 'FreshBite',
      category: 'Branding',
      description: 'Vibrant brand identity for a health-focused restaurant chain including menu design and signage.',
      imageUrl: '',
      published: true,
    },
    {
      title: 'CloudSync Product Demo',
      client: 'CloudSync',
      category: 'Video',
      description: 'Animated product demo video explaining complex SaaS features in an engaging way.',
      imageUrl: '',
      published: true,
    },
    {
      title: 'GreenLeaf Landing Page',
      client: 'GreenLeaf',
      category: 'Web',
      description: 'High-converting landing page design for an eco-friendly product launch campaign.',
      imageUrl: '',
      published: true,
    },
  ];

  for (const project of projects) {
    await prisma.portfolioProject.create({
      data: project,
    });
  }
  console.log(`Seeded ${projects.length} portfolio projects`);

  // Seed Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: 'iDilsh Network',
      siteTagline: 'Ignite Designs. Illuminate Dreams.',
      siteUrl: 'https://idilsh.top',
      contactEmail: 'hello@idilsh.top',
      whatsappLink: 'https://wa.me/94773226376',
      navLogoUrl: '/logo.svg',
      heroLogoUrl: '/hero-logo.png',
    },
  });
  console.log('Seeded site settings');

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
