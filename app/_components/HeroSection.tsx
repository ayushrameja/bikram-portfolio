"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

import { fadeInUp, staggerContainer } from "@/lib/animations";
import { scrollToTarget } from "@/utils/scroll";

const heroMeta = [
  {
    label: "Focus",
    value: "Analytics Engineering",
    note: "ETL, reporting systems, and data workflows that survive handoffs.",
  },
  {
    label: "Toolkit",
    value: "Python / SQL / Tableau",
    note: "Practical stack, fewer buzzwords, more shipped work.",
  },
  {
    label: "Built",
    value: "24 ETL systems",
    note: "Production pipelines and internal tooling across teams.",
  },
] as const;

export default function HeroSection() {
  const lenis = useLenis();

  return (
    <section
      id="about"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-offBlack" />
        <div className="absolute inset-0 bg-wavy-lines opacity-100" />
        <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-offBlack via-offBlack/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-offBlack via-offBlack/85 to-transparent" />

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cream falling-dot"
            style={{
              left: `${15 + i * 14}%`,
              animationDuration: `${3 + (i % 3) * 1.5}s`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full bg-radial from-mutedGold/5 via-sageGreen/5 to-transparent blur-3xl opacity-70" />
        <div className="absolute left-1/2 top-[42%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-800/60 opacity-60" />
        <div className="absolute left-1/2 top-[42%] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-900/70 opacity-70" />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        variants={staggerContainer(0.14, 0.12)}
        initial="hidden"
        animate="visible"
      >
        <div className="flex min-h-[min(44rem,calc(100svh-10rem))] flex-col justify-between">
          <motion.div
            variants={fadeInUp}
            className="grid w-full items-center gap-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
          >
            <div className="hidden rounded-sm border border-zinc-800/80 bg-offBlack/70 p-5 font-mono text-[11px] text-zinc-500 shadow-2xl backdrop-blur-md lg:block">
              <div className="mb-3 flex gap-1.5">
                <div className="h-2 w-2 rounded-sm bg-red-500/50" />
                <div className="h-2 w-2 rounded-sm bg-amber-500/50" />
                <div className="h-2 w-2 rounded-sm bg-emerald-500/50" />
              </div>
              <div className="space-y-1">
                <p>
                  <span className="text-mutedGold">SELECT</span> skill, expertise{" "}
                  <span className="text-mutedGold">FROM</span> bikram_portfolio
                </p>
                <p>
                  <span className="text-mutedGold">WHERE</span> tool{" "}
                  <span className="text-sageGreen">IN</span>{" "}
                  <span className="text-zinc-400">
                    {"('Python', 'SQL', 'Tableau')"}
                  </span>
                </p>
                <p className="mt-2 text-zinc-600">
                  {"//"} Record found. Status: Expert.
                </p>
              </div>
            </div>

            <div className="group relative mx-auto">
              <div className="absolute -inset-8 rounded-full bg-linear-to-b from-mutedGold/30 to-sageGreen/20 opacity-60 blur-3xl transition duration-700 group-hover:opacity-100" />
              <div className="absolute inset-[-14px] rounded-full border border-zinc-800/80" />
              <div className="absolute inset-[-28px] rounded-full border border-zinc-900/70" />

              <div className="relative h-44 w-44 overflow-hidden rounded-full shadow-2xl ring-1 ring-cream/20 sm:h-52 sm:w-52 lg:h-56 lg:w-56">
                <Image
                  src="/assets/image/bikram.jpeg"
                  alt="Bikramdeep Singh"
                  fill
                  priority
                  className="object-cover transition duration-1000 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-mutedGold/5 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />
              </div>
            </div>

            <div className="hidden justify-self-end rounded-sm border border-zinc-800/80 bg-offBlack/70 p-4 shadow-2xl backdrop-blur-md lg:block lg:min-w-[176px]">
              <div className="text-[9px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                ETL Pipelines Built
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-editorial text-4xl text-cream">24</span>
                <span className="text-sm font-semibold text-sageGreen">sys</span>
              </div>
              <div className="relative mt-3 h-1 w-full overflow-hidden rounded-sm bg-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.6, ease: "easeOut", delay: 0.5 }}
                  className="absolute inset-y-0 left-0 bg-linear-to-r from-mutedGold to-sageGreen"
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 w-full text-center lg:mt-14">
            <h1 className="font-editorial text-5xl leading-[0.96] font-bold tracking-tight text-cream sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              Bikramdeep Singh
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg font-light leading-relaxed text-cream/70 sm:text-2xl">
              Data Analyst & Engineer transforming complex data into singular,
              elegant solutions based in{" "}
              <span className="relative inline-block whitespace-nowrap pb-2 text-cream">
                Toronto, ON
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 14"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -bottom-[0.05em] left-0 h-[0.55em] w-full rotate-[-1deg] text-mutedGold/80"
                >
                  <path
                    d="M2 8 C10 13, 15 3, 23 8 S35 12, 42 8 S54 3, 62 8 S74 12, 82 8 S94 2, 103 8 S112 12, 118 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M1 10 C8 14, 15 6, 22 10 S35 14, 43 10 S55 6, 63 10 S75 14, 84 10 S97 5, 106 10 S114 13, 119 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.65"
                  />
                </svg>
              </span>
              .
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => scrollToTarget("projects", lenis as any)}
                className="hero-cta hero-cta-primary inline-flex w-full max-w-sm cursor-pointer items-center justify-center rounded-sm px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase sm:w-auto sm:px-10"
              >
                <span className="relative z-10">Selected Work</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToTarget("contact", lenis as any)}
                className="hero-cta hero-cta-secondary inline-flex w-full max-w-sm cursor-pointer items-center justify-center rounded-sm px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase sm:w-auto sm:px-10"
              >
                <span className="relative z-10">Get in touch</span>
              </button>
            </div>

            <Link
              href="/resume"
              className="hero-cta hero-cta-tertiary mt-3 inline-flex w-full max-w-sm items-center justify-center rounded-sm px-8 py-3 text-[11px] font-semibold tracking-[0.18em] uppercase sm:hidden"
            >
              <span className="relative z-10">Open Resume</span>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 grid w-full gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3"
          >
            {heroMeta.map((item) => (
              <div
                key={item.label}
                className="rounded-sm border border-zinc-800/80 bg-zinc-950/35 p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,227,0.02)] backdrop-blur-sm"
              >
                <p className="text-[9px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-medium text-cream sm:text-[15px]">
                  {item.value}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {item.note}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 opacity-40 md:flex"
      >
        <span className="text-[9px] font-semibold tracking-[0.3em] text-cream uppercase">
          Scroll
        </span>
        <div className="h-12 w-px bg-linear-to-b from-cream to-transparent opacity-30" />
      </motion.div>
    </section>
  );
}
