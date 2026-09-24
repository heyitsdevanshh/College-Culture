import React, { useState, useRef } from 'react';
import {
  Camera,
  User,
  School,
  Mail,
  Plus,
  X,
  Award,
  Check,
  Rocket,
  Quote,
  Headphones,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock,
  ShieldCheck,
  Github,
  ExternalLink,
  FileText,
  Trash2,
  Copy,
  Phone,
  Briefcase,
  UploadCloud,
  Globe,
  Code2,
  CheckCircle2,
  Share2,
  GraduationCap,
  Layers,
  Star,
  GitFork,
  Download,
  Trophy,
  Medal,
  Calendar,
  Building2,
  Pencil,
  Search,
  Filter,
  BadgeCheck,
} from 'lucide-react';
import {
  UserProfile,
  CertificateItem,
  AchievementItem,
  EducationEntry,
  ProjectRepoEntry,
  PrivateVault,
} from '../types';
import { HOBBIES_LIST, DOMAINS_LIST, POPULAR_COLLEGES } from '../mockData';

const DEFAULT_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert_1',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2026-05',
    expiryDate: '2029-05',
    url: 'https://aws.amazon.com/certification/',
    credentialId: 'AWS-7842910-CLD',
    category: 'Cloud Computing',
    isVerified: true,
  },
  {
    id: 'cert_2',
    title: 'Meta Front-End Developer Specialization',
    issuer: 'Coursera & Meta',
    issueDate: '2026-02',
    url: 'https://coursera.org/verify/meta-fed',
    credentialId: 'META-FED-99318',
    category: 'Web Development',
    isVerified: true,
  },
  {
    id: 'cert_3',
    title: 'Generative AI with Large Language Models',
    issuer: 'DeepLearning.AI & AWS',
    issueDate: '2026-01',
    url: 'https://deeplearning.ai',
    credentialId: 'DLAI-GENAI-4412',
    category: 'AI / Machine Learning',
    isVerified: true,
  },
];

const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach_1',
    title: '1st Place Winner - Smart India Hackathon (SIH) 2026',
    issuerOrOrg: 'Ministry of Education & AICTE',
    date: '2026-08',
    category: 'hackathon',
    rankOrPosition: '1st Place (National Winner)',
    badge: '🏆 1st Prize • ₹1,00,000',
    description: 'Led a 6-student engineering team developing an offline mesh emergency coordination system for disaster response zones. Selected #1 out of 1,800+ national finalist teams.',
    proofUrl: 'https://sih.gov.in',
    isVerified: true,
  },
  {
    id: 'ach_2',
    title: 'Global Rank 142 / 28,000 - LeetCode Biweekly Contest',
    issuerOrOrg: 'LeetCode',
    date: '2026-06',
    category: 'competition',
    rankOrPosition: 'Top 0.5% Worldwide (Knight Rating 2140+)',
    badge: '🥇 Top 0.5% Worldwide',
    description: 'Solved 4/4 algorithmic graph & dynamic programming problems in under 38 minutes. Maintained a 2100+ Knight competitive programming rating.',
    proofUrl: 'https://leetcode.com/devansh-codes',
    isVerified: true,
  },
  {
    id: 'ach_3',
    title: 'Global Finalist - Google Solution Challenge 2026',
    issuerOrOrg: 'Google Developer Student Clubs',
    date: '2026-04',
    category: 'competition',
    rankOrPosition: 'Top 10 Global Finalist',
    badge: '🏅 Top 10 Global Finalist',
    description: 'Engineered an accessible multimodal exam proctor and reader software for visually impaired university students using Gemini 2.5 and WebRTC.',
    proofUrl: 'https://developers.google.com/community/gdsc-solution-challenge',
    isVerified: true,
  },
  {
    id: 'ach_4',
    title: 'Open Source Maintainer - 500+ GitHub Stars',
    issuerOrOrg: 'GitHub Community',
    date: '2026-03',
    category: 'opensource',
    rankOrPosition: 'Core Creator & Maintainer',
    badge: '⭐ 500+ Stars',
    description: 'Created campus developer open-source utilities and real-time state synchronization libraries adopted by student developers across 14 universities.',
    proofUrl: 'https://github.com/devansh-codes',
    isVerified: true,
  },
];

interface ProfileSetupViewProps {
  initialUser: UserProfile;
  onSave: (updatedUser: UserProfile) => void;
  onNavigateHome: () => void;
}

export const ProfileSetupView: React.FC<ProfileSetupViewProps> = ({
  initialUser,
  onSave,
  onNavigateHome,
}) => {
  // Top-level Profile Mode: 'public' | 'certificates' | 'achievements' | 'private'
  const [profileTab, setProfileTab] = useState<'public' | 'certificates' | 'achievements' | 'private'>('public');

  // --- PUBLIC PROFILE STATE ---
  const [name, setName] = useState(initialUser.name || 'Devansh');
  const [college, setCollege] = useState(initialUser.college || '');
  const [collegeSuggestions, setCollegeSuggestions] = useState<string[]>([]);
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const [email] = useState(initialUser.email || 'devansh.sharma@college.edu');
  const [headline, setHeadline] = useState(initialUser.headline || 'Full-Stack Developer & AI Enthusiast | DTU CS 2025');
  const [bio, setBio] = useState(
    initialUser.bio ||
      'Building developer tools, participating in hackathons, and exploring high-performance distributed systems.'
  );
  const [avatar, setAvatar] = useState(
    initialUser.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );

  const [hobbies, setHobbies] = useState<string[]>(
    initialUser.hobbies.length > 0 ? initialUser.hobbies : ['Gaming', 'Designing']
  );
  const [domains, setDomains] = useState<string[]>(
    initialUser.domains.length > 0
      ? initialUser.domains
      : ['Web Development', 'AI / Machine Learning', 'Cybersecurity']
  );
  const [skills, setSkills] = useState<string[]>(
    initialUser.skills.length > 0
      ? initialUser.skills
      : ['Java', 'Data Structures & Algorithms', 'Spring Boot', 'MySQL', 'Git', 'HTML']
  );
  const [skillInput, setSkillInput] = useState('');

  // --- CERTIFICATES STATE ---
  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    if (initialUser.certificates && initialUser.certificates.length > 0) {
      return initialUser.certificates;
    }
    return DEFAULT_CERTIFICATES;
  });
  const [showCertModal, setShowCertModal] = useState(false);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certIssueDate, setCertIssueDate] = useState('2026-05');
  const [certExpiryDate, setCertExpiryDate] = useState('');
  const [certDoesNotExpire, setCertDoesNotExpire] = useState(true);
  const [certCategory, setCertCategory] = useState('Cloud Computing');
  const [certCredentialId, setCertCredentialId] = useState('');
  const [certUrl, setCertUrl] = useState('');
  const [certSearch, setCertSearch] = useState('');
  const [certCategoryFilter, setCertCategoryFilter] = useState('all');

  // --- ACHIEVEMENTS STATE ---
  const [achievements, setAchievements] = useState<AchievementItem[]>(() => {
    if (initialUser.achievements && initialUser.achievements.length > 0) {
      return initialUser.achievements;
    }
    return DEFAULT_ACHIEVEMENTS;
  });
  const [showAchModal, setShowAchModal] = useState(false);
  const [editingAchId, setEditingAchId] = useState<string | null>(null);
  const [achTitle, setAchTitle] = useState('');
  const [achIssuerOrOrg, setAchIssuerOrOrg] = useState('');
  const [achDate, setAchDate] = useState('2026-08');
  const [achCategory, setAchCategory] = useState<'hackathon' | 'competition' | 'academic' | 'opensource' | 'leadership' | 'other'>('hackathon');
  const [achRankOrPosition, setAchRankOrPosition] = useState('');
  const [achBadge, setAchBadge] = useState('');
  const [achDescription, setAchDescription] = useState('');
  const [achProofUrl, setAchProofUrl] = useState('');
  const [achSearch, setAchSearch] = useState('');
  const [achCategoryFilter, setAchCategoryFilter] = useState('all');

  // Inspection modal (credential or achievement verification modal)
  const [inspectModalItem, setInspectModalItem] = useState<{
    type: 'certificate' | 'achievement';
    item: CertificateItem | AchievementItem;
  } | null>(null);

  const [githubUsername, setGithubUsername] = useState(
    initialUser.githubUsername || 'devansh-codes'
  );
  const [isGithubConnected, setIsGithubConnected] = useState(
    !!initialUser.githubUsername
  );

  const [agreeTerms, setAgreeTerms] = useState(true);
  const [customDomainInput, setCustomDomainInput] = useState('');
  const [showCustomDomainModal, setShowCustomDomainModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // --- PRIVATE VAULT (RESUME KILLER) STATE ---
  const initialVault = initialUser.privateVault || {
    phone: '+91 98765 43210',
    personalEmail: 'devansh.career@gmail.com',
    careerTarget: 'Full-Stack Software Engineer & AI Systems Architect',
    resumeReplacementSlug: 'devansh-proof',
    accessLevel: 'recruiters_only',
    lastUpdated: 'Today',
    education: [
      {
        id: 'edu_1',
        institution: 'Delhi Technological University (DTU)',
        degree: 'Bachelor of Technology (B.Tech)',
        fieldOfStudy: 'Computer Science and Engineering',
        startYear: '2023',
        endYear: '2027',
        gradeOrCgpa: '8.95 / 10 CGPA',
        rollNumber: '2K23/CO/142',
        isCurrent: true,
        transcriptsUploaded: true,
      },
    ],
    projects: [
      {
        id: 'proj_1',
        title: 'Nexus Campus OS',
        description:
          'Distributed student microservices platform with real-time WebSocket campus alerts, peer matching algorithms, and automated team formation.',
        githubUrl: 'https://github.com/devansh-codes/nexus-campus-os',
        liveDemoUrl: 'https://nexus-campus-os.dev',
        techStack: ['React 19', 'TypeScript', 'Go', 'PostgreSQL', 'Docker'],
        stars: 142,
        forks: 28,
        featured: true,
        isProofVerified: true,
        architectureHighlights: 'Microservices architecture with 99.9% uptime and sub-50ms latency for peer sync.',
      },
      {
        id: 'proj_2',
        title: 'AI Proctor Gemini Engine',
        description:
          'Real-time multimodal proctoring system for competitive college exams using Gemini API and WebRTC vision analysis.',
        githubUrl: 'https://github.com/devansh-codes/ai-proctor-gemini',
        liveDemoUrl: 'https://ai-proctor.college.dev',
        techStack: ['Python', 'FastAPI', 'Gemini 2.5', 'WebRTC', 'TailwindCSS'],
        stars: 320,
        forks: 64,
        featured: true,
        isProofVerified: true,
        architectureHighlights: 'Zero-latency streaming with Gemini Flash multimodal video frame ingestion.',
      },
    ],
  };

  const [privatePhone, setPrivatePhone] = useState(initialVault.phone || '');
  const [personalEmail, setPersonalEmail] = useState(initialVault.personalEmail || '');
  const [careerTarget, setCareerTarget] = useState(initialVault.careerTarget || '');
  const [resumeSlug] = useState(initialVault.resumeReplacementSlug || 'devansh-proof');
  const [accessLevel, setAccessLevel] = useState<'private' | 'recruiters_only' | 'shareable_link'>(
    initialVault.accessLevel || 'recruiters_only'
  );
  const [educationList, setEducationList] = useState<EducationEntry[]>(initialVault.education);
  const [projectsList, setProjectsList] = useState<ProjectRepoEntry[]>(initialVault.projects);

  // Modals for Private Section
  const [showAddEduModal, setShowAddEduModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Education Form State
  const [eduInstitution, setEduInstitution] = useState('');
  const [eduDegree, setEduDegree] = useState('Bachelor of Technology (B.Tech)');
  const [eduField, setEduField] = useState('Computer Science and Engineering');
  const [eduStartYear, setEduStartYear] = useState('2023');
  const [eduEndYear, setEduEndYear] = useState('2027');
  const [eduGrade, setEduGrade] = useState('8.9 / 10 CGPA');
  const [eduRollNo, setEduRollNo] = useState('');
  const [eduTranscriptFile, setEduTranscriptFile] = useState<string | null>('college_marksheet_sem4.pdf');

  // New Project Form State
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projGithubUrl, setProjGithubUrl] = useState('');
  const [projLiveDemoUrl, setProjLiveDemoUrl] = useState('');
  const [projTechStack, setProjTechStack] = useState('React, TypeScript, Node.js, Docker');
  const [projHighlight, setProjHighlight] = useState('');
  const [projFeatured, setProjFeatured] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle hobby
  const toggleHobby = (hobby: string) => {
    if (hobbies.includes(hobby)) {
      setHobbies(hobbies.filter((h) => h !== hobby));
    } else {
      setHobbies([...hobbies, hobby]);
    }
  };

  // Toggle domain
  const toggleDomain = (domain: string) => {
    if (domains.includes(domain)) {
      setDomains(domains.filter((d) => d !== domain));
    } else {
      setDomains([...domains, domain]);
    }
  };

  // Add custom domain
  const handleAddCustomDomain = () => {
    if (customDomainInput.trim() && !domains.includes(customDomainInput.trim())) {
      setDomains([...domains, customDomainInput.trim()]);
      setCustomDomainInput('');
      setShowCustomDomainModal(false);
    }
  };

  // Add skill
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Open Add Certificate Modal
  const handleOpenAddCert = () => {
    setEditingCertId(null);
    setCertTitle('');
    setCertIssuer('');
    setCertIssueDate(new Date().toISOString().slice(0, 7));
    setCertExpiryDate('');
    setCertDoesNotExpire(true);
    setCertCategory('Cloud Computing');
    setCertCredentialId('');
    setCertUrl('');
    setShowCertModal(true);
  };

  // Open Edit Certificate Modal
  const handleOpenEditCert = (cert: CertificateItem) => {
    setEditingCertId(cert.id);
    setCertTitle(cert.title);
    setCertIssuer(cert.issuer);
    setCertIssueDate(cert.issueDate || '');
    setCertExpiryDate(cert.expiryDate || '');
    setCertDoesNotExpire(!cert.expiryDate);
    setCertCategory(cert.category || 'Cloud Computing');
    setCertCredentialId(cert.credentialId || '');
    setCertUrl(cert.url || '');
    setShowCertModal(true);
  };

  // Save Certificate
  const handleSaveCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle.trim() || !certIssuer.trim()) return;

    if (editingCertId) {
      setCertificates(
        certificates.map((c) =>
          c.id === editingCertId
            ? {
                ...c,
                title: certTitle.trim(),
                issuer: certIssuer.trim(),
                issueDate: certIssueDate || new Date().toISOString().slice(0, 7),
                expiryDate: certDoesNotExpire ? undefined : certExpiryDate || undefined,
                category: certCategory,
                credentialId: certCredentialId.trim() || undefined,
                url: certUrl.trim() || undefined,
              }
            : c
        )
      );
      triggerToast('Certificate updated successfully!');
    } else {
      const newCert: CertificateItem = {
        id: `cert_${Date.now()}`,
        title: certTitle.trim(),
        issuer: certIssuer.trim(),
        issueDate: certIssueDate || new Date().toISOString().slice(0, 7),
        expiryDate: certDoesNotExpire ? undefined : certExpiryDate || undefined,
        category: certCategory,
        credentialId: certCredentialId.trim() || `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
        url: certUrl.trim() || undefined,
        isVerified: true,
      };
      setCertificates([newCert, ...certificates]);
      triggerToast('Certificate added to profile & vault!');
    }

    setShowCertModal(false);
  };

  // Delete Certificate
  const handleDeleteCertificate = (id: string) => {
    setCertificates(certificates.filter((c) => c.id !== id));
    triggerToast('Certificate removed');
  };

  // Open Add Achievement Modal
  const handleOpenAddAch = () => {
    setEditingAchId(null);
    setAchTitle('');
    setAchIssuerOrOrg('');
    setAchDate(new Date().toISOString().slice(0, 7));
    setAchCategory('hackathon');
    setAchRankOrPosition('');
    setAchBadge('');
    setAchDescription('');
    setAchProofUrl('');
    setShowAchModal(true);
  };

  // Open Edit Achievement Modal
  const handleOpenEditAch = (ach: AchievementItem) => {
    setEditingAchId(ach.id);
    setAchTitle(ach.title);
    setAchIssuerOrOrg(ach.issuerOrOrg);
    setAchDate(ach.date);
    setAchCategory(ach.category);
    setAchRankOrPosition(ach.rankOrPosition || '');
    setAchBadge(ach.badge || '');
    setAchDescription(ach.description);
    setAchProofUrl(ach.proofUrl || '');
    setShowAchModal(true);
  };

  // Save Achievement
  const handleSaveAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achTitle.trim() || !achIssuerOrOrg.trim()) return;

    if (editingAchId) {
      setAchievements(
        achievements.map((a) =>
          a.id === editingAchId
            ? {
                ...a,
                title: achTitle.trim(),
                issuerOrOrg: achIssuerOrOrg.trim(),
                date: achDate,
                category: achCategory,
                rankOrPosition: achRankOrPosition.trim() || undefined,
                badge: achBadge.trim() || undefined,
                description: achDescription.trim(),
                proofUrl: achProofUrl.trim() || undefined,
              }
            : a
        )
      );
      triggerToast('Achievement updated successfully!');
    } else {
      const newAch: AchievementItem = {
        id: `ach_${Date.now()}`,
        title: achTitle.trim(),
        issuerOrOrg: achIssuerOrOrg.trim(),
        date: achDate || new Date().toISOString().slice(0, 7),
        category: achCategory,
        rankOrPosition: achRankOrPosition.trim() || (achCategory === 'hackathon' ? '1st Place' : 'Finalist'),
        badge: achBadge.trim() || (achCategory === 'hackathon' ? '🏆 Winner' : '🥇 Recognized'),
        description: achDescription.trim(),
        proofUrl: achProofUrl.trim() || undefined,
        isVerified: true,
      };
      setAchievements([newAch, ...achievements]);
      triggerToast('Achievement added to profile & vault!');
    }

    setShowAchModal(false);
  };

  // Delete Achievement
  const handleDeleteAchievement = (id: string) => {
    setAchievements(achievements.filter((a) => a.id !== id));
    triggerToast('Achievement removed');
  };

  // Open Verification / Inspection modal
  const handleOpenInspect = (type: 'certificate' | 'achievement', item: CertificateItem | AchievementItem) => {
    setInspectModalItem({ type, item });
  };

  // Connect GitHub
  const handleConnectGithub = () => {
    if (!githubUsername.trim()) {
      setErrorMessage('Please enter a valid GitHub username');
      return;
    }
    setIsGithubConnected(true);
    triggerToast('GitHub verified & linked!');
  };

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        triggerToast('Profile photo updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Education Entry
  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduInstitution.trim()) return;

    const newEdu: EducationEntry = {
      id: `edu_${Date.now()}`,
      institution: eduInstitution.trim(),
      degree: eduDegree.trim(),
      fieldOfStudy: eduField.trim(),
      startYear: eduStartYear.trim(),
      endYear: eduEndYear.trim(),
      gradeOrCgpa: eduGrade.trim(),
      rollNumber: eduRollNo.trim() || undefined,
      isCurrent: Number(eduEndYear) >= 2025,
      transcriptsUploaded: !!eduTranscriptFile,
    };

    setEducationList([newEdu, ...educationList]);
    setEduInstitution('');
    setEduRollNo('');
    setShowAddEduModal(false);
    triggerToast('🎓 College education added to private vault!');
  };

  // Delete Education Entry
  const handleDeleteEducation = (id: string) => {
    setEducationList(educationList.filter((e) => e.id !== id));
    triggerToast('Education entry removed');
  };

  // Add Project / Repo Entry
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projGithubUrl.trim()) return;

    const stackArray = projTechStack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newProj: ProjectRepoEntry = {
      id: `proj_${Date.now()}`,
      title: projTitle.trim(),
      description: projDesc.trim(),
      githubUrl: projGithubUrl.trim().startsWith('http')
        ? projGithubUrl.trim()
        : `https://github.com/${projGithubUrl.trim()}`,
      liveDemoUrl: projLiveDemoUrl.trim() || undefined,
      techStack: stackArray.length > 0 ? stackArray : ['TypeScript', 'Full-Stack'],
      stars: Math.floor(Math.random() * 45) + 12,
      forks: Math.floor(Math.random() * 10) + 2,
      featured: projFeatured,
      isProofVerified: true,
      architectureHighlights: projHighlight.trim() || undefined,
    };

    setProjectsList([newProj, ...projectsList]);
    setProjTitle('');
    setProjDesc('');
    setProjGithubUrl('');
    setProjLiveDemoUrl('');
    setProjHighlight('');
    setShowAddProjectModal(false);
    triggerToast('🚀 Project & GitHub repo linked to your Proof-of-Work!');
  };

  // Delete Project Entry
  const handleDeleteProject = (id: string) => {
    setProjectsList(projectsList.filter((p) => p.id !== id));
    triggerToast('Project removed');
  };

  // Copy Proof Link
  const handleCopyProofLink = () => {
    navigator.clipboard?.writeText(`https://collegeculture.me/proof/${resumeSlug}`);
    triggerToast('📋 Live Proof-of-Work link copied! Share with recruiters to replace resumes.');
  };

  // Handle Save
  const handleSaveAll = () => {
    if (!name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    setErrorMessage('');
    const updatedVault: PrivateVault = {
      phone: privatePhone,
      personalEmail: personalEmail || email,
      careerTarget: careerTarget,
      resumeReplacementSlug: resumeSlug,
      accessLevel: accessLevel,
      lastUpdated: 'Just now',
      education: educationList,
      projects: projectsList,
      certificates: certificates,
      achievements: achievements,
    };

    const updatedUser: UserProfile = {
      ...initialUser,
      name,
      college: college || 'Delhi Technological University (DTU)',
      avatar,
      headline,
      bio,
      hobbies,
      domains,
      skills,
      certificates,
      achievements,
      githubUsername: githubUsername.replace('https://github.com/', ''),
      isProfileComplete: true,
      termsAccepted: true,
      privateVault: updatedVault,
    };

    onSave(updatedUser);
    triggerToast('✅ Profile, Certificates & Achievements saved successfully!');
  };

  // Progress
  let progress = 30;
  if (name) progress += 10;
  if (college) progress += 10;
  if (domains.length > 0) progress += 10;
  if (skills.length > 0) progress += 10;
  if (certificates.length > 0) progress += 10;
  if (achievements.length > 0) progress += 10;
  if (educationList.length > 0) progress += 10;
  if (projectsList.length > 0) progress += 10;
  progress = Math.min(progress, 100);

  // Filtered Certificates
  const filteredCertificates = certificates.filter((c) => {
    const matchesSearch =
      !certSearch ||
      c.title.toLowerCase().includes(certSearch.toLowerCase()) ||
      c.issuer.toLowerCase().includes(certSearch.toLowerCase()) ||
      (c.credentialId && c.credentialId.toLowerCase().includes(certSearch.toLowerCase()));
    const matchesCat = certCategoryFilter === 'all' || c.category === certCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // Filtered Achievements
  const filteredAchievements = achievements.filter((a) => {
    const matchesSearch =
      !achSearch ||
      a.title.toLowerCase().includes(achSearch.toLowerCase()) ||
      a.issuerOrOrg.toLowerCase().includes(achSearch.toLowerCase()) ||
      (a.badge && a.badge.toLowerCase().includes(achSearch.toLowerCase())) ||
      (a.rankOrPosition && a.rankOrPosition.toLowerCase().includes(achSearch.toLowerCase()));
    const matchesCat = achCategoryFilter === 'all' || a.category === achCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto py-6 px-3 sm:px-6 lg:px-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Tab Switcher (Public Profile vs Private Career Vault) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>Profile & Portfolio</span>
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                {progress}% Complete
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your public campus presence and private verifiable proof-of-work that replaces resumes
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-wrap items-center p-1 bg-slate-100 rounded-2xl text-xs font-bold gap-1 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setProfileTab('public')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                profileTab === 'public'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Public Profile</span>
            </button>

            <button
              onClick={() => setProfileTab('certificates')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                profileTab === 'certificates'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Certificates</span>
              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-extrabold rounded-md">
                {certificates.length}
              </span>
            </button>

            <button
              onClick={() => setProfileTab('achievements')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                profileTab === 'achievements'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Achievements</span>
              <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-extrabold rounded-md">
                {achievements.length}
              </span>
            </button>

            <button
              onClick={() => setProfileTab('private')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                profileTab === 'private'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Private Vault</span>
              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-md">
                PRO
              </span>
            </button>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
          {errorMessage}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: PUBLIC CAMPUS PROFILE */}
      {/* ======================================================== */}
      {profileTab === 'public' && (
        <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-200">
          {/* Main Public Form */}
          <div className="flex-1 bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 space-y-7">
            {/* Row 1: Profile Photo + Name & College */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Profile Photo */}
              <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-3">
                <label className="text-xs font-bold text-slate-700 mb-2 self-start">
                  Profile Photo
                </label>
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-28 h-28 rounded-full bg-slate-100 border-2 border-slate-200/80 overflow-hidden flex items-center justify-center shadow-2xs">
                    {avatar ? (
                      <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-slate-400" />
                    )}
                  </div>
                  <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-colors">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                <span className="text-xs font-semibold text-slate-700 mt-3">Upload Photo</span>
                <span className="text-[11px] text-slate-400">JPG, PNG (Max 5MB)</span>
              </div>

              {/* Name & College Inputs */}
              <div className="md:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50/60 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* College / Institute */}
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      College / Institute <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <School className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={college}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCollege(val);
                          if (val.trim().length > 1) {
                            const filtered = POPULAR_COLLEGES.filter((c) =>
                              c.toLowerCase().includes(val.toLowerCase())
                            );
                            setCollegeSuggestions(filtered);
                            setShowCollegeDropdown(true);
                          } else {
                            setShowCollegeDropdown(false);
                          }
                        }}
                        onFocus={() => {
                          if (college.trim().length > 1) setShowCollegeDropdown(true);
                        }}
                        placeholder="e.g. DTU, IIT Bombay"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50/60 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {showCollegeDropdown && collegeSuggestions.length > 0 && (
                      <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                        {collegeSuggestions.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setCollege(item);
                              setShowCollegeDropdown(false);
                            }}
                            className="px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                          >
                            <School className="w-3.5 h-3.5 text-slate-400" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Headline */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Profile Headline
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Full-Stack Developer & AI Enthusiast | DTU CS 2025"
                    className="w-full px-3 py-2 bg-slate-50/60 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Bio & Interests
                  </label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell your college peers what you love building..."
                    className="w-full px-3 py-2 bg-slate-50/60 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Domains of Interest */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">Domains of Interest</label>
                <button
                  type="button"
                  onClick={() => setShowCustomDomainModal(true)}
                  className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  + Add Custom
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {DOMAINS_LIST.map((domain) => {
                  const isSelected = domains.includes(domain);
                  return (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => toggleDomain(domain)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {domain}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills & Badges */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Technical Skills</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="Type a skill and press Enter (e.g. Next.js, PyTorch, Go)..."
                  className="flex-1 px-3 py-2 bg-slate-50/60 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* ======================================================== */}
            {/* PUBLIC SECTION: CERTIFICATES & LICENSES */}
            {/* ======================================================== */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">Certificates & Licenses</h3>
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[11px] font-bold rounded-md">
                        {certificates.length}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Industry credentials & verified specializations
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setProfileTab('certificates')}
                    className="text-xs text-blue-600 font-bold hover:underline hidden sm:inline-block cursor-pointer"
                  >
                    View All &rarr;
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenAddCert}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certificate</span>
                  </button>
                </div>
              </div>

              {certificates.length === 0 ? (
                <div className="p-6 rounded-2xl border border-dashed border-slate-200 text-center space-y-2 bg-slate-50/50">
                  <Award className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-medium text-slate-600">No certificates added yet.</p>
                  <button
                    type="button"
                    onClick={handleOpenAddCert}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    + Add your first certification
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {certificates.slice(0, 4).map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white transition-all shadow-2xs space-y-2.5 relative group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                            <Award className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate" title={cert.title}>
                              {cert.title}
                            </h4>
                            <p className="text-[11px] text-slate-600 truncate">{cert.issuer}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenEditCert(cert)}
                            className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                            title="Edit Certificate"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCertificate(cert.id)}
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete Certificate"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 flex-wrap">
                        <span>Issued {cert.issueDate}</span>
                        {cert.expiryDate ? (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>Expires {cert.expiryDate}</span>
                          </>
                        ) : (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>No Expiry</span>
                          </>
                        )}
                        {cert.category && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-slate-700 font-medium">{cert.category}</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified Credential</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenInspect('certificate', cert)}
                            className="text-[11px] font-bold text-slate-600 hover:text-slate-900"
                          >
                            Inspect ID
                          </button>
                          {cert.url && (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <span>Verify</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {certificates.length > 4 && (
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setProfileTab('certificates')}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    View all {certificates.length} certificates & licenses &rarr;
                  </button>
                </div>
              )}
            </div>

            {/* ======================================================== */}
            {/* PUBLIC SECTION: ACHIEVEMENTS & HONORS */}
            {/* ======================================================== */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">Achievements & Honors</h3>
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[11px] font-bold rounded-md">
                        {achievements.length}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Hackathon prizes, coding ranks & campus distinction
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setProfileTab('achievements')}
                    className="text-xs text-indigo-600 font-bold hover:underline hidden sm:inline-block cursor-pointer"
                  >
                    View All &rarr;
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenAddAch}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Achievement</span>
                  </button>
                </div>
              </div>

              {achievements.length === 0 ? (
                <div className="p-6 rounded-2xl border border-dashed border-slate-200 text-center space-y-2 bg-slate-50/50">
                  <Trophy className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-medium text-slate-600">No achievements recorded yet.</p>
                  <button
                    type="button"
                    onClick={handleOpenAddAch}
                    className="text-xs text-indigo-600 font-bold hover:underline"
                  >
                    + Add your first hackathon or contest achievement
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {achievements.slice(0, 3).map((ach) => (
                    <div
                      key={ach.id}
                      className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white transition-all shadow-2xs space-y-2 relative group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            ach.category === 'hackathon'
                              ? 'bg-amber-100 text-amber-700'
                              : ach.category === 'competition'
                              ? 'bg-blue-100 text-blue-700'
                              : ach.category === 'opensource'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {ach.category === 'hackathon' ? (
                              <Trophy className="w-4 h-4" />
                            ) : ach.category === 'competition' ? (
                              <Medal className="w-4 h-4" />
                            ) : ach.category === 'opensource' ? (
                              <Star className="w-4 h-4" />
                            ) : (
                              <GraduationCap className="w-4 h-4" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                                {ach.title}
                              </h4>
                              {ach.badge && (
                                <span className="px-2 py-0.5 bg-slate-900 text-amber-300 text-[10px] font-extrabold rounded-md shrink-0">
                                  {ach.badge}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 flex-wrap">
                              <span className="font-semibold text-slate-700">{ach.issuerOrOrg}</span>
                              <span aria-hidden="true">·</span>
                              <span>{ach.date}</span>
                              {ach.rankOrPosition && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="text-indigo-600 font-bold">{ach.rankOrPosition}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenEditAch(ach)}
                            className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                            title="Edit Achievement"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteAchievement(ach.id)}
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete Achievement"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pl-12">
                        {ach.description}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60 pl-12">
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified Proof</span>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenInspect('achievement', ach)}
                            className="text-[11px] font-bold text-slate-600 hover:text-slate-900"
                          >
                            Details
                          </button>
                          {ach.proofUrl && (
                            <a
                              href={ach.proofUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1"
                            >
                              <span>View Proof</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {achievements.length > 3 && (
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setProfileTab('achievements')}
                    className="text-xs text-indigo-600 font-bold hover:underline"
                  >
                    View all {achievements.length} achievements & honors &rarr;
                  </button>
                </div>
              )}
            </div>

            {/* Save Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setProfileTab('private')}
                className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Next: Setup Private Career Vault &rarr;</span>
              </button>

              <button
                type="button"
                onClick={handleSaveAll}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Save Profile</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Preview Helper */}
          <div className="w-full lg:w-80 shrink-0 space-y-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-md space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-extrabold text-base">Campus Visibility</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Your public profile is visible to classmates, hackathon squads, and campus clubs. Keep your domains and skills up to date to get matched with team leaders.
              </p>
            </div>

            {/* Quick Credentials Summary Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 space-y-3">
              <h4 className="font-bold text-xs text-slate-900 flex items-center justify-between">
                <span>Verified Credentials</span>
                <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </h4>
              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => setProfileTab('certificates')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/70 flex items-center justify-between transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">Certificates</span>
                      <span className="text-[10px] text-slate-500">{certificates.length} verified credentials</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setProfileTab('achievements')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200/70 flex items-center justify-between transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-indigo-500" />
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">Achievements</span>
                      <span className="text-[10px] text-slate-500">{achievements.length} awards & honors</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 text-center space-y-2">
              <Lock className="w-6 h-6 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-xs text-slate-900">Looking for Internships?</h4>
              <p className="text-[11px] text-slate-500">
                Setup your <strong>Private Career Vault</strong> to link your live GitHub repos and college marks.
              </p>
              <button
                onClick={() => setProfileTab('private')}
                className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Open Private Vault &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: CERTIFICATES & LICENSES MANAGEMENT VIEW */}
      {/* ======================================================== */}
      {profileTab === 'certificates' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Hero Banner */}
          <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 rounded-3xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-white/20 text-white text-[10px] font-extrabold rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-300" />
                    <span>PROFESSIONAL ACCREDITATIONS</span>
                  </span>
                  <span className="text-xs text-amber-100">Industry & Academy Recognized</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Certificates & Licensures
                </h2>
                <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                  Manage your verified cloud certifications, university specializations, and developer certificates. Directly shareable with hiring partners and peers.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleOpenAddCert}
                  className="px-4 py-2.5 bg-white text-amber-900 hover:bg-amber-50 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Certificate</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-5 mt-5 border-t border-white/20 text-xs">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl">
                <span className="text-[11px] text-amber-200 block">Total Certifications</span>
                <span className="text-lg font-black text-white">{certificates.length}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl">
                <span className="text-[11px] text-amber-200 block">Verification Status</span>
                <span className="text-lg font-black text-white">100% Validated</span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-xs p-3 rounded-xl">
                <span className="text-[11px] text-amber-200 block">Issuing Bodies</span>
                <span className="text-lg font-black text-white">
                  {new Set(certificates.map((c) => c.issuer)).size} Providers
                </span>
              </div>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={certSearch}
                  onChange={(e) => setCertSearch(e.target.value)}
                  placeholder="Search certificates by title, issuer, credential ID..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              {/* Add Certificate Button */}
              <button
                type="button"
                onClick={handleOpenAddCert}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Certificate</span>
              </button>
            </div>

            {/* Category Segmented Controls */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'Cloud Computing', label: 'Cloud' },
                { id: 'Web Development', label: 'Web Development' },
                { id: 'AI / Machine Learning', label: 'AI & ML' },
                { id: 'Cybersecurity', label: 'Cybersecurity' },
                { id: 'Data Science', label: 'Data Science' },
              ].map((cat) => {
                const isActive = certCategoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCertCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Certificate Cards Grid */}
          {filteredCertificates.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-10 text-center space-y-3">
              <Award className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-sm text-slate-800">No certificates found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {certSearch || certCategoryFilter !== 'all'
                  ? 'No certificates matched your search filter. Try clearing filters.'
                  : 'You have not added any certifications yet. Add your certificates to boost your campus standing.'}
              </p>
              <button
                type="button"
                onClick={handleOpenAddCert}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Certificate</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xs p-5 transition-all space-y-4 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs font-black text-sm">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {cert.title}
                        </h4>
                        <p className="text-xs text-slate-600 font-medium mt-0.5">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenEditCert(cert)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Certificate"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCertificate(cert.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Certificate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Issue Date</span>
                      <span className="font-semibold text-slate-700">{cert.issueDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Validity</span>
                      <span className="font-semibold text-slate-700">
                        {cert.expiryDate ? `Expires ${cert.expiryDate}` : 'Does Not Expire'}
                      </span>
                    </div>
                    {cert.credentialId && (
                      <div className="col-span-2 pt-1 border-t border-slate-200/60 flex items-center justify-between">
                        <div className="truncate">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Credential ID</span>
                          <span className="font-mono text-[11px] text-slate-800">{cert.credentialId}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(cert.credentialId || '');
                            triggerToast('Credential ID copied!');
                          }}
                          className="p-1 text-slate-400 hover:text-slate-700 text-xs flex items-center gap-1"
                          title="Copy ID"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Verified Credential</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenInspect('certificate', cert)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer text-xs"
                      >
                        Inspect Details
                      </button>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors cursor-pointer text-xs flex items-center gap-1 shadow-2xs"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Save Reminder */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setProfileTab('public')}
              className="text-xs text-slate-600 font-bold hover:underline"
            >
              &larr; Back to Public Profile
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Certificates</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ACHIEVEMENTS & HONORS MANAGEMENT VIEW */}
      {/* ======================================================== */}
      {profileTab === 'achievements' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Hero Banner */}
          <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-white/20 text-white text-[10px] font-extrabold rounded-full flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-amber-300" />
                    <span>CAMPUS DISTINCTION & HACKATHONS</span>
                  </span>
                  <span className="text-xs text-indigo-200">Verifiable Honors & Awards</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Achievements & Honors
                </h2>
                <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
                  Showcase national hackathon victories, competitive programming rankings, open-source maintainer status, and academic honors.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleOpenAddAch}
                  className="px-4 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Achievement</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-white/20 text-xs">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl">
                <span className="text-[11px] text-indigo-200 block">Total Achievements</span>
                <span className="text-lg font-black text-white">{achievements.length}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl">
                <span className="text-[11px] text-indigo-200 block">Hackathon Wins</span>
                <span className="text-lg font-black text-white">
                  {achievements.filter((a) => a.category === 'hackathon').length}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl">
                <span className="text-[11px] text-indigo-200 block">Contest Rankings</span>
                <span className="text-lg font-black text-white">
                  {achievements.filter((a) => a.category === 'competition').length}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl">
                <span className="text-[11px] text-indigo-200 block">Open Source / Other</span>
                <span className="text-lg font-black text-white">
                  {achievements.filter((a) => a.category === 'opensource' || a.category === 'academic' || a.category === 'leadership').length}
                </span>
              </div>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={achSearch}
                  onChange={(e) => setAchSearch(e.target.value)}
                  placeholder="Search achievements by title, org, standing, prize..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              {/* Add Achievement Button */}
              <button
                type="button"
                onClick={handleOpenAddAch}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Achievement</span>
              </button>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {[
                { id: 'all', label: 'All Honors' },
                { id: 'hackathon', label: '🏆 Hackathons' },
                { id: 'competition', label: '🥇 Coding Contests' },
                { id: 'opensource', label: '⭐ Open Source' },
                { id: 'academic', label: '🎓 Academic' },
                { id: 'leadership', label: '👥 Leadership' },
              ].map((cat) => {
                const isActive = achCategoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setAchCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Achievement Cards */}
          {filteredAchievements.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-10 text-center space-y-3">
              <Trophy className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-sm text-slate-800">No achievements found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {achSearch || achCategoryFilter !== 'all'
                  ? 'No achievements matched your search filter. Try clearing filters.'
                  : 'Add your hackathon awards, contest rankings, and honors.'}
              </p>
              <button
                type="button"
                onClick={handleOpenAddAch}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Achievement</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAchievements.map((ach) => (
                <div
                  key={ach.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xs p-5 sm:p-6 transition-all space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                        ach.category === 'hackathon'
                          ? 'bg-amber-100 text-amber-700'
                          : ach.category === 'competition'
                          ? 'bg-blue-100 text-blue-700'
                          : ach.category === 'opensource'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {ach.category === 'hackathon' ? (
                          <Trophy className="w-5 h-5" />
                        ) : ach.category === 'competition' ? (
                          <Medal className="w-5 h-5" />
                        ) : ach.category === 'opensource' ? (
                          <Star className="w-5 h-5" />
                        ) : (
                          <GraduationCap className="w-5 h-5" />
                        )}
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                            {ach.title}
                          </h4>
                          {ach.badge && (
                            <span className="px-2.5 py-0.5 bg-slate-900 text-amber-300 text-[11px] font-extrabold rounded-md shadow-2xs">
                              {ach.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                          <span className="font-bold text-slate-800">{ach.issuerOrOrg}</span>
                          <span aria-hidden="true">·</span>
                          <span>{ach.date}</span>
                          {ach.rankOrPosition && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-indigo-600 font-extrabold">{ach.rankOrPosition}</span>
                            </>
                          )}
                          <span aria-hidden="true">·</span>
                          <span className="capitalize text-slate-600">{ach.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenEditAch(ach)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Achievement"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAchievement(ach.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Achievement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-0 sm:pl-14">
                    {ach.description}
                  </p>

                  {/* Actions & Proof */}
                  <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 gap-3 text-xs pl-0 sm:pl-14">
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Verified Achievement Record</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenInspect('achievement', ach)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer text-xs"
                      >
                        Inspect Proof Details
                      </button>
                      {ach.proofUrl && (
                        <a
                          href={ach.proofUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors cursor-pointer text-xs flex items-center gap-1 shadow-2xs"
                        >
                          <span>Open Public Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Save Action */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setProfileTab('public')}
              className="text-xs text-slate-600 font-bold hover:underline"
            >
              &larr; Back to Public Profile
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Achievements</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PRIVATE CAREER VAULT (RESUME KILLER & PROOF-OF-WORK) */}
      {/* ======================================================== */}
      {profileTab === 'private' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Hero Banner: Why this replaces traditional resume culture */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>PRIVATE CAREER VAULT • RESUME KILLER</span>
                  </span>
                  <span className="text-xs text-slate-400">Verifiable Student Proof-of-Work</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Replace Traditional 1-Page Resumes with Live Proof
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Traditional resumes get filtered out by broken ATS systems and cannot prove your actual coding abilities. Your CollegeCulture Proof-of-Work connects verified college credentials with live GitHub repositories and working deployments.
                </p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 shrink-0 space-y-3">
                <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                  Live Recruiter Share Link
                </span>
                <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>collegeculture.me/proof/{resumeSlug}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyProofLink}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Recruiter Link</span>
                  </button>
                  <button
                    onClick={() => triggerToast('Generating downloadable Proof-of-Work PDF Sheet...')}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors cursor-pointer"
                    title="Export Proof Sheet"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Access Control & Target Role Settings */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>Vault Privacy & Recruiter Direct Access</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Control who can inspect your verified transcripts, GPA, and private contact info.
                </p>
              </div>

              {/* Access Selector */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAccessLevel('recruiters_only')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    accessLevel === 'recruiters_only'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Recruiters Only
                </button>
                <button
                  type="button"
                  onClick={() => setAccessLevel('shareable_link')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    accessLevel === 'shareable_link'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Anyone with Link
                </button>
                <button
                  type="button"
                  onClick={() => setAccessLevel('private')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    accessLevel === 'private'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Locked (Only Me)
                </button>
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Private Phone (Recruiter Only)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={privatePhone}
                    onChange={(e) => setPrivatePhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Personal Hiring Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={personalEmail}
                    onChange={(e) => setPersonalEmail(e.target.value)}
                    placeholder="devansh.career@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Role / Domain
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={careerTarget}
                    onChange={(e) => setCareerTarget(e.target.value)}
                    placeholder="e.g. Full-Stack / AI Systems Architect"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 1: EDUCATION & COLLEGES DETAILS */}
          {/* ======================================================== */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Colleges & Academic Credentials
                  </h3>
                  <p className="text-xs text-slate-500">
                    Degrees, GPA/CGPA, university enrollment ID, and official semester marksheet uploads
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddEduModal(true)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add College / Degree</span>
              </button>
            </div>

            {/* Education List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educationList.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 bg-slate-50 hover:bg-white border border-slate-200/90 rounded-2xl transition-all shadow-2xs space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteEducation(edu.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1 transition-colors"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold shrink-0">
                      <School className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-slate-900">{edu.institution}</h4>
                        {edu.isCurrent && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-md">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-semibold">{edu.degree}</p>
                      <p className="text-[11px] text-slate-400">{edu.fieldOfStudy}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/70 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">CGPA / Grade</span>
                      <span className="font-black text-slate-800 text-xs">{edu.gradeOrCgpa}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Years</span>
                      <span className="font-semibold text-slate-700 text-xs">
                        {edu.startYear} - {edu.endYear}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Roll / Student ID</span>
                      <span className="font-mono text-slate-700 text-xs">
                        {edu.rollNumber || 'Verified ID'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Transcript Attached ✓</span>
                    </span>
                    <button
                      onClick={() => triggerToast('Viewing verified college marksheet...')}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      View Marksheet
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 2: VERIFIED PROJECTS & GITHUB REPOSITORIES */}
          {/* ======================================================== */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Verified Projects & GitHub Repositories
                  </h3>
                  <p className="text-xs text-slate-500">
                    Live proof-of-work: codebases, deployed URLs, system architecture notes, and stars
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddProjectModal(true)}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Upload / Link GitHub Repo</span>
              </button>
            </div>

            {/* Project Cards */}
            <div className="space-y-4">
              {projectsList.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 bg-slate-50 hover:bg-white border border-slate-200/90 rounded-2xl transition-all shadow-2xs space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(proj.id)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-1 transition-colors"
                    title="Remove Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pr-8">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-base text-slate-900">{proj.title}</h4>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Codebase Verified</span>
                        </span>
                        {proj.featured && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-md">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  {proj.architectureHighlights && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                        Architecture Highlight
                      </span>
                      <p className="text-slate-700 font-medium">{proj.architectureHighlights}</p>
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-[11px] font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions & Repo Links Row */}
                  <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-200/80 gap-3 text-xs">
                    <div className="flex items-center gap-4 text-slate-500">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 font-bold text-slate-800 hover:text-blue-600 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>View Repository</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>

                      {proj.liveDemoUrl && (
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                        >
                          <Globe className="w-4 h-4 text-emerald-600" />
                          <span>Live Deployed Demo</span>
                          <ExternalLink className="w-3 h-3 text-emerald-500" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{proj.stars || 12} stars</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-slate-400" />
                        <span>{proj.forks || 2} forks</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 3: VERIFIED INDUSTRY ACCREDITATIONS & CERTIFICATES */}
          {/* ======================================================== */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Verified Industry Certifications & Licensures
                  </h3>
                  <p className="text-xs text-slate-500">
                    Industry-accredited qualifications verified with AWS, Meta, Google, and Coursera
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenAddCert}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Certificate</span>
              </button>
            </div>

            {certificates.length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-slate-200 text-center space-y-2 bg-slate-50/50">
                <Award className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-600">No certifications linked to your recruiter proof sheet yet.</p>
                <button
                  type="button"
                  onClick={handleOpenAddCert}
                  className="text-xs text-amber-600 font-bold hover:underline"
                >
                  + Add certification
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 bg-slate-50 hover:bg-white border border-slate-200/90 rounded-2xl transition-all shadow-2xs space-y-2.5 relative group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                          <Award className="w-4 h-4 text-amber-700" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate" title={cert.title}>
                            {cert.title}
                          </h4>
                          <p className="text-xs text-slate-600">{cert.issuer}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenEditCert(cert)}
                          className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCertificate(cert.id)}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 flex-wrap">
                      <span>Issued: {cert.issueDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>ID: {cert.credentialId || 'Verified'}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>ATS Credential Validated</span>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenInspect('certificate', cert)}
                          className="text-xs text-slate-600 hover:text-slate-900 font-bold"
                        >
                          Inspect
                        </button>
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-amber-600 font-bold hover:underline flex items-center gap-1"
                          >
                            <span>Verify URL</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* SECTION 4: KEY HONORS & HACKATHON ACHIEVEMENTS */}
          {/* ======================================================== */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Verifiable Honors & Competitive Achievements
                  </h3>
                  <p className="text-xs text-slate-500">
                    High-signal proof for technical recruiters: hackathon wins, LeetCode ranks, and awards
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenAddAch}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Achievement</span>
              </button>
            </div>

            {achievements.length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-slate-200 text-center space-y-2 bg-slate-50/50">
                <Trophy className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-600">No achievements recorded in your private vault yet.</p>
                <button
                  type="button"
                  onClick={handleOpenAddAch}
                  className="text-xs text-indigo-600 font-bold hover:underline"
                >
                  + Add achievement
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-4 bg-slate-50 hover:bg-white border border-slate-200/90 rounded-2xl transition-all shadow-2xs space-y-2 relative group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                          ach.category === 'hackathon'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {ach.category === 'hackathon' ? (
                            <Trophy className="w-4 h-4 text-amber-600" />
                          ) : (
                            <Medal className="w-4 h-4 text-indigo-600" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                              {ach.title}
                            </h4>
                            {ach.badge && (
                              <span className="px-2 py-0.5 bg-slate-900 text-amber-300 text-[10px] font-extrabold rounded-md">
                                {ach.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600">
                            {ach.issuerOrOrg} · {ach.date} · {ach.rankOrPosition || 'Awardee'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenEditAch(ach)}
                          className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAchievement(ach.id)}
                          className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 pl-12 leading-relaxed">
                      {ach.description}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60 pl-12">
                      <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Included in Recruiter Share Link</span>
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenInspect('achievement', ach)}
                          className="text-xs text-slate-600 hover:text-slate-900 font-bold"
                        >
                          Inspect Proof
                        </button>
                        {ach.proofUrl && (
                          <a
                            href={ach.proofUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
                          >
                            <span>Live Proof</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-emerald-400 mb-3">
              Why Proof-of-Work Outperforms Outdated Resumes
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-red-400 font-bold block text-sm">❌ Outdated 1-Page Resume</span>
                <p className="text-slate-300">
                  Static claims, easily fabricated buzzwords, 70% tossed by automated ATS bots without human review.
                </p>
              </div>
              <div className="p-3.5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 space-y-1">
                <span className="text-emerald-400 font-bold block text-sm">
                  ✅ CollegeCulture Proof-of-Work
                </span>
                <p className="text-slate-200">
                  Live GitHub commits, working cloud deployments, verified college transcripts, and direct recruiter chat.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Save Action */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setProfileTab('public')}
              className="text-xs text-slate-600 font-bold hover:underline"
            >
              &larr; Back to Public Profile
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              className="px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save Career Vault Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: ADD COLLEGE / DEGREE */}
      {/* ======================================================== */}
      {showAddEduModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span>Add College / Education Credential</span>
              </h3>
              <button
                onClick={() => setShowAddEduModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddEducation} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  College / University Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={eduInstitution}
                  onChange={(e) => setEduInstitution(e.target.value)}
                  placeholder="e.g. Delhi Technological University, IIT Delhi"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Degree</label>
                  <input
                    type="text"
                    required
                    value={eduDegree}
                    onChange={(e) => setEduDegree(e.target.value)}
                    placeholder="e.g. B.Tech, M.Tech, BCA"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Major / Branch</label>
                  <input
                    type="text"
                    required
                    value={eduField}
                    onChange={(e) => setEduField(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Year</label>
                  <input
                    type="text"
                    required
                    value={eduStartYear}
                    onChange={(e) => setEduStartYear(e.target.value)}
                    placeholder="2023"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">End / Grad Year</label>
                  <input
                    type="text"
                    required
                    value={eduEndYear}
                    onChange={(e) => setEduEndYear(e.target.value)}
                    placeholder="2027"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">CGPA / Grade</label>
                  <input
                    type="text"
                    required
                    value={eduGrade}
                    onChange={(e) => setEduGrade(e.target.value)}
                    placeholder="8.9 / 10"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Roll / Enrollment Number
                </label>
                <input
                  type="text"
                  value={eduRollNo}
                  onChange={(e) => setEduRollNo(e.target.value)}
                  placeholder="e.g. 2K23/CO/142"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
                <span className="font-bold text-blue-900 block">
                  📄 Upload Marksheet / Student ID (Simulation)
                </span>
                <p className="text-[11px] text-blue-700">
                  Uploading transcripts adds a verified mark badge visible only to authorized recruiters.
                </p>
                <div className="pt-1 text-slate-600 font-mono text-[10px]">
                  Attached: {eduTranscriptFile}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEduModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Save Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: ADD / LINK GITHUB REPO PROJECT */}
      {/* ======================================================== */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Github className="w-5 h-5" />
                <span>Upload & Link GitHub Project</span>
              </h3>
              <button
                onClick={() => setShowAddProjectModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="e.g. Nexus Campus OS, AI Proctor Engine"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  GitHub Repository URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={projGithubUrl}
                  onChange={(e) => setProjGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/project-repo"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Live Deployed URL (Vercel, Render, AWS)
                </label>
                <input
                  type="text"
                  value={projLiveDemoUrl}
                  onChange={(e) => setProjLiveDemoUrl(e.target.value)}
                  placeholder="https://my-app.vercel.app"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  required
                  value={projTechStack}
                  onChange={(e) => setProjTechStack(e.target.value)}
                  placeholder="React 19, TypeScript, Node.js, Docker, PostgreSQL"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  placeholder="What problem does this project solve? Who is it for?"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  System Architecture / Key Technical Highlight
                </label>
                <input
                  type="text"
                  value={projHighlight}
                  onChange={(e) => setProjHighlight(e.target.value)}
                  placeholder="e.g. Sub-50ms WebSocket latency handling 10k concurrent student sockets"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="chkFeatured"
                  checked={projFeatured}
                  onChange={(e) => setProjFeatured(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="chkFeatured" className="font-semibold text-slate-700 cursor-pointer">
                  Feature this on top of my live Proof-of-Work portfolio
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Link Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: ADD / EDIT CERTIFICATE */}
      {/* ======================================================== */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>{editingCertId ? 'Edit Certificate' : 'Add New Certificate'}</span>
              </h3>
              <button
                onClick={() => setShowCertModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCertificate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Certificate Title / Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect, Meta Front-End Developer"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Issuing Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={certIssuer}
                    onChange={(e) => setCertIssuer(e.target.value)}
                    placeholder="e.g. Amazon Web Services, Meta, Coursera, Google"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Domain / Field</label>
                  <select
                    value={certCategory}
                    onChange={(e) => setCertCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Web Development">Web Development</option>
                    <option value="AI / Machine Learning">AI / Machine Learning</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Data Science">Data Science</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Issue Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={certIssueDate}
                    onChange={(e) => setCertIssueDate(e.target.value)}
                    placeholder="YYYY-MM (e.g. 2026-05)"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiration Date</label>
                  <input
                    type="text"
                    disabled={certDoesNotExpire}
                    value={certDoesNotExpire ? '' : certExpiryDate}
                    onChange={(e) => setCertExpiryDate(e.target.value)}
                    placeholder="YYYY-MM (e.g. 2029-05)"
                    className={`w-full px-3 py-2 border rounded-xl ${
                      certDoesNotExpire
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'border-slate-200 focus:ring-2 focus:ring-amber-500'
                    }`}
                  />
                  <div className="flex items-center gap-1.5 mt-1">
                    <input
                      type="checkbox"
                      id="chkNoExpiry"
                      checked={certDoesNotExpire}
                      onChange={(e) => setCertDoesNotExpire(e.target.checked)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <label htmlFor="chkNoExpiry" className="text-[11px] text-slate-600 cursor-pointer">
                      This credential does not expire
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Credential ID / Number</label>
                  <input
                    type="text"
                    value={certCredentialId}
                    onChange={(e) => setCertCredentialId(e.target.value)}
                    placeholder="e.g. AWS-7842910-CLD"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Credential URL</label>
                  <input
                    type="url"
                    value={certUrl}
                    onChange={(e) => setCertUrl(e.target.value)}
                    placeholder="https://aws.amazon.com/verification/..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Verified Credential Badge</span>
                </span>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Adding your certificate links it to both your Public Campus Profile and Private Career Vault. Recruiters can verify it with 1-click.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-colors cursor-pointer shadow-xs"
                >
                  {editingCertId ? 'Update Certificate' : 'Save Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: ADD / EDIT ACHIEVEMENT */}
      {/* ======================================================== */}
      {showAchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-indigo-600" />
                <span>{editingAchId ? 'Edit Achievement' : 'Add New Achievement & Honor'}</span>
              </h3>
              <button
                onClick={() => setShowAchModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAchievement} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Achievement / Award Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={achTitle}
                  onChange={(e) => setAchTitle(e.target.value)}
                  placeholder="e.g. 1st Place Winner - Smart India Hackathon (SIH) 2026"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Awarding Body / Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={achIssuerOrOrg}
                    onChange={(e) => setAchIssuerOrOrg(e.target.value)}
                    placeholder="e.g. Ministry of Education, Google DSC, LeetCode"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={achCategory}
                    onChange={(e) => setAchCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="hackathon">🏆 Hackathon</option>
                    <option value="competition">🥇 Coding Competition / Contest</option>
                    <option value="opensource">⭐ Open Source Recognition</option>
                    <option value="academic">🎓 Academic Honor / Scholar</option>
                    <option value="leadership">👥 Leadership / Club Award</option>
                    <option value="other">Other Distinction</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date Received</label>
                  <input
                    type="text"
                    required
                    value={achDate}
                    onChange={(e) => setAchDate(e.target.value)}
                    placeholder="YYYY-MM (e.g. 2026-08)"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rank / Standing</label>
                  <input
                    type="text"
                    value={achRankOrPosition}
                    onChange={(e) => setAchRankOrPosition(e.target.value)}
                    placeholder="e.g. 1st Place, Top 0.5%, Finalist"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Prize / Badge</label>
                  <input
                    type="text"
                    value={achBadge}
                    onChange={(e) => setAchBadge(e.target.value)}
                    placeholder="e.g. 🏆 ₹1,00,000 Prize, 🥇 Gold"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Description & Impact <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={achDescription}
                  onChange={(e) => setAchDescription(e.target.value)}
                  placeholder="Describe your achievement, the solution or system built, team size, and impact..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Verification / Proof Link (URL)
                </label>
                <input
                  type="url"
                  value={achProofUrl}
                  onChange={(e) => setAchProofUrl(e.target.value)}
                  placeholder="https://sih.gov.in or https://leetcode.com/username"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAchModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors cursor-pointer shadow-xs"
                >
                  {editingAchId ? 'Update Achievement' : 'Save Achievement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: INSPECT CREDENTIAL & PROOF VERIFICATION MODAL */}
      {/* ======================================================== */}
      {inspectModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                {inspectModalItem.type === 'certificate' ? (
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Trophy className="w-4 h-4" />
                  </div>
                )}
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {inspectModalItem.type === 'certificate' ? 'Credential Inspection' : 'Proof Verification'}
                </h3>
              </div>
              <button
                onClick={() => setInspectModalItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {inspectModalItem.type === 'certificate' ? 'Accreditation Title' : 'Award & Honor'}
                </span>
                <h4 className="text-sm font-black text-slate-900 leading-snug">
                  {inspectModalItem.item.title}
                </h4>
                <p className="text-xs text-slate-600 font-semibold">
                  {'issuer' in inspectModalItem.item ? inspectModalItem.item.issuer : inspectModalItem.item.issuerOrOrg}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold">Issue / Earned Date</span>
                  <span className="font-semibold text-slate-800">
                    {'issueDate' in inspectModalItem.item ? inspectModalItem.item.issueDate : inspectModalItem.item.date}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold">Verification Status</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Validated ✓</span>
                  </span>
                </div>
              </div>

              {'credentialId' in inspectModalItem.item && inspectModalItem.item.credentialId && (
                <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">Credential ID</span>
                    <span className="font-mono text-xs text-amber-400 font-bold">
                      {inspectModalItem.item.credentialId}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if ('credentialId' in inspectModalItem.item) {
                        navigator.clipboard?.writeText(inspectModalItem.item.credentialId || '');
                        triggerToast('Credential ID copied to clipboard!');
                      }
                    }}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors cursor-pointer"
                    title="Copy ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {'description' in inspectModalItem.item && inspectModalItem.item.description && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Details & Impact</span>
                  <p className="text-slate-700 leading-relaxed">{inspectModalItem.item.description}</p>
                </div>
              )}

              {('url' in inspectModalItem.item && inspectModalItem.item.url) ||
              ('proofUrl' in inspectModalItem.item && inspectModalItem.item.proofUrl) ? (
                <a
                  href={
                    'url' in inspectModalItem.item && inspectModalItem.item.url
                      ? inspectModalItem.item.url
                      : ('proofUrl' in inspectModalItem.item ? inspectModalItem.item.proofUrl : '#')
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Open Public Verification Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : null}

              <button
                type="button"
                onClick={() => setInspectModalItem(null)}
                className="w-full py-2 text-slate-600 hover:bg-slate-100 font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suggest Domain Modal */}
      {showCustomDomainModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl border border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 mb-2">Suggest Custom Domain</h3>
            <input
              type="text"
              value={customDomainInput}
              onChange={(e) => setCustomDomainInput(e.target.value)}
              placeholder="e.g. Quantum Computing, BioTech"
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowCustomDomainModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCustomDomain}
                className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              >
                Add Domain
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
