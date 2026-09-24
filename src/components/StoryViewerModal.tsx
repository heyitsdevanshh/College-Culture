import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react';
import { Story } from '../types';

interface StoryViewerModalProps {
  stories: Story[];
  initialStoryId: string;
  onClose: () => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  stories,
  initialStoryId,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = stories.findIndex((s) => s.id === initialStoryId);
    return idx !== -1 ? idx : 0;
  });
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  const [replyText, setReplyText] = useState('');

  const currentStory = stories[currentIndex];

  useEffect(() => {
    setProgress(0);
    setLiked(false);
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex((c) => c + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, stories.length, onClose]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Nav Arrow Left */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="hidden sm:flex absolute left-8 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Nav Arrow Right */}
      {currentIndex < stories.length - 1 && (
        <button
          onClick={handleNext}
          className="hidden sm:flex absolute right-8 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Story Box */}
      <div
        className="relative w-full max-w-[420px] h-[85vh] max-h-[780px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Progress Bar Top */}
        <div className="absolute top-0 inset-x-0 p-3 z-30 flex items-center gap-1.5">
          {stories.map((story, idx) => (
            <div
              key={story.id}
              className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                style={{
                  width:
                    idx < currentIndex
                      ? '100%'
                      : idx === currentIndex
                      ? `${progress}%`
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* User Info Header */}
        <div className="absolute top-6 inset-x-0 p-3 z-30 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <img
              src={currentStory.userAvatar}
              alt={currentStory.userName}
              className="w-9 h-9 rounded-full object-cover border-2 border-white/60"
            />
            <div>
              <p className="text-xs font-bold leading-tight drop-shadow-xs">
                {currentStory.userName}
              </p>
              <p className="text-[10px] text-white/70 drop-shadow-xs">
                {currentStory.timestamp}
              </p>
            </div>
          </div>
        </div>

        {/* Story Background / Image */}
        <div className="absolute inset-0 z-10">
          <img
            src={currentStory.storyImage}
            alt="Story content"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        {/* Caption and interactive footer */}
        <div className="relative z-30 p-4 mt-auto space-y-3">
          {currentStory.caption && (
            <p className="text-white text-xs sm:text-sm font-medium drop-shadow-md leading-relaxed bg-black/30 p-2.5 rounded-xl backdrop-blur-2xs">
              {currentStory.caption}
            </p>
          )}

          {/* Quick Reply Bar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${currentStory.userName}...`}
              className="flex-1 bg-white/20 hover:bg-white/30 focus:bg-white/40 text-white placeholder-white/70 text-xs px-3.5 py-2 rounded-full border border-white/30 focus:outline-hidden backdrop-blur-md"
            />
            <button
              onClick={() => setLiked(!liked)}
              className="p-2 text-white hover:text-red-400 transition-colors cursor-pointer"
            >
              <Heart
                className={`w-6 h-6 ${
                  liked ? 'fill-red-500 text-red-500' : 'text-white'
                }`}
              />
            </button>
            {replyText && (
              <button
                onClick={() => setReplyText('')}
                className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
