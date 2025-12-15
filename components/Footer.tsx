import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#0a0c0f] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">
                graphic_eq
              </span>
              <h2 className="text-white text-xl font-bold">Sangeet Kalakar</h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Empowering artists through unity, resources, and opportunity. Built
              for the creators of tomorrow's soundscapes.
            </p>
          </div>
          <div className="flex gap-12 flex-wrap">
            <div>
              <h4 className="text-white font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Artists
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Studios
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Venues
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Help Center
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Social</h4>
              <div className="flex gap-4">
                <a
                  className="size-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  href="#"
                >
                  <span className="text-xs">IG</span>
                </a>
                <a
                  className="size-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  href="#"
                >
                  <span className="text-xs">TW</span>
                </a>
                <a
                  className="size-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  href="#"
                >
                  <span className="text-xs">YT</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8"></div>
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-white/30">
          <p>© 2024 Sangeet Kalakar Union. All rights reserved.</p>
          <p>Designed for the Midnight Stage.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;