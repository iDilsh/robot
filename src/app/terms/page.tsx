'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Home, FileText } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-violet-light/60 via-brand-violet-light/20 to-white pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-violet/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-brand-cyan/5 blur-2xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="flex items-center gap-1 transition-colors hover:text-brand-violet">
                  <Home className="h-3.5 w-3.5" />
                  Home
                </Link>
              </li>
              <li><ChevronRight className="h-3.5 w-3.5" /></li>
              <li className="font-medium text-brand-violet">Terms of Service</li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-4"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-violet/10 text-brand-violet">
              <FileText className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl">Terms of Service</h1>
              <p className="mt-1 text-muted-foreground">Last updated: May 1, 2026</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="space-y-8 text-slate-700">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">1. Agreement to Terms</h2>
                <p className="leading-relaxed">
                  These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and iDilsh Network (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), concerning your access to and use of our website at idilsh.top as well as any other media form, media channel, mobile website, or mobile application related, linked, or otherwise connected thereto. By accessing the site, you agree that you have read, understood, and agreed to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the site and you must discontinue use immediately.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">2. Services</h2>
                <p className="leading-relaxed mb-4">
                  iDilsh Network provides a range of digital services including, but not limited to, graphic design, video editing and animation, AI-powered content creation, web design and development, social media management, and educational resources. The specific services, deliverables, timelines, and pricing for any project will be outlined in individual project agreements or quotes provided to you.
                </p>
                <p className="leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, including the availability of any feature, database, or content, with reasonable notice to existing clients. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of our services.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">3. Project Process and Revisions</h2>
                <p className="leading-relaxed mb-4">
                  Upon engagement, we will work with you to define the scope, timeline, and deliverables for your project. The number of revision rounds included in your project will be specified in your project agreement or quote. Additional revisions beyond the agreed-upon scope may incur additional charges, which will be communicated and approved by you before proceeding.
                </p>
                <p className="leading-relaxed">
                  Project timelines are estimates and may vary based on the complexity of the work, the timeliness of client feedback, and other factors. We will make every reasonable effort to meet agreed deadlines and will communicate proactively if any delays are anticipated.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">4. Intellectual Property Rights</h2>
                <p className="leading-relaxed mb-4">
                  Unless otherwise agreed in writing, upon full payment for services rendered, you will own the final deliverables created specifically for your project. We retain the right to use the work in our portfolio, case studies, and promotional materials unless a confidentiality agreement is in place.
                </p>
                <p className="leading-relaxed mb-4">
                  You acknowledge that we may use third-party assets (stock photos, fonts, icons, etc.) in your project. Such third-party assets remain the property of their respective owners and are subject to their own licensing terms. We will inform you of any usage restrictions applicable to such assets.
                </p>
                <p className="leading-relaxed">
                  Any pre-existing intellectual property, tools, frameworks, or methodologies that we bring to the project remain our exclusive property. The grant of deliverables to you does not include any right to our underlying tools, processes, or know-how.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">5. Payment Terms</h2>
                <p className="leading-relaxed mb-4">
                  Payment terms will be specified in your project quote or agreement. For project-based work, we typically require a deposit of 50% before work begins, with the remaining balance due upon completion. For monthly service packages, payment is due at the beginning of each service period.
                </p>
                <p className="leading-relaxed">
                  All prices are quoted in US dollars unless otherwise specified. We reserve the right to adjust pricing for new projects or service renewals with reasonable advance notice. Late payments may be subject to a fee of 1.5% per month on the outstanding balance.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">6. Cancellation and Refund Policy</h2>
                <p className="leading-relaxed mb-4">
                  You may cancel a project at any time by providing written notice. If cancellation occurs before work has commenced, we will refund your deposit minus a 10% administrative fee. If cancellation occurs after work has begun, you will be billed for all work completed up to the date of cancellation, and any remaining deposit balance will be refunded.
                </p>
                <p className="leading-relaxed">
                  For monthly service packages, you may cancel at any time with 30 days written notice. Services will continue through the end of the current billing period. We do not offer refunds for partially used service periods.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">7. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  To the maximum extent permitted by applicable law, in no event shall iDilsh Network, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the site or services; (b) any conduct or content of any third party on the site; (c) any content obtained from the site; or (d) unauthorized access, use, or alteration of your transmissions or content. In no event shall our total liability to you for all claims arising out of or relating to the use of our services exceed the amount paid by you to us during the twelve (12) months preceding the claim.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">8. Governing Law</h2>
                <p className="leading-relaxed">
                  These Terms shall be governed by and defined following the laws of Sri Lanka. iDilsh Network and yourself irrevocably consent that the courts of Sri Lanka shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">9. Contact Information</h2>
                <p className="leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:{' '}
                  <a href="mailto:hello@idilsh.top" className="text-brand-violet hover:text-[#6D28D9] transition-colors">hello@idilsh.top</a>. We are committed to resolving any disputes amicably and encourage you to reach out before taking any formal legal action.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
