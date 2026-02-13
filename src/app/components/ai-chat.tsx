import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, ChevronLeft, ChevronRight, ChevronDown, Check, Mail, Users, Bell, FileText, Database, ArrowRight, ListTree, LayoutGrid, Maximize2, Zap, Lightbulb, Mic, ClipboardCheck } from 'lucide-react';

type ActionType = 'create_group' | 'send_email' | 'nudge' | 'generate_doc' | 'fetch_data';

interface Step {
  id: number;
  tag: string;
  label: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  actionRecord?: string;
  meta?: string;
  time?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  type: 'text' | 'action' | 'plan_summary' | 'divider';
  content: string;
  action?: {
    type: ActionType;
    label: string;
    description: string;
  };
  timestamp: string;
  isProactive?: boolean;
  isConfirmed?: boolean;
}

const ACTION_CONFIG = {
  create_group: { icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Create Group' },
  send_email: { icon: Mail, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Send Email' },
  nudge: { icon: Zap, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Nudge' },
  generate_doc: { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Generate Doc' },
  fetch_data: { icon: Database, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Fetch Data' },
};

// Chat data configurations
const CHAT_DATA: Record<string, { title: string; steps: Step[]; messages: Message[] }> = {
  contract: {
    title: 'Contract Follow-up',
    steps: [
      { id: 1, tag: 'Topic', label: '与技术确认具体需求和背景', description: '了解完整的产品需求文档、UI设计范围、期望交付时间', status: 'completed', actionRecord: '已与技术侧建立沟通群聊', meta: '花费时间：2 天', time: '10:20 AM' },
      { id: 2, tag: 'Analyze', label: '与产品经理确认接手准备度', description: '检查Link验收进度、当前工作负荷、对项目的理解程度', status: 'active', actionRecord: '已生成邮件草案', meta: '预计：今天完成' },
      { id: 3, tag: 'Normalize', label: '评估工作量，制定排期计划', description: '基于需求和团队能力进行工作量拆解', status: 'pending', meta: '预计花费时间：1 天' },
      { id: 4, tag: 'Kickoff', label: '启动界面设计', description: '反馈评估结果和排期安排', status: 'pending', meta: '预计花费时间：5 天' },
      { id: 5, tag: 'Tracking', label: '建立跟踪机制', description: '确保后续执行可控，设立关键检查点', status: 'pending' },
      { id: 6, tag: 'Report', label: '最终行政报告与交付', description: '汇总所有产出并进行最后确认', status: 'pending' },
    ],
    messages: [
      { id: 'd1', role: 'system', type: 'divider', content: 'Topic', timestamp: '' },
      { id: '1', role: 'user', type: 'text', content: '这个工作的进度目前到底怎么样了？', timestamp: '10:25 AM' },
      { id: 'd2', role: 'system', type: 'divider', content: 'Analyze', timestamp: '' },
      { id: '2', role: 'assistant', type: 'text', content: '目前总体进度为 68%。关键路径上的『法务审核』环节停滞在 12%，已导致后续市场投放计划顺延 48 小时。其他环节如设计、技术研发均处于正常状态。', timestamp: '10:25 AM', isProactive: false },
      { id: '3', role: 'assistant', type: 'text', content: '已过去 48 小时，王总仍未回复催办邮件。要不要我再发一条微信消息催一下？或者帮你预约一个电话？', timestamp: '10:26 AM', isProactive: true },
      { id: '4', role: 'user', type: 'text', content: '发邮件吧', timestamp: '10:27 AM' },
      { id: '5', role: 'assistant', type: 'action', content: '已为你准备好邮件催办草案：', isProactive: false, action: { type: 'nudge', label: '发送邮件', description: '收件人：wang.zong@startech.cn\n主题：关于合同 CT-2026-0847 的签署确认\n\n王总您好，关于 Q1 Branding 项目的法务审核...' }, timestamp: '10:27 AM' },
    ],
  },
  'q1-forecast': {
    title: 'Q1 Sales Forecast',
    steps: [
      { id: 1, tag: 'Collect', label: '收集各部门销售数据', description: '向 Jack（华东区）和 Zhanghua（华南区）发送数据收集请求', status: 'completed', actionRecord: '已发送数据收集邮件', meta: '花费时间：1 天', time: '9:15 AM' },
      { id: 2, tag: 'Analyze', label: '等待数据汇总报告', description: '等待各区域负责人提交 Q1 销售数据和市场分析', status: 'active', actionRecord: '已发送催办消息给 Jack', meta: '预计：明天完成' },
      { id: 3, tag: 'Synthesize', label: '合并数据并生成预测模型', description: '将各区数据导入预测模型，生成 Q1 整体销售预测', status: 'pending', meta: '预计花费时间：2 天' },
      { id: 4, tag: 'Review', label: '与管理层对齐预测结论', description: '组织管理层会议，确认预测假设和结论', status: 'pending', meta: '预计花费时间：1 天' },
      { id: 5, tag: 'Report', label: '输出最终 Forecast 报告', description: '生成正式报告并分发给所有 stakeholder', status: 'pending' },
    ],
    messages: [
      { id: 'd1', role: 'system', type: 'divider', content: 'Collect', timestamp: '' },
      { id: '1', role: 'assistant', type: 'text', content: 'Q1 Sales Forecast 任务已启动。我已向 Jack（华东区）和 Zhanghua（华南区）发送了数据收集请求邮件，要求他们在本周五前提交各自区域的 Q1 销售数据。', timestamp: '9:15 AM', isProactive: false },
      { id: '2', role: 'assistant', type: 'action', content: '已为你发送数据收集邮件：', isProactive: false, action: { type: 'send_email', label: '发送邮件', description: '收件人：jack@company.cn, zhanghua@company.cn\n主题：Q1 销售数据收集 — 请于周五前提交\n\n请提交各区域 Q1 销售数据及市场分析...' }, timestamp: '9:16 AM', isConfirmed: true },
      { id: 'd2', role: 'system', type: 'divider', content: 'Analyze', timestamp: '' },
      { id: '3', role: 'assistant', type: 'text', content: 'Zhanghua 已提交华南区数据，整体增长 12%，符合预期。但 Jack 的华东区数据尚未收到，已超过截止时间 24 小时。', timestamp: '2:30 PM', isProactive: true },
      { id: '4', role: 'user', type: 'text', content: 'Jack 那边什么情况？催一下', timestamp: '2:35 PM' },
      { id: '5', role: 'assistant', type: 'text', content: '已向 Jack 发送催办消息。根据他上次回复，华东区本季度有几个大客户合同还在确认中，可能需要额外 1 天整理数据。', timestamp: '2:36 PM', isProactive: false },
      { id: '6', role: 'assistant', type: 'text', content: '要不要我先用华南区数据和历史趋势生成一版初步预测？等 Jack 数据到了再更新。', timestamp: '2:37 PM', isProactive: true },
    ],
  },
};

// Workplan steps for the improvement card scenario
const IMPROVEMENT_WORKPLAN_STEPS = [
  { id: 1, tag: 'Audit', label: '盘点现有三端交互差异', description: '梳理 Web、iOS、Android 三端当前的交互规范差异，建立对照清单' },
  { id: 2, tag: 'Standard', label: '制定跨端设计规范', description: '基于差异清单，输出统一的跨端交互设计规范文档，明确各端共性与差异化策略' },
  { id: 3, tag: 'Review', label: '建立前置设计评审机制', description: '在需求评审阶段增加跨端一致性检查环节，指定评审责任人和通过标准' },
  { id: 4, tag: 'Tooling', label: '搭建自动化检测工具', description: '接入设计走查工具或自定义脚本，自动对比三端 UI 还原度和交互一致性' },
  { id: 5, tag: 'Pilot', label: '选取试点项目验证', description: '在 Work 改版项目中试运行新流程，收集反馈并迭代优化' },
  { id: 6, tag: 'Report', label: '输出总结报告与推广方案', description: '总结试点效果，量化返工成本降低比例，制定全团队推广计划' },
];

export const AIChat = ({ isOpen, onClose, mode = 'existing', chatId = 'contract', initialMessage }: { isOpen: boolean; onClose: () => void; mode?: 'new' | 'existing'; chatId?: string; initialMessage?: string }) => {
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isConfirming, setIsConfirming] = useState<string | null>(null);
  const [workplanApproved, setWorkplanApproved] = useState(false);
  const [workplanApproving, setWorkplanApproving] = useState(false);
  const [newChatSteps, setNewChatSteps] = useState(IMPROVEMENT_WORKPLAN_STEPS);
  const touchStartX = useRef<number | null>(null);

  const chatData = CHAT_DATA[chatId] || CHAT_DATA.contract;

  const [steps, setSteps] = useState<Step[]>(chatData.steps);
  const [messages, setMessages] = useState<Message[]>(chatData.messages);

  // Reset data when chatId changes
  useEffect(() => {
    const data = CHAT_DATA[chatId] || CHAT_DATA.contract;
    setSteps(data.steps);
    setMessages(data.messages);
    setIsIndexOpen(false);
    setWorkplanApproved(false);
    setWorkplanApproving(false);
    setNewChatSteps(IMPROVEMENT_WORKPLAN_STEPS);
  }, [chatId]);

  const handleConfirm = (messageId: string) => {
    setIsConfirming(messageId);

    setTimeout(() => {
      setMessages(prev => prev.map(m =>
        m.id === messageId ? { ...m, isConfirmed: true } : m
      ));

      setSteps(prev => prev.map(s =>
        s.id === 2 ? { ...s, status: 'completed', actionRecord: chatId === 'q1-forecast' ? '已向 Jack 发送催办消息' : '已向王总发送催办邮件', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } :
        s.id === 3 ? { ...s, status: 'active' } : s
      ));

      const followUp: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        type: 'text',
        content: chatId === 'q1-forecast'
          ? '催办消息已发送。我会持续关注 Jack 的回复。下一步我们将合并数据并生成预测模型。'
          : '邮件已发送。我会持续关注对方的回复情况。下一步我们将评估工作量并制定排期。',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isProactive: false
      };

      setMessages(prev => [...prev, followUp]);
      setIsConfirming(null);
    }, 800);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const activeStepIdx = steps.findIndex(s => s.status === 'active');
  const activeStep = steps[activeStepIdx];

  // For new chat mode after workplan approval
  const newChatActiveIdx = workplanApproved ? 0 : -1;
  const newChatActiveStep = workplanApproved ? newChatSteps[0] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-0 bg-white z-[70] flex flex-col overflow-hidden"
        >
          {/* Header */}
          {mode === 'new' ? (
            <header className="pt-[54px] h-auto px-4 pb-3 flex items-center justify-between border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="p-2 -ml-2 active:opacity-60 transition-all">
                  <ChevronLeft className="w-6 h-6 text-black" />
                </button>
                <div>
                  <h3 className="text-[14px] font-semibold tracking-tight">{initialMessage ? initialMessage.split('\n')[0] : 'New Chat'}</h3>
                  {workplanApproved && newChatActiveStep && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 mt-0.5"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-gray-400">{newChatActiveIdx + 1}/{newChatSteps.length} 步</span>
                        <span className="text-[11px] font-semibold text-black tracking-tight">{newChatActiveStep.label}</span>
                      </div>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 rounded-full">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">进行中</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </header>
          ) : (
            <header className="pt-[54px] h-auto px-4 pb-3 flex items-center justify-between border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="p-2 -ml-2 active:opacity-60 transition-all">
                  <ChevronLeft className="w-6 h-6 text-black" />
                </button>
                <div>
                  <h3 className="text-[14px] font-semibold tracking-tight">{chatData.title}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-gray-400">{activeStepIdx + 1}/{steps.length} 步</span>
                      <span className="text-[11px] font-semibold text-black tracking-tight">{activeStep?.label}</span>
                    </div>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 rounded-full">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">进行中</span>
                      <ChevronDown className="w-2 h-2 text-emerald-600 ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsIndexOpen(true)}
                className="p-2 bg-white text-black border border-gray-200 rounded-lg flex items-center justify-center active:scale-95 transition-all"
              >
                <ListTree className="w-4 h-4 text-black" />
              </button>
            </header>
          )}

          <div className="flex-1 flex overflow-hidden relative">
            {mode === 'new' ? (
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-32" ref={scrollRef}>
                {initialMessage ? (
                  <>
                    {/* User message */}
                    <div className="flex flex-col items-end">
                      <div className="max-w-[80%] w-fit px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed font-semibold border bg-gray-100 text-black rounded-tr-none border-gray-100">
                        {initialMessage}
                      </div>
                    </div>

                    {/* AI response with workplan */}
                    <div className="flex flex-col items-start w-full">
                      <div className="px-0.5 py-1">
                        <div className="text-[14px] leading-[1.6] font-medium text-black tracking-tight">
                          已理解你的需求。我为你生成了一份 6 步工作计划，涵盖从现状盘点到推广落地的完整流程：
                        </div>
                      </div>

                      {/* Workplan Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-lg shadow-black/[0.03] w-full"
                      >
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                            <ClipboardCheck className="w-4.5 h-4.5 text-blue-600" />
                          </div>
                          <div>
                            <span className="text-[12px] font-bold uppercase tracking-widest block text-blue-500 leading-none">
                              Work Plan
                            </span>
                            <span className="text-[14px] font-semibold text-black leading-none mt-px">6 步执行方案</span>
                          </div>
                        </div>

                        <div className="space-y-4 mb-5">
                          {IMPROVEMENT_WORKPLAN_STEPS.map((step, idx) => (
                            <div key={step.id} className="flex gap-3">
                              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-[10px] font-black text-gray-500">{idx + 1}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="text-[13px] font-bold text-black leading-tight">{step.label}</h5>
                                <p className="text-[12px] text-gray-500 leading-relaxed mt-0.5">{step.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {workplanApproved ? (
                            <div className="col-span-2 py-2.5 bg-emerald-50 text-emerald-600 rounded-lg text-[12px] font-bold flex items-center justify-center gap-2">
                              <Check className="w-3.5 h-3.5" strokeWidth={3} />
                              Approved
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setWorkplanApproving(true);
                                  setTimeout(() => {
                                    setWorkplanApproved(true);
                                    setWorkplanApproving(false);
                                  }, 800);
                                }}
                                disabled={workplanApproving}
                                className="py-2.5 bg-black text-white rounded-lg text-[12px] font-bold active:scale-[0.97] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                              >
                                {workplanApproving ? (
                                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : 'Approve'}
                              </button>
                              <button className="py-2.5 bg-gray-50 text-black rounded-lg text-[12px] font-bold active:scale-[0.97] transition-all">
                                Dismiss
                              </button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Step divider + AI follow-up after approval */}
                    {workplanApproved && (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="py-1"
                        >
                          <div className="flex items-center gap-4 w-full opacity-40">
                            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-black whitespace-nowrap">
                              Audit
                            </span>
                            <div className="h-[1px] flex-1 bg-gray-300" />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                          className="flex flex-col items-start w-full"
                        >
                          <div className="px-0.5 py-1">
                            <div className="text-[14px] leading-[1.6] font-medium text-black tracking-tight">
                              工作计划已确认，正在进入第 1 步「盘点现有三端交互差异」。我会先梳理 Web、iOS、Android 三端现有的交互规范文档，建立差异对照清单。预计需要收集各端设计负责人的输入。
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center h-full">
                    <p className="text-[14px] text-gray-300 font-medium">开始新的对话</p>
                  </div>
                )}
              </div>
            ) : (
            <div
              className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scroll-smooth pb-32"
              ref={scrollRef}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (touchStartX.current !== null) {
                  const diff = touchStartX.current - e.changedTouches[0].clientX;
                  if (diff > 80) setIsIndexOpen(true);
                  touchStartX.current = null;
                }
              }}
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`w-full ${msg.type === 'divider' ? 'py-1' : 'flex flex-col ' + (msg.role === 'user' ? 'items-end' : 'items-start')}`}>
                  {msg.type === 'divider' ? (
                        <div className="flex items-center gap-4 w-full opacity-40">
                          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-black whitespace-nowrap">
                            {msg.content}
                          </span>
                          <div className="h-[1px] flex-1 bg-gray-300" />
                        </div>
                  ) : (
                    <div className={`w-full ${msg.role === 'user' ? 'max-w-[80%]' : ''}`}>
                    {/* Message Content */}
                    {msg.role === 'user' ? (
                      <div className="w-fit ml-auto px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed font-semibold border bg-gray-100 text-black rounded-tr-none border-gray-100">
                        {msg.content}
                      </div>
                    ) : (
                      <div className="px-0.5 py-1">
                        {/* Status Label */}
                        {msg.isProactive ? (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-md bg-purple-50 flex items-center justify-center">
                              <Lightbulb className="w-3 h-3 text-purple-500 fill-purple-500" />
                            </div>
                            <span className="text-[12px] font-bold text-purple-600 uppercase tracking-widest">AI initiated</span>
                          </div>
                        ) : null}

                        <div className="text-[14px] leading-[1.6] font-medium text-black tracking-tight">
                          {msg.content}
                        </div>
                      </div>
                    )}

                    {/* Action Cards */}
                    {msg.type === 'action' && msg.action && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-lg shadow-black/[0.03] w-full relative group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${ACTION_CONFIG[msg.action.type].bg}`}>
                              <Zap className={`w-4.5 h-4.5 ${ACTION_CONFIG[msg.action.type].color}`} />
                            </div>
                            <div>
                              <span className="text-[12px] font-bold uppercase tracking-widest block text-blue-500 leading-none">
                                AI Action
                              </span>
                              <span className="text-[14px] font-semibold text-black leading-none mt-px">{msg.action.label}</span>
                            </div>
                          </div>

                          <button className="p-2 -mr-1 -mt-1 text-gray-300 hover:text-black hover:bg-gray-50 rounded-lg transition-all active:scale-90">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="w-full">
                          {msg.action.type === 'nudge' ? (
                            <div className="space-y-4">
                              <div className="space-y-3">
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Recipient</span>
                                  <span className="text-[13px] font-medium text-black break-all">wang.zong@startech.cn</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Subject</span>
                                  <span className="text-[13px] font-medium text-black leading-snug">合同 CT-2026-0847 签署确认</span>
                                </div>
                              </div>
                              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100/50 mb-5">
                                <p className="text-[13px] text-gray-600 leading-relaxed font-medium whitespace-pre-line">
                                  王总您好，{"\n\n"}
                                  上周发送的合作合同（编号 CT-2026-0847），请您在方便时审阅并完成签署。如有条款需要沟通，请随时联系我们。{"\n\n"}
                                  谢谢！
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap text-[13px] text-gray-500 font-medium mb-5 leading-relaxed pr-4">
                              {msg.action.description}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {msg.isConfirmed ? (
                            <div className="col-span-2 py-2.5 bg-emerald-50 text-emerald-600 rounded-lg text-[12px] font-bold flex items-center justify-center gap-2">
                              <Check className="w-3.5 h-3.5" strokeWidth={3} />
                              Confirmed and sent
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => handleConfirm(msg.id)}
                                disabled={isConfirming === msg.id}
                                className="py-2.5 bg-black text-white rounded-lg text-[12px] font-bold active:scale-[0.97] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                              >
                                {isConfirming === msg.id ? (
                                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : 'Confirm'}
                              </button>
                              <button className="py-2.5 bg-gray-50 text-black rounded-lg text-[12px] font-bold active:scale-[0.97] transition-all">
                                Dismiss
                              </button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            ))}
            </div>
            )}
          </div>

          {/* Floating Input Bar */}
          <div className="px-4 pb-8 pt-2 shrink-0">
            <div className="w-full bg-white rounded-full px-3 py-2.5 flex items-center justify-end" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.08), 0 0 40px rgba(0,0,0,0.04)' }}>
              <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Workplan Drawer */}
          {mode === 'existing' && (
          <AnimatePresence>
            {isIndexOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsIndexOpen(false)}
                  className="absolute inset-0 bg-black/20 z-[80]"
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={{ left: 0, right: 0.2 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) setIsIndexOpen(false);
                  }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute top-0 bottom-0 right-0 w-[85%] bg-white z-[81] flex flex-col rounded-l-2xl shadow-[-8px_0_30px_rgba(0,0,0,0.1)]"
                >
                  <div className="pt-[54px] px-5 pb-4 shrink-0 border-b border-gray-100">
                    <h2 className="text-[16px] font-bold text-[#0d0d0d] leading-tight">{chatData.title}</h2>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 rounded-full">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">进行中</span>
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">第 {(activeStepIdx + 1) || steps.length} 步 · 剩余 {steps.filter(s => s.status === 'pending').length} 步</span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-12">

                    <div className="space-y-0 relative">
                      <div className="absolute left-[15px] top-8 bottom-8 w-px border-l border-dashed border-gray-300" />

                      {steps.map((step, idx) => (
                        <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
                          <div className="relative z-10 w-8 flex flex-col items-center pt-1.5 shrink-0">
                            {step.status === 'completed' ? (
                              <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                                <Check className="w-3.5 h-3.5 text-[#007aff]" strokeWidth={3} />
                              </div>
                            ) : step.status === 'active' ? (
                              <div className="w-6 h-6 rounded-full border border-dashed border-gray-300 flex items-center justify-center bg-white shadow-sm">
                                <div className="w-2 h-2 rounded-full bg-[#007aff]" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full border border-dashed border-gray-200 bg-white" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col mb-3">
                              <span className={`text-[12px] font-bold uppercase tracking-[0.2em] mb-0.5 ${
                                step.status === 'active' ? 'text-black' :
                                step.status === 'completed' ? 'text-gray-400' : 'text-gray-300'
                              }`}>
                                Step {idx + 1} · {step.tag}
                              </span>
                              <h3 className={`text-[16px] font-bold tracking-tight leading-snug ${
                                step.status === 'active' ? 'text-[#0d0d0d]' : 'text-black'
                              }`}>
                                {step.label}
                              </h3>
                            </div>

                            <p className={`text-[14px] leading-relaxed mb-3 ${
                              step.status === 'active' ? 'text-[#5d5d5d]' : 'text-gray-600'
                            }`}>
                              {step.description}
                            </p>

                            {step.meta && step.status !== 'completed' && !step.meta.includes('预计') && (
                              <p className={`text-[12px] font-bold uppercase tracking-wider ${
                                step.status === 'active' ? 'text-black' : 'text-gray-300'
                              }`}>
                                {step.meta}
                              </p>
                            )}

                            {step.actionRecord && (
                              <div className="mt-4 p-3 bg-gray-50/80 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm shadow-black/[0.02]">
                                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                  <Zap className="w-4.5 h-4.5 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <span className="text-[12px] font-bold uppercase tracking-widest block text-blue-500 leading-none">
                                        AI Action
                                      </span>
                                      <span className="text-[14px] font-semibold text-black leading-none mt-px">{step.actionRecord}</span>
                                    </div>
                                    {step.time && (
                                      <span className="text-[10px] font-bold text-gray-500 tabular-nums uppercase tracking-widest">{step.time}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {step.time && step.status === 'completed' && !step.actionRecord && (
                              <div className="text-[10px] font-bold text-gray-300 mt-2 flex items-center gap-1 uppercase tracking-widest">
                                Completed at {step.time}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
