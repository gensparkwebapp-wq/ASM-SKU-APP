
import React, { useState } from 'react';
import { ViewState } from '../App';

interface TourStep {
    id: number;
    title: string;
    description: string;
    image: string;
    floatingIcons: string[];
}

const steps: TourStep[] = [
    {
        id: 0,
        title: "Connect with Friends",
        description: "See what your friends are up to. Sync your contacts to discover people you know and start sharing moments together.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-Lbr3ykuHLDT5VtvstGzuF4YK92wou1dIT3SlWlmRD8tZjyjYoyEjvx4tbOnLD9t9-1HEeYKvEN9c3jK08XkDHAVItuVRNrxRHOz8wdmm4gRv4gxSzErSljdrjnCNiNKa4CvAnfJahWVKgvMVl3rEQyW0lYnFoz3jDXSQ0MnDg9xNLuJKnFBMU15CNXXTgkCua2nsIzGqah9dwu_fK-RV5BVjHmrE-hwWSt9yQkz79UkM2mCXL9IvJosrIgHgxkKe1mLlGFQNlVo",
        floatingIcons: ['person_add', 'groups']
    },
    {
        id: 1,
        title: "Share Your Moments",
        description: "Easily post updates, photos, and videos to your timeline. Let your friends know what you are up to.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFgh46nrcmLVSPO7aXW87rBhgDU-38H7P6rQ3qD-vQrsYNvPGLHStUVVvNw8E_l0kCs6hKvyYCg5obNLbS7efDlJ4PpA5beC9RriXTToV6iSL9dx-RI5q2CqdResRFQVqY7sfg_g08ew9Pu49LYr7HzsKwuIS4BalLfKjhSvxTi9O92KhcYyx9iDlxHNXKFGWB5mKOPZF3dV3c1ndA1GTkX_aMyqyoHyO56hh4pNdoMeZxCYt9PHvldnu5j1vbn_KOr13p65qgGGc",
        floatingIcons: ['image', 'videocam']
    },
    {
        id: 2,
        title: "Stay Updated",
        description: "Get real-time notifications about likes, comments, and mentions so you never miss a beat in your social circle.",
        image: "https://images.unsplash.com/photo-1543321269-9d86d368095b?q=80&w=1000&auto=format&fit=crop",
        floatingIcons: ['notifications', 'favorite']
    }
];

interface TourPageProps {
    onNavigate: (view: ViewState) => void;
}

const TourPage: React.FC<TourPageProps> = ({ onNavigate }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const step = steps[currentStep];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onNavigate('register');
        }
    };

    const handleSkip = () => {
        onNavigate('register');
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display overflow-x-hidden transition-colors duration-300">
            {/* Top Navigation (Skip) */}
            <div className="flex items-center p-4 pt-8 pb-2 justify-end z-10">
                <button 
                    onClick={handleSkip}
                    className="flex w-auto items-center justify-end cursor-pointer active:opacity-70 transition-opacity hover:bg-black/5 dark:hover:bg-white/5 px-3 py-1 rounded-full"
                >
                    <p className="text-slate-500 dark:text-[#92adc9] text-base font-bold leading-normal tracking-[0.015em] shrink-0">Skip</p>
                </button>
            </div>

            {/* Main Content Wrapper */}
            <div key={currentStep} className="flex-1 flex flex-col justify-center items-center px-6 animate-in fade-in slide-in-from-right-8 duration-500">
                {/* Illustration / Hero Image with Floating Elements */}
                <div className="w-full max-w-[320px] aspect-[4/5] relative mb-8">
                    <div 
                        className="w-full h-full bg-center bg-no-repeat bg-cover rounded-xl shadow-2xl dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800 transition-all duration-700" 
                        style={{ backgroundImage: `url("${step.image}")` }}
                    ></div>
                    
                    {/* Decorative Elements to simulate floating UI parts */}
                    <div className="absolute -right-4 top-10 w-12 h-12 bg-white dark:bg-[#1A2633] rounded-xl shadow-lg flex items-center justify-center animate-bounce border border-slate-100 dark:border-white/5" style={{ animationDuration: '3s' }}>
                        <span className="material-symbols-outlined text-primary-blue text-2xl filled">{step.floatingIcons[0]}</span>
                    </div>
                    <div className="absolute -left-4 bottom-20 w-12 h-12 bg-white dark:bg-[#1A2633] rounded-xl shadow-lg flex items-center justify-center animate-bounce border border-slate-100 dark:border-white/5" style={{ animationDuration: '3.5s', animationDelay: '500ms' }}>
                        <span className="material-symbols-outlined text-primary-blue text-2xl filled">{step.floatingIcons[1]}</span>
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-center gap-2 max-w-sm">
                    <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center">
                        {step.title}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-relaxed text-center px-2">
                        {step.description}
                    </p>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="w-full px-6 pb-8 pt-4">
                <div className="flex flex-col items-center justify-end gap-6 max-w-md mx-auto">
                    {/* Page Indicators */}
                    <div className="flex flex-row items-center justify-center gap-3">
                        {steps.map((_, i) => (
                            <div 
                                key={i} 
                                className={`h-2 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-primary-blue opacity-100' : 'w-2 bg-slate-300 dark:bg-[#324d67] opacity-50'}`}
                            ></div>
                        ))}
                    </div>

                    {/* Primary Action Button */}
                    <button 
                        onClick={handleNext}
                        className="w-full bg-primary-blue hover:bg-blue-600 active:bg-blue-700 text-white text-lg font-bold h-14 rounded-full shadow-lg shadow-primary-blue/30 transition-all flex items-center justify-center group"
                    >
                        {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                        <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>
            </div>

            {/* Safe area spacing for mobile */}
            <div className="h-5 w-full shrink-0"></div>
        </div>
    );
};

export default TourPage;
