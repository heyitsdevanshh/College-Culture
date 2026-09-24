import React, { useState } from 'react';
import {
  Bookmark,
  Search,
  Trash2,
  ExternalLink,
  BookOpen,
  Newspaper,
  TrendingUp,
  Trophy,
  Briefcase,
  Zap,
  Calendar,
  MapPin,
  Clock,
  ArrowUpRight,
  Copy,
  Check,
  Plus,
  X,
  Sparkles,
  Share2,
  Code2,
  Flame,
  Globe,
  Tag,
} from 'lucide-react';
import {
  UPCOMING_HACKATHONS,
  INTERNSHIPS_DATA,
  TECH_NEWS,
  RESEARCH_ARTICLES,
  TRENDING_TECHS,
} from '../mockData';
import { HackathonItem, InternshipItem } from '../types';

export type BookmarkCategory =
  | 'all'
  | 'articles'
  | 'news'
  | 'trending-techs'
  | 'hackathons'
  | 'internships'
  | 'quick';

interface BookmarksViewProps {
  onNavigateView: (view: string, itemId?: string) => void;
  onViewHackathon?: (hackathonId: string) => void;
}

interface QuickBookmark {
  id: string;
  title: string;
  category: string;
  snippetOrUrl: string;
  type: 'snippet' | 'link' | 'note';
  tags: string[];
  savedAt: string;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  onNavigateView,
  onViewHackathon,
}) => {
  const [activeTab, setActiveTab] = useState<BookmarkCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal for adding quick bookmark
  const [isAddQuickModalOpen, setIsAddQuickModalOpen] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [quickType, setQuickType] = useState<'snippet' | 'link' | 'note'>('link');
  const [quickContent, setQuickContent] = useState('');
  const [quickTags, setQuickTags] = useState('');

  // Initial bookmarked IDs state so users can remove/toggle them
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([
    'res_1',
    'res_2',
    'res_3',
  ]);
  const [bookmarkedNews, setBookmarkedNews] = useState<string[]>([
    'news_1',
    'news_2',
    'news_3',
  ]);
  const [bookmarkedTechs, setBookmarkedTechs] = useState<number[]>([1, 2, 8]);
  const [bookmarkedHackathons, setBookmarkedHackathons] = useState<string[]>([
    'hack_google_ai',
    'hack_microsoft_cup',
  ]);
  const [bookmarkedInternships, setBookmarkedInternships] = useState<string[]>([
    'intern_infosys',
    'intern_google',
  ]);
  const [quickBookmarks, setQuickBookmarks] = useState<QuickBookmark[]>([
    {
      id: 'qb_1',
      title: 'Gemini 2.5 TypeScript SDK Client',
      category: 'Code Snippet',
      type: 'snippet',
      snippetOrUrl: `import { GoogleGenAI } from '@google/genai';\nconst ai = new GoogleGenAI({});\nconst res = await ai.models.generateContent({\n  model: 'gemini-2.5-flash',\n  contents: 'Hello, explain quantum entanglement in 2 sentences',\n});`,
      tags: ['AI', 'Gemini', 'SDK'],
      savedAt: 'Yesterday',
    },
    {
      id: 'qb_2',
      title: 'PostgreSQL Vector Search Extension (pgvector)',
      category: 'Cheat Sheet',
      type: 'snippet',
      snippetOrUrl: `CREATE EXTENSION IF NOT EXISTS vector;\nSELECT id, title FROM documents\nORDER BY embedding <=> '[0.012, -0.043, 0.089]' LIMIT 5;`,
      tags: ['Postgres', 'VectorDB', 'Embeddings'],
      savedAt: '2 days ago',
    },
    {
      id: 'qb_3',
      title: 'Hackathon Pitch Deck Standard Checklist (3-Min)',
      category: 'Pitch Note',
      type: 'note',
      snippetOrUrl: `1. Hook & Problem (30s) -> 2. Live Demo of core differentiator (75s) -> 3. Architecture & Gemini integration (30s) -> 4. Market impact & team (45s).`,
      tags: ['Hackathon', 'Pitch', 'Checklist'],
      savedAt: '3 days ago',
    },
    {
      id: 'qb_4',
      title: 'Developer Student Club Resource Portal',
      category: 'Resource Link',
      type: 'link',
      snippetOrUrl: 'https://developers.google.com/community/gdsc',
      tags: ['Campus', 'Community', 'Resources'],
      savedAt: 'Last week',
    },
  ]);

  // Extended articles list with full data
  const allArticles = [
    ...RESEARCH_ARTICLES,
    {
      id: 'res_3',
      title: 'Scaling Laws for Autonomous Multi-Agent Reasoning Chains',
      source: 'ACM Digital Library',
      timeAgo: '1d ago',
      iconType: 'doc' as const,
      readTime: '18 min read',
      abstract:
        'Investigation into emergent problem-solving in agentic workflows with iterative feedback loops and tool execution protocols.',
      tags: ['LLMs', 'Agentic AI', 'Reinforcement Learning'],
    },
  ];

  // Helper for toasts
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    triggerToast('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRemoveArticle = (id: string) => {
    setBookmarkedArticles((prev) => prev.filter((item) => item !== id));
    triggerToast('Article removed from bookmarks');
  };

  const handleRemoveNews = (id: string) => {
    setBookmarkedNews((prev) => prev.filter((item) => item !== id));
    triggerToast('News item removed from bookmarks');
  };

  const handleRemoveTech = (id: number) => {
    setBookmarkedTechs((prev) => prev.filter((item) => item !== id));
    triggerToast('Technology removed from bookmarks');
  };

  const handleRemoveHackathon = (id: string) => {
    setBookmarkedHackathons((prev) => prev.filter((item) => item !== id));
    triggerToast('Hackathon removed from bookmarks');
  };

  const handleRemoveInternship = (id: string) => {
    setBookmarkedInternships((prev) => prev.filter((item) => item !== id));
    triggerToast('Internship removed from bookmarks');
  };

  const handleRemoveQuick = (id: string) => {
    setQuickBookmarks((prev) => prev.filter((item) => item.id !== id));
    triggerToast('Quick item removed from bookmarks');
  };

  const handleAddQuickBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim() || !quickContent.trim()) return;

    const newQuick: QuickBookmark = {
      id: `qb_${Date.now()}`,
      title: quickTitle.trim(),
      category: quickType === 'snippet' ? 'Code Snippet' : quickType === 'link' ? 'Web Link' : 'Quick Note',
      type: quickType,
      snippetOrUrl: quickContent.trim(),
      tags: quickTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      savedAt: 'Just now',
    };

    setQuickBookmarks([newQuick, ...quickBookmarks]);
    setIsAddQuickModalOpen(false);
    setQuickTitle('');
    setQuickContent('');
    setQuickTags('');
    triggerToast('Saved to Quick Section!');
  };

  // Filtered collections
  const filteredArticles = allArticles
    .filter((a) => bookmarkedArticles.includes(a.id))
    .filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.source.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const filteredNews = TECH_NEWS.filter((n) => bookmarkedNews.includes(n.id)).filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTechs = TRENDING_TECHS.filter((t) =>
    bookmarkedTechs.includes(t.id)
  ).filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHackathons = UPCOMING_HACKATHONS.filter((h) =>
    bookmarkedHackathons.includes(h.id)
  ).filter(
    (h) =>
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredInternships = INTERNSHIPS_DATA.filter((i) =>
    bookmarkedInternships.includes(i.id)
  ).filter(
    (i) =>
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredQuick = quickBookmarks.filter(
    (q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.snippetOrUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalBookmarksCount =
    bookmarkedArticles.length +
    bookmarkedNews.length +
    bookmarkedTechs.length +
    bookmarkedHackathons.length +
    bookmarkedInternships.length +
    quickBookmarks.length;

  return (
    <div className="py-4 sm:py-6 max-w-5xl mx-auto w-full space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 text-xs font-semibold animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-200/70">
                <Bookmark className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Saved Bookmarks</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {totalBookmarksCount}
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Organized collection of your articles, news, trending techs, hackathons, internships & quick items.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddQuickModalOpen(true)}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Quick Bookmark</span>
            </button>
          </div>
        </div>

        {/* Search within bookmarks */}
        <div className="mt-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search saved articles, news, techs, hackathons, internships, snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All', icon: Bookmark, count: totalBookmarksCount },
          { id: 'articles', label: 'Articles', icon: BookOpen, count: bookmarkedArticles.length },
          { id: 'news', label: 'News', icon: Newspaper, count: bookmarkedNews.length },
          { id: 'trending-techs', label: 'Trending Techs', icon: TrendingUp, count: bookmarkedTechs.length },
          { id: 'hackathons', label: 'Hackathons', icon: Trophy, count: bookmarkedHackathons.length },
          { id: 'internships', label: 'Internships', icon: Briefcase, count: bookmarkedInternships.length },
          { id: 'quick', label: 'Quick Section', icon: Zap, count: quickBookmarks.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as BookmarkCategory)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="space-y-6">
        {/* 1. ARTICLES SECTION */}
        {(activeTab === 'all' || activeTab === 'articles') && filteredArticles.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Bookmarked Articles & Research Papers</span>
                <span className="text-xs font-medium text-slate-400">({filteredArticles.length})</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-100">
                        {article.source}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.timeAgo}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveArticle(article.id)}
                          title="Remove bookmark"
                          className="text-slate-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {'abstract' in article && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {(article as any).abstract}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {('tags' in article ? (article as any).tags : ['Machine Learning', 'Survey']).map(
                        (tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium"
                          >
                            #{tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {article.readTime || '10 min read'}
                    </span>
                    <a
                      href="https://arxiv.org"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>Read Paper</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. NEWS SECTION */}
        {(activeTab === 'all' || activeTab === 'news') && filteredNews.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                <Newspaper className="w-4 h-4 text-emerald-600" />
                <span>Saved Tech & Industry News</span>
                <span className="text-xs font-medium text-slate-400">({filteredNews.length})</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {filteredNews.map((news) => (
                <div
                  key={news.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {news.source}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveNews(news.id)}
                        title="Remove bookmark"
                        className="text-slate-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {news.title}
                    </h4>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">{news.timeAgo}</span>
                    <a
                      href={news.url || 'https://techcrunch.com'}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 hover:underline"
                    >
                      <span>Full Story</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. TRENDING TECHS SECTION */}
        {(activeTab === 'all' || activeTab === 'trending-techs') && filteredTechs.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span>Saved Trending Techs & Frameworks</span>
                <span className="text-xs font-medium text-slate-400">({filteredTechs.length})</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {filteredTechs.map((tech) => (
                <div
                  key={tech.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs border border-purple-100">
                        <Flame className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">
                          {tech.growth}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(tech.id)}
                          title="Remove bookmark"
                          className="text-slate-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 mt-2.5">{tech.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{tech.category}</p>
                    <p className="text-[11px] font-semibold text-slate-400 mt-1">{tech.mentions}</p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onNavigateView('explore')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Tech</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. HACKATHONS SECTION */}
        {(activeTab === 'all' || activeTab === 'hackathons') && filteredHackathons.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Bookmarked Hackathons</span>
                <span className="text-xs font-medium text-slate-400">({filteredHackathons.length})</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigateView('hackathons')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>Browse All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHackathons.map((hackathon) => (
                <div
                  key={hackathon.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                >
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                          {hackathon.organizer.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-900">{hackathon.title}</h4>
                          <span className="text-xs text-slate-500">{hackathon.organizer}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full border border-emerald-100">
                          {hackathon.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveHackathon(hackathon.id)}
                          title="Remove bookmark"
                          className="text-slate-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Prize Pool</span>
                        <span className="font-extrabold text-slate-800">{hackathon.prizePool}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Mode & Location</span>
                        <span className="font-semibold text-slate-700">{hackathon.mode}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {hackathon.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{hackathon.deadline}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (onViewHackathon) onViewHackathon(hackathon.id);
                        else onNavigateView('hackathons', hackathon.id);
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                    >
                      <span>View Hackathon</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. INTERNSHIPS SECTION */}
        {(activeTab === 'all' || activeTab === 'internships') && filteredInternships.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Bookmarked Internships</span>
                <span className="text-xs font-medium text-slate-400">({filteredInternships.length})</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigateView('internships')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>Browse All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={internship.companyLogo}
                          alt={internship.company}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-900">{internship.title}</h4>
                          <span className="text-xs text-slate-500 font-medium">{internship.company}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveInternship(internship.id)}
                        title="Remove bookmark"
                        className="text-slate-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {internship.stipend}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {internship.location}
                      </span>
                      <span className="text-slate-400 font-medium">({internship.mode})</span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {internship.tags.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Deadline: {internship.deadline}</span>
                    <button
                      type="button"
                      onClick={() => onNavigateView('internships', internship.id)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                    >
                      <span>Apply / View</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. QUICK SECTION */}
        {(activeTab === 'all' || activeTab === 'quick') && filteredQuick.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Quick Section (Snippets, Tools & Notes)</span>
                <span className="text-xs font-medium text-slate-400">({filteredQuick.length})</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddQuickModalOpen(true)}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Quick Item</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredQuick.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wide">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleCopy(item.snippetOrUrl, item.id)}
                          className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                          title="Copy content"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveQuick(item.id)}
                          title="Remove bookmark"
                          className="text-slate-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>

                    {item.type === 'snippet' ? (
                      <pre className="text-[11px] bg-slate-900 text-slate-100 p-2.5 rounded-xl font-mono overflow-x-auto scrollbar-none max-h-24">
                        {item.snippetOrUrl}
                      </pre>
                    ) : item.type === 'link' ? (
                      <a
                        href={item.snippetOrUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 break-all bg-blue-50/60 p-2 rounded-xl border border-blue-100/80"
                      >
                        <Globe className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.snippetOrUrl}</span>
                      </a>
                    ) : (
                      <p className="text-xs text-slate-600 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100 text-pretty leading-relaxed">
                        {item.snippetOrUrl}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {item.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 font-medium"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Saved {item.savedAt}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.snippetOrUrl, item.id)}
                      className="font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === item.id ? 'Copied to clipboard' : 'Copy snippet / URL'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State when no items match filter or search */}
        {((activeTab === 'articles' && filteredArticles.length === 0) ||
          (activeTab === 'news' && filteredNews.length === 0) ||
          (activeTab === 'trending-techs' && filteredTechs.length === 0) ||
          (activeTab === 'hackathons' && filteredHackathons.length === 0) ||
          (activeTab === 'internships' && filteredInternships.length === 0) ||
          (activeTab === 'quick' && filteredQuick.length === 0) ||
          (activeTab === 'all' &&
            filteredArticles.length === 0 &&
            filteredNews.length === 0 &&
            filteredTechs.length === 0 &&
            filteredHackathons.length === 0 &&
            filteredInternships.length === 0 &&
            filteredQuick.length === 0)) && (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-base">No bookmarks found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery
                ? `No saved items matching "${searchQuery}". Try changing your search query.`
                : `You haven't bookmarked any items in this category yet. Browse items and click the bookmark icon to save them.`}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Quick Bookmark Modal */}
      {isAddQuickModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">Add Quick Bookmark</h3>
              </div>
              <button
                onClick={() => setIsAddQuickModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddQuickBookmark} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gemini 2.5 Prompt Template"
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'link', label: 'Web Link' },
                    { id: 'snippet', label: 'Code Snippet' },
                    { id: 'note', label: 'Quick Note' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setQuickType(t.id as any)}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        quickType === t.id
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {quickType === 'link'
                    ? 'URL'
                    : quickType === 'snippet'
                    ? 'Code Content'
                    : 'Note Content'}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={
                    quickType === 'link'
                      ? 'https://example.com'
                      : quickType === 'snippet'
                      ? 'console.log("Hello CollegeHub");'
                      : 'Important checklist item...'
                  }
                  value={quickContent}
                  onChange={(e) => setQuickContent(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="AI, TypeScript, Tools"
                  value={quickTags}
                  onChange={(e) => setQuickTags(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddQuickModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save Bookmark
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
