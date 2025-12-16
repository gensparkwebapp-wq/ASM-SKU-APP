import React from "react";

interface Performance {
  id: number;
  title: string;
  venue: string;
  duration: string;
  image: string;
  avatar: string;
}

const performances: Performance[] = [
  {
    id: 1,
    title: "Midnight Jazz Session",
    venue: "The Blue Note",
    duration: "04:20",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTS6JNSoyb8cEp-zYFXgvhASgFGbEtBsTUlBtlfU71sKTkdU7ZUsz5K5TQ3i1PqSMHxfIXExETflR0vEMbWr1tMU_I_U_8xiljJvwp7DoCRSXxAWx99wVkrculuE2xniNgl0FYjNCb1XvL7G7-eToqoFNHhzrueyz2zAHa6kLoDrjxM1fcA1tVU80pk_0zD1etT4whCKENPvvSLeJczeK-PPc2Vdg4lFGYfgkR5D8mpIs5rU8jl5FxZm6_FrMaje1OhksDt6lQNZs",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjsin6bbqdo26tyyXsik5L_Uiaxk6kcEAAZ1qTz1JCG_RDgfBDYVDtOiHphUXfr33o9ovAI-hqZ1IEVUyZNpEQIJmxYZpjKdrVAknJW5_avelwObnY9JfV_AM50cbY7HbHAOnHCxe1AMW5dusutWZqxhJrYOf0KfKbpaqyKu8UGFFzDlOxm6Yq61NDa8BPrh3CQrmUOeI7nNngdOeJYTnod9CTDsDmmMj7H4TH4mKXV5XhOnWUhSjpeYMkhgcp3stYmS-x7i1VDUE",
  },
  {
    id: 2,
    title: "Synthwave Nights",
    venue: "Neon Tokyo",
    duration: "12:05",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvCM5q41NbkWEz3XQOrGeE10kjvwok_HjjjTJWHbfEDFx4Ml-KRuFyTCbLTYQhlxuniJYSSJhzT2QC6nq3JxQxlrhnVZ6HdcyLYMOuBbAszpTfcPse75bpmLMdMDz2LMv_lAQAnHiqc_iES6lyYFETOTZkAdD9M-ftgEN17El3TDSkGWwoYbesXC9xNnjxYDzTUpXj2s8Oqb1QX2MFzEpGp8gqjQNXFq3fsTFcIfCEcmlFnOKyy46pzmtU40uwnQr7IVr5UYpbIDU",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_Y5JfKRXBOeZjY--cYTp30tSf5OUWOHWUy5Od0E1jnn65Y7XNlZne080-NmjZkCGRFSaNeAJMruju49u5MYyLFG9RDsiCF8OAQ1QdbOErvDKF14fNQpXtPzennUI85pgepruSTg1suZlk0-4uCZxN0jrwSs_T6GoGrnBvp8Zlspv5HdSnvY5IqukDMTDwVEhb6w-ftRcsK0lJCbFDEQfuC4GFvS3lusZpq-DftBN-ftD2qoVbyjI_FvFQCF3EBaHoDzyAlBcp-cs",
  },
  {
    id: 3,
    title: "Symphony No. 9",
    venue: "Royal Orchestra",
    duration: "08:32",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxyUEdfL91BQVCInSLptc_uu-2TW2Mx6Oo1-Bg5xB-7OvFUR4m_UNAvXxsUUTKIspKmsvPGuljtAOor-LP82MhtZfVqEGTf1nAMqVVQX60zqc67b8dWk29qRKUoQX2l5PvTRqz2ZADkXYOaVl2m18OZRStxsUtpMk5Qk7mDClsK1ZHvbmss8pFnB17FNZavA6O7Wgcy0XxIVQkN9ot3pJ8Zf4RQiIFEmTuglS-zhJ_Uh-ti-bRXpW3INOCKJDXMAugqX6QS2TQVno",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOxz8uouO_DmVYHaLiJJ2bsdlrpU9pK4AcAXfrUq1ratPnbCqFeEgBwoLPyp0BC9Nwp3u5p-I_lmkk3-6bvJxHXV0EmsWd_dxNQelf5K_oJ6ACxn7_3K3AX-eTLMulruNQeQU6GA4pmiQvlmqHa_Rf3nEFIK00H0VCio4OYMxuy8TkSSHpAihdfJlBVhjDr8fIbHPom8slMKSP5yd0BExcG9ZFx7uy-mL7K6GFrxi0-nvMp1BJnou6XJCl7ZU7F179-QT-TOVRHBs",
  },
  {
    id: 4,
    title: "Electric Strings Vol. 1",
    venue: "Ravi Shankar",
    duration: "03:55",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASjfGuSONgzGLWuTBL_Bp0Zny0DFqWdOQnCJISopOWRuts6CsQbnnZi-zSEEWGPThtJmE0aa2atkGe9ivDjohayFgvTcuDF5EpF8uf4ZT3WLxoRsWxAFRj84U5fuNZbINV0kGqyKB9-G4lLffAe0ie2uw8lvUfPVY2rWxOlz9pyOfcoEPhuS3Q0loehEHzJ_nmOj6R6Y5dN09IEzcwC-PtfR-Zq5xN_TOU_dud8GUrOZ1q57rf1DmRhW5akFg-3KC6HUmsvbY0iJc",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrPdErdSK5U2vnFD0wG8cPDOWR-plB3eS2QS_tC870s2JjKVMHZWWGKRjF_PjSu2OkLpqX01x6fApt-Zs4y8S54UTpeAhXSSKeHf6OClynhJquMPSipZhDuGetTtE6tnE_A7DTBptRAe_ZHW6k1SYZZ8vEVa6oEWdQHGlL32FS8v1ILfLvZYhQI9x0NDI8YUc3jtGvjrJXtH4OYreoSzyaSmS0f5fj4FgFrtp8IWB53Qp3Gh4SyxnZ3pLWizFppcQZxN7ObQsf7MQ",
  },
];

const TrendingSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 max-w-[1400px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h2 className="text-2xl font-bold tracking-tight">
            Trending Performances
          </h2>
        </div>
        <div className="hidden md:flex gap-2">
          <button className="size-10 rounded-full border border-white/10 flex items-center justify-center bg-surface-dark/50 hover:bg-white/10 text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="size-10 rounded-full border border-white/10 flex items-center justify-center bg-surface-dark/50 hover:bg-white/10 text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto hide-scrollbar gap-6 pb-4 -mx-4 px-4 snap-x snap-mandatory">
        {performances.map((item) => (
          <div key={item.id} className="min-w-[280px] md:min-w-[320px] snap-start">
            <div className="bg-surface-dark rounded-lg overflow-hidden group cursor-pointer h-full flex flex-col border border-transparent hover:border-primary/30 transition-all">
              <div
                className="aspect-video w-full bg-cover bg-center relative"
              >
                <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="size-12 rounded-full bg-primary/90 flex items-center justify-center text-background-dark shadow-lg">
                    <span className="material-symbols-outlined filled">
                      play_arrow
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-xs font-mono">
                  {item.duration}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold truncate group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={item.avatar}
                    loading="lazy"
                    className="size-6 rounded-full object-cover"
                  />
                  <p className="text-sm text-white/60">{item.venue}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;