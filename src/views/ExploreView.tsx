import React, { useState } from 'react';
import {
  Users,
  Search,
  UserPlus,
  Check,
  CheckCircle2,
  Github,
  Clock,
  Send,
  UserCheck,
  X,
  MessageSquare,
  UserX,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export interface ConnectionUser {
  id: string;
  name: string;
  avatar: string;
  college: string;
  domains: string[];
  skills: string[];
  github?: string;
  mutualCount?: number;
  note?: string;
  timestamp?: string;
}

interface ExploreViewProps {
  onNavigate?: (view: string) => void;
}

// 1. Initial My Connection peers (Expanded for rich slidebar experience)
const INITIAL_MY_CONNECTIONS: ConnectionUser[] = [
  {
    id: 'c1',
    name: 'Riya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    college: 'Delhi Technological University (DTU)',
    domains: ['AI / Machine Learning', 'Web Development'],
    skills: ['Python', 'PyTorch', 'Next.js', 'FastAPI'],
    github: 'riya-ml',
    timestamp: 'Connected Jan 2026',
    mutualCount: 14,
  },
  {
    id: 'c2',
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    college: 'IIT Delhi',
    domains: ['Robotics & IoT', 'Embedded Systems'],
    skills: ['ROS 2', 'TensorFlow', 'C++', 'Raspberry Pi'],
    github: 'arjun-bot',
    timestamp: 'Connected Feb 2026',
    mutualCount: 9,
  },
  {
    id: 'c3',
    name: 'Sneha Rao',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    college: 'BITS Pilani',
    domains: ['UI/UX Design', 'Frontend Systems'],
    skills: ['Figma', 'Flutter', 'TypeScript', 'Tailwind'],
    github: 'sneha-designs',
    timestamp: 'Connected Feb 2026',
    mutualCount: 6,
  },
  {
    id: 'c4',
    name: 'Tanmay Bhattacharya',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    college: 'IIT Kharagpur',
    domains: ['Distributed Systems', 'Go / Rust'],
    skills: ['Docker', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    github: 'tanmay-dist',
    timestamp: 'Connected Mar 2026',
    mutualCount: 11,
  },
  {
    id: 'c5',
    name: 'Diya Nambiar',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    college: 'NIT Calicut',
    domains: ['Full Stack Development', 'Cloud DevOps'],
    skills: ['React', 'Node.js', 'GraphQL', 'AWS'],
    github: 'diya-dev',
    timestamp: 'Connected Mar 2026',
    mutualCount: 8,
  },
  {
    id: 'c6',
    name: 'Karthik Raman',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    college: 'Anna University, Chennai',
    domains: ['Blockchain', 'Smart Contracts'],
    skills: ['Solidity', 'Rust', 'Web3.js', 'Hardhat'],
    github: 'karthik-crypto',
    timestamp: 'Connected Mar 2026',
    mutualCount: 5,
  },
];

// 2. Initial Received Requests (Inbound)
const INITIAL_RECEIVED_REQUESTS: ConnectionUser[] = [
  {
    id: 'r1',
    name: 'Aman Verma',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    college: 'NIT Trichy',
    domains: ['Competitive Programming', 'Cybersecurity'],
    skills: ['C++', 'Algorithms', 'Network Security'],
    github: 'aman-v',
    note: 'Hey! Loved your distributed crawler project on GitHub. Would love to team up for SIH 2026!',
    timestamp: '2 hours ago',
    mutualCount: 5,
  },
  {
    id: 'r2',
    name: 'Ananya Iyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    college: 'IIT Bombay',
    domains: ['NLP & GenAI', 'Deep Learning'],
    skills: ['LangChain', 'HuggingFace', 'Python'],
    github: 'ananya-nlp',
    note: 'Working on multimodal agents research at IIT Bombay. Let’s connect!',
    timestamp: '1 day ago',
    mutualCount: 8,
  },
  {
    id: 'r3',
    name: 'Rohan Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    college: 'COEP Pune',
    domains: ['Mobile Dev', 'Flutter'],
    skills: ['Flutter', 'Dart', 'Firebase'],
    github: 'rohan-apps',
    note: 'Building an open-source campus attendance system. Let’s exchange notes.',
    timestamp: '2 days ago',
    mutualCount: 3,
  },
];

// 3. Initial Sent Requests (Outgoing)
const INITIAL_SENT_REQUESTS: ConnectionUser[] = [
  {
    id: 's1',
    name: 'Kunal Patel',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    college: 'VIT Vellore',
    domains: ['Cloud Computing', 'K8s'],
    skills: ['Docker', 'Kubernetes', 'Go'],
    github: 'kunal-dev',
    timestamp: 'Sent 3 days ago',
    mutualCount: 3,
  },
  {
    id: 's2',
    name: 'Pooja Hegde',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    college: 'PES University, Bengaluru',
    domains: ['Data Engineering', 'AWS'],
    skills: ['Apache Spark', 'Python', 'AWS'],
    github: 'pooja-data',
    timestamp: 'Sent yesterday',
    mutualCount: 7,
  },
  {
    id: 's3',
    name: 'Vikramaditya Rao',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    college: 'IIT Roorkee',
    domains: ['Quantum Computing', 'Algorithms'],
    skills: ['Qiskit', 'Python', 'Linear Algebra'],
    github: 'vikram-q',
    timestamp: 'Sent 4 days ago',
    mutualCount: 4,
  },
];

export const ExploreView: React.FC<ExploreViewProps> = ({ onNavigate }) => {
  const [myConnections, setMyConnections] = useState<ConnectionUser[]>(INITIAL_MY_CONNECTIONS);
  const [receivedRequests, setReceivedRequests] = useState<ConnectionUser[]>(INITIAL_RECEIVED_REQUESTS);
  const [sentRequests, setSentRequests] = useState<ConnectionUser[]>(INITIAL_SENT_REQUESTS);

  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // 1. Accept Received Request -> Moves into My Connections
  const handleAcceptReceived = (request: ConnectionUser) => {
    setReceivedRequests((prev) => prev.filter((r) => r.id !== request.id));
    setMyConnections((prev) => [
      {
        ...request,
        timestamp: 'Connected just now',
      },
      ...prev,
    ]);
    showToast(`Connected with ${request.name}! Added to My Connections.`);
  };

  // 2. Decline Received Request
  const handleDeclineReceived = (id: string, name: string) => {
    setReceivedRequests((prev) => prev.filter((r) => r.id !== id));
    showToast(`Request from ${name} declined.`);
  };

  // 3. Withdraw Sent Request
  const handleWithdrawSent = (id: string, name: string) => {
    setSentRequests((prev) => prev.filter((s) => s.id !== id));
    showToast(`Request to ${name} withdrawn.`);
  };

  // 4. Remove from My Connections
  const handleRemoveConnection = (id: string, name: string) => {
    if (window.confirm(`Remove ${name} from your connections?`)) {
      setMyConnections((prev) => prev.filter((c) => c.id !== id));
      showToast(`Removed ${name} from your connections.`);
    }
  };

  // Filter helper for global search
  const filterList = (list: ConnectionUser[]) => {
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.college.toLowerCase().includes(q) ||
        u.domains.some((d) => d.toLowerCase().includes(q)) ||
        u.skills.some((s) => s.toLowerCase().includes(q))
    );
  };

  const filteredConnections = filterList(myConnections);
  const filteredReceived = filterList(receivedRequests);
  const filteredSent = filterList(sentRequests);

  return (
    <div className="flex-1 w-full max-w-7xl py-6 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Card with Title and Integrated Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <span>My Connections</span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              {myConnections.length} Active
            </span>
          </h1>
        </div>

        {/* Global Search across connections and requests */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search connections or requests..."
            className="w-full text-xs pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Layout:
          - Left (Bigger): My Connections List with its own dedicated slidebar
          - Right Side:
              - Upper Section: Request Received with individual slidebar
              - Lower Section: Request Sent with individual slidebar
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ===================================================================
            LEFT / MAIN (BIGGER): MY CONNECTIONS LIST
            =================================================================== */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">My Connections</h2>
                <p className="text-xs text-slate-500">Your direct campus network and collaborators</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200/70">
              {myConnections.length} Connections
            </span>
          </div>

          {/* Individual Slidebar for My Connections */}
          <div className="overflow-y-auto max-h-[720px] pr-2 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-50 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
            {filteredConnections.length === 0 ? (
              <div className="text-center py-16 px-4 bg-slate-50/60 rounded-2xl border border-slate-100">
                <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">No connections found</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Try searching for another name or skill.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredConnections.map((conn) => (
                  <div
                    key={conn.id}
                    className="bg-white hover:bg-slate-50/80 p-4.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Avatar & Details */}
                      <div className="flex items-start gap-3.5">
                        <div className="relative shrink-0">
                          <img
                            src={conn.avatar}
                            alt={conn.name}
                            className="w-13 h-13 rounded-full object-cover border border-slate-200"
                          />
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-sm text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                            {conn.name}
                          </h3>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{conn.college}</p>
                          {conn.github && (
                            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                              <Github className="w-3.5 h-3.5" />
                              <span className="font-mono text-slate-600">{conn.github}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Domains */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {conn.domains.map((dom) => (
                          <span
                            key={dom}
                            className="text-[10px] font-bold text-blue-700 bg-blue-50/90 px-2 py-0.5 rounded-md border border-blue-100"
                          >
                            {dom}
                          </span>
                        ))}
                      </div>

                      {/* Skills */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {conn.skills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">
                        {conn.timestamp || 'Connected'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRemoveConnection(conn.id, conn.name)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove connection"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (onNavigate) onNavigate('messages');
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Message</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================
            RIGHT SIDE:
            - UPPER SECTION: REQUEST RECEIVED
            - LOWER SECTION: REQUEST SENT
            =================================================================== */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 flex flex-col">
          {/* ---------------------------------------------------------------
              RIGHT UPPER SECTION: REQUEST RECEIVED
              --------------------------------------------------------------- */}
          <div className="bg-white rounded-3xl border border-amber-200/90 shadow-2xs p-5 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-amber-100 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/70">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">Request Received</h2>
                  <p className="text-[11px] text-slate-500">Inbound invitations from peers</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200/80">
                {receivedRequests.length}
              </span>
            </div>

            {/* Individual Slidebar for Request Received */}
            <div className="overflow-y-auto max-h-[320px] pr-1.5 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-50 [&::-webkit-scrollbar-thumb]:bg-amber-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-amber-300">
              {filteredReceived.length === 0 ? (
                <div className="text-center py-8 px-3 bg-amber-50/30 rounded-2xl border border-amber-100/60">
                  <UserCheck className="w-6 h-6 text-amber-300 mx-auto mb-1" />
                  <p className="text-xs font-bold text-slate-600">No requests received</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Incoming invitations will appear here.</p>
                </div>
              ) : (
                filteredReceived.map((req) => (
                  <div
                    key={req.id}
                    className="bg-amber-50/25 hover:bg-amber-50/45 p-3 rounded-2xl border border-amber-200/80 transition-all flex flex-col justify-between gap-2.5"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={req.avatar}
                        alt={req.name}
                        className="w-10 h-10 rounded-full object-cover border border-amber-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-bold text-xs text-slate-900 truncate">{req.name}</h3>
                          <span className="text-[9px] font-medium text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded-md shrink-0">
                            {req.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{req.college}</p>
                        {req.mutualCount && (
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {req.mutualCount} mutual connections
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Note */}
                    {req.note && (
                      <div className="p-2 rounded-xl bg-white/90 border border-amber-200/60 text-[11px] text-slate-700 italic">
                        "{req.note}"
                      </div>
                    )}

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1">
                      {req.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="px-1.5 py-0.5 bg-white text-slate-600 rounded-md text-[10px] font-medium border border-slate-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Actions: Accept & Ignore */}
                    <div className="pt-2 border-t border-amber-100/80 flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleDeclineReceived(req.id, req.name)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-white transition-colors cursor-pointer"
                      >
                        Ignore
                      </button>
                      <button
                        onClick={() => handleAcceptReceived(req)}
                        className="px-3.5 py-1 rounded-lg text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                        <span>Accept</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ---------------------------------------------------------------
              RIGHT LOWER SECTION: REQUEST SENT
              --------------------------------------------------------------- */}
          <div className="bg-white rounded-3xl border border-indigo-200/90 shadow-2xs p-5 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-indigo-100 mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200/70">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">Request Sent</h2>
                  <p className="text-[11px] text-slate-500">Invitations awaiting acceptance</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200/80">
                {sentRequests.length}
              </span>
            </div>

            {/* Individual Slidebar for Request Sent */}
            <div className="overflow-y-auto max-h-[320px] pr-1.5 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-50 [&::-webkit-scrollbar-thumb]:bg-indigo-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-indigo-300">
              {filteredSent.length === 0 ? (
                <div className="text-center py-8 px-3 bg-indigo-50/30 rounded-2xl border border-indigo-100/60">
                  <Send className="w-6 h-6 text-indigo-300 mx-auto mb-1" />
                  <p className="text-xs font-bold text-slate-600">No sent requests pending</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Invitations you send appear here.</p>
                </div>
              ) : (
                filteredSent.map((sent) => (
                  <div
                    key={sent.id}
                    className="bg-indigo-50/20 hover:bg-indigo-50/40 p-3 rounded-2xl border border-indigo-200/80 transition-all flex flex-col justify-between gap-2.5"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={sent.avatar}
                        alt={sent.name}
                        className="w-10 h-10 rounded-full object-cover border border-indigo-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-bold text-xs text-slate-900 truncate">{sent.name}</h3>
                          <span className="text-[9px] font-bold text-indigo-700 bg-indigo-100/90 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shrink-0">
                            <Clock className="w-2.5 h-2.5" />
                            <span>Pending</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{sent.college}</p>
                        {sent.mutualCount && (
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {sent.mutualCount} mutual connections
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Domains */}
                    <div className="flex flex-wrap gap-1">
                      {sent.domains.map((dom) => (
                        <span
                          key={dom}
                          className="px-1.5 py-0.5 bg-white text-indigo-700 rounded-md text-[10px] font-medium border border-indigo-200/60"
                        >
                          {dom}
                        </span>
                      ))}
                    </div>

                    {/* Footer & Withdraw */}
                    <div className="pt-2 border-t border-indigo-100 flex items-center justify-between text-[11px]">
                      <span className="text-[10px] text-slate-400">{sent.timestamp}</span>
                      <button
                        onClick={() => handleWithdrawSent(sent.id, sent.name)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-600 hover:text-red-600 hover:bg-white border border-slate-200 hover:border-red-200 transition-colors cursor-pointer"
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
