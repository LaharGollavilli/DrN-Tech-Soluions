import React, { useState, useRef } from 'react';
import { 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Building2, 
  Phone, 
  Mail, 
  User, 
  FileText, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Quote,
  MessageSquare,
  Copy,
  Check,
  FileUp,
  UploadCloud
} from 'lucide-react';
import { 
  formatCareerNotification, 
  triggerServerNotification, 
  ServerNotificationResult 
} from '../utils/notificationService';

interface CareersSectionProps {
  isDarkMode?: boolean;
  isStandaloneTab?: boolean;
  onBackToHome?: () => void;
}

interface JobOpening {
  id: string;
  title: string;
  department: string;
  experience: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export const CareersSection: React.FC<CareersSectionProps> = ({ 
  isDarkMode = false,
  isStandaloneTab = false,
  onBackToHome
}) => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [appliedJobTitle, setAppliedJobTitle] = useState<string>('');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [modalIsSubmitting, setModalIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);
  const [serverReceipt, setServerReceipt] = useState<ServerNotificationResult | null>(null);

  // Modal Form state
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateExp, setCandidateExp] = useState('Fresher (Civil / Arch)');
  const [isVizagResident, setIsVizagResident] = useState(true);
  const [candidateNotes, setCandidateNotes] = useState('');
  const [modalSelectedFile, setModalSelectedFile] = useState<File | null>(null);

  // Dedicated On-Page Direct Application Form state
  const [directJobRole, setDirectJobRole] = useState('BIM Intern – Civil & Architecture');
  const [directName, setDirectName] = useState('');
  const [directEmail, setDirectEmail] = useState('');
  const [directPhone, setDirectPhone] = useState('');
  const [directExp, setDirectExp] = useState('Fresher (Civil / Arch)');
  const [directVizagResident, setDirectVizagResident] = useState(true);
  const [directNotes, setDirectNotes] = useState('');
  const [directResumeFile, setDirectResumeFile] = useState<File | null>(null);
  const [directIsSubmitting, setDirectIsSubmitting] = useState(false);
  const [directSubmitted, setDirectSubmitted] = useState(false);
  const [directCopiedWhatsApp, setDirectCopiedWhatsApp] = useState(false);
  const [directServerReceipt, setDirectServerReceipt] = useState<ServerNotificationResult | null>(null);
  const directFileInputRef = useRef<HTMLInputElement>(null);

  const openings: JobOpening[] = [
    {
      id: 'bim-intern',
      title: 'BIM Intern – Civil & Architecture',
      department: 'Building Planning & BIM Modeling',
      experience: 'Freshers / Final Year Graduates',
      type: 'Full-Time Internship (With Full-Time Conversion Opportunity)',
      location: 'Visakhapatnam (Vizag) – On-Site',
      description: 'Ideal opportunity for enthusiastic Civil Engineering or Architecture diploma/degree graduates wanting to build a specialized career in Building Information Modeling (BIM) and AutoCAD drafting.',
      requirements: [
        'Diploma / B.Tech / B.E. in Civil Engineering or B.Arch',
        'Basic familiarity with AutoCAD 2D drafting and drawing interpretation',
        'Strong interest in learning Autodesk Revit (Architecture & Structure)',
        'Good spatial visualization skills and high attention to geometric accuracy',
        'Visakhapatnam (Vizag) local residents or nearby candidates preferred'
      ],
      benefits: [
        'Direct hands-on mentoring from senior BIM modelers',
        'Work on real commercial, residential, and industrial project models',
        'Intensive training in Autodesk Revit (LOD 100–350) and AutoCAD',
        'Monthly internship stipend with immediate evaluation for permanent roles'
      ]
    },
    {
      id: 'bim-modeler',
      title: 'BIM Modeler – Architecture & Structure',
      department: 'BIM Modeling & Shop Drawings',
      experience: '1 – 5 Years Hands-On Experience',
      type: 'Full-Time Permanent',
      location: 'Visakhapatnam (Vizag) – On-Site',
      description: 'Seeking dedicated BIM Modelers with 1 to 5 years of practical experience in Autodesk Revit (Architecture & Structure) and AutoCAD to author parametric models and extraction-ready shop drawings.',
      requirements: [
        'Degree or Diploma in Civil Engineering / Architecture',
        '1 to 5 years of hands-on experience in Autodesk Revit & AutoCAD',
        'Experience modeling architectural envelopes or structural RC & steel elements',
        'Ability to read and convert 2D architectural & structural drawings into 3D models',
        'Familiarity with sheet generation, dimensioning, schedules, and clash checks',
        'Visakhapatnam (Vizag) background candidates strongly preferred'
      ],
      benefits: [
        'Competitive salary based on experience and modeling skills',
        'Fast-paced, growth-oriented engineering work environment',
        'Exposure to multi-discipline coordination & Navisworks workflows',
        'Long-term career progression in a rising engineering firm'
      ]
    },
    {
      id: 'scan-to-cad-engineer',
      title: 'Scan-to-CAD & As-Built Drafting Specialist',
      department: 'Reality Capture & CAD Drafting',
      experience: '1 – 4 Years Experience',
      type: 'Full-Time Permanent',
      location: 'Visakhapatnam (Vizag) – On-Site',
      description: 'Specialist role processing 3D laser scan point clouds (.rcp/.e57) into layer-standardized 2D AutoCAD floor plans, elevations, sections, and structural as-built drawings.',
      requirements: [
        'Diploma / B.Tech Civil Engineering or Architecture',
        'Proficiency in AutoCAD 2D drafting and Autodesk ReCap Pro point cloud slice generation',
        'Familiarity with AIA / ISO layer naming conventions and tolerance verification',
        'Strong spatial understanding of building geometry and structural as-builts',
        'Visakhapatnam (Vizag) resident or nearby candidates preferred'
      ],
      benefits: [
        'Opportunity to work on landmark heritage and industrial retrofit projects',
        'Advanced training on reality capture point cloud workflows and 3D modeling',
        'Performance incentives and milestone bonuses',
        'Collaborative, high-tech engineering team environment'
      ]
    }
  ];

  const handleOpenApply = (jobTitle: string) => {
    setAppliedJobTitle(jobTitle);
    setShowApplyModal(true);
    setSubmitted(false);
    setCopiedWhatsApp(false);
    setServerReceipt(null);
    setModalSelectedFile(null);
  };

  const handleCopyWhatsApp = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 3500);
  };

  const handleModalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit. Please upload a smaller document.');
        e.target.value = '';
        setModalSelectedFile(null);
        return;
      }
      setModalSelectedFile(file);
    } else {
      setModalSelectedFile(null);
    }
  };

  const handleDirectFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit. Please upload a smaller document.');
        e.target.value = '';
        setDirectResumeFile(null);
        return;
      }
      setDirectResumeFile(file);
    } else {
      setDirectResumeFile(null);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !candidatePhone.trim()) {
      alert('Please fill in your name and contact phone number.');
      return;
    }

    setModalIsSubmitting(true);

    const payload = {
      jobTitle: appliedJobTitle || selectedJob?.title || 'BIM Modeler / Intern',
      candidateName: candidateName.trim(),
      candidateEmail: candidateEmail.trim(),
      candidatePhone: candidatePhone.trim(),
      candidateExp,
      isVizagResident,
      candidateNotes: candidateNotes.trim()
    };

    try {
      // 1. Primary Careers Key (Targeting careers@drntechsolutions.in & hr@drntechsolutions.in)
      const web3FormData = new FormData();
      web3FormData.append('access_key', '80c7507a-99b4-4183-a89b-53944dddaeb3');
      web3FormData.append('subject', `New Job Application: ${payload.jobTitle} - ${payload.candidateName}`);
      web3FormData.append('from_name', 'Dharani Tech Careers Portal');
      web3FormData.append('name', payload.candidateName);
      web3FormData.append('email', payload.candidateEmail || 'careers@drntechsolutions.in');
      web3FormData.append('phone', payload.candidatePhone);
      web3FormData.append('job_title', payload.jobTitle);
      web3FormData.append('experience', payload.candidateExp);
      web3FormData.append('vizag_resident', payload.isVizagResident ? 'Yes (Vizag Resident)' : 'No / Relocating');
      web3FormData.append('message', `[CAREER APPLICATION DETAILS]\nRole: ${payload.jobTitle}\nCandidate: ${payload.candidateName}\nPhone: ${payload.candidatePhone}\nEmail: ${payload.candidateEmail || 'careers@drntechsolutions.in'}\nExperience: ${payload.candidateExp}\nResident in Vizag: ${payload.isVizagResident ? 'Yes' : 'No'}\nNotes / Portfolio: ${payload.candidateNotes || 'None'}\n\nDeliver To: careers@drntechsolutions.in & hr@drntechsolutions.in`);
      web3FormData.append('notes', payload.candidateNotes || 'None');

      if (modalSelectedFile) {
        web3FormData.append('attachment', modalSelectedFile);
      }

      // 2. Verified Active Failover Dispatch (Forwarded to HR & Careers team)
      const backupFormData = new FormData();
      backupFormData.append('access_key', 'a9576476-752e-4557-bdf6-1f88189baa45');
      backupFormData.append('subject', `[CAREER APPLICATION -> HR & CAREERS DESK] ${payload.jobTitle} - ${payload.candidateName}`);
      backupFormData.append('from_name', 'Dharani Tech Careers');
      backupFormData.append('name', payload.candidateName);
      backupFormData.append('email', payload.candidateEmail || 'careers@drntechsolutions.in');
      backupFormData.append('phone', payload.candidatePhone);
      backupFormData.append('message', `[ATTN: HR & CAREERS TEAM - PLEASE FORWARD TO hr@drntechsolutions.in & careers@drntechsolutions.in]\nPosition: ${payload.jobTitle}\nApplicant: ${payload.candidateName}\nPhone: ${payload.candidatePhone}\nEmail: ${payload.candidateEmail || 'careers@drntechsolutions.in'}\nExperience: ${payload.candidateExp}\nVizag Resident: ${payload.isVizagResident ? 'Yes' : 'No'}\nCandidate Notes: ${payload.candidateNotes || 'None'}`);

      if (modalSelectedFile) {
        backupFormData.append('attachment', modalSelectedFile);
      }

      // Execute network dispatches concurrently and await completion before state transition
      const [, , receipt] = await Promise.all([
        fetch('https://api.web3forms.com/submit', { method: 'POST', body: web3FormData })
          .then(r => r.json().catch(() => ({ success: false })))
          .catch(err => { console.warn('Primary Web3Forms career error:', err); return { success: false }; }),
        fetch('https://api.web3forms.com/submit', { method: 'POST', body: backupFormData })
          .then(r => r.json().catch(() => ({ success: false })))
          .catch(err => { console.warn('Backup Web3Forms career error:', err); return { success: false }; }),
        triggerServerNotification('/api/notifications/career', payload)
      ]);

      setServerReceipt(receipt);
    } catch (err) {
      console.warn('Career submission network error:', err);
    } finally {
      setModalIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directName.trim() || !directPhone.trim()) {
      alert('Please fill in your name and contact phone number.');
      return;
    }

    setDirectIsSubmitting(true);

    const payload = {
      jobTitle: directJobRole,
      candidateName: directName.trim(),
      candidateEmail: directEmail.trim(),
      candidatePhone: directPhone.trim(),
      candidateExp: directExp,
      isVizagResident: directVizagResident,
      candidateNotes: directNotes.trim()
    };

    try {
      // 1. Primary Careers Key
      const web3FormData = new FormData();
      web3FormData.append('access_key', '80c7507a-99b4-4183-a89b-53944dddaeb3');
      web3FormData.append('subject', `[Direct Job Application] ${payload.jobTitle} - ${payload.candidateName}`);
      web3FormData.append('from_name', 'Dharani Tech Careers Portal');
      web3FormData.append('name', payload.candidateName);
      web3FormData.append('email', payload.candidateEmail || 'careers@drntechsolutions.in');
      web3FormData.append('phone', payload.candidatePhone);
      web3FormData.append('job_title', payload.jobTitle);
      web3FormData.append('experience', payload.candidateExp);
      web3FormData.append('vizag_resident', payload.isVizagResident ? 'Yes (Vizag Resident)' : 'No / Relocating');
      web3FormData.append('message', `[DIRECT CAREER APPLICATION]\nPosition: ${payload.jobTitle}\nCandidate: ${payload.candidateName}\nPhone: ${payload.candidatePhone}\nEmail: ${payload.candidateEmail || 'careers@drntechsolutions.in'}\nExperience: ${payload.candidateExp}\nVizag Resident: ${payload.isVizagResident ? 'Yes' : 'No'}\nCover Letter: ${payload.candidateNotes || 'None'}\n\nDeliver To: careers@drntechsolutions.in & hr@drntechsolutions.in`);
      web3FormData.append('notes', payload.candidateNotes || 'None');

      if (directResumeFile) {
        web3FormData.append('attachment', directResumeFile);
      }

      // 2. Verified Active Failover Key
      const backupFormData = new FormData();
      backupFormData.append('access_key', 'a9576476-752e-4557-bdf6-1f88189baa45');
      backupFormData.append('subject', `[CAREER APPLICATION -> HR & CAREERS DESK] ${payload.jobTitle} - ${payload.candidateName}`);
      backupFormData.append('from_name', 'Dharani Tech Careers');
      backupFormData.append('name', payload.candidateName);
      backupFormData.append('email', payload.candidateEmail || 'careers@drntechsolutions.in');
      backupFormData.append('phone', payload.candidatePhone);
      backupFormData.append('message', `[ATTN: HR & CAREERS TEAM - FORWARD TO hr@drntechsolutions.in & careers@drntechsolutions.in]\nPosition: ${payload.jobTitle}\nCandidate: ${payload.candidateName}\nPhone: ${payload.candidatePhone}\nEmail: ${payload.candidateEmail || 'careers@drntechsolutions.in'}\nExperience: ${payload.candidateExp}\nVizag Resident: ${payload.isVizagResident ? 'Yes' : 'No'}\nCover Letter: ${payload.candidateNotes || 'None'}`);

      if (directResumeFile) {
        backupFormData.append('attachment', directResumeFile);
      }

      // Await all network dispatches
      const [, , receipt] = await Promise.all([
        fetch('https://api.web3forms.com/submit', { method: 'POST', body: web3FormData })
          .then(r => r.json().catch(() => ({ success: false })))
          .catch(err => { console.warn('Primary Web3Forms direct career error:', err); return { success: false }; }),
        fetch('https://api.web3forms.com/submit', { method: 'POST', body: backupFormData })
          .then(r => r.json().catch(() => ({ success: false })))
          .catch(err => { console.warn('Backup Web3Forms direct career error:', err); return { success: false }; }),
        triggerServerNotification('/api/notifications/career', payload)
      ]);

      setDirectServerReceipt(receipt);
    } catch (err) {
      console.warn('Direct career submission error:', err);
    } finally {
      setDirectIsSubmitting(false);
      setDirectSubmitted(true);
    }
  };

  return (
    <section id="careers" className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Standalone Back Button (When accessed via Careers Tab) */}
      {isStandaloneTab && (
        <div className="mb-8 flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={onBackToHome}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400' 
                : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Website & Services</span>
          </button>

          <span className="text-xs font-mono text-slate-500">
            DHARANI CAREERS DESK • VISAKHAPATNAM
          </span>
        </div>
      )}

      {/* Header Container */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold mb-3 border ${
          isDarkMode 
            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
            : 'bg-sky-50 border-sky-200 text-sky-700'
        }`}>
          <Briefcase className="w-3.5 h-3.5" /> WE ARE HIRING IN VISAKHAPATNAM (VIZAG)
        </div>
        
        <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Build Your Career With Dharani Tech Solutions
        </h2>
        
        <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          We are expanding our virtual design, building planning, and BIM modeling team in Visakhapatnam. If you have a Civil Engineering or Architecture background and a passion for AutoCAD and Autodesk Revit, join our team!
        </p>

        {/* Local Vizag Highlight Badge */}
        <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border ${
          isDarkMode 
            ? 'bg-slate-900/90 border-slate-700 text-cyan-300' 
            : 'bg-sky-50/80 border-sky-200 text-sky-800'
        }`}>
          <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0" />
          <span>Civil Engineering background & Vizag local residents preferred for immediate on-site joining</span>
        </div>

        {/* Culture & Candidate Mindset Quote Card */}
        <div className={`mt-8 max-w-3xl mx-auto rounded-2xl border p-6 sm:p-7 relative overflow-hidden text-left shadow-xs transition-all ${
          isDarkMode 
            ? 'bg-gradient-to-br from-slate-900 via-[#0d1629] to-slate-900 border-cyan-500/30' 
            : 'bg-gradient-to-br from-sky-50/90 via-white to-sky-50/60 border-sky-200 shadow-sky-600/5'
        }`}>
          <Quote className={`absolute right-4 bottom-2 w-28 h-28 pointer-events-none opacity-5 ${
            isDarkMode ? 'text-cyan-400' : 'text-sky-600'
          }`} />

          <div className="flex items-start gap-4 relative z-10">
            <div className={`p-2.5 rounded-xl shrink-0 shadow-sm ${
              isDarkMode ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-sky-600 text-white'
            }`}>
              <Quote className="w-5 h-5" />
            </div>

            <div className="space-y-2">
              <span className={`text-[11px] font-mono font-bold tracking-wider uppercase block ${
                isDarkMode ? 'text-cyan-400' : 'text-sky-700'
              }`}>
                Culture & What We Look For In You
              </span>

              <blockquote className={`text-sm sm:text-base font-medium leading-relaxed italic ${
                isDarkMode ? 'text-slate-200' : 'text-slate-800'
              }`}>
                &ldquo;We are not just looking for candidates seeking a routine monthly salary. We are searching for curious problem solvers, passionate engineering minds, and builders who are deeply intrigued by 3D architectural modeling, structural coordination, and real-world construction precision. If you take genuine pride in solving complex modeling challenges and want to create impact with your craft &mdash; <strong className={isDarkMode ? 'text-cyan-300 not-italic' : 'text-sky-700 not-italic'}>let&rsquo;s build together</strong>.&rdquo;
              </blockquote>

              <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className={`font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  — Engineering Leadership, Dharani Tech Solutions
                </span>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-700 text-cyan-300' 
                    : 'bg-white border-slate-300 text-sky-800'
                }`}>
                  Problem Solvers Wanted • Vizag On-Site
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Openings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {openings.map((job) => (
          <div
            key={job.id}
            className={`rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md ${
              isDarkMode 
                ? 'bg-gradient-to-b from-slate-900/90 to-[#0c1220]/90 border-slate-800 hover:border-cyan-500/50' 
                : 'bg-white border-slate-200 hover:border-sky-300'
            }`}
          >
            <div>
              {/* Job Top Tags */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold border ${
                  isDarkMode 
                    ? 'bg-cyan-950 border-cyan-500/30 text-cyan-300' 
                    : 'bg-sky-100 border-sky-200 text-sky-800'
                }`}>
                  {job.department}
                </span>

                <span className={`flex items-center gap-1 text-xs font-mono ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>{job.experience}</span>
                </span>
              </div>

              {/* Title & Location */}
              <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {job.title}
              </h3>

              <div className={`flex items-center gap-1.5 mt-2 text-xs font-medium ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <MapPin className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                <span>{job.location}</span>
                <span className="mx-1">•</span>
                <span className="text-emerald-600 font-semibold">{job.type}</span>
              </div>

              <p className={`mt-4 text-xs sm:text-sm leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {job.description}
              </p>

              {/* Key Requirements */}
              <div className="mt-5">
                <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2.5 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Key Requirements:
                </h4>
                <ul className="space-y-2">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className={`flex items-start gap-2 text-xs leading-relaxed ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                        isDarkMode ? 'text-cyan-400' : 'text-sky-600'
                      }`} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  What We Offer:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {job.benefits.map((benefit, idx) => (
                    <div key={idx} className={`flex items-center gap-1.5 text-[11px] ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className={`text-[11px] font-mono ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Visakhapatnam (Vizag) Office
              </span>

              <button
                onClick={() => handleOpenApply(job.title)}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all shadow-sm shadow-sky-600/20 flex items-center gap-1.5 cursor-pointer hover:scale-102"
              >
                <span>Apply for Position</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================
          ON-PAGE DIRECT ONLINE JOB APPLICATION & RESUME SUBMISSION
          ============================================================ */}
      <div className={`mb-12 rounded-3xl border p-6 sm:p-10 shadow-lg relative overflow-hidden transition-all ${
        isDarkMode 
          ? 'bg-gradient-to-b from-slate-900 via-[#0e1628] to-slate-900 border-cyan-500/30 shadow-cyan-950/20' 
          : 'bg-gradient-to-b from-white via-sky-50/40 to-white border-sky-200/90 shadow-sky-600/5'
      }`}>
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header & Badges */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                isDarkMode 
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                  : 'bg-sky-50 border-sky-200 text-sky-700'
              }`}>
                <Sparkles className="w-3.5 h-3.5" /> DIRECT ONLINE APPLICATION
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Web3Forms Integrated • Direct HR Routing
              </span>
            </div>

            <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Apply for Open Career Roles & Submit Your Resume
            </h3>
            <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Submit your resume and candidate details directly to our technical modeling team in Visakhapatnam. Applications route immediately to{' '}
              <span className="font-semibold text-sky-600 dark:text-cyan-400">hr@drntechsolutions.in</span> &{' '}
              <span className="font-semibold text-sky-600 dark:text-cyan-400">careers@drntechsolutions.in</span>.
            </p>
          </div>

          {!directSubmitted ? (
            <form 
              action="https://api.web3forms.com/submit" 
              method="POST" 
              encType="multipart/form-data"
              onSubmit={handleDirectSubmit} 
              className="space-y-5"
            >
              {/* Web3Forms Hidden Routing Configuration */}
              <input type="hidden" name="access_key" value="80c7507a-99b4-4183-a89b-53944dddaeb3" />
              <input type="hidden" name="category" value="Job Role / Careers" />
              <input type="hidden" name="from_name" value="Dharani Tech Careers Portal" />
              <input type="hidden" name="subject" value={`New Job Application: ${directJobRole} - ${directName || 'Candidate'}`} />

              {/* Application Category / Position Applied For */}
              <div>
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  TARGET POSITION / ROLE *
                </label>
                <select
                  name="job_title"
                  value={directJobRole}
                  onChange={(e) => setDirectJobRole(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-colors focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-slate-800/90 border-slate-700 text-white focus:ring-cyan-500/40 focus:border-cyan-400' 
                      : 'bg-white border-slate-300 text-slate-900 focus:ring-sky-500/40 focus:border-sky-500 shadow-xs'
                  }`}
                >
                  <option value="BIM Intern – Civil & Architecture">BIM Intern – Civil & Architecture (Freshers / Final Year)</option>
                  <option value="BIM Modeler – Architecture & Structure">BIM Modeler – Architecture & Structure (1-5 Years)</option>
                  <option value="Scan-to-CAD & As-Built Drafting Specialist">Scan-to-CAD & As-Built Drafting Specialist (Point Cloud to CAD)</option>
                  <option value="AutoCAD 2D & 3D Drafting Specialist">AutoCAD 2D & 3D Drafting Specialist (Working Drawings / Plans)</option>
                  <option value="General BIM / Civil Engineering Application">General Application / Other Virtual Design Role</option>
                </select>
              </div>

              {/* Personal Details Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-1.5 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={directName}
                    onChange={(e) => setDirectName(e.target.value)}
                    placeholder="e.g. K. Rajesh"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${
                      isDarkMode 
                        ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-400 focus:ring-cyan-500/40 focus:border-cyan-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-sky-500/40 focus:border-sky-500 shadow-xs'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-1.5 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    Phone Number (WhatsApp Active) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={directPhone}
                    onChange={(e) => setDirectPhone(e.target.value)}
                    placeholder="+91 89858 29579"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${
                      isDarkMode 
                        ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-400 focus:ring-cyan-500/40 focus:border-cyan-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-sky-500/40 focus:border-sky-500 shadow-xs'
                    }`}
                  />
                </div>
              </div>

              {/* Email & Experience Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-1.5 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={directEmail}
                    onChange={(e) => setDirectEmail(e.target.value)}
                    placeholder="rajesh@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${
                      isDarkMode 
                        ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-400 focus:ring-cyan-500/40 focus:border-cyan-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-sky-500/40 focus:border-sky-500 shadow-xs'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-1.5 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    Experience Level
                  </label>
                  <select
                    name="experience"
                    value={directExp}
                    onChange={(e) => setDirectExp(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-700 text-white focus:ring-cyan-500/40 focus:border-cyan-400' 
                        : 'bg-white border-slate-300 text-slate-900 focus:ring-sky-500/40 focus:border-sky-500 shadow-xs'
                    }`}
                  >
                    <option value="Fresher (Civil / Arch)">Fresher (Civil Engineering / Arch / Diploma)</option>
                    <option value="1-2 Years Experience">1 to 2 Years Experience (AutoCAD / Revit)</option>
                    <option value="3-5 Years Experience">3 to 5 Years Experience (BIM Modeler / Drafter)</option>
                    <option value="5+ Years Experience">5+ Years Senior Modeling Experience</option>
                  </select>
                </div>
              </div>

              {/* Vizag Resident Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="direct-vizag-residence"
                  name="vizag_resident"
                  checked={directVizagResident}
                  onChange={(e) => setDirectVizagResident(e.target.checked)}
                  className="w-4 h-4 rounded accent-sky-600 cursor-pointer"
                />
                <label htmlFor="direct-vizag-residence" className={`text-xs cursor-pointer font-medium select-none ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  I currently reside in or around Visakhapatnam (Vizag) / available for immediate on-site joining
                </label>
              </div>

              {/* Upload Resume File Dropzone */}
              <div id="resume-upload-wrapper">
                <div className="flex items-center justify-between mb-1.5">
                  <label className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    Upload Resume *
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">
                    Accepts: .pdf, .doc, .docx (Max 10MB)
                  </span>
                </div>

                <div className={`p-4 sm:p-5 rounded-2xl border-2 border-dashed transition-all ${
                  isDarkMode 
                    ? directResumeFile ? 'border-cyan-500/60 bg-cyan-950/20' : 'border-slate-700 bg-slate-800/40 hover:border-slate-600' 
                    : directResumeFile ? 'border-sky-500/60 bg-sky-50/70' : 'border-slate-300 bg-slate-50/70 hover:border-slate-400'
                }`}>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto truncate">
                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        isDarkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-sky-100 text-sky-600'
                      }`}>
                        <FileUp className="w-5 h-5" />
                      </div>
                      <div className="truncate text-left">
                        {directResumeFile ? (
                          <>
                            <p className={`text-xs sm:text-sm font-bold truncate ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}>
                              {directResumeFile.name}
                            </p>
                            <p className="text-[11px] font-mono text-slate-400">
                              {(directResumeFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                            </p>
                          </>
                        ) : (
                          <>
                            <p className={`text-xs sm:text-sm font-medium ${
                              isDarkMode ? 'text-slate-300' : 'text-slate-700'
                            }`}>
                              Choose a PDF, DOC, or DOCX resume document
                            </p>
                            <p className="text-[11px] text-slate-400">
                              Standard formatting up to 10MB accepted
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                      {directResumeFile && (
                        <button
                          type="button"
                          onClick={() => {
                            setDirectResumeFile(null);
                            if (directFileInputRef.current) directFileInputRef.current.value = '';
                          }}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                            isDarkMode ? 'border-slate-700 text-slate-400 hover:text-white' : 'border-slate-300 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          Clear
                        </button>
                      )}
                      <label className="cursor-pointer px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors shadow-xs">
                        <span>{directResumeFile ? 'Change File' : 'Choose File'}</span>
                        <input
                          ref={directFileInputRef}
                          type="file"
                          name="attachment"
                          accept=".pdf,.doc,.docx"
                          required={!directResumeFile}
                          onChange={handleDirectFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message / Cover Letter / Software Proficiency */}
              <div>
                <label className={`block text-xs font-mono font-bold uppercase tracking-wider mb-1.5 ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  Message / Cover Letter / Software Experience *
                </label>
                <textarea
                  rows={3}
                  name="message"
                  required
                  value={directNotes}
                  onChange={(e) => setDirectNotes(e.target.value)}
                  placeholder="Briefly describe your modeling experience (AutoCAD / Revit / Scan-to-CAD / BIM), qualification, and current location..."
                  className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-400 focus:ring-cyan-500/40 focus:border-cyan-400' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-sky-500/40 focus:border-sky-500 shadow-xs'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={directIsSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-[0.99] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {directIsSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting Application to HR...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SUBMIT JOB APPLICATION & RESUME</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Success Confirmation State */
            /* Success Confirmation State */
            (() => {
              const directCareerNotification = formatCareerNotification({
                jobTitle: directJobRole,
                candidateName: directName || 'Candidate',
                candidateEmail: directEmail || 'careers@drntechsolutions.in',
                candidatePhone: directPhone || '',
                candidateExp: directExp,
                isVizagResident: directVizagResident,
                candidateNotes: directNotes
              });

              return (
                <div className={`p-8 rounded-2xl border text-center space-y-4 animate-in fade-in duration-300 ${
                  isDarkMode ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
                }`}>
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Application Submitted Successfully!
                  </h4>
                  <p className={`text-xs sm:text-sm max-w-lg mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Thank you for applying for <strong className="text-emerald-500">{directJobRole}</strong>. Your application details and resume have been transmitted directly to both departments:{' '}
                    <strong className="text-sky-600 dark:text-cyan-400">careers@drntechsolutions.in</strong> &{' '}
                    <strong className="text-sky-600 dark:text-cyan-400">hr@drntechsolutions.in</strong>.
                  </p>

                  {directServerReceipt && (
                    <div className={`p-3 rounded-xl text-[11px] font-mono max-w-md mx-auto border ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-emerald-200 text-slate-700'
                    }`}>
                      Server Dispatch Confirmation: {directServerReceipt.messageId} ({directServerReceipt.deliveredTo?.join(', ') || 'careers@drntechsolutions.in, hr@drntechsolutions.in'})
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    {/* Direct Email to Both HR & Careers */}
                    <a
                      href={directCareerNotification.mailtoUrl}
                      className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs"
                      title="Send application copy directly to careers@drntechsolutions.in and hr@drntechsolutions.in"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email HR & Careers</span>
                    </a>

                    {/* Copy to WhatsApp Button */}
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(directCareerNotification.messageText);
                        setDirectCopiedWhatsApp(true);
                        setTimeout(() => setDirectCopiedWhatsApp(false), 3500);
                      }}
                      className={`px-4 py-2 rounded-xl font-semibold text-xs inline-flex items-center gap-1.5 border transition-all cursor-pointer ${
                        directCopiedWhatsApp
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-300'
                          : isDarkMode
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-2xs'
                      }`}
                    >
                      {directCopiedWhatsApp ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{directCopiedWhatsApp ? 'Copied Details!' : 'Copy for WhatsApp'}</span>
                    </button>

                    <a
                      href={directCareerNotification.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs transition-all active:scale-[0.99]"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Chat on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setDirectSubmitted(false);
                        setDirectName('');
                        setDirectEmail('');
                        setDirectPhone('');
                        setDirectNotes('');
                        setDirectResumeFile(null);
                        setDirectServerReceipt(null);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        isDarkMode ? 'border-slate-700 text-slate-300 hover:text-white' : 'border-slate-300 text-slate-700 hover:bg-white'
                      }`}
                    >
                      Submit Another Application
                    </button>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </div>

      {/* Office Walk-In & Contact Bar */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        isDarkMode 
          ? 'bg-slate-900/70 border-slate-800' 
          : 'bg-white border-slate-200/90 shadow-xs'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-2">
            <span className={`text-xs font-mono uppercase font-bold tracking-wider ${
              isDarkMode ? 'text-cyan-400' : 'text-sky-600'
            }`}>
              DIRECT RECRUITMENT & WALK-IN INQUIRIES
            </span>
            <h3 className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Prefer to send your resume directly or visit our office?
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Email your CV and portfolio directly to{' '}
              <a href="mailto:careers@drntechsolutions.in" className="font-semibold text-sky-600 hover:underline">
                careers@drntechsolutions.in
              </a>{' '}
              &{' '}
              <a href="mailto:hr@drntechsolutions.in" className="font-semibold text-sky-600 hover:underline">
                hr@drntechsolutions.in
              </a>{' '}
              or bring your printed resume to our Visakhapatnam engineering office.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className={`flex items-center gap-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>Mobile: +91 8985829579</span>
              </div>
              <div className={`flex items-center gap-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>Landline: 0891-4630073</span>
              </div>
            </div>

            <div className={`flex items-start gap-1.5 text-xs pt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
              <span>
                Kurmannapalem, Duvvada Railway Station Road, Balaji Nagar, Road number-5, Pin code: 530046, Visakhapatnam, Andhra Pradesh
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              onClick={() => handleOpenApply('General Application / Walk-in')}
              className="w-full px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs text-center transition-all shadow-sm cursor-pointer"
            >
              Submit Express Application
            </button>
            <a
              href="mailto:careers@drntechsolutions.in,hr@drntechsolutions.in?subject=Application%20for%20BIM%20Role%20in%20Vizag"
              className={`w-full px-5 py-3 rounded-xl font-bold text-xs text-center border transition-all ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' 
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              Email Resume to Careers & HR
            </a>
          </div>
        </div>
      </div>

      {/* Express Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className={`relative w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-700 text-white shadow-cyan-950/50' 
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-300'
          }`}>
            <button
              onClick={() => setShowApplyModal(false)}
              className={`absolute top-5 right-5 p-2 rounded-lg transition-colors cursor-pointer ${
                isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form 
                action="https://api.web3forms.com/submit" 
                method="POST" 
                encType="multipart/form-data"
                onSubmit={handleApplySubmit} 
                className="space-y-4"
              >
                {/* Web3Forms Configuration */}
                <input type="hidden" name="access_key" value="80c7507a-99b4-4183-a89b-53944dddaeb3" />
                <input type="hidden" name="subject" value={`New Job Application: ${appliedJobTitle || 'BIM Role'} - ${candidateName || 'Applicant'}`} />
                <input type="hidden" name="from_name" value="Dharani Tech Careers Portal" />
                <input type="hidden" name="job_title" value={appliedJobTitle || selectedJob?.title || 'BIM Modeler / Intern'} />

                <div>
                  <span className={`text-xs font-mono uppercase tracking-wider font-bold ${
                    isDarkMode ? 'text-cyan-400' : 'text-sky-600'
                  }`}>
                    CAREER APPLICATION
                  </span>
                  <h3 className="text-xl font-bold mt-1">
                    Apply for: {appliedJobTitle}
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Visakhapatnam (Vizag) Engineering Office
                  </p>
                </div>

                <div>
                  <label className={`text-xs font-mono font-bold uppercase block mb-1.5 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. K. Rajesh"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${
                      isDarkMode 
                        ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-400 focus:ring-cyan-500/40 focus:border-cyan-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-sky-500/40 focus:border-sky-500'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`text-xs font-mono font-bold uppercase block mb-1.5 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={candidatePhone}
                      onChange={(e) => setCandidatePhone(e.target.value)}
                      placeholder="+91 89858 29579"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${
                        isDarkMode 
                          ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-400 focus:ring-cyan-500/40 focus:border-cyan-400' 
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-sky-500/40 focus:border-sky-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`text-xs font-mono font-bold uppercase block mb-1.5 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="rajesh@gmail.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${
                        isDarkMode 
                          ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-400 focus:ring-cyan-500/40 focus:border-cyan-400' 
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-sky-500/40 focus:border-sky-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`text-xs font-mono font-bold uppercase block mb-1.5 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Experience Level
                  </label>
                  <select
                    name="experience"
                    value={candidateExp}
                    onChange={(e) => setCandidateExp(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-700 text-white focus:ring-cyan-500/40 focus:border-cyan-400' 
                        : 'bg-white border-slate-300 text-slate-900 focus:ring-sky-500/40 focus:border-sky-500'
                    }`}
                  >
                    <option value="Fresher (Civil / Arch)" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                      Fresher (Civil Engineering / Arch / Diploma)
                    </option>
                    <option value="1-2 Years Experience" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                      1 to 2 Years Experience (AutoCAD / Revit)
                    </option>
                    <option value="3-5 Years Experience" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                      3 to 5 Years Experience (BIM Modeler / Drafter)
                    </option>
                    <option value="5+ Years Experience" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                      5+ Years Senior Modeling Experience
                    </option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="vizag-residence"
                    name="vizag_resident"
                    checked={isVizagResident}
                    onChange={(e) => setIsVizagResident(e.target.checked)}
                    className="w-4 h-4 rounded accent-sky-600 cursor-pointer"
                  />
                  <label htmlFor="vizag-residence" className={`text-xs cursor-pointer font-medium select-none ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    I currently reside in or around Visakhapatnam (Vizag)
                  </label>
                </div>

                {/* Resume Upload Field */}
                <div id="modal-resume-upload-field">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={`text-xs font-mono font-bold uppercase ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Upload Resume *
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">
                      .pdf, .doc, .docx (Max 10MB)
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border border-dashed flex items-center justify-between gap-3 ${
                    isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}>
                    <div className="flex items-center gap-2 text-xs truncate">
                      <FileUp className="w-4 h-4 text-sky-500 shrink-0" />
                      <span className="truncate">
                        {modalSelectedFile ? modalSelectedFile.name : 'Select your resume document...'}
                      </span>
                      {modalSelectedFile && (
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          ({(modalSelectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      )}
                    </div>
                    <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shrink-0 transition-colors">
                      <span>{modalSelectedFile ? 'Change' : 'Choose File'}</span>
                      <input
                        type="file"
                        name="attachment"
                        accept=".pdf,.doc,.docx"
                        onChange={handleModalFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className={`text-xs font-mono font-bold uppercase block mb-1.5 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Software Skills / Portfolio Link / Brief Note
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={candidateNotes}
                    onChange={(e) => setCandidateNotes(e.target.value)}
                    placeholder="Mention your AutoCAD, Revit proficiency, or Google Drive portfolio link..."
                    className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 ${
                      isDarkMode 
                        ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-400 focus:ring-cyan-500/40 focus:border-cyan-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-sky-500/40 focus:border-sky-500'
                    }`}
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                      isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={modalIsSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white font-bold text-xs transition-all shadow-sm cursor-pointer disabled:opacity-60 flex items-center gap-2"
                  >
                    {modalIsSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Application & Resume</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (() => {
              const careerNotification = formatCareerNotification({
                jobTitle: appliedJobTitle || selectedJob?.title || 'BIM Modeler / Intern',
                candidateName,
                candidateEmail,
                candidatePhone,
                candidateExp,
                isVizagResident,
                candidateNotes
              });

              return (
                <div className="text-center py-5 space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Application Successfully Logged!</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{candidateName}</strong>. Your profile for <strong>{appliedJobTitle}</strong> is ready for HR evaluation.
                  </p>

                  {/* Immediate WhatsApp & Email Notification Dispatch */}
                  <div className="p-4 rounded-xl border bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-teal-500/10 border-emerald-500/30 space-y-3">
                    <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>AUTOMATED NOTIFICATION ROUTED TO HR@DRNTECHSOLUTIONS.IN & CAREERS DESK</span>
                    </div>

                    {serverReceipt && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                        <span className="font-bold">✓ Server Delivery Confirmed</span>
                        <span className="opacity-70">|</span>
                        <span>Ref: {serverReceipt.messageId}</span>
                      </div>
                    )}

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                      An automated notification has been routed to <strong>hr@drntechsolutions.in</strong> and <strong>careers@drntechsolutions.in</strong>. You can also copy your candidate profile to WhatsApp or open chat directly with our hiring team at <strong>+91 8985829579</strong>:
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
                      {/* Direct WhatsApp Open (Primary) */}
                      <a
                        href={careerNotification.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                        title="Chat on WhatsApp with HR (+91 8985829579)"
                      >
                        <MessageSquare className="w-4 h-4 fill-current" />
                        <span>Open WhatsApp</span>
                      </a>

                      {/* Dedicated 'Copy to WhatsApp' Button */}
                      <button
                        type="button"
                        onClick={() => handleCopyWhatsApp(careerNotification.messageText)}
                        className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          copiedWhatsApp
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-300'
                            : isDarkMode
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-2xs'
                        }`}
                        title="Copy candidate profile to clipboard to paste in WhatsApp"
                      >
                        {copiedWhatsApp ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedWhatsApp ? 'Copied Details!' : 'Copy to WhatsApp'}</span>
                      </button>

                      {/* Direct Email to hr@drntechsolutions.in & careers@drntechsolutions.in */}
                      <a
                        href={careerNotification.mailtoUrl}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                        title="Send email to hr@drntechsolutions.in and careers@drntechsolutions.in"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email HR & Careers</span>
                      </a>
                    </div>

                    {copiedWhatsApp && (
                      <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 animate-in fade-in pt-1">
                        ✓ Candidate application details copied to clipboard! Ready to paste into WhatsApp (+91 8985829579).
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setShowApplyModal(false)}
                      className={`px-5 py-2 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer ${
                        isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};
