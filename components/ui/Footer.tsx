'use client'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <div className="max-w-7xl sm:px-6 sm:mt-10 mt-8 mr-auto mb-8 sm:mb-16 ml-auto pr-4 pl-4">
            <div className="relative overflow-hidden rounded-[24px] sm:rounded-[40px] border border-blue-600/20 bg-transparent backdrop-blur-sm text-blue-600 shadow-[0_8px_30px_rgba(37,99,235,0.1)] p-4 sm:p-6 md:p-8">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(37,99,235,0.08),transparent_60%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,rgba(37,99,235,0.06),transparent_60%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(37,99,235,0.1)_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]"></div>
                </div>

                <div className="relative">
                    <h2 className="text-[16vw] sm:text-[12vw] lg:text-[9vw] leading-[0.9] font-semibold tracking-tighter">
                        <span className="block">Ready to build</span>
                        <span className="block text-blue-600/60 text-[13.6vw] sm:text-[12vw] lg:text-[9vw]">something extraordinary?</span>
                    </h2>

                    <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Email */}
                        <div>
                            <p className="text-xs sm:text-sm text-blue-600/60">Get Started</p>
                            <a 
                                href="mailto:andreacrodriguez99@gmail.com" 
                                className="mt-2 inline-flex items-center gap-2 sm:gap-3 text-base sm:text-xl md:text-2xl font-medium tracking-tight text-blue-600 hover:text-blue-500 transition-colors"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5] flex-shrink-0"
                                >
                                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                </svg>
                                <span className="break-all text-sm sm:text-base md:text-xl">andreacrodriguez99@gmail.com</span>
                            </a>
                        </div>

                        {/* Call */}
                        <div>
                            <p className="text-xs sm:text-sm text-blue-600/60">Schedule a Call</p>
                            <a 
                                href="https://calendly.com/artificial-company-local/30min" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 hover:bg-blue-600 text-xs sm:text-sm font-medium text-white tracking-tight bg-blue-600 border-blue-600/20 border rounded-full mt-2 pt-2.5 sm:pt-3 pr-4 sm:pr-5 pb-2.5 sm:pb-3 pl-4 sm:pl-5 transition-colors duration-200"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="18" 
                                    height="18" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                                >
                                    <path d="M8 2v4"></path>
                                    <path d="M16 2v4"></path>
                                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                    <path d="M3 10h18"></path>
                                </svg>
                                <span>Book a Meeting</span>
                            </a>
                        </div>

                        {/* Social */}
                        <div>
                            <p className="text-sm text-blue-600/60">Follow Along</p>
                            <div className="flex flex-wrap gap-3 mt-2 items-center">
                                <a 
                                    href="#" 
                                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 tracking-tight bg-white border-blue-600/20 border rounded-full pt-3 pr-4 pb-3 pl-4 hover:bg-blue-50 transition-colors duration-200"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="16" 
                                        height="16" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="1.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    >
                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                    </svg>
                                    <span>Twitter</span>
                                </a>
                                <a 
                                    href="#" 
                                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-600 border border-blue-600/20 hover:bg-blue-50 transition-colors duration-200"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="20" 
                                        height="20" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="1.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    >
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                    </svg>
                                </a>
                                <a 
                                    href="#" 
                                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-600 border border-blue-600/20 hover:bg-blue-50 transition-colors duration-200"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="20" 
                                        height="20" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="1.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                                        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                                        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
                                    </svg>
                                </a>
                                <a 
                                    href="#" 
                                    className="inline-flex items-center justify-center w-12 h-12 text-blue-600 bg-white border-blue-600/20 border rounded-full hover:bg-blue-50 transition-colors duration-200"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="20" 
                                        height="20" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="1.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    >
                                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                                        <path d="m10 15 5-3-5-3z"></path>
                                    </svg>
                                </a>
                                <a 
                                    href="#" 
                                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-600 border border-blue-600/20 hover:bg-blue-50 transition-colors duration-200"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="20" 
                                        height="20" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="1.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                        <rect width="4" height="12" x="2" y="9"></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8 border-t border-blue-600/20"></div>

                    <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Menu */}
                        <div>
                            <p className="text-xs sm:text-sm text-blue-600/60">Explore</p>
                            <div className="mt-2 sm:mt-3 grid grid-cols-2 gap-2 text-xs sm:text-sm">
                                <a href="#about" className="font-medium tracking-tight hover:underline text-blue-600">About</a>
                                <a href="#services" className="font-medium tracking-tight hover:underline text-blue-600">Services</a>
                                <a href="#experience" className="font-medium tracking-tight hover:underline text-blue-600">Experience</a>
                                <a href="#contact" className="font-medium tracking-tight hover:underline text-blue-600">Contact</a>
                            </div>
                        </div>

                        {/* Legal */}
                        <div>
                            <p className="text-xs sm:text-sm text-blue-600/60">Fine Print</p>
                            <div className="mt-2 sm:mt-3 grid grid-cols-1 gap-2 text-xs sm:text-sm">
                                <a href="#" className="font-medium tracking-tight hover:underline text-blue-600">Terms & Conditions</a>
                                <a href="#" className="font-medium tracking-tight hover:underline text-blue-600">Privacy Notice</a>
                            </div>
                        </div>
                    </div>

                    <p className="mt-4 sm:mt-6 text-center text-[10px] sm:text-xs text-blue-600/70 px-4">
                        © {currentYear} Andrea Rodriguez — Crafted with care in Colombia
                    </p>
                </div>
            </div>
        </div>
    )
}

