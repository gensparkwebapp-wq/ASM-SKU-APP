export type SearchResult = SearchResultChannel | SearchResultVideo | SearchResultPlaylist;

export interface SearchResultChannel {
  type: 'channel';
  id: string;
  avatar: string;
  name: string;
  handle: string;
  subscribers: string;
  description: string;
}

export interface SearchResultVideo {
  type: 'video';
  id: string;
  layout: 'standard' | 'compact';
  thumbnail: string;
  duration: string;
  title: string;
  channelName: string;
  channelAvatar?: string; // Optional for compact view
  verified?: boolean;
  views: string;
  uploadDate: string;
  hasCC?: boolean;
  progress?: number; // Watch progress percentage
}

export interface SearchResultPlaylist {
  type: 'playlist';
  id: string;
  mainImage: string;
  blurImage: string;
  videoCount: number;
  title: string;
  channelName: string;
  lastUpdated: string;
}

export const searchResults: SearchResult[] = [
  {
    type: 'channel',
    id: 'ch1',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaoZfHZcqMztWqoTDH0ACJcP_bvTl7W-T8mxNq0se102hP0zZeZ5oTlk_IP4FXkgDDDhpHpRCXEKS0YjipQLGzIHIfjr3QFeDCMtYPbC7ZkQGfHckcvN5ZE5QwH2GVf5xhhrWIPnOvbDLOg09UHIQz_ndO273ZFVc6Wwf1YDl01zWjcleWXLk192YgxhlLFnvXjPKTXfZ-yAOKilxzYzg5Dbl3y1r1L59D5aaEX63LW5k2et2tqIjsWUQmsawxzon4ldUNfV0hMjI',
    name: 'Design Daily',
    handle: '@DesignDaily',
    subscribers: '482K subscribers',
    description: 'Master UI/UX design with daily tutorials and tips.',
  },
  {
    type: 'video',
    id: 'vid1',
    layout: 'standard',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDftSohqoRCUkD8NZJDgPeOWaw5wgBzJpzb1ZoxwxMfK-LDo1wVyZEiyu0ghxBYDiUjI1DiPvcMjMtYTiC-7eDmfrTMlw8Ne87-NGkGMJm9Fi4V94As2dM99C_wGhph8F9vAZS_C-0Pplnr5CW1WvbhM2yP5Jjg3d0GvbkKTVYmrwtPlNzYsNJlr3qd6NXJRWcxDWjnkhmMx-k0sagZ-cPvuUhznZ9iIJSrmcE7ppwHqjQscWi-s1mPh2qr5LC2vvvWmC0Ki6Eqapw',
    duration: '12:42',
    title: '2024 UI Design Trends You Need To Know',
    channelName: 'Design Daily',
    channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU87I9TtQIvxMbAhutvKbozLrRjRefLUyFUoiDyOcGkIiyon9A4WEXP2bsOTkXl0Bd1UIrjUK7mFslBkQhAmpFxJZeXCR-QPw8Ffq7Yf9m2EnM2SAlAHOPwHW9FwOWJRssZC1krziL0laH7xIGgwJZqgfvrA2EKMNa9Oy_HvAQ3tabh2lU7B2GfYzIw4Ana6sHj3ytRgIMxr5VqCcyMcv5RHQSvWKD0j9qBRlkB1nQ-aTLlQkITp57YrWAzHeEgNJLF945hJUbmf8',
    verified: true,
    views: '150K views',
    uploadDate: '2 days ago',
  },
  {
    type: 'video',
    id: 'vid2',
    layout: 'standard',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjFxhrzHHkAiYgbWcsqizqX7VR6yrV-9_tdUTPoqy7dXb3lJ3nBKf4ZwC-F_pYcvPIC_Iocxc-mJnzm-sF0OfQjUCopHGkFRomY5KSGSakq8goZOogI_C0Kr6ebKSEFWtAKB-PWUYQmuK2wv8PwfsTmA6ZKmJPsakwZpjSXq4zxL_Pc3FAw79ywFtos-Wvk6O5QNp1MkljvUcGz4_ogVd9Ph5QfDQuBUzQGe42fNEkhfL6B2sgZQDendWeVZBTcGRPaY3RIZxfL2M',
    duration: '24:15',
    title: 'Advanced CSS Layouts with Flexbox & Grid',
    channelName: 'CodeMaster',
    channelAvatar: 'https://i.pravatar.cc/40?u=codemaster',
    verified: false,
    views: '89K views',
    uploadDate: '1 week ago',
    hasCC: true,
    progress: 75,
  },
  {
    type: 'playlist',
    id: 'pl1',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYSMNDJGeb-uxRMm-LK3Qu5Cgjlv2ss9yJH55IQWi7jNq5w8woODM3MlihSdY05d6Lg4flRsnodMdQBDlraaIvxtizdROu6tglrJK0ASDj5UYVMA5EU50pYctzz01dAHyENhOgnstTc9OXibd7vLgoP6yGbdXrTPF_ye_4ynrqZMQ3HIPqk6k6QltjBL4zJtPhduwsEe2esuouY0fs_2VexDe1-cEuYz0uEIIe1W9GNr0M3PxU9xeqaPQqhP78vRjwoimH5EqqXE8',
    blurImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3fpuEhlTChtCKT5z4IOEhP6fjUWtAVVgwPJuZMM51cjCH-qz450FSfUqD7-Ak1YyxM4BBkP8BLMOZkK892zrs89JYHjmFAsKIENQLogNBMWEcMWc4WMU_gK8dAHoN_Ke-Btf_uMQbMRV4zvOyj9qpFetfTkx4Zd5u9PW0QSDqDjTZ8GDTYTUQ0ZULMGsSelRdZmti52lp5d6C-M6SzvAXLMym0RwtcAufLdrPBzTYcHIav1VsAoeDjXCpJtXep--KJ59M49iyhms',
    videoCount: 12,
    title: 'Full Figma Course 2024',
    channelName: 'Design Daily',
    lastUpdated: 'Updated today',
  },
  {
    type: 'video',
    id: 'vid3',
    layout: 'compact',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZLZmx--VWZvlci5KRIMzTwd2rufeNwWwpftkhvlDcqGNoB7u8d06fwtU7fBb4dA8GIqnN25FuqyVOcZd_35Xqe9eXGQAmR0rdxV0rio7kEuH6mOpj_G80WXPxYiiHalUFK-07kWRkM9XDrT97h0hYlYZ5BD0XX7xHOtpFP2W-_hclQPGq_168fse8JHY_ZdqgZOO9V39nr7AXQ7GzBltNNR0FFtK-AjBGXS4wpg5Y5Ul2HAkC1rR_r9XBqVsdceGwH_7xDTGry8U',
    duration: '8:05',
    title: '10 Tips for Better Mobile UI Design',
    channelName: 'UX Collective',
    views: '45K views',
    uploadDate: '', // Date not shown in this layout in design
  },
];
