export interface SubscriptionVideo {
    id: string;
    thumbnail: string;
    title: string;
    channelName: string;
    channelAvatar: string;
    views: string;
    uploadDate: string;
    duration: string;
    progress: number; // Percentage from 0 to 100
}

export const subscriptionVideos: SubscriptionVideo[] = [
    {
        id: '1',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU4L-DPjxk2rUGxWkFeeEznfwx7vnIPsoTkUQ74b18wA9EPPVmbP1YzpaJagxZ44pDnsrvIOw3EeX33zRNm5Iob4pId71Kpqkrj3k8ulVwPkwnynXW-HPnc2SqdoAN571N01C5La2L1oWbmav4MLLpIu1WrCBMBO-nKtlxQIpgvm89HonKeQltcUidlvI5nvBEH1tOJjgoWBWjX-e3cn4mCfKKtfuQQ7N9T-IKKRXUVjDs-2Wz9Mz6MELetFXc9BP5ps4CyLeN-10',
        title: 'Advanced React Patterns for 2024: Composition & Hooks',
        channelName: 'DevTips',
        channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3-z-4d-dGo4hENAw19q8hrt0Lt_GPd1bvGyH3Q-Yy8H71SPCtQJLBqdb1u2XFU6_E3oIV3p2v0OL0YM0-vkgzmomVG7YMKnaDVWuu3Kt4j5AKTF2sivYYeAwFgshxNFobFqd5EESlK_uEakJOlV-a_y0uh36fIiDeF6w0axSl_USjClQdoL1HCR3FBn6pTfHMxjtFYOzQzVFwVhAYf9VhyfqdFl7Q_J7Hxcf8guc4M14DdT7jJZp8wvAgUwH1VNwQBr2qOQXAY7s',
        views: '12K views',
        uploadDate: '2h ago',
        duration: '12:42',
        progress: 35,
    },
    {
        id: '2',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFGzGATSGHLVAvGOhmaeMmV5AWHHV470B0dBvIilITDM7aK-n5EkNN_19JqdHba-zVMRnMM-7KQ8bdQtWmC0H7NcO57JFysZsFkQswRsuz4r42brhDyPeQcMx8DzHSF-1fw3PzZlUWOqiu91VfbUKXm835IbNeDPEoOq8KGzs7muCqeGE69Y734qSaXoa4TlRhWRU7k3SrpWFjvQWK77j-aqaWy_GUnUWq7GE-E_p91ptoMOhesOLs_fXA3YO03vh8JcqDhEgT8_Y',
        title: 'UI Design Trends that will dominate 2024',
        channelName: 'DesignCourse',
        channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCTHg2Z-gzX2RbVRvjQSxDaF_W2WDOGKCxaoQq7bNMylmwT9xO0LvOtXPKx-G4g-8SUvmaKSKT1GgpGrI-ParvNuumZ6sQ4gYk1N4KsP84nPY3w5StQ8IFHqyZNKdUi0WZPMBBHsnJYvHKU_ZSdnwqUeVtFzIFFfrueL291in7joD786b2SUkDpkRT8nkYmCCjzX5xHC8or1SMMuvKzHrA2FXURiDgl-zY2llta6SQkkitOgsSJlF9CwOcQJzgqv59xHMpQJEBRPg',
        views: '34K views',
        uploadDate: '5h ago',
        duration: '08:15',
        progress: 0,
    },
    {
        id: '3',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_DaBjVJY1xhr0QdpcrDNnxLZu1tn4kuWZE3vBuWNJg5uRsxnboAM12VvNLWII8Ypc3n6H8Afu9alxEIZARq2ZberjzTITYZK1CMDlxr6JuTPPOzSsyu2qYMo3Sj-3qQKP2f7SK9QKdVEPIgNn8-7bhZj4p_hgb-gPoW84PrJUx_8lqIIp6OG4oZtajJFb2WVi-76ScQNzmKF_DgyUbMbwQRZ09FsMY2ZK3J1gzB7QpGOwGBr6hWKf_r0Nz9--lTDzieGWvR7FHH14',
        title: 'Cyberpunk 2077: Phantom Liberty - Final Review',
        channelName: 'IGN',
        channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-wmfxrSLvTH2AlB_2JoKy6vqIT4pcNdmY_nXu0e9Sz887d1FmaP_up2FZvCl8KikU32fEsG-kBUlh15brqg5HPTxcQUcImoVbiR23CdAvsDI35ExV7Ld989LT1mLsL_T6LUDiXhNKuh2iCZohWtI1Z9mebQ7oKFCnn9y1R5Mek9rjTj8Vp_jZvV5ZfjY1VYJY5FCH3FL16V_C_9tyR_T87-Xxk9sutnrR4DgJJFPcO2aXzqUUGH35Kgo5n5iZ01CdxiedT8W4Evc',
        views: '1.2M views',
        uploadDate: '1d ago',
        duration: '24:00',
        progress: 0,
    },
    {
        id: '4',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM3iWaMu28VwvAko_xY0RlJuP7HrzHBLSvBf9fh9RFE5YifLEaRt3Dnf9oQis9RJnfPfyLNx0GMRX0R6IPhwilrS78OpWPmcjR2lxyEPkoc557jaI6kR1kH1OmzUMzgAmZpXM9NNAy-ZYsage3YzQooRhWnozL472OWjXkecZiwap3VBfA6JOuirHls1uHdo_45RHJW7AL8uurHzd8e8vLX1eKPQ43nDyOVbBn5U1vMRw1mi-XYNsVo0EcCCTko-Rw6MZGJBrgAGc',
        title: 'VLOG #402: Tokyo is Another World',
        channelName: 'Casey Neistat',
        channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtOMs9CfC91AnuMdx68Jd6QEhYSfiXJvXVC2c2XAsM06iAlkEmn83HBwt8Ke4wiyXbWCCTMmETtwh90CkjJp7w4UEjORrc7Z_qZBt2K3bNJnkFZTn2ctZEGnOCSvzl7FATHaUgvwzAK9jv5aHOGVRWAOCidSRhkq0WauxURKFbx_-7aD7_28goOkc1DHbiKB0WELJBBIGvBElVRXFaSg9ETIDUJcq35L7_1fkKPmTavVRs6kAy0gx8vt2utawamtDq91LxoKBr0og',
        views: '890K views',
        uploadDate: '2d ago',
        duration: '15:30',
        progress: 90,
    }
];
