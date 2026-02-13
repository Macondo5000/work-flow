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
  actionLabel?: string;
  actionType?: ActionType;
  actionMeta?: {
    groupName?: string;
    members?: { name: string; avatar: string; role?: string }[];
  };
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
    groupName?: string;
    members?: { name: string; avatar: string; role?: string }[];
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
      { id: 1, tag: 'Topic', label: '与技术确认具体需求和背景', description: '了解完整的产品需求文档、UI设计范围、期望交付时间', status: 'completed', actionRecord: '已与技术侧建立沟通群聊', actionLabel: '创建群聊', meta: '花费时间：2 天', time: '10:20 AM' },
      { id: 2, tag: 'Analyze', label: '与产品经理确认接手准备度', description: '检查Link验收进度、当前工作负荷、对项目的理解程度', status: 'active', actionRecord: '已生成邮件草案', actionLabel: '发送邮件', meta: '预计：今天完成' },
      { id: 3, tag: 'Normalize', label: '评估工作量，制定排期计划', description: '基于需求和团队能力进行工作量拆解', status: 'pending', meta: '预计花费时间：1 天' },
      { id: 4, tag: 'Kickoff', label: '启动界面设计', description: '反馈评估结果和排期安排', status: 'pending', meta: '预计花费时间：5 天' },
      { id: 5, tag: 'Tracking', label: '建立跟踪机制', description: '确保后续执行可控，设立关键检查点', status: 'pending' },
      { id: 6, tag: 'Report', label: '最终行政报告与交付', description: '汇总所有产出并进行最后确认', status: 'pending' },
    ],
    messages: [
      { id: '1', role: 'user', type: 'text', content: '这个工作的进度目前到底怎么样了？', timestamp: '10:25 AM' },
      { id: '2', role: 'assistant', type: 'text', content: '目前总体进度为 68%。关键路径上的『法务审核』环节停滞在 12%，已导致后续市场投放计划顺延 48 小时。其他环节如设计、技术研发均处于正常状态。', timestamp: '10:25 AM', isProactive: false },
      { id: '3', role: 'assistant', type: 'text', content: '已过去 48 小时，王总仍未回复催办邮件。要不要我再发一条微信消息催一下？或者帮你预约一个电话？', timestamp: '10:26 AM', isProactive: true },
      { id: '4', role: 'user', type: 'text', content: '发邮件吧', timestamp: '10:27 AM' },
      { id: '5', role: 'assistant', type: 'action', content: '已为你准备好邮件催办草案：', isProactive: false, action: { type: 'nudge', label: '发送邮件', description: '收件人：wang.zong@startech.cn\n主题：关于合同 CT-2026-0847 的签署确认\n\n王总您好，关于 Q1 Branding 项目的法务审核...' }, timestamp: '10:27 AM' },
    ],
  },
  'q1-forecast': {
    title: 'Q1 Sales Forecast',
    steps: [
      { id: 1, tag: 'Collect', label: '收集各部门销售数据', description: '向 Jack（华东区）和 Zhanghua（华南区）发送数据收集请求', status: 'completed', actionRecord: '已发送数据收集邮件', actionLabel: '发送邮件', meta: '花费时间：1 天', time: '9:15 AM' },
      { id: 2, tag: 'Analyze', label: '等待数据汇总报告', description: '等待各区域负责人提交 Q1 销售数据和市场分析', status: 'active', actionRecord: '已发送催办消息给 Jack', actionLabel: '发送催办', meta: '预计：明天完成' },
      { id: 3, tag: 'Synthesize', label: '合并数据并生成预测模型', description: '将各区数据导入预测模型，生成 Q1 整体销售预测', status: 'pending', meta: '预计花费时间：2 天' },
      { id: 4, tag: 'Review', label: '与管理层对齐预测结论', description: '组织管理层会议，确认预测假设和结论', status: 'pending', meta: '预计花费时间：1 天' },
      { id: 5, tag: 'Report', label: '输出最终 Forecast 报告', description: '生成正式报告并分发给所有 stakeholder', status: 'pending' },
    ],
    messages: [
      { id: '1', role: 'assistant', type: 'text', content: 'Q1 Sales Forecast 任务已启动。我已向 Jack（华东区）和 Zhanghua（华南区）发送了数据收集请求邮件，要求他们在本周五前提交各自区域的 Q1 销售数据。', timestamp: '9:15 AM', isProactive: false },
      { id: '2', role: 'assistant', type: 'action', content: '已为你发送数据收集邮件：', isProactive: false, action: { type: 'send_email', label: '发送邮件', description: '收件人：jack@company.cn, zhanghua@company.cn\n主题：Q1 销售数据收集 — 请于周五前提交\n\n请提交各区域 Q1 销售数据及市场分析...' }, timestamp: '9:16 AM', isConfirmed: true },
      { id: '3', role: 'assistant', type: 'text', content: 'Zhanghua 已提交华南区数据，整体增长 12%，符合预期。但 Jack 的华东区数据尚未收到，已超过截止时间 24 小时。', timestamp: '2:30 PM', isProactive: true },
      { id: '4', role: 'user', type: 'text', content: 'Jack 那边什么情况？催一下', timestamp: '2:35 PM' },
      { id: '5', role: 'assistant', type: 'text', content: '已向 Jack 发送催办消息。根据他上次回复，华东区本季度有几个大客户合同还在确认中，可能需要额外 1 天整理数据。', timestamp: '2:36 PM', isProactive: false },
      { id: '6', role: 'assistant', type: 'text', content: '要不要我先用华南区数据和历史趋势生成一版初步预测？等 Jack 数据到了再更新。', timestamp: '2:37 PM', isProactive: true },
    ],
  },
  'design-audit': {
    title: 'Design System Audit',
    steps: [
      { id: 1, tag: 'Inventory', label: '盘点现有组件库', description: '梳理 Figma 组件库与代码实现的差异清单', status: 'completed', actionRecord: '已完成 86 个组件的盘点', actionLabel: '盘点组件', meta: '花费时间：3 天', time: '11:00 AM' },
      { id: 2, tag: 'Align', label: '组建审核群聊', description: '拉通设计、前端、产品相关人员建立协作群组', status: 'active', actionRecord: '已生成群聊创建卡片', actionLabel: '创建群聊', actionType: 'create_group', actionMeta: { groupName: 'Design System Audit 走查群', members: [{ name: '你', avatar: 'https://i.pravatar.cc/40?u=me', role: 'Owner' }, { name: '陈磊', avatar: 'https://i.pravatar.cc/40?u=chenlei', role: '前端' }, { name: '王芳', avatar: 'https://i.pravatar.cc/40?u=wangfang', role: '设计' }, { name: '李明', avatar: 'https://i.pravatar.cc/40?u=liming', role: '产品' }] }, meta: '预计：今天完成' },
      { id: 3, tag: 'Review', label: '逐模块走查并标记问题', description: '对每个模块进行设计走查，记录不一致项', status: 'pending', meta: '预计花费时间：5 天' },
      { id: 4, tag: 'Fix', label: '修复并更新组件规范', description: '根据走查结果修复组件，更新设计规范文档', status: 'pending', meta: '预计花费时间：3 天' },
      { id: 5, tag: 'Report', label: '输出审核报告', description: '生成最终审核报告，包含改进建议和后续计划', status: 'pending' },
    ],
    messages: [
      { id: '1', role: 'assistant', type: 'text', content: '组件盘点已完成，共梳理 86 个组件。其中 23 个存在 Figma 与代码实现不一致，14 个缺少暗色模式适配。建议尽快拉通相关人员进行走查。', timestamp: '11:00 AM', isProactive: false },
      { id: '2', role: 'user', type: 'text', content: '好的，先建个群把相关人拉进来', timestamp: '11:05 AM' },
            { id: '3', role: 'assistant', type: 'action', content: '已为你准备好群聊创建方案：', isProactive: false, action: { type: 'create_group', label: '创建群聊', description: 'Hi all，本群用于 Design System 组件走查协作。本次审核共涉及 86 个组件，重点关注 Figma 与代码实现不一致 (23个) 和暗色模式适配 (14个)。走查计划将于群内同步，请大家留意。', groupName: 'Design System Audit 走查群', members: [{ name: '你', avatar: 'https://i.pravatar.cc/40?u=me', role: 'Owner' }, { name: '陈磊', avatar: 'https://i.pravatar.cc/40?u=chenlei', role: '前端' }, { name: '王芳', avatar: 'https://i.pravatar.cc/40?u=wangfang', role: '设计' }, { name: '李明', avatar: 'https://i.pravatar.cc/40?u=liming', role: '产品' }] }, timestamp: '11:06 AM' },
    ],
  },
  'product-strategy': {
    title: 'Product Strategy Alignment',
    steps: [
      { id: 1, tag: 'Research', label: '收集竞品分析数据', description: '向 Sarah 发送竞品分析数据收集请求', status: 'completed', actionRecord: '已发送分析框架给 Sarah', actionLabel: '发送邮件', meta: '花费时间：1 天', time: '3:00 PM' },
      { id: 2, tag: 'Wait', label: '等待 Sarah 竞品分析', description: '等待 Sarah 提交竞品分析报告，包含市场定位和功能对比', status: 'active', actionRecord: '已发送一次催办', actionLabel: '发送催办', meta: '预计：明天完成' },
      { id: 3, tag: 'Synthesize', label: '整合分析并形成策略建议', description: '结合内部数据和竞品分析，输出产品策略建议', status: 'pending', meta: '预计花费时间：2 天' },
      { id: 4, tag: 'Align', label: '与管理层对齐策略方向', description: '组织策略对齐会议，确认 Q2 产品方向', status: 'pending', meta: '预计花费时间：1 天' },
      { id: 5, tag: 'Plan', label: '输出 Q2 产品路线图', description: '基于确认的策略方向，制定详细的产品路线图', status: 'pending' },
    ],
    messages: [
      { id: '1', role: 'assistant', type: 'text', content: '产品策略对齐任务已启动。我已向 Sarah 发送了竞品分析框架文档，包含 5 个核心维度：市场定位、功能矩阵、定价策略、用户口碑、技术架构。', timestamp: '3:00 PM', isProactive: false },
      { id: '2', role: 'assistant', type: 'action', content: '已为你发送竞品分析框架：', isProactive: false, action: { type: 'send_email', label: '发送邮件', description: '收件人：sarah@company.cn\n主题：Q2 竞品分析框架 — 请于周三前提交\n\n请按照附件框架完成主要竞品的分析...' }, timestamp: '3:01 PM', isConfirmed: true },
      { id: '3', role: 'user', type: 'text', content: 'Sarah 那边进度怎么样？', timestamp: '4:20 PM' },
      { id: '4', role: 'assistant', type: 'text', content: 'Sarah 昨天提到已完成 3 个竞品的分析，还剩 2 个。预计明天下午能交付完整报告。要不要我帮你先看一下已完成部分的初步结论？', timestamp: '4:21 PM', isProactive: false },
      { id: '5', role: 'assistant', type: 'text', content: '另外我注意到竞品 A 最近发布了新版本，可能需要 Sarah 补充分析。要不要我通知她？', timestamp: '4:22 PM', isProactive: true },
    ],
  },
  'resume-screening': {
    title: 'Initial Resume Screening',
    steps: [
      { id: 1, tag: 'Collect', label: '收集简历池', description: '从各招聘渠道汇总候选人简历', status: 'completed', actionRecord: '已收集 42 份简历', actionLabel: '收集简历', meta: '花费时间：2 天', time: '9:00 AM' },
      { id: 2, tag: 'Screen', label: 'AI 初筛简历', description: '基于岗位要求自动筛选匹配度高的简历', status: 'active', actionRecord: 'AI 正在筛选中', actionLabel: '筛选简历', meta: '预计：2 小时内完成' },
      { id: 3, tag: 'Review', label: '人工复核 AI 推荐', description: '对 AI 推荐的候选人进行人工二次审核', status: 'pending', meta: '预计花费时间：1 天' },
      { id: 4, tag: 'Schedule', label: '安排面试', description: '向通过初筛的候选人发送面试邀请', status: 'pending', meta: '预计花费时间：2 天' },
      { id: 5, tag: 'Report', label: '输出筛选报告', description: '汇总筛选结果，输出候选人评估报告', status: 'pending' },
    ],
    messages: [
      { id: '1', role: 'assistant', type: 'text', content: '已从 Boss 直聘、猎聘、内推渠道共收集 42 份简历。目标岗位：高级前端工程师，核心要求：3 年以上 React 经验、熟悉 TypeScript。', timestamp: '9:00 AM', isProactive: false },
      { id: '2', role: 'assistant', type: 'text', content: '正在进行 AI 初筛，目前已处理 28/42 份。初步结果：8 份高度匹配、12 份基本匹配、8 份不匹配。预计 2 小时内完成全部筛选。', timestamp: '11:30 AM', isProactive: true },
      { id: '3', role: 'user', type: 'text', content: '高度匹配的那 8 份先发给我看看', timestamp: '11:35 AM' },
      { id: '4', role: 'assistant', type: 'action', content: '已为你生成高匹配候选人摘要：', isProactive: false, action: { type: 'generate_doc', label: '生成文档', description: '候选人摘要报告\n\n1. 张伟 — 5年经验，现任字节跳动前端\n2. 李娜 — 4年经验，React + TS 全栈\n3. 王浩 — 3年经验，开源贡献者\n...\n共 8 人，详见附件' }, timestamp: '11:36 AM' },
      { id: '5', role: 'assistant', type: 'text', content: '这 8 位候选人中有 3 位目前处于离职状态，建议优先安排。需要我帮你发面试邀请吗？', timestamp: '11:37 AM', isProactive: true },
    ],
  },
};

// Workplan steps for the improvement card scenario
const IMPROVEMENT_WORKPLAN_STEPS = [
  { id: 1, tag: 'Audit', label: '盘点现有三端交互差异', description: '梳理 Web、iOS、Android 三端当前的交互规范差异，建立对照清单' },
  { id: 2, tag: 'Standard', label: '制定跨端设计规范', description: '基于差异清单，输出统一的跨端交互设计规范文档，明确各端共性与差异化策略' },
  { id: 3, tag: 'Review', label: '建立前置设计评审机制', description: '在需求评审阶段增加跨端一致性检查环节，指定评审责任人和通过标准' },
  { id: 4, tag: 'Tooling', label: '搭建自动化检测工具', description: '接入设计走查工具或自定义脚本，自动对比三端 UI 还原度和交互一致性' },
  { id: 5, tag: 'Pilot', label: '选取试点项目验证', description: '在 Flow 改版项目中试运行新流程，收集反馈并迭代优化' },
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

      const actionRecordMap: Record<string, string> = {
        'q1-forecast': '已向 Jack 发送催办消息',
        'design-audit': '已创建走查群聊',
        'contract': '已向王总发送催办邮件',
      };

      setSteps(prev => prev.map(s =>
        s.id === 2 ? { ...s, status: 'completed', actionRecord: actionRecordMap[chatId] || '已执行', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } :
        s.id === 3 ? { ...s, status: 'active' } : s
      ));

      const followUpMap: Record<string, string> = {
        'q1-forecast': '催办消息已发送。我会持续关注 Jack 的回复。下一步我们将合并数据并生成预测模型。',
        'design-audit': '群聊已创建，走查计划已自动发送至群内。下一步将进入逐模块走查阶段。',
        'contract': '邮件已发送。我会持续关注对方的回复情况。下一步我们将评估工作量并制定排期。',
      };

      const followUp: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        type: 'text',
        content: followUpMap[chatId] || '操作已完成。',
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
                              Flow Plan
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

                    {/* AI follow-up after approval */}
                    {workplanApproved && (
                      <>
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
              {messages.filter(msg => msg.type !== 'divider').map((msg) => (
                <div key={msg.id} className={`w-full flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {(
                    <div className={`w-full ${msg.role === 'user' ? 'max-w-[80%]' : ''}`}>
                    {/* Message Content */}
                    {msg.role === 'user' ? (
                      <div className="w-fit ml-auto px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed font-semibold bg-[#D6E4FF] text-[#1a2a4a] rounded-tr-none">
                        {msg.content}
                      </div>
                    ) : (
                      <div className={`relative ${msg.isProactive ? 'bg-purple-50/50 border border-purple-100/50 rounded-2xl px-4 py-4 mb-2' : 'px-0.5 py-1 pl-3'}`}>
                        {msg.isProactive && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-md bg-purple-100 flex items-center justify-center">
                              <Lightbulb className="w-3 h-3 text-purple-600 fill-purple-600" />
                            </div>
                            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">AI initiated</span>
                          </div>
                        )}
                        <div className={`text-[14px] leading-[1.6] font-medium tracking-tight ${msg.isProactive ? 'text-purple-900/80' : 'text-black'}`}>
                          {msg.content}
                        </div>
                      </div>
                    )}

                    {/* Action Cards */}
                    {msg.type === 'action' && msg.action && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 border rounded-2xl p-5 w-full relative overflow-hidden transition-all bg-orange-50/50 border-orange-200 shadow-black/[0.03] shadow-lg"
                      >
                        {/* Top Accent Bar */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-orange-400" />

                        {/* Header */}
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-gray-100">
                              <Zap className="w-5 h-5 text-orange-500" />
                            </div>
                            <div>
                              <span className="text-[9px] font-bold uppercase tracking-[0.15em] block mb-0.5 text-orange-500">
                                {msg.isConfirmed ? 'Executed' : 'Proposed Action'}
                              </span>
                              <span className="text-[15px] font-bold text-black leading-none tracking-tight">
                                {msg.action.label}
                              </span>
                            </div>
                          </div>
                          <button className="p-2 text-black/20 active:text-black transition-colors">
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="mb-5">
                          {msg.action.type === 'nudge' ? (
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Recipient</span>
                                  <span className="text-[13px] font-medium text-black break-all">wang.zong@startech.cn</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Subject</span>
                                  <span className="text-[13px] font-medium text-black leading-snug">合同 CT-2026-0847 签署确认</span>
                                </div>
                              </div>
                              <p className="text-[13px] text-gray-600 leading-relaxed font-medium whitespace-pre-line">
                                王总您好，{"\n"}上周发送的合作合同（编号 CT-2026-0847），请您在方便时审阅并完成签署。如有条款需要沟通，请随时联系我们。{"\n"}谢谢！
                              </p>
                            </div>
                          ) : msg.action.type === 'create_group' && msg.action.members ? (
                            <div className="space-y-3">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Group Name</span>
                                <span className="text-[13px] font-semibold text-black">{msg.action.groupName}</span>
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Members {msg.action.members.length}</span>
                                <div className="flex items-center">
                                  <div className="flex -space-x-2">
                                    {msg.action.members.map((member, i) => (
                                      <img key={i} src={member.avatar} className="w-8 h-8 rounded-full object-cover border-2 border-white" style={{ zIndex: msg.action!.members!.length - i }} />
                                    ))}
                                  </div>
                                  <span className="text-[12px] font-medium text-gray-500 ml-2.5">{msg.action.members.map(m => m.name).join('、')}</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-0.5 mt-1">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Opening Message</span>
                                <p className="text-[12px] text-gray-500 font-medium leading-relaxed">{msg.action.description}</p>
                              </div>
                            </div>
                          ) : (
                            <p className="whitespace-pre-wrap text-[13px] text-gray-600 font-medium leading-relaxed line-clamp-4">
                              {msg.action.description}
                            </p>
                          )}
                        </div>

                        {/* Footer Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          {msg.isConfirmed ? (
                            <div className="col-span-2 py-2.5 rounded-md text-[13px] font-semibold flex items-center justify-center gap-1.5 bg-gray-100 text-gray-500">
                              <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                              Executed
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => handleConfirm(msg.id)}
                                disabled={isConfirming === msg.id}
                                className="py-2.5 rounded-md text-[13px] font-semibold transition-all active:scale-[0.97] text-white bg-orange-400 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
                              >
                                {isConfirming === msg.id ? (
                                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : 'Confirm'}
                              </button>
                              <button className="py-2.5 rounded-md text-[13px] font-semibold transition-all active:scale-[0.97] bg-gray-100 text-gray-600 active:bg-gray-200">
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
              <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4.5 h-4.5 text-gray-500" strokeWidth={2.5} />
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
                              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                              </div>
                            ) : step.status === 'active' ? (
                              <div className="w-6 h-6 rounded-full border border-dashed border-gray-300 flex items-center justify-center bg-white shadow-sm">
                                <div className="w-2 h-2 rounded-full bg-black" />
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
                                Step {idx + 1}
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

                            {step.actionRecord ? (
                              <div className="mt-4 p-3 bg-orange-50/50 rounded-xl border border-orange-200 flex items-center gap-3 shadow-sm shadow-black/[0.02]">
                                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0">
                                  <Zap className="w-5 h-5 text-orange-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] block text-orange-500 leading-none mb-0.5">
                                    AI Action
                                  </span>
                                  <span className="text-[13px] font-semibold text-black leading-none">{step.actionLabel || step.actionRecord}</span>
                                </div>
                              </div>
                            ) : null}

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
