import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  ClipboardList,
  Sparkles,
  ArrowRight,
  MessageSquarePlus,
  X
} from 'lucide-react';
import IconWorkspace from '../imports/IconWorkspace';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { SOPSelector } from './components/sop-selector';
import { SectionHeader } from './components/ui-elements';
import { TabBarButtons } from './components/tab-bar-buttons';
import { AIChat } from './components/ai-chat';
import { FollowUp } from './components/follow-up';
import { StatusBar } from './PhoneFrame';
import FollowUpIcon from '../imports/Frame2';

const App = () => {
  const [isSOPSelectorOpen, setIsSOPSelectorOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  const [chatMode, setChatMode] = useState<'new' | 'existing'>('new');
  const [chatId, setChatId] = useState('contract');
  const [initialMessage, setInitialMessage] = useState('');

  const improvements = [
    {
      title: "强化跨端设计一致性管理流程",
      description: "Flow改版项目中大量遗留三端交互不一致问题，建议建立更前置的跨端设计评审机制，减少验收阶段的返工成本。"
    },
    {
      title: "自动化周报汇总逻辑优化",
      description: "通过集成各端数据埋点自动生成效能周报，预计可为每位 PM 每周节省约 1.5 小时的数据整理时间。"
    },
    {
      title: "建立全球多语言评审机制",
      description: "针对海外市场版本，在设计阶段引入多语言长文本适配性评审，降低翻译上线后的界面错位风险。"
    }
  ];

  return (
    <>
    <StatusBar bg={(isAIChatOpen || isFollowUpOpen) ? '#ffffff' : '#f2f3f5'} />
    <div className="h-full min-h-full bg-[#f2f3f5] font-sans text-black selection:bg-black selection:text-white overflow-y-auto overflow-x-hidden no-scrollbar">
      {/* Navigation */}
      <nav className="pt-[68px] px-8 pb-2 flex items-center justify-between">
        <span className="font-semibold text-[25px] tracking-tighter">Flow</span>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            onClick={() => setIsSOPSelectorOpen(true)}>
            <ClipboardList className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
          <div className="relative cursor-pointer active:scale-95 transition-transform" onClick={() => setIsFollowUpOpen(true)}>
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <div className="scale-120 flex items-center justify-center">
                <FollowUpIcon />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#FF3B30] rounded-full border-2 border-white flex items-center justify-center z-10">
              <span className="text-[9px] text-white font-bold leading-none">12</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-4 pb-40 px-8 max-w-2xl mx-auto space-y-6">
        {/* For You */}
        <section>
          <SectionHeader title="For You" />
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-8 px-8 no-scrollbar scroll-smooth mt-4">
            {improvements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => { setInitialMessage(`${item.title}\n${item.description}`); setChatMode('new'); setIsAIChatOpen(true); }}
                className="flex-none w-[260px] h-[155px] relative rounded-2xl overflow-hidden bg-white border border-gray-100 flex flex-col p-4 cursor-pointer active:scale-[0.98] active:bg-gray-50 transition-all"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-emerald-500 fill-blue-500/20" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-emerald-600">
                        Convert to Flow
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 active:scale-90 active:text-gray-700 transition-all cursor-pointer" />
                  </div>
                  <h4 className="text-[15px] font-semibold text-black leading-tight tracking-tight pr-4 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed pr-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent */}
        <section className="mt-10">
          <SectionHeader title="Recent" action="View All" />
          <div className="mt-4 space-y-3">
            {[
              { title: 'Contract Follow-up', status: 'AI 建议发送合同确认邮件给 Legal', tag: 'Pending', tagStyle: 'bg-orange-50 text-orange-500', chatId: 'contract' },
              { title: 'Design System Audit', status: 'AI 推送了创建群聊的卡片，等待你 approve', tag: 'Pending', tagStyle: 'bg-orange-50 text-orange-500', chatId: 'design-audit' },
              { title: 'Q1 Sales Forecast Synthesis', status: "等 Jack、Zhanghua 的数据汇总报告", tag: 'Awaiting', tagStyle: 'bg-blue-50 text-blue-600', avatars: ['https://i.pravatar.cc/40?u=jack', 'https://i.pravatar.cc/40?u=zhanghua'], chatId: 'q1-forecast' },
              { title: 'Product Strategy Alignment', status: "Waiting for Sarah's 竞品分析", tag: 'Awaiting', tagStyle: 'bg-blue-50 text-blue-600', avatars: ['https://i.pravatar.cc/40?u=sarah'], chatId: 'product-strategy' },
              { title: 'Initial Resume Screening', status: 'AI 正在筛选 42 份简历', tag: 'Actioning', tagStyle: 'bg-emerald-50 text-emerald-600', chatId: 'resume-screening' },
            ].map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => { if (task.chatId) { setChatId(task.chatId); setChatMode('existing'); setIsAIChatOpen(true); } }}
                className="p-4 rounded-2xl border border-gray-100 bg-white active:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-semibold text-black tracking-tight truncate pr-2">{task.title}</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md shrink-0 ${task.tagStyle}`}>{task.tag}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[12px] text-gray-400 font-medium truncate">{task.status}</span>
                    {task.avatars && (
                      <div className="flex shrink-0 -space-x-1.5">
                        {task.avatars.map((src: string, i: number) => (
                          <img key={i} src={src} className="w-4.5 h-4.5 rounded-full border-2 border-white" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button with Menu */}
      <AnimatePresence>
        {!isSOPSelectorOpen && !isAIChatOpen && (
          <>
            {/* Backdrop */}
            {isFabMenuOpen && (
              <div
                onClick={() => setIsFabMenuOpen(false)}
                className="fixed inset-0 bg-black/20 z-[59]"
              />
            )}

            {/* Menu Items */}
            {isFabMenuOpen && (
              <div className="fixed bottom-[11.5rem] right-8 z-[60]">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => { setIsFabMenuOpen(false); setIsSOPSelectorOpen(true); }}
                    className="flex items-center gap-3 w-full px-4 py-3.5 active:bg-gray-50 transition-colors"
                  >
                    <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
                      <ClipboardList className="w-[18px] h-[18px] text-black" />
                    </div>
                    <span className="text-[13px] font-semibold text-black whitespace-nowrap">Start from SOP</span>
                  </button>
                  <div className="h-px bg-gray-100 mx-4" />
                  <button
                    onClick={() => { setIsFabMenuOpen(false); setInitialMessage(''); setChatMode('new'); setIsAIChatOpen(true); }}
                    className="flex items-center gap-3 w-full px-4 py-3.5 active:bg-gray-50 transition-colors"
                  >
                    <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
                      <MessageSquarePlus className="w-[18px] h-[18px] text-black" />
                    </div>
                    <span className="text-[13px] font-semibold text-black whitespace-nowrap">Start New Flow</span>
                  </button>
                </div>
              </div>
            )}

            {/* FAB Button */}
            <button
              onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
              className="fixed bottom-28 right-8 w-14 h-14 bg-black rounded-full shadow-2xl flex items-center justify-center z-[60] active:scale-95 transition-transform duration-150"
            >
              <Plus className={`w-6 h-6 text-white transition-transform duration-150 ${isFabMenuOpen ? 'rotate-45' : ''}`} />
            </button>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Tab Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <TabBarButtons />
      </div>

    </div>
    <SOPSelector
      isOpen={isSOPSelectorOpen}
      onClose={() => setIsSOPSelectorOpen(false)}
    />
    <AIChat
      isOpen={isAIChatOpen}
      onClose={() => setIsAIChatOpen(false)}
      mode={chatMode}
      chatId={chatId}
      initialMessage={initialMessage}
    />
    <FollowUp
      isOpen={isFollowUpOpen}
      onClose={() => setIsFollowUpOpen(false)}
      onConvertToFlow={(title) => {
        setIsFollowUpOpen(false);
        setTimeout(() => {
          setInitialMessage(title);
          setChatMode('new');
          setIsAIChatOpen(true);
        }, 300);
      }}
    />
    </>
  );
};

export default App;
