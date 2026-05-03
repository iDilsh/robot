'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Home, Shield } from 'lucide-react';
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

export default function PrivacyPage() {
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
              <li className="font-medium text-brand-violet">Privacy Policy</li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-4"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-violet/10 text-brand-violet">
              <Shield className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl">Privacy Policy</h1>
              <p className="mt-1 text-muted-foreground">Last updated: May 1, 2026</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="prose prose-slate prose-lg max-w-none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="space-y-8 text-slate-700">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">1. Introduction</h2>
                <p className="leading-relaxed">
                  iDilsh Network (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website idilsh.top, including any other media form, media channel, mobile website, or mobile application related or connected thereto. Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
                <p className="leading-relaxed mb-4">
                  We may collect information about you in a variety of ways. The information we may collect on the site includes:
                </p>
                <h3 className="font-heading text-lg font-bold text-slate-800 mb-2">Personal Data</h3>
                <p className="leading-relaxed mb-4">
                  Personally identifiable information, such as your name, email address, phone number, company name, and country, that you voluntarily give to us when you choose to participate in various activities related to the site, such as filling out a contact form, requesting a quote, subscribing to our newsletter, or engaging with our services. You are under no obligation to provide us with personal information of any kind; however, your refusal to do so may prevent you from using certain features of the site.
                </p>
                <h3 className="font-heading text-lg font-bold text-slate-800 mb-2">Derivative Data</h3>
                <p className="leading-relaxed mb-4">
                  Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the site.
                </p>
                <h3 className="font-heading text-lg font-bold text-slate-800 mb-2">Financial Data</h3>
                <p className="leading-relaxed">
                  Financial information related to your payment method (e.g., valid credit card number, card brand, expiration date) is collected only when you choose to make a purchase through our services. We do not store credit card information on our servers — all payment processing is handled securely by our third-party payment providers.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
                <p className="leading-relaxed mb-4">
                  Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span>Create and manage your account and project requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span>Deliver the services you have requested and respond to your inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span>Send you administrative information, such as order confirmations and policy updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span>Facilitate contests, promotions, and surveys and process related entries and rewards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span>Request feedback and contact you about your use of the site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span>Send you newsletters, marketing communications, and information about our services (with your consent)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span>Protect our rights and comply with legal obligations</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">4. How We Share Your Information</h2>
                <p className="leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to others. We may share information we have collected about you in certain situations:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, order fulfillment, email delivery, hosting services, customer service, and analytics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span><strong>Legal Obligations:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">5. Cookies and Tracking Technologies</h2>
                <p className="leading-relaxed">
                  We may use cookies, web beacons, tracking pixels, and other tracking technologies on the site to help customize the site and improve your experience. When you access the site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the site. You may also opt out of receiving targeted ads from certain third-party advertisers and ad networks. For more information about these opt-out options, please visit the Digital Advertising Alliance or the Network Advertising Initiative.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">6. Data Security</h2>
                <p className="leading-relaxed">
                  We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">7. Your Rights</h2>
                <p className="leading-relaxed mb-4">
                  Depending on your location and applicable law, you may have the following rights regarding your personal data:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span><strong>Access:</strong> The right to request access to the personal data we hold about you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span><strong>Correction:</strong> The right to request correction of inaccurate or incomplete personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span><strong>Deletion:</strong> The right to request deletion of your personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span><strong>Data Portability:</strong> The right to request a copy of your personal data in a structured, machine-readable format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span><strong>Objection:</strong> The right to object to our processing of your personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                    <span><strong>Withdraw Consent:</strong> The right to withdraw your consent at any time where we rely on consent to process your personal data</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">8. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have questions or comments about this Privacy Policy or how we handle your personal data, please contact us at:{' '}
                  <a href="mailto:hello@idilsh.top" className="text-brand-violet hover:text-[#6D28D9] transition-colors">hello@idilsh.top</a>. We will respond to your request within 30 days. We may request additional information to verify your identity before processing certain requests.
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
