import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Check,
  Sparkles,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Send,
  UserCheck,
  CheckCircle2,
  MapPin,
  GraduationCap,
  Code2,
  Target,
  Briefcase,
  Users2,
  Lightbulb,
  Filter,
  RefreshCw,
  ExternalLink,
  Flame,
  ArrowRight,
  UserPlus,
  Maximize2,
  Share2,
  Copy,
  Gift,
} from 'lucide-react';

export interface ConnectProfile {
  id: string;
  name: string;
  avatar: string;
  heroImage: string;
  isVerified: boolean;
  year: string;
  college: string;
  location: string;
  lookingForBadge: string;
  skills: string[];
  bio: string;
  detailedSkills: string;
  interests: string;
  lookingForDetail: string;
  mutualConnectionsCount: number;
  domain: string;
  availability: string;
  isOnline: boolean;
  isOpenToCollaborate: boolean;
}

export const CONNECT_PROFILES: ConnectProfile[] = [
  {
    id: 'cp-1',
    name: 'Aman Verma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&auto=format&fit=crop&q=80',
    isVerified: true,
    year: '3rd Year',
    college: 'SGSITS Indore',
    location: 'Indore, India',
    lookingForBadge: 'Project Team, Internships',
    skills: ['Java', 'Spring Boot', 'System Design', 'Cloud', 'Open Source'],
    bio: 'Passionate about building scalable backend systems and open source. Always excited to collaborate on innovative ideas and hackathons.',
    detailedSkills: 'Java, Spring Boot, Docker, AWS, System Design',
    interests: 'Backend, Cloud, Open Source, Startups',
    lookingForDetail: 'Internship, Hackathon Team, Long-term Collaboration',
    mutualConnectionsCount: 5,
    domain: 'Web Development',
    availability: 'Open to Collaborate',
    isOnline: true,
    isOpenToCollaborate: true,
  },
  {
    id: 'cp-2',
    name: 'Riya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=80',
    isVerified: true,
    year: '2nd Year',
    college: 'NIT Trichy',
    location: 'Trichy, India',
    lookingForBadge: 'Hackathon Teammates',
    skills: ['Python', 'PyTorch', 'Next.js', 'UI/UX', 'TensorFlow'],
    bio: 'AI researcher and frontend enthusiast building intelligent tools for university campuses. 2x national hackathon winner.',
    detailedSkills: 'Python, PyTorch, Fastify, React, Tailwind CSS',
    interests: 'AI/ML, Generative AI, EdTech, Product Design',
    lookingForDetail: 'Smart India Hackathon Team, Full-stack Devs',
    mutualConnectionsCount: 8,
    domain: 'AI/ML',
    availability: 'Part-time',
    isOnline: true,
    isOpenToCollaborate: true,
  },
  {
    id: 'cp-3',
    name: 'Kunal Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80',
    isVerified: true,
    year: 'Final Year',
    college: 'IIIT Delhi',
    location: 'Delhi, India',
    lookingForBadge: 'Co-founder, Startups',
    skills: ['TypeScript', 'Kubernetes', 'Go', 'GraphQL', 'Rust'],
    bio: 'Distributed systems architect & open source contributor to CNCF projects. Looking to connect with student founders in cloud native.',
    detailedSkills: 'Go, Rust, Kubernetes, Docker, gRPC, PostgreSQL',
    interests: 'Open Source, DevOps, Distributed Systems, Seed Startups',
    lookingForDetail: 'Technical Co-founder, Cloud Architect Roles',
    mutualConnectionsCount: 12,
    domain: 'Cloud Computing',
    availability: 'Open to Collaborate',
    isOnline: true,
    isOpenToCollaborate: true,
  },
  {
    id: 'cp-4',
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80',
    isVerified: true,
    year: '3rd Year',
    college: 'DA-IICT',
    location: 'Gandhinagar, India',
    lookingForBadge: 'Design Projects',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'Framer', 'Product'],
    bio: 'Product designer obsessed with micro-interactions, accessibility, and sleek fintech UIs. Designed apps with 50k+ active users.',
    detailedSkills: 'Figma, Prototyping, User Research, Webflow, Design Tokens',
    interests: 'Product Design, UI/UX, Design Systems, Mobile Apps',
    lookingForDetail: 'Product Design Internships, Hackathon Collaborations',
    mutualConnectionsCount: 4,
    domain: 'Product Design',
    availability: 'Weekends',
    isOnline: true,
    isOpenToCollaborate: true,
  },
  {
    id: 'cp-5',
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=80',
    isVerified: false,
    year: '2nd Year',
    college: 'BITS Pilani',
    location: 'Goa, India',
    lookingForBadge: 'Robotics Team',
    skills: ['ROS2', 'C++', 'Computer Vision', 'PyTorch', 'IoT'],
    bio: 'Autonomous robotics builder. Working on SLAM algorithms and quadcopter navigation systems. Seeking embedded firmware peers.',
    detailedSkills: 'C++, Python, ROS2, OpenCV, Gazebo, Embedded Linux',
    interests: 'Robotics, IoT, Computer Vision, Drones',
    lookingForDetail: 'Hardware Team, Inter-college Robotics Competitions',
    mutualConnectionsCount: 6,
    domain: 'AI/ML',
    availability: 'Open to Collaborate',
    isOnline: false,
    isOpenToCollaborate: true,
  },
  {
    id: 'cp-6',
    name: 'Muskan Jain',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80',
    isVerified: true,
    year: 'Final Year',
    college: 'DTU',
    location: 'Delhi, India',
    lookingForBadge: 'Data Science Roles',
    skills: ['SQL', 'Pandas', 'Scikit-Learn', 'Tableau', 'BigQuery'],
    bio: 'Data scientist turning raw telemetry into actionable product growth stories. Published papers on multimodal predictive models.',
    detailedSkills: 'Python, SQL, Apache Spark, Power BI, Deep Learning',
    interests: 'Data Science, Predictive Modeling, Quant Finance',
    lookingForDetail: 'Full-time Opportunities, Research Mentorship',
    mutualConnectionsCount: 9,
    domain: 'Data Science',
    availability: 'Full-time',
    isOnline: true,
    isOpenToCollaborate: true,
  },
  {
    id: 'cp-7',
    name: 'Rohit Singh',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80',
    isVerified: false,
    year: '3rd Year',
    college: 'VIT Vellore',
    location: 'Vellore, India',
    lookingForBadge: 'CTF Team',
    skills: ['Cybersecurity', 'Wireshark', 'Burp Suite', 'Linux', 'Cloud'],
    bio: 'Offensive security researcher and top 1% CTF player on HackTheBox. Passionate about zero-trust cloud network architecture.',
    detailedSkills: 'Ethical Hacking, Penetration Testing, Kali Linux, Python',
    interests: 'Cybersecurity, Cloud Security, Red Teaming, Cryptography',
    lookingForDetail: 'Capture The Flag (CTF) Team, Security Audits',
    mutualConnectionsCount: 3,
    domain: 'Cybersecurity',
    availability: 'Open to Collaborate',
    isOnline: true,
    isOpenToCollaborate: true,
  },
];

export const INITIAL_INTERESTS = [
  'Web Development',
  'AI/ML',
  'Open Source',
  'Product Design',
  'Startups',
  'Hackathons',
];

export const SUGGESTED_PEERS = [
  {
    id: 'sug-1',
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    year: '3rd Year',
    college: 'DA-IICT',
    tags: 'UI/UX, Product Design',
  },
  {
    id: 'sug-2',
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    year: '2nd Year',
    college: 'BITS Pilani',
    tags: 'Robotics, AI/ML',
  },
  {
    id: 'sug-3',
    name: 'Muskan Jain',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    year: 'Final Year',
    college: 'DTU',
    tags: 'Data Science, ML',
  },
  {
    id: 'sug-4',
    name: 'Rohit Singh',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    year: '3rd Year',
    college: 'VIT Vellore',
    tags: 'Cybersecurity, Cloud',
  },
  {
    id: 'sug-5',
    name: 'Tanmay Bhatia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    year: '4th Year',
    college: 'IIT Bombay',
    tags: 'Systems, Rust, Distributed Systems',
  },
  {
    id: 'sug-6',
    name: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    year: '2nd Year',
    college: 'IIIT Hyderabad',
    tags: 'Full-stack, Next.js, Web3',
  },
  {
    id: 'sug-7',
    name: 'Devanshu Roy',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    year: '3rd Year',
    college: 'NSUT Delhi',
    tags: 'DevOps, Kubernetes, GCP',
  },
  {
    id: 'sug-8',
    name: 'Ananya Gupta',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    year: 'Final Year',
    college: 'IGDTUW',
    tags: 'NLP, Large Language Models, AI',
  },
];

interface ConnectViewProps {
  onNavigate?: (view: string) => void;
  onOpenInvite?: () => void;
}

export const ConnectView: React.FC<ConnectViewProps> = ({ onNavigate, onOpenInvite }) => {
  // Active Tab
  const [activeTab, setActiveTab] = useState<'discover' | 'mutual'>('discover');

  // Filter criteria states
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedLookingFor, setSelectedLookingFor] = useState<string>('Any');
  const [selectedCollege, setSelectedCollege] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('Any');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('Any');

  // Interest tags
  const [interests, setInterests] = useState<string[]>(INITIAL_INTERESTS);
  const [showAddInterestModal, setShowAddInterestModal] = useState<boolean>(false);
  const [newInterestInput, setNewInterestInput] = useState<string>('');

  // Initial Filter Onboarding Modal
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [hasCustomizedFilter, setHasCustomizedFilter] = useState<boolean>(true);

  // Temporary state for the Filter Modal containing all 6 filter features
  const [modalDomain, setModalDomain] = useState<string>('All');
  const [modalLookingFor, setModalLookingFor] = useState<string>('Any');
  const [modalCollege, setModalCollege] = useState<string>('All');
  const [modalYear, setModalYear] = useState<string>('All');
  const [modalLocation, setModalLocation] = useState<string>('Any');
  const [modalAvailability, setModalAvailability] = useState<string>('Any');

  // Count active filters (non-default selections)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedDomain !== 'All') count++;
    if (selectedLookingFor !== 'Any') count++;
    if (selectedCollege !== 'All') count++;
    if (selectedYear !== 'All') count++;
    if (selectedLocation !== 'Any') count++;
    if (selectedAvailability !== 'Any') count++;
    return count;
  }, [selectedDomain, selectedLookingFor, selectedCollege, selectedYear, selectedLocation, selectedAvailability]);

  // Open filter modal and synchronize temporary modal values with current active filter states
  const openFilterModal = () => {
    setModalDomain(selectedDomain);
    setModalLookingFor(selectedLookingFor);
    setModalCollege(selectedCollege);
    setModalYear(selectedYear);
    setModalLocation(selectedLocation);
    setModalAvailability(selectedAvailability);
    setShowFilterModal(true);
  };

  // Deck carousel index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Connection request status tracker (maps profile ID to true/false)
  const [connectedProfiles, setConnectedProfiles] = useState<Record<string, boolean>>({});
  const [suggestedConnected, setSuggestedConnected] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter profiles based on selected filters
  const filteredProfiles = useMemo(() => {
    return CONNECT_PROFILES.filter((profile) => {
      if (selectedDomain !== 'All' && profile.domain !== selectedDomain) return false;
      if (selectedLookingFor !== 'Any' && !profile.lookingForBadge.toLowerCase().includes(selectedLookingFor.toLowerCase()) && !profile.lookingForDetail.toLowerCase().includes(selectedLookingFor.toLowerCase())) {
        return false;
      }
      if (selectedCollege !== 'All' && !profile.college.toLowerCase().includes(selectedCollege.toLowerCase())) {
        return false;
      }
      if (selectedYear !== 'All' && profile.year !== selectedYear) return false;
      if (selectedLocation !== 'Any' && !profile.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
      if (selectedAvailability !== 'Any' && profile.availability !== selectedAvailability) return false;
      return true;
    });
  }, [selectedDomain, selectedLookingFor, selectedCollege, selectedYear, selectedLocation, selectedAvailability]);

  // Tinder Swipe & Drag State
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [swipeExit, setSwipeExit] = useState<'left' | 'right' | null>(null);
  const [previewImage, setPreviewImage] = useState<{ src: string; name: string } | null>(null);
  const [hasCopiedInvite, setHasCopiedInvite] = useState<boolean>(false);
  const inviteLink = `${window.location.origin}/join?invite=cc-campus-2025`;

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setHasCopiedInvite(true);
    setTimeout(() => setHasCopiedInvite(false), 2500);
  };

  // Profiles list fallback if filters return 0, with support for Discover and Mutual Communities
  const activeList = useMemo(() => {
    const base = filteredProfiles.length > 0 ? filteredProfiles : CONNECT_PROFILES;
    if (activeTab === 'mutual') {
      const mutualOnly = base.filter((p) => p.mutualConnectionsCount > 0);
      return mutualOnly.length > 0 ? mutualOnly : base;
    }
    return base;
  }, [filteredProfiles, activeTab]);

  const safeIndex = currentIndex % activeList.length;
  const currentProfile = activeList[safeIndex];
  const nextProfile = activeList[(safeIndex + 1) % activeList.length];

  const handleNextProfile = () => {
    triggerSwipe('left');
  };

  const handlePrevProfile = () => {
    setSwipeExit(null);
    setDragOffset({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev - 1 + activeList.length) % activeList.length);
  };

  const handleSendConnection = (profileId: string, name: string) => {
    setConnectedProfiles((prev) => ({
      ...prev,
      [profileId]: true,
    }));
    setToastMessage(`Connection request sent to ${name}! 🎉`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Swipe trigger (programmatic or via gesture)
  const triggerSwipe = (direction: 'left' | 'right') => {
    if (swipeExit) return;
    setSwipeExit(direction);

    if (direction === 'right') {
      if (currentProfile) {
        handleSendConnection(currentProfile.id, currentProfile.name);
      }
    }

    setTimeout(() => {
      setSwipeExit(null);
      setDragOffset({ x: 0, y: 0 });
      setCurrentIndex((prev) => (prev + 1) % activeList.length);
    }, 280);
  };

  // Pointer drag event handlers for mouse & touch swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || swipeExit) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset.x > 80) {
      triggerSwipe('right');
    } else if (dragOffset.x < -80) {
      triggerSwipe('left');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // Keyboard controls for swipe (Arrow Left = Skip, Arrow Right = Connect)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        triggerSwipe('right');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        triggerSwipe('left');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeList, currentProfile, swipeExit]);

  const handleToggleSuggested = (id: string, name: string) => {
    setSuggestedConnected((prev) => {
      const nextState = !prev[id];
      if (nextState) {
        setToastMessage(`Connection invitation sent to ${name}`);
        setTimeout(() => setToastMessage(null), 3000);
      }
      return { ...prev, [id]: nextState };
    });
  };

  const handleRemoveInterest = (item: string) => {
    setInterests(interests.filter((i) => i !== item));
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterestInput.trim() && !interests.includes(newInterestInput.trim())) {
      setInterests([...interests, newInterestInput.trim()]);
      setNewInterestInput('');
      setShowAddInterestModal(false);
    }
  };

  const modalMatchingProfilesCount = useMemo(() => {
    return CONNECT_PROFILES.filter((profile) => {
      if (modalDomain !== 'All' && profile.domain !== modalDomain) return false;
      if (
        modalLookingFor !== 'Any' &&
        !profile.lookingForBadge.toLowerCase().includes(modalLookingFor.toLowerCase()) &&
        !profile.lookingForDetail.toLowerCase().includes(modalLookingFor.toLowerCase())
      ) {
        return false;
      }
      if (modalCollege !== 'All' && !profile.college.toLowerCase().includes(modalCollege.toLowerCase())) {
        return false;
      }
      if (modalYear !== 'All' && profile.year !== modalYear) return false;
      if (modalLocation !== 'Any' && !profile.location.toLowerCase().includes(modalLocation.toLowerCase())) {
        return false;
      }
      if (modalAvailability !== 'Any' && profile.availability !== modalAvailability) return false;
      return true;
    }).length;
  }, [modalDomain, modalLookingFor, modalCollege, modalYear, modalLocation, modalAvailability]);

  const handleApplyModalFilters = () => {
    setSelectedDomain(modalDomain);
    setSelectedCollege(modalCollege);
    setSelectedLocation(modalLocation);
    setSelectedLookingFor(modalLookingFor);
    setSelectedYear(modalYear);
    setSelectedAvailability(modalAvailability);
    setHasCustomizedFilter(true);
    setShowFilterModal(false);
    setCurrentIndex(0);
    setToastMessage('Filters applied successfully!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleResetModalFilters = () => {
    setModalDomain('All');
    setModalLookingFor('Any');
    setModalCollege('All');
    setModalYear('All');
    setModalLocation('Any');
    setModalAvailability('Any');
  };

  const handleClearAllFilters = () => {
    setSelectedDomain('All');
    setSelectedLookingFor('Any');
    setSelectedCollege('All');
    setSelectedYear('All');
    setSelectedLocation('Any');
    setSelectedAvailability('Any');
    setCurrentIndex(0);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto py-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center font-bold text-xs">
            ✓
          </div>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 2-Column Responsive Layout: Left Side (Profile Section) | Right Side (Smaller Connect & Filters + Suggestions Below) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* LEFT / MAIN PROFILE SECTION: 4:3 Profile Pic, Clean Single Card with All Info Fitting Without Sliding */}
        <div className="flex-1 min-w-0 space-y-4 w-full">
          {/* Subheader: Discover / Mutual Communities Tabs & 1/20 Counter + Skip */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-6 border-b border-transparent">
              <button
                onClick={() => {
                  setActiveTab('discover');
                  setCurrentIndex(0);
                  setDragOffset({ x: 0, y: 0 });
                  setSwipeExit(null);
                }}
                className={`text-sm font-bold pb-2 transition-colors relative cursor-pointer ${
                  activeTab === 'discover' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Discover</span>
                {activeTab === 'discover' && (
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('mutual');
                  setCurrentIndex(0);
                  setDragOffset({ x: 0, y: 0 });
                  setSwipeExit(null);
                }}
                className={`text-sm font-bold pb-2 transition-colors relative cursor-pointer ${
                  activeTab === 'mutual' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Mutual Communities</span>
                {activeTab === 'mutual' && (
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Small Filter Button matching screenshot */}
              <button
                onClick={openFilterModal}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  activeFilterCount > 0
                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100'
                    : 'border-blue-500 hover:border-blue-600 bg-white hover:bg-blue-50/50 text-blue-600'
                }`}
                title="Filter Profiles"
              >
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {activeFilterCount > 0 && (
                <button
                  onClick={handleClearAllFilters}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Clear all filters"
                >
                  Clear
                </button>
              )}

              <span className="text-xs font-bold text-slate-400 ml-1">
                {safeIndex + 1}/{activeList.length}
              </span>
              <button
                onClick={handleNextProfile}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Skip</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Rebuilt Compact Profile Card Deck - Fits in a Single View with Perfect Photo Ratio */}
          {currentProfile ? (
            <div className="relative w-full max-w-[620px] mx-auto select-none">
              {/* BACK PEEK CARD (Next Profile in Stack) */}
              {nextProfile && (
                <div
                  className="absolute inset-0 bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden transform scale-[0.97] translate-y-2 opacity-60 pointer-events-none transition-transform duration-300 z-0 flex flex-col sm:flex-row"
                >
                  <div className="w-full sm:w-[240px] md:w-[250px] shrink-0 h-56 sm:h-auto sm:min-h-[380px] bg-slate-900 overflow-hidden">
                    <img
                      src={nextProfile.heroImage}
                      alt={nextProfile.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 p-5 bg-white opacity-40"></div>
                </div>
              )}

              {/* FRONT ACTIVE CARD (Swipeable Card) */}
              <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                style={{
                  transform:
                    swipeExit === 'left'
                      ? 'translate3d(-140%, 0, 0) rotate(-22deg)'
                      : swipeExit === 'right'
                      ? 'translate3d(140%, 0, 0) rotate(22deg)'
                      : isDragging
                      ? `translate3d(${dragOffset.x}px, ${dragOffset.y * 0.2}px, 0) rotate(${dragOffset.x * 0.06}deg)`
                      : 'translate3d(0, 0, 0) rotate(0deg)',
                  transition: swipeExit
                    ? 'transform 0.28s ease-in, opacity 0.28s ease-in'
                    : isDragging
                    ? 'none'
                    : 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  touchAction: 'none',
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
                className="relative bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden z-10 transition-shadow duration-300 flex flex-col sm:flex-row"
              >
                {/* STAMP OVERLAYS */}
                {/* CONNECT Stamp (Emerald, emerges when swiping right) */}
                <div
                  className="absolute top-4 left-4 z-30 pointer-events-none transition-opacity duration-150"
                  style={{
                    opacity:
                      swipeExit === 'right'
                        ? 1
                        : Math.min(1, Math.max(0, (dragOffset.x - 20) / 70)),
                    transform: 'rotate(-12deg)',
                  }}
                >
                  <div className="px-3 py-1 border-3 border-emerald-500 bg-emerald-500/20 backdrop-blur-xs rounded-xl shadow-lg flex items-center gap-1.5">
                    <span className="text-emerald-500 font-black text-lg sm:text-xl tracking-wider uppercase">
                      CONNECT
                    </span>
                    <Check className="w-5 h-5 stroke-[3] text-emerald-500" />
                  </div>
                </div>

                {/* SKIP Stamp (Rose, emerges when swiping left) */}
                <div
                  className="absolute top-4 right-4 z-30 pointer-events-none transition-opacity duration-150"
                  style={{
                    opacity:
                      swipeExit === 'left'
                        ? 1
                        : Math.min(1, Math.max(0, (-dragOffset.x - 20) / 70)),
                    transform: 'rotate(12deg)',
                  }}
                >
                  <div className="px-3 py-1 border-3 border-rose-500 bg-rose-500/20 backdrop-blur-xs rounded-xl shadow-lg flex items-center gap-1.5">
                    <span className="text-rose-500 font-black text-lg sm:text-xl tracking-wider uppercase">
                      SKIP
                    </span>
                    <X className="w-5 h-5 stroke-[3.5] text-rose-500" />
                  </div>
                </div>

                {/* Left Column: Profile Photo in proper 3:4/4:3 portrait ratio showing complete picture */}
                <div className="relative w-full sm:w-[240px] md:w-[250px] shrink-0 aspect-[4/3] sm:aspect-auto sm:min-h-[380px] bg-slate-950 overflow-hidden group">
                  <img
                    src={currentProfile.heroImage}
                    alt={currentProfile.name}
                    className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-500 group-hover:scale-102"
                  />

                  {/* Gentle gradient for text contrast at edges without blocking the face */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/25 pointer-events-none" />

                  {/* Top-left: Online status badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-bold text-emerald-700 shadow-xs border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Online</span>
                    </span>
                  </div>

                  {/* Top-right: Open to collaborate badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-bold text-slate-800 shadow-xs border border-slate-200/80">
                      <span className="text-xs">🤝</span>
                      <span>Collab</span>
                    </span>
                  </div>

                  {/* Previous Profile Arrow */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevProfile();
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white shadow-sm flex items-center justify-center transition-all hover:scale-105 cursor-pointer z-20"
                    title="Previous Profile"
                  >
                    <ChevronLeft className="w-4 h-4 text-white -translate-x-0.5" />
                  </button>

                  {/* Next Profile Arrow */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerSwipe('left');
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white shadow-sm flex items-center justify-center transition-all hover:scale-105 cursor-pointer z-20"
                    title="Next Profile"
                  >
                    <ChevronRight className="w-4 h-4 text-white translate-x-0.5" />
                  </button>

                  {/* Bottom photo overlay: Looking For badge and Maximize Full Photo button */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between gap-1 text-white">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-xl text-[10px] font-bold text-purple-300 truncate max-w-[170px]">
                      ✧ {currentProfile.lookingForBadge}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewImage({ src: currentProfile.heroImage, name: currentProfile.name });
                      }}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/90 hover:text-white transition-all cursor-pointer"
                      title="View complete full photo"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Profile Details & Skip / Send Request buttons */}
                <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 bg-white min-w-0 space-y-3">
                  {/* Header Info: Name, Verified, College, Location */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">
                            {currentProfile.name}
                          </h2>
                          {currentProfile.isVerified && (
                            <CheckCircle2 className="w-4 h-4 fill-blue-500 text-white shrink-0 drop-shadow-xs" />
                          )}
                        </div>
                        <p className="text-xs font-semibold text-slate-500 truncate">
                          {currentProfile.year} • {currentProfile.college}
                        </p>
                      </div>

                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10px] rounded-md border border-blue-100 shrink-0">
                        {currentProfile.domain}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                        <span className="truncate">{currentProfile.location}</span>
                      </span>
                      <span className="text-emerald-600 font-semibold text-[10px] px-1.5 py-0.2 bg-emerald-50 rounded border border-emerald-100 shrink-0">
                        {currentProfile.availability}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {currentProfile.bio}
                  </p>

                  {/* Compact 2x2 Information Grid */}
                  <div className="bg-slate-50/90 rounded-xl p-2.5 border border-slate-200/70 grid grid-cols-2 gap-2 text-xs">
                    {/* Skills item */}
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="p-1 bg-blue-100 text-blue-700 rounded-md shrink-0">
                        <Code2 className="w-3.5 h-3.5" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Skills</span>
                        <span className="text-[11px] font-bold text-slate-800 truncate block">
                          {currentProfile.detailedSkills}
                        </span>
                      </div>
                    </div>

                    {/* Looking For item */}
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="p-1 bg-purple-100 text-purple-700 rounded-md shrink-0">
                        <Briefcase className="w-3.5 h-3.5" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Looking for</span>
                        <span className="text-[11px] font-bold text-slate-800 truncate block">
                          {currentProfile.lookingForDetail}
                        </span>
                      </div>
                    </div>

                    {/* Interests item */}
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="p-1 bg-amber-100 text-amber-700 rounded-md shrink-0">
                        <Target className="w-3.5 h-3.5" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Interests</span>
                        <span className="text-[11px] font-bold text-slate-800 truncate block">
                          {currentProfile.interests}
                        </span>
                      </div>
                    </div>

                    {/* Community / Network */}
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="p-1 bg-emerald-100 text-emerald-700 rounded-md shrink-0">
                        <Users2 className="w-3.5 h-3.5" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Network</span>
                        <span className="text-[11px] font-bold text-slate-800 truncate block">
                          {currentProfile.mutualConnectionsCount} mutual peers
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skill Pills */}
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    {currentProfile.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold text-[11px] rounded-lg border border-slate-200/80"
                      >
                        {skill}
                      </span>
                    ))}
                    {currentProfile.skills.length > 4 && (
                      <span className="text-[10px] text-slate-400 font-bold px-1">
                        +{currentProfile.skills.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* ONLY TWO BUTTONS: SKIP & SENT / SEND REQUEST */}
                  <div className="pt-1 flex items-center gap-2.5">
                    {/* Skip Button */}
                    <button
                      onClick={() => triggerSwipe('left')}
                      className="flex-1 h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-xs shadow-2xs hover:border-slate-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Skip profile"
                    >
                      <X className="w-4 h-4 text-slate-400 stroke-[2.5]" />
                      <span>Skip</span>
                    </button>

                    {/* Send Request / Request Sent Button */}
                    <button
                      onClick={() => triggerSwipe('right')}
                      disabled={connectedProfiles[currentProfile.id]}
                      className={`flex-[1.5] h-10 px-4 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        connectedProfiles[currentProfile.id]
                          ? 'bg-emerald-600 text-white shadow-emerald-200 cursor-default'
                          : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-blue-200 hover:shadow-md'
                      }`}
                      title={connectedProfiles[currentProfile.id] ? 'Request already sent' : 'Send connection request'}
                    >
                      {connectedProfiles[currentProfile.id] ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Request Sent ✓</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 stroke-[2.5]" />
                          <span>Send Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 bg-white rounded-3xl border border-slate-200 w-full">
              <p className="text-slate-600 font-bold mb-3">No profiles matched this filter.</p>
              <button
                onClick={handleClearAllFilters}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Suggested for You Section - Positioned directly below profile card to fill empty space */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                    Suggested for You
                  </h3>
                  <p className="text-xs text-slate-500">
                    Recommended peers based on your domain, college and interests
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedDomain('All');
                    setSelectedCollege('All');
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>
            </div>

            {/* Responsive Peer Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SUGGESTED_PEERS.map((peer) => {
                const isRequested = suggestedConnected[peer.id];
                return (
                  <div
                    key={peer.id}
                    className="p-3.5 bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200/80 hover:border-blue-200 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={peer.avatar}
                          alt={peer.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                          {peer.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {peer.year} • {peer.college}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-slate-200/60 text-slate-600 text-[10px] font-semibold rounded-md truncate max-w-full">
                          {peer.tags}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Active</span>
                      </span>
                      <button
                        onClick={() => handleToggleSuggested(peer.id, peer.name)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                          isRequested
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-white hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 shadow-2xs'
                        }`}
                      >
                        {isRequested ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Sent ✓</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Connect</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE PANEL: Smaller Connect Banner & Interests, Compact Filters, and Suggestions Below */}
        <div className="w-full lg:w-80 shrink-0 space-y-4">
          {/* 1. Header Card: Connect & Your Interests (Smaller & Compact on Right Side) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-black text-slate-900 tracking-tight">Connect</h2>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                  Find & connect with peers, collaborators and mentors.
                </p>
              </div>
            </div>

            {/* Filter Button (Wider & Full Width) */}
            <div className="pt-0.5">
              <button
                onClick={openFilterModal}
                className={`w-full py-2 px-4 rounded-full border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs ${
                  activeFilterCount > 0
                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100'
                    : 'border-blue-500 hover:border-blue-600 bg-white hover:bg-blue-50/60 text-blue-600'
                }`}
                title="Filter recommendations"
              >
                <Filter className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Your Interests Section */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-xs text-slate-900">Your Interests</h3>
                  <p className="text-[10px] text-slate-500">
                    Recommendations are tailored to these tags.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddInterestModal(true)}
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>

              {/* Interactive Pills */}
              <div className="flex flex-wrap gap-1 pt-0.5">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50/90 text-blue-700 border border-blue-200/80 rounded-full text-[10px] font-bold tracking-tight hover:bg-blue-100 transition-colors"
                  >
                    <span>{interest}</span>
                    <button
                      onClick={() => handleRemoveInterest(interest)}
                      className="hover:text-red-600 p-0.5 rounded-full cursor-pointer transition-colors"
                      title="Remove interest"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Invite Friends Card (Prominently repositioned in Right Sidebar) */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/90 rounded-3xl border border-indigo-100/90 shadow-2xs p-4 space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                    Invite Friends
                  </h3>
                  <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 font-bold text-[9px] rounded-full uppercase tracking-wider">
                    Perks
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  Bring your campus squad to form hackathon teams and build projects together.
                </p>
              </div>
            </div>

            {/* Karma & Rewards Perk */}
            <div className="p-2.5 bg-white/90 rounded-xl border border-indigo-100 flex items-center gap-2 text-[11px] text-slate-700">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="leading-tight">
                Earn <strong>+100 Karma</strong> & unlock priority hackathon teammate matchmaking!
              </span>
            </div>

            {/* Quick Copy Link Row */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Your Campus Referral Link
              </label>
              <div className="flex items-center gap-1.5 bg-white rounded-xl border border-slate-200 p-1">
                <input
                  type="text"
                  readOnly
                  value={inviteLink}
                  className="w-full bg-transparent px-2 text-[11px] font-semibold text-slate-600 focus:outline-none select-all truncate"
                />
                <button
                  onClick={handleCopyInviteLink}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                    hasCopiedInvite
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title="Copy invite link"
                >
                  {hasCopiedInvite ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Open Full Invite Modal Button */}
            <button
              onClick={() => {
                if (onOpenInvite) {
                  onOpenInvite();
                } else {
                  handleCopyInviteLink();
                }
              }}
              className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Invite Campus Peers</span>
            </button>
          </div>

          {/* 4. Expand Your Network Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900">Expand Your Network</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Connect with peers & teammates to build hackathon projects together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Filter Profiles (Small Filter Button Modal with all 6 filter features) */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                  <SlidersHorizontal className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Filters
                  </h3>
                  <p className="text-xs text-slate-500">
                    Narrow recommendations by domain, college, looking for & more
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetModalFilters}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline px-2 py-1 rounded cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: 2-Column Responsive Grid with all 6 Filter Features */}
            <div className="overflow-y-auto pr-1 space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Domain */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Domain</span>
                  </label>
                  <select
                    value={modalDomain}
                    onChange={(e) => setModalDomain(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="All">All Domains</option>
                    <option value="Web Development">Web Development</option>
                    <option value="AI/ML">AI / Machine Learning</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>

                {/* 2. Looking For */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-slate-400" />
                    <span>Looking For</span>
                  </label>
                  <select
                    value={modalLookingFor}
                    onChange={(e) => setModalLookingFor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="Any">Any</option>
                    <option value="Project Team">Project Team</option>
                    <option value="Hackathon">Hackathon Teammates</option>
                    <option value="Internship">Internships</option>
                    <option value="Startups">Startups / Co-founder</option>
                  </select>
                </div>

                {/* 3. College */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>College</span>
                  </label>
                  <select
                    value={modalCollege}
                    onChange={(e) => setModalCollege(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="All">All Colleges</option>
                    <option value="SGSITS">SGSITS Indore</option>
                    <option value="NIT Trichy">NIT Trichy</option>
                    <option value="IIIT Delhi">IIIT Delhi</option>
                    <option value="DA-IICT">DA-IICT</option>
                    <option value="BITS Pilani">BITS Pilani</option>
                    <option value="DTU">DTU Delhi</option>
                    <option value="VIT Vellore">VIT Vellore</option>
                  </select>
                </div>

                {/* 4. Year */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>Year</span>
                  </label>
                  <select
                    value={modalYear}
                    onChange={(e) => setModalYear(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="All">All Years</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="Final Year">Final Year</option>
                  </select>
                </div>

                {/* 5. Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Location</span>
                  </label>
                  <select
                    value={modalLocation}
                    onChange={(e) => setModalLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="Any">Any Location</option>
                    <option value="Indore">Indore</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Trichy">Trichy</option>
                    <option value="Vellore">Vellore</option>
                    <option value="Goa">Goa</option>
                  </select>
                </div>

                {/* 6. Availability */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-slate-400" />
                    <span>Availability</span>
                  </label>
                  <select
                    value={modalAvailability}
                    onChange={(e) => setModalAvailability(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="Any">Any</option>
                    <option value="Open to Collaborate">Open to Collaborate</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Weekends">Weekends Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer with matching count and Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 shrink-0">
              <span className="text-xs font-semibold text-slate-500">
                <strong className="text-slate-900 font-bold">{modalMatchingProfilesCount}</strong>{' '}
                matching {modalMatchingProfilesCount === 1 ? 'profile' : 'profiles'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyModalFilters}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-2 transition-colors"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Interest Tag */}
      {showAddInterestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <form
            onSubmit={handleAddInterest}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">Add New Interest</h3>
              <button
                type="button"
                onClick={() => setShowAddInterestModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Add topics, domains, or skills that represent what you want to connect on.
            </p>

            <input
              type="text"
              value={newInterestInput}
              onChange={(e) => setNewInterestInput(e.target.value)}
              placeholder="e.g. Next.js, Robotics, Blockchain, Figma"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />

            {/* Quick Suggestions */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
                Suggested Popular Tags:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Cybersecurity', 'Robotics', 'Fintech', 'Next.js', 'Figma', 'System Design'].map(
                  (tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (!interests.includes(tag)) {
                          setInterests([...interests, tag]);
                          setShowAddInterestModal(false);
                        }
                      }}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      + {tag}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddInterestModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Add Tag
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Full Uncropped Profile Photo Lightbox Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={() => setPreviewImage(null)}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 flex items-center justify-center max-h-[75vh]">
              <img
                src={previewImage.src}
                alt={previewImage.name}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl"
              />
            </div>
            <div className="px-5 py-3 bg-slate-900 border-t border-white/10 flex items-center justify-between text-white">
              <div>
                <span className="font-bold text-sm block">{previewImage.name}</span>
                <span className="text-[11px] text-slate-400">Complete Profile Picture</span>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
