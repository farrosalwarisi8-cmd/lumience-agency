"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";

const LOCATION = {
  name: "Lumience HQ",
  address: "Harvest City, Jl. Orchid Raya A, Ragemanunggal, Setu, Bekasi Regency, West Java 17320",
  hours: "Senin – Jumat, 09.00 – 17.00 WIB",
  whatsapp: "+62 851-8835-2614",
  whatsappLink: "https://wa.me/6285188352614",
  mapsQuery: "Harvest City, Jl. Orchid Raya A, Ragemanunggal, Setu, Bekasi",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Harvest+City+Jl.+Orchid+Raya+A+Ragemanunggal+Setu+Bekasi",
  mapsEmbed:
    "https://maps.google.com/maps?q=Harvest+City,+Jl.+Orchid+Raya+A,+Ragemanunggal,+Setu,+Bekasi+Regency,+West+Java+17320&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

export default function LocationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
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

      // Map frame scale-in
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Info card slide-in from right
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Pin bounce loop
      gsap.to(pinRef.current, {
        y: -10,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="locations"
      className="relative min-h-screen w-full overflow-hidden bg-off-white py-24 sm:py-28 lg:py-32"
    >
      {/* Soft ambient blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-light-blue/50 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-light-purple/40 rounded-full blur-[100px] pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── HEADER ── */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="font-display text-xs sm:text-sm font-bold tracking-[0.25em] text-lumience-blue uppercase bg-lumience-blue/10 px-4 py-2 rounded-full border border-lumience-blue/10 inline-block mb-5">
            Lokasi Kami
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-text tracking-tight mb-4">
            Kunjungi <span className="gradient-text-blue">Lumience</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-slate-500 font-light leading-relaxed">
            Datang langsung ke basecamp kami, atau hubungi via WhatsApp untuk
            konsultasi gratis.
          </p>
        </div>

        {/* ── CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ── MAP ── */}
          <div ref={mapRef} className="lg:col-span-7 relative group">
            <div className="relative w-full h-[320px] sm:h-[420px] lg:h-full min-h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-[0_20px_60px_rgba(8,124,245,0.08)] bg-white">
              {/* Glow border accent */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-lumience-blue/30 via-transparent to-lumience-purple/20 pointer-events-none z-10 opacity-60" />

              <iframe
                title="Lokasi Lumience HQ — Harvest City, Setu, Bekasi"
                src={LOCATION.mapsEmbed}
                className="absolute inset-0 w-full h-full border-0 grayscale-[20%] contrast-[1.05] group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Floating pin badge on map */}
              <div className="absolute top-5 left-5 z-20">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg">
                  <div
                    ref={pinRef}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-lumience-blue to-bright-blue flex items-center justify-center shadow-glow-blue-sm"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <span className="font-display text-xs font-bold text-dark-text tracking-wide">
                    Lumience HQ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── INFO CARD ── */}
          <div ref={infoRef} className="lg:col-span-5 flex">
            <div className="w-full flex flex-col justify-between rounded-3xl bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-7 sm:p-9 lg:p-10 relative overflow-hidden">
              {/* Decorative corner glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-lumience-blue/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-lumience-purple/8 to-transparent rounded-tr-full pointer-events-none" />

              <div className="relative z-10">
                {/* Office name */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lumience-blue to-bright-blue flex items-center justify-center shadow-glow-blue-sm">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-xs font-bold tracking-widest text-lumience-blue uppercase">
                      Kantor Pusat
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-dark-text">
                      {LOCATION.name}
                    </h3>
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-lumience-blue/10 flex items-center justify-center text-lumience-blue">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-display text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1">
                        Alamat
                      </p>
                      <p className="font-body text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                        {LOCATION.address}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-lumience-blue/10 flex items-center justify-center text-lumience-blue">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-display text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1">
                        Jam Operasional
                      </p>
                      {/* Placeholder — bisa disesuaikan nanti */}
                      <p className="font-body text-sm sm:text-base text-slate-700 font-medium">
                        {LOCATION.hours}
                      </p>
                      <p className="font-body text-xs text-slate-400 mt-0.5">
                        Sabtu–Minggu tutup / by appointment
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-display text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-1">
                        WhatsApp
                      </p>
                      <a
                        href={LOCATION.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm sm:text-base text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                      >
                        {LOCATION.whatsapp}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="relative z-10 mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href={LOCATION.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-body font-semibold text-white bg-gradient-to-r from-lumience-blue to-bright-blue hover:shadow-glow-blue transition-all duration-400 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Buka di Google Maps
                </a>

                <a
                  href={LOCATION.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-body font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-400"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}