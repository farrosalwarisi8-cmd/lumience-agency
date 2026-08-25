"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Entrance + gentle float
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
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
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Soft continuous float (alternate direction)
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          y: i % 2 === 0 ? -6 : 6,
          duration: 2.8 + (i % 3) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.15,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = useCallback(
    (index: number) => {
      const prev = openIndex;

      if (prev !== null && answerRefs.current[prev]) {
        gsap.to(answerRefs.current[prev], {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power2.inOut",
        });
        gsap.to(iconRefs.current[prev], {
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
        if (cardsRef.current[prev]) {
          gsap.to(cardsRef.current[prev], {
            borderColor: "rgba(255,255,255,0.1)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
            duration: 0.35,
          });
        }
      }

      if (prev === index) {
        setOpenIndex(null);
        return;
      }

      setOpenIndex(index);

      const el = answerRefs.current[index];
      if (el) {
        gsap.set(el, { height: "auto" });
        const h = el.offsetHeight;
        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          { height: h, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }

      gsap.to(iconRefs.current[index], {
        rotation: 45,
        duration: 0.3,
        ease: "power2.out",
      });

      if (cardsRef.current[index]) {
        gsap.to(cardsRef.current[index], {
          borderColor: "rgba(8,124,245,0.45)",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.35), 0 0 40px rgba(8,124,245,0.18)",
          duration: 0.4,
        });
      }
    },
    [openIndex]
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full overflow-hidden bg-deep-navy bg-noise py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient glow */}
      <div className="absolute top-[15%] left-[-8%] pointer-events-none">
        <GlowOrb color="blue" size="520px" opacity={0.18} />
      </div>
      <div className="absolute bottom-[10%] right-[-6%] pointer-events-none">
        <GlowOrb color="purple" size="480px" opacity={0.14} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-bright-blue animate-pulse" />
            <span className="font-display text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
              FAQ
            </span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ada yang ingin{" "}
            <span className="gradient-text-blue">ditanyakan?</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-white/45 font-light">
            Klik kartu untuk melihat jawabannya. Masih bingung? Chat kami kapan saja.
          </p>
        </div>

        {/* Floating cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() => toggleItem(index)}
                className={`group relative cursor-pointer rounded-3xl p-6 sm:p-7 border backdrop-blur-2xl transition-colors duration-300 ${
                  isOpen
                    ? "bg-white/[0.08] border-lumience-blue/40"
                    : "bg-white/[0.04] border-white/10 hover:bg-white/[0.07] hover:border-white/20"
                }`}
                style={{
                  boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                  willChange: "transform",
                }}
              >
                {/* Soft top highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-t-3xl pointer-events-none" />

                {/* Corner glow when open */}
                {isOpen && (
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-lumience-blue/20 blur-3xl pointer-events-none" />
                )}

                <div className="relative z-10 flex items-start gap-4">
                  {/* Index badge */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-display text-xs font-bold transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-lumience-blue to-bright-blue text-white shadow-glow-blue-sm"
                        : "bg-white/5 border border-white/10 text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`font-display text-[15px] sm:text-base font-semibold leading-snug transition-colors duration-200 ${
                          isOpen
                            ? "text-white"
                            : "text-white/75 group-hover:text-white"
                        }`}
                      >
                        {item.question}
                      </h3>

                      <span
                        ref={(el) => {
                          iconRefs.current[index] = el;
                        }}
                        className={`flex-shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center border transition-colors duration-200 ${
                          isOpen
                            ? "border-bright-blue/40 bg-lumience-blue/15 text-bright-blue"
                            : "border-white/10 bg-white/5 text-white/35 group-hover:text-white/60"
                        }`}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M7 1v12M1 7h12" strokeLinecap="round" />
                        </svg>
                      </span>
                    </div>

                    {/* Answer expand */}
                    <div
                      ref={(el) => {
                        answerRefs.current[index] = el;
                      }}
                      className="overflow-hidden"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <p className="font-body text-sm text-white/50 font-light leading-relaxed pt-4 mt-4 border-t border-white/10">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-3xl glass border border-white/10 px-6 sm:px-8 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <p className="font-body text-sm text-white/50">
              Belum ada jawaban yang pas?
            </p>
            <a
              href="https://wa.me/6285188352614"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-deep-navy font-body text-sm font-semibold hover:bg-bright-blue hover:text-white transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-glow-blue"
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