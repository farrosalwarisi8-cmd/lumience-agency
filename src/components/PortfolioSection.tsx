"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapConfig";
import GlowOrb from "./GlowOrb";

// ── TYPES & INTERFACES ─────────────────────────────────────────
export type ProjectCategory = "IT Solutions" | "Multimedia Solutions";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  subcategory: string;
  desc: string;
  link: string;
  /* 
    CATATAN PENGEMBANG (INTERNAL):
    Data gambar di bawah menggunakan placeholder visual bertema abstrak (CSS gradients & vectors).
    Ganti field `image` di bawah dengan URL gambar project asli ketika sudah tersedia.
  */
  imagePlaceholderType: "web" | "app" | "branding" | "3d";
}

// ── DATA PORTFOLIO (REUSABLE DATA STRUCTURE) ───────────────────
const PROJECTS: Project[] = [
  // ── IT SOLUTIONS PROJECTS ──
  {
    id: "it-1",
    title: "EqAdmin — Sistem Manajemen Sekolah",
    category: "IT Solutions",
    subcategory: "Web Development",
    desc: "Sistem manajemen data siswa, jadwal, dan nilai berbasis web yang aman dan scalable untuk institusi pendidikan.",
    link: "#",
    imagePlaceholderType: "web",
  },
  {
    id: "it-2",
    title: "KedaiKu POS — Aplikasi Point of Sale UMKM",
    category: "IT Solutions",
    subcategory: "Mobile App Development",
    desc: "Aplikasi kasir digital untuk pelaku UMKM, mendukung pencatatan transaksi offline-first dan laporan penjualan real-time.",
    link: "#",
    imagePlaceholderType: "app",
  },
  // ── MULTIMEDIA SOLUTIONS PROJECTS ──
  {
    id: "mm-1",
    title: "Nirmala Skincare — Branding & Campaign Poster",
    category: "Multimedia Solutions",
    subcategory: "Branding & Design",
    desc: "Identitas visual lengkap dan materi iklan promosi elegan untuk peluncuran lini produk skincare lokal.",
    link: "#",
    imagePlaceholderType: "branding",
  },
  {
    id: "mm-2",
    title: "Rasa Nusantara — 3D Product Visualization & Packaging",
    category: "Multimedia Solutions",
    subcategory: "3D Modeling & Packaging Design",
    desc: "Visualisasi 3D produk realistis dan desain kemasan makanan tradisional dengan sentuhan modern.",
    link: "#",
    imagePlaceholderType: "3d",
  },
];

type FilterTab = "Semua" | "IT Solutions" | "Multimedia Solutions";

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("Semua");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(PROJECTS);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // ── Initial entrance animation (ScrollTrigger) ──────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
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

      // Tabs animation
      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards staggered entrance
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Tab Filter Transition with GSAP ──────────────────────────
  const handleTabChange = (tab: FilterTab) => {
    if (tab === activeTab || isAnimating) return;
    setIsAnimating(true);

    // Fade out visible cards
    gsap.to(cardsRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 20,
      duration: 0.35,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        // Update state
        setActiveTab(tab);
        const newFiltered =
          tab === "Semua"
            ? PROJECTS
            : PROJECTS.filter((p) => p.category === tab);
        setFilteredProjects(newFiltered);

        // Wait for DOM re-render then animate in
        setTimeout(() => {
          gsap.fromTo(
            cardsRef.current,
            { opacity: 0, scale: 0.92, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
              onComplete: () => setIsAnimating(false),
            }
          );
        }, 50);
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative min-h-screen w-full overflow-hidden bg-deep-navy bg-noise py-24 sm:py-28 lg:py-32"
    >
      {/* ── Ambient Glow Decor ── */}
      <div className="absolute top-1/4 left-[-10%] pointer-events-none">
        <GlowOrb color="blue" size="650px" opacity={0.18} />
      </div>
      <div className="absolute bottom-10 right-[-10%] pointer-events-none">
        <GlowOrb color="purple" size="600px" opacity={0.15} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── SECTION HEADER ── */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="font-display text-xs sm:text-sm font-bold tracking-[0.25em] text-bright-blue uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10 inline-block mb-4">
            Portfolio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Karya yang Sudah Kami <span className="gradient-text-blue">Wujudkan</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-white/60 font-light leading-relaxed">
            Sebagian project yang telah kami kerjakan untuk klien di berbagai industri.
          </p>
        </div>

        {/* ── FILTER TABS ── */}
        <div ref={tabsRef} className="flex justify-center mb-12 sm:mb-16">
          <div className="glass p-1.5 rounded-full inline-flex gap-1 border border-white/10 shadow-2xl">
            {(["Semua", "IT Solutions", "Multimedia Solutions"] as FilterTab[]).map(
              (tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-body font-medium transition-all duration-500 select-none ${
                      isActive
                        ? "text-white shadow-glow-blue-sm"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {/* Active Background Slide */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-lumience-blue to-bright-blue z-0" />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* ── PORTFOLIO GRID ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
        >
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              cardRef={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECT CARD COMPONENT
// ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  cardRef: (el: HTMLDivElement | null) => void;
}

function ProjectCard({ project, cardRef }: ProjectCardProps) {
  const isIT = project.category === "IT Solutions";

  return (
    <div
      ref={cardRef}
      className="group relative rounded-3xl glass-card overflow-hidden border border-white/[0.08] hover:border-white/20 transition-all duration-500 flex flex-col justify-between"
    >
      {/* ── Thumbnail Container with Zoom Effect ── */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-midnight-navy/80 flex items-center justify-center p-6">
        {/* Ambient Gradient Background for Thumbnail */}
        <div
          className={`absolute inset-0 opacity-40 transition-transform duration-700 ease-out group-hover:scale-110 ${
            isIT
              ? "bg-gradient-to-br from-lumience-blue/30 via-bright-blue/10 to-transparent"
              : "bg-gradient-to-br from-lumience-purple/40 via-[#b224ef]/10 to-transparent"
          }`}
        />

        {/* Dynamic Abstract CSS Mock Visual for Placeholder */}
        <div className="relative z-10 w-full h-full rounded-2xl glass border border-white/10 flex items-center justify-center overflow-hidden transition-transform duration-700 ease-out group-hover:scale-105 shadow-2xl">
          <ProjectVisualMock type={project.imagePlaceholderType} />
        </div>

        {/* Category Pill Tag on Image */}
        <div className="absolute top-4 left-4 z-20">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-body font-semibold tracking-wider uppercase backdrop-blur-xl border ${
              isIT
                ? "bg-lumience-blue/20 text-bright-blue border-lumience-blue/40"
                : "bg-lumience-purple/20 text-[#d8b4fe] border-lumience-purple/40"
            }`}
          >
            {project.subcategory}
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-bright-blue transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-body text-sm text-white/60 font-light leading-relaxed mb-6">
            {project.desc}
          </p>
        </div>

        {/* ── Card Footer / Link Action ── */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <a
            href={project.link}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-body font-semibold text-white/80 group-hover:text-white transition-colors"
          >
            <span>Lihat Detail Project</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-bright-blue"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ABSTRACT CSS VISUAL MOCK (ELEGANT PLACEHOLDERS)
// ─────────────────────────────────────────────────────────────

function ProjectVisualMock({ type }: { type: Project["imagePlaceholderType"] }) {
  if (type === "web") {
    return (
      <div className="w-full h-full p-4 flex flex-col justify-between opacity-80">
        <div className="flex items-center gap-1.5 pb-2 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <div className="ml-2 h-2 w-32 bg-white/10 rounded-full" />
        </div>
        <div className="grid grid-cols-3 gap-2 my-auto">
          <div className="h-16 rounded-lg bg-lumience-blue/20 border border-lumience-blue/30" />
          <div className="h-16 rounded-lg bg-white/5 border border-white/10" />
          <div className="h-16 rounded-lg bg-white/5 border border-white/10" />
        </div>
      </div>
    );
  }

  if (type === "app") {
    return (
      <div className="flex items-center justify-center gap-3">
        <div className="w-20 h-32 rounded-2xl border-2 border-white/20 bg-white/5 p-1.5 flex flex-col justify-between shadow-xl">
          <div className="w-6 h-1 bg-white/30 rounded-full mx-auto" />
          <div className="space-y-1 my-auto">
            <div className="h-2 w-full bg-bright-blue/40 rounded" />
            <div className="h-2 w-2/3 bg-white/20 rounded" />
          </div>
          <div className="w-4 h-4 rounded-full bg-bright-blue/60 mx-auto" />
        </div>
      </div>
    );
  }

  if (type === "branding") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-lumience-purple to-[#b224ef] opacity-70 blur-md absolute" />
        <div className="relative z-10 font-display text-2xl font-extrabold tracking-widest text-white border-b-2 border-lumience-purple pb-1">
          NIRMALA
        </div>
      </div>
    );
  }

  // 3D Type
  return (
    <div className="relative flex items-center justify-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-lumience-purple via-bright-blue to-white/20 rotate-45 border border-white/30 shadow-2xl flex items-center justify-center">
        <div className="-rotate-45 font-display font-bold text-xs text-white">3D</div>
      </div>
    </div>
  );
}