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

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          duration: 0.55,
          ease: "power3.inOut",
        },
        0.1
      )
      .fromTo(
        linksRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.35,
          ease: "power2.out",
        },
        0.3
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

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
    );
  }, []);

  const close = useCallback(() => setIsMobileOpen(false), []);

  // Desktop nav colors
  const textMuted = isOnLight
    ? "text-slate-800 font-semibold hover:text-lumience-blue"
    : "text-white/70 font-medium hover:text-white";
  const textActive = isOnLight
    ? "text-lumience-blue font-bold"
    : "text-bright-blue font-bold";
  const logoText = isOnLight ? "text-slate-900" : "text-off-white";
  const hamburgerBg = isOnLight ? "bg-slate-900" : "bg-white";

  const navBg = isScrolled || isMobileOpen
    ? isOnLight
      ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-md shadow-slate-900/5"
      : "bg-deep-navy/90 backdrop-blur-xl border-b border-white/[0.08]"
    : "bg-transparent";

  // Mobile menu: solid light or dark so text always readable
  const mobileMenuBg = isOnLight
    ? "bg-white"
    : "bg-deep-navy";

  const mobileLinkIdle = isOnLight
    ? "text-slate-800 hover:text-lumience-blue"
    : "text-white/70 hover:text-white";

  const mobileLinkActive = isOnLight
    ? "text-lumience-blue"
    : "text-bright-blue";

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
            <a href="#home" className="flex items-center gap-2 group z-10" onClick={close}>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-lumience-blue to-bright-blue shadow-glow-blue-sm flex items-center justify-center">
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

            {/* Desktop links */}
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

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body font-semibold text-white bg-gradient-to-r from-lumience-blue to-bright-blue hover:shadow-glow-blue transition-all duration-500 hover:scale-[1.03]"
              >
                Hubungi Kami
              </a>

              {/* Hamburger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`lg:hidden z-50 flex flex-col items-center justify-center w-10 h-10 rounded-lg transition-colors duration-300 ${
                  isOnLight
                    ? "bg-slate-100 border border-slate-300"
                    : "bg-white/10 border border-white/15"
                }`}
                aria-label="Menu"
                aria-expanded={isMobileOpen}
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

      {/* Mobile Menu — solid bg, readable text */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 lg:hidden flex flex-col items-center justify-center transition-colors duration-300 ${mobileMenuBg}`}
        style={{
          clipPath: "circle(0% at calc(100% - 40px) 40px)",
          opacity: 0,
        }}
      >
        {/* Soft decoration */}
        <div
          className={`absolute top-1/4 right-0 w-[320px] h-[320px] rounded-full blur-3xl pointer-events-none ${
            isOnLight ? "bg-lumience-blue/10" : "bg-lumience-blue/20"
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-0 w-[280px] h-[280px] rounded-full blur-3xl pointer-events-none ${
            isOnLight ? "bg-lumience-purple/10" : "bg-lumience-purple/15"
          }`}
        />

        <div className="relative z-10 flex flex-col items-center gap-1 px-6">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                ref={(el) => {
                  if (el) linksRef.current[i] = el;
                }}
                href={link.href}
                onClick={close}
                className={`text-3xl sm:text-4xl font-display font-bold py-3 px-6 transition-colors duration-200 ${
                  isActive ? mobileLinkActive : mobileLinkIdle
                }`}
                style={{ opacity: 0 }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <a
          ref={(el) => {
            if (el) linksRef.current[NAV_LINKS.length] = el;
          }}
          href="#contact"
          onClick={close}
          className="relative z-10 mt-10 px-8 py-3.5 rounded-xl text-base font-body font-semibold text-white bg-gradient-to-r from-lumience-blue to-bright-blue shadow-lg"
          style={{ opacity: 0 }}
        >
          Hubungi Kami
        </a>
      </div>
    </>
  );
}