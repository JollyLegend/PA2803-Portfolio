/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Tv, 
  Music, 
  Sparkles,
  Play,
  Image as ImageIcon,
  Printer,
  ChevronDown,
  ExternalLink,
  BookOpen,
  ShieldAlert,
  Settings,
  Users,
  Share2,
  Clock
} from "lucide-react";

// --- DATA ---

const GALLERY_IMAGES = [
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Cheer.jpg", caption: "The Cheer" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Fight.jpg", caption: "The Fight" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Injection.jpg", caption: "The Injection" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Podcast.jpg", caption: "The Alpha Podcast" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Shook.jpg", caption: "Shock and Awe" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Song.jpg", caption: "A Musical Interlude" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Summoning.jpg", caption: "The Summoning" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/USA.jpg", caption: "The Patriot" },
];

const TEAM = [
  { 
    name: "Ishaan", 
    color: "bg-lump-pink", 
    image: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/refs/heads/main/Crew/Ishaan.jpg"
  },
  { 
    name: "Calvin", 
    color: "bg-lump-blue", 
    image: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/420954d499707ed278b5855f878e251d6f62231f/Crew/Calvin.jpg" 
  },
  { 
    name: "Hayden", 
    color: "bg-lump-orange", 
    image: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/d0a49d1b74e8be88bfe74114b0e152f9161c724f/Crew/Hayden.jpg" 
  },
  { 
    name: "Jonathan", 
    color: "bg-lump-green", 
    image: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/refs/heads/main/Crew/Jonathan.jpg" 
  },
];

const RISKS = [
  {
    id: "R1",
    title: "THE LIFT",
    description: "Ishaan lifting Calvin aggressively prior to the injection sequence.",
    harm: "Ishaan & Calvin. Strains, hernia, head bumps, fractures if dropped.",
    score: "RS: 12 (L:3, S:4)",
    controls: "Walked through and rehearsed at half-speed before every performance. Ishaan uses proper lifting form. Calvin maintains tight core tension. Both actors wear barefoot footwear.",
    target: "RS: 3 (L:1, S:3)",
    status: "high"
  },
  {
    id: "R2",
    title: "SLIP HAZARD",
    description: "Use of cereal to represent raw meat crushed/dropped.",
    harm: "Cast. Slipping leading to pulled muscles, bruising, or sprains.",
    score: "RS: 8 (L:4, S:2)",
    controls: "Limit cereal amount used to bare minimum. Crushed downstage area away from paths. Immediate sweep/clear debris during transitions/strike.",
    target: "RS: 4 (L:2, S:2)",
    status: "medium"
  },
  {
    id: "R3",
    title: "CHANGES",
    description: "Tripping over clothing, racks, or crates in the 8x8m playground.",
    harm: "Cast. Tripping resulting in blisters, abrasions, bruising, or sprained ankles.",
    score: "RS: 9 (L:3, S:3)",
    controls: "Designated rehearsed safe zones for discarded costumes. Clothing racks must have wheels locked. Prop crates clearly labeled and placed securely at perimeter.",
    target: "RS: 4 (L:2, S:2)",
    status: "medium"
  },
  {
    id: "R4",
    title: "PHYSICAL COMEDY",
    description: "Drops and collisions during Trump glitch / interruptions.",
    harm: "Cast. Head bumps, joint injuries, or heavy bruising.",
    score: "RS: 9 (L:3, S:3)",
    controls: "Strictly block all falls to ensure safe landing techniques (absorbing impact). Establish clear spatial awareness and eye-contact cues. Falls kept slow during rehearsal to prepare for slips.",
    target: "RS: 3 (L:1, S:3)",
    status: "medium"
  },
  {
    id: "R5",
    title: "MANUAL HANDLING",
    description: "Moving heavy boxes during rapid set-up and strike.",
    harm: "Cast. Pulled muscles, strained back muscles, hernia, or dropped items on toes.",
    score: "RS: 6 (L:3, S:2)",
    controls: "All actors utilise safe lifting techniques. Heavy crates/blocks team-lifted if necessary.",
    target: "RS: 2 (L:1, S:2)",
    status: "medium"
  }
];

// --- COMPONENTS ---

const CinemaWindow = ({ title, image, label, color = "text-lump-pink" }: { title: string, image: string, label: string, color?: string }) => (
  <div className="border-8 border-lump-black rounded-[2.5rem] overflow-hidden shadow-[15px_15px_0_rgba(0,0,0,1)] bg-lump-black group print-no-break">
    {/* macOS Style Bar */}
    <div className="bg-[#1a1a1a] p-4 sm:p-5 flex items-center justify-between border-b-4 border-lump-black">
      <div className="flex gap-2 sm:gap-3">
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#27c93f]" />
      </div>
      <div className="font-heading text-white text-sm sm:text-2xl uppercase tracking-wider truncate px-4">
        HUMP LUMP CINEMA: {title}
      </div>
      <div className="hidden sm:block w-20" /> {/* Spacer */}
    </div>
    
    {/* Video Content */}
    <div className="relative aspect-video overflow-hidden">
      <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={title} />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
        <div className="bg-lump-pink p-5 sm:p-8 rounded-full border-4 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)] group-hover:scale-110 group-hover:bg-lump-blue transition-all duration-300">
          <Play className="w-10 h-10 sm:w-16 sm:h-16 text-white fill-white" />
        </div>
      </div>
      
      {/* YouTube Mock UI */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 no-print">
        <div className="flex items-center gap-3 sm:gap-6">
           <div className="bg-white/20 backdrop-blur-md p-2 sm:p-4 rounded-full hover:bg-white/40 transition-colors cursor-pointer border-2 border-white/20">
              <Share2 className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
           </div>
           <div className="bg-white/20 backdrop-blur-md p-2 sm:p-4 rounded-full hover:bg-white/40 transition-colors cursor-pointer border-2 border-white/20">
              <Clock className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
           </div>
        </div>
        <div className="group/btn bg-white/10 backdrop-blur-md px-4 py-2 sm:px-8 sm:py-3 rounded-full font-heading text-white text-base sm:text-2xl flex items-center gap-2 sm:gap-4 border-2 border-white/20 hover:bg-white/30 transition-all cursor-pointer">
           Watch on <span className="px-2 py-0.5 bg-red-600 rounded-sm sm:rounded-md text-sm sm:text-xl font-black">YouTube</span>
        </div>
      </div>
    </div>
    
    {/* Bottom Label Bar */}
    <div className="bg-lump-black p-4 sm:p-7 text-center border-t-4 border-lump-black group-hover:bg-zinc-900 transition-colors">
       <span className={`font-heading text-2xl sm:text-5xl uppercase italic tracking-tighter ${color}`}>{label}</span>
    </div>
  </div>
);

export default function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-lump-yellow text-lump-black font-sans selection:bg-lump-pink selection:text-white print:bg-white print:p-0">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 print:max-w-none print:px-0 print:py-0">
        
        {/* PAGE 1: COVER */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center text-center space-y-12 sm:space-y-20 border-8 border-lump-black p-8 sm:p-16 rounded-[3rem] shadow-[20px_20px_0_rgba(0,0,0,1)] bg-lump-yellow relative overflow-hidden print:shadow-none print:rounded-none print:border-none print:min-h-screen print:justify-start print:pt-40">
          <div className="absolute inset-0 sunburst-bg opacity-30 z-0 scale-150 animate-[spin_120s_linear_infinite] no-print" />
          
          <div className="relative z-10 w-full">
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex justify-center mb-12 sm:mb-20"
            >
              <div className="flex items-center gap-0 font-heading font-black text-6xl sm:text-9xl drop-shadow-[0_4px_0_rgba(0,0,0,1)] sm:drop-shadow-[0_8px_0_rgba(0,0,0,1)]">
                <span className="text-lump-pink -rotate-3 transition-transform hover:rotate-0">HUMP</span>
                <span className="text-lump-blue rotate-3 transition-transform hover:rotate-0">LUMP</span>
              </div>
            </motion.div>

            <div className="space-y-8 sm:space-y-12">
              <h1 className="font-heading font-black text-5xl sm:text-8xl leading-tight uppercase">
                MODULE PA2803:<br />
                DEVISING PORTFOLIO
              </h1>
              
              <div className="space-y-4 sm:space-y-6">
                <p className="font-comic text-3xl sm:text-5xl font-bold bg-white border-4 border-lump-black inline-block px-8 py-2 rounded-2xl rotate-1 shadow-[8px_8px_0_rgba(0,0,0,1)] print:shadow-none">
                  6, Maybe 7 Skits
                </p>
                <div className="flex flex-col gap-2 pt-8 sm:pt-12">
                  <p className="font-comic text-2xl sm:text-4xl">Presented by <span className="font-bold underline decoration-lump-pink underline-offset-4">Ishaan Jolly</span></p>
                  <p className="font-comic text-2xl sm:text-4xl text-lump-orange font-black">Company: Hump Lump</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 no-print">
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-12 h-12 opacity-50" />
            </motion.div>
          </div>
        </section>

        {/* PAGE 2: DIGITAL PORTFOLIO & MEDIA LINKS */}
        <section className="print-page-break mt-16 sm:mt-32 space-y-12 sm:space-y-20">
          <div className="text-center">
            <h2 className="font-heading font-black text-4xl sm:text-7xl uppercase inline-block border-b-8 border-lump-blue pb-4">
              DIGITAL PORTFOLIO & MEDIA LINKS
            </h2>
            <p className="font-comic text-xl sm:text-3xl mt-6 italic opacity-70">
              Click the images below to view our live digital assets, trailers, and proof of concept.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:gap-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
               <CinemaWindow 
                 title="PROOF OF CONCEPT" 
                 image={GALLERY_IMAGES[2].url} 
                 label="▶ PROOF OF CONCEPT" 
                 color="text-lump-blue"
               />
               <CinemaWindow 
                 title="THE TRAILER" 
                 image={GALLERY_IMAGES[5].url} 
                 label="🎬 OFFICIAL TRAILER" 
                 color="text-lump-pink"
               />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              {[
                { label: "HUMPLUMP.COM", image: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/79587e325c8e2940e0167d85e85c7e3434d46068/Misc/Website%20Thumbnail.jpg", icon: <ExternalLink />, color: "bg-lump-orange" },
                { label: "@HUMP.LUMP", image: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/79587e325c8e2940e0167d85e85c7e3434d46068/Misc/Instagram%20Thumbnail.jpg", icon: <Users />, color: "bg-lump-green" }
              ].map((link, i) => (
                <div key={i} className="group relative border-6 border-lump-black rounded-[2rem] overflow-hidden shadow-[10px_10px_0_rgba(0,0,0,1)] bg-white aspect-[4/3] print:shadow-none print-no-break">
                  <img src={link.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute bottom-0 left-0 w-full ${link.color} border-t-6 border-lump-black p-4 sm:p-6 flex items-center justify-center gap-4`}>
                    {link.icon}
                    <span className="font-heading text-2xl sm:text-4xl text-lump-black">{link.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAGE 3: THE CREW */}
        <section className="print-page-break mt-16 sm:mt-32 border-8 border-lump-black rounded-[3rem] p-8 sm:p-16 bg-white shadow-[15px_15px_0_rgba(255,204,0,1)] print:shadow-none print:border-none print:p-0">
          <h2 className="font-heading font-black text-5xl sm:text-9xl text-center mb-12 sm:mb-24 uppercase drop-shadow-[4px_4px_0_#ffcc00]">
            THE CREW
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {TEAM.map((member, i) => (
              <div key={i} className="space-y-4 sm:space-y-6 print-no-break">
                <div className={`aspect-[3/4] border-6 border-lump-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-[6px_6px_0_rgba(0,0,0,1)] ${member.color} print:shadow-none`}>
                  <img src={member.image} className="w-full h-full object-cover" />
                </div>
                <div className={`${member.color} p-3 sm:p-4 border-4 border-lump-black rounded-xl text-center shadow-[4px_4px_0_rgba(0,0,0,1)] print:shadow-none`}>
                  <p className="font-heading text-xl sm:text-3xl uppercase">{member.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PAGE 4: INTRODUCTION & PART 1 */}
        <div className="print-page-break mt-16 sm:mt-32 space-y-16 sm:space-y-32">
          
          <section className="bg-lump-black text-white p-8 sm:p-16 rounded-[2.5rem] border-8 border-lump-pink shadow-[15px_15px_0_rgba(255,75,179,1)] print:shadow-none print-no-break">
             <div className="flex justify-between items-start mb-8 sm:mb-12">
               <h2 className="font-heading font-black text-4xl sm:text-7xl uppercase text-white">INTRODUCTION</h2>
               <span className="font-comic text-xl sm:text-3xl text-lump-pink font-bold">PORTFOLIO</span>
             </div>
             <div className="font-comic text-lg sm:text-2xl leading-relaxed space-y-6 sm:space-y-8 opacity-90">
               <p>
                 This portfolio documents the culmination of my training in PA2803 at the University of Winchester, tracing the evolution of my devising practice across two semesters. It charts a critical journey from the initial challenges of site-specific improvisation in <span className="italic text-lump-blue">The Strange Undoing of Prudencia Hart</span> to the formation of Hump Lump, a dedicated devised theatre company.
               </p>
               <p>
                 By synthesizing academic theory with rigorous practical exploration, this document outlines how I transformed critical feedback regarding dramaturgical focus into a deliberate, physical methodology rooted in Rough Theatre, clowning, and political satire.
               </p>
               <p>
                 To establish our professional parameters and artistic intentions, <span className="font-bold text-lump-pink">Part 1</span> contains the official pitch document for our company's debut production. This serves as the foundational manifesto for our devising process, while <span className="font-bold text-lump-pink">Part 5</span> contains a visual gallery demonstrating our aesthetic.
               </p>
             </div>
          </section>

          <section className="print-page-break border-12 border-lump-black bg-white rounded-[4rem] p-8 sm:p-20 shadow-[20px_20px_0_rgba(0,0,0,1)] relative overflow-hidden print:shadow-none">
            <div className="absolute top-10 right-10 flex items-center gap-4 font-heading text-xl sm:text-3xl no-print">
              <span className="text-lump-pink">PART 1: THE PITCH</span>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-8 sm:space-y-12">
               <div className="flex items-center gap-0 font-heading font-black text-4xl sm:text-7xl mb-4">
                  <span className="text-lump-pink">HUMP</span>
                  <span className="text-lump-blue">LUMP</span>
               </div>
               <h2 className="font-heading font-black text-5xl sm:text-9xl uppercase leading-none">6 OR 7 SKITS</h2>
               <div className="bg-lump-black text-white px-8 py-4 sm:px-12 sm:py-6 rounded-full inline-block rotate-1">
                  <p className="font-comic text-xl sm:text-3xl italic tracking-tight">"Six, maybe seven, clown-fed collisions with the absurdity of the modern world."</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 mt-16 sm:mt-24 items-start">
              <div className="space-y-10 sm:space-y-16">
                 <div className="border-6 border-lump-black p-6 sm:p-10 rounded-[2rem] bg-lump-pink/5 print:break-inside-avoid">
                    <h3 className="font-heading text-3xl sm:text-5xl text-lump-pink mb-6 uppercase">MISSION STATEMENT</h3>
                    <p className="font-comic text-lg sm:text-2xl leading-snug">
                      Hump Lump creates bold, playful and politically aware theatre that confronts the absurdity of contemporary politics, society and pop culture. Through clowning, satire, rough theatre and direct audience engagement, we aim to break through modern numbness and invite audiences to laugh, question and think again.
                    </p>
                 </div>
                 <div className="border-6 border-lump-black p-6 sm:p-10 rounded-[2rem] bg-lump-blue text-white print:break-inside-avoid">
                    <h3 className="font-heading text-3xl sm:text-5xl mb-6 uppercase text-lump-black">MARKETING BLURB</h3>
                    <p className="font-comic text-lg sm:text-2xl leading-snug">
                      Feeling numb to the chaos of the world? 6 or 7 Skits throws politics, pop culture and modern masculinity into a clown-filled playground of satire. Through verbatim, puppetry, absurdism, music and audience interaction, Hump Lump turns real events into ridiculous, uncomfortable and strangely recognisable theatre.
                    </p>
                 </div>
              </div>

              <div className="space-y-10 sm:space-y-16">
                 <div className="border-6 border-lump-black p-6 sm:p-10 rounded-[2rem] bg-lump-orange/10 print:break-inside-avoid">
                    <h3 className="font-heading text-2xl sm:text-4xl text-lump-orange mb-6 uppercase">STYLE & THEMES</h3>
                    <p className="font-comic text-lg sm:text-2xl leading-snug">
                       The company's style combines clowning, rough theatre, verbatim material, puppetry, absurdism, repetition and musicality. Costume changes happen in view, and the fourth wall is broken.
                    </p>
                    <p className="font-comic text-lg sm:text-2xl leading-snug mt-6">
                       Thematically, the work is connected through masculinity. As four male performers, the company uses satire to question the performance of male power, authority, ego, and fragility.
                    </p>
                 </div>
                 <div className="print:hidden">
                    <CinemaWindow 
                      title="THE PITCH" 
                      image={GALLERY_IMAGES[4].url} 
                      label="WATCH CINEMA"
                    />
                 </div>
              </div>
            </div>

            <div className="mt-16 sm:mt-24 border-6 border-lump-black p-8 sm:p-12 rounded-[2.5rem] bg-white print-no-break">
               <h3 className="font-heading text-3xl sm:text-6xl text-lump-orange mb-8 uppercase text-center sm:text-left underline underline-offset-8">PROJECT SYNOPSIS</h3>
               <div className="font-comic text-lg sm:text-2xl leading-relaxed space-y-6 sm:space-y-8">
                  <p>
                    <span className="font-black italic">6 or 7 Skits</span> is a political and social satire created by Hump Lump, a devised theatre company exploring how world events can be reimagined through clowning, rough theatre and absurd performance. The piece is structured as a non-linear sketch show made up of six, maybe seven, short skits. Each skit responds to a real-life event, using satire to expose contradictions and discomfort.
                  </p>
                  <p>
                    The performance is framed as a "play within a play," where literal clowns enter a theatrical playground to act out real-world figures, public narratives and media events. Rather than presenting these stories through realism, Hump Lump uses exaggeration, disruption and play to make familiar events feel strange again. This allows the audience to encounter subjects they may already feel desensitised to, but from a new and uncomfortable angle.
                  </p>
               </div>
            </div>
          </section>
        </div>

        {/* PAGE 5: TECHNICAL & RISK ASSESSMENT */}
        <section className="print-page-break mt-16 sm:mt-32 space-y-12 sm:space-y-20">
          <div className="text-center">
             <h2 className="font-heading font-black text-5xl sm:text-8xl p-4 bg-lump-black text-white inline-block uppercase rotate-1">TECHNICAL SPECS</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
            {[
              { label: "SHOW DURATION", value: "45 Minutes", color: "bg-lump-pink" },
              { label: "SET UP / STRIKE", value: "20 Minutes Each", color: "bg-lump-blue" },
              { label: "COMPANY SIZE", value: "4 Performers", color: "bg-lump-green" },
              { label: "HOST FEES", value: "clowns@humplump.com", color: "bg-lump-orange" },
              { label: "SPACE REQUIRED", value: "8m x 8m x 4m", color: "bg-white" },
              { label: "PARKING REQUIRED", value: "Space for 1 van", color: "bg-white" },
              { label: "ACCESS NEEDS", value: "None", color: "bg-white" },
              { label: "TECH REQUIREMENTS", value: "Fully Self-Sufficient", color: "bg-lump-pink text-white" }
            ].map((spec, i) => (
              <div key={i} className={`${spec.color} border-4 border-lump-black p-4 sm:p-6 rounded-2xl shadow-[6px_6px_0_rgba(0,0,0,1)] print:shadow-none print-no-break`}>
                <h4 className="font-heading text-lg sm:text-2xl mb-2 sm:mb-4 uppercase opacity-60">{spec.label}</h4>
                <p className="font-comic text-xl sm:text-3xl font-black break-words">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 sm:mt-32 border-8 border-lump-black rounded-[3rem] overflow-hidden bg-white shadow-[15px_15px_0_rgba(0,0,0,1)] print:shadow-none">
            <div className="bg-lump-yellow p-6 sm:p-10 border-b-8 border-lump-black text-center">
               <h2 className="font-heading font-black text-4xl sm:text-7xl uppercase">Performance Risk Assessment</h2>
            </div>
            <div className="p-4 sm:p-10">
              <div className="flex flex-wrap gap-4 mb-10 sm:mb-16">
                 <div className="flex items-center gap-3 bg-red-500 text-white px-4 py-2 font-heading rounded-lg">HIGH (RS 11-25)</div>
                 <div className="flex items-center gap-3 bg-orange-500 text-white px-4 py-2 font-heading rounded-lg">MEDIUM (RS 6-10)</div>
                 <div className="flex items-center gap-3 bg-green-500 text-white px-4 py-2 font-heading rounded-lg">LOW (RS 1-5)</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                     <tr className="bg-lump-black text-white text-left font-heading text-lg sm:text-2xl uppercase">
                        <th className="p-4 sm:p-6 border-2 border-lump-black">HAZARD / ACTIVITY</th>
                        <th className="p-4 sm:p-6 border-2 border-lump-black">PERSONS AT RISK & HARM</th>
                        <th className="p-4 sm:p-6 border-2 border-lump-black">CONTROL MEASURES</th>
                        <th className="p-4 sm:p-6 border-2 border-lump-black">TARGET RS</th>
                     </tr>
                  </thead>
                  <tbody className="font-comic text-base sm:text-xl">
                    {RISKS.map((risk, i) => (
                      <tr key={i} className="border-b-4 border-lump-black group hover:bg-gray-50 transition-colors print-no-break">
                        <td className="p-4 sm:p-6 border-2 border-lump-black align-top font-bold text-lump-pink">
                           {risk.id}: {risk.title}
                           <p className="text-lump-black font-normal mt-2 opacity-70">{risk.description}</p>
                        </td>
                        <td className="p-4 sm:p-6 border-2 border-lump-black align-top">
                           {risk.harm}
                           <p className="mt-4 font-heading text-red-600 text-sm">{risk.score}</p>
                        </td>
                        <td className="p-4 sm:p-6 border-2 border-lump-black align-top opacity-80 leading-snug">
                           {risk.controls}
                        </td>
                        <td className="p-4 sm:p-6 border-2 border-lump-black align-top text-center">
                           <div className="bg-green-500 text-white font-heading px-3 py-2 rounded-lg text-lg sm:text-2xl">
                              {risk.target}
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </section>

        {/* PAGE 6: PRUDENCIA HART & DEVISING PROCESS */}
        <div className="print-page-break mt-16 sm:mt-32 space-y-16 sm:space-y-32">
          
          <section className="bg-white border-12 border-lump-black rounded-[4rem] p-8 sm:p-20 shadow-[20px_20px_0_rgba(255,138,0,1)] print:shadow-none print-no-break">
             <div className="flex justify-between items-center mb-12 sm:mb-20">
                <div>
                   <p className="font-heading text-xl sm:text-3xl text-lump-orange uppercase">PART 2</p>
                   <p className="font-heading text-3xl sm:text-6xl uppercase">PRUDENCIA HART</p>
                </div>
             </div>
             
             <div className="font-comic text-lg sm:text-2xl leading-relaxed space-y-8 opacity-90">
                <p>
                  The exploration of David Greig's <span className="italic font-bold">The Strange Undoing of Prudencia Hart</span> served as my introduction to the devising process. Coming from a background of traditional script-work, the absence of a rigid, pre-determined structure initially presented a significant challenge. Alison Oddey (1994) articulates that devised theatre shifts the emphasis away from the single vision of a playwright toward the collective creation of the ensemble. Learning to trust this collective process—and finding my place within it through rigorous improv—required a fundamental shift in my approach to performance, moving away from individual preparation and toward active, moment-to-moment responsiveness.
                </p>
                <p>
                  A defining element of overcoming this challenge was our immersion into site-specific methodology. As Phil Smith notes, "A site is always the site of something; with the implication that it is a kind of container for what is really important, for the valuable property that is in it but is different from the space itself" (Smith, 2018). We tested this theory practically by taking the text out of the rehearsal room and walking up St. Catherine's Hill.
                </p>
                <p>
                  However, performing in these exposed, site-specific environments revealed vulnerabilities in my practice. A crucial practical lesson learned during this module was the "7-second rule"—the necessity of introducing a new physical, vocal, or spatial shift every seven seconds to actively maintain the audience's attention and keep the work fresh. My PA2803 assessment feedback, which resulted in a 64% grade, highlighted that initially, my creative choices "focused too much on individual needs as opposed to the wider concerns of the play," and that while my staging choices were bold, they occasionally felt "messy" in delivery.
                </p>
             </div>
          </section>

          <section className="print-page-break space-y-12 sm:space-y-24">
             <div className="flex justify-between items-center border-b-8 border-lump-black pb-8">
                <h2 className="font-heading font-black text-4xl sm:text-7xl uppercase">PART 3: THE DEVISING PROCESS</h2>
             </div>

             {/* 3.1 THE CLOWN */}
             <div className="bg-lump-pink text-white p-8 sm:p-16 rounded-[3rem] border-8 border-lump-black shadow-[15px_15px_0_rgba(0,0,0,1)] print:shadow-none print-no-break">
                <h3 className="font-heading text-3xl sm:text-5xl mb-10 uppercase italic text-lump-black">3.1 STEPPING OUTSIDE THE EGO: THE CLOWN</h3>
                <div className="font-comic text-lg sm:text-2xl leading-relaxed space-y-8">
                   <p>
                     To actively address my Semester 1 feedback and ensure I was prioritizing the "wider concerns of the play", our company embraced the framework of the 'Personal Clown.' In my previous work, my default instinct was to rely on a "cool, guarded exterior," often using volume or intensity as a defensive armor against true vulnerability.
                   </p>
                   <p>
                     Through the devising process, I discovered my personal clown persona: the <span className="font-black italic underline">"Outsider."</span> This clown was highly excitable, eager to play, but fundamentally lacked a filter, constantly pushing the boundaries of the ensemble until he went too far. Embracing this foolishness was the ultimate destructuring of my ego.
                   </p>
                </div>
             </div>

             {/* 3.2 ROUGH THEATRE */}
             <div className="bg-lump-blue p-8 sm:p-16 rounded-[3rem] border-8 border-lump-black shadow-[15px_15px_0_rgba(0,0,0,1)] print:shadow-none print-no-break">
                <h3 className="font-heading text-3xl sm:text-5xl mb-10 uppercase italic text-lump-black">3.2 ROUGH THEATRE AND THE TOTAL PLAYGROUND</h3>
                <div className="font-comic text-lg sm:text-2xl leading-relaxed space-y-8">
                   <p>
                     Our physical methodology was heavily informed by Peter Brook's concept of the "Empty Space" and the aesthetics of Rough Theatre. We stripped away traditional artifice, utilizing an 8x8m empty space, locked clothing racks, and visible costume changes.
                   </p>
                   <p>
                     Furthermore, I realized that in modern devising, the "space" of a performance extends far beyond the physical room. Taking on the roles of digital architect and marketer, I built the company website and managed our Instagram presence. This wasn't just administrative work; it was the creation of a fully-fledged online presence—a cohesive ecosystem where festival programmers and audiences can instantly grasp the "vibe" and ethos of Hump Lump.
                   </p>
                </div>
             </div>

             {/* 3.3 THE ALPHA */}
             <div className="bg-lump-orange p-8 sm:p-16 rounded-[3rem] border-8 border-lump-black shadow-[15px_15px_0_rgba(0,0,0,1)] print:shadow-none print-no-break">
                <h3 className="font-heading text-3xl sm:text-5xl mb-10 uppercase italic text-lump-black">3.3 DECONSTRUCTING THE "ALPHA": SATIRE AS A WEAPON</h3>
                <div className="font-comic text-lg sm:text-2xl leading-relaxed space-y-8">
                   <p>
                     Thematic exploration in <span className="italic">6, Maybe 7 Skits</span> centered on the absurdity of modern politics, pop culture, and toxic masculinity. I authored the Podcast Skit as a direct parody of four distinct corners of modern internet masculinity.
                   </p>
                   <p>
                     Transforming this deeply isolating internet subculture into a highly physical, absurd musical number was a radical act of theatrical reclamation. By combining the traumatic reality of these internet pipelines with the ridiculousness of clowning, we forced the audience to laugh at these power structures, effectively deconstructing the "Alpha" myth in real-time.
                   </p>
                </div>
             </div>
          </section>
        </div>

        {/* PAGE 8: EVALUATION & FUTURE ROADMAP */}
        <section className="print-page-break mt-16 sm:mt-32 space-y-12 sm:space-y-24">
          <section className="bg-white border-12 border-lump-black rounded-[4rem] p-8 sm:p-20 shadow-[20px_20px_0_rgba(0,0,0,1)] print:shadow-none print-no-break">
             <div className="flex justify-between items-center mb-16 sm:mb-24">
                <div>
                   <p className="font-heading text-xl sm:text-3xl text-lump-pink uppercase italic">PART 4</p>
                   <h2 className="font-heading font-black text-4xl sm:text-8xl leading-none uppercase">EVALUATION &<br />FUTURE ROADMAP</h2>
                </div>
             </div>
             
             <div className="space-y-12 sm:space-y-20">
                <div className="print-no-break">
                   <h3 className="font-heading text-2xl sm:text-4xl mb-6 uppercase border-l-8 border-lump-pink pl-6">4.1 EVALUATING THE PROOF OF CONCEPT AND PHYSICAL RISK</h3>
                   <p className="font-comic text-lg sm:text-2xl leading-relaxed opacity-80">
                     Our May 5th, 2026, proof-of-concept performance served as a vital stress test for both our dramaturgical intentions and our physical safety protocols. Pushing the boundaries of physical comedy—such as the aggressive lifting—carried inherent risks. However, our rigorous Risk Assessment protocols proved highly effective. The physical extremity of these moments did not result in injury, but rather succeeded in shocking the audience.
                   </p>
                </div>

                <div className="print-no-break">
                   <h3 className="font-heading text-2xl sm:text-4xl mb-6 uppercase border-l-8 border-lump-blue pl-6">4.2 THE GOLDEN THREAD: EMBRACING THE "UNFINISHED"</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                      <div className="font-comic text-lg sm:text-2xl leading-relaxed opacity-80 space-y-6">
                        <p>
                          Reflecting on the evolution from Semester 1 to Semester 2, the most significant growth has been our company's relationship with perfection. In Prudencia Hart, I struggled when staging became "messy". However, through Hump Lump, we have learned to weaponize that messiness.
                        </p>
                        <p>
                          Greig argues that Rough Theatre should be "written fast, rehearsed fast and performed fast," and crucially, that "It would be unfinished" (Greig, n.d.). By titling the show 6, Maybe 7 Skits, we baked this "unfinished" quality directly into the premise.
                        </p>
                      </div>
                      <div className="border-4 border-lump-black rounded-[2rem] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,1)] print:shadow-none">
                         <img 
                           src="https://raw.githubusercontent.com/JollyLegend/humplump-pictures/59a593b7155392aa49acf56670451cc569a9d296/Misc/Rough%20Theatre%20Manifesto.png" 
                           alt="Rough Theatre Manifesto"
                           className="w-full h-auto"
                         />
                      </div>
                   </div>
                </div>

                <div className="print-no-break">
                   <h3 className="font-heading text-2xl sm:text-4xl mb-6 uppercase border-l-8 border-lump-orange pl-6">4.3 THE 45-MINUTE ROADMAP</h3>
                   <p className="font-comic text-lg sm:text-2xl leading-relaxed opacity-80">
                     I propose targeting the Camden Fringe and Brighton Fringe as initial testing grounds. Both festivals possess a high tolerance for boundary-pushing, alternative clowning, and their pub-theatre venues perfectly match our acoustic, zero-tech aesthetic. Ultimately, Hump Lump is ready to take 6, Maybe 7 Skits out of the university context. We have built a production that is cheap, fast, deeply critical, and highly physical.
                   </p>
                </div>
             </div>
          </section>

          <section className="bg-lump-pink/10 border-8 border-lump-black p-8 sm:p-16 rounded-[3rem] print-no-break">
             <h2 className="font-heading font-black text-4xl sm:text-7xl mb-12 uppercase text-lump-pink drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">BIBLIOGRAPHY</h2>
             <ul className="font-comic text-base sm:text-xl space-y-4 opacity-80 list-disc list-inside">
                <li>Balcerzak, S. (2018) Beyond Method: Stella Adler and the Male Actor. Chicago: Wayne State University Press.</li>
                <li>Graham, S. and Hoggett, S. (2014) The Frantic Assembly Book of Devising Theatre. 2nd edn. New York: Routledge.</li>
                <li>Greig, D. (2011) The Strange Undoing of Prudencia Hart. London: Faber and Faber.</li>
                <li>Greig, D. (n.d.) Rough Theatre Manifesto. [Online]. University of Winchester Canvas.</li>
                <li>Meisner, S. and Longwell, D. (1987) Sanford Meisner on Acting. New York: Vintage Books.</li>
                <li>Oddey, A. (1994) Devising Theatre: A Practical and Theoretical Handbook. London: Routledge.</li>
                <li>Rodenburg, P. (2008) The Second Circle. New York: W.W. Norton & Company.</li>
             </ul>
          </section>
        </section>

        {/* PAGE 10: GALLERY */}
        <section className="print-page-break mt-16 sm:mt-32 space-y-12 sm:space-y-20">
          <div className="flex justify-between items-end border-b-8 border-lump-black pb-8">
             <h2 className="font-heading font-black text-5xl sm:text-9xl uppercase">GALLERY</h2>
             <span className="font-heading text-xl sm:text-4xl text-lump-blue uppercase italic">PART 5</span>
          </div>

          <div className="columns-1 sm:columns-2 gap-8 space-y-8">
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className="break-inside-avoid border-6 border-lump-black rounded-[2rem] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,1)] bg-white group hover:rotate-1 transition-transform print:shadow-none print-no-break">
                <img src={img.url} className="w-full transition-all duration-700" />
                <div className="p-4 sm:p-6 bg-white border-t-6 border-lump-black font-heading text-lg sm:text-2xl uppercase italic text-center">
                   {img.caption}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-32 pb-16 text-center space-y-6 no-print">
           <div className="flex justify-center gap-4">
              <div className="w-12 h-12 bg-lump-pink rounded-full border-4 border-lump-black" />
              <div className="w-12 h-12 bg-lump-blue rounded-full border-4 border-lump-black" />
              <div className="w-12 h-12 bg-lump-yellow rounded-full border-4 border-lump-black" />
           </div>
           <p className="font-heading text-2xl sm:text-3xl text-lump-black uppercase tracking-widest">© 2026 HUMP LUMP THEATRE</p>
           <p className="font-comic text-lg opacity-50">High-class portfolio for a first-class production.</p>
        </footer>

      </div>
    </div>
  );
}
