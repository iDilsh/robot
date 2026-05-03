import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Marquee from '@/components/sections/marquee';
import AboutPreview from '@/components/sections/about-preview';
import ServicesPreview from '@/components/sections/services-preview';
import PortfolioPreview from '@/components/sections/portfolio-preview';
import WhyChoose from '@/components/sections/why-choose';
import Testimonials from '@/components/sections/testimonials';
import PricingTeaser from '@/components/sections/pricing-teaser';
import BlogTeaser from '@/components/sections/blog-teaser';
import CTABanner from '@/components/sections/cta-banner';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Marquee />
      <AboutPreview />
      <ServicesPreview />
      <PortfolioPreview />
      <WhyChoose />
      <Testimonials />
      <PricingTeaser />
      <BlogTeaser />
      <CTABanner />
      <Footer />
    </main>
  );
}
