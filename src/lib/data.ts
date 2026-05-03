import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export function readData<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export function writeData<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function generateId(): string {
  return 'bp-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

export function generateNumericId(): number {
  return Date.now();
}

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
