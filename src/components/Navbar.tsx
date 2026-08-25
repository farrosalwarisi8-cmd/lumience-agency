"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsapConfig";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Locations", href: "#locations" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// Section yang background-nya TERANG (butuh teks gelap di navbar)
const LIGHT_SECTIONS = ["layanan", "locations", "contact"];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOnLight, setIsOnLight] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const barTop = useRef<HTMLSpanElement>(null);
  const barMid = useRef<HTMLSpanElement>(null);
  const barBot = useRef<HTMLSpanElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Track scroll position
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section + light/dark background
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setActiveSection(id);
            setIsOnLight(LIGHT_SECTIONS.includes(id));
          }
        },
        { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" }
      );

      o.observe(el);
      observers.push(o);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Mobile menu GSAP timeline
  useEffect(() => {
    if (!menuRef.current) return;
    const t = gsap.timeline({ paused: true });
    t.to(barTop.current, { rotation: 45, y: 8, duration: 0.3, ease: "power2.inOut" }, 0)
      .to(barMid.current, { opacity: 0, scaleX: 0, duration: 0.2 }, 0)
      .to(barBot.current, { rotation: -45, y: -8, duration: 0.3, ease: "power2.inOut" }, 0)
      .fromTo(
        menuRef.current,
        { clipPath: "circle(0% at calc(100% - 40px) 40px)", opacity: 0 },
        {
          clipPath: "circle(150% at calc(100% - 40px) 40px)",
          opacity: 1,
          duration: 0.6,
          ease: "power3.inOut",
        },
        0.1
      )
      .fromTo(
        linksRef.current,
        { opacity: 0, x: 50, y: 20 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          stagger: 0.07,
          duration: 0.4,
          ease: "power2.out",
        },
        0.35
      );
    tl.current = t;
    return () => {
      t.kill();
    };
  }, []);

  useEffect(() => {
    if (!tl.current) return;
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      tl.current.play();
    } else {
      document.body.style.overflow = "";
      tl.current.reverse();
    }
  }, [isMobileOpen]);

  // Navbar entrance
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
    );
  }, []);

  const close = useCallback(() => setIsMobileOpen(false), []);

  // ── DYNAMIC STYLES (PASTI HITAM/GELAP DI SECTION TERANG) ──
  const textMuted = isOnLight
    ? "text-slate-800 font-semibold hover:text-lumience-blue"
    : "text-white/70 font-medium hover:text-white";

  const textActive = isOnLight 
    ? "text-lumience-blue font-bold" 
    : "text-bright-blue font-bold";

  const logoText = isOnLight ? "text-slate-900" : "text-off-white";
  const hamburgerBg = isOnLight ? "bg-slate-900" : "bg-white";

  const navBg = isScrolled
    ? isOnLight
      ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-md shadow-slate-900/5"
      : "bg-deep-navy/80 backdrop-blur-xl border-b border-white/[0.08]"
    : "bg-transparent";

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
        style={{ opacity: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group z-10">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-lumience-blue to-bright-blue shadow-glow-blue-sm flex items-center justify-center group-hover:shadow-glow-blue transition-shadow duration-500">
                <span className="font-display text-sm sm:text-base font-extrabold text-white">
                  LM
                </span>
              </div>
              <span className="font-display text-lg sm:text-xl font-bold tracking-wide">
                <span className="gradient-text-blue">LUMI</span>
                <span className={`transition-colors duration-500 ${logoText}`}>
                  ENCE
                </span>
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-body transition-colors duration-300 rounded-lg group ${
                      isActive ? textActive : textMuted
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-lumience-blue to-bright-blue transition-all duration-300 ${
                        isActive
                          ? "w-6 opacity-100"
                          : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-50"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body font-semibold text-white bg-gradient-to-r from-lumience-blue to-bright-blue hover:shadow-glow-blue transition-all duration-500 hover:scale-[1.03]"
              >
                Hubungi Kami
              </a>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`lg:hidden z-50 flex flex-col items-center justify-center w-10 h-10 rounded-lg transition-colors duration-300 ${
                  isOnLight
                    ? "bg-slate-100 border border-slate-300"
                    : "glass"
                }`}
                aria-label="Menu"
              >
                <span
                  ref={barTop}
                  className={`block w-5 h-0.5 rounded-full transition-colors duration-300 ${hamburgerBg}`}
                />
                <span
                  ref={barMid}
                  className={`block w-5 h-0.5 rounded-full mt-1.5 transition-colors duration-300 ${hamburgerBg}`}
                />
                <span
                  ref={barBot}
                  className={`block w-5 h-0.5 rounded-full mt-1.5 transition-colors duration-300 ${hamburgerBg}`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 lg:hidden bg-deep-navy/95 backdrop-blur-2xl flex flex-col items-center justify-center"
        style={{
          clipPath: "circle(0% at calc(100% - 40px) 40px)",
          opacity: 0,
        }}
      >
        <div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, var(--color-lumience-blue), transparent 70%)",
          }}
        />
        <div className="flex flex-col items-center gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => {
                if (el) linksRef.current[i] = el;
              }}
              href={link.href}
              onClick={close}
              className={`text-3xl sm:text-4xl font-display font-bold py-3 px-6 ${
                activeSection === link.href.slice(1)
                  ? "gradient-text-blue"
                  : "text-white/60 hover:text-white"
              }`}
              style={{ opacity: 0 }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          ref={(el) => {
            if (el) linksRef.current[NAV_LINKS.length] = el;
          }}
          href="#contact"
          onClick={close}
          className="mt-10 px-8 py-3.5 rounded-xl text-lg font-body font-semibold text-white bg-gradient-to-r from-lumience-blue to-bright-blue shadow-glow-blue-sm"
          style={{ opacity: 0 }}
        >
          Hubungi Kami
        </a>
      </div>
    </>
  );
}