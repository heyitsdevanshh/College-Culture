import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Home,
  Briefcase,
  Trophy,
  MessageSquare,
  Bell,
  ChevronDown,
  User,
  LogOut,
  Settings,
  CheckCircle2,
  Users2,
  Users,
  Bookmark,
  X,
  Menu,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { UserProfile } from '../types';

interface NavbarProps {
  currentUser: UserProfile;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  onSearch?: (query: string) => void;
  onOpenInvite?: () => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

interface QuickNotification {
  id: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  snippet: string;
  actionView: string;
  actionText: string;
}

const NOTIFICATION_QUEUE: QuickNotification[] = [
  {
    id: 'notif_1',
    icon: Trophy,
    iconBg: 'bg-amber-500',
    iconColor: 'text-white',
    title: 'SIH 2026',
    snippet: 'ByteForce invited you to join team',
    actionView: 'hackathons',
    actionText: 'View',
  },
  {
    id: 'notif_2',
    icon: Users,
    iconBg: 'bg-blue-600',
    iconColor: 'text-white',
    title: 'Arjun Mehta',
    snippet: 'BITS Pilani · Connection request',
    actionView: 'connect',
    actionText: 'Connect',
  },
  {
    id: 'notif_3',
    icon: Briefcase,
    iconBg: 'bg-indigo-600',
    iconColor: 'text-white',
    title: 'IISc Labs',
    snippet: 'AI Research Fellowship now open',
    actionView: 'internships',
    actionText: 'Apply',
  },
  {
    id: 'notif_4',
    icon: Sparkles,
    iconBg: 'bg-emerald-600',
    iconColor: 'text-white',
    title: 'Trending',
    snippet: 'Rust & Agentic AI #1 in campus radar',
    actionView: 'home',
    actionText: 'Explore',
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentView,
  onNavigate,
  onLogout,
  onSearch,
  onOpenInvite,
  onToggleSidebar,
  isSidebarOpen = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const [unreadCount, setUnreadCount] = useState(4);
  const [activeNotification, setActiveNotification] = useState<QuickNotification | null>(null);
  const [queueIndex, setQueueIndex] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  // Toggle left navigation system when CC logo is tapped/clicked
  const handleToggleNav = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.innerWidth < 768) {
      setShowMobileDrawer((prev) => !prev);
    } else {
      if (onToggleSidebar) {
        onToggleSidebar();
      }
    }
  };

  // Trigger horizontal notification slide-in (squeezes search bar, stays for ~2.2s, then retracts)
  const triggerHorizontalNotification = (customItem?: QuickNotification) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const nextItem = customItem || NOTIFICATION_QUEUE[queueIndex % NOTIFICATION_QUEUE.length];
    setActiveNotification(nextItem);
    setQueueIndex((prev) => prev + 1);

    // Auto-return to normal after ~2.2 seconds (or after hover ends)
    timerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        setActiveNotification(null);
      }
    }, 2200);
  };

  // Bell icon click triggers the horizontal slide in free space
  const handleBellClick = () => {
    if (activeNotification) {
      // Toggle dismiss if already showing
      setActiveNotification(null);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      triggerHorizontalNotification();
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  // Live incoming demonstration: slide in a notification shortly after mount
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      triggerHorizontalNotification(NOTIFICATION_QUEUE[0]);
    }, 1800);

    return () => {
      clearTimeout(initialTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const mobileNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'communities', label: 'My Connections', icon: Users2 },
    { id: 'hackathons', label: 'Hackathons', icon: Trophy },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'connect', label: 'Connect', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo (Tapping CC toggles left navigation system open and close) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <BrandLogo
            size="md"
            title={isSidebarOpen ? "Click CC to close navigation" : "Click CC to open navigation"}
            onIconClick={handleToggleNav}
            onClick={handleToggleNav}
          />
          {/* Subtle mobile menu button indicator */}
          <button
            onClick={handleToggleNav}
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title={showMobileDrawer ? "Close Menu" : "Open Menu"}
          >
            {showMobileDrawer ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Center Zone: Squeezable Search Bar + Horizontal Sliding Notification Pill */}
        <div className="flex-1 flex items-center justify-center min-w-0 max-w-3xl mx-1 sm:mx-4">
          {/* Search Bar - Smoothly squeezes when notification slides in horizontally */}
          <div
            className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hidden md:block w-full ${
              activeNotification
                ? 'max-w-[210px] lg:max-w-[280px]'
                : 'max-w-xl'
            }`}
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 shrink-0" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                placeholder={activeNotification ? "Search..." : "Search for people, posts, hackathons..."}
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 rounded-full border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden transition-all truncate"
              />
            </form>
          </div>

          {/* Horizontal Sliding Notification in Free Space */}
          <div
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
              if (timerRef.current) clearTimeout(timerRef.current);
              timerRef.current = setTimeout(() => {
                setActiveNotification(null);
              }, 1000);
            }}
            className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex items-center shrink-0 ${
              activeNotification
                ? 'max-w-[380px] sm:max-w-[440px] opacity-100 translate-x-0 ml-2.5 sm:ml-3 pointer-events-auto'
                : 'max-w-0 opacity-0 translate-x-8 ml-0 pointer-events-none'
            }`}
          >
            {activeNotification && (
              <div
                onClick={() => {
                  if (activeNotification.actionView) {
                    onNavigate(activeNotification.actionView);
                    setActiveNotification(null);
                  }
                }}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-blue-50/95 hover:bg-blue-100/90 border border-blue-200 shadow-xs text-xs cursor-pointer group transition-all shrink-0 max-w-full"
              >
                <div
                  className={`w-6 h-6 rounded-full ${activeNotification.iconBg} ${activeNotification.iconColor} flex items-center justify-center shrink-0 shadow-2xs animate-pulse`}
                >
                  <activeNotification.icon className="w-3.5 h-3.5" />
                </div>

                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-extrabold text-slate-900 truncate">
                    {activeNotification.title}
                  </span>
                  <span className="text-slate-400 hidden xl:inline">·</span>
                  <span className="text-slate-600 truncate hidden xl:inline max-w-[150px]">
                    {activeNotification.snippet}
                  </span>
                </div>

                <span className="text-[10px] font-bold text-blue-600 bg-white px-2 py-0.5 rounded-full border border-blue-200/80 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center gap-1">
                  <span>{activeNotification.actionText}</span>
                  <ArrowRight className="w-3 h-3" />
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveNotification(null);
                    if (timerRef.current) clearTimeout(timerRef.current);
                  }}
                  className="p-0.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors shrink-0 cursor-pointer"
                  title="Dismiss notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Slidable Notifications Bell & User Profile Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Slidable Notifications Bell Trigger */}
          <button
            onClick={handleBellClick}
            className={`relative p-2.5 rounded-full transition-all cursor-pointer group ${
              activeNotification
                ? 'text-blue-600 bg-blue-50 ring-2 ring-blue-400/40'
                : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
            }`}
            title="Click to view notification slide"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-slate-700 group-hover:text-blue-600 group-hover:scale-110 transition-transform" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Pill matching screenshots */}
          <div className="relative pl-1" ref={dropdownRef}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2.5 p-1 sm:pr-2.5 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
            >
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <span className="font-bold text-sm text-slate-800 hidden sm:inline">
                {currentUser.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 animate-in fade-in slide-in-from-top-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-bold text-sm text-slate-900 truncate">{currentUser.name}</p>
                  <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                  {currentUser.college && (
                    <p className="text-[11px] text-indigo-600 font-medium truncate mt-0.5">
                      {currentUser.college}
                    </p>
                  )}
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onNavigate('profile');
                    }}
                    className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Complete / Edit Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onNavigate('home');
                    }}
                    className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                  >
                    <Home className="w-4 h-4 text-slate-400" />
                    <span>Home Feed</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-2 text-left text-xs sm:text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 font-medium"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer (Opens on left of screen when CC is touched) */}
      {showMobileDrawer && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setShowMobileDrawer(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Drawer Menu on the Left of the Screen */}
          <div className="fixed inset-y-0 left-0 w-64 max-w-[85vw] bg-white shadow-2xl flex flex-col justify-between p-4 overflow-y-auto z-10 animate-in slide-in-from-left duration-200">
            <div className="space-y-3">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <BrandLogo
                  size="sm"
                  title="Click CC to close navigation"
                  onIconClick={() => setShowMobileDrawer(false)}
                  onClick={() => setShowMobileDrawer(false)}
                />
                <button
                  onClick={() => setShowMobileDrawer(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                  title="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Options List on Left (Matches Screenshot) */}
              <div className="space-y-1 pt-1">
                {mobileNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setShowMobileDrawer(false);
                        onNavigate(item.id);
                      }}
                      className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-[15px] transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 shrink-0 ${
                          isActive ? 'text-[#2563eb]' : 'text-slate-500'
                        }`}
                      />
                      <span className="tracking-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
              {/* User Quick Info */}
              <div
                onClick={() => {
                  setShowMobileDrawer(false);
                  onNavigate('profile');
                }}
                className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center gap-3 transition-colors cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-slate-900 truncate">
                    {currentUser.name}
                  </h4>
                  <p className="text-[11px] text-blue-600 font-semibold truncate">
                    {currentUser.college || 'Engineering Undergrad'}
                  </p>
                </div>
              </div>

              {/* Footer info */}
              <div className="px-1 text-[11px] text-slate-400">
                <p>© 2026 CollegeCulture</p>
                <div className="flex flex-wrap gap-2 mt-1 text-[11px]">
                  <button
                    onClick={() => {
                      setShowMobileDrawer(false);
                      onNavigate('home');
                    }}
                    className="hover:text-slate-600"
                  >
                    About
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => {
                      setShowMobileDrawer(false);
                      onNavigate('home');
                    }}
                    className="hover:text-slate-600"
                  >
                    Help
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => {
                      setShowMobileDrawer(false);
                      onNavigate('home');
                    }}
                    className="hover:text-slate-600"
                  >
                    Privacy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
