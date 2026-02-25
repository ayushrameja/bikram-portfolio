"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

import { fadeInUp, staggerContainer } from "@/lib/animations";
import { scrollToTarget } from "@/utils/scroll";

export default function HeroSection() {
  const lenis = useLenis();

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 sm:py-20 lg:py-14 xl:py-20 [@media(max-height:820px)]:py-12"
    >
      {/* Deep Off-Black Background with Wavy Lines and Falling Dots */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-offBlack" />
        <div className="absolute inset-0 bg-wavy-lines opacity-100" />
        
        {/* Falling Bright Dots */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cream falling-dot"
            style={{
              left: `${15 + i * 14}%`,
              animationDuration: `${3 + (i % 3) * 1.5}s`,
              animationDelay: `${i * 0.7}s`
            }}
          />
        ))}

        {/* Deep, vast radial ambient glow to give depth to the wavy lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full bg-radial from-mutedGold/5 via-sageGreen/5 to-transparent blur-3xl opacity-70" />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        variants={staggerContainer()}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center text-center">
          
          {/* Increased Size Profile Portrait */}
          <motion.div variants={fadeInUp} className="group relative mb-6 sm:mb-8 [@media(max-height:820px)]:mb-4">
            {/* Hover Glow */}
            <div className="absolute -inset-4 rounded-full bg-linear-to-b from-mutedGold/40 to-sageGreen/30 opacity-0 blur-2xl transition duration-700 group-hover:opacity-100" />
            
            <div className="relative h-36 w-36 overflow-hidden rounded-full shadow-atmos-soft ring-1 ring-cream/20 sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-56 lg:w-56 xl:h-64 xl:w-64 [@media(max-height:820px)]:h-32 [@media(max-height:820px)]:w-32">
              <Image
                src="/assets/image/bikram.jpeg"
                alt="Bikramdeep Singh"
                fill
                priority
                className="object-cover transition duration-1000 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-mutedGold/5 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />
            </div>
          </motion.div>

          {/* Editorial Typography */}
          <motion.div variants={fadeInUp} className="relative w-full">
            <h1 className="font-editorial text-4xl leading-[0.95] font-bold tracking-tight text-cream sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6.2rem] 2xl:text-[7.2rem] [@media(max-height:820px)]:text-4xl [@media(max-height:820px)]:sm:text-5xl [@media(max-height:820px)]:md:text-6xl [@media(max-height:820px)]:lg:text-[4.6rem]">
              Bikramdeep Singh
            </h1>
            
            <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-cream/70 sm:mt-6 sm:text-xl lg:max-w-3xl xl:text-2xl [@media(max-height:820px)]:mt-3 [@media(max-height:820px)]:text-base [@media(max-height:820px)]:sm:text-lg [@media(max-height:820px)]:lg:text-xl">
              Data Analyst & Engineer transforming complex data into singular, elegant solutions based in <span className="text-cream">Toronto, ON</span>.
            </p>

            {/* Sharp, Complex Animated Action Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4 lg:mt-12 lg:gap-6 [@media(max-height:820px)]:mt-5">
              <button
                type="button"
                onClick={() => scrollToTarget("projects", lenis as any)}
                className="btn-modern btn-primary inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] sm:w-auto sm:px-9 sm:py-4 sm:text-xs uppercase shadow-atmos-soft"
              >
                Experience
              </button>

              <Link
                href="/resume"
                className="btn-modern btn-secondary inline-flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-sm px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] backdrop-blur-md sm:w-auto sm:px-9 sm:py-4 sm:text-xs uppercase shadow-atmos-soft"
              >
                <span>Resume</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </Link>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* FLOATING UI DATA FILLERS */}
      
      {/* Floating Query Snippet - Top Left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="pointer-events-none absolute left-[5%] xl:left-[8%] top-[12%] hidden xl:block [@media(max-height:860px)]:hidden"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-sm border border-zinc-800 bg-offBlack/90 p-5 font-mono text-[11px] text-zinc-500 shadow-2xl backdrop-blur-md"
        >
          <div className="flex gap-1.5 mb-3">
            <div className="h-2 w-2 rounded-sm bg-red-500/50"></div>
            <div className="h-2 w-2 rounded-sm bg-amber-500/50"></div>
            <div className="h-2 w-2 rounded-sm bg-emerald-500/50"></div>
          </div>
          <div className="space-y-1">
            <p><span className="text-mutedGold">SELECT</span> skill, expertise <span className="text-mutedGold">FROM</span> bikram_portfolio</p>
            <p><span className="text-mutedGold">WHERE</span> tool <span className="text-sageGreen">IN</span> <span className="text-zinc-400">('Python', 'SQL', 'Tableau')</span></p>
            <p className="text-zinc-600 mt-2">{'//'} Record found. Status: Expert.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Interests - Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="pointer-events-none absolute right-[5%] xl:right-[8%] top-[68%] hidden xl:block [@media(max-height:860px)]:hidden"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="flex min-w-[154px] flex-col gap-2 rounded-sm border border-zinc-800 bg-offBlack/90 p-3 shadow-atmos-soft backdrop-blur-md"
        >
           <div className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.22em]">Interests</div>
           <div className="space-y-1.5">
              <div className="flex items-center justify-between rounded-sm border border-zinc-800/80 bg-zinc-900/40 px-2.5 py-1.5">
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cream/80">Gaming</span>
                <span className="text-[10px] font-mono text-sageGreen">FPS</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-zinc-800/80 bg-zinc-900/40 px-2.5 py-1.5">
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cream/80">Cricket</span>
                <span className="text-[10px] font-mono text-mutedGold">Stats</span>
              </div>
           </div>
        </motion.div>
      </motion.div>
      
      {/* Minimal Scroll Indicator */}
      <motion.div variants={fadeInUp} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 opacity-50 [@media(max-height:820px)]:bottom-5 [@media(max-height:820px)]:hidden">
         <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-cream">Scroll</span>
         <div className="h-12 w-px bg-linear-to-b from-cream to-transparent opacity-30"></div>
      </motion.div>
    </section>
  );
}
