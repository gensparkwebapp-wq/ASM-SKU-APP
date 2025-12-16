import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ViewState } from '../App';
import { analytics, channelHealth, notifications, scheduledContent, latestComments, contentVideos as initialContentVideos } from '../data/creatorStudioData';

interface CreatorStudioMobilePageProps {
  onNavigate: (view: ViewState, data?: any) => void;
}

const CircularProgress: React.FC<{ percentage: number; label: string }> = ({ percentage, label }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative inline-flex items-center justify-center">
                <svg className="w-20 h-20">
                    <circle className="text-slate-200 dark:text-white/10" strokeWidth="5" stroke="currentColor" fill="transparent" r={radius} cx="40" cy="40" />
                    <circle className="text-primary" strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="40" cy="40" style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                </svg>
                <span className="absolute text-sm font-bold text-slate-900 dark:text-white">{percentage}%</span>
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
        </div>
    );
};


const CreatorStudioMobilePage: React.FC<CreatorStudioMobilePageProps> = ({ onNavigate }) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'content' | 'analytics' | 'comments' | 'earn'>('dashboard');
  const [contentLayout, setContentLayout] = useState<'list' | 'grid'>('grid');
  
  // UX Features State
  const [isLoading, setIsLoading] = useState(true);
  const [contentVideos, setContentVideos] = useState(initialContentVideos);
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof (typeof contentVideos)[0]; direction: 'asc' | 'desc' }>({ key: 'uploadDate', direction: 'desc' });
  const [activeContentType, setActiveContentType] = useState('All');
  const [quickEditMenu, setQuickEditMenu] = useState<number | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<number[]>([]);
  const [toast, setToast] = useState<{ message: string, onUndo?: () => void, id: number } | null>(null);
  const [recentlyDeleted, setRecentlyDeleted] = useState<number[]>([]);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const undoTimeoutRef = useRef<number | null>(null);

  // FIX: Moved `processedVideos` and its dependent handlers before the `useEffect` hooks.
  // This resolves the "Block-scoped variable used before its declaration" error.
  const processedVideos = useMemo(() => {
    let videos = contentVideos.filter(v => !recentlyDeleted.includes(v.id));
    
    if (activeContentType !== 'All') {
      const type = activeContentType.slice(0, -1).toLowerCase();
      videos = videos.filter(v => v.type === type);
    }

    return [...videos].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (sortConfig.key === 'uploadDate') {
        const dateA = new Date(aVal as string).getTime();
        const dateB = new Date(bVal as string).getTime();
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      if (String(aVal).toLowerCase() < String(bVal).toLowerCase()) return sortConfig.direction === 'asc' ? -1 : 1;
      if (String(aVal).toLowerCase() > String(bVal).toLowerCase()) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [contentVideos, activeContentType, sortConfig, recentlyDeleted]);

  const showActionToast = (message: string) => {
    setToast({ message, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedVideos(processedVideos.map(v => v.id));
    } else {
      setSelectedVideos([]);
    }
  };

  const handleBulkDelete = () => {
    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    
    const itemsToDelete = [...selectedVideos];
    setRecentlyDeleted(prev => [...prev, ...itemsToDelete]);
    
    setToast({
        message: `${itemsToDelete.length} item(s) deleted.`,
        onUndo: () => {
            setRecentlyDeleted(prev => prev.filter(id => !itemsToDelete.includes(id)));
            if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
            setToast(null);
        },
        id: Date.now()
    });

    setSelectedVideos([]);

    undoTimeoutRef.current = window.setTimeout(() => {
        setToast(null);
    }, 5000);
  };

  // FIX: The original monolithic useEffect was logically flawed, causing a type error and incorrect behavior.
  // It has been split into multiple, focused useEffect hooks to correctly manage side effects.

  // Effect for "run once" logic like showing a help modal and setting up a continuous interval.
  useEffect(() => {
    // Show help modal on first visit
    if (localStorage.getItem('hasSeenStudioHelp') !== 'true') {
        setShowHelpModal(true);
        localStorage.setItem('hasSeenStudioHelp', 'true');
    }

    // Real-time view count simulation
    const interval = setInterval(() => {
        setContentVideos(prevVideos => {
            return prevVideos.map(video => {
                if (Math.random() > 0.7) { // Randomly update some videos
                    return { ...video, views: video.views + Math.floor(Math.random() * 10) };
                }
                return video;
            });
        });
    }, 3000);
    
    return () => {
        clearInterval(interval);
    };
  }, []); // Empty dependency array ensures this runs only once on mount.

  // Effect for handling the loading state simulation when the active view changes.
  useEffect(() => {
    // Simulate loading for content tab
    if (activeView === 'content') {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    } else {
        setIsLoading(false);
    }
  }, [activeView]);

  // Effect for handling keyboard shortcuts.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (activeView !== 'content') return;

        if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
            e.preventDefault();
            handleSelectAll({ target: { checked: true } } as any);
            showActionToast('All items selected');
        } else if (e.key === 'Delete' || e.key === 'Backspace') {
            if (selectedVideos.length > 0) {
                handleBulkDelete();
            }
        } else if (e.key === 'Escape') {
            setSelectedVideos([]);
            showActionToast('Selection cleared');
        }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView, selectedVideos, processedVideos]);
    
  const bottomNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 'content', label: 'Content', icon: 'video_library' },
    { id: 'analytics', label: 'Analytics', icon: 'bar_chart' },
    { id: 'comments', label: 'Comments', icon: 'comment' },
    { id: 'earn', label: 'Earn', icon: 'monetization_on' },
  ];

  const contentFilterChips = ['All', 'Videos', 'Shorts', 'Live', 'Posts'];

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'Public': return { icon: 'public', color: 'text-emerald-500' };
      case 'Private': return { icon: 'lock', color: 'text-yellow-500' };
      case 'Unlisted': return { icon: 'link', color: 'text-blue-400' };
      case 'Restricted': return { icon: 'gavel', color: 'text-red-500' };
      default: return { icon: 'help', color: 'text-slate-500' };
    }
  };
  
  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return { icon: 'arrow_upward', color: 'text-emerald-500' };
      case 'down': return { icon: 'arrow_downward', color: 'text-red-500' };
      default: return { icon: 'horizontal_rule', color: 'text-slate-500' };
    }
  };
  
  const getNotificationStyle = (type: string, severity: string) => {
    const base = { icon: 'info', color: 'text-blue-400', severityColor: 'bg-blue-500/20' };
    switch (type) {
        case 'copyright': base.icon = 'gavel'; base.color = 'text-red-400'; break;
        case 'monetization': base.icon = 'monetization_on'; base.color = 'text-yellow-400'; break;
        case 'community': base.icon = 'groups'; base.color = 'text-sky-400'; break;
        case 'review': base.icon = 'rate_review'; base.color = 'text-purple-400'; break;
    }
     switch (severity) {
        case 'high': base.severityColor = 'bg-red-500/20'; break;
        case 'medium': base.severityColor = 'bg-yellow-500/20'; break;
        case 'low': base.severityColor = 'bg-sky-500/20'; break;
    }
    return base;
  };

  const handleSort = (key: keyof (typeof contentVideos)[0]) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleSelectVideo = (id: number) => {
    setSelectedVideos(prev => 
      prev.includes(id) ? prev.filter(vid => vid !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    const selectedData = contentVideos.filter(v => selectedVideos.includes(v.id));
    if (selectedData.length === 0) return;

    const headers = Object.keys(selectedData[0]).join(',');
    const rows = selectedData.map(row => 
        Object.values(row).map(value => 
            `"${String(value).replace(/"/g, '""')}"`
        ).join(',')
    );
    
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'content_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showActionToast('CSV export started.');
  };
  
  const renderDashboard = () => {
    const topContent = [...contentVideos].sort((a, b) => b.views - a.views).slice(0, 3);

    const today = new Date();
    const calendarDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - today.getDay() + i); // Start from Sunday
        return date;
    });

    const isSameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
      
    return (
    <div className="flex flex-col gap-8 px-4 py-4">
      {/* Channel Analytics (Quick Stats) */}
      <section>
        <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-3">Channel Analytics</h3>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(analytics) as Array<keyof typeof analytics>).map(key => (
            <div key={key} className="flex flex-col gap-1 rounded-xl bg-white dark:bg-white/5 p-4 border border-slate-100 dark:border-white/5 shadow-sm">
              <p className="text-slate-500 dark:text-[#cb9090] text-xs font-medium uppercase tracking-wider">{key}</p>
              <div className="flex items-end justify-between">
                <p className="text-slate-900 dark:text-white text-2xl font-bold leading-none">{analytics[key].value}</p>
                <span className="text-emerald-500 text-xs font-bold flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">{analytics[key].change}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Important Notifications */}
      <section>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-3">Important Notifications</h3>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-transparent divide-y divide-slate-100 dark:divide-white/10">
              {notifications.map(n => {
                  const { icon, color, severityColor } = getNotificationStyle(n.type, n.severity);
                  return (
                      <div key={n.id} className="flex items-center gap-3 p-4">
                          <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${severityColor}`}>
                              <span className={`material-symbols-outlined text-sm ${color}`}>{icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-800 dark:text-white truncate">{n.message}</p>
                              <span className="text-xs text-slate-400 dark:text-slate-500">{n.time}</span>
                          </div>
                          <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">chevron_right</span>
                      </div>
                  );
              })}
          </div>
      </section>

      {/* Channel Health */}
      <section>
        <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-3">Channel Health</h3>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-transparent p-4 flex flex-col sm:flex-row items-center justify-around gap-4">
            <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Overall Status</p>
                <div className="bg-emerald-500/10 text-emerald-500 text-sm font-bold px-4 py-2 rounded-full border border-emerald-500/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>{channelHealth.overallStatus}</span>
                </div>
            </div>
            <CircularProgress percentage={channelHealth.uploadConsistency} label="Upload Consistency" />
            <CircularProgress percentage={channelHealth.audienceEngagement} label="Audience Engagement" />
        </div>
      </section>

      {/* Content Calendar */}
      <section>
        <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-3">Content Schedule</h3>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-transparent p-4">
            <div className="flex justify-between">
                {calendarDays.map((day, i) => {
                    const dayContent = scheduledContent.filter(c => isSameDay(c.date, day));
                    const isToday = isSameDay(day, new Date());
                    return (
                        <div key={i} className="flex flex-col items-center gap-2 w-12 text-center">
                            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                            <div className={`size-8 rounded-full flex items-center justify-center font-bold text-sm ${isToday ? 'bg-primary text-white' : 'text-slate-800 dark:text-white'}`}>{day.getDate()}</div>
                            <div className="h-8 space-y-1">
                                {dayContent.map((c, idx) => {
                                    const color = c.type === 'video' ? 'bg-primary' : c.type === 'live' ? 'bg-sky-500' : 'bg-green-500';
                                    return <div key={idx} className={`w-1.5 h-1.5 rounded-full mx-auto ${color}`} title={c.title}></div>
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </section>

      {/* Top Performing Content */}
      <section>
        <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-3">Top Performing Content <span className="text-sm font-medium text-slate-400 dark:text-white/50 ml-1">Last 28 days</span></h3>
        <div className="flex flex-col gap-3">
          {topContent.map((video, index) => {
            const likesRatio = (video.likes ?? 0) + (video.dislikes ?? 0) > 0 ? ((video.likes ?? 0) / ((video.likes ?? 0) + (video.dislikes ?? 0))) * 100 : 0;
            const trendInfo = getTrendIcon((video as any).performanceTrend);
            return (
              <div key={video.id} className="flex items-center gap-4 p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-transparent shadow-sm">
                <div className="text-2xl font-bold text-slate-300 dark:text-white/30 w-6 text-center">{index + 1}</div>
                <div className="relative h-14 w-24 shrink-0 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover"/>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold truncate text-slate-800 dark:text-white">{video.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-[#cb9090] mt-1.5">
                    <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span><span className="transition-colors duration-500">{video.views.toLocaleString()}</span></div>
                    <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">thumb_up</span><span>{Math.round(likesRatio)}%</span></div>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-lg ${trendInfo.color}`}>{trendInfo.icon}</span>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Latest Comments */}
      <section className="pb-8">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-3">Latest Comments</h3>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-transparent divide-y divide-slate-100 dark:divide-white/10">
          {latestComments.map(comment => (
            <div key={comment.id} className="flex gap-3 items-start p-4">
              <div className="size-8 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${comment.avatar}')` }}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center"><p className="text-xs text-slate-500 dark:text-[#cb9090] font-medium">{comment.author} • {comment.time}</p></div>
                <p className="text-sm text-slate-800 dark:text-white mt-1 leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    )
  };

  const renderSkeletonLoader = () => (
    <div className="p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`flex ${contentLayout === 'grid' ? 'flex-col' : 'items-center gap-4'}`}>
                <div className={`animate-pulse bg-slate-200 dark:bg-white/5 rounded-lg ${contentLayout === 'grid' ? 'w-full aspect-video' : 'h-20 w-36 shrink-0'}`}></div>
                <div className={`flex-1 ${contentLayout === 'grid' ? 'mt-3' : ''}`}>
                    <div className="h-4 bg-slate-200 dark:bg-white/5 rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-slate-200 dark:bg-white/5 rounded w-1/2 mt-2 animate-pulse"></div>
                </div>
            </div>
        ))}
    </div>
  );

  const renderEmptyState = () => (
      <div className="text-center py-20 px-4">
          <div className="flex items-center justify-center size-20 rounded-full bg-slate-100 dark:bg-white/5 mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-slate-400 dark:text-white/40">video_library</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">No content yet</h3>
          <p className="text-slate-500 dark:text-white/50 mt-2 mb-6 max-w-sm mx-auto">Upload your first video to get started. Your content will appear here once it's processed.</p>
          <button className="bg-primary text-background-dark font-bold py-2.5 px-6 rounded-lg hover:brightness-110 transition-all">Upload Video</button>
      </div>
  );

  const renderContentList = () => {
    const isAllSelected = processedVideos.length > 0 && selectedVideos.length === processedVideos.length;

    return (
    <section>
      <div className="sticky top-[68px] z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 pt-4 pb-2">
        {selectedVideos.length > 0 ? (
           <div className="flex items-center justify-between h-10 animate-in fade-in duration-200">
             <h3 className="text-base font-bold">{selectedVideos.length} selected</h3>
             <div className="flex items-center gap-2">
                <button onClick={handleExportCSV} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-sm font-semibold"><span className="material-symbols-outlined text-base">download</span>Export CSV</button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-sm font-semibold"><span className="material-symbols-outlined text-base">edit</span>Edit</button>
                <button onClick={handleBulkDelete} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-sm font-semibold text-red-400"><span className="material-symbols-outlined text-base">delete</span>Delete</button>
             </div>
           </div>
        ) : (
          <div className="flex items-center justify-between h-10">
            <h3 className="text-slate-900 dark:text-white text-xl font-bold">Channel Content</h3>
            <div className="flex items-center bg-white/5 p-1 rounded-lg border border-white/10">
              <button onClick={() => setContentLayout('grid')} className={`p-1.5 rounded-md transition-colors ${contentLayout === 'grid' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}><span className="material-symbols-outlined">grid_view</span></button>
              <button onClick={() => setContentLayout('list')} className={`p-1.5 rounded-md transition-colors ${contentLayout === 'list' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}><span className="material-symbols-outlined">view_list</span></button>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3 flex gap-2 overflow-x-auto hide-scrollbar border-b border-black/5 dark:border-white/5">
        {contentFilterChips.map(chip => (
          <button key={chip} onClick={() => setActiveContentType(chip)} className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition ${activeContentType === chip ? 'bg-slate-900 dark:bg-white text-white dark:text-black' : 'bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10'}`}>
            {chip}
          </button>
        ))}
      </div>
      
      <div className="px-4 py-3 flex items-center border-b border-black/5 dark:border-white/5">
        <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} className="size-4 bg-transparent rounded border-2 border-slate-400 dark:border-white/40 text-primary focus:ring-primary/50" />
        <label className="text-xs text-slate-500 dark:text-white/50 ml-3 font-semibold">Select all</label>
      </div>

      {isLoading ? renderSkeletonLoader() : processedVideos.length === 0 ? renderEmptyState() : contentLayout === 'list' ? (
        <div className="flex flex-col">
          {processedVideos.map(video => {
            const isSelected = selectedVideos.includes(video.id);
            const likesRatio = (video.likes ?? 0) + (video.dislikes ?? 0) > 0 ? ((video.likes ?? 0) / ((video.likes ?? 0) + (video.dislikes ?? 0))) * 100 : 0;
            const visibilityInfo = getVisibilityIcon(video.visibility);
            const trendInfo = getTrendIcon((video as any).performanceTrend);
            const isExpanded = expandedDescriptions.includes(video.id);

            return (
              <div key={video.id} className={`flex flex-col border-b border-black/5 dark:border-white/10 transition-colors ${isSelected ? 'bg-primary/10' : 'bg-transparent'}`}>
                <div className="flex items-center gap-4 p-4">
                  <input type="checkbox" checked={isSelected} onChange={() => handleSelectVideo(video.id)} className="size-4 bg-transparent rounded border-2 border-slate-400 dark:border-white/40 text-primary focus:ring-primary/50" />
                  <div className="relative h-20 w-36 shrink-0 bg-cover bg-center rounded-lg overflow-hidden" style={{ backgroundImage: `url('${video.thumbnail}')` }}></div>
                  <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">{video.title}</h4>
                      <p className={`text-xs text-slate-400 dark:text-slate-500 mt-1 transition-all ${isExpanded ? 'line-clamp-none' : 'line-clamp-2'}`}>{(video as any).type === 'post' ? 'Community Post' : video.description}
                      {video.description.length > 100 && <button onClick={() => setExpandedDescriptions(prev => isExpanded ? prev.filter(id => id !== video.id) : [...prev, video.id])} className="text-primary font-bold ml-1">{isExpanded ? 'Show less' : 'Show more'}</button>}
                      </p>
                  </div>
                  <div className="relative">
                    <button onClick={() => setQuickEditMenu(quickEditMenu === video.id ? null : video.id)} className="self-start text-slate-400 dark:text-white/50 p-1 -m-1"><span className="material-symbols-outlined">more_vert</span></button>
                    {quickEditMenu === video.id && (
                        <div className="absolute right-0 top-8 z-20 w-48 bg-surface-light dark:bg-surface-dark-search rounded-lg shadow-lg border border-black/5 dark:border-white/10 animate-in fade-in zoom-in-95">
                            <button className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"><span className="material-symbols-outlined text-base">edit</span>Edit</button>
                            <button className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"><span className="material-symbols-outlined text-base">link</span>Get link</button>
                            <button className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"><span className="material-symbols-outlined text-base">download</span>Download</button>
                            <div className="h-px bg-black/5 dark:bg-white/10 my-1"></div>
                            <button className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 text-red-500"><span className="material-symbols-outlined text-base">delete</span>Delete</button>
                        </div>
                    )}
                  </div>
                </div>
                {(video as any).type !== 'post' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 p-4 pt-0 text-xs">
                    <div className="flex flex-col gap-1"><span className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase">Visibility</span><div className="flex items-center gap-1.5 font-semibold"><span className={`material-symbols-outlined text-sm ${visibilityInfo.color}`}>{visibilityInfo.icon}</span><span>{video.visibility}</span></div></div>
                    <div className="flex flex-col gap-1"><span className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase">Date</span><span className="font-semibold">{video.uploadDate}</span></div>
                    <div className="flex flex-col gap-1"><span className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase">Views</span><div className="flex items-center gap-1"><span className="font-semibold transition-colors duration-500">{video.views.toLocaleString()}</span><span className={`material-symbols-outlined text-sm ${trendInfo.color}`}>{trendInfo.icon}</span></div></div>
                    <div className="flex flex-col gap-1"><span className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase">Comments</span><span className="font-semibold">{video.comments}</span></div>
                    <div className="flex flex-col gap-1"><span className="text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase">Likes 👍</span><div className="flex items-center gap-2 font-semibold"><span>{Math.round(likesRatio)}%</span></div></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 p-4">
           {processedVideos.map(video => {
            const isSelected = selectedVideos.includes(video.id);
            const likesRatio = (video.likes ?? 0) + (video.dislikes ?? 0) > 0 ? ((video.likes ?? 0) / ((video.likes ?? 0) + (video.dislikes ?? 0))) * 100 : 0;
            const trendInfo = getTrendIcon((video as any).performanceTrend);
            return(
              <div key={video.id} className={`bg-white dark:bg-white/5 rounded-xl overflow-hidden group border transition-all ${isSelected ? 'border-primary shadow-lg' : 'border-slate-100 dark:border-transparent'}`}>
                <div className="relative aspect-video w-full">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2">
                    <input type="checkbox" checked={isSelected} onChange={() => handleSelectVideo(video.id)} className="size-5 bg-black/30 rounded border-2 border-white/50 text-primary focus:ring-primary/50 backdrop-blur-sm" />
                  </div>
                   <button onClick={() => setQuickEditMenu(quickEditMenu === video.id ? null : video.id)} className="absolute top-2 right-2 size-7 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-sm">more_vert</span></button>
                    {quickEditMenu === video.id && (
                        <div className="absolute right-2 top-10 z-20 w-40 bg-surface-light dark:bg-surface-dark-search rounded-lg shadow-lg border border-black/5 dark:border-white/10 animate-in fade-in zoom-in-95 text-left">
                           <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"><span className="material-symbols-outlined text-base">edit</span>Edit</button>
                           <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-black/5 dark:hover:bg-white/5"><span className="material-symbols-outlined text-base">delete</span>Delete</button>
                        </div>
                    )}
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 h-10">{video.title}</h4>
                  <div className="flex flex-col gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">visibility</span><span className="transition-colors duration-500">{video.views.toLocaleString()}</span><span className={`material-symbols-outlined text-sm ${trendInfo.color}`}>{trendInfo.icon}</span></div>
                    {(video as any).type !== 'post' && <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">thumb_up</span><span>{Math.round(likesRatio)}%</span></div>}
                    <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">calendar_today</span><span>{video.uploadDate}</span></div>
                  </div>
                </div>
              </div>
            )
           })}
        </div>
      )}
    </section>
  )};

  const renderActiveView = () => {
    switch(activeView) {
        case 'dashboard': return renderDashboard();
        case 'content': return renderContentList();
        default: return <div className="p-8 text-center text-slate-500 dark:text-slate-400">Section coming soon...</div>
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-x-hidden pb-24 min-h-screen">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-white/10" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_XWSzi1pNpavfOz1wxtWSJGFSlT_736BjGNOI385J4TefkeuVyxbUP3_5GzvUnauPhOF_X4uL9TRBnjbHflp-BJ5e7cIitLo2xQzbYBvZpwK9204JFY6Q9mrlsj9qENA5ztqG9G8Abng362V-F0i4RYcneZoxYa28gCQtW6kUPWFqPENCYZkFHSTDErLa2u1F-ImRABWGIJPY9y8g0K67isucG1Y6u_fCL7ijpL7bCHF7-xa6rFDdXtt1a9saNLQ7gchXWs8lTxo")` }}></div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight capitalize">{activeView}</h2>
        </div>
        <div className="flex items-center justify-end gap-1">
          <button className="flex items-center justify-center rounded-full size-10 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-[#cb9090]"><span className="material-symbols-outlined">search</span></button>
          <button className="relative flex items-center justify-center rounded-full size-10 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-[#cb9090]"><span className="material-symbols-outlined">notifications</span><span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></span></button>
        </div>
      </header>
      
      {renderActiveView()}

      {showHelpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setShowHelpModal(false)}>
            <div className="bg-surface-dark-search border border-white/10 rounded-2xl w-full max-w-md p-6 text-center animate-in fade-in zoom-in-95" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-white mb-3">Welcome to your Studio!</h2>
                <p className="text-sm text-white/60 mb-6">We've added some powerful new features to help you manage your content:</p>
                <ul className="text-left space-y-3 text-sm mb-6">
                    <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-0.5">select_all</span><div><span className="font-bold">Bulk Actions:</span> Tap the checkbox on any item to select multiple videos for editing or deletion.</div></li>
                    <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-0.5">sort</span><div><span className="font-bold">Sorting:</span> In list view, tap column headers like 'Date' or 'Views' to sort your content.</div></li>
                    <li className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-0.5">filter_list</span><div><span className="font-bold">Filtering:</span> Use the chips at the top to quickly filter by content type.</div></li>
                </ul>
                <button onClick={() => setShowHelpModal(false)} className="w-full bg-primary text-background-dark font-bold py-2.5 rounded-lg hover:brightness-110 transition-all">Got it!</button>
            </div>
        </div>
      )}

      {toast && (
        <div key={toast.id} className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-[101] bg-surface-dark-search text-white rounded-full shadow-lg border border-white/10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between px-5 py-3 gap-4">
                <span className="text-sm font-medium">{toast.message}</span>
                {toast.onUndo && <button onClick={toast.onUndo} className="text-sm font-bold text-primary hover:underline">Undo</button>}
            </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-[#1a0c0c]/90 backdrop-blur-lg border-t border-slate-200 dark:border-white/5 pb-5 pt-2 px-4 z-50">
        <ul className="flex justify-between items-center">
          {bottomNavItems.map(item => (
             <li key={item.id} className="flex flex-col items-center gap-1 w-16">
                <button onClick={() => setActiveView(item.id as any)} className={`flex flex-col items-center gap-1 group transition-colors ${activeView === item.id ? 'text-primary' : 'text-slate-400 dark:text-white/50 hover:text-slate-900 dark:hover:text-white'}`}>
                    <span className={`material-symbols-outlined text-[26px] group-hover:scale-110 transition-transform ${activeView === item.id ? 'fill-current' : ''}`}>{item.icon}</span>
                    <span className="text-[10px] font-medium">{item.label}</span>
                </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CreatorStudioMobilePage;