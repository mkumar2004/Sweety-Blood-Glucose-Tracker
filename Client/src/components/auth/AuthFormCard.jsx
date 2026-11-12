import {
  Droplet,
  Activity,
  Coffee,
  Check,
  UtensilsCrossed,
} from 'lucide-react';

export function AuthFormCard({ children, className = '' }) {
  return (
    <div className={`relative w-full max-w-[400px] mx-auto z-10 animate-enter ${className}`}>
      {/* Subtle large circular background boundary */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-neutral-200/40 dark:border-neutral-800/40 pointer-events-none hidden md:block" />

      {/* Floating decorative elements with gentle staggered animations */}
      {/* 1. Droplet icon (top-left) - Emerald tint */}
      <div className="absolute -top-12 -left-10 p-2.5 rounded-xl border border-emerald-500/30 dark:border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-sm hidden md:flex items-center justify-center animate-float">
        <Droplet className="w-4 h-4" />
      </div>

      {/* 2. Activity / Pulse icon (top-right) - DIFFERENT COLOR: Electric Cyan/Blue Pulse */}
      <div className="absolute -top-8 -right-8 p-2.5 rounded-xl border border-cyan-500/40 dark:border-cyan-500/50 bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 shadow-sm hidden md:flex items-center justify-center animate-float-delayed">
        <Activity className="w-4 h-4" />
      </div>

      {/* 3. "✓ 142 mg/dl" badge */}
      <div className="absolute top-[34%] -left-28 z-0 hidden lg:block pointer-events-none animate-float">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#141414] text-neutral-800 dark:text-neutral-200 shadow-md select-none">
          <Check className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
          <span>142 mg/dl</span>
        </div>
      </div>

      {/* 4. Coffee cup icon */}
      <div className="absolute top-[44%] -right-12 p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-[#121212] text-neutral-400 dark:text-neutral-500 shadow-sm hidden md:flex items-center justify-center animate-float">
        <Coffee className="w-4 h-4" />
      </div>

      {/* 5. Lower left pulse icon - Rose/Red heartbeat accent */}
      <div className="absolute bottom-[24%] -left-10 p-2.5 rounded-xl border border-rose-500/30 dark:border-rose-500/40 bg-rose-500/10 dark:bg-rose-500/15 text-rose-500 dark:text-rose-400 shadow-sm hidden md:flex items-center justify-center animate-float-delayed">
        <Activity className="w-4 h-4" />
      </div>

      {/* 6. "Ψ 98 mg/dl" badge */}
      <div className="absolute -bottom-2 -right-20 z-0 hidden lg:block pointer-events-none animate-float-delayed">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#141414] text-neutral-800 dark:text-neutral-200 shadow-md select-none">
          <UtensilsCrossed className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
          <span>98 mg/dl</span>
        </div>
      </div>

      {/* The main form container */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
