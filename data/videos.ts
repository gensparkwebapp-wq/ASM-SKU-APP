export interface Video {
    id: string;
    category: 'Music' | 'Tutorials' | 'Live Shows' | 'Podcasts' | 'Gear Reviews';
    thumbnail: string;
    title: string;
    channelName: string;
    channelAvatar: string;
    views: string;
    uploadDate: string;
    duration: string;
}

export const videos: Video[] = [
    {
        id: 'z3WWp_da_oI',
        category: 'Tutorials',
        thumbnail: 'https://img.youtube.com/vi/z3WWp_da_oI/hqdefault.jpg',
        title: 'Making a Beat from Scratch | Ableton Live Lo-fi Tutorial',
        channelName: 'Aarav Sharma',
        channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
        views: '1.2M views',
        uploadDate: '2 weeks ago',
        duration: '12:42'
    },
    {
        id: '5qap5aO4i9A',
        category: 'Music',
        thumbnail: 'https://img.youtube.com/vi/5qap5aO4i9A/hqdefault.jpg',
        title: 'lofi hip hop radio - beats to relax/study to',
        channelName: 'Lofi Girl',
        channelAvatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&h=100&fit=crop&q=80',
        views: '1.4B views',
        uploadDate: '4 years ago',
        duration: 'LIVE'
    },
    {
        id: 'lTRiuFIWV54',
        category: 'Tutorials',
        thumbnail: 'https://img.youtube.com/vi/lTRiuFIWV54/hqdefault.jpg',
        title: 'How to Mix Vocals Like a Pro (Easy Steps)',
        channelName: 'Audio Engineer School',
        channelAvatar: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=100&h=100&fit=crop&q=80',
        views: '3.2M views',
        uploadDate: '1 year ago',
        duration: '18:30'
    },
    {
        id: '4_hQyS4-g2Y',
        category: 'Live Shows',
        thumbnail: 'https://img.youtube.com/vi/4_hQyS4-g2Y/hqdefault.jpg',
        title: 'Acoustic Cafe Session - Live from Mumbai',
        channelName: 'Riya Patel',
        channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
        views: '450K views',
        uploadDate: '3 months ago',
        duration: '24:10'
    },
    {
        id: 'e1g2yX6-p4M',
        category: 'Gear Reviews',
        thumbnail: 'https://img.youtube.com/vi/e1g2yX6-p4M/hqdefault.jpg',
        title: 'My Studio Tour 2024 | Gear & Setup',
        channelName: 'Vikram Singh',
        channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80',
        views: '1.1M views',
        uploadDate: '7 months ago',
        duration: '08:15'
    },
    {
        id: 'DWcJFNfaw9c',
        category: 'Podcasts',
        thumbnail: 'https://img.youtube.com/vi/DWcJFNfaw9c/hqdefault.jpg',
        title: 'The Art of Sampling | A Documentary',
        channelName: 'Sound Academy',
        channelAvatar: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=100&h=100&fit=crop&q=80',
        views: '2.1M views',
        uploadDate: '2 years ago',
        duration: '45:00'
    },
    {
        id: '--_Kq_QE-a8',
        category: 'Gear Reviews',
        thumbnail: 'https://img.youtube.com/vi/--_Kq_QE-a8/hqdefault.jpg',
        title: 'Top 5 FREE VST Plugins for Music Producers',
        channelName: 'Beat Maker Pro',
        channelAvatar: 'https://images.unsplash.com/photo-1611262537493-5a415a99ff1e?w=100&h=100&fit=crop&q=80',
        views: '780K views',
        uploadDate: '5 months ago',
        duration: '10:05'
    },
    {
        id: '6_P6P7vG-s4',
        category: 'Live Shows',
        thumbnail: 'https://img.youtube.com/vi/6_P6P7vG-s4/hqdefault.jpg',
        title: 'Live DJ Set from a Rooftop in Jaipur',
        channelName: 'Rohan Desai',
        channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80',
        views: '980K views',
        uploadDate: '10 months ago',
        duration: '1:02:15'
    },
    {
        id: 'dQw4w9WgXcQ',
        category: 'Music',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        title: 'Never Gonna Give You Up - Official Music Video',
        channelName: 'Rick Astley',
        channelAvatar: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=100&h=100&fit=crop&q=80',
        views: '1.5B views',
        uploadDate: '14 years ago',
        duration: '03:33'
    },
    {
        id: 'Y5n9E0_n_ko',
        category: 'Podcasts',
        thumbnail: 'https://img.youtube.com/vi/Y5n9E0_n_ko/hqdefault.jpg',
        title: 'The Music Industry Explained | Podcast Ep. 42',
        channelName: 'The Insider',
        channelAvatar: 'https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=100&h=100&fit=crop&q=80',
        views: '150K views',
        uploadDate: '3 days ago',
        duration: '55:20'
    },
    {
        id: '3JZ_D3ELwOQ',
        category: 'Music',
        thumbnail: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
        title: 'Classical Indian Music for Meditation',
        channelName: 'Santoor Dreams',
        channelAvatar: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=100&h=100&fit=crop&q=80',
        views: '12M views',
        uploadDate: '2 years ago',
        duration: '3:00:00'
    },
    {
        id: '8O_MwlZ2dEg',
        category: 'Tutorials',
        thumbnail: 'https://img.youtube.com/vi/8O_MwlZ2dEg/hqdefault.jpg',
        title: 'Learn Guitar in 30 Days - Day 1: Your First Chords',
        channelName: 'Guitar Guru',
        channelAvatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=100&h=100&fit=crop&q=80',
        views: '8.5M views',
        uploadDate: '3 years ago',
        duration: '15:10'
    }
];