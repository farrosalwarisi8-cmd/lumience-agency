"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapConfig";

interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  link: string;
  // Accent color untuk placeholder gambar
  accent: string;
}

// ── DATA IT SOLUTIONS (Butuh minimal 5 agar carousel penuh) ──
const IT_PROJECTS: Project[] = [
  {
    id: "it-1",
    title: "EqAdmin — School Management System",
    category: "Web Application",
    desc: "Sistem manajemen data siswa, jadwal, dan nilai berbasis web yang aman dan scalable untuk institusi pendidikan modern.",
    link: "#",
    accent: "from-blue-600 to-indigo-900",
  },
  {
    id: "it-2",
    title: "KedaiKu POS",
    category: "Mobile App Development",
    desc: "Aplikasi kasir digital untuk pelaku UMKM, mendukung pencatatan transaksi offline-first dan laporan penjualan real-time.",
    link: "#",
    accent: "from-cyan-500 to-blue-800",
  },
  {
    id: "it-3",
    title: "Lumina ERP Dashboard",
    category: "Custom Business Solutions",
    desc: "Dashboard enterprise planning untuk memantau rantai pasok, inventaris, dan absensi karyawan dalam satu platform terpusat.",
    link: "#",
    accent: "from-indigo-500 via-blue-700 to-slate-900",
  },
  {
    id: "it-4",
    title: "HealthTrack Mobile",
    category: "Mobile App Development",
    desc: "Aplikasi pemantau kesehatan terintegrasi dengan perangkat IoT untuk mengukur detak jantung dan aktivitas harian.",
    link: "#",
    accent: "from-emerald-500 to-teal-900",
  },
  {
    id: "it-5",
    title: "SmartEdu LMS",
    category: "Web Development",
    desc: "Platform Learning Management System dengan fitur video conference, kuis interaktif, dan analitik belajar siswa.",
    link: "#",
    accent: "from-blue-800 to-slate-900",
  },
];

// ── DATA MULTIMEDIA SOLUTIONS ──
const MM_PROJECTS: Project[] = [
  {
    id: "mm-1",
    title: "Nirmala Skincare Campaign",
    category: "Branding & Design",
    desc: "Identitas visual lengkap dan materi iklan promosi elegan untuk peluncuran lini produk skincare lokal.",
    link: "#",
    accent: "from-purple-500 to-pink-800",
  },
  {
    id: "mm-2",
    title: "Rasa Nusantara Packaging",
    category: "3D & Packaging Design",
    desc: "Visualisasi 3D produk realistis dan desain kemasan makanan tradisional dengan sentuhan pattern modern.",
    link: "#",
    accent: "from-fuchsia-600 to-purple-900",
  },
  {
    id: "mm-3",
    title: "Urban Kicks Motion Promo",
    category: "Motion Graphics",
    desc: "Video promosi animasi 3D dan motion graphics beroktan tinggi untuk brand sepatu streetwear lokal.",
    link: "#",
    accent: "from-violet-600 via-purple-700 to-slate-900",
  },
  {
    id: "mm-4",
    title: "EcoLiving Social Media",
    category: "Social Media Content",
    desc: "Template grid Instagram dan aset carousel edukatif bertema gaya hidup ramah lingkungan.",
    link: "#",
    accent: "from-emerald-400 to-purple-800",
  },
  {
    id: "mm-5",
    title: "TechNova Event Poster",
    category: "Graphic Design",
    desc: "Key visual, tipografi kustom, dan serangkaian poster cetak untuk pameran teknologi tahunan.",
    link: "#",
    accent: "from-indigo-600 to-purple-900",
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full bg-deep-navy bg-noise py-24 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* ── AMBIENT GLOW LINES ── */}
      <div className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-[60%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-lumience-blue/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── HEADER ── */}
        <div ref={headerRef} className="text-center mb-16 sm:mb-24">
          <p className="font-body text-sm font-medium text-bright-blue tracking-wide mb-3">
            Our Portfolio
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Karya yang Telah Kami Bangun
          </h2>
          <p className="font-body text-base text-white/50 font-light max-w-xl mx-auto">
            Kumpulan sistem digital, proyek kreatif, dan mahakarya visual yang
            telah kami wujudkan untuk klien kami.
          </p>
        </div>

        {/* ── CAROUSEL IT SOLUTIONS ── */}
        <ProjectCarousel
          title="IT Solutions"
          projects={IT_PROJECTS}
          themeColor="text-cyan-400"
        />

        <div className="h-px w-full max-w-md mx-auto my-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── CAROUSEL MULTIMEDIA ── */}
        <ProjectCarousel
          title="Multimedia Solutions"
          projects={MM_PROJECTS}
          themeColor="text-purple-400"
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// REUSABLE 3D COVERFLOW CAROUSEL COMPONENT
// ─────────────────────────────────────────────────────────────

interface ProjectCarouselProps {
  title: string;
  projects: Project[];
  themeColor: string;
}

function ProjectCarousel({ title, projects, themeColor }: ProjectCarouselProps) {
  // Set item tengah sebagai default aktif
  const [activeIndex, setActiveIndex] = useState(Math.floor(projects.length / 2));
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      carouselRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div ref={carouselRef} className="w-full flex flex-col items-center">
      {/* Title Sub-Section */}
      <h3 className="font-display text-xs font-bold tracking-[0.2em] text-white/30 uppercase mb-8">
        — {title}
      </h3>

      {/* ── 3D CAROUSEL TRACK ── */}
      <div className="relative w-full max-w-[1000px] h-[240px] sm:h-[350px] lg:h-[450px] flex items-center justify-center mb-10 sm:mb-14 perspective-[1200px]">
        {projects.map((project, i) => {
          const diff = i - activeIndex;
          const absDiff = Math.abs(diff);
          const isActive = diff === 0;

          // Math transforms (Overlap, Scale, Z-Index)
          const translateX = diff * 55; // 55% of card width
          const scale = 1 - absDiff * 0.15; // shrinks side cards
          const zIndex = 20 - absDiff; // active on top
          const opacity = absDiff > 2 ? 0 : 1; // hide items far away
          const pointerEvents = absDiff > 1 ? "none" : "auto"; // only clickable if near

          return (
            <div
              key={project.id}
              onClick={() => setActiveIndex(i)}
              className="absolute w-[260px] sm:w-[460px] lg:w-[600px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transform: `translateX(${translateX}%) scale(${scale})`,
                zIndex,
                opacity,
                pointerEvents,
                // Cubic-bezier menghasilkan transisi elastis/premium khas Apple
                transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                boxShadow: isActive
                  ? "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.05)"
                  : "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              {/* Overlay gelap untuk card yang tidak aktif */}
              <div
                className="absolute inset-0 bg-[#020b18] z-20 pointer-events-none"
                style={{
                  opacity: isActive ? 0 : 0.6 + absDiff * 0.1,
                  transition: "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              />

              {/* 
                TODO: GANTI DENGAN GAMBAR ASLI JIKA SUDAH ADA
                <img src="/path-to-image.jpg" alt={project.title} className="w-full h-full object-cover" /> 
              */}
              <MockupWindow accent={project.accent} title={project.title} category={project.category} />
            </div>
          );
        })}
      </div>

      {/* ── PROJECT DETAILS (Teks di bawah carousel) ── */}
      <div className="text-center max-w-2xl px-4 min-h-[140px]">
        <h4 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
          {projects[activeIndex].title}
          <span className={`block sm:inline sm:ml-3 text-sm sm:text-xl font-medium ${themeColor}`}>
            — {projects[activeIndex].category}
          </span>
        </h4>
        <p className="font-body text-sm sm:text-base text-white/50 font-light leading-relaxed mb-6">
          {projects[activeIndex].desc}
        </p>
        <a
          href={projects[activeIndex].link}
          className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-white/80 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1"
        >
          View Project
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* ── CONTROLS (Dots) ── */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="p-2 cursor-pointer focus:outline-none"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MOCKUP UI / PLACEHOLDER GAMBAR
// Meniru tampilan window aplikasi/website untuk efek estetik
// ─────────────────────────────────────────────────────────────
function MockupWindow({ accent, title, category }: { accent: string; title: string; category: string }) {
  return (
    <div className="w-full h-full bg-[#0a1628] flex flex-col border border-white/10 relative overflow-hidden">
      {/* Top Bar MacOS Style */}
      <div className="h-7 sm:h-9 bg-white/5 border-b border-white/10 flex items-center px-3 sm:px-4 gap-1.5 sm:gap-2">
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80" />
      </div>

      {/* Abstract Content Body */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-6">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-80`} />
        
        {/* Glassmorphism card inside mockup */}
        <div className="relative z-10 w-[80%] max-w-[300px] h-[60%] glass rounded-xl border border-white/20 shadow-2xl flex flex-col justify-between p-4 sm:p-6">
           <div className="w-10 h-10 rounded-full bg-white/20 mb-4 flex items-center justify-center">
             <span className="font-display font-bold text-white text-xs">LM</span>
           </div>
           <div>
             <div className="h-2 sm:h-3 w-3/4 bg-white/80 rounded-full mb-2" />
             <div className="h-2 sm:h-3 w-1/2 bg-white/40 rounded-full mb-4" />
             <div className="h-6 sm:h-8 w-full bg-bright-blue/90 rounded-lg mt-auto" />
           </div>
        </div>
      </div>
    </div>
  );
}