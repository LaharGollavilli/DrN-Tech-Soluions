import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Mail, 
  User, 
  FileText, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Quote
} from 'lucide-react';

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
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateExp, setCandidateExp] = useState('Fresher (Civil / Arch)');
  const [isVizagResident, setIsVizagResident] = useState(true);
  const [candidateNotes, setCandidateNotes] = useState('');

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
    }
  ];

  const handleOpenApply = (jobTitle: string) => {
    setAppliedJobTitle(jobTitle);
    setShowApplyModal(true);
    setSubmitted(false);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidatePhone) {
      alert('Please fill in your name and phone number.');
      return;
    }
    setSubmitted(true);
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
              Email your CV and portfolio to{' '}
              <a href="mailto:careers@drntechsolutions.in" className="font-semibold text-sky-600 hover:underline">
                careers@drntechsolutions.in
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
              href="mailto:careers@drntechsolutions.in?subject=Application%20for%20BIM%20Role%20in%20Vizag"
              className={`w-full px-5 py-3 rounded-xl font-bold text-xs text-center border transition-all ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' 
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              Email Resume & Portfolio
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
              <form onSubmit={handleApplySubmit} className="space-y-4">
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

                <div>
                  <label className={`text-xs font-mono font-bold uppercase block mb-1.5 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Software Skills / Portfolio Link / Brief Note
                  </label>
                  <textarea
                    rows={2}
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
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold">Application Received!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{candidateName}</strong>. Our modeling team lead in Visakhapatnam will review your profile and contact you at <strong>{candidatePhone}</strong> for an interview or technical evaluation.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setShowApplyModal(false)}
                    className="px-5 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
