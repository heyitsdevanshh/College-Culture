import React, { useState } from 'react';
import { UserProfile, HackathonTeam } from '../types';
import { TeamWorkspaceView } from './TeamWorkspaceView';
import { INITIAL_HACKATHON_TEAMS } from '../mockData';
import { MessageSquare, Phone, Video, Send, Users, Sparkles } from 'lucide-react';

interface MessagesViewProps {
  currentUser: UserProfile;
  teams?: HackathonTeam[];
  activeTeamId?: string;
  onSelectTeam?: (team: HackathonTeam) => void;
  onViewHackathon?: (hackathonId: string) => void;
  onOpenCreateTeam?: () => void;
}

interface DirectMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

interface DirectConversation {
  id: string;
  name: string;
  avatar: string;
  college: string;
  unread: number;
  lastMessage: string;
  time: string;
  messages: DirectMessage[];
}

const INITIAL_CONVERSATIONS: DirectConversation[] = [
  {
    id: 'conv_riya',
    name: 'Riya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    college: 'IIIT Delhi',
    unread: 1,
    lastMessage: 'Hey Devansh! Did you check out the team repo for Google Build with AI?',
    time: '10:24 AM',
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey Devansh! Just checked out the problem statement.', time: '10:14 AM' },
      { id: 'm2', sender: 'me', text: 'Awesome! Did the Gemini integration blueprint look good?', time: '10:18 AM' },
      { id: 'm3', sender: 'them', text: 'Hey Devansh! Did you check out the team repo for Google Build with AI?', time: '10:24 AM' },
    ],
  },
  {
    id: 'conv_arjun',
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    college: 'BITS Pilani',
    unread: 0,
    lastMessage: 'Pushed the Dockerfile and cloud deploy scripts.',
    time: '9:40 AM',
    messages: [
      { id: 'm4', sender: 'them', text: 'Pushed the Dockerfile and cloud deploy scripts.', time: '9:40 AM' },
    ],
  },
];

export const MessagesView: React.FC<MessagesViewProps> = ({
  currentUser,
  teams = INITIAL_HACKATHON_TEAMS,
  activeTeamId,
  onSelectTeam,
  onViewHackathon = () => {},
  onOpenCreateTeam = () => {},
}) => {
  const [selectedTeam, setSelectedTeam] = useState<HackathonTeam>(
    () => teams.find((t) => t.id === activeTeamId) || teams[0]
  );

  return (
    <TeamWorkspaceView
      currentTeam={selectedTeam}
      allTeams={teams}
      onSelectTeam={(t) => {
        setSelectedTeam(t);
        if (onSelectTeam) onSelectTeam(t);
      }}
      onViewHackathon={onViewHackathon}
      onOpenCreateTeam={onOpenCreateTeam}
    />
  );
};
