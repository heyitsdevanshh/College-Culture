import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  CheckCheck,
  ExternalLink,
  Copy,
  Plus,
  Crown,
  Star,
  FileText,
  Calendar,
  Sparkles,
  Download,
  Share2,
  Trophy,
  CheckCircle2,
  Users,
  MapPin,
  Edit,
  Folder,
  Check,
  FileCode,
  X,
  ChevronRight,
  GripVertical,
  Code,
  Mic,
  Pin,
  Clock,
  Radio,
  Hash,
  Sparkle,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { HackathonTeam, TeamMessage, TeamMember } from '../types';

interface TeamWorkspaceViewProps {
  currentTeam: HackathonTeam;
  allTeams: HackathonTeam[];
  onSelectTeam: (team: HackathonTeam) => void;
  onViewHackathon: (hackathonId: string) => void;
  onOpenCreateTeam?: () => void;
  onBackToMessages?: () => void;
}

interface DirectPeer {
  id: string;
  name: string;
  avatar: string;
  college: string;
  role: string;
  isOnline: boolean;
  lastMessage: string;
  lastTime: string;
  unreadCount?: number;
}

interface CampusChannel {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  lastMessage: string;
  lastTime: string;
  unreadCount?: number;
}

const PEER_DIRECT_CHATS: DirectPeer[] = [
  {
    id: 'peer_riya',
    name: 'Riya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    college: 'IIIT Delhi',
    role: 'AI/ML Lead',
    isOnline: true,
    lastMessage: 'Uploaded the model weights & testing on edge devices!',
    lastTime: '10:42 AM',
    unreadCount: 2,
  },
  {
    id: 'peer_arjun',
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    college: 'BITS Pilani',
    role: 'Cloud & DevOps',
    isOnline: true,
    lastMessage: 'CI/CD workflow passing with zero build warnings.',
    lastTime: '9:15 AM',
  },
  {
    id: 'peer_sneha',
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    college: 'NIT Trichy',
    role: 'UI/UX & Video',
    isOnline: false,
    lastMessage: 'Figma interactive prototype is ready for judges demo.',
    lastTime: 'Yesterday',
    unreadCount: 1,
  },
  {
    id: 'peer_aman',
    name: 'Aman Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    college: 'IIT Kanpur',
    role: 'Frontend Dev',
    isOnline: true,
    lastMessage: 'Merged pull request #14 for responsive layout.',
    lastTime: 'Yesterday',
  },
  {
    id: 'peer_rohan',
    name: 'Rohan Gupta',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    college: 'DTU',
    role: 'Mobile Specialist',
    isOnline: false,
    lastMessage: 'Let’s sync up on WebSocket event architecture today.',
    lastTime: '2 days ago',
  },
];

const CAMPUS_CHANNELS: CampusChannel[] = [
  {
    id: 'chan_announcements',
    name: 'hackathon-central',
    description: 'Official dates, rules, judging criteria & mentors',
    membersCount: 420,
    lastMessage: 'Google Cloud $500 vouchers are now claimable in portal!',
    lastTime: '11:00 AM',
    unreadCount: 3,
  },
  {
    id: 'chan_squads',
    name: 'squad-matchmaking',
    description: 'Find teammates, backend leads, & UI/UX designers',
    membersCount: 285,
    lastMessage: 'Looking for 1 Flutter dev for Microsoft Reimagine Cup.',
    lastTime: '10:12 AM',
  },
  {
    id: 'chan_pitch',
    name: 'pitch-deck-feedback',
    description: 'Alumni winners review your 3-min pitch videos',
    membersCount: 194,
    lastMessage: 'Slide deck review sessions live this evening at 7 PM.',
    lastTime: 'Yesterday',
  },
];

const getDefaultMessagesForTeam = (team: HackathonTeam): TeamMessage[] => {
  return [
    {
      id: 'msg_welcome',
      senderId: 'usr_devansh',
      senderName: 'You (Devansh)',
      senderAvatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      senderRole: 'Team Lead',
      isCurrentUser: true,
      text: `Welcome everyone to our team workspace for ${team.hackathonTitle}! Let's discuss our tech stack, sprint goals, and assign responsibilities. 🚀`,
      timestamp: '9:30 AM',
      reactions: [{ emoji: '🔥', count: 4 }],
    },
    {
      id: 'msg_riya',
      senderId: 'peer_riya',
      senderName: 'Riya Sharma',
      senderAvatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      senderRole: 'AI/ML Lead',
      isCurrentUser: false,
      text: `Excited to build! I've benchmarked Gemini 2.5 Flash for the real-time multimodal vision pipeline. Sub-200ms latency on edge image feeds! 💡`,
      timestamp: '9:35 AM',
      reactions: [{ emoji: '⚡', count: 3 }],
    },
    {
      id: 'msg_arjun',
      senderId: 'peer_arjun',
      senderName: 'Arjun Mehta',
      senderAvatar:
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      senderRole: 'Cloud & DevOps',
      isCurrentUser: false,
      text: `I've initialized our repository with Docker compose, WebSocket gateway, and GitHub Actions CI. Ready for code push:`,
      timestamp: '9:48 AM',
      githubCard: {
        repo: `${team.name.toLowerCase().replace(/\s+/g, '-')}/hackathon-core`,
        description: `Monorepo with React 19, Node.js, and Gemini multimodal pipeline`,
        url: 'https://github.com',
      },
      reactions: [{ emoji: '👍', count: 4 }],
    },
    {
      id: 'msg_sneha',
      senderId: 'peer_sneha',
      senderName: 'Sneha Patel',
      senderAvatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      senderRole: 'UI/UX & Video',
      isCurrentUser: false,
      text: `I completed the Figma high-fidelity wireframes and judge presentation outline! Check the pitch deck slides below:`,
      timestamp: '10:05 AM',
      attachment: {
        name: `${team.name.replace(/\s+/g, '_')}_PitchDeck_v2.pdf`,
        size: '12.4 MB',
        type: 'pdf',
        url: '#',
      },
      reactions: [{ emoji: '🙌', count: 3 }],
    },
    {
      id: 'msg_aman',
      senderId: 'peer_aman',
      senderName: 'Aman Verma',
      senderAvatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      senderRole: 'Frontend Dev',
      isCurrentUser: false,
      text: `Looks super clean! I'm hooking up the live telemetry graphs and chat streams right now. What's our next milestone before tonight's freeze?`,
      timestamp: '10:20 AM',
      reactions: [{ emoji: '🎯', count: 2 }],
    },
  ];
};

export const TeamWorkspaceView: React.FC<TeamWorkspaceViewProps> = ({
  currentTeam,
  allTeams,
  onSelectTeam,
  onViewHackathon,
  onOpenCreateTeam,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'teams' | 'direct' | 'mentions'>('teams');
  const [activeChatTab, setActiveChatTab] = useState<'chat' | 'files' | 'tasks' | 'meetings' | 'notes'>('chat');
  const [isHackInfoOpen, setIsHackInfoOpen] = useState(true);
  
  // Adjustable size between messages and chat section (state + dragging logic)
  const [messagesSidebarWidth, setMessagesSidebarWidth] = useState<number>(340);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<TeamMessage[]>(() => {
    if (currentTeam.messages && currentTeam.messages.length > 2) {
      return currentTeam.messages;
    }
    return getDefaultMessagesForTeam(currentTeam);
  });

  const [newMessageText, setNewMessageText] = useState('');
  const [tasks, setTasks] = useState(
    currentTeam.tasks && currentTeam.tasks.length > 0
      ? currentTeam.tasks
      : [
          { id: 't1', title: 'Finalize idea & problem statement', completed: true },
          { id: 't2', title: 'Build working prototype & API proxy', completed: true },
          { id: 't3', title: 'Prepare 3-minute pitch deck & video demo', completed: false },
          { id: 't4', title: 'Run judge rubrics & architecture review', completed: false },
          { id: 't5', title: 'Final submission on hackathon portal', completed: false },
        ]
  );
  const [copiedCode, setCopiedCode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync messages when team changes
  useEffect(() => {
    if (currentTeam.messages && currentTeam.messages.length > 2) {
      setMessages(currentTeam.messages);
    } else {
      setMessages(getDefaultMessagesForTeam(currentTeam));
    }
  }, [currentTeam.id]);

  // Resizer drag handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;
      // Clamp between 240px and 540px
      if (newWidth >= 240 && newWidth <= 540) {
        setMessagesSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || newMessageText;
    if (!textToSend.trim()) return;

    const newMsg: TeamMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'usr_devansh',
      senderName: 'You (Devansh)',
      senderAvatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      senderRole: 'Team Lead',
      isCurrentUser: true,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!customText) setNewMessageText('');
  };

  const handleToggleReaction = (msgId: string, emoji: string) => {
    setMessages(
      messages.map((m) => {
        if (m.id !== msgId) return m;
        const reactions = m.reactions ? [...m.reactions] : [];
        const existing = reactions.find((r) => r.emoji === emoji);
        if (existing) {
          existing.count += 1;
        } else {
          reactions.push({ emoji, count: 1 });
        }
        return { ...m, reactions };
      })
    );
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)));
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(currentTeam.teamCode || 'CC2025AI');
    setCopiedCode(true);
    triggerToast('Team Code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const filteredTeams = allTeams.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.hackathonTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPeers = PEER_DIRECT_CHATS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredChannels = CAMPUS_CHANNELS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      ref={containerRef}
      className="flex-1 w-full h-full min-h-0 bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden flex relative select-auto"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs sm:text-sm animate-in fade-in">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. LEFT COLUMN: MESSAGES & DISCUSSIONS LIST (Adjustable Width via Resizer) */}
      <div
        style={{ width: `${messagesSidebarWidth}px` }}
        className="h-full border-r border-slate-200 flex flex-col bg-white shrink-0 min-w-[240px] max-w-[540px] overflow-hidden transition-[width] duration-75"
      >
        {/* Messages Header with Compose & Badges */}
        <div className="p-3.5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="font-black text-lg text-slate-900 tracking-tight">Messages</h2>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-extrabold rounded-full">
              {allTeams.length + PEER_DIRECT_CHATS.length} Active
            </span>
          </div>
          <button
            onClick={onOpenCreateTeam}
            title="Compose / Create Team"
            className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>

        {/* Search Conversations */}
        <div className="p-3 border-b border-slate-100 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search squads, peers, channels..."
              className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filter Tabs: All, Teams, Direct, Channels */}
        <div className="flex border-b border-slate-100 px-3 text-xs font-bold text-slate-500 gap-3 shrink-0 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All', count: allTeams.length + PEER_DIRECT_CHATS.length },
            { id: 'teams', label: 'Squads', count: allTeams.length },
            { id: 'direct', label: 'Direct', count: PEER_DIRECT_CHATS.length },
            { id: 'mentions', label: 'Channels', count: CAMPUS_CHANNELS.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold'
                  : 'hover:text-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Conversations List - Packed with Rich Information to the Bottom */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 min-h-0">
          {/* Section A: Teams & Squads (Shown in 'all' and 'teams') */}
          {(activeTab === 'all' || activeTab === 'teams') && (
            <div>
              <div className="px-3.5 py-2 bg-slate-50/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Active Squads & Hackathons</span>
                <span className="text-blue-600 font-bold">{filteredTeams.length} Active</span>
              </div>
              {filteredTeams.map((team, idx) => {
                const isSelected = team.id === currentTeam.id;
                const lastMsg =
                  team.messages && team.messages.length > 0
                    ? team.messages[team.messages.length - 1]
                    : null;
                const unreadCount = team.id === 'team_codecrafters' ? 3 : team.id === 'team_hackverse' ? 1 : 0;

                const avatarBg =
                  idx === 0
                    ? 'bg-blue-600'
                    : idx === 1
                    ? 'bg-slate-900'
                    : idx === 2
                    ? 'bg-gradient-to-tr from-purple-600 to-indigo-600'
                    : idx === 3
                    ? 'bg-emerald-700'
                    : 'bg-zinc-800';

                return (
                  <div
                    key={team.id}
                    onClick={() => onSelectTeam(team)}
                    className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors relative ${
                      isSelected ? 'bg-blue-50/90 border-l-4 border-blue-600 shadow-2xs' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div
                        className={`w-11 h-11 rounded-2xl ${avatarBg} text-white flex items-center justify-center font-bold text-xs shadow-2xs`}
                      >
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-0.5 -right-0.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 truncate">
                          <h4 className="font-extrabold text-xs text-slate-900 truncate">{team.name}</h4>
                          <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 text-[9px] font-bold rounded-md shrink-0">
                            Squad
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {lastMsg ? lastMsg.timestamp : team.createdDate}
                        </span>
                      </div>

                      <p className="text-[11px] text-blue-600 font-semibold truncate mt-0.5">
                        {team.hackathonTitle}
                      </p>

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-[11px] text-slate-500 truncate pr-2">
                          {lastMsg ? `${lastMsg.senderName.split(' ')[0]}: ${lastMsg.text}` : team.motto}
                        </p>
                        {unreadCount > 0 && (
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                            {unreadCount}
                          </span>
                        )}
                      </div>

                      {/* Squad Sub-info Chips */}
                      <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5 text-amber-500" />
                          <span>Due Oct 25</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <Users className="w-2.5 h-2.5 text-slate-400" />
                          <span>{team.members.length} Members</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Section B: Direct Peer Messages (Shown in 'all' and 'direct') */}
          {(activeTab === 'all' || activeTab === 'direct') && (
            <div>
              <div className="px-3.5 py-2 bg-slate-50/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Teammates & Peers</span>
                <span className="text-emerald-600 font-bold">● {filteredPeers.filter((p) => p.isOnline).length} Online</span>
              </div>
              {filteredPeers.map((peer) => (
                <div
                  key={peer.id}
                  onClick={() => triggerToast(`Opening 1:1 chat with ${peer.name}`)}
                  className="p-3.5 flex items-start gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="relative shrink-0">
                    <img
                      src={peer.avatar}
                      alt={peer.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    {peer.isOnline ? (
                      <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-0.5 -right-0.5" />
                    ) : (
                      <span className="w-3 h-3 rounded-full bg-slate-300 border-2 border-white absolute -bottom-0.5 -right-0.5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs text-slate-900 truncate">{peer.name}</h4>
                      <span className="text-[10px] text-slate-400">{peer.lastTime}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                      <span className="text-blue-600 font-semibold">{peer.role}</span>
                      <span>•</span>
                      <span>{peer.college}</span>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[11px] text-slate-500 truncate pr-2">{peer.lastMessage}</p>
                      {peer.unreadCount && peer.unreadCount > 0 ? (
                        <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                          {peer.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section C: Campus Hackathon Channels (Shown in 'all' and 'mentions') */}
          {(activeTab === 'all' || activeTab === 'mentions') && (
            <div>
              <div className="px-3.5 py-2 bg-slate-50/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Campus Channels</span>
                <span className="text-purple-600 font-bold">{filteredChannels.length} Channels</span>
              </div>
              {filteredChannels.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => triggerToast(`Opening #${channel.name} channel`)}
                  className="p-3.5 flex items-start gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm shrink-0">
                    <Hash className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs text-slate-900 truncate">#{channel.name}</h4>
                      <span className="text-[10px] text-slate-400">{channel.lastTime}</span>
                    </div>

                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{channel.description}</p>

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[11px] text-slate-600 font-medium truncate pr-2">
                        {channel.lastMessage}
                      </p>
                      {channel.unreadCount && channel.unreadCount > 0 ? (
                        <span className="w-4 h-4 rounded-full bg-purple-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                          {channel.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Anchored Bottom Status Bar (Student Hub Info) */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Devansh"
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" />
            </div>
            <div className="min-w-0">
              <p className="font-extrabold text-xs text-slate-900 truncate">Devansh (Lead)</p>
              <p className="text-[10px] text-slate-500 truncate">DTU CSE • Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => triggerToast('Mic unmuted')}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Voice Settings"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => triggerToast('Presence status: In Hackathon Focus Mode')}
              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
              title="Focus Mode"
            >
              <Radio className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DRAGGABLE RESIZER DIVIDER (Between Messages List and Chat Stream) */}
      {/* ========================================================================= */}
      <div
        onMouseDown={() => setIsDragging(true)}
        onDoubleClick={() => setMessagesSidebarWidth(340)}
        className="w-1.5 hover:w-2 bg-slate-200/90 hover:bg-blue-500 active:bg-blue-600 transition-all cursor-col-resize select-none shrink-0 flex items-center justify-center relative group z-10"
        title="Drag left or right to resize Messages vs Chat (Double-click to reset)"
      >
        <div className="w-4 h-8 rounded-full bg-white border border-slate-300 shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-3 h-3 text-slate-500" />
        </div>
      </div>

      {/* 2. CENTER COLUMN: TEAM GROUP DISCUSSION ROOM */}
      <div className="flex-1 h-full flex flex-col bg-[#F8FAFC] min-w-0 overflow-hidden">
        {/* Chat Header */}
        <div className="p-3.5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-slate-900 truncate">
                  {currentTeam.name}
                </h3>
                <span className="px-2 py-0.2 bg-purple-50 text-purple-700 text-[10px] font-extrabold rounded-md shrink-0">
                  Group Discussion
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full font-bold shrink-0">
                  ● 4 Online
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">{currentTeam.hackathonTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-500 shrink-0">
            {/* Show Open button ONLY when Hack Info is currently closed */}
            {!isHackInfoOpen && (
              <button
                type="button"
                onClick={() => setIsHackInfoOpen(true)}
                className="px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 transition-colors cursor-pointer shrink-0"
                title="Open Hackathon Info"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span className="whitespace-nowrap">Hack Info</span>
              </button>
            )}

            <button
              title="Voice Call"
              onClick={() => triggerToast('📞 Initiating group voice call...')}
              className="p-2 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              title="Video Call"
              onClick={() => triggerToast('📹 Initiating group video meeting...')}
              className="p-2 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Video className="w-4 h-4" />
            </button>
            <button
              title="Options"
              className="p-2 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Subtabs: Chat, Files, Tasks, Meetings, Notes */}
        <div className="flex items-center px-4 bg-white border-b border-slate-200 text-xs font-bold text-slate-500 gap-5 shrink-0">
          {[
            { id: 'chat', label: 'Chat' },
            { id: 'files', label: 'Files (8)' },
            { id: 'tasks', label: 'Tasks (5)' },
            { id: 'meetings', label: 'Meetings (2)' },
            { id: 'notes', label: 'Notes' },
          ].map((subtab) => (
            <button
              key={subtab.id}
              onClick={() => setActiveChatTab(subtab.id as any)}
              className={`py-2.5 transition-all cursor-pointer ${
                activeChatTab === subtab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold'
                  : 'hover:text-slate-800'
              }`}
            >
              {subtab.label}
            </button>
          ))}
        </div>

        {/* Top Pinned Sprint Milestone & Deadline Bar */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-purple-50/90 border-b border-blue-100/80 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Pin className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="font-extrabold text-slate-900">Sprint Goal: </span>
              <span className="text-slate-600">Multimodal Vision Pipeline & 3-Min Pitch Video Demo</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-extrabold rounded-md text-[10px] flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-600" />
              <span>3 Days Left (Oct 25)</span>
            </span>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500">
              <span>Progress:</span>
              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-3/5 h-full bg-emerald-500 rounded-full" />
              </div>
              <span className="font-bold text-slate-700">60%</span>
            </div>
          </div>
        </div>

        {/* Messages Stream - Fully Populated Down to the Bottom */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 min-h-0">
          <div className="text-center my-1">
            <span className="px-3 py-1 bg-slate-200/70 text-slate-600 text-[11px] font-bold rounded-full">
              Today • Official Squad Discussion
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.isCurrentUser;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {!isMe && (
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                )}

                <div className={`space-y-1 ${isMe ? 'items-end' : ''}`}>
                  {!isMe && (
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <span className="font-bold text-slate-900">{msg.senderName}</span>
                      {msg.senderRole && (
                        <span className="text-[10px] text-blue-600 font-semibold">
                          ({msg.senderRole})
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    </div>
                  )}

                  {/* Speech Bubble */}
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-[13px] relative shadow-2xs ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/80'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                    {/* GitHub Repo Card Preview */}
                    {msg.githubCard && (
                      <div className="mt-2.5 p-3 bg-slate-900 text-white rounded-xl border border-slate-800 flex items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                            <FileCode className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div className="truncate">
                            <p className="font-bold text-xs text-blue-300 hover:underline truncate">
                              {msg.githubCard.repo}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">
                              {msg.githubCard.description}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => triggerToast('Repository cloned to clipboard: git clone https://github.com/' + msg.githubCard?.repo)}
                          className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy Repo</span>
                        </button>
                      </div>
                    )}

                    {/* Attachment Card */}
                    {msg.attachment && (
                      <div className="mt-2.5 p-3 bg-blue-50 border border-blue-200/80 rounded-xl text-slate-900 flex items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <p className="font-bold text-xs text-slate-900 truncate">
                              {msg.attachment.name}
                            </p>
                            <p className="text-[10px] text-slate-500">{msg.attachment.size}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => triggerToast(`Downloading ${msg.attachment?.name}...`)}
                          className="p-1.5 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors cursor-pointer"
                          title="Download document"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Timestamp & read receipts for current user */}
                    {isMe && (
                      <div className="flex items-center justify-end gap-1 text-[10px] text-blue-100 mt-1">
                        <span>{msg.timestamp}</span>
                        <CheckCheck className="w-3.5 h-3.5 text-blue-200" />
                      </div>
                    )}
                  </div>

                  {/* Reaction Pills below bubbles */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      {msg.reactions.map((r, i) => (
                        <button
                          key={i}
                          onClick={() => handleToggleReaction(msg.id, r.emoji)}
                          className="px-2 py-0.5 bg-white border border-slate-200 rounded-full text-[11px] font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                        >
                          <span>{r.emoji}</span>
                          <span className="text-[10px] font-bold text-slate-500">{r.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Real-time Typing Indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-400 py-1 pl-1 animate-in fade-in">
            <div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] font-medium text-slate-500 ml-1.5">
                Priya Patel & Arjun are typing...
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Chips above the input bar */}
        <div className="px-3.5 py-1.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Quick:</span>
          {[
            { label: '📎 Share File', action: () => triggerToast('Select file to upload to squad workspace') },
            { label: '💻 Share Code', action: () => setNewMessageText('```typescript\n// Gemini client implementation\n```') },
            { label: '🎯 Add Sprint Task', action: () => triggerToast('Opening task creation modal') },
            { label: '📅 Schedule Standup', action: () => triggerToast('15m team standup calendar invite created') },
            { label: '💡 AI Review', action: () => handleSendMessage(undefined, '🤖 AI Mentor: Suggest improvements for our architecture pipeline!') },
          ].map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={chip.action}
              className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-lg text-[11px] whitespace-nowrap cursor-pointer transition-colors"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Chat Input Bar - Solidly Anchored at Bottom */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
        >
          <button
            type="button"
            onClick={() => triggerToast('Select files or code snippets to attach')}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setNewMessageText((prev) => prev + '```typescript\n\n```')}
            className="p-2 text-slate-400 hover:text-blue-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            title="Insert code snippet"
          >
            <Code className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            placeholder="Type a message or use @ to mention teammates..."
            className="flex-1 text-xs sm:text-sm px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setNewMessageText((prev) => prev + ' 🚀')}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            title="Add emoji"
          >
            <Smile className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => triggerToast('🎙️ Hold to record voice memo for squad')}
            className="p-2 text-slate-400 hover:text-blue-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            title="Record voice note"
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer shrink-0"
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 3. RIGHT COLUMN: HACKATHON INFO, TEAM DETAILS, TASKS & QUICK LINKS (Slidable Side Drawer) */}
      <div
        className={`transition-all duration-300 ease-in-out bg-white border-l border-slate-200 shrink-0 flex flex-col h-full overflow-hidden ${
          isHackInfoOpen
            ? 'w-80 lg:w-84 xl:w-90 opacity-100'
            : 'w-0 opacity-0 border-l-0 pointer-events-none'
        }`}
      >
        <div className="w-80 lg:w-84 xl:w-90 h-full overflow-y-auto p-4 space-y-4 flex-1">
          {/* Hackathon Info Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Hackathon Info</span>
              </span>
              <button
                type="button"
                onClick={() => setIsHackInfoOpen(false)}
                className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                title="Collapse Hackathon Info"
              >
                <span>Collapse</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 text-white p-4 relative shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">Google</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold text-[10px] rounded-full">
                  Registered
                </span>
              </div>
              <h4 className="font-extrabold text-sm mb-3">
                {currentTeam.hackathonTitle}
              </h4>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>25 Oct 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Online (Global)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>10k+ participants</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Details */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Team Details</span>
              <button
                onClick={() => triggerToast('Team Settings opened')}
                className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit className="w-3 h-3" />
                <span>Edit Team</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                <Users className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h5 className="font-black text-sm text-slate-900 truncate">{currentTeam.name}</h5>
                <p className="text-[11px] text-slate-500 truncate">{currentTeam.motto}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Team Size</span>
                <span className="font-bold text-slate-800">{currentTeam.members.length} / 5</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Created On</span>
                <span className="font-bold text-slate-800">{currentTeam.createdDate}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Team Visibility</span>
                <span className="font-bold text-slate-800">{currentTeam.visibility}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Team Code</span>
                <button
                  onClick={handleCopyCode}
                  className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>{currentTeam.teamCode || 'COD2586'}</span>
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Members (Avatars) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">
                Members ({currentTeam.members.length})
              </span>
              <button
                onClick={onOpenCreateTeam}
                className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Invite</span>
              </button>
            </div>

            <div className="space-y-2">
              {currentTeam.members.map((member) => (
                <div
                  key={member.id}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      {member.isLead && (
                        <Crown className="w-3 h-3 text-amber-500 fill-amber-500 absolute -top-1 -right-1" />
                      )}
                      {member.isMaster && (
                        <ShieldCheck className="w-3 h-3 text-emerald-600 absolute -top-1 -right-1" />
                      )}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {member.name}
                        </span>
                        {member.isLead && (
                          <span className="text-[9px] text-amber-600 font-bold bg-amber-50 px-1 rounded-sm">
                            Lead
                          </span>
                        )}
                        {member.isMaster && (
                          <span className="text-[9px] text-indigo-600 font-bold bg-indigo-50 px-1 rounded-sm">
                            Master
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {member.college} • {member.role}
                      </span>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tasks Progress */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Sprint Checklist</span>
              <span className="text-[11px] font-bold text-blue-600">
                {tasks.filter((t) => t.completed).length}/{tasks.length} Done
              </span>
            </div>
            <div className="space-y-1.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                    className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span
                    className={`truncate text-[11px] ${
                      task.completed ? 'line-through text-slate-400' : 'font-medium'
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick External Links */}
          <div className="space-y-2 pb-2">
            <span className="text-xs font-bold text-slate-900">Resources & Workspaces</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'GitHub Monorepo', icon: 'Code', url: 'https://github.com' },
                { name: 'Figma UI Kit', icon: 'Folder', url: 'https://figma.com' },
                { name: 'Notion Sprint', icon: 'FileText', url: 'https://notion.so' },
                { name: 'Drive Video & Deck', icon: 'Folder', url: 'https://drive.google.com' },
              ].map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white border border-slate-200 hover:border-blue-400 rounded-xl text-xs flex items-center justify-between transition-colors shadow-2xs group cursor-pointer"
                >
                  <span className="font-semibold text-slate-700 group-hover:text-blue-600 truncate text-[11px]">
                    {res.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
