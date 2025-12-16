export interface Short {
    id: number;
    videoUrl: string;
    thumbnail: string;
    title: string;
    channelName: string;
    channelAvatar: string;
    views: number;
    likes: number;
    comments: number;
}

export const shorts: Short[] = [
    {
        id: 1,
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
        title: 'A Quick Jam Session!',
        channelName: 'Riya Patel',
        channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80',
        views: 1200000,
        likes: 85000,
        comments: 2100,
    },
    {
        id: 2,
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
        title: 'Crazy Guitar Riff',
        channelName: 'Vikram Singh',
        channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80',
        views: 2500000,
        likes: 120000,
        comments: 4500,
    },
    {
        id: 3,
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
        title: 'Studio Vibes',
        channelName: 'Aarav Sharma',
        channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
        views: 890000,
        likes: 62000,
        comments: 1800,
    },
    {
        id: 4,
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
        title: 'Vocal Warmups',
        channelName: 'Ananya Joshi',
        channelAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80',
        views: 540000,
        likes: 41000,
        comments: 1200,
    },
    {
        id: 5,
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
        title: 'Tabla Practice Session',
        channelName: 'Rohan Desai',
        channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80',
        views: 3100000,
        likes: 215000,
        comments: 8900,
    }
];
