"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  division: "IT" | "Multimedia" | "Leadership" | "Marketing";
  bio: string;
  initials: string;
  photo?: string;
  accent: string; // warna gradient portrait placeholder
}

const TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Alif Basya",
    role: "Founder & Lead Developer",
    division: "Leadership",
    bio: "Mengawasi arah produk dan arsitektur sistem digital Lumience.",
    initials: "AB",
    photo: "/team/alip.jpg",
    accent: "from-[#0a2a5c] via-[#087cf5] to-[#06152f]",
  },
  {
    id: "2",
    name: "Muhammad Reza",
    role: "Marketing",
    division: "Marketing",
    bio: "Memimpin arah visual brand, kampanye, dan strategi pemasaran.",
    initials: "MR",
    photo: "/team/reza.jpg",
    accent: "from-[#2a1050] via-[#7438d4] to-[#06152f]",
  },
  {
    id: "3",
    name: "Farros Al Warisi",
    role: "Full-Stack Developer",
    division: "IT",
    bio: "Membangun web app, API, dan sistem custom yang scalable.",
    initials: "FA",
    photo: "/team/farros.jpg",
    accent: "from-[#062a4a] via-[#168cff] to-[#001b44]",
  },
  {
    id: "4",
    name: "Nehan Abdillah",
    role: "Front-End Developer & 3D Artist",
    division: "IT",
    bio: "Merancang pengalaman pengguna yang rapi, jelas, dan mudah dipakai, serta mampu membuat desain 3D.",
    initials: "NA",
    photo: "/team/nehan.jpeg",
    accent: "from-[#0c2340] via-[#3b82f6] to-[#0a1628]",
  },
  {
    id: "5",
    name: "Rava Satria Medina",
    role: "3D Artist & Motion Designer",
    division: "Multimedia",
    bio: "Spesialis modeling, product visualization, dan aset 3D.",
    initials: "RS",
    photo: "/team/rava.jpeg",
    accent: "from-[#1a0b33] via-[#9b59b6] to-[#0d0818]",
  },
  {
    id: "6",
    name: "M. Arief Al Amin",
    role: "Graphic Designer",
    division: "Multimedia",
    bio: "Fokus branding, poster, packaging, dan materi promosi visual.",
    initials: "AA",
    photo: "/team/ariep.jpeg",
    accent: "from-[#251040] via-[#7438d4] to-[#12081f]",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
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
      id="team"
      className="relative w-full overflow-hidden bg-deep-navy py-24 sm:py-28 lg:py-32"
    >
      {/* Soft ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-lumience-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-lumience-purple/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — Centered, Clean, & Balanced */}
        <div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-bright-blue animate-pulse" />
            <span className="font-display text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
              Our Team
            </span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Orang-orang di Balik{" "}
            <span className="gradient-text-blue">Setiap Project</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-white/45 font-light leading-relaxed">
            Enam spesialis yang menggabungkan logika sistem dan kreativitas
            visual — bekerja rapi, komunikatif, dan berorientasi hasil.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {TEAM.map((member, index) => (
            <article
              key={member.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative flex flex-col rounded-[28px] overflow-hidden bg-[#07162e] border border-white/[0.07] transition-all duration-500 hover:border-white/15 hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)] hover:-translate-y-2"
            >
              {/* ── PHOTO AREA (top) ── */}
              <div className="relative aspect-[4/5] overflow-hidden">
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.accent}`}
                  >
                    {/* Abstract portrait placeholder */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 35%),
                          radial-gradient(circle at 70% 60%, rgba(255,255,255,0.12), transparent 40%)
                        `,
                      }}
                    />
                    {/* Soft person silhouette */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[58%] h-[72%]">
                      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[42%] aspect-square rounded-full bg-white/15 blur-[1px]" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[58%] rounded-t-[50%] bg-white/10" />
                    </div>
                    {/* Large initials watermark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-7xl sm:text-8xl font-black text-white/[0.07] tracking-tighter select-none">
                        {member.initials}
                      </span>
                    </div>
                    {/* Film grain */}
                    <div
                      className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      }}
                    />
                  </div>
                )}

                {/* Gradient fade into card body */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#07162e] via-[#07162e]/70 to-transparent pointer-events-none" />

                {/* Division tag on photo — High Contrast Dark Glass Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-display font-bold tracking-[0.18em] uppercase backdrop-blur-md shadow-lg border ${
                      member.division === "IT"
                        ? "bg-slate-950/80 text-cyan-300 border-cyan-400/40"
                        : member.division === "Multimedia"
                        ? "bg-slate-950/80 text-purple-300 border-purple-400/40"
                        : member.division === "Marketing"
                        ? "bg-slate-950/80 text-emerald-300 border-emerald-400/40"
                        : "bg-slate-950/80 text-amber-300 border-amber-400/40"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        member.division === "IT"
                          ? "bg-cyan-400"
                          : member.division === "Multimedia"
                          ? "bg-purple-400"
                          : member.division === "Marketing"
                          ? "bg-emerald-400"
                          : "bg-amber-400"
                      }`}
                    />
                    {member.division}
                  </span>
                </div>

                {/* Hover shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent" />
              </div>

              {/* ── CONTENT ── */}
              <div className="relative flex flex-col flex-1 px-5 sm:px-6 pb-6 -mt-10 z-10">
                <div className="mb-3">
                  <h3 className="font-display text-xl sm:text-[1.35rem] font-bold text-white tracking-tight leading-tight mb-1 group-hover:text-white transition-colors">
                    {member.name}
                  </h3>
                  <p
                    className={`font-body text-sm font-medium ${
                      member.division === "IT"
                        ? "text-cyan-400"
                        : member.division === "Multimedia"
                        ? "text-purple-300"
                        : member.division === "Marketing"
                        ? "text-emerald-400"
                        : "text-amber-300"
                    }`}
                  >
                    {member.role}
                  </p>
                </div>

                <p className="font-body text-sm text-white/40 font-light leading-relaxed mb-5">
                  {member.bio}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <span className="font-body text-[11px] text-white/30 tracking-wide">
                    Lumience · {member.division}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-body text-[11px] text-white/45 group-hover:text-bright-blue transition-colors duration-300">
                    Profile
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
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
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}