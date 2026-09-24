import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  MapPin,
  Calendar,
  Filter,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  ChevronDown,
  X,
  Bell,
  ArrowRight,
  Clock,
  Sparkles,
  Building2,
  Check,
  ChevronRight,
  ShieldCheck,
  Award,
  Layers,
  GraduationCap,
  CreditCard,
  Lock,
  FileCheck,
  Download,
} from 'lucide-react';
import { INTERNSHIPS_DATA } from '../mockData';
import { InternshipItem } from '../types';
import { TestFeePaymentModal } from '../components/TestFeePaymentModal';

export const InternshipsView: React.FC = () => {
  const [internships, setInternships] = useState<InternshipItem[]>(INTERNSHIPS_DATA);
  const [selectedInternship, setSelectedInternship] = useState<InternshipItem | null>(INTERNSHIPS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [activeFilterPill, setActiveFilterPill] = useState<string>('All');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['intern_infosys', 'intern_google']);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [activeDetailTab, setActiveDetailTab] = useState<'Overview' | 'Test & Selection' | 'Eligibility' | 'About Company'>('Overview');
  
  // Modals & toast states
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Paid test fees storage by internship ID
  const [paidTestFees, setPaidTestFees] = useState<
    Record<
      string,
      {
        transactionId: string;
        hallTicketNumber: string;
        amount: string;
        paidAt: string;
      }
    >
  >({});

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== id));
      triggerToast('Removed from saved bookmarks');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      triggerToast('Internship saved to bookmarks ★');
    }
  };

  const handleApply = (internship: InternshipItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedInternship(internship);
    setShowApplyModal(true);
  };

  const handleOpenPayment = (internship: InternshipItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedInternship(internship);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentData: {
    transactionId: string;
    hallTicketNumber: string;
    amount: string;
    paidAt: string;
  }) => {
    if (selectedInternship) {
      setPaidTestFees((prev) => ({
        ...prev,
        [selectedInternship.id]: paymentData,
      }));
      if (!appliedIds.includes(selectedInternship.id)) {
        setAppliedIds((prev) => [...prev, selectedInternship.id]);
      }
      triggerToast(
        `🎉 Test fee paid! Hall ticket generated: ${paymentData.hallTicketNumber}`
      );
    }
  };

  const confirmApplication = () => {
    if (selectedInternship && !appliedIds.includes(selectedInternship.id)) {
      setAppliedIds([...appliedIds, selectedInternship.id]);
      setShowApplyModal(false);
      triggerToast(`🎉 Application successfully submitted to ${selectedInternship.company}!`);
    }
  };

  // Filter logic
  const filteredInternships = internships.filter((item) => {
    if (activeFilterPill === 'Remote' && item.mode !== 'Remote') return false;
    if (activeFilterPill === 'In-office' && item.mode !== 'On-site') return false;
    if (activeFilterPill === 'Hybrid' && item.mode !== 'Hybrid') return false;
    if (activeFilterPill === 'Part-time' && item.type !== 'Part-time') return false;
    if (activeFilterPill === 'Full-time' && item.type !== 'Full-time') return false;

    if (selectedLocations.length > 0) {
      const matchLoc = selectedLocations.some((loc) =>
        item.location.toLowerCase().includes(loc.toLowerCase())
      );
      if (!matchLoc) return false;
    }

    if (locationQuery.trim()) {
      if (!item.location.toLowerCase().includes(locationQuery.toLowerCase())) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCompany = item.company.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchTags) return false;
    }

    return true;
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto py-5 px-3 sm:px-6 space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Matching Image 1 & 2 */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 shadow-2xs">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Internships
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Discover internships to gain real-world experience and kickstart your career.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <span>+ Post an Internship</span>
        </button>
      </div>

      {/* Search and Location Row */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Main Search Input */}
          <div className="relative md:col-span-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search internships (e.g. Web Development, Microsoft, Remote...)"
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Location Input */}
          <div className="relative md:col-span-4">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Location (City, State or Remote)"
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date Selector */}
          <div className="relative md:col-span-2">
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 cursor-pointer">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Date</span>
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1 text-xs">
          {['All', 'Remote', 'In-office', 'Hybrid', 'Paid', 'Part-time', 'Full-time'].map((pill) => (
            <button
              key={pill}
              onClick={() => setActiveFilterPill(pill)}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilterPill === pill
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {pill}
            </button>
          ))}

          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="px-3 py-1.5 bg-slate-100 rounded-full font-semibold flex items-center gap-1 cursor-pointer">
              <span>Experience Level</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </span>
            <span className="px-3 py-1.5 bg-slate-100 rounded-full font-semibold flex items-center gap-1 cursor-pointer">
              <span>Domain</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </span>
          </div>

          {(activeFilterPill !== 'All' || searchQuery || locationQuery) && (
            <button
              onClick={() => {
                setActiveFilterPill('All');
                setSearchQuery('');
                setLocationQuery('');
                setSelectedLocations([]);
              }}
              className="text-xs text-blue-600 font-bold ml-auto hover:underline cursor-pointer whitespace-nowrap"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Listings + Right Filter Sidebar / Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Internship Cards List (8 cols or 7 cols) */}
        <div className={`${selectedInternship ? 'lg:col-span-7' : 'lg:col-span-8'} space-y-4`}>
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Showing {filteredInternships.length} internships</span>
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
              <span>Sort by:</span>
              <span className="text-blue-600 font-bold">Latest</span>
              <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
            </div>
          </div>

          <div className="space-y-3.5">
            {filteredInternships.map((internship) => {
              const isSelected = selectedInternship?.id === internship.id;
              const isApplied = appliedIds.includes(internship.id);
              const isBookmarked = bookmarkedIds.includes(internship.id);

              return (
                <div
                  key={internship.id}
                  onClick={() => setSelectedInternship(internship)}
                  className={`bg-white rounded-3xl p-4 sm:p-5 border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                      : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5 min-w-0">
                      {/* Company Logo */}
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                        <img
                          src={internship.companyLogo}
                          alt={internship.company}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="min-w-0">
                        {internship.isFeatured && (
                          <span className="px-2 py-0.5 bg-purple-50 text-purple-700 font-bold text-[10px] rounded-md inline-flex items-center gap-1 mb-1">
                            ★ Featured
                          </span>
                        )}

                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors">
                          {internship.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <span className="font-bold text-slate-700">{internship.company}</span>
                          <span>•</span>
                          <span>{internship.location}</span>
                        </div>

                        {/* Skill Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {internship.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[11px] font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                          {internship.tags.length > 3 && (
                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px] font-bold">
                              +{internship.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bookmark Icon */}
                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(internship.id, e)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer shrink-0 ${
                        isBookmarked
                          ? 'bg-amber-50 text-amber-600'
                          : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* Test Centre / Fee Badge (if applicable like Infosys in Image 2) */}
                  {internship.testType && (
                    <div className="mt-3 p-2.5 bg-orange-50/70 border border-orange-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-orange-950 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-orange-600" />
                        <span>{internship.testType}</span>
                      </span>
                      <div className="flex items-center gap-3 text-orange-800 text-[11px] font-medium">
                        <span>Test Date: <strong>{internship.testDate}</strong></span>
                        {internship.testCentre && <span>Centre: <strong>{internship.testCentre}</strong></span>}
                      </div>
                    </div>
                  )}

                  {/* Bottom Line: Duration, Stipend, Eligibility, and Action */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{internship.duration}</span>
                      </span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {internship.stipend}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        <span>{internship.eligibility}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2.5">
                      <span className="text-[11px] text-slate-400">{internship.deadline}</span>

                      {isApplied ? (
                        <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-800 font-bold rounded-xl text-xs flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Applied</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleApply(internship, e)}
                          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detail Drawer (Image 2) OR Filter Sidebar (Image 1) */}
        <div className={`${selectedInternship ? 'lg:col-span-5' : 'lg:col-span-4'} space-y-4`}>
          {selectedInternship ? (
            /* RIGHT DETAIL DRAWER (Matching Image 2 Infosys card) */
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden sticky top-20">
              {/* Header Banner */}
              <div className="h-28 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 relative p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center">
                    <img
                      src={selectedInternship.companyLogo}
                      alt={selectedInternship.company}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">{selectedInternship.company}</h3>
                    <span className="px-2 py-0.5 bg-emerald-500/90 text-white font-bold text-[10px] rounded-full inline-flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" />
                      <span>Verified Company</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedInternship(null)}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Location */}
              <div className="p-4 sm:p-5 border-b border-slate-100">
                <h2 className="text-lg font-black text-slate-900">{selectedInternship.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedInternship.company} • {selectedInternship.location}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold rounded-lg">
                    {selectedInternship.mode}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold rounded-lg">
                    {selectedInternship.duration}
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg">
                    {selectedInternship.stipend}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[11px] rounded-lg">
                    {selectedInternship.postedTime}
                  </span>
                </div>
              </div>

              {/* Detail Tabs */}
              <div className="flex border-b border-slate-100 px-4 text-xs font-bold text-slate-500 gap-4">
                {(['Overview', 'Test & Selection', 'Eligibility', 'About Company'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDetailTab(tab)}
                    className={`py-3 transition-colors cursor-pointer ${
                      activeDetailTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600 font-extrabold'
                        : 'hover:text-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Drawer Body */}
              <div className="p-5 space-y-4 max-h-[50vh] overflow-y-auto text-xs text-slate-600">
                {activeDetailTab === 'Overview' && (
                  <>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Job Description</h4>
                      <p className="leading-relaxed text-slate-600">{selectedInternship.about}</p>
                    </div>

                    {selectedInternship.responsibilities && (
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1.5">Key Responsibilities</h4>
                        <ul className="list-disc pl-4 space-y-1 text-slate-600">
                          {selectedInternship.responsibilities.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedInternship.skillsRequired && (
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1.5">Skills Required</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedInternship.skillsRequired.map((s, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-slate-100 text-slate-800 rounded-md font-semibold text-[11px]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4 Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold">Stipend</span>
                        <span className="font-bold text-slate-900">{selectedInternship.stipend}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold">Duration</span>
                        <span className="font-bold text-slate-900">{selectedInternship.duration}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold">Location</span>
                        <span className="font-bold text-slate-900">{selectedInternship.location}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold">Openings</span>
                        <span className="font-bold text-slate-900">{selectedInternship.openings || 10}</span>
                      </div>
                    </div>

                    {/* Selection Process Stepper matching Image 2 */}
                    {selectedInternship.selectionProcess && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          <span>Selection Process</span>
                        </h4>

                        <div className="space-y-2.5">
                          {selectedInternship.selectionProcess.map((step) => {
                            const isPaid = paidTestFees[selectedInternship.id];
                            return (
                              <div key={step.step} className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                  {step.step}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <h5 className="font-bold text-slate-900">{step.title}</h5>
                                    {step.step === 2 && selectedInternship.registrationFee && (
                                      isPaid ? (
                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-md flex items-center gap-1">
                                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                          <span>Paid ✓</span>
                                        </span>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={(e) => handleOpenPayment(selectedInternship, e)}
                                          className="px-2.5 py-0.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] rounded-lg shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                                        >
                                          <CreditCard className="w-2.5 h-2.5" />
                                          <span>Pay Fee ({selectedInternship.registrationFee})</span>
                                        </button>
                                      )
                                    )}
                                  </div>
                                  <p className="text-[11px] text-slate-500">{step.description}</p>
                                  {step.details && (
                                    <p className="text-[10px] text-blue-600 font-semibold mt-0.5 bg-blue-50 p-1.5 rounded-lg">
                                      {step.details}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeDetailTab === 'Test & Selection' && (
                  <div className="space-y-3.5">
                    <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl">
                      <h4 className="font-bold text-blue-900">Aptitude & Technical Screening</h4>
                      <p className="text-xs text-blue-800 mt-1">
                        Candidates will take an online assessment followed by live technical coding rounds with senior mentors.
                      </p>
                    </div>

                    {selectedInternship.testCentre && (
                      <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <span className="text-slate-400 text-[10px] block font-semibold">Test Centre Location</span>
                          <span className="font-bold text-slate-800">{selectedInternship.testCentre}</span>
                        </div>
                        {selectedInternship.testDate && (
                          <div className="text-right">
                            <span className="text-slate-400 text-[10px] block font-semibold">Date & Time</span>
                            <span className="font-bold text-slate-800">{selectedInternship.testDate}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Dedicated Payment Section when people choose to pay test fee */}
                    {selectedInternship.registrationFee && (
                      <div className="space-y-2">
                        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                          <span>Assessment Test Fee Payment</span>
                        </h4>

                        {paidTestFees[selectedInternship.id] ? (
                          /* Test Fee Already Paid */
                          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Test Fee Paid ({paidTestFees[selectedInternship.id].amount})</span>
                              </span>
                              <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-200/50 px-2 py-0.5 rounded-md">
                                {paidTestFees[selectedInternship.id].hallTicketNumber}
                              </span>
                            </div>

                            <p className="text-xs text-emerald-800">
                              Your online assessment slot is confirmed. Please carry your Admit Card and college ID card to the test.
                            </p>

                            <div className="flex items-center justify-between pt-1 text-[11px] text-emerald-700">
                              <span>Txn: {paidTestFees[selectedInternship.id].transactionId}</span>
                              <button
                                type="button"
                                onClick={() => handleOpenPayment(selectedInternship)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <FileCheck className="w-3.5 h-3.5" />
                                <span>View Admit Card</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* Test Fee Unpaid - Payment Callout */
                          <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/90 rounded-2xl space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-2xs shrink-0">
                                  <Lock className="w-4 h-4" />
                                </div>
                                <div>
                                  <h5 className="font-extrabold text-xs text-slate-900">
                                    Online Aptitude Slot Reservation
                                  </h5>
                                  <p className="text-[11px] text-amber-800 font-medium">
                                    Covers proctored computer test center & candidate ranking
                                  </p>
                                </div>
                              </div>
                              <span className="text-base font-black text-amber-900">
                                {selectedInternship.registrationFee}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-600 bg-white/80 p-2.5 rounded-xl border border-amber-200/60">
                              <span>Status: <strong className="text-amber-700">Payment Pending</strong></span>
                              <span>Payment Modes: <strong className="text-slate-800">UPI, Card, NetBanking</strong></span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleOpenPayment(selectedInternship)}
                              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <CreditCard className="w-4 h-4" />
                              <span>Pay Test Fee ({selectedInternship.registrationFee}) & Book Slot</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeDetailTab === 'Eligibility' && (
                  <div className="space-y-2">
                    <p className="text-slate-700 font-medium">Eligible candidates should satisfy:</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      <li>Currently enrolled in B.Tech, BE, BCA, MCA, or relevant degree</li>
                      <li>Target batch: {selectedInternship.eligibility}</li>
                      <li>Minimum 6.5 CGPA or equivalent aggregate without active backlogs</li>
                      <li>Strong foundation in core computing algorithms and projects</li>
                    </ul>
                  </div>
                )}

                {activeDetailTab === 'About Company' && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900">About {selectedInternship.company}</h4>
                    <p className="leading-relaxed text-slate-600">
                      {selectedInternship.company} is a global leader in next-generation technology services, cloud platforms, and consulting.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Drawer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(selectedInternship.id, e)}
                  className="px-4 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  {bookmarkedIds.includes(selectedInternship.id) ? 'Saved ★' : 'Save for Later'}
                </button>

                <div className="flex items-center gap-2">
                  {/* If internship has test fee and unpaid, show Pay Fee button */}
                  {selectedInternship.registrationFee && !paidTestFees[selectedInternship.id] && (
                    <button
                      type="button"
                      onClick={(e) => handleOpenPayment(selectedInternship, e)}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Pay Fee ({selectedInternship.registrationFee})</span>
                    </button>
                  )}

                  {appliedIds.includes(selectedInternship.id) ? (
                    <span className="px-5 py-2.5 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Applied Successfully</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleApply(selectedInternship, e)}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Register & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* RIGHT FILTER SIDEBAR (Matching Image 1) */
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-blue-600" />
                    <span>Filter Internships</span>
                  </h3>
                  <button
                    onClick={() => setSelectedLocations([])}
                    className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {/* Location Filter Section */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Location</span>
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 pt-1">
                    {[
                      { name: 'Remote', count: 120 },
                      { name: 'Bengaluru, KA', count: 48 },
                      { name: 'Delhi, DL', count: 32 },
                      { name: 'Mumbai, MH', count: 28 },
                      { name: 'Hyderabad, TS', count: 26 },
                      { name: 'Indore, MP', count: 18 },
                    ].map((loc) => {
                      const isChecked = selectedLocations.includes(loc.name);
                      return (
                        <label
                          key={loc.name}
                          className="flex items-center justify-between cursor-pointer hover:text-slate-900"
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                if (isChecked) {
                                  setSelectedLocations(selectedLocations.filter((l) => l !== loc.name));
                                } else {
                                  setSelectedLocations([...selectedLocations, loc.name]);
                                }
                              }}
                              className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span>{loc.name}</span>
                          </span>
                          <span className="text-slate-400 text-[11px]">{loc.count}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Accordions for Domain, Stipend Range, etc. */}
                {['Domain', 'Stipend Range', 'Duration', 'Experience Level', 'Company Type', 'Application Status'].map(
                  (section) => (
                    <div
                      key={section}
                      className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 cursor-pointer hover:text-blue-600"
                    >
                      <span>{section}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  )
                )}
              </div>

              {/* Get Notified Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-5 border border-blue-200/80 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Get Notified</h4>
                    <p className="text-[11px] text-slate-500">
                      Be the first to know about new internships that match your interests.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => triggerToast('🔔 Notifications enabled for internship alerts!')}
                  className="w-full py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  Enable Notifications
                </button>
              </div>

              {/* Trending Companies Card */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Trending Companies</span>
                  </h4>
                  <button className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold text-slate-600">
                  {[
                    { name: 'Google', logo: 'https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png' },
                    { name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=100&auto=format&fit=crop&q=80' },
                    { name: 'Amazon', logo: 'https://images.unsplash.com/photo-1523474255658-4af61b168344?w=100&auto=format&fit=crop&q=80' },
                    { name: 'Flipkart', logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80' },
                    { name: 'Zomato', logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&auto=format&fit=crop&q=80' },
                  ].map((c) => (
                    <div
                      key={c.name}
                      onClick={() => setSearchQuery(c.name)}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 cursor-pointer transition-colors"
                    >
                      <img src={c.logo} alt={c.name} className="w-6 h-6 object-contain mx-auto mb-1" />
                      <span className="truncate block">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instant Apply Modal */}
      {showApplyModal && selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center">
                  <img
                    src={selectedInternship.companyLogo}
                    alt={selectedInternship.company}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Apply to {selectedInternship.company}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedInternship.title}</p>
                </div>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200/80 space-y-1">
                <p className="font-bold text-blue-900">1-Click Fast Track Application</p>
                <p className="text-[11px] text-blue-700">
                  Your CollegeCulture verified student profile, resume, GitHub, and college credentials will be submitted.
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Attached Resume</label>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Devansh_DTU_Resume_2026.pdf</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Auto-attached</span>
                </div>
              </div>

              {selectedInternship.registrationFee && (
                paidTestFees[selectedInternship.id] ? (
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-emerald-950 block">Assessment Fee Status</span>
                      <span className="text-[10px] text-emerald-700">
                        Paid ({paidTestFees[selectedInternship.id].amount}) • Hall Ticket: {paidTestFees[selectedInternship.id].hallTicketNumber}
                      </span>
                    </div>
                    <span className="px-2 py-1 bg-emerald-200 text-emerald-900 font-extrabold text-[10px] rounded-lg">
                      Fee Paid ✓
                    </span>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/90 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-amber-950 block">Aptitude Test Fee</span>
                      <span className="text-[10px] text-amber-700">
                        Required for test center slot & technical evaluation
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-amber-900 text-sm block">
                        {selectedInternship.registrationFee}
                      </span>
                      <span className="text-[9px] text-amber-700 font-semibold">Payment Required</span>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>

              {selectedInternship.registrationFee && !paidTestFees[selectedInternship.id] ? (
                <>
                  <button
                    type="button"
                    onClick={confirmApplication}
                    className="px-3.5 py-2 border border-blue-200 text-blue-700 text-xs font-bold rounded-xl hover:bg-blue-50 cursor-pointer"
                  >
                    Apply (Pay Later)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowApplyModal(false);
                      handleOpenPayment(selectedInternship);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay Test Fee ({selectedInternship.registrationFee}) & Apply</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={confirmApplication}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Confirm & Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Post an Internship Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">Post a Student Internship</h3>
              <button
                onClick={() => setShowPostModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Connect directly with verified students and tech talent from India’s top colleges.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowPostModal(false);
                triggerToast('🎉 Internship submitted for admin review!');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Infosys, Swiggy, Startup Lab"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Frontend Developer Intern"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stipend</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹25,000/month"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3-6 months"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Post Internship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Test Fee Payment Modal */}
      {showPaymentModal && selectedInternship && (
        <TestFeePaymentModal
          internship={selectedInternship}
          candidateName="Devansh Sharma"
          candidateCollege="Delhi Technological University (DTU)"
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
