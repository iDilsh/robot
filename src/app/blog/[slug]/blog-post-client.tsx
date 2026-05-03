'use client';

import { use, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronRight,
  Home,
  ArrowRight,
  Clock,
  Calendar,
  User,
  Tag,
  Bookmark,
} from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import GradientButton from '@/components/ui-extensions/gradient-button';
import { BLOG_POSTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/* ────────────────────────── Types ────────────────────────── */

interface BlogContentData {
  tags: string[];
  content: React.ReactNode;
}

/* ────────────────────────── Data ────────────────────────── */

const CATEGORY_COLORS: Record<string, string> = {
  Branding: 'bg-violet-100 text-violet-700',
  Marketing: 'bg-cyan-100 text-cyan-700',
  AI: 'bg-purple-100 text-purple-700',
  Design: 'bg-pink-100 text-pink-700',
  Video: 'bg-amber-100 text-amber-700',
  'Web Design': 'bg-emerald-100 text-emerald-700',
  'Social Media': 'bg-sky-100 text-sky-700',
  SEO: 'bg-orange-100 text-orange-700',
  Tutorials: 'bg-teal-100 text-teal-700',
};

const POST_GRADIENTS: Record<string, string> = {
  '10-branding-mistakes-killing-your-business': 'from-violet-500 to-purple-600',
  'complete-guide-social-media-2026': 'from-cyan-500 to-blue-600',
  'ai-graphic-design-what-you-need-to-know': 'from-purple-500 to-violet-600',
  'how-to-choose-logo-designer-red-flags': 'from-pink-500 to-rose-600',
  'video-marketing-statistics-2026': 'from-amber-500 to-orange-600',
  'why-every-small-business-needs-website': 'from-emerald-500 to-teal-600',
};

const BLOG_CONTENT: Record<string, BlogContentData> = {
  '10-branding-mistakes-killing-your-business': {
    tags: ['branding', 'design', 'marketing', 'small-business'],
    content: (
      <div className="space-y-6 text-slate-700">
        <p className="text-lg leading-relaxed">
          Your brand is more than just a logo — it&apos;s the entire experience people have with your business. Yet countless small businesses make critical branding mistakes that quietly erode trust, confuse customers, and leave money on the table. If you&apos;re struggling to stand out or wondering why customers aren&apos;t connecting with your brand, one of these common errors might be the culprit.
        </p>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          1. Inconsistent Visual Identity Across Platforms
        </h2>
        <p className="leading-relaxed">
          One of the most damaging branding mistakes is inconsistency. When your logo looks different on your website than it does on your social media profiles, or when your color palette shifts between your business cards and your email headers, you&apos;re sending a message of disorganization. Customers trust consistency — it signals professionalism and reliability. Audit every touchpoint where your brand appears and create a comprehensive brand style guide that dictates exact color codes, typography, spacing, and usage rules. This single document can transform how your brand is perceived.
        </p>

        <blockquote className="border-l-4 border-brand-violet pl-6 py-2 my-8 bg-brand-violet/5 rounded-r-lg">
          <p className="text-lg italic text-slate-700">
            &ldquo;Consistency is the true foundation of trust. A brand that shows up differently every time is a brand that tells people: we don&apos;t have it together.&rdquo;
          </p>
        </blockquote>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          2. Copying Competitors Instead of Defining Your Own Identity
        </h2>
        <p className="leading-relaxed">
          It&apos;s tempting to look at successful competitors and think, &ldquo;If it works for them, it&apos;ll work for me.&rdquo; But模仿 (imitation) isn&apos;t strategy — it&apos;s surrender. When you copy another brand&apos;s visual style, tone of voice, or messaging, you&apos;re not building a brand — you&apos;re creating a knockoff. And customers can tell the difference. Instead, study what makes your competitors successful and then ask: What makes us fundamentally different? Your unique value proposition should be the seed from which your entire brand identity grows.
        </p>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          3. Neglecting Your Brand Voice and Messaging
        </h2>
        <p className="leading-relaxed">
          Visual identity grabs attention, but your brand voice holds it. Many businesses spend thousands on logo design but give zero thought to how they &ldquo;speak&rdquo; to their audience. Are you authoritative or approachable? Playful or professional? Direct or conversational? If your social media posts sound like a different company than your website copy, you have a brand voice problem. Define your tone, vocabulary, and communication principles — then apply them consistently across every channel.
        </p>

        <div className="rounded-xl bg-brand-violet/5 border border-brand-violet/10 p-6 my-8">
          <h3 className="font-heading text-lg font-bold text-brand-violet mb-3">Key Takeaways</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Invest in a comprehensive brand style guide before creating any marketing materials</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Define what makes your brand unique — your differentiator should drive every design decision</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Treat your brand voice with the same importance as your visual identity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Audit your brand presence across all platforms at least once per quarter</span>
            </li>
          </ul>
        </div>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          4. Choosing Design Based on Trends Over Strategy
        </h2>
        <p className="leading-relaxed">
          Design trends are seductive. Gradient backgrounds, minimalist layouts, 3D illustrations — they all look amazing in a Dribbble showcase. But trends fade, and what&apos;s left is your brand&apos;s strategic foundation. Before you adopt any visual trend, ask yourself: Does this serve our brand strategy? Does it communicate who we are to our target audience? A brand built on strategy outlasts any trend. Work with designers who understand the difference between &ldquo;cool&rdquo; and &ldquo;effective.&rdquo;
        </p>

        <p className="leading-relaxed pt-4">
          Building a strong brand isn&apos;t about getting everything perfect from day one — it&apos;s about being intentional, consistent, and authentic. Avoid these common mistakes, invest in professional guidance when needed, and remember: your brand is a living asset that deserves as much attention as any other part of your business.
        </p>
      </div>
    ),
  },

  'complete-guide-social-media-2026': {
    tags: ['social-media', 'marketing', 'strategy', 'growth'],
    content: (
      <div className="space-y-6 text-slate-700">
        <p className="text-lg leading-relaxed">
          Social media marketing has evolved dramatically. What worked even two years ago barely moves the needle today. Algorithms have shifted, new platforms have emerged, and audiences have become far more discerning about what they engage with. If you want to build a powerful social media presence in 2026, you need a strategy that reflects the current landscape — not the one from your 2023 playbook.
        </p>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          Understanding the 2026 Social Media Landscape
        </h2>
        <p className="leading-relaxed">
          The biggest shift in social media isn&apos;t a new platform — it&apos;s a fundamental change in how algorithms evaluate content. Engagement rate alone no longer determines reach. Platforms now weigh &ldquo;meaningful interactions&rdquo; — saves, shares, and thoughtful comments — far more heavily than likes or clicks. This means content that encourages genuine conversation and provides real value will significantly outperform content designed merely to attract eyeballs.
        </p>
        <p className="leading-relaxed">
          Short-form video continues to dominate across every platform. Instagram Reels, TikTok, and YouTube Shorts are where the attention is. But here&apos;s what most brands miss: the videos that perform best aren&apos;t polished productions — they&apos;re authentic, relatable, and provide immediate value within the first three seconds. Your hook matters more than your editing skills.
        </p>

        <blockquote className="border-l-4 border-brand-violet pl-6 py-2 my-8 bg-brand-violet/5 rounded-r-lg">
          <p className="text-lg italic text-slate-700">
            &ldquo;The brands winning on social media in 2026 aren&apos;t the loudest — they&apos;re the most genuinely helpful. Value-driven content is the new algorithm hack.&rdquo;
          </p>
        </blockquote>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          Building Your Content Strategy
        </h2>
        <p className="leading-relaxed">
          A successful social media strategy starts with understanding your audience deeply — not just their demographics, but their behaviors, pain points, and content consumption habits. Create detailed audience personas and map out what type of content each persona needs at different stages of their journey. Your content mix should include educational posts that establish authority, entertaining content that builds connection, and promotional content that drives conversions — typically in a 4:3:1 ratio.
        </p>
        <p className="leading-relaxed">
          Batch your content creation. Set aside one or two days per month to create and schedule your core content, leaving room for reactive, timely posts. Use a content calendar that maps themes across weeks and months, ensuring variety while maintaining strategic focus. Consistency in posting frequency matters more than volume — three high-quality posts per week will outperform daily mediocre content.
        </p>

        <div className="rounded-xl bg-brand-violet/5 border border-brand-violet/10 p-6 my-8">
          <h3 className="font-heading text-lg font-bold text-brand-violet mb-3">Key Takeaways</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Focus on &ldquo;meaningful interactions&rdquo; (saves, shares, comments) over vanity metrics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Short-form video with strong hooks in the first 3 seconds is non-negotiable</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Follow a 4:3:1 content ratio — educational, entertaining, promotional</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Consistency beats volume — quality posted regularly outperforms daily mediocrity</span>
            </li>
          </ul>
        </div>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          Measuring What Matters
        </h2>
        <p className="leading-relaxed">
          Stop obsessing over follower count. In 2026, the metrics that matter are engagement rate, save rate, share rate, and conversion rate. These indicate not just who sees your content, but who finds it valuable enough to act on. Set up weekly analytics reviews and track trends over time rather than reacting to individual post performance. Use A/B testing on your content formats and captions to continuously refine what resonates with your audience.
        </p>

        <p className="leading-relaxed pt-4">
          Social media marketing in 2026 rewards authenticity, consistency, and strategic thinking over brute-force posting. Invest in understanding your audience, creating genuinely valuable content, and measuring the metrics that reflect real business impact — and you&apos;ll be ahead of 90% of brands still using yesterday&apos;s playbook.
        </p>
      </div>
    ),
  },

  'ai-graphic-design-what-you-need-to-know': {
    tags: ['ai', 'design', 'technology', 'creativity'],
    content: (
      <div className="space-y-6 text-slate-700">
        <p className="text-lg leading-relaxed">
          Artificial intelligence is no longer a futuristic concept in graphic design — it&apos;s here, it&apos;s powerful, and it&apos;s reshaping the industry in ways both exciting and unsettling. From AI-generated artwork to intelligent design tools that can produce layouts in seconds, the creative landscape is undergoing its most significant transformation since the advent of digital design software. Here&apos;s what you need to know to navigate this new reality.
        </p>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          How AI Is Transforming the Design Process
        </h2>
        <p className="leading-relaxed">
          AI design tools have moved far beyond simple filters and effects. Today&apos;s AI can generate complete brand identities, produce photorealistic imagery from text descriptions, and even suggest layout compositions based on content and context. Tools powered by machine learning can analyze thousands of successful designs to recommend color palettes, typography pairings, and visual hierarchies that are statistically likely to perform well. This doesn&apos;t replace the designer — it amplifies their capabilities and dramatically accelerates the ideation phase.
        </p>
        <p className="leading-relaxed">
          However, speed isn&apos;t the only advantage. AI excels at rapid prototyping and iteration. Where a traditional design process might take days to explore three concepts, an AI-augmented workflow can generate dozens in hours. This allows designers to explore more creative territory, test bolder ideas, and ultimately arrive at stronger solutions. The key is understanding that AI is a tool — not a replacement for design thinking, strategy, or the human ability to create emotional resonance through visual storytelling.
        </p>

        <blockquote className="border-l-4 border-brand-violet pl-6 py-2 my-8 bg-brand-violet/5 rounded-r-lg">
          <p className="text-lg italic text-slate-700">
            &ldquo;AI won&apos;t replace designers — but designers who use AI will replace those who don&apos;t. The future belongs to human-AI collaboration.&rdquo;
          </p>
        </blockquote>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          What AI Can and Cannot Do
        </h2>
        <p className="leading-relaxed">
          AI can generate stunning visuals, but it cannot understand your brand&apos;s soul. It can produce hundreds of variations, but it can&apos;t tell you which one will resonate with your specific audience on an emotional level. It can suggest color combinations based on data, but it can&apos;t create the kind of unexpected, rule-breaking visual choices that often define iconic brands. The most effective design workflows in 2026 use AI for what it does best — rapid generation, data-driven suggestions, and tedious production tasks — while reserving the strategic and creative decisions for human expertise.
        </p>

        <div className="rounded-xl bg-brand-violet/5 border border-brand-violet/10 p-6 my-8">
          <h3 className="font-heading text-lg font-bold text-brand-violet mb-3">Key Takeaways</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>AI accelerates ideation and prototyping — use it to explore more creative territory, not cut corners</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Strategic and emotional design decisions still require human judgment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>The best results come from human-AI collaboration, not full automation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Stay current with AI tools but invest more in your strategic design thinking skills</span>
            </li>
          </ul>
        </div>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          Preparing Your Business for the AI Design Era
        </h2>
        <p className="leading-relaxed">
          Whether you&apos;re a business owner looking for design services or a designer adapting to new tools, the approach should be the same: embrace AI as an amplifier, not a shortcut. For businesses, this means working with agencies that understand how to combine AI efficiency with human creativity — getting you better results, faster, without sacrificing the strategic depth that makes design effective. For designers, it means investing time in learning AI tools while doubling down on the skills AI can&apos;t replicate: strategy, empathy, storytelling, and the ability to translate abstract business goals into compelling visual experiences.
        </p>

        <p className="leading-relaxed pt-4">
          The AI revolution in design isn&apos;t something to fear — it&apos;s something to leverage. The businesses and designers who thrive will be those who find the perfect balance between artificial intelligence and authentic creativity.
        </p>
      </div>
    ),
  },

  'how-to-choose-logo-designer-red-flags': {
    tags: ['design', 'logo', 'branding', 'freelancer'],
    content: (
      <div className="space-y-6 text-slate-700">
        <p className="text-lg leading-relaxed">
          Your logo is the cornerstone of your brand identity. It&apos;s the first thing people associate with your business and the visual anchor for every piece of marketing you&apos;ll ever create. Choosing the wrong logo designer doesn&apos;t just waste money — it can actively harm your brand for years to come. Here&apos;s how to find the right designer and, just as importantly, how to spot the warning signs before it&apos;s too late.
        </p>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          Red Flags That Should Make You Run
        </h2>
        <p className="leading-relaxed">
          The biggest red flag is a designer who promises unlimited revisions or an unrealistic number of concepts for a suspiciously low price. This almost always means they&apos;re using templates or logo generators and passing off the results as original work. Real custom logo design involves research, strategy, and multiple rounds of thoughtful iteration — it can&apos;t be done well for $20. Another major warning sign is a designer who doesn&apos;t ask questions about your business, audience, competitors, or goals. A professional designer will want to understand your brand deeply before putting pencil to paper (or cursor to screen).
        </p>

        <blockquote className="border-l-4 border-brand-violet pl-6 py-2 my-8 bg-brand-violet/5 rounded-r-lg">
          <p className="text-lg italic text-slate-700">
            &ldquo;A logo designer who doesn&apos;t ask about your business is designing for their portfolio, not for your brand. The questions they ask tell you more about their skill than the designs they show.&rdquo;
          </p>
        </blockquote>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          What to Look for in a Great Logo Designer
        </h2>
        <p className="leading-relaxed">
          A strong portfolio is non-negotiable — but look beyond the pretty pictures. Does the portfolio show range? Can the designer adapt their style to different industries and brand personalities? Do the logos work well at different sizes (a tiny social media avatar vs. a large billboard)? Great designers will also walk you through their process, explaining the thinking behind each concept. They should be able to articulate why a particular shape, color, or typeface was chosen and how it connects to your brand strategy.
        </p>
        <p className="leading-relaxed">
          Communication style matters enormously. You want a designer who can explain design decisions clearly, receive feedback constructively, and push back when a request would compromise the brand. Yes, you&apos;re the client — but a great designer is a strategic partner, not an order-taker. If they agree with every suggestion without offering professional perspective, they&apos;re not adding the value you&apos;re paying for.
        </p>

        <div className="rounded-xl bg-brand-violet/5 border border-brand-violet/10 p-6 my-8">
          <h3 className="font-heading text-lg font-bold text-brand-violet mb-3">Key Takeaways</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Beware of suspiciously cheap logos with &ldquo;unlimited revisions&rdquo; — they&apos;re likely template-based</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>A designer who doesn&apos;t ask about your business isn&apos;t designing for your brand</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Look for range and strategic thinking in their portfolio, not just visual appeal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>The best designers are strategic partners who push back when needed</span>
            </li>
          </ul>
        </div>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          The Right Questions to Ask
        </h2>
        <p className="leading-relaxed">
          Before hiring a logo designer, ask about their process from brief to delivery. How many initial concepts do they provide? What happens if you don&apos;t like any of them? How many revision rounds are included? What file formats will you receive? Do they provide a brand style guide? Will you own the final design outright? Can they show you case studies with before-and-after results? The answers to these questions will reveal far more about a designer&apos;s professionalism and value than their price tag alone.
        </p>

        <p className="leading-relaxed pt-4">
          Your logo is a long-term investment. Choose a designer who treats it that way — with the research, strategy, and creative rigor your brand deserves.
        </p>
      </div>
    ),
  },

  'video-marketing-statistics-2026': {
    tags: ['video', 'marketing', 'statistics', 'social-media'],
    content: (
      <div className="space-y-6 text-slate-700">
        <p className="text-lg leading-relaxed">
          If you&apos;re still on the fence about investing in video marketing, the data from 2026 should settle the debate once and for all. Video content has not just maintained its dominance — it&apos;s accelerated. The platforms have evolved, consumption habits have shifted, and the ROI numbers are staggering. Here are the statistics that should reshape your content strategy this year.
        </p>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          The Numbers That Define Video Marketing in 2026
        </h2>
        <p className="leading-relaxed">
          Short-form video (under 60 seconds) now accounts for over 65% of all content consumed on social media platforms. Users spend an average of 2.5 hours daily watching short-form video — up 40% from just two years ago. But here&apos;s the number that matters most for businesses: brands that post video content at least twice per week see 2.3x higher engagement rates than those relying primarily on static images. And it&apos;s not just engagement — video content generates 1.8x more website traffic and 1.5x higher conversion rates compared to text and image posts combined.
        </p>
        <p className="leading-relaxed">
          The format landscape has also shifted dramatically. Vertical video (9:16) now outperforms horizontal video by 3x on platforms like Instagram and TikTok. Live video has seen a resurgence, with 78% of audiences preferring to engage with live content over pre-recorded when given the choice. Perhaps most surprising: video content with on-screen text captions (even in the same language) performs 40% better than video without captions — because a significant portion of social media video is consumed with sound off.
        </p>

        <blockquote className="border-l-4 border-brand-violet pl-6 py-2 my-8 bg-brand-violet/5 rounded-r-lg">
          <p className="text-lg italic text-slate-700">
            &ldquo;In 2026, video isn&apos;t a nice-to-have — it&apos;s the primary language of social media. Brands that don&apos;t speak video are essentially whispering in a room full of shouting.&rdquo;
          </p>
        </blockquote>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          What These Statistics Mean for Your Strategy
        </h2>
        <p className="leading-relaxed">
          The data tells a clear story: you need to be creating video content, and it needs to be short, vertical, and captioned. But statistics alone don&apos;t make a strategy. The brands seeing the best results are those that use video strategically — not just posting video for the sake of it. Product demonstrations, behind-the-scenes content, customer testimonials, and educational tips consistently outperform generic promotional videos. The key is matching the right video type to the right stage of your customer&apos;s journey.
        </p>

        <div className="rounded-xl bg-brand-violet/5 border border-brand-violet/10 p-6 my-8">
          <h3 className="font-heading text-lg font-bold text-brand-violet mb-3">Key Takeaways</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Short-form vertical video is the dominant format — 2x per week minimum posting frequency</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Always include on-screen captions — 40% better performance, even for sound-on viewers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Match video type to customer journey stage: education → demonstration → testimonial → conversion</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Live video drives 78% higher engagement when audiences have the choice</span>
            </li>
          </ul>
        </div>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          Budgeting for Video in 2026
        </h2>
        <p className="leading-relaxed">
          Here&apos;s the good news: you don&apos;t need a Hollywood budget. The most effective social media videos in 2026 are authentic, not expensive. A smartphone, good lighting, and a clear message can outperform a $10,000 production when the content resonates with your audience. Allocate your budget toward strategy, scripting, and consistent production rather than expensive equipment. Consider working with an agency that can handle the entire production pipeline — from concept to optimized output — at a fraction of what you might expect.
        </p>

        <p className="leading-relaxed pt-4">
          The statistics are clear: video marketing isn&apos;t just effective — it&apos;s essential. The question isn&apos;t whether you should invest in video, but how quickly you can start. Every day without video content is a day your competitors are capturing attention you could be earning.
        </p>
      </div>
    ),
  },

  'why-every-small-business-needs-website': {
    tags: ['web-design', 'small-business', 'digital-presence', 'seo'],
    content: (
      <div className="space-y-6 text-slate-700">
        <p className="text-lg leading-relaxed">
          &ldquo;I have a Facebook page — why do I need a website?&rdquo; It&apos;s the most common question small business owners ask about their digital presence. And in 2026, the answer has never been more critical. Relying solely on social media for your online presence is like renting a storefront in a mall that can change its rules overnight, raise your rent without notice, or even shut down your shop entirely. Here&apos;s why a professional website is non-negotiable for every small business.
        </p>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          You Don&apos;t Own Your Social Media Presence
        </h2>
        <p className="leading-relaxed">
          This is the fundamental issue that most small businesses overlook. When you build your entire online presence on Instagram, Facebook, or any social platform, you&apos;re building on rented land. The platform controls who sees your content, how much you pay to reach your own followers, and whether your account even exists tomorrow. Algorithm changes in 2025-2026 have reduced organic reach for business accounts to under 3% — meaning 97% of your followers won&apos;t see your posts unless you pay to promote them. A website, on the other hand, is yours. You own it, you control it, and no algorithm change can take it away.
        </p>

        <blockquote className="border-l-4 border-brand-violet pl-6 py-2 my-8 bg-brand-violet/5 rounded-r-lg">
          <p className="text-lg italic text-slate-700">
            &ldquo;Social media is the storefront window. Your website is the actual store. You wouldn&apos;t run a business from a window display alone.&rdquo;
          </p>
        </blockquote>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          Credibility and Trust Start with Your Website
        </h2>
        <p className="leading-relaxed">
          Research shows that 75% of consumers judge a business&apos;s credibility based on its website. When someone hears about your business and searches for you online, finding a professional website immediately signals legitimacy. Finding only a social media profile? It signals &ldquo;small time.&rdquo; Your website is where you tell your complete brand story, showcase your work in detail, present testimonials, and provide the comprehensive information that helps potential customers make purchasing decisions. Social media simply doesn&apos;t offer the space or structure for this level of brand storytelling.
        </p>

        <h2 className="font-heading text-2xl font-bold text-slate-900 pt-4">
          SEO: Being Found When It Matters Most
        </h2>
        <p className="leading-relaxed">
          When someone in your area searches for &ldquo;best bakery near me&rdquo; or &ldquo;affordable graphic designer,&rdquo; they&apos;re not searching social media — they&apos;re searching Google. And Google shows websites. A well-optimized website ensures your business appears in these critical &ldquo;high-intent&rdquo; searches — the ones where people are actively looking to buy. Social media can build awareness, but your website captures demand. Both are important, but only one drives the kind of search traffic that converts browsers into paying customers.
        </p>

        <div className="rounded-xl bg-brand-violet/5 border border-brand-violet/10 p-6 my-8">
          <h3 className="font-heading text-lg font-bold text-brand-violet mb-3">Key Takeaways</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>Social media is rented land — your website is an asset you own and control</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>75% of consumers judge credibility by your website — no website means less trust</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>SEO drives high-intent traffic — people actively searching for what you offer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
              <span>A professional website costs less than you think and pays for itself in new customers</span>
            </li>
          </ul>
        </div>

        <p className="leading-relaxed pt-4">
          Your website isn&apos;t an expense — it&apos;s an investment in the long-term stability and growth of your business. Social media complements your website; it doesn&apos;t replace it. If you&apos;re ready to build a digital presence you actually own, start with a professional website. Your future customers are already searching for you — make sure they find something worth finding.
        </p>
      </div>
    ),
  },
};

/* ────────────────────── Animation helpers ────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

/* ──────────────────────── Sections ──────────────────────── */

function PostHero({
  title,
  category,
  date,
  readTime,
  slug,
}: {
  title: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}) {
  const gradient = POST_GRADIENTS[slug] || 'from-violet-500 to-purple-600';
  const colorClass = CATEGORY_COLORS[category] || 'bg-slate-100 text-slate-700';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-violet-light/60 via-brand-violet-light/20 to-white pt-28 pb-16 md:pt-36 md:pb-20">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-violet/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-brand-cyan/5 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <li>
              <Link href="/" className="flex items-center gap-1 transition-colors hover:text-brand-violet">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-brand-violet">Blog</Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="font-medium text-brand-violet truncate max-w-[200px] sm:max-w-none">{title}</li>
          </ol>
        </nav>

        {/* Large gradient hero image */}
        <motion.div
          className={cn('relative aspect-[2/1] sm:aspect-[3/1] w-full rounded-2xl bg-gradient-to-br', gradient)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Decorative shapes */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-sm" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/8 blur-sm" />
            <div className="absolute right-1/4 top-1/3 h-20 w-20 rounded-full bg-white/5" />
          </div>
          <div className="flex h-full items-center justify-center">
            <Bookmark className="h-16 w-16 text-white/40 sm:h-24 sm:w-24" />
          </div>
        </motion.div>

        {/* Category tag */}
        <div className="mt-6">
          <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-semibold', colorClass)}>
            {category}
          </span>
        </div>

        {/* Title */}
        <motion.h1
          className="mt-4 font-heading text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {/* Author, date, read time */}
        <motion.div
          className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        >
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-brand-violet" />
            iDilsh Network Team
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-brand-violet" />
            {new Date(date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-brand-violet" />
            {readTime}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function ArticleBody({ slug }: { slug: string }) {
  const contentData = BLOG_CONTENT[slug];

  if (!contentData) {
    return (
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-muted-foreground">Content coming soon...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose-custom"
        >
          {contentData.content}
        </motion.article>
      </div>
    </section>
  );
}

function TagsSection({ slug }: { slug: string }) {
  const contentData = BLOG_CONTENT[slug];
  if (!contentData) return null;

  return (
    <section className="pb-12 md:pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-border/50 pt-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-4 w-4 text-brand-violet" />
            <span className="text-sm font-medium text-slate-700">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {contentData.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?category=${encodeURIComponent(tag.charAt(0).toUpperCase() + tag.slice(1))}`}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition-colors duration-200 hover:bg-brand-violet/10 hover:text-brand-violet"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AuthorBio() {
  return (
    <section className="pb-16 md:pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border/50 bg-slate-50/50 p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Avatar with initials */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet to-[#6D28D9] text-white">
              <span className="font-heading text-xl font-bold">iN</span>
            </div>

            <div className="flex-1">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                iDilsh Network Team
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Digital agency specializing in design, marketing, and web development. Sharing insights to help your brand thrive.
              </p>
              <Link
                href="/about"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-violet transition-colors duration-200 hover:text-[#6D28D9]"
              >
                Learn more about us
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RelatedPosts({ currentSlug, currentCategory }: { currentSlug: string; currentCategory: string }) {
  const related = BLOG_POSTS
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      // Prefer same category
      if (a.category === currentCategory && b.category !== currentCategory) return -1;
      if (b.category === currentCategory && a.category !== currentCategory) return 1;
      return 0;
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="bg-slate-50/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center sm:text-4xl">
            Related <span className="text-brand-violet">Articles</span>
          </h2>
          <p className="mt-4 text-center text-muted-foreground text-lg">
            Continue reading with these related posts.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {related.map((post, index) => {
            const gradient = POST_GRADIENTS[post.slug] || 'from-violet-500 to-purple-600';
            const colorClass = CATEGORY_COLORS[post.category] || 'bg-slate-100 text-slate-700';

            return (
              <motion.div
                key={post.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={index * 0.1}
                variants={fadeUp}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-brand-violet/20">
                    {/* Gradient thumbnail */}
                    <div className={cn('relative aspect-[16/10] w-full bg-gradient-to-br', gradient)}>
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-sm" />
                        <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/8 blur-sm" />
                      </div>
                      <span className={cn('absolute left-4 top-4 rounded-full px-2.5 py-0.5 text-xs font-semibold', colorClass)}>
                        {post.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="font-heading text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-brand-violet transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-4 border-t border-border/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-brand-violet">
                            Read More →
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-brand-violet-light/40 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Need help with your <span className="text-brand-violet">digital marketing</span>?
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Our team of experts is ready to help you build a powerful digital presence.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GradientButton
            href="/contact"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Contact Us
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── Client Component ──────────────────────── */

export default function BlogPostClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const post = useMemo(() => BLOG_POSTS.find((p) => p.slug === slug), [slug]);

  // Fallback if slug not found
  if (!post) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <section className="flex flex-1 items-center justify-center pt-28">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-slate-900">Post Not Found</h1>
            <p className="mt-4 text-lg text-muted-foreground">The blog post you&apos;re looking for doesn&apos;t exist.</p>
            <div className="mt-6">
              <GradientButton href="/blog" variant="primary" size="md">
                Back to Blog
              </GradientButton>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <PostHero
        title={post.title}
        category={post.category}
        date={post.date}
        readTime={post.readTime}
        slug={post.slug}
      />
      <ArticleBody slug={post.slug} />
      <TagsSection slug={post.slug} />
      <AuthorBio />
      <RelatedPosts currentSlug={post.slug} currentCategory={post.category} />
      <CTASection />
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
