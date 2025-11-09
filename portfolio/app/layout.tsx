"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { LuSquareMenu } from "react-icons/lu";
import { CiDark } from "react-icons/ci";

type Lang = "fa" | "en";
type Theme = "light" | "dark";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>("fa");
  const [theme, setTheme] = useState<Theme>("light");

  // --- init from localStorage (defaults: fa + light)
  useEffect(() => {
    const storedLang = (localStorage.getItem("app:lang") as Lang) || "fa";
    const storedTheme = (localStorage.getItem("app:theme") as Theme) || "light";
    setLang(storedLang);
    setTheme(storedTheme);
  }, []);

  // --- apply lang/dir + theme class to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "fa" ? "rtl" : "ltr";

    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");

    localStorage.setItem("app:lang", lang);
    localStorage.setItem("app:theme", theme);

    // خبر دادن به صفحه برای تغییر زبان (بدون کانتکست/فایل اضافه)
    window.dispatchEvent(new CustomEvent("app:lang", { detail: lang }));
  }, [lang, theme]);

  // header scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSmooth = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const nav = [
    { fa: "صفحه اصلی", en: "Home", href: "#home" },
    { fa: "درباره من", en: "About", href: "#about" },
    { fa: "نمونه‌کارها", en: "Portfolio", href: "#portfolio" },
    { fa: "ارتباط با من", en: "Contact", href: "#contact" },
  ];

  const isFa = lang === "fa";

  return (
    <html lang={lang} dir={isFa ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>{isFa ? "نمونه‌کار | توسعه‌دهنده‌ی فرانت‌اند" : "Portfolio | Frontend Developer"}</title>
        <meta
          name="description"
          content={
            isFa
              ? "طراحی و توسعه رابط‌های کاربری سریع و واکنش‌گرا با Next.js، React و Tailwind CSS."
              : "Designing fast, responsive UIs with Next.js, React, and Tailwind CSS."
          }
        />
        <meta property="og:title" content={isFa ? "نمونه‌کار | توسعه‌دهنده‌ی فرانت‌اند" : "Portfolio | Frontend Developer"} />
        <meta
          property="og:description"
          content={
            isFa
              ? "طراحی رابط‌های کاربری سریع و زیبا با Next.js و React"
              : "Beautiful, fast UI development with Next.js and React"
          }
        />
        <meta property="og:image" content="/og.png" />
      </head>
      <body className="bg-gray-50 text-gray-800 antialiased font-vazir transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
        {/* skip link */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[100] rounded-lg bg-cyan-600 px-4 py-2 text-white"
        >
          {isFa ? "پرش به محتوا" : "Skip to content"}
        </a>

        {/* HEADER */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-4 transition-all duration-500 ${
            isScrolled
              ? "bg-white/95 shadow-md dark:bg-gray-800/95"
              : "bg-white/70 backdrop-blur dark:bg-gray-800/70"
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <a
              href="#home"
              onClick={(e) => handleSmooth(e, "#home")}
              className="select-none text-2xl font-bold text-cyan-700 dark:text-cyan-400"
            >
              MyPortfolio
            </a>

            {/* desktop nav */}
            <nav className="hidden items-center gap-x-6 sm:flex">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => handleSmooth(e, n.href)}
                  className="text-base sm:text-lg font-semibold text-gray-700 hover:text-cyan-600 transition-colors dark:text-gray-200 dark:hover:text-cyan-300"
                >
                  {isFa ? n.fa : n.en}
                </a>
              ))}
            </nav>

            {/* actions */}
            <div className="hidden items-center gap-x-3 sm:flex">
              {/* theme toggle */}
              <button
                onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
                aria-label={isFa ? "تغییر حالت تیره/روشن" : "Toggle dark/light theme"}
                className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={isFa ? (theme === "dark" ? "روشن کن" : "تیره کن") : theme === "dark" ? "Light" : "Dark"}
              >
                <CiDark className="text-2xl text-cyan-700 dark:text-cyan-300" />
              </button>

              {/* language toggle */}
              <button
                onClick={() => setLang((l) => (l === "fa" ? "en" : "fa"))}
                className="rounded-xl border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle language"
                title="Eng/Per"
              >
                Eng/Per
              </button>

              <a href="mailto:you@example.com" aria-label={isFa ? "ایمیل" : "Email"} className="group">
                <MdEmail className="text-2xl text-cyan-700 transition-transform duration-300 group-hover:scale-110 dark:text-cyan-300" />
              </a>
              <button aria-label={isFa ? "جستجو" : "Search"}>
                <IoSearchSharp className="text-2xl text-cyan-700 transition-transform duration-300 hover:scale-110 dark:text-cyan-300" />
              </button>
            </div>

            {/* mobile menu button */}
            <button
              className="sm:hidden rounded-xl p-2 text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:text-cyan-300"
              aria-label={isFa ? "باز و بسته کردن منوی موبایل" : "Toggle mobile menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <LuSquareMenu className="text-4xl" />
            </button>
          </div>

          {/* mobile menu */}
          {menuOpen && (
            <nav className="sm:hidden mt-4 rounded-2xl border border-gray-200 bg-white py-4 shadow-lg animate-fadeIn dark:border-gray-700 dark:bg-gray-800">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => handleSmooth(e, n.href)}
                  className="block px-6 py-3 text-center text-lg font-medium text-gray-700 transition-colors hover:text-cyan-600 dark:text-gray-200 dark:hover:text-cyan-300"
                >
                  {isFa ? n.fa : n.en}
                </a>
              ))}
              <div className="mt-4 flex items-center justify-center gap-x-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                <button
                  onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
                  aria-label={isFa ? "تغییر حالت" : "Toggle theme"}
                  className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Theme"
                >
                  <CiDark className="text-3xl text-cyan-700 dark:text-cyan-300" />
                </button>
                <button
                  onClick={() => setLang((l) => (l === "fa" ? "en" : "fa"))}
                  className="rounded-xl border border-gray-300 px-3 py-1 text-sm font-bold text-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                  aria-label="Toggle language"
                >
                  Eng/Per
                </button>
                <a href="mailto:you@example.com" aria-label={isFa ? "ایمیل" : "Email"} className="group">
                  <MdEmail className="text-3xl text-cyan-700 transition-transform duration-300 group-hover:scale-110 dark:text-cyan-300" />
                </a>
                <IoSearchSharp className="text-3xl text-cyan-700 dark:text-cyan-300" />
              </div>
            </nav>
          )}
        </header>

        {/* content */}
        <main id="content" className="pt-24 sm:pt-28">{children}</main>

        {/* footer */}
        <footer className="mt-20 border-t border-gray-200 py-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} {isFa ? "همه حقوق محفوظ است — ساخته‌شده با Next.js" : "All rights reserved — Built with Next.js"}
          </p>
        </footer>
      </body>
    </html>
  );
}
