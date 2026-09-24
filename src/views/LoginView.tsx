import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { SocialAuthDialog } from '../components/SocialAuthDialog';
import { UserProfile } from '../types';

interface LoginViewProps {
  onLoginSuccess: (user: UserProfile, isNewUser?: boolean) => void;
  onExploreAsGuest?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('devansh.sharma@college.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [socialProviderModal, setSocialProviderModal] = useState<'google' | 'github' | null>(null);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Login user
    const username = email.split('@')[0];
    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      name: isSignUp ? 'New Scholar' : 'Devansh',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: isSignUp ? '' : 'Delhi Technological University (DTU)',
      hobbies: isSignUp ? [] : ['Gaming', 'Photography'],
      domains: isSignUp ? [] : ['Web Development', 'AI / Machine Learning'],
      skills: isSignUp ? [] : ['Java', 'React', 'Git'],
      certificates: [],
      achievements: [],
      githubUsername: isSignUp ? '' : 'devansh-codes',
      isProfileComplete: !isSignUp, // If sign up, require profile completion
      termsAccepted: !isSignUp,
      stats: { posts: 0, connections: 12, hackathons: 0 },
    };

    onLoginSuccess(user, isSignUp);
  };

  const handleSocialSuccess = (data: { name: string; email: string; avatar: string; provider: 'google' | 'github' }) => {
    setSocialProviderModal(null);
    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      college: '',
      hobbies: [],
      domains: [],
      skills: [],
      certificates: [],
      achievements: [],
      githubUsername: data.provider === 'github' ? 'devansh-codes' : '',
      isProfileComplete: false, // Navigate to Complete Your Profile
      termsAccepted: false,
      stats: { posts: 0, connections: 5, hackathons: 0 },
    };
    onLoginSuccess(user, true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Branding matching Image 1 */}
      <div className="pt-6 sm:pt-10 flex flex-col items-center">
        <BrandLogo size="lg" showTagline={true} />
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[460px] mx-auto my-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-10 relative">
          {/* Namaste Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
              <span>{isSignUp ? 'Welcome' : 'Namaste'}</span>
              <span className="text-2xl" role="img" aria-label="folded hands">🙏</span>
            </h1>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              {isSignUp
                ? 'Join your college community to connect & grow'
                : 'Log in to continue to your college community'}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {/* Continue with Google */}
            <button
              type="button"
              onClick={() => setSocialProviderModal('google')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm transition-all shadow-xs hover:border-slate-300 cursor-pointer"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
              <span>Continue with Google</span>
            </button>

            {/* Continue with Email button */}
            <button
              type="button"
              onClick={() => setShowEmailFields(true)}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm transition-all shadow-xs hover:border-slate-300 cursor-pointer"
            >
              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Continue with Email</span>
            </button>

            {/* Continue with GitHub */}
            <button
              type="button"
              onClick={() => setSocialProviderModal('github')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm transition-all shadow-xs hover:border-slate-300 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-slate-900 shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* OR Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-white px-3 font-semibold text-slate-400">OR</span>
            </div>
          </div>

          {/* Email & Password Form */}
          {showEmailFields && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email address
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50/60 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
              </div>

              {!isSignUp && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotPasswordSent(true);
                      setTimeout(() => setForgotPasswordSent(false), 4000);
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {forgotPasswordSent && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-medium text-center">
                  Password reset link sent to {email}!
                </div>
              )}

              {/* Gradient Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-100 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{isSignUp ? 'Sign Up' : 'Log In'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}

          {/* Toggle Sign Up / Log In */}
          <div className="mt-6 text-center text-sm text-slate-500">
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  Log In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  Sign Up
                </button>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer matching Image 1 */}
      <footer className="text-center text-xs text-slate-400 py-4 flex flex-wrap items-center justify-center gap-2">
        <span>© 2026 CollegeCulture. All rights reserved.</span>
        <span className="text-slate-300">|</span>
        <button className="hover:text-slate-600 transition-colors">About</button>
        <button className="hover:text-slate-600 transition-colors">Help</button>
        <button className="hover:text-slate-600 transition-colors">Privacy</button>
        <button className="hover:text-slate-600 transition-colors">Terms</button>
      </footer>

      {/* Social Auth Popups */}
      {socialProviderModal && (
        <SocialAuthDialog
          provider={socialProviderModal}
          onClose={() => setSocialProviderModal(null)}
          onSuccess={handleSocialSuccess}
        />
      )}
    </div>
  );
};
