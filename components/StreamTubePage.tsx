import React from 'react';
import { ViewState } from '../App';
import StreamTubeVideoCard, { StreamTubeVideo } from './StreamTubeVideoCard';

const streamTubeVideos: StreamTubeVideo[] = [
    { id: '1', thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSUCTK-ScTCYeWCiP2FAQKU9LhssdHXcs9CfemHtsNcSAECtmTicZANtuLloSTzrUxdTJ1X_kW6VVOW7brGHIBxReOxc6sFcVrOVIbDJ2GK-Qxa8SSStjIHiOB9fkW_jHrtXqEzdrEA24roQy3HLA5dXw70OhZrcm0jlbrJ1R-MBZDqhrHgoZYxFh3hHeFS6t7hrEQe5TlniCgkEpNUbsO0UeECsPEpPJGUAV2nuaNggi1ml98X0Q_tYvQ1a6xHPMUbgLffoufBr4', title: 'Building a Clone in React', channelName: 'TechGuru', channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATHqHRXQJFK_STPMtbYrbmrljFh5UausU1jiFZG0UVRaRPsXyCdX1j06G3t97qma_UHIoMkYMFVGc_64yiQQLi6LC5iZEpdP9Lhv9cyKCZiSe0BHuSd3FbfE_cYF91JQIdG08Nnn6AaIPCoZ44_-opegBgPvPopV-rfgbyH_n1ODNZSUVXPk44E9jYX5I8HEHcwLEjJwZ8jo73b4U-cJWO6_PzEJd2BDOUh8BSkUKzQl-HEgVUEDGooYLzo32GNjqsPLIHrzfxp1w', views: '120K views', uploadDate: '2 days ago', duration: '12:42' },
    { id: '2', thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB6XNdyWskseavTjaPMCB0W5orwf7Mt9BpkvPbiMBhFTRObtDGSetcOh07SnC-K6siTa9ZcAiKa1xAhobPiYMlYCd1xxuH6wLaqV8Jmv-M7Sh-baEpLzTPZj-ICngnoCqlL-qonEFuf1xYaEVVclWa7LcKg6tpDHUb2WtPdUDND5c0Zirb4rMjfoYosVnYE3MqvUc-kizkYYyd8WWsdpnxkchQNxdgR6-cW4BAkmt5ml8LkiuDWhlSnzOhLw5xwdEZnsDnz9xCZCQ', title: 'Top 10 Travel Destinations 2024', channelName: 'Wanderlust', channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdBHYMslt_qC9qKgUUfYYHMKUe2j9YQp8wkJLVpW6_zQzhGEZw1UmxOxZfAX_n0r2G7zoRyHdlYYY3cIzAdrqGOp2lAnK8heb99AGm8_Y9tivXBIXwUSUobGbuGQb3wUTJr8wqj95QhdWO_h-FRtPUt8ex6VQjCcS3FLN7Z66_kcIMm3uoDNz516f6aRkMJCq8-zFLXaVTGmybC99QPwCCigyKXM0W4hvfFzZjAYzcru-zS4x1QlFlum12fir9kyHSOP8ALDZg2k4', views: '1.2M views', uploadDate: '1 week ago', duration: '18:30' },
    { id: '3', thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy6z8cOu-E9bAqIrZkF878iogKP4FCklc2NwZgcL1mTHOpOcOxmjXgez7Kr-E2TVU2P-F-j1AB96bMkdirpJ4U_bFjQUAHDM-05Wc7Q5m6VBvWXnDjql2LRoUMXOYHWv3YtRXWg3bgdMjSHf7DF6ToEaMBK-aS-0CKENunha-e_lew0q2Wmp4AgZhFFPRpyaRls9mEf-9f6tNmGCRkOxXpH-rvtByC9DiVrcKJrwTQyzfXzqW-PknTRPp76NHC_uzZO7dsvE977pI', title: 'Live: Lo-Fi Hip Hop Radio - Beats to Relax/Study to', channelName: 'Lofi Girl', channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrAgALRKeuZRpNvdQ7hKYE6f2UsOqCnzfIHkMuYsE7WbTsll2gxIa1SX67M-wkUCRqynVBoznupv06e3ju1d2tP4gw9mFe1r6loBpPQuwr_8aK1TD8MRw3_r5r2lm4hYGH3YmHPaMP0ptAEQ3DZWrHzS33rFL0yd39X5WcAqY4Nn8hI-z4smNZCZGkI5WRZ3FcC5ojBWVzO765ycP6EcHDl9AKP8WaA18VkVAmMurl8KajliYWw4SbSZy3DWEW6uuCPLBaA5aGhIA', views: '20K watching', uploadDate: 'LIVE', duration: 'LIVE', verified: true },
    { id: '4', thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgx_4dkneuGut4xOeWJKNU8zrg43lNct7fMVqd-rkYi73HxmsutWDpeKGCLoShB74mJH3MFJjF-GSTLrPe54TfWsh6qUzlcJDpszFLkZlKk7GeoaUwbhYPxrGz97HEj-Ya89lRfL90NDNtTshyUhrsiHad9D7_6UKKroMLXt_kABn5iWiI67kR3QXXhBvNQ7NVnjnhXfH9JKPTLYheWC1QqahaWgv3-jEhfu5wUVv5ZY3QPhLO-e0E355xbrKJrw_5YrRfrwm0aWU', title: 'Spicy Noodle Challenge - Can I handle the heat?', channelName: 'FoodieChannel', channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApGtfGMLPGw09q-OjDoxsU6We4WusO0q9pRC1OPXq6SgS56mpgTYGiUH83rbeboxsEDKG3bK-Tm20iL0EHhIBuXYrUPYwDjIaCEvs9JcfirXhIE9U3BepvRcKe2ziXQ50cUJqgduAbTCkdEPJjpEWh1T2sYkogxAxhZiIcg0FRHcX4z3xA3dC_M-PsDhgl4emYsrW8ZKVuv5Ufn1gQfNLTDrHQWLLZeSAMJmLKROpnSThns7WVc6rKAhF2W7qnKOowFlWQZ2bp8C8', views: '500K views', uploadDate: '1 day ago', duration: '8:15', verified: true },
    { id: '5', thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA60TmvnBkrm-OcgDt-h4UXfDJlKRlkCCxTSvXa7QhzF3Z-uFe22msHUbQDgGTtXB63siF7LOEs6p1sWKJ3BLhlkAkhfljpCtTgCoCwkd66U_nf4qVB6JaLMzOdlbpllOFukOd2wLHFjfvHnZScoOk0vSSFi00S_EFH8aEiCrvUS1NnB7elY9HwzZpsTdsge_Swi83brP5ai5Inz4TPbsmj92otIpA3e8wl7PzGAU4XRV1pQ0agHV_SpgIUyqGuK4XIpfd_bo41MXg', title: 'SpaceX Starship Launch Full Replay', channelName: 'SpaceNews', channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqC6ym1j5S3zOBEywt0q80pv0agr2RiKf-BYpX73j2zIfWz7ejpYOZ0pnA9-qr5L1Y9lXnSC_iK4GPqfhkjEaD3TvKJyYO1Qe1S-A9oVcic3EfSHPACyqMMjnX74BmaxLgyaBU4oZaEtMFH4UzeiIYImLbt7oINKOPIEY30lFAF5KRUP5-lrWi0FiJzEGOTtglWa_TUYgfHBPx0rI3X7BIkURmIDXzeRJL1ykshF33qmjU9GFsQGYzl-GNtbDSEnVO7qMD1e_0P90', views: '3.5M views', uploadDate: '12 hours ago', duration: '45:00' },
    { id: '6', thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbSo5SFc4FykgDpQkVVz64HTbCyVmhN1wJjNa1e84keftDJSx9dSMJVHg0VfxpqEQA9IFu53kCrDKd5GVwwNMY1zmJh-a_V5t9UsmzYCilDsZBxDNeWZgW9Bq21d7-FRFpqm1eiiTctXlYlVj-VbgP5he60KE6rld-g2zgtQo6C59pGCW-5BTd1KI787-QTThLcH7d0f-HNWy_kDFkcSSCGA8trZa6WtWTYSQTUhWNv_VwOLRgM-Ax6DXXR15GNNiLojam3sHDNPM', title: 'Advanced TypeScript Patterns', channelName: 'CodeMaster', channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDz_MX2VTztFj420fjAwunCRjiIg3STch_XPAShWfKWNDRa6O0XuMcexLu6aAOo1djrSgx2a4iRveFEaGZ-h6DDbtsLeShm_lu__Y1UVxtqouGb_5kvg8IecWm8WNinr6FZ7I6_oF6Rh0cYd3fA9IK0ntBqOwxFhvZbR9Z1xKd6awMWBl9qezp3uKhyQ8d4yxbfxr7XPJ3aCeyufVqwvPsFmO0n6-DJnb7CkHmZ_5VUBsP-X3GtO14OVuFxls_APOrrKiB1sRirv8', views: '45K views', uploadDate: '5 hours ago', duration: '24:10' },
    { id: '7', thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQYIg0xkUtSzHLNxjuHDDGNU7pxc6gYitoyZh01lB4sHdQZKFnd2IP84kRe-I7T0WFzxY5BjAdTS1RjOdRZD4cjYJ_ahwgg2xlE29WhqVT8cLDLcm93qGw6IKGwjel7gFS5oXNbO8FD0be1xFKUwY6hyuGjP7k-9LByGh-fGy8CHskLCjB0e_yFjisY2yq-ZSjYFj4j3nT1fSwk-8VG0-bOlAPys6wO85Wypc4Uo9mNFN8gUNcMA3dLlEsJnnvXVTEiCXl7yqFfrM', title: 'Relaxing Rain Sounds for Sleep & Focus', channelName: 'NatureSounds', channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWYOdYDWt-iJciayFpfoI7L5ZfZ1UtR8XkslOF3UXg9w_HgneuBomIjvey4mfl7dz-ag_lSgYouB9Bp829HofmvGhs3FWVSu8GMdVZhKTCsYsSXhqkbSeukQg8F7x2zdKsd1tFW5zMTpfYjHIipvDAZI6t8lE1dtXpXCQ8vW6u_UO_iKzRz1TF4AScUDIdFfDkV7FfR9a7FYpvTSHUKI7PtYT3-tKneHTmmYEAVsM9LYVGW3ZDgtj7HpGYxrZq0u0Uarx-6IG-RlM', views: '800K views', uploadDate: '1 month ago', duration: '3:00:00' },
    { id: '8', thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUmaszqysx2Do6NwDM5szRvnDBIMqp8opDh3DihpZBAnTdEw7WIMIxGsQwDjTSuOoBv5S__NtgYxkqZp73OOKOHQqARxQFuGPnp-x2PsWnuzO44i_tzBqEIIm40_j0XIwDDQel2nxWvZym91MAXG35crVbRfaGUdbYEtTGOubeMvt06m-FPrBUDpmOfp8qqBwfe2Zu8Tvd5i_KU9j9fbED5VNbUFzRHHDsv_4kXpWUvUCVkn-vhFmSqWmbaMKThA7S1Uvpea3lSXo', title: 'Elden Ring Speedrun (World Record)', channelName: 'GamerZ', channelAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3xbxWs78iHuKBMU9BnIwAKT_8YRhnXQh3JLI3oEx3hR6DJZ4029MEo13QT5r9W5wsnlIZeXyyAOaSSYW0HjXcURHr76ZNI-XA6N_GB1R8v1sMQVxZslwFRz4WKvTx2892eVUQZBRIn3ljGkz1pdwG9HZC2Yvj2CGsKOejrCuRMlMN9xXOWcpCS_jGifsz6UAj5d7DLg4GvSz_yfviF2gvR7RaDzkymzLi3GgkKQlhZTJb2QEvyOWYK3kTSSdxXAPSmeJ4gRafHNk', views: '2M views', uploadDate: '3 days ago', duration: '42:12' },
];

const subscriptions = [
    { name: 'TechGuru', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt1W0Y5Ne4sIfu-s8rdJfpnksg2pJl__tWLYBsRC8XQcPizflrECCRnWg3HOFHu0CzMIwSQYCb2ateSjyPziK4feb7WDBJx6kW1cZkE0s5LYIVdfFjojF085UyBASU1rLUtfAxtfcRKN5xv_oaD1619OK_hek8XiM9H68_Mcb4BNBySVJDfmnhaNNDo-PnKjdugZoJwlG-cIYEgr1cK9yVf9iz8eEdAh833o3FpVKT2W_6DAUOKOMuMVB02GmWEbfF_5miHnkfvxc', live: true },
    { name: 'Wanderlust', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8Ftq9eYIRiNU8ldFdZBHml3_cjN-kK4wDthjusjTkcyRFJ6d0WTzMu8S12hr0NjpGu0q49GBNi996DuCqsqSCcEb3ATPop8PLmA-3NW6ktgOVzchjhij3FOn5NxaPq3S0lcRGMvvm8h6FXyDc-K1gVclfY8BM9XPJmUN70ZFDhzml1wIsCxouFTZfUHdo4KYnkHokroQtRW4XpA9374LTZTetErBr1BcCgIaX34QnH9bJ--YYPMQhnp0TeSqH7HHkvQs18icHK9c', live: false },
    { name: 'Lofi Girl', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD76k69iSudNfsWMfoRnsne-lOWcjUbMjBuB7Ze8qH5U85u7Qrfg2iGLSnBUAAyE24R1dW-jL-MZJ1hcNB3V77wbvvdUtOf5AwdN-elaLK8noAVz_D0__v8UYRiWhqm7jvrfph-1w_OdjYl-juECz56Rr4Zzrvssve6iymm2kU1MplljLi68XXYv7F9iXnL-Bn3iAp1mr4y1MJa2jHEwHQtrmTSVj3e3J5mHXr9I4D7bnFvjK-x8qORHlKFRrN-KZq3JLfGqJz4NM', live: true, isLiveIcon: true },
    { name: 'FoodieChannel', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtMPFXmWL4EWtb28B4y1Fze4v9KQd8thXuIrVxFqSC5mvGzRWRMnhWDsUb8IRuMNnRMuyIxa1i0iUIDKkrSogVmHKIW2iS18hXkZzTSeqrCCLGyl8kNBOXHdTrXN_nU5RweR_Wqnr4P6p7wH1gM1rcVX8sUcpKWuUDq-7ldxRumhnTleYOKOhZb3P_SZWvBGgwFb0lrjcnTet2jM9aNmXLow1ZZ_ZOcWeqZPjuv0EXCpnwDdNkQkX_vrlUTxFYDWpjMc1h0siRYfM', live: false },
];

const categories = ['All', 'Trending', 'Music', 'Tech Reviews', 'Live', 'Podcasts', 'Gaming', 'Cooking', 'News', 'Travel'];

interface StreamTubePageProps {
  onNavigate: (view: ViewState, data?: any) => void;
}

const StreamTubePage: React.FC<StreamTubePageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-screen w-full font-display text-gray-900 dark:text-white bg-[#ffffff] dark:bg-[#0f0f0f]">
        <header className="flex items-center justify-between px-4 py-2 shrink-0 z-50 bg-[#ffffff] dark:bg-[#0f0f0f] border-b dark:border-[#272727] border-gray-200">
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#272727] text-gray-800 dark:text-white">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className="flex items-center gap-1 cursor-pointer">
                    <div className="text-[#ff0000]">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '32px' }}>play_circle</span>
                    </div>
                    <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight hidden sm:block">StreamTube</h2>
                </div>
            </div>
            <div className="hidden md:flex flex-1 max-w-[720px] mx-10 items-center gap-4">
                <div className="flex w-full items-center">
                    <div className="flex flex-1 items-center h-10 overflow-hidden rounded-l-full border border-gray-300 dark:border-[#303030] bg-[#ffffff] dark:bg-[#121212] ml-8 shadow-inner focus-within:border-blue-500 dark:focus-within:border-blue-500">
                        <div className="hidden pl-4 md:flex items-center justify-center">
                            <span className="material-symbols-outlined text-gray-400">search</span>
                        </div>
                        <input className="w-full bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0 px-4" placeholder="Search" type="text"/>
                    </div>
                    <button className="h-10 px-6 bg-gray-100 dark:bg-[#222222] border border-l-0 border-gray-300 dark:border-[#303030] rounded-r-full hover:bg-gray-200 dark:hover:bg-[#303030] flex items-center justify-center">
                        <span className="material-symbols-outlined text-gray-600 dark:text-white">search</span>
                    </button>
                </div>
                <button className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-[#181818] hover:bg-gray-200 dark:hover:bg-[#303030]">
                    <span className="material-symbols-outlined text-gray-800 dark:text-white" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
                </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <button className="hidden sm:flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#272727]">
                    <span className="material-symbols-outlined text-gray-800 dark:text-white">video_call</span>
                </button>
                <button className="relative flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#272727]">
                    <span className="material-symbols-outlined text-gray-800 dark:text-white">notifications</span>
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff0000] text-[10px] font-bold text-white ring-2 ring-white dark:ring-[#0f0f0f]">9+</span>
                </button>
                <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-gray-300">
                    <img alt="User Avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBShxReeTjVMH5tnbW22OhrG6WXsIUKInVXhBAWevFLqeDw3OxRfuGFG-vbpobXiZwIBnT-V5NMIPI3HKRHo1U-1o-kGH53wrMb3BA0Ew7eqRqXI91MVttc488pPMeoQlNyI5pMKcD47A95FH8hsylzPXVqS4ozZDgd33SSotWROC2enxOvwOJSUJALw2qpWIpHfbhfcbAKBjRQMfqrFLSgBn0_IsPrWqbGCBrlCPWsOR5Kca-rlH031wyjHPCmTFPjL5tlWb-Von8"/>
                </div>
            </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
            <aside className="hidden lg:flex w-[240px] flex-col overflow-y-auto bg-[#ffffff] dark:bg-[#0f0f0f] pb-4">
                <div className="px-3 py-3">
                    <div className="flex flex-col gap-1">
                        <button onClick={() => onNavigate('streamtube')} className="flex items-center gap-5 px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#272727]"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span><span className="text-sm font-medium">Home</span></button>
                        <button onClick={() => onNavigate('wetube-subscriptions')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#272727]"><span className="material-symbols-outlined">subscriptions</span><span className="text-sm font-medium">Subscriptions</span></button>
                    </div>
                    <div className="my-3 border-t border-gray-200 dark:border-[#303030]"></div>
                    <h3 className="px-3 py-2 text-base font-semibold flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#272727] rounded-lg">You <span className="material-symbols-outlined text-xs">arrow_forward_ios</span></h3>
                    <div className="flex flex-col gap-1">
                        <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#272727]"><span className="material-symbols-outlined">history</span><span className="text-sm font-medium">History</span></button>
                        <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#272727]"><span className="material-symbols-outlined">playlist_play</span><span className="text-sm font-medium">Playlists</span></button>
                         <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#272727]"><span className="material-symbols-outlined">schedule</span><span className="text-sm font-medium">Watch later</span></button>
                         <button onClick={() => onNavigate('wetube-library')} className="flex items-center gap-5 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#272727]"><span className="material-symbols-outlined">thumb_up</span><span className="text-sm font-medium">Liked videos</span></button>
                    </div>
                    <div className="my-3 border-t border-gray-200 dark:border-[#303030]"></div>
                    <h3 className="px-3 py-2 text-base font-semibold">Subscriptions</h3>
                    <div className="flex flex-col gap-1">
                        {subscriptions.map((sub) => (
                            <button key={sub.name} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#272727]">
                                <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-500">
                                    {/* FIX: The alt attribute was incomplete, causing a type error. */}
                                    <img className="h-full w-full object-cover" src={sub.avatar} alt={sub.name} />
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px] text-left">{sub.name}</span>
                                {sub.live && (
                                    <div className="ml-auto flex items-center justify-center">
                                        {sub.isLiveIcon ? (
                                            <div className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff0000] opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff0000]"></span>
                                            </div>
                                        ) : (
                                            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                        )}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0f0f0f]">
                <div className="sticky top-0 z-20 w-full border-b border-gray-200 dark:border-[#272727] bg-gray-50/95 dark:bg-[#0f0f0f]/95 backdrop-blur-sm">
                    <div className="flex gap-3 px-4 py-3 overflow-x-auto hide-scrollbar">
                        {categories.map((category) => (
                            <button key={category} className={`flex h-8 shrink-0 items-center justify-center rounded-lg px-3 transition-colors text-sm font-medium ${
                                category === 'All' ? 'bg-gray-900 dark:bg-white text-white dark:text-black' : 'bg-gray-200 dark:bg-[#272727] hover:bg-gray-300 dark:hover:bg-[#3f3f3f]'
                            }`}>
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8 px-4 py-6">
                    {streamTubeVideos.map(video => <StreamTubeVideoCard key={video.id} video={video} />)}
                </div>
            </main>
        </div>
    </div>
  );
};

export default StreamTubePage;