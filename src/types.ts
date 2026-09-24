export type AuthProvider = 'google' | 'github' | 'email';

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  gradeOrCgpa: string;
  rollNumber?: string;
  isCurrent: boolean;
  transcriptsUploaded?: boolean;
}

export interface ProjectRepoEntry {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveDemoUrl?: string;
  techStack: string[];
  stars?: number;
  forks?: number;
  featured: boolean;
  isProofVerified: boolean;
  architectureHighlights?: string;
}

export interface PrivateVault {
  phone?: string;
  personalEmail?: string;
  education: EducationEntry[];
  projects: ProjectRepoEntry[];
  certificates?: CertificateItem[];
  achievements?: AchievementItem[];
  careerTarget?: string;
  resumeReplacementSlug?: string;
  accessLevel: 'private' | 'recruiters_only' | 'shareable_link';
  lastUpdated: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  hobbies: string[];
  domains: string[];
  skills: string[];
  certificates: CertificateItem[];
  achievements?: AchievementItem[];
  githubUsername: string;
  isProfileComplete: boolean;
  termsAccepted: boolean;
  headline?: string;
  bio?: string;
  privateVault?: PrivateVault;
  stats?: {
    posts: number;
    connections: number;
    hackathons: number;
  };
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  url?: string;
  credentialId?: string;
  category?: string;
  badgeUrl?: string;
  isVerified?: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuerOrOrg: string;
  date: string;
  category: 'hackathon' | 'competition' | 'academic' | 'opensource' | 'leadership' | 'other';
  rankOrPosition?: string;
  description: string;
  proofUrl?: string;
  badge?: string;
  isVerified?: boolean;
}

export interface Story {
  id: string;
  userName: string;
  userAvatar: string;
  isCurrentUser?: boolean;
  hasUnseen?: boolean;
  storyImage: string;
  caption?: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    role?: string;
    college?: string;
    isVerified?: boolean;
  };
  timestamp: string;
  content: string;
  tags: string[];
  bannerBadge?: string;
  bannerTitle?: string;
  carouselCount?: string;
  images?: string[];
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  comments?: PostComment[];
  shares: number;
  isBookmarked?: boolean;
  isFollowingAuthor?: boolean;
  poll?: {
    question: string;
    totalVotes: number;
    options: {
      id: string;
      text: string;
      votes: number;
    }[];
    userVotedOptionId?: string;
  };
}

export interface PostComment {
  id: string;
  author: string;
  avatar: string;
  college: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface TrendingTech {
  id: number;
  name: string;
  category: string;
  mentions: string;
  growth: string;
  iconType: 'ai' | 'code' | 'cloud' | 'shield' | 'chart';
}

export interface TechNewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  logoType: 'openai' | 'google' | 'microsoft' | 'general';
  url?: string;
}

export interface ResearchArticle {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  iconType: 'arxiv' | 'ieee' | 'doc';
  readTime?: string;
}

export interface HackathonItem {
  id: string;
  title: string;
  organizer: string;
  organizerLogo?: string;
  prizePool: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  location: string;
  deadline: string;
  startDate?: string;
  status: 'Ongoing' | 'Registrations Open' | 'Coming Soon';
  tags: string[];
  banner: string;
  participants: number;
  participantsText?: string;
  difficulty?: string;
  teamSize?: string;
  eligibility?: string;
  about?: string;
  tagline?: string;
  isRegistered?: boolean;
  userTeamId?: string;
  timeline?: {
    event: string;
    date: string;
    completed?: boolean;
  }[];
}

export interface PeerInterested {
  id: string;
  name: string;
  avatar: string;
  college: string;
  role: string;
  lookingFor: string;
  skills: string[];
  connectionType: 'connection' | 'college' | 'peer';
  github?: string;
  isInvited?: boolean;
}

export interface HackathonMaster {
  id: string;
  name: string;
  avatar: string;
  title: string;
  organization: string;
  rating: number;
  reviewsCount: number;
  mentoringFee: number;
  currency: string;
  domains: string[];
  skills: string[];
  bio: string;
  badges: string[];
  isHired?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  college?: string;
  role: string;
  isLead?: boolean;
  isMaster?: boolean;
  skills?: string[];
}

export interface TeamMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole?: string;
  isCurrentUser: boolean;
  isMaster?: boolean;
  text: string;
  timestamp: string;
  reactions?: {
    emoji: string;
    count: number;
    users?: string[];
  }[];
  githubCard?: {
    repo: string;
    description: string;
    url: string;
  };
  attachment?: {
    name: string;
    size: string;
    type: string;
    url?: string;
  };
}

export interface HackathonTeam {
  id: string;
  name: string;
  motto: string;
  hackathonId: string;
  hackathonTitle: string;
  hackathonBanner?: string;
  createdDate: string;
  visibility: 'Private' | 'Public';
  teamCode: string;
  members: TeamMember[];
  tasks: {
    id: string;
    title: string;
    completed: boolean;
  }[];
  quickLinks: {
    title: string;
    url: string;
    icon: string;
  }[];
  messages: TeamMessage[];
}

export interface InternshipItem {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  mode: 'Remote' | 'In-office' | 'Hybrid' | 'On-site';
  type: 'Full-time' | 'Part-time';
  isPaid: boolean;
  stipend: string;
  duration: string;
  eligibility: string;
  tags: string[];
  postedTime: string;
  deadline: string;
  isFeatured?: boolean;
  isVerified?: boolean;
  isApplied?: boolean;
  isBookmarked?: boolean;
  about?: string;
  responsibilities?: string[];
  skillsRequired?: string[];
  openings?: number;
  testType?: string;
  testDate?: string;
  testCentre?: string;
  registrationFee?: string;
  selectionProcess?: {
    step: number;
    title: string;
    description: string;
    details?: string;
  }[];
}
