"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapConfig";
import GlowOrb from "./GlowOrb";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'Apa itu program "Coba Dulu, Percaya Kemudian"?',
    answer:
      "Program ini memungkinkan Anda mencoba dan menilai hasil kerja kami terlebih dahulu sebelum melakukan pembayaran penuh. Jika hasilnya sesuai ekspektasi, kerja sama berlanjut; jika belum, kami akan membenahi atau menariknya kembali tanpa membebani Anda.",
  },
  {
    question: "Berapa lama waktu pengerjaan project IT maupun Multimedia?",
    answer:
      "Durasi bervariasi tergantung kompleksitas project — landing page atau desain sederhana bisa selesai dalam hitungan hari, sementara sistem custom atau aplikasi mobile umumnya membutuhkan beberapa minggu. Estimasi detail akan kami berikan setelah konsultasi awal.",
  },
  {
    question: "Bagaimana sistem pembayaran di Lumience?",
    answer:
      'Kami menerapkan sistem pembayaran bertahap sesuai progress project, sejalan dengan konsep "coba dulu, percaya kemudian" — Anda dapat menilai hasil di setiap tahap sebelum melanjutkan ke pembayaran berikutnya.',
  },
  {
    question: "Apakah layanan bisa disesuaikan dengan kebutuhan bisnis saya?",
    answer:
      "Tentu. Setiap solusi yang kami tawarkan, baik IT maupun Multimedia, dirancang secara custom sesuai kebutuhan, skala, dan alur kerja bisnis Anda — bukan solusi satu ukuran untuk semua.",
  },
  {
    question: "Apa yang perlu saya siapkan sebelum project dimulai?",
    answer:
      "Umumnya kami membutuhkan brief kebutuhan bisnis, referensi visual (jika ada), serta materi pendukung seperti logo, foto produk, atau konten teks. Tim kami akan membantu memandu Anda menyiapkannya jika belum tersedia.",
  },
  {
    question:
      "Apakah Lumience menyediakan layanan maintenance setelah project selesai?",
    answer:
      "Ya, kami menyediakan layanan maintenance dan technical support pasca-launching sebagai salah satu layanan tambahan, agar sistem atau materi visual Anda tetap optimal dalam jangka panjang.",
  },
  {
    question: "Apakah ada garansi revisi?",
    answer:
      "Ya, setiap project mendapatkan kesempatan revisi sesuai kesepakatan di awal kerja sama, untuk memastikan hasil akhir benar-benar sesuai dengan kebutuhan Anda.",
  },
  {
    question: "Bagaimana cara memulai kerja sama dengan Lumience?",
    answer:
      "Anda bisa menghubungi kami melalui WhatsApp atau email yang tersedia di section Contact untuk menjadwalkan konsultasi awal secara gratis.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Entrance animasi ringan saat scroll masuk
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    // Hanya buka 1 item, jika diklik lagi baru tertutup
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full overflow-hidden bg-deep-navy bg-noise py-24 sm:py-28 lg:py-32"
    >
      <div className="absolute top-[15%] left-[-8%] pointer-events-none">
        <GlowOrb color="blue" size="480px" opacity={0.14} />
      </div>
      <div className="absolute bottom-[10%] right-[-6%] pointer-events-none">
        <GlowOrb color="purple" size="420px" opacity={0.1} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-bright-blue" />
            <span className="font-display text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
              FAQ
            </span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ada yang ingin{" "}
            <span className="gradient-text-blue">ditanyakan?</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-white/45 font-light">
            Klik kartu untuk melihat jawabannya. Masih bingung? Chat kami kapan
            saja.
          </p>
        </div>

        {/* Grid dengan `items-start` agar card sebelah TIDAK ikut memanjang */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() => toggleItem(index)}
                className={`relative cursor-pointer rounded-2xl p-5 sm:p-6 border backdrop-blur-xl transition-all duration-200 select-none ${
                  isOpen
                    ? "bg-white/[0.08] border-lumience-blue/40 shadow-[0_12px_32px_rgba(8,124,245,0.12)]"
                    : "bg-white/[0.04] border-white/10 hover:bg-white/[0.06] hover:border-white/18 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl pointer-events-none" />

                <div className="relative z-10 flex items-start gap-3.5">
                  {/* Badge Nomor */}
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-display text-[11px] font-bold transition-colors duration-200 ${
                      isOpen
                        ? "bg-gradient-to-br from-lumience-blue to-bright-blue text-white"
                        : "bg-white/5 border border-white/10 text-white/40"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`font-display text-[14px] sm:text-[15px] font-semibold leading-snug transition-colors duration-150 ${
                          isOpen ? "text-white" : "text-white/75"
                        }`}
                      >
                        {item.question}
                      </h3>

                      {/* Icon Plus / Silang */}
                      <span
                        className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 ${
                          isOpen
                            ? "border-bright-blue/40 bg-lumience-blue/15 text-bright-blue rotate-45"
                            : "border-white/10 bg-white/5 text-white/35 rotate-0"
                        }`}
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M7 1v12M1 7h12" strokeLinecap="round" />
                        </svg>
                      </span>
                    </div>

                    {/* GPU CSS Grid Expander (Fast & Light) */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity,margin,padding] duration-200 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mt-3.5 pt-3.5 border-t border-white/10"
                          : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t border-transparent"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-body text-sm text-white/50 font-light leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-2xl glass border border-white/10 px-6 sm:px-8 py-5">
            <p className="font-body text-sm text-white/50">
              Belum ada jawaban yang pas?
            </p>
            <a
              href="https://wa.me/6285188352614"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-deep-navy font-body text-sm font-semibold hover:bg-bright-blue hover:text-white transition-colors duration-200"
            >
              Chat WhatsApp
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
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
    </section>
  );
}