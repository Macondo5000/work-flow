import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Users, 
  Shield, 
  Target, 
  Zap, 
  FileText, 
  Cloud,
  ChevronRight,
  TrendingUp,
  UserSearch,
  FileCheck,
  Layers,
  LucideIcon
} from 'lucide-react';

export const SOP_TEMPLATES = [
  { id: '1', title: 'Onboarding Flow', sub: 'Team integration', icon: <Users />, color: 'bg-blue-50 text-blue-600' },
  { id: '2', title: 'Quality Assurance', sub: 'Security audit', icon: <Shield />, color: 'bg-emerald-50 text-emerald-600' },
  { id: '3', title: 'Strategic Planning', sub: 'Quarterly alignment', icon: <Target />, color: 'bg-orange-50 text-orange-600' },
  { id: '4', title: 'Incident Response', sub: 'Emergency protocol', icon: <Zap />, color: 'bg-red-50 text-red-600' },
  { id: '5', title: 'Asset Management', sub: 'File documentation', icon: <FileText />, color: 'bg-purple-50 text-purple-600' },
  { id: '6', title: 'Cloud Sync', sub: 'Infrastructure backup', icon: <Cloud />, color: 'bg-sky-50 text-sky-600' },
];

export const TaskItem = ({ title, status, time, icon: Icon }: { title: string, status: 'done' | 'pending', time?: string, icon?: LucideIcon }) => (
  <div className="flex items-center gap-3 py-3.5 border-b border-gray-100 last:border-0 active:bg-gray-50 px-1 -mx-1 rounded-lg transition-colors">
    <div className={`shrink-0 flex items-center justify-center transition-colors ${status === 'done' ? 'text-gray-300' : 'text-black'}`}>
      {Icon ? <Icon className="w-4 h-4" /> : (status === 'done' ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />)}
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-[14px] font-semibold transition-all duration-300 tracking-tight ${status === 'done' ? 'text-gray-400 line-through' : 'text-black'}`}>
        {title}
      </p>
    </div>
    {time && (
      <span className="text-[11px] font-semibold text-gray-300 tabular-nums shrink-0">
        {time}
      </span>
    )}
  </div>
);

export const SectionHeader = ({ title, action }: { title: string, action?: string }) => (
  <div className="flex items-end justify-between mb-2">
    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] leading-none">{title}</h2>
    {action && (
      <button className="text-[11px] font-semibold text-black leading-none flex items-center gap-0.5">
        {action}
        <ChevronRight className="w-3 h-3" />
      </button>
    )}
  </div>
);
