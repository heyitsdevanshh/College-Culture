import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  Image as ImageIcon,
  Calendar,
  BarChart2,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Send,
  Flame,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { Post, Story, UserProfile } from '../types';
import { CreatePostModal } from '../components/CreatePostModal';
import { StoryViewerModal } from '../components/StoryViewerModal';

const HOME_TRENDING_TECHS = [
  {
    id: 'tech_gemini',
    name: 'Gemini 2.5 & Agents',
    category: 'Multimodal AI',
    tag: 'AI',
    growth: '+58%',
    projectsCount: '2.4k',
    icon: '⚡',
    badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  },
  {
    id: 'tech_nextjs',
    name: 'Next.js 15 & React 19',
    category: 'Full-Stack Web',
    tag: 'WebDev',
    growth: '+44%',
    projectsCount: '4.2k',
    icon: '⚛️',
    badgeColor: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    id: 'tech_rust',
    name: 'Rust & WebAssembly',
    category: 'High-Perf Systems',
    tag: 'Rust',
    growth: '+72%',
    projectsCount: '1.1k',
    icon: '🦀',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
  },
  {
    id: 'tech_docker',
    name: 'Docker & Kubernetes',
    category: 'Cloud & Containers',
    tag: 'Cloud',
    growth: '+31%',
    projectsCount: '1.9k',
    icon: '🐳',
    badgeColor: 'text-sky-600 bg-sky-50 border-sky-200',
  },
  {
    id: 'tech_supabase',
    name: 'PostgreSQL & Vectors',
    category: 'Modern DB & AI RAG',
    tag: 'Database',
    growth: '+39%',
    projectsCount: '2.8k',
    icon: '⚡',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  {
    id: 'tech_pytorch',
    name: 'PyTorch & CUDA',
    category: 'Deep Learning',
    tag: 'AI',
    growth: '+46%',
    projectsCount: '1.6k',
    icon: '🔥',
    badgeColor: 'text-rose-600 bg-rose-50 border-rose-200',
  },
];

interface HomeFeedViewProps {
  currentUser: UserProfile;
  posts: Post[];
  stories: Story[];
  onAddPost: (post: Post) => void;
  onUpdatePosts: (updatedPosts: Post[]) => void;
  onAddStory: (story: Story) => void;
  onTagClick?: (tag: string) => void;
}

export const HomeFeedView: React.FC<HomeFeedViewProps> = ({
  currentUser,
  posts,
  stories,
  onAddPost,
  onUpdatePosts,
  onAddStory,
  onTagClick,
}) => {
  const [activeTab, setActiveTab] = useState<'for-you' | 'following' | 'communities'>('for-you');
  const [createPostMode, setCreatePostMode] = useState<'post' | 'photo' | 'event' | 'poll' | null>(null);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // Toggle Like on post
  const handleToggleLike = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
        };
      }
      return p;
    });
    onUpdatePosts(updated);
  };

  // Toggle Bookmark on post
  const handleToggleBookmark = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return { ...p, isBookmarked: !p.isBookmarked };
      }
      return p;
    });
    onUpdatePosts(updated);
  };

  // Toggle Follow author
  const handleToggleFollow = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return { ...p, isFollowingAuthor: !p.isFollowingAuthor };
      }
      return p;
    });
    onUpdatePosts(updated);
  };

  // Vote on poll
  const handleVotePoll = (postId: string, optionId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId && p.poll) {
        const alreadyVoted = !!p.poll.userVotedOptionId;
        const newOptions = p.poll.options.map((opt) => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
          }
          if (alreadyVoted && opt.id === p.poll?.userVotedOptionId) {
            return { ...opt, votes: Math.max(0, opt.votes - 1) };
          }
          return opt;
        });

        return {
          ...p,
          poll: {
            ...p.poll,
            totalVotes: alreadyVoted ? p.poll.totalVotes : p.poll.totalVotes + 1,
            userVotedOptionId: optionId,
            options: newOptions,
          },
        };
      }
      return p;
    });
    onUpdatePosts(updated);
  };

  // Share post
  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
    setCopiedPostId(postId);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  // Add Comment
  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;

    const updated = posts.map((p) => {
      if (p.id === postId) {
        const comments = p.comments || [];
        const newC = {
          id: `c_${Date.now()}`,
          author: currentUser.name,
          avatar: currentUser.avatar,
          college: currentUser.college || 'Campus Member',
          text: newCommentText.trim(),
          timestamp: 'Just now',
          likes: 0,
        };
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...comments, newC],
        };
      }
      return p;
    });

    onUpdatePosts(updated);
    setNewCommentText('');
  };

  // Add Story trigger
  const handleUploadStory = () => {
    const newStory: Story = {
      id: `story_${Date.now()}`,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      isCurrentUser: true,
      hasUnseen: true,
      storyImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=80',
      caption: 'Building awesome apps with our college squad! 🚀',
      timestamp: 'Just now',
    };
    onAddStory(newStory);
    setActiveStoryId(newStory.id);
  };

  // Filter posts based on activeTab
  const filteredPosts = posts.filter((p) => {
    if (activeTab === 'following') return p.isFollowingAuthor || p.author.username === currentUser.githubUsername;
    if (activeTab === 'communities') return p.author.username === 'collegeculture' || p.tags.some(t => t.includes('Community') || t.includes('Hackathon'));
    return true;
  });

  return (
    <div className="flex-1 min-w-0 max-w-4xl py-4 space-y-4 w-full transition-all duration-300">
      {/* 1. Connections' Stories Carousel (Image 3) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1 text-slate-800 font-bold text-sm">
            <span className="text-slate-400 font-normal">«</span>
            <span>Connections' Stories</span>
          </div>
          <button
            onClick={() => setActiveStoryId(stories[0]?.id || null)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stories Horizontal Row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {/* Add Story Button */}
          <div
            onClick={handleUploadStory}
            className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full bg-blue-50 border-2 border-dashed border-blue-400 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 group-hover:scale-105 transition-all shadow-2xs">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-[11px] font-semibold text-slate-700">Add Story</span>
          </div>

          {/* Stories List */}
          {stories.map((story) => {
            return (
              <div
                key={story.id}
                onClick={() => setActiveStoryId(story.id)}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
              >
                <div
                  className={`w-14 h-14 rounded-full p-[2.5px] transition-transform group-hover:scale-105 ${
                    story.hasUnseen
                      ? 'bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 shadow-xs'
                      : 'bg-slate-200'
                  }`}
                >
                  <img
                    src={story.userAvatar}
                    alt={story.userName}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
                <span className="text-[11px] font-medium text-slate-700 max-w-[62px] truncate text-center">
                  {story.userName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Create Post Bar (Image 3) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover border border-slate-200"
          />
          <div
            onClick={() => setCreatePostMode('post')}
            className="flex-1 bg-slate-100/80 hover:bg-slate-100 text-slate-500 text-xs sm:text-sm px-4 py-2.5 rounded-full cursor-pointer transition-colors"
          >
            What's on your mind, {currentUser.name}?
          </div>
        </div>

        {/* Action Buttons Row matching Screenshot: Post, Photo, Event, Poll */}
        <div className="flex items-center justify-around mt-3 pt-3 border-t border-slate-100 text-xs font-semibold">
          <button
            onClick={() => setCreatePostMode('post')}
            className="flex items-center gap-2 text-blue-600 hover:bg-blue-50/80 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-blue-600" />
            <span>Post</span>
          </button>

          <button
            onClick={() => setCreatePostMode('photo')}
            className="flex items-center gap-2 text-emerald-600 hover:bg-emerald-50/80 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            <span>Photo</span>
          </button>

          <button
            onClick={() => setCreatePostMode('event')}
            className="flex items-center gap-2 text-rose-500 hover:bg-rose-50/80 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-rose-500" />
            <span>Event</span>
          </button>

          <button
            onClick={() => setCreatePostMode('poll')}
            className="flex items-center gap-2 text-amber-500 hover:bg-amber-50/80 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <BarChart2 className="w-4 h-4 text-amber-500" />
            <span>Poll</span>
          </button>
        </div>
      </div>

      {/* 3. Feed Filter Tabs: For You, Following, Communities (Matching Screenshot) */}
      <div className="flex items-center gap-6 px-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs py-2.5">
        <button
          onClick={() => setActiveTab('for-you')}
          className={`text-xs sm:text-sm font-bold transition-colors relative cursor-pointer pb-1 ${
            activeTab === 'for-you' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>For You</span>
          {activeTab === 'for-you' && (
            <div className="absolute -bottom-2.5 inset-x-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('following')}
          className={`text-xs sm:text-sm font-bold transition-colors relative cursor-pointer pb-1 ${
            activeTab === 'following' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Following</span>
          {activeTab === 'following' && (
            <div className="absolute -bottom-2.5 inset-x-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('communities')}
          className={`text-xs sm:text-sm font-bold transition-colors relative cursor-pointer pb-1 ${
            activeTab === 'communities' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Communities</span>
          {activeTab === 'communities' && (
            <div className="absolute -bottom-2.5 inset-x-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
      </div>

      {/* 4. Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isFeatured = post.id === 'post_featured';
          const isCommentsOpen = expandedCommentsPostId === post.id;

          return (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden"
            >
              {/* Featured Hackathon Banner Post matching Screenshot */}
              {isFeatured && post.images && post.images.length > 0 ? (
                <div className="relative">
                  {/* Photo with Overlay */}
                  <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900 group">
                    <img
                      src={post.images[0]}
                      alt="Hackathon Prep Day"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

                    {/* Badge top-left: #Hackathon */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3.5 py-1 bg-[#8b5cf6] text-white text-xs font-bold rounded-full shadow-sm">
                        {post.bannerBadge || '#Hackathon'}
                      </span>
                    </div>

                    {/* Carousel indicator top-right: 1/5 */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2.5 py-0.5 bg-black/60 text-white text-xs font-semibold rounded-full backdrop-blur-xs">
                        {post.carouselCount || '1/5'}
                      </span>
                    </div>

                    {/* Hand-lettered bold title: Hackathon Prep Day with yellow underline */}
                    <div className="absolute top-[36%] left-6 sm:left-10 -translate-y-1/2 select-none pointer-events-none transform -rotate-3 z-10">
                      <div className="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)] font-serif italic">
                        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                          Hackathon
                        </h2>
                        <div className="relative inline-block mt-0.5 text-3xl sm:text-5xl font-black tracking-tight">
                          <span>Prep Day</span>
                          {/* Playful Yellow Brush Underline */}
                          <svg
                            className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-amber-400 overflow-visible"
                            viewBox="0 0 160 16"
                            fill="none"
                          >
                            <path
                              d="M3 11C45 4 110 3 157 12"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Floating Right Action Icons matching Screenshot */}
                    <div className="absolute right-4 bottom-8 flex flex-col items-center gap-3.5 z-20">
                      {/* Likes */}
                      <button
                        onClick={() => handleToggleLike(post.id)}
                        className="flex flex-col items-center text-white hover:text-red-400 transition-colors cursor-pointer group/btn"
                      >
                        <Heart
                          className={`w-6 h-6 drop-shadow-md transition-transform group-hover/btn:scale-110 ${
                            post.isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                          }`}
                        />
                        <span className="text-[11px] font-bold drop-shadow-md mt-0.5">
                          2.4K
                        </span>
                      </button>

                      {/* Comments */}
                      <button
                        onClick={() =>
                          setExpandedCommentsPostId(isCommentsOpen ? null : post.id)
                        }
                        className="flex flex-col items-center text-white hover:text-blue-400 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-6 h-6 drop-shadow-md" />
                        <span className="text-[11px] font-bold drop-shadow-md mt-0.5">
                          96
                        </span>
                      </button>

                      {/* Share */}
                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex flex-col items-center text-white hover:text-emerald-400 transition-colors cursor-pointer relative"
                      >
                        <Share2 className="w-6 h-6 drop-shadow-md" />
                        <span className="text-[11px] font-bold drop-shadow-md mt-0.5">
                          231
                        </span>
                        {copiedPostId === post.id && (
                          <span className="absolute -top-7 right-0 text-[10px] bg-black text-white px-2 py-0.5 rounded-md">
                            Copied!
                          </span>
                        )}
                      </button>

                      {/* Bookmark */}
                      <button
                        onClick={() => handleToggleBookmark(post.id)}
                        className="text-white hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        <Bookmark
                          className={`w-6 h-6 drop-shadow-md ${
                            post.isBookmarked ? 'fill-white text-white' : 'text-white'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Author & Caption bottom banner inside image */}
                    <div className="absolute bottom-4 left-4 right-16 z-10 text-white space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-black flex items-center justify-center font-black text-white text-[11px] border border-white/20">
                          cc
                        </div>
                        <span className="font-bold text-sm text-white drop-shadow-xs">
                          collegeculture
                        </span>
                        <button
                          onClick={() => handleToggleFollow(post.id)}
                          className="px-3.5 py-0.5 text-xs font-semibold rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-xs transition-colors cursor-pointer"
                        >
                          {post.isFollowingAuthor ? 'Following' : 'Follow'}
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-white/95 drop-shadow-xs font-normal">
                        Ideas, teams, and late night discussions — that's hackathon season! 🚀
                      </p>

                      {/* Hashtags in Sky Blue */}
                      <div className="flex flex-wrap gap-2 text-xs font-bold text-sky-300">
                        <span>#Hackathon</span>
                        <span>#CollegeLife</span>
                        <span>#BuildTogether</span>
                      </div>

                      {/* 5-Segmented Carousel Indicator */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <div className="h-1 rounded-full bg-white w-20" />
                        <div className="h-1 rounded-full bg-white/30 w-16" />
                        <div className="h-1 rounded-full bg-white/30 w-16" />
                        <div className="h-1 rounded-full bg-white/30 w-16" />
                        <div className="h-1 rounded-full bg-white/30 w-16" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard Feed Post (Riya Sharma, Aman Verma, etc.) */
                <div className="p-4 sm:p-5">
                  {/* Post Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm text-slate-900">
                            {post.author.name}
                          </h3>
                          {post.author.isVerified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-50" />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <span>{post.timestamp}</span>
                          {post.author.college && (
                            <>
                              <span>•</span>
                              <span>{post.author.college}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                    {post.content}
                  </p>

                  {/* Hashtags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          onClick={() => onTagClick && onTagClick(t)}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Attached Images */}
                  {post.images && post.images.length > 0 && !isFeatured && (
                    <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                      {post.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Post asset"
                          className="w-full h-48 sm:h-56 object-cover rounded-xl"
                        />
                      ))}
                    </div>
                  )}

                  {/* Attached Poll */}
                  {post.poll && (
                    <div className="mt-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                      <p className="font-bold text-xs text-slate-900">
                        {post.poll.question}
                      </p>
                      <div className="space-y-2">
                        {post.poll.options.map((opt) => {
                          const percentage =
                            post.poll && post.poll.totalVotes > 0
                              ? Math.round((opt.votes / post.poll.totalVotes) * 100)
                              : 0;
                          const isUserChoice = post.poll?.userVotedOptionId === opt.id;

                          return (
                            <div
                              key={opt.id}
                              onClick={() => handleVotePoll(post.id, opt.id)}
                              className={`relative overflow-hidden p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                                isUserChoice
                                  ? 'border-blue-500 bg-blue-50/40 text-blue-900 font-bold'
                                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                              }`}
                            >
                              {/* Percentage bar */}
                              <div
                                className="absolute inset-y-0 left-0 bg-blue-100/60 transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />

                              <div className="relative z-10 flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                  {isUserChoice && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                                  )}
                                  <span>{opt.text}</span>
                                </span>
                                <span className="font-bold text-slate-600">{percentage}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {post.poll.totalVotes} total votes • Live campus poll
                      </div>
                    </div>
                  )}

                  {/* Post Actions Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs font-semibold">
                    <button
                      onClick={() => handleToggleLike(post.id)}
                      className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                        post.isLiked
                          ? 'text-red-600 font-bold'
                          : 'hover:text-red-600 hover:bg-slate-50'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${post.isLiked ? 'fill-red-600' : ''}`}
                      />
                      <span>{post.likes}</span>
                    </button>

                    <button
                      onClick={() =>
                        setExpandedCommentsPostId(isCommentsOpen ? null : post.id)
                      }
                      className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.commentsCount} Comments</span>
                    </button>

                    <button
                      onClick={() => handleShare(post.id)}
                      className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:text-emerald-600 hover:bg-slate-50 transition-colors cursor-pointer relative"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                      {copiedPostId === post.id && (
                        <span className="absolute -top-7 right-0 text-[10px] bg-black text-white px-2 py-0.5 rounded-md">
                          Copied!
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => handleToggleBookmark(post.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        post.isBookmarked
                          ? 'text-amber-500'
                          : 'hover:text-amber-500 hover:bg-slate-50'
                      }`}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${post.isBookmarked ? 'fill-amber-500' : ''}`}
                      />
                    </button>
                  </div>
                </div>
              )}

              {/* Expandable Comments Section */}
              {isCommentsOpen && (
                <div className="bg-slate-50/70 p-4 border-t border-slate-100 space-y-3">
                  {/* Add comment input */}
                  <div className="flex items-center gap-2">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <input
                      type="text"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                      placeholder="Write a comment or praise..."
                      className="flex-1 text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Existing comments list */}
                  <div className="space-y-2 pt-1">
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((c) => (
                        <div key={c.id} className="flex items-start gap-2.5 text-xs">
                          <img
                            src={c.avatar}
                            alt={c.author}
                            className="w-7 h-7 rounded-full object-cover mt-0.5"
                          />
                          <div className="flex-1 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">{c.author}</span>
                              <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                            </div>
                            <p className="text-slate-700 mt-1">{c.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-xs text-slate-400 py-2">
                        No comments yet. Be the first to cheer them on!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Create Post Modal */}
      {createPostMode && (
        <CreatePostModal
          currentUser={currentUser}
          initialMode={createPostMode}
          onClose={() => setCreatePostMode(null)}
          onSubmit={(newPost) => {
            onAddPost(newPost);
            setCreatePostMode(null);
          }}
        />
      )}

      {/* Story Viewer Modal */}
      {activeStoryId && (
        <StoryViewerModal
          stories={stories}
          initialStoryId={activeStoryId}
          onClose={() => setActiveStoryId(null)}
        />
      )}
    </div>
  );
};
