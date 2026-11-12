import { AuthBrand } from './AuthBrand';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function AuthLayout({
  hero,
  illustration,
  preview,
  form,
}) {
  return (
    <div className="min-h-screen md:h-screen w-full flex flex-col md:flex-row bg-[#ffffff] dark:bg-[#090909] text-neutral-900 dark:text-[#F5F5F5] transition-colors duration-200 relative overflow-x-hidden md:overflow-hidden font-sans">
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-80" />

      {/* Floating Theme Toggle (top-right fixed on mobile, absolute on desktop) */}
      <div className="fixed md:absolute top-4 right-4 sm:top-6 sm:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* MOBILE-ONLY BRAND HEADER (< 768px) */}
      <div className="md:hidden w-full px-6 pt-5 pb-2 flex items-center justify-between relative z-10 shrink-0">
        <AuthBrand />
      </div>

      {/* LEFT SECTION (Visible on desktop & laptops md:flex; hidden ONLY on mobile < 768px) */}
      <div className="hidden md:flex w-full md:w-1/2 h-full flex-col justify-between p-6 sm:p-8 lg:p-12 relative z-10 border-r border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden animate-enter">
        {/* Top brand */}
        <div className="shrink-0">
          <AuthBrand />
        </div>

        {/* Central Content */}
        <div className="my-auto py-2 space-y-4 shrink-0">
          {hero}
          {illustration}
        </div>

        {/* Bottom Preview Card */}
        <div className="shrink-0 pt-2 transition-all duration-300 hover:translate-y-[-2px]">
          {preview}
        </div>
      </div>

      {/* RIGHT SECTION (Priority on mobile, 50% on desktop & laptops) */}
      <div className="w-full md:w-1/2 min-h-[calc(100vh-60px)] md:min-h-full flex flex-col justify-center items-center px-4 py-8 sm:p-8 lg:p-12 relative z-10 overflow-y-auto md:overflow-hidden">
        {/* Form Container */}
        {form}

        {/* Animated ECG decorative line at bottom right */}
        <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden pointer-events-none opacity-30 dark:opacity-40">
          <svg
            viewBox="0 0 600 40"
            preserveAspectRatio="none"
            className="w-full h-full text-neutral-400 dark:text-neutral-600"
            fill="none"
          >
            <path
              d="M0 20 L220 20 L230 20 L235 6 L242 34 L250 8 L255 24 L260 20 L600 20"
              stroke="currentColor"
              strokeWidth="1.5"
              className="animate-ecg"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
