import React from 'react';
import {
  Home,
  Users2,
  Trophy,
  Briefcase,
  Users,
  MessageSquare,
  Bookmark,
  User,
  Sparkles,
  UserPlus,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenInvite: () => void;
  isOpen?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenInvite,
  isOpen = true,
  onToggleCollapse,
  className = '',
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'communities', label: 'My Connections', icon: Users2 },
    { id: 'hackathons', label: 'Hackathons', icon: Trophy },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'connect', label: 'Connect', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside
      className={`transition-all duration-300 ease-in-out flex flex-col space-y-4 select-none ${
        isOpen
          ? 'w-60 lg:w-64 opacity-100 pr-4 lg:pr-5 border-r border-slate-200/90 pointer-events-auto shrink-0'
          : 'w-0 opacity-0 p-0 m-0 overflow-hidden pointer-events-none -translate-x-full border-r-0'
      } ${className}`}
    >
      {/* Navigation Links */}
      <nav className="space-y-1 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentView === item.id ||
            (item.id === 'connect' && currentView === 'peers') ||
            (item.id === 'hackathons' && currentView === 'opportunities');

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-extrabold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-slate-500'
                }`}
              />
              <span className="tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Compact "Build Your Future Together" Invite Card - No Giant Empty Space */}
      <div className="w-full pt-1">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-4 text-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-extrabold text-sm leading-tight tracking-tight">
                Build Your Future
              </h3>
              <p className="text-[11px] text-blue-100/90 font-medium mt-0.5">
                Connect • Learn • Grow
              </p>
            </div>
            <div className="p-1.5 bg-white/10 rounded-xl">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          <p className="text-[11px] text-blue-100/80 mt-2 leading-relaxed">
            Invite classmates and peers to collaborate on hackathons & team projects.
          </p>

          <button
            onClick={onOpenInvite}
            className="w-full mt-3 py-2 px-3 bg-white hover:bg-blue-50 text-blue-700 font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5 text-blue-600" />
            <span>Invite Friends</span>
          </button>
        </div>

        {/* Footer Meta Links */}
        <div className="px-2 pt-3 text-[11px] text-slate-400 space-y-1">
          <p className="font-medium text-slate-400">© 2026 CollegeCulture</p>
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-slate-600 transition-colors cursor-pointer"
            >
              About
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-slate-600 transition-colors cursor-pointer"
            >
              Help
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-slate-600 transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-slate-600 transition-colors cursor-pointer"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
