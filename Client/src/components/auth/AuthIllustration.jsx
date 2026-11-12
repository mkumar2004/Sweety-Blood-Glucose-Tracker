import {
  Droplet,
  Heart,
  Activity,
  Moon,
  Coffee,
  UtensilsCrossed,
  Sunrise,
  Check,
} from 'lucide-react';

export function AuthIllustration({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center -translate-y-3 sm:-translate-y-4 select-none ${className}`}>
      {/* Soft pulsing ambient glow with subtle cyan/emerald healthcare aura */}
      <div className="absolute w-64 h-64 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-3xl pointer-events-none animate-glow" />

      {/* Orbit Rings Container */}
      <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[330px] lg:h-[330px] flex items-center justify-center">
        {/* Outer concentric orbit line */}
        <div className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border border-neutral-300/40 dark:border-neutral-800/60 pointer-events-none" />

        {/* Middle concentric orbit line */}
        <div className="absolute w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] rounded-full border border-neutral-300/50 dark:border-neutral-800/80 pointer-events-none" />

        {/* Inner concentric orbit line */}
        <div className="absolute w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] rounded-full border border-dashed border-neutral-300/60 dark:border-neutral-800 pointer-events-none" />

        {/* Center Droplet Container (Subtle floating interaction) */}
        <div className="relative z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white text-neutral-900 shadow-xl flex items-center justify-center border border-neutral-200 dark:border-neutral-100 transition-transform duration-300 hover:scale-105">
          <Droplet className="w-7 h-7 fill-emerald-600 text-emerald-600 stroke-[1.8]" />
        </div>

        {/* Heart Icon (left) - gentle float with rose accent */}
        <div className="absolute left-1 top-[48%] -translate-y-1/2 p-2 rounded-xl border border-rose-500/20 dark:border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 backdrop-blur-sm shadow-sm animate-float">
          <Heart className="w-4 h-4 fill-rose-500/20" />
        </div>

        {/* "✓ In range" Badge - gentle float delayed with emerald success tint */}
        <div className="absolute left-6 sm:left-10 bottom-10 sm:bottom-12 z-10 animate-float-delayed">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-md border border-emerald-500/30 dark:border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm">
            <Check className="w-3 h-3 text-emerald-500" />
            <span>In range</span>
          </div>
        </div>

        {/* Activity / Pulse Icon - CYAN / SKY BLUE PULSE COLOR */}
        <div className="absolute right-10 sm:right-12 top-6 sm:top-8 p-1.5 rounded-xl border border-cyan-500/30 dark:border-cyan-500/40 bg-cyan-500/10 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 backdrop-blur-sm shadow-sm animate-float">
          <Activity className="w-3.5 h-3.5" />
        </div>

        {/* Moon Icon (indigo / violet accent) */}
        <div className="absolute right-4 sm:right-6 bottom-12 sm:bottom-14 p-1.5 rounded-xl border border-indigo-500/20 dark:border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 backdrop-blur-sm shadow-sm animate-float-delayed">
          <Moon className="w-3.5 h-3.5" />
        </div>

        {/* Utensils icon */}
        <div className="absolute right-[46%] -translate-x-10 top-[34%] p-1.5 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 bg-white/60 dark:bg-[#141414]/60 text-neutral-400 dark:text-neutral-500">
          <UtensilsCrossed className="w-3 h-3" />
        </div>

        {/* Coffee cup icon (amber / warm tint) */}
        <div className="absolute right-[24%] top-[50%] p-1.5 rounded-lg border border-amber-500/20 dark:border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 text-amber-500/90 dark:text-amber-400/90">
          <Coffee className="w-3 h-3" />
        </div>

        {/* Sunrise icon */}
        <div className="absolute left-[38%] bottom-[20%] p-1.5 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 bg-white/60 dark:bg-[#141414]/60 text-neutral-400 dark:text-neutral-500">
          <Sunrise className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
