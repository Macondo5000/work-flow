import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ArrowRight, Building2, User, ChevronLeft, CheckCircle2, Clock, Plus } from 'lucide-react';
import { SOP_TEMPLATES } from './ui-elements';

interface SOPSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMPANY_SOPS = SOP_TEMPLATES.slice(0, 3);
const PERSONAL_SOPS = SOP_TEMPLATES.slice(3);

const MOCK_STEPS = [
  { id: 1, title: 'Preliminary Assessment', duration: '15m', description: 'Review initial requirements and scope of the request.' },
  { id: 2, title: 'Resource Allocation', duration: '30m', description: 'Assign necessary personnel and tools for execution.' },
  { id: 3, title: 'Execution Phase 1', duration: '1h', description: 'Begin implementation of core components.' },
  { id: 4, title: 'Quality Verification', duration: '20m', description: 'Perform standard checks against enterprise benchmarks.' },
  { id: 5, title: 'Final Documentation', duration: '15m', description: 'Record outcomes and update version history.' },
];

export const SOPSelector = ({ isOpen, onClose }: SOPSelectorProps) => {
  const [activeTab, setActiveTab] = useState<'company' | 'personal'>('company');
  const [selectedSop, setSelectedSop] = useState<typeof SOP_TEMPLATES[0] | null>(null);

  const currentSops = activeTab === 'company' ? COMPANY_SOPS : PERSONAL_SOPS;

  // Reset to default state when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab('company');
      setSelectedSop(null);
    }
  }, [isOpen]);

  const handleClose = () => {
    setSelectedSop(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed inset-x-0 bottom-0 top-12 bg-white z-50 overflow-hidden flex flex-col rounded-t-3xl shadow-[0_-20px_80px_rgba(0,0,0,0.1)]"
          >
            {!selectedSop ? (
              <>
                <div className="flex items-center justify-between p-8">
                  <h3 className="text-[18px] font-bold tracking-tight">SOP Library</h3>
                  <button onClick={handleClose} className="p-3 rounded-xl active:bg-gray-100 transition-all">
                    <X className="w-5 h-5 text-black" />
                  </button>
                </div>

                <div className="px-8 flex gap-8 border-b border-gray-100">
                  <button 
                    onClick={() => setActiveTab('company')}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'company' ? 'text-black' : 'text-gray-400'}`}
                  >
                    Company
                    {activeTab === 'company' && <motion.div layoutId="tab-underline" className="absolute bottom-0 inset-x-0 h-0.5 bg-black" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab('personal')}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'personal' ? 'text-black' : 'text-gray-400'}`}
                  >
                    Personal
                    {activeTab === 'personal' && <motion.div layoutId="tab-underline" className="absolute bottom-0 inset-x-0 h-0.5 bg-black" />}
                  </button>
                </div>

                <div className="px-8 pt-6 pb-2">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab} workflows...`}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:bg-white focus:border-black focus:ring-0 outline-none transition-all text-[13px] font-medium placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
                  <div className="flex items-center justify-between mb-3 px-2">
                    <div className="flex items-center gap-2">
                      {activeTab === 'company' ? (
                        <>
                          <Building2 className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Enterprise Standards</span>
                        </>
                      ) : (
                        <>
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Your Saved Workflows</span>
                        </>
                      )}
                    </div>
                  </div>

                  {currentSops.map((sop) => (
                    <button
                      key={sop.id}
                      onClick={() => setSelectedSop(sop)}
                      className="w-full flex items-center gap-4 p-3 rounded-xl active:bg-gray-50 transition-all group border border-transparent"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sop.color} shrink-0`}>
                        {React.cloneElement(sop.icon as React.ReactElement, { size: 18 })}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h4 className="text-[15px] font-bold text-gray-900 leading-tight truncate">{sop.title}</h4>
                        <p className="text-[11px] text-gray-400 mt-0.5 truncate font-medium">{sop.sub}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col h-full">
                <div className="flex items-center justify-between p-8 border-b border-gray-100">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">SOP Flow Plan</h3>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{selectedSop.title}</p>
                  </div>
                  <button onClick={handleClose} className="p-2.5 text-black active:opacity-60 transition-all">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-8 py-6">
                  <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedSop.color} shrink-0`}>
        {React.cloneElement(selectedSop.icon as React.ReactElement, { size: 24 })}
      </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900">{selectedSop.title}</h4>
                      <p className="text-[12px] text-gray-500 font-medium">{selectedSop.sub} • 5 Steps • ~2.5h</p>
                    </div>
                  </div>

                  <div className="space-y-6 relative">
                    <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-100" />
                    {MOCK_STEPS.map((step, index) => (
                      <div key={step.id} className="relative flex gap-6 group cursor-default">
                        <div className="relative z-10 w-[30px] h-[30px] rounded-full bg-white border-2 border-gray-100 flex items-center justify-center shrink-0 shadow-xs active:border-black active:bg-black active:text-white transition-all duration-300">
                          <span className="text-[10px] font-black">{index + 1}</span>
                        </div>
                        <div className="flex-1 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="text-[14px] font-bold text-gray-900">{step.title}</h5>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              <Clock className="w-3 h-3" />
                              {step.duration}
                            </div>
                          </div>
                          <p className="text-[12px] text-gray-500 leading-relaxed font-medium">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-white border-t border-gray-100">
                  <button 
                    onClick={handleClose}
                    className="w-full bg-black text-white h-14 rounded-2xl flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-[0.2em] shadow-xl active:scale-[0.98] transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Create Flow
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
