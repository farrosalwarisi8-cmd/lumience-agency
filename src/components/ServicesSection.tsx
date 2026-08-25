"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";

// ── DATA INTERFACES ──────────────────────────────────────────
interface MainService {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface ServiceData {
  id: "it" | "multimedia";
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  themeColor: string;
  badgeClass: string;
  iconBgClass: string;
  mainServices: MainService[];
  additionalServices: string[];
}

// ── SERVICES DATA ─────────────────────────────────────────────
const SERVICES_DATA: ServiceData[] = [
  {
    id: "it",
    number: "01",
    title: "IT SOLUTIONS",
    subtitle: "Membangun Sistem, Menggerakkan Bisnis.",
    desc: "Kami merancang dan mengembangkan solusi digital yang menjadi fondasi operasional bisnis Anda — cepat, aman, dan siap berkembang bersama skala usaha Anda.",
    themeColor: "#087CF5", // Lumience Blue
    badgeClass: "bg-lumience-blue/10 text-lumience-blue border-lumience-blue/20",
    iconBgClass: "bg-gradient-to-br from-lumience-blue to-bright-blue text-white",
    mainServices: [
      {
        title: "Mobile App Development",
        desc: "Android, iOS, hingga cross-platform dengan performa tinggi & UI intuitif.",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        title: "Web Development",
        desc: "Company profile interaktif, e-commerce, hingga sistem berbasis web yang andal.",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        title: "Custom Business Solutions",
        desc: "Sistem internal, dashboard, dan otomatisasi yang disesuaikan alur kerja Anda.",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        ),
      },
    ],
    additionalServices: [
      "UI/UX Consulting", "Maintenance & Support", "Cloud Hosting", "ERP/CRM Sederhana", "API Integration"
    ],
  },
  {
    id: "multimedia",
    number: "02",
    title: "MULTIMEDIA SOLUTIONS",
    subtitle: "Merancang Visual, Menghidupkan Ide.",
    desc: "Kami menerjemahkan gagasan bisnis Anda menjadi karya visual yang berkesan — dari layar digital hingga produk fisik yang dapat disentuh.",
    themeColor: "#7438D4", // Lumience Purple
    badgeClass: "bg-lumience-purple/10 text-lumience-purple border-lumience-purple/20",
    iconBgClass: "bg-gradient-to-br from-lumience-purple to-[#b224ef] text-white",
    mainServices: [
      {
        title: "3D Modeling",
        desc: "Visualisasi produk realistis, aset arsitektur, hingga pemodelan karakter detail.",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        ),
      },
      {
        title: "Sablon & Percetakan",
        desc: "Merchandise premium, kaos komunitas, seragam, dan segala kebutuhan cetak.",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        ),
      },
      {
        title: "Desain Materi Iklan",
        desc: "Konten promosi media sosial, spanduk, flyer, dan poster kreatif siap tayang.",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
      },
    ],
    additionalServices: [
      "Branding & Logo Identity", "Motion Graphics", "Packaging Design", "Social Media Content", "Product Photography"
    ],
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
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

      // Rows Animation
      rowsRef.current.forEach((row, idx) => {
        const textContent = row.querySelector(".text-content");
        const features = row.querySelectorAll(".feature-card");
        const pills = row.querySelectorAll(".service-pill");
        
        const isEven = idx % 2 !== 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // Text slides in
        tl.fromTo(
          textContent,
          { opacity: 0, x: isEven ? 80 : -80 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
        )
        // Features stagger in
        .fromTo(
          features,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        // Pills pop in
        .fromTo(
          pills,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, ease: "back.out(1.5)" },
          "-=0.4"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="layanan" className="relative min-h-screen w-full bg-off-white py-24 lg:py-32 overflow-hidden">
      
      {/* ── BACKGROUND ACCENTS ── */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-light-blue/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-light-purple/40 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── SECTION HEADER ── */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
          <span className="font-display text-xs sm:text-sm font-bold tracking-[0.25em] text-lumience-blue uppercase bg-lumience-blue/10 px-4 py-2 rounded-full border border-lumience-blue/10 inline-block mb-6">
            Layanan Kami
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark-text tracking-tight mb-6 leading-tight">
            Satu Atap,<br className="hidden sm:block" /> <span className="gradient-text-blue">Dua Kekuatan.</span>
          </h2>
          <p className="font-body text-lg sm:text-xl text-soft-gray leading-relaxed font-light">
            Dari sistem solid yang beroperasi di balik layar, hingga mahakarya visual yang memikat audiens Anda.
          </p>
        </div>

        {/* ── SERVICES ROWS ── */}
        <div className="space-y-24 lg:space-y-40">
          {SERVICES_DATA.map((service, idx) => {
            const isEven = idx % 2 !== 0; // True for Multimedia (Right-aligned text)
            
            return (
              <div 
                key={service.id} 
                ref={(el) => { if (el) rowsRef.current[idx] = el; }}
                className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center relative`}
              >
                {/* Massive Watermark Number */}
                <div className={`absolute top-0 ${isEven ? 'right-0 lg:right-auto lg:left-0' : 'left-0 lg:left-auto lg:right-0'} -translate-y-1/4 opacity-[0.03] select-none pointer-events-none`}>
                  <span className="font-display text-[15rem] lg:text-[25rem] font-black leading-none text-dark-text">
                    {service.number}
                  </span>
                </div>

                {/* ── LEFT/RIGHT: TEXT CONTEXT ── */}
                <div className="text-content w-full lg:w-5/12 relative z-10">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase mb-6 ${service.badgeClass}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {service.title}
                  </div>
                  
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-text leading-[1.1] mb-6">
                    {service.subtitle}
                  </h3>
                  
                  {/* Teks Deskripsi sekarang berwarna slate-600 yang sangat mudah dibaca */}
                  <p className="font-body text-base lg:text-lg text-slate-600 font-light leading-relaxed mb-10">
                    {service.desc}
                  </p>

                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                      Layanan Ekstra:
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {service.additionalServices.map((pill, pIdx) => (
                        <span key={pIdx} className="service-pill px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-body font-semibold text-slate-600 shadow-sm hover:border-slate-400 hover:shadow-md transition-all cursor-default">
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── RIGHT/LEFT: FEATURE CARDS ── */}
                <div className="w-full lg:w-7/12 relative z-10">
                  <div className="flex flex-col gap-4 sm:gap-5">
                    {service.mainServices.map((mainSrv, itemIdx) => (
                      <div 
                        key={itemIdx}
                        className="feature-card group flex items-start gap-5 p-6 rounded-3xl bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-400 cursor-default overflow-hidden relative"
                      >
                        {/* Subtle highlight on hover */}
                        <div className="absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: service.themeColor }} />
                        
                        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${service.iconBgClass}`}>
                          {mainSrv.icon}
                        </div>
                        
                        <div>
                          <h4 className="font-display text-lg sm:text-xl font-bold text-dark-text mb-2 group-hover:text-black transition-colors">
                            {mainSrv.title}
                          </h4>
                          {/* Teks fitur juga berwarna slate-600 yang tajam */}
                          <p className="font-body text-sm text-slate-600 leading-relaxed font-light">
                            {mainSrv.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}