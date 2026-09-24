import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { LoginView } from './views/LoginView';
import { ProfileSetupView } from './views/ProfileSetupView';
import { HomeFeedView } from './views/HomeFeedView';
import { HackathonsView } from './views/HackathonsView';
import { CreateTeamView } from './views/CreateTeamView';
import { TeamWorkspaceView } from './views/TeamWorkspaceView';
import { ExploreView } from './views/ExploreView';
import { ConnectView } from './views/ConnectView';
import { MessagesView } from './views/MessagesView';
import { InternshipsView } from './views/InternshipsView';
import { BookmarksView } from './views/BookmarksView';
import { InviteModal } from './components/InviteModal';
import { UserProfile, Post, Story, HackathonItem, HackathonTeam } from './types';
import {
  INITIAL_USER,
  INITIAL_POSTS,
  INITIAL_STORIES,
  UPCOMING_HACKATHONS,
  INITIAL_HACKATHON_TEAMS,
} from './mockData';

export default function App() {
  // Load saved state or use initial defaults
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('collegeculture_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return null; // Start at LoginView to demonstrate the complete requested flow!
  });

  const [currentView, setCurrentView] = useState<string>('login');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('collegeculture_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_POSTS;
  });

  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('collegeculture_stories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_STORIES;
  });

  // Hackathon and Team Management States
  const [hackathons, setHackathons] = useState<HackathonItem[]>(UPCOMING_HACKATHONS);
  const [registeredHackathonIds, setRegisteredHackathonIds] = useState<string[]>(['hack_google_ai']);
  const [teams, setTeams] = useState<HackathonTeam[]>(() => {
    const saved = localStorage.getItem('collegeculture_teams');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_HACKATHON_TEAMS;
  });
  const [activeTeamId, setActiveTeamId] = useState<string>('team_codecrafters');
  const [selectedHackathonForTeam, setSelectedHackathonForTeam] = useState<HackathonItem>(UPCOMING_HACKATHONS[0]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Synchronize localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('collegeculture_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('collegeculture_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('collegeculture_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('collegeculture_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('collegeculture_teams', JSON.stringify(teams));
  }, [teams]);

  // Handle Login
  const handleLoginSuccess = (user: UserProfile, isNewUser?: boolean) => {
    setCurrentUser(user);
    if (isNewUser || !user.isProfileComplete) {
      setCurrentView('profile');
    } else {
      setCurrentView('home');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  // Handle Profile Save
  const handleProfileSave = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    setCurrentView('home');
  };

  // Quick switch for reviewing screens directly
  const handleQuickDemoDevansh = () => {
    setCurrentUser(INITIAL_USER);
    setCurrentView('home');
  };

  const handleQuickSetupProfile = () => {
    setCurrentUser({
      ...INITIAL_USER,
      isProfileComplete: false,
    });
    setCurrentView('profile');
  };

  // Add new post
  const handleAddPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  // Add new story
  const handleAddStory = (newStory: Story) => {
    setStories([newStory, ...stories]);
  };

  // Register for hackathon
  const handleRegisterHackathon = (hackathonId: string) => {
    if (!registeredHackathonIds.includes(hackathonId)) {
      setRegisteredHackathonIds([...registeredHackathonIds, hackathonId]);
    }
  };

  // Start Generate Team Flow (Image 2)
  const handleStartCreateTeam = (hackathon: HackathonItem) => {
    setSelectedHackathonForTeam(hackathon);
    setCurrentView('create-team');
  };

  // Team Created -> Open In-App Team Group Discussion Workspace
  const handleTeamCreated = (newTeam: HackathonTeam) => {
    setTeams([newTeam, ...teams]);
    setActiveTeamId(newTeam.id);
    // Link hackathon to team
    setHackathons(
      hackathons.map((h) =>
        h.id === newTeam.hackathonId ? { ...h, isRegistered: true, userTeamId: newTeam.id } : h
      )
    );
    if (!registeredHackathonIds.includes(newTeam.hackathonId)) {
      setRegisteredHackathonIds([...registeredHackathonIds, newTeam.hackathonId]);
    }
    setCurrentView('team-workspace');
  };

  // Open team workspace from hackathon detail
  const handleOpenTeamWorkspace = (teamId: string) => {
    setActiveTeamId(teamId);
    setCurrentView('team-workspace');
  };

  // Active Team for TeamWorkspaceView
  const currentActiveTeam = teams.find((t) => t.id === activeTeamId) || teams[0];

  // Filter posts if search is active
  const displayedPosts = searchFilter
    ? posts.filter(
        (p) =>
          p.content.toLowerCase().includes(searchFilter.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase())) ||
          p.author.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
    : posts;

  // If user is not logged in or view is 'login', show Login View
  if (!currentUser || currentView === 'login') {
    return (
      <div className="relative">
        {/* Quick Testing Bar top-right */}
        <div className="absolute top-3 right-4 z-30 flex items-center gap-2">
          <button
            onClick={handleQuickDemoDevansh}
            className="text-xs bg-slate-900/80 hover:bg-slate-900 text-white px-3 py-1.5 rounded-full font-semibold shadow-sm backdrop-blur-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>⚡ Demo as Devansh (Home View)</span>
          </button>
          <button
            onClick={handleQuickSetupProfile}
            className="text-xs bg-indigo-600/90 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-full font-semibold shadow-sm backdrop-blur-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>📝 Open Profile Setup View</span>
          </button>
        </div>

        <LoginView onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div
      className={`bg-[#f8fafc] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] ${
        currentView === 'team-workspace' || currentView === 'messages'
          ? 'h-screen max-h-screen overflow-hidden'
          : 'min-h-screen'
      }`}
    >
      {/* Top Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onLogout={handleLogout}
        onSearch={(query) => setSearchFilter(query)}
        onOpenInvite={() => setShowInviteModal(true)}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Container */}
      <div
        className={`flex-1 max-w-[1440px] w-full mx-auto px-2 sm:px-4 lg:px-6 flex gap-4 sm:gap-6 relative min-h-0 ${
          currentView === 'team-workspace' || currentView === 'messages'
            ? 'h-[calc(100vh-4rem)] overflow-hidden py-1 sm:py-2'
            : ''
        }`}
      >
        {/* Left Sidebar - persistent and slidable */}
        {currentView !== 'login' && (
          <Sidebar
            currentView={currentView}
            onNavigate={(view) => setCurrentView(view)}
            onOpenInvite={() => setShowInviteModal(true)}
            isOpen={isSidebarOpen}
            onToggleCollapse={() => setIsSidebarOpen(false)}
            className={`hidden md:flex ${
              currentView === 'team-workspace' || currentView === 'messages'
                ? 'h-full max-h-full overflow-y-auto scrollbar-none py-1'
                : 'sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-none py-3'
            }`}
          />
        )}

        {/* Dynamic Center Area based on current view - expands when sidebar is closed */}
        <main
          className={`flex-1 min-w-0 transition-all duration-300 h-full flex flex-col min-h-0 ${
            !isSidebarOpen ? 'w-full' : ''
          } ${
            currentView === 'team-workspace' || currentView === 'messages'
              ? 'overflow-hidden'
              : ''
          }`}
        >
          {currentView === 'profile' && (
            <ProfileSetupView
              initialUser={currentUser}
              onSave={handleProfileSave}
              onNavigateHome={() => setCurrentView('home')}
            />
          )}

          {currentView === 'home' && (
            <div className="flex flex-col xl:flex-row gap-6 justify-center items-start w-full">
              <div className="flex-1 min-w-0 max-w-4xl w-full">
                <HomeFeedView
                  currentUser={currentUser}
                  posts={displayedPosts}
                  stories={stories}
                  onAddPost={handleAddPost}
                  onUpdatePosts={setPosts}
                  onAddStory={handleAddStory}
                  onTagClick={(tag) => setSearchFilter(tag.replace('#', ''))}
                />
              </div>

              {/* Distinct Separated Right-Side Section (Trending Techs, Suggested for You, Tech News) */}
              <div className="hidden xl:block w-80 lg:w-[340px] shrink-0 border-l border-slate-200/90 pl-6 sticky top-20 max-h-[calc(100vh-5.5rem)] overflow-y-auto overscroll-contain py-1 scrollbar-thin scrollbar-thumb-slate-200">
                <RightSidebar
                  onSelectTag={(tag) => setSearchFilter(tag)}
                  className="space-y-4 pb-8"
                />
              </div>
            </div>
          )}

          {(currentView === 'hackathons' || currentView === 'opportunities') && (
            <HackathonsView
              onStartCreateTeam={handleStartCreateTeam}
              onOpenTeamWorkspace={handleOpenTeamWorkspace}
              registeredHackathons={registeredHackathonIds}
              onRegisterHackathon={handleRegisterHackathon}
            />
          )}

          {currentView === 'create-team' && (
            <CreateTeamView
              hackathon={selectedHackathonForTeam}
              onBackToHackathons={() => setCurrentView('hackathons')}
              onTeamCreated={handleTeamCreated}
            />
          )}

          {currentView === 'team-workspace' && (
            <TeamWorkspaceView
              currentTeam={currentActiveTeam}
              allTeams={teams}
              onSelectTeam={(t) => setActiveTeamId(t.id)}
              onViewHackathon={(hId) => setCurrentView('hackathons')}
              onOpenCreateTeam={() => {
                setSelectedHackathonForTeam(hackathons[0]);
                setCurrentView('create-team');
              }}
            />
          )}

          {(currentView === 'explore' || currentView === 'communities' || currentView === 'connections' || currentView === 'my-connections') && (
            <ExploreView onNavigate={(v) => setCurrentView(v)} />
          )}

          {(currentView === 'connect' || currentView === 'peers') && (
            <ConnectView
              onNavigate={(v) => setCurrentView(v)}
              onOpenInvite={() => setShowInviteModal(true)}
            />
          )}

          {currentView === 'internships' && (
            <InternshipsView />
          )}

          {currentView === 'messages' && (
            <MessagesView
              currentUser={currentUser}
              teams={teams}
              activeTeamId={activeTeamId}
              onSelectTeam={(t) => setActiveTeamId(t.id)}
              onViewHackathon={() => setCurrentView('hackathons')}
              onOpenCreateTeam={() => {
                setSelectedHackathonForTeam(hackathons[0]);
                setCurrentView('create-team');
              }}
            />
          )}

          {currentView === 'bookmarks' && (
            <BookmarksView
              onNavigateView={(view, itemId) => {
                if (view === 'hackathons') {
                  if (itemId) {
                    const found = hackathons.find((h) => h.id === itemId);
                    if (found) setSelectedHackathonForTeam(found);
                  }
                  setCurrentView('hackathons');
                } else if (view === 'internships') {
                  setCurrentView('internships');
                } else if (view === 'explore') {
                  setCurrentView('explore');
                } else {
                  setCurrentView(view);
                }
              }}
              onViewHackathon={(hId) => {
                const found = hackathons.find((h) => h.id === hId);
                if (found) setSelectedHackathonForTeam(found);
                setCurrentView('hackathons');
              }}
            />
          )}
        </main>
      </div>

      {/* Invite Friends Modal */}
      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} />
      )}
    </div>
  );
}
