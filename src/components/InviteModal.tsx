import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Twitter } from 'lucide-react';

interface InviteModalProps {
  onClose: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const inviteLink = `${window.location.origin}/join?invite=cc-campus-2025`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pt-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-md text-2xl">
            🤝
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mt-4">
            Invite Your Campus Peers
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 max-w-xs mx-auto">
            Bring your classmates and hackathon teammates to CollegeCulture and unlock exclusive campus networks!
          </p>
        </div>

        {/* Copy Link Input */}
        <div className="mt-6">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Your Personal Invitation Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={inviteLink}
              className="flex-1 bg-slate-50 border border-slate-200 text-xs text-slate-700 py-2.5 px-3 rounded-xl focus:outline-hidden font-mono"
            />
            <button
              onClick={handleCopy}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share Options */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-400 mb-3 text-center">
            Or share directly via
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                'Join me on CollegeCulture to connect with college peers, hackathons, and projects! ' + inviteLink
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-5 h-5 mb-1 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                'Connecting with fellow student builders on CollegeCulture! 🚀 ' + inviteLink
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold transition-colors"
            >
              <Twitter className="w-5 h-5 mb-1 text-sky-600" />
              <span>Twitter</span>
            </a>

            <button
              onClick={handleCopy}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
            >
              <Share2 className="w-5 h-5 mb-1 text-slate-600" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
