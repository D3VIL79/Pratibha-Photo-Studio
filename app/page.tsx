import { HeroSection } from "@/components/hero";
import { ShowcaseSection } from "@/components/sections/showcase";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { FullscreenGallery } from "@/components/sections/gallery";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="w-full relative bg-black">
      {/* 01 — Hero: Cinematic entrance with 3D particles */}
      <HeroSection />

      {/* 02 — Showcase: Full-screen scroll-driven project reveals */}
      <ShowcaseSection />

      {/* 03 — About: Word-by-word manifesto + stats */}
      <AboutSection />

      {/* 04 — Services: Photography service offerings */}
      <ServicesSection />

      {/* 05 — Gallery: Horizontal scroll reel */}
      <FullscreenGallery />

      {/* 06 — Testimonials: Infinite marquee of reviews */}
      <TestimonialsSection />

      {/* 07 — CTA: Book your session */}
      <CTASection />

      {/* 08 — Contact: Full details + Map */}
      <ContactSection />

      {/* 09 — Footer */}
      <Footer />
    </main>
  );
}
