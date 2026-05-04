// TypeScript interfaces — shared across the app
// Data storage is now handled by Prisma + PostgreSQL (cloud database)
// These interfaces are kept for type safety in frontend components

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  keywords: string[];
  featuredImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioProject {
  id: number;
  title: string;
  client: string;
  category: string;
  description: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  siteUrl: string;
  contactEmail: string;
  whatsappLink: string;
  navLogoUrl: string;
  heroLogoUrl: string;
}

// Helper to generate a slug from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
