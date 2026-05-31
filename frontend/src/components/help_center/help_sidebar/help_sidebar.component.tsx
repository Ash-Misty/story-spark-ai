<<<<<<< HEAD
import React, { useEffect, useState, useRef } from "react";
=======
<<<<<<< HEAD
import { useEffect, useState, FC } from "react";
=======
﻿import { FC, useEffect, useState } from "react";
>>>>>>> upstream/main
>>>>>>> origin/main
import { motion } from "framer-motion";
import { HELP_SECTIONS } from "../help_center.utils";

const HelpSidebar: FC = () => {
<<<<<<< HEAD
  const [activeSection, setActiveSection] =
    useState<string>("categories");

const HelpSidebar: FC = () => {
const HelpSidebar = () => {
  const [activeSection, setActiveSection] = useState("help-categories");
<<<<<<< HEAD
  const mobileNavRef = useRef<HTMLDivElement>(null);
=======
=======
  const [activeSection, setActiveSection] = useState<string>(
    HELP_SECTIONS[0]?.id ?? "categories"
  );
>>>>>>> upstream/main
>>>>>>> origin/main

  useEffect(() => {
    const sectionIds = HELP_SECTIONS.map((section) => section.id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
<<<<<<< HEAD
        rootMargin: "-15% 0px -45% 0px",
        threshold: [0.1, 0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
  {
    rootMargin: "-15% 0px -45% 0px",
    threshold: [0.1, 0.2, 0.4, 0.6],
  }
);

=======
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );
>>>>>>> upstream/main

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
<<<<<<< HEAD
      if (scrollBottom >= documentHeight - 120) {
=======

      // Near bottom of page → activate support section manually
      if (scrollBottom >= documentHeight - 120) {
      if (scrollBottom >= documentHeight - 80) {
>>>>>>> origin/main
        setActiveSection("support-links-section");
      }
    };

<<<<<<< HEAD
    window.addEventListener("scroll", handleScroll, { passive: true });
=======
    window.addEventListener("scroll", handleScroll);

>>>>>>> origin/main
    return () => {
<<<<<<< HEAD
      sections.forEach((section) => {
      HELP_SECTIONS.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
=======
      observer.disconnect();
>>>>>>> upstream/main
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileNavRef.current) {
      const activeButton = mobileNavRef.current.querySelector(
        `[data-section-id="${activeSection}"]`
      );
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
<<<<<<< HEAD
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
      window.scrollTo({ top: y, behavior: "smooth" });
    }
=======
    if (!element) return;

    const yOffset = -100;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
>>>>>>> upstream/main
  };

  return (
    <aside className="lg:w-80 shrink-0 w-full">
      {/* Sticky Box Container */}
      <div className="sticky top-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-6"
        >
          {/* Background Ambient Glows */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 rounded-[2rem] border border-white/30 dark:border-white/5 pointer-events-none" />

          <div className="relative z-10">
            {/* Header Content */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200 dark:border-blue-500/20 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-semibold tracking-wide uppercase text-blue-700 dark:text-blue-300">
                  Quick Navigation
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Help Center
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Navigate through guides, troubleshooting, setup instructions, and support resources.
              </p>
            </div>

            {/* Navigation Buttons List */}
            <div className="relative space-y-3">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      relative group w-full flex items-center gap-4
                      px-4 py-3.5 rounded-2xl
                      transition-all duration-300
                      overflow-hidden border focus:outline-none
                      ${isActive
                        ? "border-blue-300 dark:border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/15 dark:to-indigo-500/15"
                        : "border-slate-200 dark:border-white/5 hover:border-blue-200 dark:hover:border-white/10 bg-white/50 dark:bg-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.05]"
                      }
                    `}
                  >
                    {/* Active Sliding Background Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-pill"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20"
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 24,
                        }}
                      />
                    )}

                    {/* Button Icon Container */}
                    <div
                      className={`
                        relative z-10 flex items-center justify-center
                        w-10 h-10 rounded-xl transition-all duration-300
                        ${isActive
                          ? `bg-gradient-to-br ${section.color} text-white shadow-md`
                          : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-blue-500"
                        }
                      `}
                    >
                      <i className={`fa-solid ${section.icon}`} aria-hidden="true" />
                    </div>

                    {/* Button Text Element */}
                    <div className="relative z-10 flex-1 text-left">
                      <p className={`font-semibold text-sm transition-colors duration-300 ${
                        isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
                      }`}>
                        {section.label}
                      </p>
                    </div>

                    {/* Small Dot Status Indicator */}
                    <div className="relative z-10">
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive ? "bg-blue-500 scale-125" : "bg-slate-300 dark:bg-slate-700"
                      }`} />
    <>
<<<<<<< HEAD
      <nav className="hidden lg:block w-full max-w-full block box-border" aria-label="Help center desktop navigation">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#111827]/40 backdrop-blur-2xl shadow-sm p-5 w-full box-border"
        >
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full box-border">
            <div className="mb-6 select-none">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                  Quick Navigation
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Help Center</h2>
              <p className="mt-1.5 text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                Navigate through core system documentation architecture nodes.
              </p>
            </div>

            <div className="space-y-2 w-full box-border">
=======
      <nav className="hidden lg:block w-72 flex-shrink-0" aria-label="Help center sections">
        <div className="sticky top-24 space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] border border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl shadow-xl p-6"
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200 dark:border-blue-500/20 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-semibold tracking-wide uppercase text-blue-700 dark:text-blue-300">
                  Quick Navigation
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Help Center</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Browse guides, troubleshooting tips, setup instructions, and support resources.
              </p>
            </div>

            <div className="space-y-3">
>>>>>>> origin/main
              {HELP_SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
<<<<<<< HEAD
                    onClick={() => scrollToSection(section.id)}
                    className={`relative group w-full flex items-center gap-3.5 p-3 rounded-xl transition-all duration-200 border cursor-pointer select-none text-left box-border ${
                      isActive
                        ? "border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10"
                        : "border-transparent bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-pill"
                        className="absolute inset-0 rounded-xl border border-blue-500/20 dark:border-blue-400/20 pointer-events-none"
                        transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      />
                    )}
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 shrink-0 ${
                        isActive
                          ? `bg-gradient-to-br ${section.color} text-white shadow-md`
                          : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-blue-500"
                      }`}
                    >
                      <i className={`fa-solid ${section.icon} text-sm`} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`font-bold text-xs sm:text-sm tracking-tight transition-colors duration-200 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"}`}>
                        {section.label}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${isActive ? "bg-blue-500 scale-125 shadow-[0_0_8px_rgba(59,130,246,0.6)]" : "bg-slate-300 dark:bg-slate-700"}`} />
                    </div>
=======
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={`relative w-full text-left px-4 py-4 rounded-2xl transition-all duration-300 overflow-hidden border ${
                      isActive
                        ? "border-blue-300 dark:border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/15 dark:to-indigo-500/15"
                        : "border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.03] hover:border-blue-200 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-white/[0.05]"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
                          : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-blue-500"
                      }`}>
                        <i className={`fa-solid ${section.icon}`} aria-hidden="true" />
                      </div>
                      <div>
                        <p className={`font-semibold text-sm transition-colors duration-300 ${
                          isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
                        }`}>
                          {section.label}
                        </p>
                        <p className="text-xs mt-1 text-slate-500 dark:text-slate-500">Jump to section</p>
                      </div>
                    </div>
>>>>>>> origin/main
                  </button>
                );
              })}
            </div>

<<<<<<< HEAD
            <motion.div
              whileHover={{ y: -2 }}
              className="relative overflow-hidden mt-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] p-5 w-full box-border"
            >
              <div className="relative z-10 w-full box-border text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 select-none">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
                    <i className="fa-solid fa-sparkles text-sm"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white tracking-tight">Need More Help?</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Contact operations support</p>
                  </div>
                </div>
                <button
                  onClick={() => scrollToSection("support-links-section")}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold py-3 transition-all duration-150 active:scale-[0.98] shadow-sm hover:shadow-md uppercase tracking-wider cursor-pointer"
                >
                  Support Links
=======
<<<<<<< HEAD
            {/* Bottom Support CTA Card */}
            <motion.div
              whileHover={{ y: -2 }}
              className="relative overflow-hidden mt-6 rounded-2xl border border-blue-200 dark:border-indigo-500/20 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-white dark:from-indigo-500/10 dark:via-blue-500/10 dark:to-slate-900/30 p-5"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
                    <i className="fa-solid fa-sparkles text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                      Still Stuck?
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      We're here to help
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => scrollToSection("support-links-section")}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 text-xs transition-all duration-300 shadow-md shadow-blue-500/10"
                >
                  Open Support Hub
>>>>>>> origin/main
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
<<<<<<< HEAD
      </nav>

      <nav className="lg:hidden sticky top-[61px] sm:top-[69px] z-20 -mx-4 px-4 py-3 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/60 dark:border-white/10 mb-6 w-screen box-border select-none overflow-hidden" aria-label="Help center mobile navigation">
        <div ref={mobileNavRef} className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none w-full items-center box-border touch-pan-x">
          {HELP_SECTIONS.map((section) => {
            const isSelected = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                data-section-id={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 border uppercase tracking-wider cursor-pointer outline-none ${
                  isSelected
                    ? "bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-blue-400 border-blue-500/20 shadow-sm"
                    : "bg-slate-50 dark:bg-[#111827]/40 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10"
                }`}
              >
                {section.label}
              </button>
            );
          })}
=======
      </div>
    </aside>
              className="
                relative overflow-hidden
                mt-8 rounded-3xl
                border border-blue-200 dark:border-indigo-500/20
                bg-gradient-to-br
                from-blue-50
                via-indigo-50
                to-white
                dark:from-indigo-500/10
                dark:via-blue-500/10
                dark:to-slate-900/30
                p-6
              "
    <>
      {/* Desktop sticky sidebar */}
      <nav
        className="hidden lg:block w-56 flex-shrink-0"
        aria-label="Help center sections"
      >
        <div className="sticky top-24 space-y-1">
          
          <p className="text-xs font-semibold text-slate-500 dark:text-gray-500 uppercase tracking-wider mb-4 px-3">
            On this page
          </p>

          {HELP_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}

              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${

                activeSection === section.id
                  ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-l-2 border-indigo-500"
                  : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
              aria-current={
                activeSection === section.id ? "true" : undefined
              }
=======
            <motion.div
              whileHover={{ y: -2 }}
              className="relative overflow-hidden mt-8 rounded-3xl border border-blue-200 dark:border-indigo-500/20 bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-indigo-500/10 dark:via-blue-500/10 dark:to-slate-900/30 p-6"
>>>>>>> upstream/main
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg">
                    <i className="fa-solid fa-sparkles text-lg" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">Need More Help?</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Contact support</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection("support-links-section")}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-blue-500/20"
                >
                  Support Links
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </nav>

      <nav
        className="lg:hidden sticky top-0 z-20 -mx-4 px-4 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-white/10 mb-8"
        aria-label="Help center sections"
      >
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {HELP_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeSection === section.id
                  ? "bg-indigo-100 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-500/40"
                  : "bg-white dark:bg-white/5 text-slate-600 dark:text-gray-400 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10"
              }`}
              aria-current={activeSection === section.id ? "true" : undefined}
            >
              {section.label}
            </button>
          ))}
>>>>>>> origin/main
        </div>
      </nav>
    </>
  );
};

export default HelpSidebar;
