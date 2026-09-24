import React, { useState } from 'react';
import { useStaticScroll } from '../hooks/useStaticScroll';
import {
  TrendingUp,
  Newspaper,
  BookOpen,
  ChevronRight,
  Cpu,
  Code2,
  Cloud,
  ShieldCheck,
  BarChart3,
  FileText,
  Network,
  Users,
  Check,
} from 'lucide-react';
import { TRENDING_TECHS, TECH_NEWS, RESEARCH_ARTICLES } from '../mockData';

interface RightSidebarProps {
  onSelectTag?: (tag: string) => void;
  className?: string;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  onSelectTag,
  className = '',
}) => {
  const trendingTechsRef = useStaticScroll<HTMLDivElement>();
  const suggestedForYouRef = useStaticScroll<HTMLDivElement>();
  const techNewsRef = useStaticScroll<HTMLDivElement>();
  const researchArticlesRef = useStaticScroll<HTMLDivElement>();

  const [connectedPeers, setConnectedPeers] = useState<Record<string, boolean>>({});

  const toggleConnect = (id: string) => {
    setConnectedPeers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const SIDEBAR_SUGGESTED_PEERS = [
    {
      id: 'side_peer_1',
      name: 'Sneha Patel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: '3rd Year • DA-IICT',
      domain: 'UI/UX & Product Design',
    },
    {
      id: 'side_peer_2',
      name: 'Arjun Mehta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: '2nd Year • BITS Pilani',
      domain: 'Robotics & AI/ML',
    },
    {
      id: 'side_peer_3',
      name: 'Muskan Jain',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      role: 'Final Year • DTU',
      domain: 'Data Science & MLOps',
    },
    {
      id: 'side_peer_4',
      name: 'Rohit Singh',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      role: '3rd Year • VIT Vellore',
      domain: 'Cybersecurity & Cloud',
    },
    {
      id: 'side_peer_5',
      name: 'Tanmay Bhatia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: '4th Year • IIT Bombay',
      domain: 'Systems & Rust Dev',
    },
    {
      id: 'side_peer_6',
      name: 'Priya Nair',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: '2nd Year • IIIT Hyderabad',
      domain: 'Next.js & Web3',
    },
  ];
  const getTechIcon = (type: string) => {
    switch (type) {
      case 'ai':
        return (
          <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
        );
      case 'code':
        return (
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <Code2 className="w-4 h-4" />
          </div>
        );
      case 'cloud':
        return (
          <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
            <Cloud className="w-4 h-4" />
          </div>
        );
      case 'shield':
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
        );
      case 'chart':
        return (
          <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <BarChart3 className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
            <Code2 className="w-4 h-4" />
          </div>
        );
    }
  };

  const getNewsLogo = (type: string) => {
    switch (type) {
      case 'openai':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#004236] flex items-center justify-center text-white shrink-0 shadow-xs">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M22.28 9.38a5.98 5.98 0 0 0-.49-4.88 6.07 6.07 0 0 0-6.17-2.92 5.96 5.96 0 0 0-4.3 1.94 6.05 6.05 0 0 0-5.71 1.74 6.03 6.03 0 0 0-.82 6.13 6 6 0 0 0-2.3 4.41 6.06 6.06 0 0 0 3.75 5.58 6 6 0 0 0 4.3 1.95 6.05 6.05 0 0 0 5.7-1.74 6.03 6.03 0 0 0 .82-6.13 6.06 6.06 0 0 0 5.22-6.08z" />
            </svg>
          </div>
        );
      case 'google':
        return (
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shrink-0 shadow-2xs">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>
        );
      case 'microsoft':
        return (
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center shrink-0 shadow-2xs">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2 h-2 bg-[#F25022]"></div>
              <div className="w-2 h-2 bg-[#7FBA00]"></div>
              <div className="w-2 h-2 bg-[#00A4EF]"></div>
              <div className="w-2 h-2 bg-[#FFB900]"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
            <Newspaper className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <aside className={`w-full shrink-0 space-y-4 ${className}`}>
      {/* Separated Section Header */}
      <div className="flex items-center justify-between px-2 pb-1 border-b border-slate-200/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
            Insights & Network
          </span>
        </div>
        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100/80">
          Live Updates
        </span>
      </div>

      {/* 1. Trending Techs Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-4.5 hover:shadow-xs transition-all">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="text-red-500 text-base leading-none">🔥</span>
            <h3 className="font-bold text-sm text-slate-900">Trending Techs</h3>
            <span className="text-[11px] text-slate-400 font-normal">(Last 24 Hours)</span>
          </div>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer">
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          ref={trendingTechsRef}
          className="pt-2 divide-y divide-slate-100 max-h-[300px] overflow-y-auto overscroll-contain pr-1 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300"
        >
          {TRENDING_TECHS.map((tech) => (
            <div
              key={tech.id}
              onClick={() => onSelectTag && onSelectTag(tech.name)}
              className="py-2.5 flex items-center justify-between group cursor-pointer hover:bg-slate-50/80 rounded-xl px-2 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                {getTechIcon(tech.iconType)}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-400">
                      {tech.id}
                    </span>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                      {tech.name}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-400">{tech.mentions}</p>
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-emerald-600 text-xs font-bold shrink-0">
                <span>↑</span>
                <span>{tech.growth}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Suggested for You Card (Connect with peers) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-4.5 hover:shadow-xs transition-all">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Suggested for You</h3>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">Peers</span>
        </div>

        <div
          ref={suggestedForYouRef}
          className="pt-2 space-y-3 max-h-[290px] overflow-y-auto overscroll-contain pr-1 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300"
        >
          {SIDEBAR_SUGGESTED_PEERS.map((peer) => {
            const isConnected = connectedPeers[peer.id];
            return (
              <div key={peer.id} className="flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={peer.avatar}
                    alt={peer.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-xs text-slate-900 truncate">
                      {peer.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">
                      {peer.role}
                    </p>
                    <p className="text-[10px] text-blue-600 font-semibold truncate">
                      {peer.domain}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleConnect(peer.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    isConnected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold'
                      : 'bg-blue-50/80 hover:bg-blue-100 text-blue-600 border border-blue-200/60 shadow-2xs'
                  }`}
                >
                  {isConnected ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Sent</span>
                    </span>
                  ) : (
                    'Connect'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Tech News Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-4.5 hover:shadow-xs transition-all">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <Newspaper className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Tech News</h3>
            <span className="text-[11px] text-slate-400 font-normal">(Last 24 Hours)</span>
          </div>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer">
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          ref={techNewsRef}
          className="pt-2 space-y-3 max-h-[300px] overflow-y-auto overscroll-contain pr-1 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300"
        >
          {TECH_NEWS.map((news) => (
            <a
              key={news.id}
              href={news.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-start justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 leading-snug line-clamp-2 transition-colors">
                  {news.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                  <span>{news.timeAgo}</span>
                  <span>•</span>
                  <span className="font-medium text-slate-500">{news.source}</span>
                </div>
              </div>
              {getNewsLogo(news.logoType)}
            </a>
          ))}
        </div>
      </div>

      {/* 3. Research Articles Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-4.5 hover:shadow-xs transition-all">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900">Research Articles</h3>
          </div>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer">
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          ref={researchArticlesRef}
          className="pt-2 space-y-3 max-h-[300px] overflow-y-auto overscroll-contain pr-1 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300"
        >
          {RESEARCH_ARTICLES.map((article, index) => (
            <div
              key={article.id}
              className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              {index === 0 ? (
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-[#09152b] border border-blue-950 flex items-center justify-center text-cyan-400 shrink-0">
                  <Network className="w-5 h-5" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 leading-snug line-clamp-2 transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                  {index === 0 ? (
                    <>
                      <span className="font-medium text-slate-500">{article.source}</span>
                      <span>•</span>
                      <span>{article.timeAgo}</span>
                    </>
                  ) : (
                    <>
                      <span>•</span>
                      <span className="font-semibold text-slate-600">IEEE</span>
                      <span>•</span>
                      <span>12h ago</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
