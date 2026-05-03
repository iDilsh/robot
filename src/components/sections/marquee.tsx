'use client';

const marqueeContent = '✦ Graphic Design ✦ Video Editing ✦ AI Creations ✦ Web Design ✦ Social Media ✦ Branding ✦';

export default function Marquee() {
  return (
    <section className="relative overflow-hidden border-y border-brand-violet/10 bg-slate-50/60">
      <div className="flex animate-marquee whitespace-nowrap py-4">
        <span className="mx-4 text-lg font-medium tracking-wide text-slate-700 sm:text-xl">
          {marqueeContent}
        </span>
        <span className="mx-4 text-lg font-medium tracking-wide text-slate-700 sm:text-xl">
          {marqueeContent}
        </span>
        <span className="mx-4 text-lg font-medium tracking-wide text-slate-700 sm:text-xl">
          {marqueeContent}
        </span>
        <span className="mx-4 text-lg font-medium tracking-wide text-slate-700 sm:text-xl">
          {marqueeContent}
        </span>
      </div>
    </section>
  );
}
