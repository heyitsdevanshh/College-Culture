import React, { useState } from 'react';
import {
  Trophy,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Search,
  Bookmark,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Star,
  Users2,
  ChevronRight,
  ChevronDown,
  Clock,
  Award,
  Layers,
  Share2,
  Plus,
  ExternalLink,
  GraduationCap,
  Sparkle,
  Gift,
  Flame,
  Check,
} from 'lucide-react';
import { UPCOMING_HACKATHONS } from '../mockData';
import { HackathonItem } from '../types';

interface HackathonsViewProps {
  onStartCreateTeam: (hackathon: HackathonItem) => void;
  onOpenTeamWorkspace: (teamId: string) => void;
  registeredHackathons?: string[];
  onRegisterHackathon?: (hackathonId: string) => void;
}

export const HackathonsView: React.FC<HackathonsViewProps> = ({
  onStartCreateTeam,
  onOpenTeamWorkspace,
  registeredHackathons = ['hack_google_ai'],
  onRegisterHackathon,
}) => {
  const [hackathons, setHackathons] = useState<HackathonItem[]>(UPCOMING_HACKATHONS);
  const [selectedHackathon, setSelectedHackathon] = useState<HackathonItem | null>(UPCOMING_HACKATHONS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modeQuery, setModeQuery] = useState('');
  const [activeFilterPill, setActiveFilterPill] = useState<string>('All');
  const [localRegistered, setLocalRegistered] = useState<string[]>(registeredHackathons);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['hack_google_ai', 'hack_microsoft_cup']);
  const [activeDetailTab, setActiveDetailTab] = useState<'Overview' | 'Prizes & Perks' | 'Schedule & Timeline' | 'Group Discussion & Squads'>('Overview');
  
  // Modals & toast states
  const [showHostModal, setShowHostModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New hackathon form state
  const [newHackathonTitle, setNewHackathonTitle] = useState('');
  const [newHackathonOrg, setNewHackathonOrg] = useState('');
  const [newHackathonPrize, setNewHackathonPrize] = useState('');
  const [newHackathonMode, setNewHackathonMode] = useState<'Online' | 'Offline' | 'Hybrid'>('Online');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== id));
      triggerToast('Removed from saved hackathons');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      triggerToast('Saved to bookmarks ★');
    }
  };

  const handleRegister = (hackathon: HackathonItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!localRegistered.includes(hackathon.id)) {
      setLocalRegistered((prev) => [...prev, hackathon.id]);
      if (onRegisterHackathon) onRegisterHackathon(hackathon.id);
      triggerToast(`🎉 Successfully registered for ${hackathon.title}! You can now join or create a squad.`);
    } else {
      triggerToast(`You are already registered for ${hackathon.title}.`);
    }
  };

  const handleCreateSquad = (hackathon: HackathonItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!localRegistered.includes(hackathon.id)) {
      setLocalRegistered((prev) => [...prev, hackathon.id]);
      if (onRegisterHackathon) onRegisterHackathon(hackathon.id);
    }
    onStartCreateTeam(hackathon);
  };

  const handleOpenDiscussion = (teamId: string = 'team_codecrafters', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onOpenTeamWorkspace(teamId);
  };

  const handleCreateCustomHackathon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHackathonTitle.trim()) return;

    const created: HackathonItem = {
      id: `hack_custom_${Date.now()}`,
      title: newHackathonTitle,
      organizer: newHackathonOrg || 'Student Tech Council',
      organizerLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
      prizePool: newHackathonPrize || '$5,000+',
      mode: newHackathonMode,
      location: newHackathonMode === 'Online' ? 'Online (Virtual)' : 'Campus Main Auditorium',
      deadline: '15 Nov 2026',
      startDate: '20 Nov 2026',
      status: 'Registrations Open',
      tags: ['Open Innovation', 'AI/ML', 'Web Development'],
      banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
      participants: 120,
      participantsText: '100+ registered',
      difficulty: 'All Skill Levels',
      teamSize: 'Team (2-4 members)',
      eligibility: 'Open to All College Students',
      tagline: 'Collaborate, build solutions, and present to alumni judges',
      about: 'Organized by students for students. Build whatever you want or tackle one of the sponsor tracks.',
      isRegistered: true,
      timeline: [
        { event: 'Registration Opens', date: 'Today', completed: true },
        { event: 'Squads Lock & Submissions Open', date: '15 Nov 2026', completed: false },
        { event: 'Final Demos & Awards', date: '22 Nov 2026', completed: false },
      ],
    };

    setHackathons([created, ...hackathons]);
    setSelectedHackathon(created);
    setLocalRegistered((prev) => [...prev, created.id]);
    setShowHostModal(false);
    setNewHackathonTitle('');
    setNewHackathonOrg('');
    setNewHackathonPrize('');
    triggerToast('🎉 Hackathon posted successfully! Registrations are now live.');
  };

  // Filter logic
  const filteredHackathons = hackathons.filter((item) => {
    if (activeFilterPill === 'Online' && item.mode !== 'Online') return false;
    if ((activeFilterPill === 'Offline' || activeFilterPill === 'In-Person') && item.mode !== 'Offline') return false;
    if (activeFilterPill === 'Hybrid' && item.mode !== 'Hybrid') return false;
    if (activeFilterPill === 'AI / ML' && !item.tags.some((t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('ml'))) return false;
    if (activeFilterPill === 'Web3' && !item.tags.some((t) => t.toLowerCase().includes('web3') || t.toLowerCase().includes('blockchain'))) return false;
    if (activeFilterPill === 'My Squads' && !localRegistered.includes(item.id)) return false;
    if (activeFilterPill === 'Saved' && !bookmarkedIds.includes(item.id)) return false;

    if (modeQuery.trim()) {
      const mq = modeQuery.toLowerCase();
      const matchMode = item.mode.toLowerCase().includes(mq);
      const matchLoc = item.location.toLowerCase().includes(mq);
      if (!matchMode && !matchLoc) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchOrg = item.organizer.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchOrg && !matchTags) return false;
    }

    return true;
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto py-5 px-3 sm:px-6 space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner (Identical to Internship Top Banner) */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 shadow-2xs">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Hackathons & Competitions
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Discover hackathons to build innovative projects, form winning squads, and kickstart breakthroughs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setShowHostModal(true)}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Host Hackathon</span>
          </button>
          <button
            onClick={() => onStartCreateTeam(selectedHackathon || hackathons[0])}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Squad</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar (Identical to Internship Search Bar) */}
      <div className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by hackathon title, organizer, track, tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
            />
          </div>
          <div className="relative sm:w-64">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by Mode or City..."
              value={modeQuery}
              onChange={(e) => setModeQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold scrollbar-none">
          {['All', 'Online', 'In-Person', 'Hybrid', 'AI / ML', 'Web3', 'My Squads', 'Saved'].map((pill) => (
            <button
              key={pill}
              onClick={() => setActiveFilterPill(pill)}
              className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                activeFilterPill === pill
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {pill}
              {pill === 'My Squads' && localRegistered.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold">
                  {localRegistered.length}
                </span>
              )}
            </button>
          ))}

          {(activeFilterPill !== 'All' || searchQuery || modeQuery) && (
            <button
              onClick={() => {
                setActiveFilterPill('All');
                setSearchQuery('');
                setModeQuery('');
              }}
              className="text-xs text-blue-600 font-bold ml-auto hover:underline cursor-pointer whitespace-nowrap"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left Hackathons List + Right Sticky Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Hackathons List (7 cols when detail is open) */}
        <div className={`${selectedHackathon ? 'lg:col-span-7' : 'lg:col-span-8'} space-y-4`}>
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Showing {filteredHackathons.length} hackathons</span>
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
              <span>Sort by:</span>
              <span className="text-blue-600 font-bold">Registration Deadline</span>
              <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
            </div>
          </div>

          <div className="space-y-3.5">
            {filteredHackathons.map((hackathon) => {
              const isSelected = selectedHackathon?.id === hackathon.id;
              const isRegistered = localRegistered.includes(hackathon.id);
              const isBookmarked = bookmarkedIds.includes(hackathon.id);

              return (
                <div
                  key={hackathon.id}
                  onClick={() => setSelectedHackathon(hackathon)}
                  className={`bg-white rounded-3xl p-4 sm:p-5 border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                      : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5 min-w-0">
                      {/* Organizer Logo / Avatar */}
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 p-1.5 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                        {hackathon.organizerLogo ? (
                          <img
                            src={hackathon.organizerLogo}
                            alt={hackathon.organizer}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm">
                            {hackathon.organizer.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        {hackathon.status && (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-md inline-flex items-center gap-1 mb-1">
                            ● {hackathon.status}
                          </span>
                        )}

                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors">
                          {hackathon.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <span className="font-bold text-slate-700">{hackathon.organizer}</span>
                          <span>•</span>
                          <span>{hackathon.location}</span>
                          <span>•</span>
                          <span className="text-blue-600 font-medium">{hackathon.mode}</span>
                        </div>

                        {/* Skill / Track Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {hackathon.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[11px] font-semibold"
                            >
                              #{tag}
                            </span>
                          ))}
                          {hackathon.tags.length > 3 && (
                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px] font-bold">
                              +{hackathon.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bookmark Icon */}
                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(hackathon.id, e)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer shrink-0 ${
                        isBookmarked
                          ? 'bg-amber-50 text-amber-600'
                          : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        🏆 Prize: {hackathon.prizePool}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{hackathon.teamSize || '2-4 Members'}</span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{hackathon.startDate}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2">
                      <span className="text-[11px] text-slate-400">Due {hackathon.deadline}</span>

                      {isRegistered ? (
                        <div className="flex items-center gap-1.5">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Registered</span>
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleOpenDiscussion(hackathon.userTeamId || 'team_codecrafters', e)}
                            className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
                            title="Open in-app Group Discussion"
                          >
                            <MessageCircle className="w-3 h-3 text-purple-600" />
                            <span>Group Discussion</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => handleRegister(hackathon, e)}
                            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>Register</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleCreateSquad(hackathon, e)}
                            className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>+ Squad</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sticky Detail Panel (Matching Image 2 Infosys card from Internships) */}
        <div className={`${selectedHackathon ? 'lg:col-span-5' : 'lg:col-span-4'} space-y-4`}>
          {selectedHackathon ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden sticky top-20">
              {/* Header Banner */}
              <div className="h-28 bg-gradient-to-r from-amber-900 via-indigo-950 to-slate-950 relative p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center">
                    {selectedHackathon.organizerLogo ? (
                      <img
                        src={selectedHackathon.organizerLogo}
                        alt={selectedHackathon.organizer}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Trophy className="w-6 h-6 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">{selectedHackathon.organizer}</h3>
                    <span className="px-2 py-0.5 bg-emerald-500/90 text-white font-bold text-[10px] rounded-full inline-flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" />
                      <span>Verified Hackathon</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedHackathon(null)}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Key Highlights */}
              <div className="p-4 sm:p-5 border-b border-slate-100">
                <h2 className="text-lg font-black text-slate-900">{selectedHackathon.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedHackathon.organizer} • {selectedHackathon.location} • {selectedHackathon.mode}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold rounded-lg flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pool: {selectedHackathon.prizePool}</span>
                  </span>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-semibold rounded-lg flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>{selectedHackathon.teamSize || '2-4 Members'}</span>
                  </span>
                  <span className="px-2.5 py-1 bg-purple-50 text-purple-700 font-semibold rounded-lg flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-purple-600" />
                    <span>Due {selectedHackathon.deadline}</span>
                  </span>
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  {localRegistered.includes(selectedHackathon.id) ? (
                    <div className="flex-1 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Registered Successfully</span>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleRegister(selectedHackathon, e)}
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Register Now</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleCreateSquad(selectedHackathon)}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Users2 className="w-3.5 h-3.5" />
                    <span>+ Form Squad</span>
                  </button>

                  <button
                    onClick={() => handleOpenDiscussion(selectedHackathon.userTeamId || 'team_codecrafters')}
                    className="py-2.5 px-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    title="Open in-app Group Discussion"
                  >
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                    <span className="hidden sm:inline">Group Discussion</span>
                  </button>
                </div>
              </div>

              {/* Navigation Detail Tabs */}
              <div className="flex border-b border-slate-100 px-4 text-xs font-bold text-slate-500 overflow-x-auto scrollbar-none">
                {(['Overview', 'Prizes & Perks', 'Schedule & Timeline', 'Group Discussion & Squads'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDetailTab(tab)}
                    className={`py-3 px-2.5 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                      activeDetailTab === tab
                        ? 'border-blue-600 text-blue-600 font-extrabold'
                        : 'border-transparent hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Body */}
              <div className="p-4 sm:p-5 max-h-[440px] overflow-y-auto space-y-4 text-xs text-slate-600">
                {activeDetailTab === 'Overview' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-black text-slate-900 text-sm mb-1.5">About Hackathon</h4>
                      <p className="leading-relaxed text-slate-600">{selectedHackathon.about}</p>
                    </div>

                    {selectedHackathon.tagline && (
                      <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-2xl text-amber-900 text-xs font-semibold flex items-center gap-2">
                        <Sparkle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>"{selectedHackathon.tagline}"</span>
                      </div>
                    )}

                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Themes & Tracks</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedHackathon.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 mb-1.5">Eligibility & Guidelines</h4>
                      <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
                        <li>{selectedHackathon.eligibility || 'Open to all registered college students'}</li>
                        <li>Teams can consist of 2 to 4 members from any college or year.</li>
                        <li>Projects must be original and built during the official competition window.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'Prizes & Perks' && (
                  <div className="space-y-3.5">
                    <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-900">
                      <Trophy className="w-8 h-8 text-amber-600 shrink-0" />
                      <div>
                        <h4 className="font-extrabold text-sm">Total Prize Pool</h4>
                        <p className="text-base font-black text-amber-700">{selectedHackathon.prizePool}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center">1</span>
                          <span className="font-bold text-slate-900">Grand Winner</span>
                        </div>
                        <span className="font-extrabold text-emerald-700">50% of Pool + Trophy</span>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-400 text-white font-black text-xs flex items-center justify-center">2</span>
                          <span className="font-bold text-slate-900">First Runner-up</span>
                        </div>
                        <span className="font-extrabold text-emerald-700">30% of Pool + Swag</span>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center">3</span>
                          <span className="font-bold text-slate-900">Second Runner-up</span>
                        </div>
                        <span className="font-extrabold text-emerald-700">20% of Pool</span>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl space-y-1 text-blue-900">
                      <h5 className="font-bold flex items-center gap-1.5">
                        <Gift className="w-4 h-4 text-blue-600" />
                        <span>Sponsor Perks for All Participants</span>
                      </h5>
                      <ul className="text-[11px] space-y-1 pl-4 list-disc text-blue-800">
                        <li>$500 in Google Cloud / Azure credits for prototype hosting</li>
                        <li>Fast-track interview screenings with sponsoring engineering leaders</li>
                        <li>Digital Certificates of Participation verified on College Culture</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'Schedule & Timeline' && (
                  <div className="space-y-3">
                    <h4 className="font-black text-slate-900 text-sm">Key Deadlines & Rounds</h4>
                    <div className="space-y-3 relative pl-4 border-l-2 border-blue-200">
                      {(selectedHackathon.timeline || [
                        { event: 'Registration Closes', date: selectedHackathon.deadline, completed: false },
                        { event: 'Hackathon Starts', date: selectedHackathon.startDate, completed: false },
                        { event: 'Project Submissions Deadline', date: '3 Days post kickoff', completed: false },
                        { event: 'Live Judging & Winners Ceremony', date: '5 Days post kickoff', completed: false },
                      ]).map((item, idx) => (
                        <div key={idx} className="relative">
                          <span className={`w-3 h-3 rounded-full absolute -left-[23px] top-1 ${item.completed ? 'bg-emerald-500' : 'bg-blue-600'}`} />
                          <p className="font-bold text-slate-900">{item.event}</p>
                          <p className="text-slate-400 text-[11px]">{item.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeDetailTab === 'Group Discussion & Squads' && (
                  <div className="space-y-3.5">
                    <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-purple-600" />
                        <span className="font-bold text-purple-900">In-App Squad Group Discussion</span>
                      </div>
                      <button
                        onClick={() => handleOpenDiscussion(selectedHackathon.userTeamId || 'team_codecrafters')}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] rounded-lg transition-colors cursor-pointer"
                      >
                        Enter Discussion
                      </button>
                    </div>

                    <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                      Student Squads Forming for this Hackathon
                    </h4>

                    {/* Squad Card 1 */}
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-bold text-slate-900">Team CodeCrafters</h5>
                          <p className="text-[11px] text-slate-500">Formed by Devansh Sharma (DTU) • 3/4 Members</p>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                          1 Spot Open
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-blue-600 font-semibold">Looking for: UI/UX & Mobile Specialist</span>
                        <button
                          onClick={() => handleOpenDiscussion('team_codecrafters')}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Open Group Discussion
                        </button>
                      </div>
                    </div>

                    {/* Squad Card 2 */}
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-bold text-slate-900">AI Synthetics Squad</h5>
                          <p className="text-[11px] text-slate-500">Formed by Priya Patel (IIT Delhi) • 2/4 Members</p>
                        </div>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold text-[10px]">
                          2 Spots Open
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-blue-600 font-semibold">Looking for: Backend & FastAPI dev</span>
                        <button
                          onClick={() => handleOpenDiscussion('team_codecrafters')}
                          className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Open Group Discussion
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 text-center">
                      <button
                        onClick={() => handleCreateSquad(selectedHackathon)}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        + Create Your Own Squad
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-8 text-center text-slate-400 space-y-2">
              <Trophy className="w-10 h-10 mx-auto text-slate-300" />
              <p className="font-bold text-slate-600">Select a Hackathon</p>
              <p className="text-xs">Click on any hackathon card from the list to view full prizes, guidelines, and active squad group discussions.</p>
            </div>
          )}
        </div>
      </div>

      {/* Host Hackathon Modal (Matching Post Internship Modal in InternshipsView) */}
      {showHostModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                <Trophy className="w-5 h-5" />
                <span>Host / Post a Hackathon</span>
              </div>
              <button
                onClick={() => setShowHostModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomHackathon} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Hackathon Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., CodeRush Inter-College Hackathon 2026"
                  value={newHackathonTitle}
                  onChange={(e) => setNewHackathonTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Organizer / Club *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., SGSITS Tech Council"
                    value={newHackathonOrg}
                    onChange={(e) => setNewHackathonOrg(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Prize Pool *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., ₹2,50,000"
                    value={newHackathonPrize}
                    onChange={(e) => setNewHackathonPrize(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Competition Mode</label>
                <select
                  value={newHackathonMode}
                  onChange={(e) => setNewHackathonMode(e.target.value as 'Online' | 'Offline' | 'Hybrid')}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
                >
                  <option value="Online">Online (Virtual Hackathon)</option>
                  <option value="Offline">Offline (On Campus)</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowHostModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 font-bold rounded-xl text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Publish Hackathon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
