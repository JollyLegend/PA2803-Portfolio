/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
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
    title: "THE LIFT (SIGMA SKIT)",
    description: "Ishaan Jolly lifting Calvin Norris aggressively prior to the injection sequence.",
    affected: "Ishaan & Calvin (Back strains, hernia, impact injuries if dropped)",
    controls: [
      "Walked through and rehearsed at half-speed before every performance.",
      "Proper lifting form (bend at knees, keep back straight, lift with legs).",
      "Tight core/body tension to assist the lift.",
      "Barefoot performance for maximum balance and grip."
    ],
    initial: { L: 4, S: 3, RS: 12 },
    target: { L: 1, S: 3, RS: 3 },
    color: "bg-lump-pink"
  },
  {
    id: "R2",
    title: "SLIP HAZARD (CEREAL)",
    description: "Use of cereal to represent \"raw meat\" being crushed or dropped on floor.",
    affected: "Cast (Slipping, pulled muscles, bruising during movement)",
    controls: [
      "Limit cereal to the bare minimum required for the gag.",
      "Dropped in a contained, downstage area away from main running paths.",
      "Immediate sweep during strike or scene transition."
    ],
    initial: { L: 2, S: 4, RS: 8 },
    target: { L: 1, S: 4, RS: 4 },
    color: "bg-lump-blue"
  },
  {
    id: "R3",
    title: "LIVE COSTUME CHANGES",
    description: "Tripping over clothing, racks, or crates in the unlit \"playground\".",
    affected: "Cast (Tripping, blisters, abrasions, sprained ankles)",
    controls: [
      "Rehearsed \"safe zones\" for all discarded costumes.",
      "Clothing racks with locked wheels to prevent rolling/tipping.",
      "Prop crates clearly labeled and placed at the perimeter."
    ],
    initial: { L: 3, S: 3, RS: 9 },
    target: { L: 2, S: 2, RS: 4 },
    color: "bg-lump-orange"
  },
  {
    id: "R4",
    title: "HIGH-IMPACT COMEDY",
    description: "Impact injuries from \"Trump glitch\" drops or aggressive podcast collisions.",
    affected: "Cast (Head bumps, joint injuries, heavy bruising)",
    controls: [
      "Strictly blocked falls with safe landing techniques (absorbing impact).",
      "Environmental awareness and eye-contact cues before lunges.",
      "Slow rehearsals to prepare for slips or accidental contact."
    ],
    initial: { L: 3, S: 3, RS: 9 },
    target: { L: 1, S: 3, RS: 3 },
    color: "bg-lump-green"
  },
  {
    id: "R5",
    title: "MANUAL HANDLING",
    description: "Lifting/moving heavy boxes or seating blocks during the rapid set-up and strike.",
    affected: "Cast (Pulled or strained muscles, back injuries, or dropping items on toes)",
    controls: [
      "All actors utilize safe manual handling/lifting techniques (Toolbox talk prior to get-in).",
      "Heavy crates/blocks must be team-lifted if necessary."
    ],
    initial: { L: 2, S: 3, RS: 6 },
    target: { L: 1, S: 2, RS: 2 },
    color: "bg-lump-yellow"
  }
];

// --- COMPONENTS ---

interface RiskAssessmentRowProps {
  risk: typeof RISKS[number];
}

const RiskAssessmentRow: React.FC<RiskAssessmentRowProps> = ({ risk }) => (
  <div className="flex border-4 border-lump-black rounded-[1.5rem] overflow-hidden bg-white mb-6 shadow-[8px_8px_0_rgba(0,0,0,1)] print:shadow-none print:break-inside-avoid">
    {/* ID Column */}
    <div className={`${risk.color} w-24 sm:w-32 flex items-center justify-center border-r-4 border-lump-black`}>
       <span className="font-heading text-3xl sm:text-5xl text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">{risk.id}</span>
    </div>
    
    {/* Content Grid */}
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-lump-black">
      {/* Title & Description */}
      <div className="p-6 sm:p-8 flex flex-col justify-center">
        <h4 className="font-heading text-xl sm:text-2xl uppercase mb-2">{risk.title}</h4>
        <p className="font-comic text-base sm:text-lg opacity-80 leading-snug">{risk.description}</p>
      </div>
      
      {/* Affected */}
      <div className="p-6 sm:p-8 flex flex-col justify-center">
        <h5 className="font-heading text-xs uppercase opacity-40 mb-2">Affected</h5>
        <p className="font-comic text-base sm:text-lg leading-snug">{risk.affected}</p>
      </div>
      
      {/* Control Measures */}
      <div className="p-6 sm:p-8 col-span-1">
        <h5 className="font-heading text-xs uppercase opacity-40 mb-4">Control Measures</h5>
        <ul className="space-y-3">
          {risk.controls.map((control, i) => (
            <li key={i} className="flex gap-3 font-comic text-base sm:text-lg leading-tight">
              <span className="text-lump-black/30">•</span>
              {control}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Scores */}
      <div className="p-6 sm:p-8 bg-[#f5f5f5] flex flex-col justify-between gap-6">
        {/* Initial */}
        <div className="flex flex-col items-center">
          <h5 className="font-heading text-xs uppercase opacity-40 mb-3">Initial</h5>
          <div className="flex items-center gap-4">
             <div className="text-center">
                <p className="text-[10px] font-heading opacity-40 uppercase">L</p>
                <p className="text-xl sm:text-2xl font-bold text-red-500">{risk.initial.L}</p>
             </div>
             <p className="text-xl opacity-20">×</p>
             <div className="text-center">
                <p className="text-[10px] font-heading opacity-40 uppercase">S</p>
                <p className="text-xl sm:text-2xl font-bold text-red-500">{risk.initial.S}</p>
             </div>
             <p className="text-xl opacity-20">=</p>
             <div className="text-center">
                <p className="text-[10px] font-heading text-red-500 uppercase">RS</p>
                <p className="text-2xl sm:text-3xl font-black text-red-600">{risk.initial.RS}</p>
             </div>
          </div>
        </div>
        
        <div className="h-px bg-lump-black/10 mx-4" />
        
        {/* Target */}
        <div className="flex flex-col items-center">
          <h5 className="font-heading text-xs uppercase opacity-40 mb-3">Target</h5>
          <div className="flex items-center gap-4">
             <div className="text-center">
                <p className="text-[10px] font-heading opacity-40 uppercase">L</p>
                <p className="text-xl sm:text-2xl font-bold text-green-500">{risk.target.L}</p>
             </div>
             <p className="text-xl opacity-20">×</p>
             <div className="text-center">
                <p className="text-[10px] font-heading opacity-40 uppercase">S</p>
                <p className="text-xl sm:text-2xl font-bold text-green-500">{risk.target.S}</p>
             </div>
             <p className="text-xl opacity-20">=</p>
             <div className="text-center">
                <p className="text-[10px] font-heading text-green-500 uppercase">RS</p>
                <p className="text-2xl sm:text-3xl font-black text-green-600">{risk.target.RS}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CinemaWindow = ({ title, image, color = "text-lump-pink" }: { title: string, image: string, label?: string, color?: string }) => (
  <div className="border-8 border-lump-black rounded-[2.5rem] overflow-hidden shadow-[15px_15px_0_rgba(0,0,0,1)] bg-lump-black group print-no-break">
    {/* macOS Style Bar */}
    <div className="bg-[#1a1a1a] p-3 sm:p-4 flex items-center border-b-4 border-lump-black">
      <div className="flex gap-2 sm:gap-3">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
      </div>
    </div>
    
    {/* Video Content */}
    <div className="relative aspect-video overflow-hidden">
      <img src={image} className="w-full h-full object-cover" alt={title} />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="bg-lump-pink p-5 sm:p-8 rounded-full border-4 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)]">
          <Play className="w-10 h-10 sm:w-16 sm:h-16 text-white fill-white" />
        </div>
      </div>
      
      {/* YouTube Mock UI */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 flex items-center justify-between no-print">
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
    
    {/* Bottom Bar - Sleeker edge */}
    <div className="bg-lump-black h-3 sm:h-4 border-t-4 border-lump-black group-hover:bg-zinc-900 transition-colors" />
  </div>
);

export default function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-lump-black font-sans selection:bg-lump-pink selection:text-white">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 print:max-w-none print:px-0 print:py-0">
        
        {/* PAGE 1: CONDENSED COVER + MEDIA + CREW */}
        <section className="min-h-screen flex flex-col space-y-12 sm:space-y-16 py-8">
          <div className="text-center space-y-4">
             <div className="flex justify-center items-center gap-0 font-heading font-black text-5xl sm:text-7xl">
                <span className="text-lump-pink">HUMP</span>
                <span className="text-lump-blue">LUMP</span>
             </div>
             <h1 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tighter">DEVISING PORTFOLIO</h1>
             <p className="font-comic text-2xl sm:text-4xl font-bold text-lump-pink">ISHAAN JOLLY</p>
          </div>

          {/* DIGITAL PORTFOLIO - One Line */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-center uppercase border-b-4 border-lump-black pb-2 opacity-50">DIGITAL PORTFOLIO</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: "PROOF OF CONCEPT", desc: "30 Minute Video", icon: <Play />, color: "bg-lump-blue", link: "https://www.humplump.com/media" },
                { label: "OFFICIAL TRAILER", desc: "80 Second Trailer", icon: <Tv />, color: "bg-lump-pink", link: "https://www.humplump.com/media" },
                { label: "HUMPLUMP.COM", desc: "Live Website", icon: <ExternalLink />, color: "bg-lump-orange", link: "https://www.humplump.com" },
                { label: "@HUMP.LUMP", desc: "Instagram", icon: <Users />, color: "bg-lump-green", link: "https://www.instagram.com/hump.lump/" }
              ].map((btn, i) => (
                <a key={i} href={btn.link} target="_blank" rel="noopener noreferrer" className={`${btn.color} border-4 border-lump-black p-4 rounded-2xl shadow-[4px_4px_0_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105`}>
                  <div className="bg-white/20 p-2 rounded-full border-2 border-lump-black/10">
                    {btn.icon}
                  </div>
                  <span className="font-heading text-lg sm:text-xl font-black leading-tight uppercase">{btn.label}</span>
                  <span className="font-comic text-xs sm:text-sm font-bold opacity-70 uppercase">{btn.desc}</span>
                </a>
              ))}
            </div>
          </div>

          {/* THE CREW - Condensed */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-center uppercase border-b-6 border-lump-black pb-2">THE CREW</h2>
            <div className="grid grid-cols-4 gap-4 sm:gap-8">
              {TEAM.map((member, i) => (
                <div key={i} className="space-y-3">
                  <div className={`aspect-[4/5] border-4 border-lump-black rounded-xl overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,1)] ${member.color}`}>
                    <img src={member.image} className="w-full h-full object-cover" />
                  </div>
                  <div className={`${member.color} p-2 border-2 border-lump-black rounded-lg text-center shadow-[2px_2px_0_rgba(0,0,0,1)]`}>
                    <p className="font-heading text-xs sm:text-lg uppercase">{member.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAGE 2: INTRODUCTION & PART 1 */}
        <div className="print-page-break mt-8 space-y-12 sm:space-y-20">
          <section className="bg-lump-black text-white p-8 sm:p-12 rounded-[2rem] border-6 border-lump-pink shadow-[10px_10px_0_rgba(0,0,0,1)] print-no-break">
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

            {/* VIDEO LINKS SECTION */}
            <div className="mt-12 sm:mt-20 text-center print:hidden">
               <p className="font-comic text-xl sm:text-4xl leading-relaxed max-w-4xl mx-auto">
                  Click here to watch the <a href="https://www.humplump.com/media" target="_blank" rel="noopener noreferrer" className="text-lump-blue font-black underline decoration-4 underline-offset-8 hover:text-lump-pink transition-colors">30 minute proof of concept</a>, as well as watch the <a href="https://www.humplump.com/media" target="_blank" rel="noopener noreferrer" className="text-lump-pink font-black underline decoration-4 underline-offset-8 hover:text-lump-blue transition-colors">80 second trailer</a>.
               </p>
            </div>

            <div className="mt-16 sm:mt-24 flex flex-col gap-12 sm:gap-20">
               {/* MISSION STATEMENT */}
               <div className="border-6 border-lump-black p-8 sm:p-12 rounded-[2.5rem] bg-lump-pink/5 print:break-inside-avoid relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Sparkles className="w-16 h-16 text-lump-pink" />
                  </div>
                  <h3 className="font-heading text-3xl sm:text-6xl text-lump-pink mb-8 uppercase text-center sm:text-left">MISSION STATEMENT</h3>
                  <p className="font-comic text-xl sm:text-4xl leading-relaxed">
                    Hump Lump creates bold, playful and politically aware theatre that confronts the absurdity of contemporary politics, society and pop culture. Through clowning, satire, rough theatre and direct audience engagement, we aim to break through modern numbness and invite audiences to laugh, question and think again.
                  </p>
               </div>

               {/* MARKETING BLURB */}
               <div className="border-6 border-lump-black p-8 sm:p-12 rounded-[2.5rem] bg-lump-blue text-white print:break-inside-avoid relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
                     <Tv className="w-16 h-16 text-lump-black" />
                  </div>
                  <h3 className="font-heading text-3xl sm:text-6xl mb-8 uppercase text-lump-black text-center sm:text-left">MARKETING BLURB</h3>
                  <p className="font-comic text-xl sm:text-4xl leading-relaxed">
                    Feeling numb to the chaos of the world? 6 or 7 Skits throws politics, pop culture and modern masculinity into a clown-filled playground of satire. Through verbatim, puppetry, absurdism, music and audience interaction, Hump Lump turns real events into ridiculous, uncomfortable and strangely recognisable theatre.
                  </p>
               </div>

               {/* STYLE & THEMES */}
               <div className="border-6 border-lump-black p-8 sm:p-12 rounded-[2.5rem] bg-lump-orange/10 print:break-inside-avoid relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Music className="w-16 h-16 text-lump-orange" />
                  </div>
                  <h3 className="font-heading text-3xl sm:text-6xl text-lump-orange mb-8 uppercase text-center sm:text-left">STYLE & THEMES</h3>
                  <div className="space-y-6 sm:space-y-10">
                     <p className="font-comic text-xl sm:text-4xl leading-relaxed">
                        The company's style combines clowning, rough theatre, verbatim material, puppetry, absurdism, repetition and musicality. Costume changes happen in view, and the fourth wall is broken.
                     </p>
                     <p className="font-comic text-xl sm:text-4xl leading-relaxed border-t-4 border-lump-orange/20 pt-6 sm:pt-10">
                        Thematically, the work is connected through masculinity. As four male performers, the company uses satire to question the performance of male power, authority, ego, and fragility.
                     </p>
                  </div>
               </div>

               {/* PROJECT SYNOPSIS */}
               <div className="border-6 border-lump-black p-8 sm:p-12 rounded-[2.5rem] bg-white print:break-inside-avoid shadow-[10px_10px_0_rgba(0,0,0,1)]">
                  <h3 className="font-heading text-3xl sm:text-6xl text-lump-black mb-10 uppercase text-center sm:text-left underline underline-offset-8 decoration-lump-yellow">PROJECT SYNOPSIS</h3>
                  <div className="font-comic text-xl sm:text-3xl leading-relaxed space-y-8">
                     <p>
                       <span className="font-black italic">6 or 7 Skits</span> is a political and social satire created by Hump Lump, a devised theatre company exploring how world events can be reimagined through clowning, rough theatre and absurd performance. Each skit responds to a real-life event, using satire to expose contradictions and discomfort.
                     </p>
                     <p>
                       The performance is framed as a "play within a play," where literal clowns enter a theatrical playground to act out real-world figures, public narratives and media events. Rather than presenting these stories through realism, Hump Lump uses exaggeration, disruption and play to make familiar events feel strange again.
                     </p>
                  </div>
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
              { label: "HOST FEES & CONTACT", value: "clowns@humplump.com", color: "bg-lump-orange" },
              { label: "SPACE REQUIRED", value: "8m x 8m x 4m", color: "bg-white" },
              { label: "PARKING REQUIRED", value: "Space for 1 van", color: "bg-white" },
              { label: "ACCESS NEEDS", value: "None", color: "bg-white" },
              { label: "TECH REQUIREMENTS", value: "Fully Self-Sufficient", color: "bg-lump-pink text-white" }
            ].map((spec, i) => (
              <div key={i} className={`${spec.color} border-4 border-lump-black p-4 sm:p-6 rounded-2xl shadow-[6px_6px_0_rgba(0,0,0,1)] print:shadow-none print-no-break`}>
                <h4 className="font-heading text-lg sm:text-2xl mb-2 sm:mb-4 uppercase opacity-60">{spec.label}</h4>
                {spec.label === "HOST FEES & CONTACT" ? (
                  <a href={`mailto:${spec.value}`} className="font-comic text-xl sm:text-3xl font-black break-words underline decoration-2 underline-offset-4 hover:text-white transition-colors">
                    {spec.value}
                  </a>
                ) : (
                  <p className="font-comic text-xl sm:text-3xl font-black break-words">{spec.value}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-16 sm:mt-32 border-8 border-lump-black rounded-[3rem] overflow-hidden bg-lump-yellow shadow-[15px_15px_0_rgba(0,0,0,1)] print:shadow-none print:bg-white">
            <div className="p-6 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
               <h2 className="font-heading font-black text-5xl sm:text-8xl uppercase text-lump-black drop-shadow-[4px_4px_0_rgba(0,0,0,0.1)]">RISK ASSESSMENT</h2>
               <div className="bg-lump-black text-white px-6 py-3 rounded-full font-heading text-sm sm:text-base tracking-widest uppercase border-4 border-white/20">
                  Key: L = Likelihood, S = Severity, RS = Risk Score (LxS)
               </div>
            </div>
            
            <div className="p-4 sm:p-10 pt-0">
               {RISKS.map((risk, i) => (
                 <RiskAssessmentRow key={i} risk={risk} />
               ))}
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
              <div key={i} className="break-inside-avoid border-6 border-lump-black rounded-[2rem] overflow-hidden shadow-[8px_8px_0_rgba(0,0,0,1)] bg-white group print:shadow-none print-no-break">
                <img src={img.url} className="w-full" />
                <div className="p-4 sm:p-6 bg-white border-t-6 border-lump-black font-heading text-lg sm:text-2xl uppercase italic text-center">
                   {img.caption}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-32 pb-16 text-center space-y-6 no-print">
           <div className="flex justify-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-full border-4 border-lump-black" />
              <div className="w-12 h-12 bg-lump-blue rounded-full border-4 border-lump-black" />
              <div className="w-12 h-12 bg-lump-green rounded-full border-4 border-lump-black" />
              <div className="w-12 h-12 bg-lump-yellow rounded-full border-4 border-lump-black" />
           </div>
        </footer>

      </div>
    </div>
  );
}
