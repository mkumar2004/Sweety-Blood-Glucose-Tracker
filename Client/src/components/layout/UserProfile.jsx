import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User, LogOut } from 'lucide-react';

export function UserProfile({ name = 'Manojkumar', initials = 'MK' }) {
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const displayName = user?.name || name;
  const displayInitials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : initials;

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 p-1 rounded-full hover:bg-neutral-800/40 transition-colors cursor-pointer select-none"
      >
        <span className="text-sm font-medium text-neutral-300 hidden sm:inline-block">
          {displayName}
        </span>
        <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700/80 text-neutral-200 text-xs font-semibold flex items-center justify-center">
          {displayInitials}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#141414] border border-neutral-800 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-2 border-b border-neutral-800/80">
            <p className="text-xs font-medium text-white truncate">{displayName}</p>
            <p className="text-[11px] text-neutral-400 truncate">{user?.email || 'user@example.com'}</p>
          </div>
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs text-neutral-300 hover:bg-neutral-800/60 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <User className="w-3.5 h-3.5 text-neutral-400" />
            Profile
          </button>
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

