import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { ChevronLeft, Clock, ChevronRight, Plus, ChevronDown, Flag, ArrowRight, Check, Sparkles, Trash2, Bell, CheckCircle2 } from 'lucide-react';
import { StatusBar } from '../PhoneFrame';

interface FollowUpProps {
  isOpen: boolean;
  onClose: () => void;
  onConvertToFlow?: (title: string) => void;
}

type Assignee = 'me' | 'other';
type Status = 'open' | 'completed';
type Priority = 'critical' | 'high' | 'medium' | 'low';

interface FollowUpItem {
  id: string;
  title: string;
  source: string;
  sourceAvatar: string;
  time: string;
  date: number;
  assignee: Assignee;
  status: Status;
  priority: Priority;
}

const FOLLOW_UP_ITEMS: FollowUpItem[] = [
  // Yesterday
  { id: '9', title: '对齐海外版本上线排期', source: '产品群组', sourceAvatar: 'https://i.pravatar.cc/40?u=product-group', time: '昨天 11:00', date: 12, assignee: 'me', status: 'open', priority: 'high' },
  { id: '10', title: '审核 App Store 截图素材', source: 'Lisa Wang', sourceAvatar: 'https://i.pravatar.cc/40?u=lisa', time: '昨天 15:00', date: 12, assignee: 'me', status: 'open', priority: 'medium' },
  { id: '11', title: '回复客户定制化需求邮件', source: '客户支持群', sourceAvatar: 'https://i.pravatar.cc/40?u=support', time: '昨天 17:30', date: 12, assignee: 'me', status: 'open', priority: 'critical' },
  // Today
  { id: '1', title: '回复王总合同确认邮件', source: '王总', sourceAvatar: 'https://i.pravatar.cc/40?u=wang', time: '今天 14:00', date: 13, assignee: 'me', status: 'open', priority: 'critical' },
  { id: '2', title: '审批 Design System 群聊创建', source: 'Design 群组', sourceAvatar: 'https://i.pravatar.cc/40?u=design-group', time: '今天 17:00', date: 13, assignee: 'me', status: 'open', priority: 'high' },
  { id: '12', title: '确认新版 Onboarding 文案', source: 'Amy Zhang', sourceAvatar: 'https://i.pravatar.cc/40?u=amy', time: '今天 16:00', date: 13, assignee: 'me', status: 'open', priority: 'medium' },
  { id: '13', title: '同步 SDK 接入进度给后端', source: '技术群组', sourceAvatar: 'https://i.pravatar.cc/40?u=tech-group', time: '今天 18:00', date: 13, assignee: 'me', status: 'open', priority: 'low' },
  // Tomorrow
  { id: '3', title: '确认 Q1 预测模型参数', source: 'Jack Wu', sourceAvatar: 'https://i.pravatar.cc/40?u=jack', time: '明天 10:00', date: 14, assignee: 'me', status: 'open', priority: 'medium' },
  { id: '4', title: '发送竞品分析反馈给 Sarah', source: 'Sarah Lin', sourceAvatar: 'https://i.pravatar.cc/40?u=sarah', time: '明天 15:00', date: 14, assignee: 'other', status: 'open', priority: 'medium' },
  // Later
  { id: '5', title: '完成简历筛选结果审核', source: 'HR 群组', sourceAvatar: 'https://i.pravatar.cc/40?u=hr-group', time: '2月15日 09:00', date: 15, assignee: 'me', status: 'open', priority: 'low' },
  { id: '6', title: '提交设计规范文档 v2', source: 'Zhanghua', sourceAvatar: 'https://i.pravatar.cc/40?u=zhanghua', time: '2月16日 12:00', date: 16, assignee: 'other', status: 'open', priority: 'high' },
  { id: '7', title: '跟进供应商报价回复', source: '采购群组', sourceAvatar: 'https://i.pravatar.cc/40?u=procurement', time: '2月18日 10:00', date: 18, assignee: 'me', status: 'open', priority: 'medium' },
  { id: '8', title: '安排 Q1 复盘会议', source: 'Mike Chen', sourceAvatar: 'https://i.pravatar.cc/40?u=mike', time: '2月20日 14:00', date: 20, assignee: 'other', status: 'completed', priority: 'low' },
];

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; fill: string }> = {
  critical: { label: 'Critical', color: 'text-red-500', fill: 'fill-red-500' },
  high: { label: 'High', color: 'text-orange-400', fill: 'fill-orange-400' },
  medium: { label: 'Medium', color: 'text-yellow-500', fill: 'fill-yellow-500' },
  low: { label: 'Low', color: 'text-gray-300', fill: 'fill-gray-300' },
};

// Days that have follow-up items
const FOLLOW_UP_DAYS = [...new Set(FOLLOW_UP_ITEMS.map(item => item.date))];

interface MeetingItem {
  id: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  color: string;
  date: number;
}

const MEETINGS: MeetingItem[] = [
  { id: 'm1', title: 'Q1 Revenue Review', location: '会议室 A-302', startTime: '10:00', endTime: '11:00', color: 'bg-blue-500', date: 13 },
  { id: 'm2', title: 'Design Sprint Kickoff', location: '线上 · Zoom', startTime: '14:30', endTime: '15:30', color: 'bg-emerald-500', date: 13 },
  { id: 'm3', title: 'Product Roadmap Sync', location: '会议室 B-201', startTime: '09:30', endTime: '10:30', color: 'bg-purple-500', date: 14 },
  { id: 'm4', title: '1:1 with Manager', location: '线上 · Teams', startTime: '16:00', endTime: '16:30', color: 'bg-orange-400', date: 15 },
];

const MEETING_DAYS = [...new Set(MEETINGS.map(m => m.date))];

const TODAY = 13;
function getDateLabel(date: number): string {
  if (date === TODAY) return 'Today';
  if (date === TODAY - 1) return 'Yesterday';
  return `2/${date}/2026`;
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options: { key: string; label: string; icon?: React.ReactNode }[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (key: string) => void;
}

function FilterDropdown({ label, value, options, isOpen, onToggle, onSelect }: FilterDropdownProps) {
  const selected = options.find(o => o.key === value);
  return (
    <div className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all active:scale-95 ${
          value !== options[0].key
            ? 'bg-white text-black border border-gray-200'
            : 'bg-gray-100 text-black border border-gray-200'
        }`}
      >
        {selected?.label || label}
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 mt-1.5 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-40 min-w-[140px] py-1"
          >
            {options.map(opt => (
              <button
                key={opt.key}
                onClick={(e) => { e.stopPropagation(); onSelect(opt.key); }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left text-[12px] font-medium transition-colors ${
                  value === opt.key ? 'text-black' : 'text-gray-500 active:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  {opt.icon}
                  {opt.label}
                </span>
                {value === opt.key && <Check className="w-3.5 h-3.5 text-black shrink-0" strokeWidth={2.5} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CalendarView({ onSelectDate, selectedDate }: { onSelectDate: (day: number) => void; selectedDate: number | null }) {
  const today = 13;
  const daysInMonth = 28;
  const firstDayOffset = 6;

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="px-2">
      {/* Month Header */}
      <div className="flex items-center justify-between px-2 mb-4">
        <button className="p-1.5 active:opacity-60 transition-opacity">
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        </button>
        <span className="text-[14px] font-semibold tracking-tight">February 2026</span>
        <button className="p-1.5 active:opacity-60 transition-opacity">
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-1">
        {weekdays.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-400 uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          const hasFollowUp = day !== null && (FOLLOW_UP_DAYS.includes(day) || MEETING_DAYS.includes(day));
          const isToday = day === today;
          const isSelected = day === selectedDate;
          const isPast = day !== null && day < today;

          if (day === null) {
            return <div key={i} className="py-2" />;
          }

          return (
            <button
              key={i}
              onClick={() => onSelectDate(day)}
              className="relative flex flex-col items-center justify-center py-2 transition-all active:scale-90"
            >
              <span className={`w-8 h-8 flex items-center justify-center rounded-full text-[13px] font-medium transition-all ${
                isSelected
                  ? 'bg-black text-white'
                  : isToday
                    ? 'bg-gray-100 text-black font-semibold'
                    : isPast
                      ? 'text-gray-300'
                      : 'text-gray-700'
              }`}>
                {day}
              </span>
              {hasFollowUp && (
                <div className={`w-1 h-1 rounded-full mt-0.5 ${
                  isSelected ? 'bg-white' : day <= today ? 'bg-orange-400' : 'bg-blue-400'
                }`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface SwipeableCardProps {
  item: FollowUpItem;
  index: number;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onReminder: (id: string) => void;
  onConvertToFlow?: (title: string) => void;
}

function SwipeableCard({ item, index, onComplete, onDelete, onReminder, onConvertToFlow }: SwipeableCardProps) {
  const x = useMotionValue(0);
  const actionsWidth = 240; // 4 buttons × 60px each

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -80) {
      // Snap to show actions
      x.set(-actionsWidth);
    } else {
      // Snap back
      x.set(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* Swipe-behind actions */}
      <div className="absolute inset-0 flex items-center justify-end rounded-2xl">
        <div className="flex h-full">
          <button
            onClick={() => { onComplete(item.id); x.set(0); }}
            className="w-[60px] h-full bg-emerald-500 flex flex-col items-center justify-center gap-1 active:opacity-80 transition-opacity"
          >
            <CheckCircle2 className="w-[18px] h-[18px] text-white" strokeWidth={2} />
            <span className="text-[9px] font-bold text-white uppercase tracking-wide">Done</span>
          </button>
          <button
            onClick={() => { onReminder(item.id); x.set(0); }}
            className="w-[60px] h-full bg-blue-500 flex flex-col items-center justify-center gap-1 active:opacity-80 transition-opacity"
          >
            <Bell className="w-[18px] h-[18px] text-white" strokeWidth={2} />
            <span className="text-[9px] font-bold text-white uppercase tracking-wide">Remind</span>
          </button>
          <button
            onClick={() => { if (onConvertToFlow) { onConvertToFlow(item.title); } x.set(0); }}
            className="w-[60px] h-full bg-black flex flex-col items-center justify-center gap-1 active:opacity-80 transition-opacity"
          >
            <Sparkles className="w-[18px] h-[18px] text-white" strokeWidth={2} />
            <span className="text-[9px] font-bold text-white uppercase tracking-wide">Flow</span>
          </button>
          <button
            onClick={() => { onDelete(item.id); }}
            className="w-[60px] h-full bg-red-500 flex flex-col items-center justify-center gap-1 active:opacity-80 transition-opacity rounded-r-2xl"
          >
            <Trash2 className="w-[18px] h-[18px] text-white" strokeWidth={2} />
            <span className="text-[9px] font-bold text-white uppercase tracking-wide">Delete</span>
          </button>
        </div>
      </div>
      {/* Draggable card */}
      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -actionsWidth, right: 0 }}
        dragElastic={{ left: 0.05, right: 0.05 }}
        onDragEnd={handleDragEnd}
        className="p-4 rounded-2xl border border-gray-100 bg-white active:bg-gray-50 transition-colors cursor-pointer relative z-10"
      >
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-[14px] font-semibold text-black tracking-tight leading-snug flex-1 min-w-0">{item.title}</h4>
          <Flag className={`w-3.5 h-3.5 shrink-0 ${PRIORITY_CONFIG[item.priority].color} ${PRIORITY_CONFIG[item.priority].fill}`} strokeWidth={2} />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5">
            <img src={item.sourceAvatar} className="w-4 h-4 rounded-full" />
            <span className="text-[11px] text-gray-400 font-medium">{item.source}</span>
          </div>
          <div className="flex items-center gap-0.5 text-gray-400 active:text-gray-600 transition-colors">
            <span className="text-[11px] font-medium">Detail</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export const FollowUp = ({ isOpen, onClose, onConvertToFlow }: FollowUpProps) => {
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [assigneeFilter, setAssigneeFilter] = useState('me');
  const [statusFilter, setStatusFilter] = useState('open');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [items, setItems] = useState<FollowUpItem[]>(FOLLOW_UP_ITEMS);
  const [reminderToast, setReminderToast] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab('list');
      setSelectedDate(null);
      setAssigneeFilter('me');
      setStatusFilter('open');
      setPriorityFilter('all');
      setOpenDropdown(null);
      setItems(FOLLOW_UP_ITEMS);
      setReminderToast(null);
    }
  }, [isOpen]);

  const handleComplete = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, status: item.status === 'completed' ? 'open' : 'completed' } : item
    ));
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleReminder = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setReminderToast(item.title);
      setTimeout(() => setReminderToast(null), 2000);
    }
  };

  const listFiltered = items.filter(item => {
    if (assigneeFilter !== 'all' && item.assignee !== assigneeFilter) return false;
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && item.priority !== priorityFilter) return false;
    return true;
  });

  const calendarFiltered = selectedDate
    ? items.filter(item => item.date === selectedDate)
    : items;

  const assigneeOptions = [
    { key: 'all', label: 'All' },
    { key: 'me', label: 'Assign to Me' },
    { key: 'other', label: 'Others' },
  ];

  const statusOptions = [
    { key: 'all', label: 'All' },
    { key: 'open', label: 'Open' },
    { key: 'completed', label: 'Completed' },
  ];

  const priorityOptions = [
    { key: 'all', label: 'All' },
    { key: 'critical', label: 'Critical', icon: <Flag className="w-3 h-3 text-red-500 fill-red-500" strokeWidth={2} /> },
    { key: 'high', label: 'High', icon: <Flag className="w-3 h-3 text-orange-400 fill-orange-400" strokeWidth={2} /> },
    { key: 'medium', label: 'Medium', icon: <Flag className="w-3 h-3 text-yellow-500 fill-yellow-500" strokeWidth={2} /> },
    { key: 'low', label: 'Low', icon: <Flag className="w-3 h-3 text-gray-300 fill-gray-300" strokeWidth={2} /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-0 bg-white z-[100] flex flex-col"
        >
          <StatusBar bg="#ffffff" />

          {/* Header with Tabs */}
          <header className="pt-[62px] px-4 pb-0 border-b border-gray-100">
            <div className="flex items-center gap-1">
              <button onClick={onClose} className="p-2 -ml-2 active:opacity-60 transition-all">
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              <div className="flex-1 flex justify-center gap-6">
                {(['list', 'calendar'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); if (tab === 'list') setSelectedDate(null); if (tab === 'calendar') setSelectedDate(TODAY); }}
                    className={`relative pb-3 pt-2 text-[14px] font-semibold text-center transition-colors ${
                      activeTab === tab ? 'text-black' : 'text-gray-400'
                    }`}
                  >
                    {tab === 'list' ? (
                      <>
                        Follow-up
                        <span className="absolute -top-0.5 -right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                      </>
                    ) : 'Calendar'}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <button className="p-2 -mr-2 active:opacity-60 transition-all">
                <Plus className="w-5 h-5 text-black" strokeWidth={2.5} />
              </button>
            </div>
          </header>

          {/* Filter Bar - outside scroll area to prevent clipping */}
          {activeTab === 'list' && (
            <div className="relative z-30 bg-[#f2f3f5] px-4 pt-4 pb-1" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <FilterDropdown
                  label="Assignee"
                  value={assigneeFilter}
                  options={assigneeOptions}
                  isOpen={openDropdown === 'assignee'}
                  onToggle={() => setOpenDropdown(openDropdown === 'assignee' ? null : 'assignee')}
                  onSelect={(k) => { setAssigneeFilter(k); setOpenDropdown(null); }}
                />
                <FilterDropdown
                  label="Status"
                  value={statusFilter}
                  options={statusOptions}
                  isOpen={openDropdown === 'status'}
                  onToggle={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
                  onSelect={(k) => { setStatusFilter(k); setOpenDropdown(null); }}
                />
                <FilterDropdown
                  label="Priority"
                  value={priorityFilter}
                  options={priorityOptions}
                  isOpen={openDropdown === 'priority'}
                  onToggle={() => setOpenDropdown(openDropdown === 'priority' ? null : 'priority')}
                  onSelect={(k) => { setPriorityFilter(k); setOpenDropdown(null); }}
                />
              </div>
            </div>
          )}

          {/* Backdrop to close dropdown */}
          {openDropdown && (
            <div className="fixed inset-0 z-20" onClick={() => setOpenDropdown(null)} />
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-[#f2f3f5]">
            <AnimatePresence mode="wait">
              {activeTab === 'list' ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="px-4 py-3"
                >

                  {/* List grouped by date */}
                  {listFiltered.length > 0 ? (() => {
                    const grouped = listFiltered.reduce<Record<number, FollowUpItem[]>>((acc, item) => {
                      (acc[item.date] ||= []).push(item);
                      return acc;
                    }, {});
                    const sortedDates = Object.keys(grouped).map(Number).sort((a, b) => a - b);
                    let itemIdx = 0;
                    return (
                      <div className="space-y-5">
                        {sortedDates.map(date => (
                          <div key={date}>
                            <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider">{getDateLabel(date)}</span>
                            <div className="space-y-2.5 mt-2">
                              {grouped[date].map(item => {
                                const idx = itemIdx++;
                                return (
                                  <SwipeableCard
                                    key={item.id}
                                    item={item}
                                    index={idx}
                                    onComplete={(id) => handleComplete(id)}
                                    onDelete={(id) => handleDelete(id)}
                                    onReminder={(id) => handleReminder(id)}
                                    onConvertToFlow={onConvertToFlow}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })() : (
                    <div className="text-center py-12">
                      <span className="text-[13px] text-gray-300 font-medium">No matching follow-ups</span>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* Calendar grid - white bg */}
                  <div className="bg-white py-4 pb-5">
                    <CalendarView
                      onSelectDate={(day) => setSelectedDate(day === selectedDate ? null : day)}
                      selectedDate={selectedDate}
                    />
                  </div>

                  {/* Meetings for selected date - gray bg */}
                  <div className="px-4 pt-4 pb-4">
                    {selectedDate && (
                      <div className="mb-3">
                        <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider">
                          {getDateLabel(selectedDate)}
                        </span>
                      </div>
                    )}
                    {(() => {
                      const dayMeetings = selectedDate ? MEETINGS.filter(m => m.date === selectedDate) : [];
                      return dayMeetings.length > 0 ? (
                        <div className="space-y-2.5">
                          {dayMeetings.map(meeting => (
                            <div
                              key={meeting.id}
                              className="flex items-stretch bg-white rounded-2xl border border-gray-100 overflow-hidden active:bg-gray-50 transition-all cursor-pointer"
                            >
                              <div className="w-3 shrink-0" />
                              <div className={`w-[3px] shrink-0 rounded-full my-3 ${meeting.color}`} />
                              <div className="flex-1 flex items-center justify-between px-3 py-3.5">
                                <div className="flex-1 min-w-0 pr-3">
                                  <h4 className="text-[13px] font-semibold text-black tracking-tight">{meeting.title}</h4>
                                  <span className="text-[11px] text-gray-400 font-medium mt-0.5 block">{meeting.location}</span>
                                </div>
                                <div className="shrink-0 text-right">
                                  <span className="text-[12px] font-semibold text-black">{meeting.startTime}</span>
                                  <span className="text-[11px] text-gray-300 font-medium block">{meeting.endTime}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : selectedDate ? (
                        <div className="text-center py-8">
                          <span className="text-[13px] text-gray-300 font-medium">No meetings</span>
                        </div>
                      ) : null;
                    })()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reminder Toast */}
          <AnimatePresence>
            {reminderToast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2.5 rounded-xl shadow-lg z-[110] flex items-center gap-2"
              >
                <Bell className="w-4 h-4 text-blue-400" />
                <span className="text-[12px] font-semibold">Reminder set</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
