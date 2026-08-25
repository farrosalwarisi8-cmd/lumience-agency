"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import GlowOrb from "./GlowOrb";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const floatQuoteRef = useRef<HTMLDivElement>(null);
  const floatITRef = useRef<HTMLDivElement>(null);
  const floatMMRef = useRef<HTMLDivElement>(null);
  const floatChipRef = useRef<HTMLDivElement>(null);
  const glowWrapperRef = useRef<HTMLDivElement>(null);
  const grid3dRef = useRef<HTMLDivElement>(null);
  const gridFloorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      const words = titleRef.current
        ? titleRef.current.querySelectorAll(".word")
        : [];

      // Grid entrance
      gsap.fromTo(
        grid3dRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: "power2.out" }
      );
      gsap.fromTo(
        gridFloorRef.current,
        { opacity: 0, rotateX: 78 },
        { opacity: 1, rotateX: 68, duration: 1.6, ease: "power3.out", delay: 0.15 }
      );

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      if (words.length > 0) {
        tl.fromTo(
          words,
          { opacity: 0, y: 70, rotationX: -24 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.1,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.35"
        );
      }

      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.75 },
        "-=0.7"
      )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          [
            floatQuoteRef.current,
            floatITRef.current,
            floatMMRef.current,
            floatChipRef.current,
          ],
          { opacity: 0, scale: 0.88, y: 28 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: "back.out(1.3)",
          },
          "-=0.7"
        );

      gsap.to(floatITRef.current, {
        y: -10,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(floatMMRef.current, {
        y: 12,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });
      gsap.to(floatQuoteRef.current, {
        y: -8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.2,
      });
      gsap.to(floatChipRef.current, {
        y: 8,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.6,
      });

      // Slow drifting perspective on floor grid
      gsap.to(gridFloorRef.current, {
        backgroundPosition: "0px 80px",
        duration: 12,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(floatQuoteRef.current, {
        x: x * -28,
        y: y * -18,
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(floatITRef.current, {
        x: x * 36,
        y: y * 22,
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(floatMMRef.current, {
        x: x * -40,
        y: y * 28,
        duration: 1.1,
        ease: "power2.out",
      });
      gsap.to(floatChipRef.current, {
        x: x * 24,
        y: y * -20,
        duration: 1.15,
        ease: "power2.out",
      });
      gsap.to(glowWrapperRef.current, {
        x: x * 16,
        y: y * 16,
        duration: 1.4,
        ease: "power2.out",
      });

      // 3D tilt on wall grid + floor
      gsap.to(grid3dRef.current, {
        rotateY: x * 3,
        rotateX: y * -2,
        duration: 1.2,
        ease: "power2.out",
      });
      gsap.to(gridFloorRef.current, {
        rotateX: 68 + y * 2,
        rotateY: x * 2,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const titleLine1 = "Where Ideas".split(" ");
  const titleLine2 = "Take Shape,".split(" ");

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-deep-navy bg-noise flex flex-col items-center justify-center pt-24 pb-16 sm:pt-28 sm:pb-20"
      style={{ perspective: "1200px" }}
    >
      {/* ═══════════════════════════════════════════
          3D GRID SYSTEM
      ═══════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        {/* Layer 1 — WALL GRID (facing camera, slight depth) */}
        <div
          ref={grid3dRef}
          className="absolute inset-[-10%] origin-center"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(-80px)",
          }}
        >
          {/* Main luminous grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(22, 140, 255, 0.22) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(22, 140, 255, 0.18) 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse 80% 75% at 50% 42%, black 15%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 75% at 50% 42%, black 15%, transparent 72%)",
            }}
          />

          {/* Secondary finer grid (depth layer) */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse 70% 65% at 50% 42%, black 10%, transparent 68%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 65% at 50% 42%, black 10%, transparent 68%)",
            }}
          />

          {/* Strong accent columns */}
          <div className="absolute inset-y-0 left-[15%] w-px bg-gradient-to-b from-transparent via-bright-blue/50 to-transparent shadow-[0_0_12px_rgba(22,140,255,0.5)]" />
          <div className="absolute inset-y-0 right-[15%] w-px bg-gradient-to-b from-transparent via-lumience-purple/45 to-transparent shadow-[0_0_12px_rgba(116,56,212,0.45)]" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />

          {/* Strong accent rows */}
          <div className="absolute inset-x-0 top-[30%] h-px bg-gradient-to-r from-transparent via-bright-blue/40 to-transparent shadow-[0_0_10px_rgba(22,140,255,0.35)]" />
          <div className="absolute inset-x-0 bottom-[32%] h-px bg-gradient-to-r from-transparent via-lumience-purple/35 to-transparent shadow-[0_0_10px_rgba(116,56,212,0.3)]" />

          {/* Glowing intersection nodes */}
          {[
            { t: "30%", l: "15%" },
            { t: "30%", l: "50%" },
            { t: "30%", l: "85%" },
            { t: "68%", l: "15%" },
            { t: "68%", l: "50%" },
            { t: "68%", l: "85%" },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: pos.t, left: pos.l }}
            >
              <div
                className={`absolute inset-0 rounded-full ${
                  i % 2 === 0 ? "bg-bright-blue" : "bg-lumience-purple"
                } opacity-70`}
              />
              <div
                className={`absolute -inset-1 rounded-full blur-sm ${
                  i % 2 === 0 ? "bg-bright-blue" : "bg-lumience-purple"
                } opacity-40`}
              />
            </div>
          ))}
        </div>

        {/* Layer 2 — FLOOR GRID (perspective 3D plane) */}
        <div
          className="absolute left-[-20%] right-[-20%] bottom-[-5%] h-[55%] origin-bottom"
          style={{
            perspective: "600px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            ref={gridFloorRef}
            className="absolute inset-0 origin-bottom"
            style={{
              transform: "rotateX(68deg)",
              transformStyle: "preserve-3d",
              backgroundImage: `
                linear-gradient(to right, rgba(22, 140, 255, 0.35) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(116, 56, 212, 0.28) 1px, transparent 1px)
              `,
              backgroundSize: "56px 56px",
              maskImage:
                "linear-gradient(to top, black 0%, black 25%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 0%, black 25%, transparent 85%)",
              boxShadow: "0 0 60px rgba(8, 124, 245, 0.08)",
            }}
          />
          {/* Horizon glow line */}
          <div
            className="absolute left-[10%] right-[10%] top-[8%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(22,140,255,0.55), rgba(116,56,212,0.45), transparent)",
              boxShadow: "0 0 20px rgba(22,140,255,0.4), 0 0 40px rgba(116,56,212,0.2)",
            }}
          />
        </div>

        {/* Edge vignette so grid doesn't fight content */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,27,68,0.55)_70%,rgba(0,27,68,0.92)_100%)]" />
      </div>

      {/* ── Ambient light ── */}
      <div
        ref={glowWrapperRef}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div className="absolute top-[18%] left-[8%] w-[420px] h-[420px] rounded-full bg-bright-blue/15 blur-[110px] mix-blend-screen" />
        <div className="absolute bottom-[12%] right-[10%] w-[480px] h-[480px] rounded-full bg-lumience-purple/15 blur-[120px] mix-blend-screen" />
        <GlowOrb
          color="mixed"
          size="700px"
          opacity={0.12}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* ── CENTER CONTENT ── */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 sm:mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-bright-blue animate-pulse" />
          <span className="font-display text-xs sm:text-sm font-bold tracking-[0.2em] text-white/80 uppercase">
            Lumience Agency
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-display font-extrabold tracking-tighter leading-[1.05] sm:leading-[0.95] mb-6"
          style={{ perspective: "1000px" }}
        >
          <span className="block text-[2.7rem] sm:text-6xl md:text-7xl lg:text-[5.8rem] text-white">
            {titleLine1.map((word, i) => (
              <span
                key={`l1-${i}`}
                className="word inline-block mr-3 sm:mr-5 drop-shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word}
              </span>
            ))}
          </span>
          <span className="block text-[3rem] sm:text-6xl md:text-7xl lg:text-[6.2rem] text-white mt-1 sm:mt-0">
            {titleLine2.map((word, i) => (
              <span
                key={`l2-${i}`}
                className="word inline-block mr-3 sm:mr-5 drop-shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word}
              </span>
            ))}
          </span>
          <span className="block text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[5rem] mt-2 sm:mt-3">
            <span className="word inline-block font-light italic text-white/55 mr-3 sm:mr-5">
              Digitally
            </span>
            <span className="word inline-block font-body font-light text-white/25 mr-3 sm:mr-5">
              &amp;
            </span>
            <span className="word inline-block gradient-text-premium pb-1">
              Visually.
            </span>
          </span>
        </h1>

        <p
          ref={descRef}
          className="font-body text-sm sm:text-base lg:text-lg text-white/50 font-light leading-relaxed max-w-2xl mx-auto mb-9 sm:mb-11"
        >
          Kami menggabungkan kekuatan teknologi dan kreativitas visual dalam satu
          atap. Dari sistem solid yang bekerja di balik layar, hingga desain
          memikat yang berbicara ke audiens Anda.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
        >
          <a
            href="#layanan"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-body font-semibold text-deep-navy bg-white hover:bg-bright-blue hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.18)] hover:shadow-glow-blue"
          >
            Eksplorasi Layanan
          </a>
          <a
            href="#portfolio"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-body font-medium text-white glass border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            Lihat Karya Kami
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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

      {/* ── FLOATING CARDS ── */}

      <div
        ref={floatQuoteRef}
        className="hidden lg:flex absolute bottom-[12%] left-[4%] xl:left-[7%] z-30"
      >
        <div className="glass rounded-2xl p-5 border border-white/15 max-w-[270px] shadow-2xl backdrop-blur-3xl -rotate-2 hover:rotate-0 transition-transform duration-500">
          <div className="flex gap-3 items-start">
            <span className="font-display text-3xl leading-none text-bright-blue select-none">
              &ldquo;
            </span>
            <div>
              <p className="font-display text-[10px] font-bold tracking-widest text-white uppercase mb-1.5">
                Coba Dulu, Percaya Kemudian
              </p>
              <p className="font-body text-xs text-white/50 leading-relaxed">
                Puas baru bayar, belum puas kami tarik kembali tanpa membebani
                Anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={floatITRef}
        className="hidden lg:flex absolute top-[22%] right-[4%] xl:right-[8%] z-30"
      >
        <div className="glass-blue rounded-3xl p-4 border border-bright-blue/30 shadow-[0_10px_40px_rgba(8,124,245,0.22)] rotate-6 hover:scale-105 transition-transform duration-500 min-w-[180px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-bright-blue/20 border border-bright-blue/30 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-bright-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <span className="font-display text-xs font-bold tracking-wider text-bright-blue uppercase">
              IT Solutions
            </span>
          </div>
          <p className="font-body text-[11px] text-white/55 leading-snug mb-3">
            Web, Mobile & Custom Systems
          </p>
          <div className="space-y-1.5">
            <div className="h-1.5 w-24 bg-white/20 rounded-full" />
            <div className="h-1.5 w-16 bg-white/10 rounded-full" />
          </div>
        </div>
      </div>

      <div
        ref={floatMMRef}
        className="hidden lg:flex absolute bottom-[14%] right-[5%] xl:right-[9%] z-30"
      >
        <div className="glass-purple rounded-3xl p-4 border border-lumience-purple/35 shadow-[0_10px_40px_rgba(116,56,212,0.25)] -rotate-6 hover:scale-105 transition-transform duration-500 min-w-[190px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-lumience-purple/25 border border-lumience-purple/40 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#c084fc]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="font-display text-xs font-bold tracking-wider text-[#c084fc] uppercase">
              Multimedia
            </span>
          </div>
          <p className="font-body text-[11px] text-white/55 leading-snug mb-3">
            3D, Branding & Visual Design
          </p>
          <div className="flex gap-1.5">
            <div className="w-6 h-6 rounded-md bg-lumience-purple/30 border border-white/10" />
            <div className="w-6 h-6 rounded-md bg-white/10 border border-white/10" />
            <div className="w-6 h-6 rounded-md bg-bright-blue/20 border border-white/10" />
          </div>
        </div>
      </div>

      <div
        ref={floatChipRef}
        className="hidden lg:flex absolute top-[42%] left-[3%] xl:left-[5%] z-20"
      >
        <div className="glass rounded-full px-4 py-2.5 border border-white/15 shadow-xl flex items-center gap-2 rotate-[-4deg] hover:rotate-0 transition-transform duration-500">
          <span className="font-display text-[10px] font-bold text-bright-blue tracking-wide">
            LUMEN
          </span>
          <span className="text-white/30 text-[10px]">+</span>
          <span className="font-display text-[10px] font-bold text-[#c084fc] tracking-wide">
            SCIENCE
          </span>
          <span className="text-white/30 text-[10px]">=</span>
          <span className="font-display text-[10px] font-bold gradient-text-blue tracking-wide">
            LUMIENCE
          </span>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden relative z-20 mt-12 w-full max-w-md px-4 flex flex-col gap-3">
        <div className="glass-blue rounded-2xl p-4 border border-bright-blue/25 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-bright-blue/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-bright-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <p className="font-display text-xs font-bold text-bright-blue uppercase tracking-wider">IT Solutions</p>
            <p className="font-body text-[11px] text-white/50">Web, Mobile & Custom Systems</p>
          </div>
        </div>
        <div className="glass-purple rounded-2xl p-4 border border-lumience-purple/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-lumience-purple/25 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#c084fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="font-display text-xs font-bold text-[#c084fc] uppercase tracking-wider">Multimedia Solutions</p>
            <p className="font-body text-[11px] text-white/50">3D, Branding & Visual Design</p>
          </div>
        </div>
      </div>
    </section>
  );
}