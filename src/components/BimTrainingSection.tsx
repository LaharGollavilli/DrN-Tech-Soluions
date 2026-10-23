import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Award, 
  BookOpen, 
  Users, 
  Briefcase, 
  Layers, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  FileCheck,
  Building,
  Hammer,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { RevitLogo, NavisworksLogo, AutoCadLogo, RecapLogo } from './SoftwareLogos';

interface BimTrainingSectionProps {
  isDarkMode: boolean;
}

export const BimTrainingSection: React.FC<BimTrainingSectionProps> = ({ isDarkMode }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    qualification: 'B.Tech Civil Engineering',
    preferredBatch: 'Weekend Batch (Working Pros & Final Years)',
    interestedTrack: 'Complete Revit & BIM Masterclass (Arch + Str + Navisworks)'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      qualification: 'B.Tech Civil Engineering',
      preferredBatch: 'Weekend Batch (Working Pros & Final Years)',
      interestedTrack: 'Complete Revit & BIM Masterclass (Arch + Str + Navisworks)'
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dharani Tech Solutions, I would like to register for the FREE Demo Class for Revit & BIM Training.\nName: ${formData.fullName || 'Student'}\nPhone: ${formData.phone || ''}\nQualification: ${formData.qualification}\nPreferred Batch: ${formData.preferredBatch}\nTrack: ${formData.interestedTrack}`
  );

  return (
    <section id="bim-training" className="pt-6 sm:pt-10 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header with Badge */}
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-semibold border ${
            isDarkMode 
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
            <span>PROFESSIONAL BIM ACADEMY</span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            ADMISSIONS OPEN • VIZAG
          </span>

          <span className={`text-xs font-mono px-2.5 py-0.5 rounded border hidden sm:inline-block ${
            isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
          }`}>
            OFFLINE STUDIO & HANDS-ON LAB
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Revit & BIM Training in Visakhapatnam
            </h2>
            <p className={`mt-2 text-base sm:text-lg font-medium ${
              isDarkMode ? 'text-cyan-400' : 'text-sky-700'
            }`}>
              Start Your Career in Architecture & Structural Engineering
            </p>
            <p className={`mt-2 text-xs sm:text-sm max-w-3xl leading-relaxed ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Designed specifically for <strong>Civil & Architecture Students (Diploma, B.Tech & B.E.)</strong> and <strong>working construction professionals</strong> looking to transition from 2D drafting to intelligent, industry-demanded 3D BIM modeling.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <a 
              href="#demo-register" 
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-cyan-500/20 transition-all hover:scale-102 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Register for FREE Demo Class</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 5 Core Highlights Grid (Directly from Dharani Tech Brochure) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-10">
        <div className={`p-4 rounded-2xl border transition-all hover:translate-y-[-2px] ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/40' : 'bg-white border-slate-200 hover:border-sky-300 shadow-xs'
        }`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
            isDarkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-sky-50 text-sky-700'
          }`}>
            <Award className="w-5 h-5" />
          </div>
          <h4 className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            100% Practical Training
          </h4>
          <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Practice on real-world live architectural & structural projects from our active engineering consultancy.
          </p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all hover:translate-y-[-2px] ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/40' : 'bg-white border-slate-200 hover:border-sky-300 shadow-xs'
        }`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
            isDarkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-700'
          }`}>
            <Users className="w-5 h-5" />
          </div>
          <h4 className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Industry Expert Trainers
          </h4>
          <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Trained directly by practicing BIM managers with hands-on client project experience and engineering standards.
          </p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all hover:translate-y-[-2px] ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/40' : 'bg-white border-slate-200 hover:border-sky-300 shadow-xs'
        }`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
            isDarkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-700'
          }`}>
            <Layers className="w-5 h-5" />
          </div>
          <h4 className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            2D to 3D BIM Modeling
          </h4>
          <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Master the step-by-step transition from traditional AutoCAD floorplans to parametric LOD 300+ Revit models.
          </p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all hover:translate-y-[-2px] ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/40' : 'bg-white border-slate-200 hover:border-sky-300 shadow-xs'
        }`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
            isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
          }`}>
            <Briefcase className="w-5 h-5" />
          </div>
          <h4 className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Placement Assistance
          </h4>
          <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Dedicated interview preparation, technical test drills, portfolio building, and placement referrals across AEC firms.
          </p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all hover:translate-y-[-2px] ${
          isDarkMode ? 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/40' : 'bg-white border-slate-200 hover:border-sky-300 shadow-xs'
        }`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
            isDarkMode ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-50 text-rose-700'
          }`}>
            <Clock className="w-5 h-5" />
          </div>
          <h4 className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Flexible Batches
          </h4>
          <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Offline studio batches: Weekday Morning & Evening batches for students, and Weekend Batches for working professionals.
          </p>
        </div>
      </div>

      {/* Main Content: Left Curriculum & Software Stack, Right Registration & Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Curriculum Tracks & Softwares Covered */}
        <div className="lg:col-span-7 space-y-6">
          {/* Target Audience Highlight Banner */}
          <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-sky-950/40 to-slate-900/60 border-sky-500/30' 
              : 'bg-gradient-to-r from-sky-50 to-blue-50/60 border-sky-200'
          }`}>
            <div className={`p-2 rounded-xl shrink-0 ${isDarkMode ? 'bg-sky-500/20 text-sky-300' : 'bg-sky-100 text-sky-800'}`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-sky-300' : 'text-sky-900'}`}>
                Who Can Apply?
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Exclusively for Civil & Architecture Students:</strong> Diploma, B.Tech & B.E. (Final Year & Graduates), along with <strong>Working Professionals in Construction & AEC</strong> seeking to elevate their modeling skillset.
              </p>
            </div>
          </div>

          {/* Core Modules Accordion / Cards (Directly matching brochure) */}
          <div className="space-y-3">
            <h3 className={`text-sm font-mono uppercase tracking-wider font-bold ${
              isDarkMode ? 'text-slate-200' : 'text-slate-800'
            }`}>
              Comprehensive Course Curriculum & Modules
            </h3>

            {/* Module 1 */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs sm:text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Complete BIM Workflow & Project Lifecycle
                    </h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      Lifecycle Overview
                    </span>
                  </div>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Understand the full journey from initial Architectural Concept, Schematic Modeling, Detailed Design Development, Construction Documentation, through to As-Built Handover.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Concept to Construction', 'BIM Execution Plan (BEP)', 'Common Data Environment (CDE)', 'IFC Formats'].map((tag, i) => (
                      <span key={i} className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isDarkMode ? 'bg-slate-800 text-cyan-300' : 'bg-sky-50 text-sky-800'
                      }`}>
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs sm:text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      BIM Forms & LOD Standards (LOD 100 to 400)
                    </h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      Standards & LOD
                    </span>
                  </div>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Master industry Level of Development specifications: LOD 100 (Conceptual Massing), LOD 200 (Approximate Geometry), LOD 300 (Specific Assemblies), and LOD 350/400 (Fabrication & Coordination Detailing).
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['LOD 100-400 Deep Dive', 'Geometric vs Non-Geometric Data', 'Model Integrity Checks', 'AEC Industry Standards'].map((tag, i) => (
                      <span key={i} className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isDarkMode ? 'bg-slate-800 text-cyan-300' : 'bg-sky-50 text-sky-800'
                      }`}>
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Module 3 */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs sm:text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Revit Architecture 3D Modeling & Parametric Families
                    </h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isDarkMode ? 'bg-slate-800 text-cyan-300 border-cyan-500/30' : 'bg-sky-50 text-sky-700 border-sky-200'
                    }`}>
                      Autodesk Revit
                    </span>
                  </div>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Comprehensive modeling of walls, curtain walls, doors, windows, multi-level stairs, roofs, floors, parametric custom family creation, annotations, view templates, and sheet generation.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Parametric Families', 'Floor Plans & Sections', 'Sheet Composition', 'Architectural BOQ & Schedules'].map((tag, i) => (
                      <span key={i} className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isDarkMode ? 'bg-slate-800 text-cyan-300' : 'bg-sky-50 text-sky-800'
                      }`}>
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Module 4 */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs sm:text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Revit Structure 3D Modeling & Rebar Detailing
                    </h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isDarkMode ? 'bg-slate-800 text-cyan-300 border-cyan-500/30' : 'bg-sky-50 text-sky-700 border-sky-200'
                    }`}>
                      Autodesk Revit
                    </span>
                  </div>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Structural framing modeling: isolated/combined footings, RC columns, beams, slabs, concrete rebar reinforcement detailing with standard hooks/bends, structural steel framing, and bar bending schedules (BBS).
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['RC Columns & Beams', 'Concrete Rebar Detailing', 'Bar Bending Schedules (BBS)', 'Structural Coordination'].map((tag, i) => (
                      <span key={i} className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isDarkMode ? 'bg-slate-800 text-cyan-300' : 'bg-sky-50 text-sky-800'
                      }`}>
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Module 5 */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  5
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs sm:text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Navisworks Clash Detection & BIM Coordination
                    </h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isDarkMode ? 'bg-slate-800 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      Navisworks Manage
                    </span>
                  </div>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Federate multi-disciplinary models, configure the Clash Detective matrix, execute hard & clearance clash tests, filter tolerances, assign issues, and export formal clash identification reports.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Federated Coordination', 'Clash Detective Matrix', 'Hard & Soft Clashes', 'HTML/PDF Clash Reports'].map((tag, i) => (
                      <span key={i} className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isDarkMode ? 'bg-slate-800 text-cyan-300' : 'bg-sky-50 text-sky-800'
                      }`}>
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Module 6: Scan-to-BIM & Point Cloud Reality Capture */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  6
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs sm:text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      Scan-to-BIM & Point Cloud to Revit Modeling
                    </h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isDarkMode ? 'bg-slate-800 text-fuchsia-400 border-fuchsia-500/30' : 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200'
                    }`}>
                      ReCap Pro & Revit
                    </span>
                  </div>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Master in-demand Reality Capture workflows: ingesting 3D laser scan datasets (.RCP, .RCS, .E57), noise cleanup and registration in Autodesk ReCap Pro, linking point clouds into Revit by Shared Coordinates, surface fitting, and authoring millimeter-accurate as-built architectural & structural models.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Autodesk ReCap Pro', 'Point Cloud Ingestion (.RCP/.RCS)', 'As-Built Revit Modeling', 'Deviation Analysis', 'Retrofit & Renovation BIM'].map((tag, i) => (
                      <span key={i} className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isDarkMode ? 'bg-slate-800 text-cyan-300' : 'bg-sky-50 text-sky-800'
                      }`}>
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Software Covered Official Badges */}
          <div className={`p-5 rounded-2xl border ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Official Softwares Trained Hands-on
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <RevitLogo className="w-9 h-9 shrink-0" />
                <div className="min-w-0">
                  <div className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Autodesk Revit
                  </div>
                  <span className={`text-[10px] font-mono block truncate ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`}>
                    Arch & Structure
                  </span>
                </div>
              </div>

              <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <NavisworksLogo className="w-9 h-9 shrink-0" />
                <div className="min-w-0">
                  <div className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Navisworks
                  </div>
                  <span className={`text-[10px] font-mono block truncate ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                    Clash & Coord
                  </span>
                </div>
              </div>

              <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <RecapLogo className="w-9 h-9 shrink-0" />
                <div className="min-w-0">
                  <div className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    ReCap Pro
                  </div>
                  <span className={`text-[10px] font-mono block truncate ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-700'}`}>
                    Scan-to-BIM
                  </span>
                </div>
              </div>

              <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <AutoCadLogo className="w-9 h-9 shrink-0" />
                <div className="min-w-0">
                  <div className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    AutoCAD
                  </div>
                  <span className={`text-[10px] font-mono block truncate ${isDarkMode ? 'text-rose-400' : 'text-rose-700'}`}>
                    2D Drafting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Free Demo Registration Form + Direct Academy Contact */}
        <div id="demo-register" className="lg:col-span-5 space-y-6">
          {/* Interactive Demo Registration Card */}
          <div className={`p-6 rounded-3xl border shadow-lg relative overflow-hidden ${
            isDarkMode 
              ? 'bg-[#0f172a] border-cyan-500/30 shadow-cyan-500/5' 
              : 'bg-white border-sky-200 shadow-sky-100'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400 text-slate-950">
                LIMITED SEATS
              </span>
              <span className={`text-xs font-mono font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-sky-700'}`}>
                WEEKDAY & WEEKEND BATCHES
              </span>
            </div>

            <h3 className={`text-xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Book a FREE Demo Class
            </h3>
            <p className={`text-xs mt-1 mb-5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Attend a live demonstration by our lead BIM modeler in Visakhapatnam. Understand the syllabus, live project exposure, and career pathway.
            </p>

            {formSubmitted ? (
              <div className="text-center py-6 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Demo Class Reserved!
                  </h4>
                  <p className={`text-xs mt-1 max-w-xs mx-auto leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Thank you, <strong>{formData.fullName}</strong>. Our lead modeling engineer will call you shortly at <strong>{formData.phone}</strong> to confirm your slot.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/918985829579?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Confirmation</span>
                  </a>

                  <button
                    onClick={resetForm}
                    className={`text-xs underline py-1 cursor-pointer ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Register another candidate
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs transition-colors outline-hidden ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-700 text-white focus:border-cyan-400' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-500'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 9876543210"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs transition-colors outline-hidden font-mono ${
                        isDarkMode 
                          ? 'bg-slate-900 border-slate-700 text-white focus:border-cyan-400' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs transition-colors outline-hidden ${
                        isDarkMode 
                          ? 'bg-slate-900 border-slate-700 text-white focus:border-cyan-400' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Current Qualification / Role
                  </label>
                  <select
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs transition-colors outline-hidden ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-700 text-white focus:border-cyan-400' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-500'
                    }`}
                  >
                    <option value="B.Tech Civil Engineering">B.Tech Civil Engineering (Final Year / Graduate)</option>
                    <option value="Diploma in Civil Engineering">Diploma in Civil Engineering</option>
                    <option value="B.Arch / Architecture Student">B.Arch / Architecture Student</option>
                    <option value="Working Site / Civil Engineer">Working Site / Civil Engineer (Upskilling)</option>
                    <option value="Draftsman / CAD Professional">Draftsman / CAD Professional (Transitioning to BIM)</option>
                    <option value="Other / Interested Candidate">Other / Interested Candidate</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Preferred Batch Timing
                  </label>
                  <select
                    value={formData.preferredBatch}
                    onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs transition-colors outline-hidden ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-700 text-white focus:border-cyan-400' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-500'
                    }`}
                  >
                    <option value="Weekend Batch (Working Pros & Final Years)">Weekend Batch (Saturday & Sunday - Working Pros)</option>
                    <option value="Weekday Morning Batch">Weekday Morning Batch (8:00 AM - 10:30 AM)</option>
                    <option value="Weekday Evening Batch">Weekday Evening Batch (6:00 PM - 8:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Interested Course Track
                  </label>
                  <select
                    value={formData.interestedTrack}
                    onChange={(e) => setFormData({ ...formData, interestedTrack: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs transition-colors outline-hidden ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-700 text-white focus:border-cyan-400' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-500'
                    }`}
                  >
                    <option value="Complete Revit & BIM Masterclass (Arch + Str + Navisworks)">
                      Complete Revit & BIM Masterclass (Arch + Str + Navisworks)
                    </option>
                    <option value="Revit Architecture Specialist (LOD 100-350)">
                      Revit Architecture Specialist (LOD 100-350)
                    </option>
                    <option value="Revit Structure & Rebar Detailing">
                      Revit Structure & Rebar Detailing
                    </option>
                    <option value="Navisworks Clash Detection & Coordination Masterclass">
                      Navisworks Clash Detection & Coordination Masterclass
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-101 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Reserve My Free Demo Seat</span>
                </button>
              </form>
            )}
          </div>

          {/* Official Academy Contact & Studio Location Box (Directly from Brochure) */}
          <div className={`p-5 rounded-2xl border ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Training Academy Desk & Location
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`} />
                <div className="leading-relaxed">
                  <div className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    Visakhapatnam Training Studio:
                  </div>
                  <div className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Kurmannapalem, Duvvada Railway Station Road, Balaji Nagar, Road number-5, Pin code: 530046, Visakhapatnam, A.P.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className={`w-4 h-4 shrink-0 ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`} />
                <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono">
                  <span>
                    Call: <a href="tel:8985829579" className="font-bold hover:underline text-sky-600 dark:text-cyan-400">+91 8985829579</a>
                  </span>
                  <span>
                    Landline: <a href="tel:08914630073" className="font-bold hover:underline">0891-4630073</a>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className={`w-4 h-4 shrink-0 ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`} />
                <a href="mailto:info@drntechsolutions.in" className="font-mono hover:underline text-sky-600 dark:text-cyan-400 font-semibold">
                  info@drntechsolutions.in
                </a>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Have quick questions about batches?
                </span>
                <a
                  href="https://wa.me/918985829579?text=Hello%20Dharani%20Tech%2C%20I%20have%20an%20inquiry%20regarding%20the%20Revit%20and%20BIM%20Training%20program."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
