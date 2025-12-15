import React from "react";

const team = [
  { 
    name: "Arjun Mehta", 
    role: "President", 
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoMbv8LaODM65jb82pRyGYmPFaniqRq50NXvRQPu6lK_oFxtxGNc6eeLpF3jz3EH8eMLar-bhYuEVvKUahru8f8lLgrt0CVV5fpDH4iseAQNLXYRIZ3un8wYPgBSi8Fm7yUljjhTCUkLgAMzGaL8Qt8eM1qSJ0d8sfv6tZ_ErLyPsEJ49AYtJmSlXem8MLh14MxQDHoKK_OoN-oDsz6t4lyphlNruu1jRPJ_q03xqT3Sy1gFNnhyrZGoOxmGCx5_V25BKyAQ7qcI8" 
  },
  { 
    name: "Priya Singh", 
    role: "Vice President", 
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnavj-pz28wdg5tVrtjt-dIcW6L1F7uKHBgW-_PI32MA9G65-JKfaXTMOn_4TrMc_ItV3Afw4IQ0I4SStlWqV3lJy04oiTafWKiYcm7Qls17SZhg5PKTyLbTXCEP7d-eqakI_yAk8JjogW7Wz-X89RPcB6-8orVZJ6WmSyrnRMAgHZG8tJBUaz9-NHd-zJ6QeXiY-_KlXF5iBCUex11PGGBlutXfxTo71-7umIX6dYqN2N9DP8QMhdkYBwL1bu0eIaH0nR8qwaepk" 
  },
  { 
    name: "Rohan Das", 
    role: "Treasurer", 
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASjfGuSONgzGLWuTBL_Bp0Zny0DFqWdOQnCJISopOWRuts6CsQbnnZi-zSEEWGPThtJmE0aa2atkGe9ivDjohayFgvTcuDF5EpF8uf4ZT3WLxoRsWxAFRj84U5fuNZbINV0kGqyKB9-G4lLffAe0ie2uw8lvUfPVY2rWxOlz9pyOfcoEPhuS3Q0loehEHzJ_nmOj6R6Y5dN09IEzcwC-PtfR-Zq5xN_TOU_dud8GUrOZ1q57rf1DmRhW5akFg-3KC6HUmsvbY0iJc" 
  },
  { 
    name: "Sana Khan", 
    role: "Secretary", 
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvCM5q41NbkWEz3XQOrGeE10kjvwok_HjjjTJWHbfEDFx4Ml-KRuFyTCbLTYQhlxuniJYSSJhzT2QC6nq3JxQxlrhnVZ6HdcyLYMOuBbAszpTfcPse75bpmLMdMDz2LMv_lAQAnHiqc_iES6lyYFETOTZkAdD9M-ftgEN17El3TDSkGWwoYbesXC9xNnjxYDzTUpXj2s8Oqb1QX2MFzEpGp8gqjQNXFq3fsTFcIfCEcmlFnOKyy46pzmtU40uwnQr7IVr5UYpbIDU" 
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full min-h-screen pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-[1280px]">

        {/* Hero */}
        <div className="text-center mb-16 pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Since 2024</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            We Are The <span className="text-primary drop-shadow-[0_0_20px_rgba(43,238,121,0.5)]">Union</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Sangeet Kalakar Union is the definitive voice for independent musicians, producers, and audio engineers. We build the bridges between creativity and sustainability.
          </p>
        </div>

        {/* Mission Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
           <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-[-20px] right-[-20px] p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[180px] text-primary">target</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Our Mission</h2>
              <p className="text-white/70 text-lg leading-relaxed relative z-10">
                To empower every musical artist by providing equitable access to resources, transparent fair-pay standards, and a supportive community. We believe music is labor, and labor deserves dignity, respect, and compensation.
              </p>
           </div>
           <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-blue-400/30 transition-colors">
              <div className="absolute top-[-20px] right-[-20px] p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                 <span className="material-symbols-outlined text-[180px] text-blue-400">history_edu</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Our History</h2>
              <p className="text-white/70 text-lg leading-relaxed relative z-10">
                Founded in the neon-lit backrooms of Mumbai's underground jazz clubs, the Union started as a WhatsApp group of 5 struggling artists. Today, we are a 15,000+ strong collective reshaping the music industry landscape across the nation.
              </p>
           </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'balance', title: 'Fairness', desc: 'Standardized rates for all gigs and transparent contracts.' },
              { icon: 'diversity_3', title: 'Community', desc: 'Mentorship over competition. We rise by lifting others.' },
              { icon: 'bolt', title: 'Innovation', desc: 'Embracing future tech and new revenue streams in music.' }
            ].map((v, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl text-center hover:bg-white/5 transition-all hover:-translate-y-2 duration-300">
                 <div className="size-16 rounded-full bg-white/5 mx-auto flex items-center justify-center text-primary mb-6 ring-1 ring-white/10">
                   <span className="material-symbols-outlined text-3xl">{v.icon}</span>
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                 <p className="text-white/50 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
           <div className="flex flex-col items-center mb-12">
             <h2 className="text-3xl font-bold text-white mb-2">Meet the Board</h2>
             <div className="h-1 w-20 bg-primary rounded-full"></div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
             {team.map((member, idx) => (
               <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-white/[0.07] transition-colors">
                 <div className="size-24 md:size-32 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-colors mb-6 shadow-lg">
                   <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                 </div>
                 <h4 className="font-bold text-white text-lg mb-1">{member.name}</h4>
                 <span className="text-primary text-sm font-bold uppercase tracking-wider opacity-80">{member.role}</span>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;