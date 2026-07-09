"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type GoogleTranslateWindow = Window & {
    google?: any;
    googleTranslateElementInit?: () => void;
};

const languageOptions = [
    { label: "EN", value: "en" },
    { label: "简中", value: "zh-CN" },
    { label: "繁中", value: "zh-TW" },
] as const;
type LanguageLabel = (typeof languageOptions)[number]["label"];

const languageValueToLabel = Object.fromEntries(
    languageOptions.map((option) => [option.value, option.label])
) as Record<(typeof languageOptions)[number]["value"], LanguageLabel>;

const getGoogleTransCookieValue = () => {
    if (typeof document === "undefined") {
        return null;
    }

    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
};

const setGoogleTransCookie = (value: string) => {
    if (value === "en") {
        document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        return;
    }

    document.cookie = `googtrans=/en/${value}; path=/; max-age=31536000; SameSite=Lax`;
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [language, setLanguage] = useState<LanguageLabel>(languageOptions[0].label);
    const [langOpen, setLangOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const cookieValue = getGoogleTransCookieValue();
        if (!cookieValue) {
            return;
        }

        const targetValue = cookieValue.split("/").pop();
        if (targetValue && targetValue in languageValueToLabel) {
            setLanguage(languageValueToLabel[targetValue as keyof typeof languageValueToLabel]);
        }
    }, []);

    useEffect(() => {
        const win = window as GoogleTranslateWindow;

        const initGoogleTranslate = () => {
            const container = document.getElementById("google_translate_element");
            if (!container) {
                return;
            }

            container.innerHTML = "";

            if (!win.google?.translate?.TranslateElement) {
                return;
            }

            new win.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "en,zh-CN,zh-TW",
                    layout: win.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false,
                },
                "google_translate_element"
            );
        };

        win.googleTranslateElementInit = initGoogleTranslate;

        if (!document.getElementById("google-translate-script")) {
            const script = document.createElement("script");
            script.id = "google-translate-script";
            script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
            return;
        }

        if (win.google?.translate?.TranslateElement) {
            initGoogleTranslate();
        }
    }, []);

    const changeLanguage = (label: LanguageLabel, value: string) => {
        setLanguage(label);
        setLangOpen(false);
        setIsOpen(false);

        setGoogleTransCookie(value);

        const applyLanguage = (attempt = 0) => {
            const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
            if (combo) {
                combo.value = value;
                combo.dispatchEvent(new Event("change", { bubbles: true }));
            }

            if (attempt < 20) {
                window.setTimeout(() => applyLanguage(attempt + 1), 200);
            }
        };

        applyLanguage();
        window.setTimeout(() => {
            window.location.reload();
        }, 250);
    };

    const navLinks = [
        { name: "About Us", href: "/#aboutus" },
        { name: "Why Us", href: "/#why" },
        { name: "Solutions", href: "/#solutions" },
        { name: "Insights", href: "/#insights" },
        { name: "Mobile App", href: "/#app" },
        { name: "Contact", href: "/#contact" },
        { name: "Help Center", href: "/help-center" }
    ];

    return (
        <>
            <header
                id="navbar-header"
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen
                    ? "bg-[#0e0e10]/80 backdrop-blur-md border-b border-white/5 py-3"
                    : "bg-black/20 backdrop-blur-xs py-5"
                    }`}
            >
                <div id="google_translate_element" className="absolute left-[-9999px] top-0 h-0 overflow-hidden" aria-hidden="true" />
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="https://framerusercontent.com/images/btgeqyoMBKJmBnpVPIiWUnI0oNQ.png?width=452&height=148"
                            alt="Goldhorse Capital"
                            className="h-6 md:h-8 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-12  text-lg font-medium">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`transition-colors duration-200 ${isActive ? "text-gold font-semibold" : "text-white/80 hover:text-gold"}`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Controls */}
                    <div className="hidden lg:flex items-center gap-2">
                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                type="button"
                                aria-expanded={langOpen}
                                aria-haspopup="menu"
                                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-montserrat font-medium"
                            >
                                <Globe size={16} className="text-gold" />
                                <span>{language}</span>
                                <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-28 bg-[#141416] border border-white/10 rounded-lg shadow-xl py-1 z-50 text-sm font-montserrat"
                                    >
                                        {languageOptions.map((lang) => (
                                            <button
                                                key={lang.value}
                                                type="button"
                                                onClick={() => changeLanguage(lang.label, lang.value)}
                                                className={`w-full text-left px-4 py-2 hover:bg-gold/10 hover:text-gold transition-colors ${language === lang.label ? "text-gold font-semibold" : "text-white/80"
                                                    }`}
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="flex lg:hidden items-center gap-4">
                        {/* Language Selector (Mobile) */}
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                type="button"
                                aria-expanded={langOpen}
                                aria-haspopup="menu"
                                className="flex items-center gap-1 text-white/80 text-xs font-montserrat border border-white/10 px-2 py-1 rounded"
                            >
                                <Globe size={14} className="text-gold" />
                                <span>{language}</span>
                                <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-28 bg-[#141416] border border-white/10 rounded-lg shadow-xl py-1 z-50 text-sm font-montserrat"
                                    >
                                        {languageOptions.map((lang) => (
                                            <button
                                                key={lang.value}
                                                type="button"
                                                onClick={() => changeLanguage(lang.label, lang.value)}
                                                className={`w-full text-left px-4 py-2 hover:bg-gold/10 hover:text-gold transition-colors ${language === lang.label ? "text-gold font-semibold" : "text-white/80"
                                                    }`}
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="p-2 text-white/80 hover:text-gold transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu Drawer */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="lg:hidden w-full bg-[#0e0e10]/95 border-b border-white/5 overflow-hidden"
                        >
                            <div className="px-6 py-8 flex flex-col gap-6 font-montserrat font-medium text-lg">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`transition-colors ${isActive ? "text-gold font-semibold" : "text-white/80 hover:text-gold"}`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                                <div className="h-px bg-white/5 my-2" />
                            
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
