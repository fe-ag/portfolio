"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Lang = "fa" | "en";

const texts = {
  fa: {
    introTitle: "طراح و توسعه‌دهنده‌ی رابط کاربری",
    introBody:
      "سلام! من یک فرانت‌اند دولوپر هستم که عاشق ساخت تجربه‌های کاربری زیبا، سریع و واکنش‌گرا برای وب‌سایت‌ها و اپلیکیشن‌هاست. تخصص من در React، Next.js و Tailwind CSS است.",
    portfolio: "نمونه‌کارها",
    aboutTitle: "من کی‌ام و چرا کد می‌زنم؟",
    aboutBody:
      "من توسعه‌دهنده‌ی فرانت‌اند هستم که از طراحی تا پیاده‌سازی رابط‌های کاربری را با عشق انجام می‌دهم. هدفم ساخت تجربه‌هایی است که بین زیبایی و عملکرد تعادل برقرار کنند.",
    contact: "ارتباط با من",
    contactLead: "برای همکاری یا مشاوره با من تماس بگیرید.",
  },
  en: {
    introTitle: "UI Designer & Frontend Developer",
    introBody:
      "Hi! I’m a frontend developer who loves crafting beautiful, fast, and responsive experiences for websites and apps. I specialize in React, Next.js, and Tailwind CSS.",
    portfolio: "Portfolio",
    aboutTitle: "Who am I & why I code?",
    aboutBody:
      "I’m a frontend developer who enjoys everything from design to implementation. My goal is to build delightful experiences that balance beauty and performance.",
    contact: "Contact Me",
    contactLead: "Get in touch for collaboration or consulting.",
  },
};

const projectsFA = [
  { img: "data.png", title: "پنل مدیریت تسک‌ها", description: "اپ برای مدیریت وظایف روزانه با پروژه/فیلتر و دارک‌مود." },
  { img: "company.png", title: "وب‌سایت شرکتی مدرن", description: "سریع، ساده و ریسپانسیو برای شرکت فناوری." },
  { img: "shop.png", title: "فروشگاه آنلاین پوشاک", description: "سبد خرید، جستجو و فیلتر محصولات." },
  { img: "course.png", title: "وب‌اپلیکیشن آموزش آنلاین", description: "ثبت‌نام، پنل کاربری و ویدیوپلیر." },
  { img: "blog.png", title: "بلاگ شخصی توسعه‌دهنده", description: "مقالات فنی JS/React با دسته‌بندی و جستجو." },
  { img: "hotel.png", title: "سیستم رزرو آنلاین هتل", description: "جستجوی پیشرفته، تقویم و فیلتر قیمت." },
];

const projectsEN = [
  { img: "data.png", title: "Task Management Panel", description: "Daily task manager with projects, filters, and dark mode." },
  { img: "company.png", title: "Modern Company Website", description: "Fast, clean, and responsive website for a tech company." },
  { img: "shop.png", title: "Clothing E-commerce", description: "Cart, search, and product filters with a clean UI." },
  { img: "course.png", title: "Online Learning Web App", description: "User panel, sign-up, and a custom video player." },
  { img: "blog.png", title: "Developer Personal Blog", description: "Technical posts about JavaScript and React with categories & search." },
  { img: "hotel.png", title: "Hotel Booking System", description: "Advanced search, calendar booking, and price filters." },
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("fa");

  // sync with <html lang> coming from layout
  useEffect(() => {
    const current = (document.documentElement.lang as Lang) || "fa";
    setLang(current);

    const handler = (e: Event) => {
      const ce = e as CustomEvent<Lang>;
      if (ce.detail) setLang(ce.detail);
    };
    window.addEventListener("app:lang", handler as EventListener);
    return () => window.removeEventListener("app:lang", handler as EventListener);
  }, []);

  const t = texts[lang];
  const projects = lang === "fa" ? projectsFA : projectsEN;
  const isFa = lang === "fa";

  return (
    <div id="home" className="space-y-24 sm:space-y-32">
      {/* Intro */}
      <section className={`mt-6 sm:mt-12 flex flex-col sm:flex-row ${isFa ? "" : ""}`}>
        <div className="relative w-full sm:w-1/2 h-72 sm:h-[80vh]">
          <Image
            src="/images/intr.png"
            alt={isFa ? "تصویر مقدمه" : "Intro image"}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center w-full sm:w-1/2 bg-white p-8 text-right sm:text-justify dark:bg-gray-800">
          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-600 dark:text-cyan-300 mb-4">
            {t.introTitle}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
            {t.introBody}
          </p>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="px-6 sm:px-12">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-cyan-700 dark:text-cyan-300 mb-10">
          {t.portfolio}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <article
              key={i}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:border-cyan-500 dark:hover:border-cyan-400 overflow-hidden group"
            >
              <div className="relative h-56">
                <Image
                  src={`/images/${p.img}`}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className={`p-6 ${isFa ? "text-right" : "text-left"}`}>
                <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-300 mb-3">{p.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{p.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-1/2 h-72 sm:h-[80vh]">
          <Image
            src="/images/me.png"
            alt={isFa ? "تصویر درباره من" : "About me image"}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className={`flex flex-col justify-center w-full sm:w-1/2 bg-white dark:bg-gray-800 p-8 ${isFa ? "text-right" : "text-left"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-600 dark:text-cyan-300 mb-4">{t.aboutTitle}</h2>
          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
            {t.aboutBody}
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 sm:px-12">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-cyan-700 dark:text-cyan-300 mb-10">
          {t.contact}
        </h2>
        <div className="flex flex-col items-center">
          <form
            className="w-full sm:w-2/3 lg:w-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-lg"
            onSubmit={(e) => e.preventDefault()}
            aria-label={isFa ? "فرم تماس" : "Contact form"}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder={isFa ? "نام" : "First name"}
                className={`rounded-lg p-3 outline-none focus:border-cyan-500 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 ${isFa ? "text-right" : "text-left"}`}
              />
              <input
                type="text"
                placeholder={isFa ? "نام خانوادگی" : "Last name"}
                className={`rounded-lg p-3 outline-none focus:border-cyan-500 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 ${isFa ? "text-right" : "text-left"}`}
              />
              <input
                type="tel"
                placeholder={isFa ? "شماره تماس" : "Phone"}
                className={`rounded-lg p-3 outline-none focus:border-cyan-500 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 ${isFa ? "text-right" : "text-left"}`}
              />
              <input
                type="email"
                placeholder={isFa ? "ایمیل" : "Email"}
                className={`rounded-lg p-3 outline-none focus:border-cyan-500 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 ${isFa ? "text-right" : "text-left"}`}
              />
            </div>
            <button
              type="submit"
              className="mt-8 w-full rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3"
            >
              {isFa ? "ارسال" : "Send"}
            </button>
          </form>

          <div className={`text-center mt-10 ${isFa ? "" : ""}`}>
            <h3 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300 mb-2">
              {isFa ? "یا مستقیماً تماس بگیرید" : "Or call directly"}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              {t.contactLead}
            </p>
            <a
              href="tel:09151234455"
              className="text-cyan-600 dark:text-cyan-300 text-xl font-semibold hover:text-cyan-800 dark:hover:text-cyan-200 transition-colors"
            >
              09151234455
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
