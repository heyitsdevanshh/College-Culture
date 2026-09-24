import React, { useState } from 'react';
import {
  X,
  Image,
  Calendar,
  BarChart2,
  Sparkles,
  Send,
  Plus,
  Trash2,
} from 'lucide-react';
import { Post, UserProfile } from '../types';

interface CreatePostModalProps {
  currentUser: UserProfile;
  initialMode?: 'post' | 'photo' | 'event' | 'poll';
  onClose: () => void;
  onSubmit: (newPost: Post) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  currentUser,
  initialMode = 'post',
  onClose,
  onSubmit,
}) => {
  const [activeTab, setActiveTab] = useState<'post' | 'photo' | 'event' | 'poll'>(initialMode);
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>(['#CollegeLife']);
  const [tagInput, setTagInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Poll state
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['Option 1', 'Option 2']);

  // Event state
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      let t = tagInput.trim();
      if (t) {
        if (!t.startsWith('#')) t = '#' + t;
        if (!tags.includes(t)) {
          setTags([...tags, t]);
          setTagInput('');
        }
      }
    }
  };

  const removeTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`]);
    }
  };

  const handlePollOptionChange = (idx: number, val: string) => {
    const updated = [...pollOptions];
    updated[idx] = val;
    setPollOptions(updated);
  };

  const handleRemovePollOption = (idx: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !pollQuestion && !eventName) return;

    let finalContent = content;
    if (activeTab === 'event' && eventName) {
      finalContent = `📅 [Campus Event] ${eventName} (${eventDate || 'Upcoming'})\n\n${content}`;
    }

    const post: Post = {
      id: `post_${Date.now()}`,
      author: {
        name: currentUser.name,
        username: currentUser.githubUsername || currentUser.name.toLowerCase().replace(/\s+/g, '_'),
        avatar: currentUser.avatar,
        role: currentUser.domains[0] || 'Student Member',
        college: currentUser.college || 'Campus Community',
        isVerified: true,
      },
      timestamp: 'Just now',
      content: finalContent,
      tags: tags,
      images: imageUrl ? [imageUrl] : undefined,
      likes: 0,
      isLiked: false,
      commentsCount: 0,
      comments: [],
      shares: 0,
      isBookmarked: false,
      poll:
        activeTab === 'poll' && pollQuestion.trim()
          ? {
              question: pollQuestion,
              totalVotes: 0,
              options: pollOptions
                .filter((opt) => opt.trim())
                .map((opt, i) => ({
                  id: `opt_${i}`,
                  text: opt,
                  votes: 0,
                })),
            }
          : undefined,
    };

    onSubmit(post);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover border border-slate-200"
          />
          <div>
            <h3 className="font-bold text-sm text-slate-900">{currentUser.name}</h3>
            <p className="text-xs text-slate-400">{currentUser.college || 'Campus Community'}</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mt-4 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('post')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'post'
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Post</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('photo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'photo'
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>Photo</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('poll')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'poll'
                ? 'bg-purple-50 text-purple-600'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Poll</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('event')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'event'
                ? 'bg-amber-50 text-amber-600'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Event</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${currentUser.name}? Share updates, hackathons, questions or achievements...`}
            className="w-full text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-2xl p-3 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50/50 focus:bg-white resize-none"
            autoFocus
          />

          {/* Photo URL Input */}
          {activeTab === 'photo' && (
            <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700">Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex gap-2 pt-1 text-[11px] text-slate-400">
                <span>Presets:</span>
                <button
                  type="button"
                  onClick={() =>
                    setImageUrl('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80')
                  }
                  className="text-emerald-600 hover:underline"
                >
                  Campus Tech Team
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() =>
                    setImageUrl('https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80')
                  }
                  className="text-emerald-600 hover:underline"
                >
                  Hackathon
                </button>
              </div>
            </div>
          )}

          {/* Poll Options Input */}
          {activeTab === 'poll' && (
            <div className="space-y-3 p-3 bg-purple-50/50 rounded-xl border border-purple-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Poll Question
                </label>
                <input
                  type="text"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="e.g. Which framework are you building with?"
                  className="w-full text-xs px-3 py-2 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Poll Choices</label>
                {pollOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handlePollOptionChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePollOption(idx)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddPollOption}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 mt-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add another choice</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Event Input */}
          {activeTab === 'event' && (
            <div className="grid grid-cols-2 gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g. AI Hackathon Mentorship"
                  className="w-full text-xs px-3 py-2 bg-white border border-amber-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Date / Time
                </label>
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="e.g. Saturday, 3:00 PM"
                  className="w-full text-xs px-3 py-2 bg-white border border-amber-200 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Hashtags tag row */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tags</label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md border border-blue-200"
                >
                  <span>{t}</span>
                  <button type="button" onClick={() => removeTag(t)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add #tag and press Enter..."
                className="text-xs bg-transparent focus:outline-hidden py-1 px-1 flex-1 min-w-[140px]"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Publish Post</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
