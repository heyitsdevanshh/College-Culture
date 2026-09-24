import React, { useState } from 'react';
import { X, CheckCircle2, Shield, ArrowRight } from 'lucide-react';

interface SocialAuthDialogProps {
  provider: 'google' | 'github' | null;
  onClose: () => void;
  onSuccess: (userData: { name: string; email: string; avatar: string; provider: 'google' | 'github' }) => void;
}

export const SocialAuthDialog: React.FC<SocialAuthDialogProps> = ({
  provider,
  onClose,
  onSuccess,
}) => {
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState('anjani');
  const [customEmail, setCustomEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!provider) return null;

  const handleAuthorize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (provider === 'google') {
        const isCustom = selectedGoogleAccount === 'custom' && customEmail;
        const email = isCustom ? customEmail : 'anjani.sharma@gmail.com';
        const name = isCustom ? customEmail.split('@')[0] : 'Devansh Sharma';
        onSuccess({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          email,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          provider: 'google',
        });
      } else {
        onSuccess({
          name: 'Devansh (devansh-codes)',
          email: 'devansh.codes@users.noreply.github.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          provider: 'github',
        });
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {provider === 'google' ? (
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
            ) : (
              <svg className="w-5 h-5 fill-slate-900" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            )}
            <span className="font-semibold text-sm text-slate-800">
              {provider === 'google' ? 'Sign in with Google' : 'Authorize CollegeCulture on GitHub'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {provider === 'google' ? (
            <div className="space-y-4">
              <div className="text-center pb-2">
                <h3 className="text-lg font-bold text-slate-900">Choose an account</h3>
                <p className="text-xs text-slate-500 mt-1">
                  to continue to <strong className="text-slate-700">CollegeCulture</strong>
                </p>
              </div>

              {/* Account 1 */}
              <div
                onClick={() => setSelectedGoogleAccount('anjani')}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedGoogleAccount === 'anjani'
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                  D
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-slate-900 truncate">Devansh Sharma</div>
                  <div className="text-xs text-slate-500 truncate">anjani.sharma@gmail.com</div>
                </div>
                {selectedGoogleAccount === 'anjani' && (
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                )}
              </div>

              {/* Account 2 (Campus Email) */}
              <div
                onClick={() => setSelectedGoogleAccount('student')}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedGoogleAccount === 'student'
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                  🎓
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-slate-900 truncate">Devansh (College ID)</div>
                  <div className="text-xs text-slate-500 truncate">devansh.sharma@college.edu</div>
                </div>
                {selectedGoogleAccount === 'student' && (
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                )}
              </div>

              {/* Custom Account */}
              <div
                onClick={() => setSelectedGoogleAccount('custom')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedGoogleAccount === 'custom'
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                    +
                  </div>
                  <div className="text-sm font-medium text-slate-700">Use another Google account</div>
                </div>
                {selectedGoogleAccount === 'custom' && (
                  <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="email"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="Enter your google email"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 text-[11px] text-slate-400 leading-relaxed">
                To continue, Google will share your name, email address, language preference, and profile picture with CollegeCulture.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 py-2">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm">
                  cc
                </div>
                <div className="text-slate-300 text-lg">⇄</div>
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white">
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-bold text-slate-900 text-base">Authorize CollegeCulture</h3>
                <p className="text-xs text-slate-500 mt-1">
                  CollegeCulture by CollegeHub would like permission to access your GitHub profile
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Read public profile & project repositories</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verify student developer credentials</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                Logged in as <strong className="text-slate-700">@devansh-codes</strong>
              </div>
            </div>
          )}

          {/* Action button */}
          <button
            onClick={handleAuthorize}
            disabled={isProcessing}
            className="w-full mt-6 py-2.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              <>
                <span>Continue with {provider === 'google' ? 'Google' : 'GitHub'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
