export function AuthBrand({ className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-950 shadow-sm">
        {/* Minimal Drop icon logo */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      </div>
      <span className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        Sweety
      </span>
    </div>
  );
}

