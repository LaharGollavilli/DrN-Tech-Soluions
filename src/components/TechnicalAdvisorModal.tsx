import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquareCode, 
  Send, 
  X, 
  Bot,
  Cpu,
  Layers, 
  Building2,
  HelpCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface TechnicalAdvisorModalProps {
  isDarkMode?: boolean;
}

const PRESET_QUERIES = [
  "Tell me about your Revit & BIM Training in Vizag",
  "How do you synchronize 2D CAD with Revit Coordinates?",
  "What parameters are embedded in LOD 350 families?",
  "How are Navisworks clash reports structured?"
];

const KNOWLEDGE_BASE: Record<string, string> = {
  "training": "Dharani Tech Solutions offers comprehensive REVIT & BIM TRAINING in Visakhapatnam for Civil & Architecture students (Diploma, B.Tech & B.E.) and working construction professionals. Features include: 100% Practical Training on live projects, Industry Expert Mentors, 2D CAD to 3D BIM transition, Placement Assistance & Interview Prep, and Flexible Batches (Weekday & Weekend). Contact our training desk at +91 8985829579 or email drntechsolutions09@gmail.com to register for a FREE demo class!",
  "coordinates": "We establish real-world project geodetic benchmarks in Autodesk Revit, locking the Survey Point and Project Base Point with true Northing/Easting coordinates and True North angle rotation. Linked AutoCAD DWG files are positioned via Shared Coordinates to eliminate rotation and level drift across structural and architectural models.",
  "parameters": "Our Revit families are enriched with UniFormat II and OmniClass Table 21 classifications, material fire/acoustic ratings, structural concrete grades (M25 to M40), rebar specifications (Fe500D), and dimensional parameters. This ensures direct bidirectional extraction into Bill of Quantities (BOQ).",
  "clash": "Using Autodesk Navisworks Manage, we execute multi-tier interference audits prioritizing trade gravity lines, HVAC ducts, structural concrete/steel frames, and cable trays. We filter false-positive insulation touchpoints and publish tracked BCF (BIM Collaboration Format) issue logs for weekly coordination reviews.",
  "bbs": "Yes! We model parametric 3D structural reinforcement down to individual bar mark shapes, hook bends, and lap lengths adhering to IS 456 / SP 34 / ACI 318 standards. Fabrication-ready Bar Bending Schedules (BBS) with total tonnage breakdowns are dynamically extracted directly from Revit.",
  "general": "Dharani Tech Solutions delivers virtual building planning, 3D architectural visualization, LOD 100–400 Revit BIM modeling, and professional Revit & BIM Training from our Visakhapatnam engineering office. How can our modeling engineers or trainers assist you?"
};

export const TechnicalAdvisorModal: React.FC<TechnicalAdvisorModalProps> = ({ 
  isDarkMode = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am the BIM Technical Assistant for Dharani Tech Solutions. I can explain our AutoCAD drafting workflows, Revit LOD 100–400 modeling, Navisworks clash audits, or Bar Bending Schedules (BBS). How can I assist you?",
      timestamp: 'Just now'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = KNOWLEDGE_BASE.general;

      if (lower.includes('training') || lower.includes('course') || lower.includes('demo') || lower.includes('class') || lower.includes('student') || lower.includes('learn')) {
        reply = KNOWLEDGE_BASE.training;
      } else if (lower.includes('coordinate') || lower.includes('north') || lower.includes('shared') || lower.includes('benchmark')) {
        reply = KNOWLEDGE_BASE.coordinates;
      } else if (lower.includes('parameter') || lower.includes('omniclass') || lower.includes('family') || lower.includes('metadata')) {
        reply = KNOWLEDGE_BASE.parameters;
      } else if (lower.includes('clash') || lower.includes('navisworks') || lower.includes('collision')) {
        reply = KNOWLEDGE_BASE.clash;
      } else if (lower.includes('bbs') || lower.includes('rebar') || lower.includes('bending') || lower.includes('reinforcement')) {
        reply = KNOWLEDGE_BASE.bbs;
      } else if (lower.includes('office') || lower.includes('vizag') || lower.includes('address') || lower.includes('contact') || lower.includes('phone')) {
        reply = "Our engineering desk & training studio is in Visakhapatnam (Vizag) at Kurmannapalem, Duvvada Railway Station Road, Balaji Nagar, Road number-5 (PIN: 530046). Direct Contact: Landline 0891-4630073, Mobile/WhatsApp +91 8985829579, Email: drntechsolutions09@gmail.com.";
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Sleek, Compact Floating Button - No repeated logo, short name, modern clean shape */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group px-3 py-2 sm:px-3.5 sm:py-2 rounded-full flex items-center gap-2 transition-all hover:scale-105 active:scale-95 border cursor-pointer shadow-lg ${
            isDarkMode 
              ? 'bg-slate-900 hover:bg-slate-800 text-white border-cyan-500/40 shadow-cyan-500/10' 
              : 'bg-white hover:bg-sky-50 text-slate-800 border-sky-300 shadow-sky-600/10'
          }`}
          title="Ask BIM Technical Assistant"
        >
          <MessageSquareCode className={`w-4 h-4 flex-shrink-0 ${
            isDarkMode ? 'text-cyan-400' : 'text-sky-600'
          }`} />
          <span className={`text-xs font-bold tracking-tight font-sans ${
            isDarkMode ? 'text-cyan-200' : 'text-sky-800'
          }`}>
            Ask BIM
          </span>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            isDarkMode ? 'bg-cyan-400' : 'bg-emerald-500'
          }`} />
        </button>
      </div>

      {/* Slide-in Chat Drawer / Modal - Adapts Color to Light / Dark Theme */}
      {isOpen && (
        <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md backdrop-blur-xl border-l shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 ${
          isDarkMode 
            ? 'bg-slate-900/95 border-cyan-500/30 text-white' 
            : 'bg-white/98 border-slate-200 text-slate-900'
        }`}>
          {/* Header - Clean Technical Symbol instead of repeated company logo */}
          <div className={`p-4 border-b flex items-center justify-between ${
            isDarkMode ? 'border-slate-800 bg-slate-950/70' : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center p-1.5 shadow-xs ${
                isDarkMode ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-400' : 'bg-sky-100 border-sky-200 text-sky-700'
              }`}>
                <Cpu className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className={`text-sm font-bold flex items-center gap-1.5 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <span>BIM Technical Desk</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                    isDarkMode 
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500/30' 
                      : 'bg-sky-50 text-sky-800 border-sky-200'
                  }`}>
                    AEC AI
                  </span>
                </h4>
                <p className={`text-[11px] font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Revit, AutoCAD & Navisworks Expert
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-none shadow-md'
                      : isDarkMode
                      ? 'bg-slate-950/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm'
                      : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className={`flex items-center gap-1.5 p-3 rounded-xl text-xs w-28 ${
                isDarkMode ? 'bg-slate-950 text-slate-400' : 'bg-slate-100 text-slate-500'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Prompts */}
          <div className={`p-3 border-t space-y-1.5 ${
            isDarkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`text-[10px] font-mono uppercase block ${
              isDarkMode ? 'text-slate-500' : 'text-slate-500'
            }`}>
              Technical Questions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_QUERIES.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] text-left transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-cyan-300' 
                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-sky-600'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className={`p-3.5 border-t ${
            isDarkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
          }`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Revit, coordinates, BBS, or Navisworks..."
                className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-800 text-white focus:border-cyan-400' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-500'
                }`}
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2 px-1">
              <span>Digital Virtual BIM Support</span>
              <span>Visakhapatnam, AP</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
