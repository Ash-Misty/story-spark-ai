import { FC } from "react";
import { motion } from "framer-motion";
import { TroubleshootItem } from "../help_center.utils";
import TroubleshootCard from "../troubleshoot_card/troubleshoot_card.component";

interface TroubleshootProps {
  items: TroubleshootItem[];
}

const Troubleshoot: FC<TroubleshootProps> = ({ items }) => {
  return (
    <motion.section
      id="troubleshoot-section"
<<<<<<< HEAD
      className="scroll-mt-28 transition-colors duration-300 w-full box-border"
=======
      className="scroll-mt-28 transition-colors duration-300"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
>>>>>>> origin/main
    >
      <div className="mb-10 text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 mb-4 select-none">
          <i className="fa-solid fa-screwdriver-wrench"></i>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Troubleshooting Guide</span>
        </div>

<<<<<<< HEAD
        <h2
          id="troubleshooting-heading"
          className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 tracking-tight"
        >
          Fix Common Problems
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
=======
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Fix Common Problems
        </h2>

        <p className="text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
>>>>>>> origin/main
          Diagnose and resolve common StorySparkAI issues quickly with guided
          troubleshooting steps and recommended fixes.
<<<<<<< HEAD
        </p>
      </div>

<<<<<<< HEAD
      {!items || items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-8 sm:p-12 text-center max-w-4xl mx-auto box-border">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-5 border border-slate-200/60 dark:border-white/5">
            <i className="fa-solid fa-toolbox text-2xl sm:text-3xl text-slate-400 dark:text-slate-500"></i>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
            No Issues Found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Try adjusting your search query to discover solutions.
          </p>
        </div>
      ) : (
        <div className="space-y-5 sm:space-y-6 max-w-4xl mx-auto w-full box-border px-4 sm:px-0">
=======
      {/* Empty State */}
      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/[0.03] p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mx-auto mb-5">
            <i className="fa-solid fa-toolbox text-3xl text-slate-500"></i>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            No Issues Found
          </h3>

          <p className="text-slate-600 dark:text-slate-400">
            Try adjusting your search query.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
>>>>>>> origin/main
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.06, 0.3),
              }}
              whileHover={{
                y: -4,
              }}
              className="
                group relative overflow-hidden
                rounded-2xl sm:rounded-3xl
                border border-slate-200 dark:border-white/10
                bg-white dark:bg-[#111827]/40
                backdrop-blur-2xl
                shadow-sm hover:shadow-xl
                transition-all duration-300
                w-full box-border
              "
            >
<<<<<<< HEAD
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10 p-5 sm:p-7 w-full box-border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
=======
              {/* Glow Accent */}
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 p-7">
                {/* Item Details Header */}
                <div className="flex items-start gap-5 mb-6">
                  {/* Icon */}
>>>>>>> origin/main
                  <div
                    className="
                      flex items-center justify-center
                      w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl
                      bg-gradient-to-br from-orange-500/10 to-amber-500/10
                      border border-orange-500/20
                      text-orange-500 dark:text-orange-400 text-lg sm:text-xl
                      shrink-0 select-none
                      group-hover:scale-105
                      transition-transform duration-300
                    "
                  >
                    <i className="fa-solid fa-bug"></i>
                  </div>
<<<<<<< HEAD
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate max-w-full">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-full">
                      Common workspace operational node constraint diagnosed
=======

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Common issue detected in StorySparkAI workflow
>>>>>>> origin/main
                    </p>
                  </div>
                </div>

<<<<<<< HEAD
                <div className="mb-5 w-full box-border">
                  <div className="flex items-center gap-2 mb-2.5 select-none">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/10 shrink-0">
                      <i className="fa-solid fa-triangle-exclamation text-xs sm:text-sm"></i>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Symptoms
                    </h4>
                  </div>
                  <div className="rounded-xl border border-slate-100 dark:border-red-500/10 bg-slate-50/50 dark:bg-red-500/[0.02] p-4 sm:p-5 w-full box-border">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
=======
                {/* Symptoms section */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-red-500 dark:text-red-400">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>

                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Symptoms
                    </h4>
                  </div>

                  <div className="rounded-2xl border border-red-200 dark:border-red-500/10 bg-red-50 dark:bg-red-500/[0.04] p-5">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
>>>>>>> origin/main
                      {item.symptoms}
                    </p>
                  </div>
                </div>

<<<<<<< HEAD
                <div className="w-full box-border">
                  <div className="flex items-center gap-2 mb-2.5 select-none">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/10 shrink-0">
                      <i className="fa-solid fa-check text-xs sm:text-sm"></i>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Recommended Solution
                    </h4>
                  </div>
                  <div className="rounded-xl border border-slate-100 dark:border-emerald-500/10 bg-slate-50/50 dark:bg-emerald-500/[0.02] p-4 sm:p-5 w-full box-border">
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
=======
                {/* Solution section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
                      <i className="fa-solid fa-check"></i>
                    </div>

                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Recommended Solution
                    </h4>
                  </div>
      <div className="text-center mb-10">
        
        <h2
          id="troubleshooting-heading"
          className="text-3xl font-bold text-slate-800 dark:text-gray-300"
        >
          Fix Common Problems
        </h2>

        <p className="mt-3 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
          Diagnose and fix common setup and runtime issues.
=======
>>>>>>> upstream/main
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((item) => (
          <TroubleshootCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </motion.section>
>>>>>>> origin/main
  );
};

export default Troubleshoot;