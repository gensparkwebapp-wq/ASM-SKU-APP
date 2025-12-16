export const analytics = {
  subscribers: { value: "24.5K", change: "+140" },
  views: { value: "1.2M", change: "+12%" },
  watchTime: { value: "900h", change: "+5%" },
  revenue: { value: "$124.5", change: "+8%" },
};

export const channelHealth = {
  overallStatus: 'Good',
  uploadConsistency: 85, // percentage
  audienceEngagement: 65, // percentage
};

export const notifications = [
  { id: 1, type: 'copyright', severity: 'high', message: 'Copyright claim on "Vlog #4: Studio Tour"', time: '2h ago' },
  { id: 2, type: 'monetization', severity: 'medium', message: 'Limited ads on "Figma Tutorial for Beginners"', time: '1d ago' },
  { id: 3, type: 'community', severity: 'low', message: 'New comment from Sarah Jenkins', time: '5h ago' },
  { id: 4, type: 'review', severity: 'low', message: 'A comment on "How to Design UI" is held for review', time: '8h ago' },
];

export const scheduledContent = [
    { date: new Date(), type: 'video', title: 'UI Design Guide' },
    { date: new Date(Date.now() - 86400000 * 2), type: 'post', title: 'AMA Post' },
    { date: new Date(Date.now() + 86400000 * 1), type: 'live', title: 'Live Q&A' },
    { date: new Date(Date.now() + 86400000 * 3), type: 'video', title: 'New Vlog Scheduled' },
];


export const latestVideo = {
  thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByPfVSbU7jqIhBNUWjYbU8NqnA2HSwL2thlkRNGcFrFArhaA1sUWUpS9qXS9rbbGpR0uRFKwUART8jbHUb5ZM6OaBFKFqkIkIsg6bcTFhXs_X7KUK7YUrSUb78sJzGd-JFvm9k4l6QTXYZOv8TKUSFdAJwKAJNQuUhlzc3pywF1BOdoqA4aU0Y2NAzTiQuBghMmkn1dTriMevF1EiIulxTp0cqo4BHE71qnLLwhvpuIScWqYsE5a28YxxCEl5pF7MiSLemIppTn_E',
  duration: '12:43',
  ranking: '1 of 10',
  title: 'How to Design UI in 2024 - Complete Guide',
  stats: [
    { label: 'Views', value: '10.2K', status: 'check_circle' },
    { label: 'Click-through rate', value: '5.4%', status: 'check_circle' },
    { label: 'Average view duration', value: '4:32', status: 'arrow_right_alt' },
  ]
};

export const recentUploads = [
  { 
    id: 1, 
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsn9iVEH6aTNevysG1KTkRPzHfCBRUf366Mmj-bmwf8za9f-BzOoCIeHmMRIXt6aTb-pnzw8lOfakxXvQmR8GkWJmNoCdM8H2W-JU5CNbz03HEhV0Ib6mQZT5uGm4YJjh-1V0rHYhr0V5Re3fisRclANSdYfklyJ9IVeCEgaH2EFOkZ_M7D_vyZN3dLs6rlXxsXfZyTOkVc-bU1_v9tNVPJ8w91haJ4oxpejUneGLT5FjVCQIt1rsS3Ypl3E0J1rEIg7vDku4hgEA', 
    title: 'Vlog #4: Studio Tour', 
    date: 'Oct 24, 2023', 
    views: '3.4K', 
    visibility: 'public' 
  },
  { 
    id: 2, 
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7-o8jjvYMe4IGUoKzF_n7wTUETuAkBOcVQioE0Rwvpe-ibj8z-2XuB-bqhKZUlQlvdhKIUCdhhLzyVcANgMrW4Q3t-sOUih38-Udk43uMnpSlaT6mBVQA5Hjy8nl-cowxYIGE4uwa8blNWC2ZnjRORDTWxib92wUEhOdj0fjmnuQTKrHSA3QRRWH4B6HHWASJRgtGO-CnPf2yI2ls2-cYzA6ZgLjg2TeMDYEC2_47v3Ei-5YfqKGp7ZY71SD-0ZKVN55V0W_2lUI', 
    title: 'Figma Tutorial for Beginners', 
    date: 'Oct 20, 2023', 
    views: '12K', 
    visibility: 'public' 
  },
  { 
    id: 3, 
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFPIULwmtlC0_O8PfO1BKw2Zyc3GEc_veR2sm3OkJfelqG9z-ab-_lB-nT1Y7bSxwJ14CxG9mLBggTRWLpOPfhQSDCdjxeWL4d3_itTK4eZZG1P09pnJntWRWtPwZ07LptE_Z78XBYL0fXMB2rbekfssoUlbR65GftTyhWvgb-BCF7Q6ON0UAgkV3SsgQQXEHulv2u839Sbbnxp-XNM2oWGDVB9Y-f2hvcJ2Xg669o3jlo4zg81zA_P37MIzTK03lua3lVjSRnI-4', 
    title: 'Q&A Special - 100K Subs!', 
    date: 'Oct 15, 2023', 
    views: '-', 
    visibility: 'lock' 
  },
];

export const latestComments = [
  { 
    id: 1, 
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-1xcQ_82Ovx8RXu8g3KVzMPFf9AUu067Lc2LrcuMijnj_Lw5O1AXJBEgatZe8bPlkAESQOGpRNt7D23bO5V4jjN0W7wHTXHO3-9I5XGro8223pE0HRAoWu2X7Ozb2BgFAWRJBkXmLXPkU5YQKvSkYz2bHSbbzHsM3H_KVy24PwzK0ZN7fkcQI0CPBNjmK5w4CSFAXhWfqHYAtONuuml9beh59PnvGA671dqdhcqlkwx8qFfZPH9_uByTI-alUZrOgDvRks6OP1Rs', 
    author: 'Sarah Jenkins', 
    time: '2h ago', 
    text: 'This tutorial was exactly what I needed! Can you cover Auto Layout next?', 
    likes: 12, 
    isHearted: false 
  },
  { 
    id: 2, 
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNYfhVbDFb8wqS3apDEQvAX535aIVp-Pvj33gYs0uPUhFQ7-tk8E9qN6WnhXuVpfZBS1ja1QxzkN8N98GxHQUry3ct_UwbCzb_e_kFrgd7J6pKaeZR3zl6bnO4beTbYL1-WbrhF7eeDKA-X4JFUbma4k_xPqkwaC8r5CWjMmH0BNoHWzsIe8Vk4ZtybX76h1ZEdqOe67GE_CrQV38JnggnGQMhMRaH19tk9uCRslWcbYtD9RfdHFaaYNw1Q92SY0pLOaeXz7ADfFs', 
    author: 'Mike Design', 
    time: '5h ago', 
    text: 'Great insights on the new UI trends. 👏', 
    likes: 3, 
    isHearted: true 
  },
];

export const contentVideos = [
  {
    id: 1,
    type: 'video',
    performanceTrend: 'up',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByPfVSbU7jqIhBNUWjYbU8NqnA2HSwL2thlkRNGcFrFArhaA1sUWUpS9qXS9rbbGpR0uRFKwUART8jbHUb5ZM6OaBFKFqkIkIsg6bcTFhXs_X7KUK7YUrSUb78sJzGd-JFvm9k4l6QTXYZOv8TKUSFdAJwKAJNQuUhlzc3pywF1BOdoqA4aU0Y2NAzTiQuBghMmkn1dTriMevF1EiIulxTp0cqo4BHE71qnLLwhvpuIScWqYsE5a28YxxCEl5pF7MiSLemIppTn_E',
    title: 'How to Design UI in 2024 - Complete Guide',
    description: 'A deep dive into the latest trends and tools for modern user interface design...',
    visibility: 'Public',
    restrictions: 'None',
    uploadDate: 'Nov 9, 2023',
    views: 10200,
    comments: 45,
    likes: 1200,
    dislikes: 30,
  },
  {
    id: 2,
    type: 'video',
    performanceTrend: 'neutral',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsn9iVEH6aTNevysG1KTkRPzHfCBRUf366Mmj-bmwf8za9f-BzOoCIeHmMRIXt6aTb-pnzw8lOfakxXvQmR8GkWJmNoCdM8H2W-JU5CNbz03HEhV0Ib6mQZT5uGm4YJjh-1V0rHYhr0V5Re3fisRclANSdYfklyJ9IVeCEgaH2EFOkZ_M7D_vyZN3dLs6rlXxsXfZyTOkVc-bU1_v9tNVPJ8w91haJ4oxpejUneGLT5FjVCQIt1rsS3Ypl3E0J1rEIg7vDku4hgEA',
    title: 'Vlog #4: Studio Tour',
    description: 'Come take a look behind the scenes at my new creative space! Showing all my gear.',
    visibility: 'Public',
    restrictions: 'None',
    uploadDate: 'Oct 24, 2023',
    views: 3400,
    comments: 112,
    likes: 450,
    dislikes: 15,
  },
  {
    id: 3,
    type: 'short',
    performanceTrend: 'down',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7-o8jjvYMe4IGUoKzF_n7wTUETuAkBOcVQioE0Rwvpe-ibj8z-2XuB-bqhKZUlQlvdhKIUCdhhLzyVcANgMrW4Q3t-sOUih38-Udk43uMnpSlaT6mBVQA5Hjy8nl-cowxYIGE4uwa8blNWC2ZnjRORDTWxib92wUEhOdj0fjmnuQTKrHSA3QRRWH4B6HHWASJRgtGO-CnPf2yI2ls2-cYzA6ZgLjg2TeMDYEC2_47v3Ei-5YfqKGp7ZY71SD-0ZKVN55V0W_2lUI',
    title: 'Quick Figma Tip #23',
    description: 'Learn the basics of Figma in this comprehensive tutorial for absolute beginners.',
    visibility: 'Public',
    restrictions: 'None',
    uploadDate: 'Dec 1, 2023',
    views: 125000,
    comments: 205,
    likes: 12100,
    dislikes: 50,
  },
  {
    id: 4,
    type: 'video',
    performanceTrend: 'up',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFPIULwmtlC0_O8PfO1BKw2Zyc3GEc_veR2sm3OkJfelqG9z-ab-_lB-nT1Y7bSxwJ14CxG9mLBggTRWLpOPfhQSDCdjxeWL4d3_itTK4eZZG1P09pnJntWRWtPwZ07LptE_Z78XBYL0fXMB2rbekfssoUlbR65GftTyhWvgb-BCF7Q6ON0UAgkV3SsgQQXEHulv2u839Sbbnxp-XNM2oWGDVB9Y-f2hvcJ2Xg669o3jlo4zg81zA_P37MIzTK03lua3lVjSRnI-4',
    title: 'Q&A Special - 100K Subs!',
    description: 'Answering all your questions to celebrate this huge milestone! Thank you all so much for the support!',
    visibility: 'Private',
    restrictions: 'None',
    uploadDate: 'Sep 15, 2023',
    views: 0,
    comments: 0,
    likes: 0,
    dislikes: 0,
  },
    {
    id: 5,
    type: 'post',
    performanceTrend: 'neutral',
    thumbnail: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500&q=80',
    title: 'Community Post: Ask Me Anything!',
    description: 'I\'ll be answering your questions live next Friday. Drop them in the comments below!',
    visibility: 'Public',
    restrictions: 'None',
    uploadDate: 'Nov 20, 2023',
    views: 0,
    comments: 250,
    likes: 1800,
    dislikes: 10,
  },
  {
    id: 6,
    type: 'video',
    performanceTrend: 'down',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80',
    title: 'My Music was Copyright Claimed',
    description: 'Talking about my experience with a recent copyright claim and how I handled it. Not for monetization.',
    visibility: 'Restricted',
    restrictions: 'Copyright',
    uploadDate: 'Nov 28, 2023',
    views: 500,
    comments: 30,
    likes: 50,
    dislikes: 5,
  },
];
