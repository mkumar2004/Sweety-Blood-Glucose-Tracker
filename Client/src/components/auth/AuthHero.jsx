export function AuthHero({ heading, description, className = '' }) {
  return (
    <div className={`space-y-2 z-10 text-left ${className}`}>
      <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.12] whitespace-pre-line">
        {heading}
      </h1>
      <p className="text-xs sm:text-sm leading-relaxed text-neutral-500 dark:text-[#A3A3A3] max-w-sm">
        {description}
      </p>
    </div>
  );
}
