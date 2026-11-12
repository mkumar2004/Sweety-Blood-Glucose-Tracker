import { Link, useLocation } from 'react-router-dom';
import { AuthBrand } from '@/components/auth/AuthBrand';
import { UserProfile } from './UserProfile';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Activity, BarChart3 } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const isReadingsActive = location.pathname === '/dashboard' || location.pathname === '/readings';
  const isReportsActive = location.pathname === '/reports';

  return (
    <header className="w-full border-b border-neutral-200 dark:border-neutral-800/80 bg-white/95 dark:bg-[#090909]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="w-[95%] mx-auto h-14 flex items-center justify-between">
        {/* Left: Sweety Brand & Nav Links */}
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="transition-opacity hover:opacity-90">
            <AuthBrand />
          </Link>

          <nav className="flex items-center gap-1.5">
            <Link
              to="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isReadingsActive
                  ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700/60 shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-neutral-300" />
              <span>Readings</span>
            </Link>

            <Link
              to="/reports"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isReportsActive
                  ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700/60 shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Reports</span>
            </Link>
          </nav>
        </div>

        {/* Right: Theme Toggle & User Profile */}
        <div className="flex items-center gap-3">
          <ThemeToggle className="scale-85" />
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
