export interface MobileVideo {
  id: number;
  thumbnail: string;
  title: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  uploadDate: string;
  duration: string;
  isLive?: boolean;
}

export interface MobileShort {
  id: number;
  thumbnail: string;
  title: string;
  views: string;
}

export const mobileVideos: MobileVideo[] = [
  {
    id: 1,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBHGvTdDbZeQdVQ14n3c0eEnAPIXqsLMYwshtS_HB3ap8JevICzAgLaP0FXAggDLdbZR9WRbmbT_NbIvpBjN5yVrxXCE0r6TUtO4i8Xc4d4K5VYGCAmmUSS9sE8rqoUFVkuDGPG6ZXVQQ0uSPQzBD6faX35GjSK6RWnAWJlVaeOefN1ZJhYvgh0oMI4PDE1lTp9-Z18dLaBZLrOKTYXn5SXGqu-ulEIm2sBwXA8WDHvs_knigKi7PlaFZxHRcX4ME_C-RvqbFOc1g',
    title: 'Building a Clone App in 1 Hour - Complete Guide 2024',
    channelName: 'TechChannel',
    channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxua9y1IkRKWARUl_vr52Yj7Qvz2M3PwdVZJYw4WG1BWarT8vOvRGG0bs-Xdj3LZq8_loRrLIVm8czfB89N2kTY2bb8ERyhaZG7mwwkW-KVtlwWs__vBkVZiFQmJgf8KIkyKjuew2PsRWIWUnA8o7CdxA8ApfXX3Z5uQG_ulhPMEXwtyNmfvpIzoyYjyayifaDKGiREwWn2oEf31VSPs7X4Z8dSH7hV8Km7NDS3qiLm9R95AHgI3ufNcSwTpeFRrE2UTL9igOXwCo',
    views: '120K views',
    uploadDate: '2 days ago',
    duration: '14:20'
  },
  {
    id: 2,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1RtO4VHvHNIYV0Qj3bMlbNvQSRl9YWziJi0Oa0q2q8FKkrvw2IolavZkQmMS-qsdJfD6TR98jXD2-IdFYyY7geHxArrKngYgBeHVTXw2gvSGrbJ5INp_V6D9sdAmxr4JKZ-lvNjco7EYtNlMEqyLeuJ0rxMRcXLs0Yi1516J17td6k0v3A11pC_gzGoG8TWLMlCWIZc5xQ6qtiwHg7_hxOYcGqID2LBdHC7IRtlLCBrf_2EHt2NcGKWt4bJkIFVaA4uo4qMzz8p8',
    title: 'Top 10 Travel Destinations 2024 - Hidden Gems',
    channelName: 'Wanderlust',
    channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-GZ5GlRFT9k4MowhnaXw9v3CWwL6FjZFJTC8qfQoLIDIDF6SCw1YzPmfqmppmbVLl5teyzFxC_rPVEathHT3mVuD-AjKVx-536jQ57krbiivDGa8mGpETabUhhDhxRtTRAPQ-62dIHRAmAZoJv-PLfnT7MGj2g_JXKvgS4oZrVCmqlG-GDiTGaifeaBWTEIPVDFlqSv7CoOKSKNkxKYqOZQPoM6AvlPc2DjdgCdi26VEwSxriKyIMwzmW0-0oP2CCOYInLoge8Sw',
    views: '45K views',
    uploadDate: '5 hours ago',
    duration: '08:45'
  },
  {
    id: 3,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCshCIAUexmTZRBjn8CISvn5Ucvj0A8_c0hsO9AmVK7y4Xaactaw02AUXzYUoItAKYX-sAZqC0Ds2O4msVWSSI1pXIOuxwl7pZKpbQX6BetKjU5Xac-GMRiv0kgfx1_cc2UU0ayzaZrWWQI_G5ee3_jDxiq_IIdHtMSLQSXwBCSTrEZ05qVthVJ7EHUXkrFMbeyGyP5Tf1l_i80np9FoHR_cuafl_2b154k5zr6El8dQ17R3iK6YdZX2AW6pla161YoaztU0mCGBao',
    title: 'Live: Lo-Fi Hip Hop Radio - Beats to Relax/Study to',
    channelName: 'MusicStation',
    channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANSyfXHS-Hl-8C3ijy4tzased0r7eL5BKyY7Sv1d4VIvaDi2aqWhMex37mjNxlr68vMAs8dT9x5-AKqTuktMZncafW4RAAuZCUX-soexLFKuKr2ty6lc3K9z4F0rVOGVbYO0xFtlamXfcVzl37VmLR80evivloGi1J3mnmwAHuqicnOI7259etewXVZwKqtW13fu-iaD3dSWUxcaB8wcZb-rkJ7-d-NMV545W2XRd6HBGud0w9XbW4qMIdUQJSUlR9WcGl2MHojhA',
    views: '12K watching',
    uploadDate: '',
    duration: 'LIVE',
    isLive: true
  }
];

export const mobileShorts: MobileShort[] = [
  { id: 1, thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-tKayv98mB7dsgn2QtY09e4u9ud-c4BhGDsvHVcBBvebuJVr4NWPwU-wdH7Iq2wRE2zjgSh6yVF544Lakhrm9T5YEZ-VGHnYFGe8T_tQDwkkq7V5qb7FdRGlM2IaCrezq-vwqeGC-MrAYEQ_eKGvoKu1K67oYBNfImg1oZ-B6-RNO6PiwpN0mRZyYx4Bb5VF6-upybQptVgqjmN23dFAuUxAQaP9aNqHp2ccBQp_81zcJKBIEfmR0oW3jRj3QKNF_z3997bW0poc', title: 'Vibe check at the concert! 🎸', views: '1.2M views' },
  { id: 2, thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6pqEjnEPcnYn6J6gLNPHqPxlYGO0PNf4OnEKWUG69Ylyl9k9eoHWvckD7N7t-i-xE0OydkFlV-h7yi6pEDQLN7NOIU6itiD_0KCFu2nN6tEuWSbu5MaHI2KZH4M1600SteiMFOOr58lAQw7FLuEZUPJqSAeY_v81HgOULHyHgv199kf0T8pMdfGEAdQqtKavPbSx-8Z1lXTvHMrc2dBIPxQ-UyHtS98ej7hURhA-63ZjZsCD5cYYb9y6cX4DYeXwnAXvFCSp-52k', title: 'Healthy meal prep ideas 🥗', views: '856K views' },
  { id: 3, thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu2VKS3Rw5Xvqr10lVTeraPFIRODYC82bcOnd0PbB1OKFb3p0jAQ26AXjkrIPBDkv9ODqlxQJndJUG88fCSwWr92yx1-YuHAc7ihrQLEWUomDSL7WbUddlgkJeDlZH-hEZieYEVTaOld_dIXFL0ecRLii2WGMgTB3IfxmPhgTjFk1h1N3euczkIsydfNiz5ilQSeSqlRUrgXHmIKgGOXDxVlUSZyOeOHnhpVQr93HQlJkRmRXi4Ylvdtst1udhDoerf1Ywc3AQp5I', title: 'Never skip leg day 🏋️‍♂️', views: '2.1M views' },
  { id: 4, thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEcXxO6Kb5wa1IHgxrGVNwhuIV2ri1tMlp4lP7pSKvpdqz7CcXjp8uzcSN-Kq6x2fCeU-kXTlBiMRCfH3Sh_jAXaM35wV4XKYN4LWxT38BZFdZ7cREzQhvepUgGZWvvw02J7q8boMbaLLsAMz5uf5ZJNshR9o2XaR9YFf9KlFtbZfW6B42-8oyobkCjAjqDLpITuBhIQOEWrr81zyvCFR2xNmWAdibjJ8G6WpqIcaloSY3H9sTND5yv5zC-FGWFBVFAz5LNeBiuVc', title: 'Nature is scary ⛈️', views: '45K views' },
];
