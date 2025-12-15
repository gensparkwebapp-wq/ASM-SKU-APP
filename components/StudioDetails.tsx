import React, { useState, useRef } from "react";
import { Studio } from "./TopStudios";

interface StudioDetailsProps {
  studio: Studio;
  onBack: () => void;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  timestamp: number;
}

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
}

const amenities = [
  { icon: "mic", label: "Neumann U87" },
  { icon: "piano", label: "Grand Piano" },
  { icon: "speaker", label: "Dolby Atmos" },
  { icon: "wifi", label: "High-Speed WiFi" },
  { icon: "ac_unit", label: "Climate Control" },
  { icon: "coffee", label: "Lounge & Coffee" },
];

const initialReviews: Review[] = [
  {
    id: 1,
    author: "Rahul Verma",
    rating: 5,
    text: "Absolutely top-tier equipment. The sound engineer was super helpful with setting up the mic placement. Highly recommended for vocal tracking.",
    date: "2 days ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_Y5JfKRXBOeZjY--cYTp30tSf5OUWOHWUy5Od0E1jnn65Y7XNlZne080-NmjZkCGRFSaNeAJMruju49u5MYyLFG9RDsiCF8OAQ1QdbOErvDKF14fNQpXtPzennUI85pgepruSTg1suZlk0-4uCZxN0jrwSs_T6GoGrnBvp8Zlspv5HdSnvY5IqukDMTDwVEhb6w-ftRcsK0lJCbFDEQfuC4GFvS3lusZpq-DftBN-ftD2qoVbyjI_FvFQCF3EBaHoDzyAlBcp-cs",
    timestamp: Date.now() - 172800000 // ~2 days in ms
  },
  {
    id: 2,
    author: "Sneha Kapoor",
    rating: 4,
    text: "Great vibe and lighting. The piano could use a slight tuning, but otherwise a fantastic experience. The lounge coffee is a life saver.",
    date: "1 week ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjsin6bbqdo26tyyXsik5L_Uiaxk6kcEAAZ1qTz1JCG_RDgfBDYVDtOiHphUXfr33o9ovAI-hqZ1IEVUyZNpEQIJmxYZpjKdrVAknJW5_avelwObnY9JfV_AM50cbY7HbHAOnHCxe1AMW5dusutWZqxhJrYOf0KfKbpaqyKu8UGFFzDlOxm6Yq61NDa8BPrh3CQrmUOeI7nNngdOeJYTnod9CTDsDmmMj7H4TH4mKXV5XhOnWUhSjpeYMkhgcp3stYmS-x7i1VDUE",
    timestamp: Date.now() - 604800000 // ~1 week in ms
  },
  {
    id: 3,
    author: "Vikram Singh",
    rating: 5,
    text: "Best studio in the area for the price. The acoustics in the main room are perfect for drums.",
    date: "3 weeks ago",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOxz8uouO_DmVYHaLiJJ2bsdlrpU9pK4AcAXfrUq1ratPnbCqFeEgBwoLPyp0BC9Nwp3u5p-I_lmkk3-6bvJxHXV0EmsWd_dxNQelf5K_oJ6ACxn7_3K3AX-eTLMulruNQeQU6GA4pmiQvlmqHa_Rf3nEFIK00H0VCio4OYMxuy8TkSSHpAihdfJlBVhjDr8fIbHPom8slMKSP5yd0BExcG9ZFx7uy-mL7K6GFrxi0-nvMp1BJnou6XJCl7ZU7F179-QT-TOVRHBs",
    timestamp: Date.now() - 1814400000 // ~3 weeks in ms
  }
];

const StudioDetails: React.FC<StudioDetailsProps> = ({ studio, onBack }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDuration, setSelectedDuration] = useState<number>(2);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [userRating, setUserRating] = useState<number>(5);
  const [userComment, setUserComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gallery State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    { type: 'image', src: studio.image },
    { type: 'image', src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnavj-pz28wdg5tVrtjt-dIcW6L1F7uKHBgW-_PI32MA9G65-JKfaXTMOn_4TrMc_ItV3Afw4IQ0I4SStlWqV3lJy04oiTafWKiYcm7Qls17SZhg5PKTyLbTXCEP7d-eqakI_yAk8JjogW7Wz-X89RPcB6-8orVZJ6WmSyrnRMAgHZG8tJBUaz9-NHd-zJ6QeXiY-_KlXF5iBCUex11PGGBlutXfxTo71-7umIX6dYqN2N9DP8QMhdkYBwL1bu0eIaH0nR8qwaepk" },
    { type: 'image', src: "https://lh3.googleusercontent.com/aida-public/AB6AXuASjfGuSONgzGLWuTBL_Bp0Zny0DFqWdOQnCJISopOWRuts6CsQbnnZi-zSEEWGPThtJmE0aa2atkGe9ivDjohayFgvTcuDF5EpF8uf4ZT3WLxoRsWxAFRj84U5fuNZbINV0kGqyKB9-G4lLffAe0ie2uw8lvUfPVY2rWxOlz9pyOfcoEPhuS3Q0loehEHzJ_nmOj6R6Y5dN09IEzcwC-PtfR-Zq5xN_TOU_dud8GUrOZ1q57rf1DmRhW5akFg-3KC6HUmsvbY0iJc" },
    { type: 'image', src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvCM5q41NbkWEz3XQOrGeE10kjvwok_HjjjTJWHbfEDFx4Ml-KRuFyTCbLTYQhlxuniJYSSJhzT2QC6nq3JxQxlrhnVZ6HdcyLYMOuBbAszpTfcPse75bpmLMdMDz2LMv_lAQAnHiqc_iES6lyYFETOTZkAdD9M-ftgEN17El3TDSkGWwoYbesXC9xNnjxYDzTUpXj2s8Oqb1QX2MFzEpGp8gqjQNXFq3fsTFcIfCEcmlFnOKyy46pzmtU40uwnQr7IVr5UYpbIDU" }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Audio Player State
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Video Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Helper to check if two dates are the same day
  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  // Calendar Helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Submit Review Handler
  const handleSubmitReview = () => {
    if (!userComment.trim()) return;

    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
        const newReview: Review = {
          id: Date.now(),
          author: "You", // In a real app, this would come from auth context
          rating: userRating,
          text: userComment,
          date: "Just now",
          avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrPdErdSK5U2vnFD0wG8cPDOWR-plB3eS2QS_tC870s2JjKVMHZWWGKRjF_PjSu2OkLpqX01x6fApt-Zs4y8S54UTpeAhXSSKeHf6OClynhJquMPSipZhDuGetTtE6tnE_A7DTBptRAe_ZHW6k1SYZZ8vEVa6oEWdQHGlL32FS8v1ILfLvZYhQI9x0NDI8YUc3jtGvjrJXtH4OYreoSzyaSmS0f5fj4FgFrtp8IWB53Qp3Gh4SyxnZ3pLWizFppcQZxN7ObQsf7MQ", // Placeholder avatar
          timestamp: Date.now()
        };

        setReviews([newReview, ...reviews]);
        setUserComment("");
        setUserRating(5);
        setIsSubmitting(false);
    }, 1500);
  };

  // File Upload Handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const result = e.target.result as string;
            // Basic detection logic using file.type, fallback to image if unknown
            const type = file.type.startsWith('video/') ? 'video' : 'image';
            setGalleryItems(prev => [{ type, src: result }, ...prev]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Audio Player Helpers
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, x / width)); // Clamp between 0 and 1
        const newTime = percentage * (audioRef.current.duration || 0);
        
        if (isFinite(newTime)) {
          audioRef.current.currentTime = newTime;
          setCurrentTime(newTime);
        }
    }
  };

  // Video Player Helpers
  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Time slots grouped
  const timeSections = [
    { 
        label: "Morning", 
        icon: "wb_twilight",
        slots: ["09:00", "10:00", "11:00"] 
    },
    { 
        label: "Afternoon", 
        icon: "light_mode",
        slots: ["12:00", "13:00", "14:00", "15:00", "16:00"] 
    },
    { 
        label: "Evening", 
        icon: "dark_mode",
        slots: ["17:00", "18:00", "19:00", "20:00", "21:00"] 
    }
  ];

  // Mock unavailable slots for demo purposes
  const unavailableSlots = ["14:00", "18:00"];

  const pricePerHourInt = parseInt(studio.pricePerHour.replace(/[^0-9]/g, ""));
  const totalPrice = pricePerHourInt * selectedDuration;

  // Sorting Logic
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOrder === 'newest') {
      return b.timestamp - a.timestamp;
    } else {
      return a.timestamp - b.timestamp;
    }
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 w-full min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${studio.image}")` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>
        
        {/* Navigation Bar */}
        <div className="absolute top-4 left-0 right-0 px-4 md:px-8 max-w-[1280px] mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="size-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex gap-2">
             <button className="size-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="size-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 container mx-auto max-w-[1280px]">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
               <div className="flex items-center gap-2 mb-2">
                 <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded border border-primary/20">
                   VERIFIED
                 </span>
                 <div className="flex items-center gap-1 text-yellow-400">
                    <span className="material-symbols-outlined text-[16px] filled">star</span>
                    <span className="text-sm font-bold">{studio.rating}</span>
                    <span className="text-white/40 text-xs">(128 Reviews)</span>
                 </div>
               </div>
               <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{studio.name}</h1>
               <div className="flex items-center gap-2 text-white/70">
                 <span className="material-symbols-outlined text-[20px]">location_on</span>
                 <span>{studio.location}</span>
               </div>
            </div>
            
            <div className="glass-card p-4 rounded-xl flex flex-col items-end min-w-[140px]">
               <span className="text-white/50 text-xs uppercase tracking-wide">Price per hour</span>
               <span className="text-3xl font-bold text-primary">{studio.pricePerHour}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 max-w-[1280px] mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* About Section */}
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">About the Studio</h3>
            <p className="text-white/70 leading-relaxed mb-4">
              Welcome to {studio.name}, a premier recording facility located in the heart of {studio.location.split(',')[0]}. 
              Designed for audiophiles and professional artists, our studio offers a perfectly treated acoustic environment 
              ideal for vocal tracking, mixing, and instrument recording.
            </p>
            <p className="text-white/70 leading-relaxed">
              We provide an inspiring atmosphere with tunable LED mood lighting, a dedicated lounge area for creative breaks, 
              and 24/7 access for union members. Whether you are recording your next hit single or producing a full album, 
              {studio.name} delivers the quality you deserve.
            </p>
          </div>

          {/* Studio Video Tour - NEW */}
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">videocam</span>
              <h3 className="text-xl font-bold text-white">Virtual Tour</h3>
            </div>
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
               <video 
                 ref={videoRef}
                 controls
                 preload="metadata"
                 className="w-full h-full object-cover"
                 poster={studio.image}
                 onPlay={() => setIsVideoPlaying(true)}
                 onPause={() => setIsVideoPlaying(false)}
               >
                 <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
                 Your browser does not support the video tag.
               </video>
               
               {/* Custom Play Button Overlay */}
               <div 
                 className={`absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-all cursor-pointer z-10 ${isVideoPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                 onClick={toggleVideo}
               >
                  <button className="size-16 rounded-full bg-primary/90 text-background-dark flex items-center justify-center shadow-[0_0_30px_rgba(43,238,121,0.5)] hover:scale-110 transition-transform group-hover:shadow-[0_0_40px_rgba(43,238,121,0.6)]">
                    <span className="material-symbols-outlined filled text-[40px] ml-1">play_arrow</span>
                  </button>
               </div>
            </div>
          </div>

          {/* Audio Sample Section */}
          <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-[120px]">graphic_eq</span>
             </div>
             <h3 className="text-xl font-bold text-white mb-6">Audio Samples</h3>
             
             <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
               <button 
                 onClick={togglePlay}
                 className="size-12 rounded-full bg-primary text-background-dark flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(43,238,121,0.3)] shrink-0"
               >
                 <span className="material-symbols-outlined filled text-[28px]">
                   {isPlaying ? 'pause' : 'play_arrow'}
                 </span>
               </button>
               
               <div className="flex-1 min-w-0">
                 <div className="flex items-center justify-between mb-2">
                    <div className="min-w-0">
                       <h4 className="font-bold text-white text-sm truncate">Studio Session Demo</h4>
                       <p className="text-white/40 text-xs truncate">Recorded at {studio.name}</p>
                    </div>
                    <span className="text-xs font-mono text-white/60 ml-2 whitespace-nowrap">
                      {formatTime(currentTime)} / {formatTime(duration || 0)}
                    </span>
                 </div>
                 
                 {/* Progress Bar Container */}
                 <div 
                    className="relative h-4 group cursor-pointer flex items-center" 
                    onClick={handleSeek}
                 >
                    {/* Track Background */}
                    <div className="absolute inset-x-0 h-1 bg-white/10 rounded-full overflow-hidden group-hover:h-1.5 transition-all">
                       {/* Filled Track */}
                       <div 
                         className="h-full bg-primary transition-all duration-100 ease-linear"
                         style={{ width: `${(duration ? (currentTime / duration) : 0) * 100}%` }}
                       ></div>
                    </div>
                    
                    {/* Thumb / Scrubber Handle */}
                     <div 
                      className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ 
                        left: `${(duration ? (currentTime / duration) : 0) * 100}%`,
                        transform: 'translateX(-50%)'
                      }}
                    ></div>
                 </div>
               </div>
             </div>
             <audio 
               ref={audioRef} 
               src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
               onTimeUpdate={handleTimeUpdate}
               onEnded={() => setIsPlaying(false)}
               onLoadedMetadata={handleTimeUpdate}
             />
          </div>

          {/* Studio Gallery Section */}
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Studio Gallery</h3>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold transition-all text-white group"
              >
                <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">add_photo_alternate</span>
                <span>Add Media</span>
              </button>
              <input 
                  type="file" 
                  multiple 
                  accept="image/*,video/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
              />
            </div>

            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {galleryItems.map((item, index) => (
                <div key={index} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-black/20 border border-white/5">
                  {item.type === 'video' ? (
                     <div className="relative group/video">
                        <video 
                          src={item.src} 
                          className="w-full h-auto object-cover" 
                          controls={false}
                          muted
                          loop
                          onMouseOver={e => (e.target as HTMLVideoElement).play()}
                          onMouseOut={e => {
                              const el = e.target as HTMLVideoElement;
                              el.pause();
                              el.currentTime = 0;
                          }}
                        />
                         <div className="absolute top-2 right-2 size-6 rounded-full bg-black/60 backdrop-blur flex items-center justify-center pointer-events-none">
                            <span className="material-symbols-outlined text-[14px] text-white">videocam</span>
                         </div>
                     </div>
                  ) : (
                    <img 
                      src={item.src} 
                      alt={`Gallery ${index}`} 
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Section */}
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Equipment & Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  <span className="text-sm font-medium text-white/80">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Studio Policies Section */}
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Studio Policies</h3>
            <div className="space-y-6">
              {/* Cancellation */}
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                  <span className="material-symbols-outlined text-red-400 text-[20px]">event_busy</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Cancellation Policy</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                     Full refund if cancelled 48 hours prior. 50% refund within 24 hours. No refunds for no-shows or same-day cancellations.
                  </p>
                </div>
              </div>

              {/* Equipment */}
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <span className="material-symbols-outlined text-blue-400 text-[20px]">precision_manufacturing</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Equipment Usage</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                     Handle all microphones and instruments with care. Hardware patching must be done by the house engineer. Damages caused by negligence will be invoiced.
                  </p>
                </div>
              </div>

              {/* House Rules */}
              <div className="flex gap-4">
                 <div className="size-10 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 border border-yellow-500/20">
                  <span className="material-symbols-outlined text-yellow-400 text-[20px]">gavel</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-2">House Rules</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                     {["No smoking or vaping", "No food near console", "Max 6 people occupancy", "Clean up trash before leaving"].map((rule, i) => (
                       <li key={i} className="flex items-center gap-2 text-xs text-white/60">
                          <span className="size-1.5 rounded-full bg-white/20"></span>
                          {rule}
                       </li>
                     ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map Placeholder */}
           <div className="glass-card p-6 md:p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Location</h3>
            <div className="w-full h-48 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
              <div className="flex flex-col items-center gap-2 text-white/30">
                 <span className="material-symbols-outlined text-4xl">map</span>
                 <span className="text-sm">Map View Integrated Here</span>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-white">Reviews ({reviews.length})</h3>
                <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/10">
                    <button 
                        onClick={() => setSortOrder('newest')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${sortOrder === 'newest' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                    >
                        Newest
                    </button>
                    <button 
                        onClick={() => setSortOrder('oldest')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${sortOrder === 'oldest' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                    >
                        Oldest
                    </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 self-start sm:self-auto">
                <span className="text-yellow-400 font-bold">{studio.rating}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-[16px] ${i < Math.floor(studio.rating) ? 'filled' : ''}`}>star</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Write Review Form */}
            <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/5">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Write a Review</h4>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-white/60 text-sm">Your Rating:</span>
                <div className="flex gap-1 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star}
                      onClick={() => setUserRating(star)}
                      className={`material-symbols-outlined text-[24px] hover:scale-110 transition-transform ${userRating >= star ? 'text-yellow-400 filled' : 'text-white/20'}`}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <textarea
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Share your experience with this studio..."
                className="w-full bg-background-dark/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 mb-4 h-24 resize-none"
              ></textarea>
              <div className="flex justify-end">
                <button 
                  onClick={handleSubmitReview}
                  disabled={!userComment.trim() || isSubmitting}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                    userComment.trim() && !isSubmitting
                      ? 'bg-primary text-background-dark hover:brightness-110' 
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
                      <span>Posting...</span>
                    </>
                  ) : (
                    "Post Review"
                  )}
                </button>
              </div>
            </div>

            {/* Review List */}
            <div className="flex flex-col gap-6">
              {sortedReviews.map((review) => (
                <div key={review.id} className="border-b border-white/5 pb-6 last:border-0 last:pb-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-full bg-white/10 overflow-hidden flex-shrink-0">
                      <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-bold text-white">{review.author}</h5>
                        <span className="text-xs text-white/40">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`material-symbols-outlined text-[14px] ${i < review.rating ? 'filled' : 'text-white/10'}`}>star</span>
                        ))}
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Booking Widget */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 rounded-2xl sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6">Book a Session</h3>
            
            {/* Calendar Date Picker */}
            <div className="mb-6 bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <span className="text-sm font-bold text-white">
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <button onClick={nextMonth} className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-center text-[10px] text-white/30 font-bold uppercase">{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before start of month */}
                    {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}
                    {/* Days of the month */}
                    {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                        const day = i + 1;
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                        const isSelected = isSameDay(date, selectedDate);
                        const today = new Date();
                        today.setHours(0,0,0,0);
                        const isPast = date < today;

                        return (
                            <button
                                key={day}
                                disabled={isPast}
                                onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                                    isSelected 
                                        ? 'bg-primary text-background-dark font-bold shadow-lg scale-105' 
                                        : isPast
                                            ? 'text-white/10 cursor-not-allowed'
                                            : 'text-white hover:bg-white/10'
                                }`}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center">
                    <div className="text-xs text-white/50">
                        Selected: <span className="text-white font-bold">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
            </div>

            {/* Duration Selection */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Duration</label>
              <div className="grid grid-cols-4 gap-2">
                {[2, 4, 6, 8].map((hours) => (
                   <button
                     key={hours}
                     onClick={() => setSelectedDuration(hours)}
                     className={`py-2 rounded-lg border text-sm font-bold transition-colors ${
                       selectedDuration === hours
                         ? 'bg-white text-background-dark border-white'
                         : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                     }`}
                   >
                     {hours}H
                   </button>
                ))}
              </div>
            </div>

            {/* Robust Time Selection */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Available Slots</label>
              <div className="space-y-4">
                  {timeSections.map((section) => (
                      <div key={section.label}>
                        <div className="flex items-center gap-2 mb-2 px-1">
                             <span className="material-symbols-outlined text-[14px] text-white/30">{section.icon}</span>
                             <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{section.label}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {section.slots.map((time) => {
                              const isTaken = unavailableSlots.includes(time);
                              const isSelected = selectedTime === time;
                              
                              return (
                                <button
                                  key={time}
                                  disabled={isTaken}
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-2 rounded-lg border text-sm font-medium transition-all ${
                                    isSelected
                                      ? 'bg-primary text-background-dark border-primary shadow-lg'
                                      : isTaken
                                      ? 'bg-white/5 border-transparent text-white/10 cursor-not-allowed decoration-slice line-through'
                                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30'
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                  ))}
              </div>
            </div>

            {/* Summary & Action */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">Rate</span>
                <span className="text-white font-medium">{studio.pricePerHour}</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/60 text-sm">Total ({selectedDuration} Hours)</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              <button 
                disabled={!selectedTime}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(43,238,121,0.15)] ${
                  selectedTime 
                    ? 'bg-primary text-background-dark hover:brightness-110 hover:shadow-[0_0_30px_rgba(43,238,121,0.4)]' 
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                {selectedTime ? 'Confirm Booking' : 'Select a Time'}
              </button>
              <p className="text-center text-[10px] text-white/30 mt-4 uppercase tracking-widest">
                No payment required today
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudioDetails;