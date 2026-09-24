import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  UserPlus,
  Search,
  CheckCircle,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Star,
  ChevronRight,
  Plus,
  X,
  CreditCard,
  MessageCircle,
  Compass,
  GraduationCap,
} from 'lucide-react';
import { HackathonItem, PeerInterested, HackathonMaster, TeamMember, HackathonTeam } from '../types';
import { PEERS_INTERESTED, HACKATHON_MASTERS } from '../mockData';
import { HackathonMasterPaymentModal } from '../components/HackathonMasterPaymentModal';

interface CreateTeamViewProps {
  hackathon: HackathonItem;
  onBackToHackathons: () => void;
  onTeamCreated: (newTeam: HackathonTeam) => void;
}

export const CreateTeamView: React.FC<CreateTeamViewProps> = ({
  hackathon,
  onBackToHackathons,
  onTeamCreated,
}) => {
  const [activeTab, setActiveTab] = useState<'interested' | 'connections' | 'college' | 'masters'>('interested');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  
  // Team info
  const [teamName, setTeamName] = useState('CodeCrafters');
  const [teamMotto, setTeamMotto] = useState('Turning ideas into intelligent solutions.');
  
  // Members in team
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'usr_devansh',
      name: 'You (Devansh)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: 'DTU',
      role: 'Team Lead & Full Stack',
      isLead: true,
    },
    {
      id: 'peer_riya',
      name: 'Riya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      college: 'IIIT Delhi',
      role: 'AI/ML Lead',
    },
  ]);

  const [peers, setPeers] = useState<PeerInterested[]>(PEERS_INTERESTED);
  const [masters, setMasters] = useState<HackathonMaster[]>(HACKATHON_MASTERS);
  const [payingMaster, setPayingMaster] = useState<HackathonMaster | null>(null);

  const [teamErrorToast, setTeamErrorToast] = useState<string | null>(null);

  const showTeamError = (msg: string) => {
    setTeamErrorToast(msg);
    setTimeout(() => setTeamErrorToast(null), 3000);
  };

  // Invite/Remove Peer
  const toggleInvitePeer = (peer: PeerInterested) => {
    const isAlreadyMember = teamMembers.some((m) => m.id === peer.id);
    if (isAlreadyMember) {
      setTeamMembers(teamMembers.filter((m) => m.id !== peer.id));
      setPeers(peers.map((p) => (p.id === peer.id ? { ...p, isInvited: false } : p)));
    } else {
      if (teamMembers.length >= 5) {
        showTeamError('Maximum team size reached (5 members).');
        return;
      }
      setTeamMembers([
        ...teamMembers,
        {
          id: peer.id,
          name: peer.name,
          avatar: peer.avatar,
          college: peer.college,
          role: peer.role.split('|')[0].trim(),
          skills: peer.skills,
        },
      ]);
      setPeers(peers.map((p) => (p.id === peer.id ? { ...p, isInvited: true } : p)));
    }
  };

  // Master hired after payment
  const handleMasterPaymentSuccess = (master: HackathonMaster) => {
    setPayingMaster(null);
    setMasters(masters.map((m) => (m.id === master.id ? { ...m, isHired: true } : m)));

    // Add master to team
    if (!teamMembers.some((m) => m.id === master.id)) {
      setTeamMembers([
        ...teamMembers,
        {
          id: master.id,
          name: master.name,
          avatar: master.avatar,
          role: 'Hackathon Master & Mentor',
          isMaster: true,
          skills: master.skills,
        },
      ]);
    }
  };

  const removeMember = (id: string) => {
    if (id === 'usr_devansh') return; // Cannot remove yourself
    setTeamMembers(teamMembers.filter((m) => m.id !== id));
    setPeers(peers.map((p) => (p.id === id ? { ...p, isInvited: false } : p)));
    setMasters(masters.map((m) => (m.id === id ? { ...m, isHired: false } : m)));
  };

  const handleGenerateTeamGroup = () => {
    const createdTeam: HackathonTeam = {
      id: `team_${Date.now()}`,
      name: teamName || 'Squad Alpha',
      motto: teamMotto || 'Innovating for victory!',
      hackathonId: hackathon.id,
      hackathonTitle: hackathon.title,
      hackathonBanner: hackathon.banner,
      createdDate: 'Today',
      visibility: 'Private',
      teamCode: `${(teamName || 'TM').slice(0, 3).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`,
      members: teamMembers,
      tasks: [
        { id: 't1', title: 'Finalize idea & problem statement', completed: true },
        { id: 't2', title: 'Build working prototype', completed: false },
        { id: 't3', title: 'Review with Hackathon Master / Mentor', completed: teamMembers.some((m) => m.isMaster) },
        { id: 't4', title: 'Prepare slide deck & demo video', completed: false },
        { id: 't5', title: 'Submit on hackathon portal', completed: false },
      ],
      quickLinks: [
        { title: 'GitHub', url: 'https://github.com', icon: 'github' },
        { title: 'Google Drive', url: 'https://drive.google.com', icon: 'drive' },
        { title: 'Notion Workspace', url: 'https://notion.so', icon: 'notion' },
        { title: 'Figma Canvas', url: 'https://figma.com', icon: 'figma' },
      ],
      messages: [
        {
          id: 'welcome_1',
          senderId: 'usr_devansh',
          senderName: 'You (Devansh)',
          senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          senderRole: 'Team Lead',
          isCurrentUser: true,
          text: `Welcome everyone to our team workspace for ${hackathon.title}! Let’s discuss our tech stack and assign responsibilities. 🚀`,
          timestamp: '10:00 AM',
          reactions: [{ emoji: '🔥', count: 3 }],
        },
        {
          id: 'welcome_2',
          senderId: 'peer_riya',
          senderName: 'Riya Sharma',
          senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          senderRole: 'AI/ML Lead',
          isCurrentUser: false,
          text: `Excited to build together! I've prepared our baseline architecture and prompt pipelines. Let's make this a winning project! 💡`,
          timestamp: '10:04 AM',
          reactions: [{ emoji: '🚀', count: 2 }],
        },
        {
          id: 'welcome_3',
          senderId: 'peer_arjun',
          senderName: 'Arjun Mehta',
          senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
          senderRole: 'Cloud & DevOps',
          isCurrentUser: false,
          text: `I've initialized our repository with Docker compose and GitHub Actions CI. Ready for code push:`,
          timestamp: '10:15 AM',
          githubCard: {
            repo: `${(teamName || 'team').toLowerCase().replace(/\s+/g, '-')}/hackathon-core`,
            description: `Full stack monorepo with React 19, Node.js, and Gemini multimodal pipeline`,
            url: 'https://github.com',
          },
          reactions: [{ emoji: '👍', count: 4 }],
        },
        {
          id: 'welcome_4',
          senderId: 'peer_sneha',
          senderName: 'Sneha Patel',
          senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
          senderRole: 'UI/UX & Video',
          isCurrentUser: false,
          text: `Shared our slide deck outline and judge presentation rubric! Review the PDF below:`,
          timestamp: '10:22 AM',
          attachment: {
            name: `${(teamName || 'Team').replace(/\s+/g, '_')}_PitchDeck_v1.pdf`,
            size: '8.4 MB',
            type: 'pdf',
            url: '#',
          },
          reactions: [{ emoji: '🙌', count: 2 }],
        },
        ...(teamMembers.some((m) => m.isMaster) && teamMembers.find((m) => m.isMaster)
          ? [
              {
                id: 'master_welcome',
                senderId: 'master_mentor',
                senderName: teamMembers.find((m) => m.isMaster)!.name,
                senderAvatar: teamMembers.find((m) => m.isMaster)!.avatar,
                senderRole: 'Hackathon Master & Mentor',
                isCurrentUser: false,
                isMaster: true,
                text: `Glad to join the squad! I will review your idea document and help refine your architecture and judging pitch. Feel free to ping me here anytime! 🎯`,
                timestamp: '10:25 AM',
              },
            ]
          : []),
      ],
    };

    onTeamCreated(createdTeam);
  };

  // Filter peers
  const filteredPeers = peers.filter((p) => {
    if (activeTab === 'connections' && p.connectionType !== 'connection') return false;
    if (activeTab === 'college' && p.connectionType !== 'college') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCollege = p.college.toLowerCase().includes(q);
      const matchSkill = p.skills.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchCollege && !matchSkill) return false;
    }
    return true;
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto py-5 px-3 sm:px-6 space-y-6">
      {/* Toast Warning */}
      {teamErrorToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <span>⚠️ {teamErrorToast}</span>
        </div>
      )}

      {/* Top Breadcrumb & Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={onBackToHackathons}
            className="hover:text-blue-600 transition-colors font-medium cursor-pointer"
          >
            Hackathons
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium text-slate-700 truncate max-w-[200px]">
            {hackathon.title}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-blue-600">Create Team</span>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-blue-600">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Create Team</span>
          </div>
          <div className="w-8 h-0.5 bg-blue-200" />
          <div className="flex items-center gap-1.5 font-semibold text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Add Members</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200" />
          <div className="flex items-center gap-1.5 font-semibold text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">
              3
            </span>
            <span>Confirm & Chat</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Flow / Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Team Options & Member Directory */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Title */}
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Create Your Hackathon Team
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              How do you want to build your team? Choose the option that works best for you.
            </p>
          </div>

          {/* 3 Main Choice Cards (Image 2) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Option 1: Build with Connections (Free) */}
            <div
              onClick={() => setActiveTab('connections')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                activeTab === 'connections'
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200/90 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold">
                    Free
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900">
                  Build with Connections
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Find teammates from your network, college or communities.
                </p>

                <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Invite your friends
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Find people from your college
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Browse interested peers
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="mt-4 w-full py-2 bg-white border border-blue-200 text-blue-700 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-1"
              >
                <span>Find Teammates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Option 2: Get Field Experts / Hackathon Masters (Premium / Paid) */}
            <div
              onClick={() => setActiveTab('masters')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                activeTab === 'masters'
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-500/20'
                  : 'border-indigo-200 bg-gradient-to-b from-indigo-50/40 to-white hover:border-indigo-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-extrabold flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                    <span>Paid Mentors</span>
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900">
                  Invite Hackathon Masters
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Connect with verified experts, mentors or professionals for direct team guidance.
                </p>

                <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Access domain experts (AI/ML, DevOps)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    1:1 or team-based collaboration
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Joined directly to team group chat
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-1 shadow-xs"
              >
                <span>Browse Field Experts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Option 3: Create Team by Yourself */}
            <div
              onClick={() => setActiveTab('interested')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                activeTab === 'interested'
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200/90 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold">
                    Custom
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900">
                  Create a Team by Yourself
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Create a new team and let others join you or assemble public squads.
                </p>

                <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    Set team name & description
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    Make it public or private
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    In-app Team Group Discussion room
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="mt-4 w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-1"
              >
                <span>Customize Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Directory & Tabs Section */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            {/* Filter Tabs */}
            <div className="flex items-center border-b border-slate-200 px-4 pt-3 gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('interested')}
                className={`pb-3 px-3 text-xs font-bold whitespace-nowrap transition-colors relative cursor-pointer ${
                  activeTab === 'interested'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>People Interested ({peers.length + 118})</span>
              </button>

              <button
                onClick={() => setActiveTab('connections')}
                className={`pb-3 px-3 text-xs font-bold whitespace-nowrap transition-colors relative cursor-pointer ${
                  activeTab === 'connections'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>Your Connections (18)</span>
              </button>

              <button
                onClick={() => setActiveTab('college')}
                className={`pb-3 px-3 text-xs font-bold whitespace-nowrap transition-colors relative cursor-pointer ${
                  activeTab === 'college'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>From Your College (32)</span>
              </button>

              <button
                onClick={() => setActiveTab('masters')}
                className={`pb-3 px-3 text-xs font-extrabold whitespace-nowrap transition-colors relative cursor-pointer flex items-center gap-1 ${
                  activeTab === 'masters'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-indigo-600/80 hover:text-indigo-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hackathon Masters (Paid Mentors)</span>
                <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-full text-[9px] font-bold">
                  {masters.length}
                </span>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="p-4 bg-slate-50/60 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, skills or college..."
                  className="w-full text-xs pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium"
                >
                  <option value="All">All Skills</option>
                  <option value="AI">AI/ML</option>
                  <option value="React">React / Web</option>
                  <option value="Cloud">Cloud / DevOps</option>
                </select>

                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium"
                >
                  <option value="All">All Roles</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="ML">ML Expert</option>
                </select>
              </div>
            </div>

            {/* List Content: Masters vs Peers */}
            <div className="p-4 divide-y divide-slate-100">
              {activeTab === 'masters' ? (
                /* HACKATHON MASTERS LIST */
                <div className="space-y-4">
                  <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center justify-between text-xs text-indigo-900">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      <span>
                        Hackathon Masters are seasoned winners and tech leads. Pay their nominal fee to invite them into your Team Group Discussion!
                      </span>
                    </div>
                  </div>

                  {masters.map((master) => {
                    const isAdded = teamMembers.some((m) => m.id === master.id);
                    return (
                      <div
                        key={master.id}
                        className="pt-4 first:pt-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="relative">
                            <img
                              src={master.avatar}
                              alt={master.name}
                              className="w-13 h-13 rounded-full object-cover border-2 border-indigo-200"
                            />
                            <span className="absolute -bottom-1 -right-1 p-0.5 bg-amber-400 text-amber-950 rounded-full">
                              <Star className="w-3 h-3 fill-amber-950" />
                            </span>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-slate-900">
                                {master.name}
                              </h4>
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                <span>{master.rating} ({master.reviewsCount})</span>
                              </span>
                              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-semibold">
                                {master.organization}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 mt-0.5 font-medium">
                              {master.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 max-w-xl">
                              {master.bio}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {master.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-semibold"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Pricing & CTA */}
                        <div className="flex items-center md:flex-col items-end gap-2 shrink-0 w-full md:w-auto justify-between md:justify-center">
                          <div className="text-right">
                            <span className="text-[11px] text-slate-400 block">Mentorship Fee</span>
                            <span className="text-base font-extrabold text-indigo-600">
                              {master.currency}{master.mentoringFee}
                            </span>
                          </div>

                          {isAdded ? (
                            <button
                              type="button"
                              onClick={() => removeMember(master.id)}
                              className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-emerald-100"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Master in Team (Remove)</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setPayingMaster(master)}
                              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Pay & Invite Master</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* PEERS LIST (Connections / College / Interested) */
                <div className="space-y-3">
                  {filteredPeers.map((peer) => {
                    const isInvited = teamMembers.some((m) => m.id === peer.id);
                    return (
                      <div
                        key={peer.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={peer.avatar}
                            alt={peer.name}
                            className="w-11 h-11 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-slate-900">
                                {peer.name}
                              </h4>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-500 font-medium">
                                {peer.college}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 mt-0.5">
                              {peer.role}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {peer.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-semibold"
                                >
                                  {skill}
                                </span>
                              ))}
                              <span className="text-[11px] text-slate-400 ml-1">
                                Looking for: <strong className="text-slate-600">{peer.lookingFor}</strong>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                          <button
                            type="button"
                            onClick={() => toggleInvitePeer(peer)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                              isInvited
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-2xs'
                            }`}
                          >
                            {isInvited ? (
                              <>
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Invited (In Team)</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Invite to Team</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Team Preview & Generate Group Discussion */}
        <div className="lg:col-span-4 space-y-5">
          {/* Hackathon Mini Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
            <div className="h-28 rounded-xl overflow-hidden relative bg-slate-900 mb-3">
              <img
                src={hackathon.banner}
                alt={hackathon.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-2.5 left-3 text-white">
                <span className="text-[11px] text-blue-300 font-bold block">{hackathon.organizer}</span>
                <h4 className="font-bold text-xs text-white truncate max-w-[240px]">
                  {hackathon.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Deadline: <strong className="text-slate-700">{hackathon.deadline}</strong></span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[10px]">
                Registered ✓
              </span>
            </div>
          </div>

          {/* Your Team Config Box (Image 2) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">
                Your Team
              </h3>
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-extrabold text-xs rounded-full">
                Team size: {teamMembers.length}/5
              </span>
            </div>

            {/* Team Name Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Team Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. CodeCrafters"
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900"
              />
            </div>

            {/* Team Motto Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Team Motto / Idea
              </label>
              <input
                type="text"
                value={teamMotto}
                onChange={(e) => setTeamMotto(e.target.value)}
                placeholder="e.g. Turning ideas into intelligent solutions."
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-700"
              />
            </div>

            {/* Selected Members List */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Confirmed Squad ({teamMembers.length})
              </span>

              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {member.name}
                        </span>
                        {member.isLead && (
                          <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-full text-[9px] font-bold">
                            Lead
                          </span>
                        )}
                        {member.isMaster && (
                          <span className="px-1.5 py-0.2 bg-indigo-100 text-indigo-800 rounded-full text-[9px] font-bold">
                            Master
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {!member.isLead && (
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 rounded-full transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Generate Team Group Discussion CTA */}
            <button
              type="button"
              onClick={handleGenerateTeamGroup}
              className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
              <span>Create Team Group Discussion</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Creates a dedicated collaborative in-app Group Discussion with your squad!
            </p>
          </div>

          {/* Need Help Tips Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>Need Help Finding Teammates?</span>
            </h4>
            <ul className="text-slate-500 text-[11px] space-y-1.5 pl-3 list-disc">
              <li>Aim for a balanced squad: 1-2 Full Stack devs, 1 AI/ML specialist, 1 UI/UX designer.</li>
              <li>College peers get priority matching and faster coordination.</li>
              <li>Hiring a Hackathon Master guarantees structured design and judging pitch guidance.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Modal if hiring a master */}
      {payingMaster && (
        <HackathonMasterPaymentModal
          master={payingMaster}
          hackathonTitle={hackathon.title}
          onClose={() => setPayingMaster(null)}
          onSuccess={handleMasterPaymentSuccess}
        />
      )}
    </div>
  );
};
