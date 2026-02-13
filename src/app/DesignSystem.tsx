import React from 'react';
import {
  TrendingUp, UserSearch, FileCheck, Layers, Target as TargetIcon,
  BookOpen, ArrowRight, Sparkles, Zap, Lightbulb, Check, Mail,
  Users, ChevronDown, ListTree, Maximize2, ChevronLeft
} from 'lucide-react';

const TagDemo = ({ tag, style }: { tag: string; style: string }) => (
  <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${style}`}>{tag}</span>
);

const DesignSystem = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-black" style={{ background: '#fafafa' }}>
    <div className="p-6 sm:p-12 max-w-5xl mx-auto">
      {/* Title */}
      <div className="mb-10 sm:mb-16">
        <h1 className="text-[28px] sm:text-[40px] font-bold tracking-tighter leading-none">UI Language System for AI Chat Behaviors</h1>
      </div>

      {/* ============================================ */}
      {/* SECTION 1: Task Status System */}
      {/* ============================================ */}
      <section className="mb-20">
        <div className="mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">01</span>
          <h2 className="text-[24px] font-bold tracking-tight mt-1">Work A — Work Card Status</h2>
          <p className="text-[14px] text-gray-500 font-medium mt-1">AI 自驱任务的三种不同状态</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Design Rationale</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h5 className="text-[13px] font-bold text-black mb-1">AI 做事的视角：阻塞在谁</h5>
              <p className="text-[12px] text-gray-500 leading-relaxed">三个状态回答同一个问题 — "这件事现在卡在谁手上"。Pending = 他人，Actioning = AI 自己，Awaiting = 我（用户）。不混入"行动类型"（如确认/审批），保持认知一致性。</p>
            </div>
            <div>
              <h5 className="text-[13px] font-bold text-black mb-1">颜色即信号</h5>
              <ul className="space-y-1.5 mt-2">
                <li className="text-[12px] text-gray-500 leading-relaxed flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 shrink-0" />
                  <span>琥珀 = 被动等待（偏暖/警示）</span>
                </li>
                <li className="text-[12px] text-gray-500 leading-relaxed flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                  <span>绿 = AI 在运行（正常/确认后的反馈色一致）</span>
                </li>
                <li className="text-[12px] text-gray-500 leading-relaxed flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mt-1 shrink-0" />
                  <span>蓝 = 等你决策（与 AI Action 蓝色系呼应）</span>
                </li>
              </ul>
              <p className="text-[12px] text-gray-500 leading-relaxed mt-2">用户不用读文字就能快速扫描任务分布。</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Pending */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-[14px] font-semibold text-black truncate pr-2">Q1 Sales Forecast</h4>
                  <TagDemo tag="Pending" style="bg-amber-50 text-amber-600" />
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[12px] text-gray-400 font-medium">等 Jack、Zhanghua 的数据汇总报告</span>
                  <div className="flex shrink-0 -space-x-1.5">
                    <img src="https://i.pravatar.cc/40?u=jack" className="w-4.5 h-4.5 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/40?u=zhanghua" className="w-4.5 h-4.5 rounded-full border-2 border-white" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-black">等待他人的行动</h4>
              <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">任务阻塞在某个协作者身上。卡片会显示相关人员的头像，明确告知用户"卡在谁那里"。</p>
            </div>
          </div>

          {/* Actioning */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-[14px] font-semibold text-black truncate pr-2">Resume Screening</h4>
                  <TagDemo tag="Actioning" style="bg-emerald-50 text-emerald-600" />
                </div>
                <span className="text-[12px] text-gray-400 font-medium mt-1 block">AI 正在筛选 42 份简历</span>
              </div>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-black">AI 正在执行</h4>
              <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">AI 正在自主处理中，无需用户介入。绿色 = 正在运行、一切正常。</p>
            </div>
          </div>

          {/* Awaiting */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-[14px] font-semibold text-black truncate pr-2">Design System Audit</h4>
                  <TagDemo tag="Awaiting" style="bg-blue-50 text-blue-600" />
                </div>
                <span className="text-[12px] text-gray-400 font-medium mt-1 block">AI 完成了 pitch deck</span>
              </div>
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-black">等待你的决策</h4>
              <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">AI 完成了阶段性工作，球在用户手上。蓝色与 AI Action 蓝色系呼应。</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-8">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Sorting Rule</h4>
          <div className="flex items-center gap-3">
            <TagDemo tag="Awaiting" style="bg-blue-50 text-blue-600" />
            <ArrowRight className="w-3 h-3 text-gray-300" />
            <TagDemo tag="Pending" style="bg-amber-50 text-amber-600" />
            <ArrowRight className="w-3 h-3 text-gray-300" />
            <TagDemo tag="Actioning" style="bg-emerald-50 text-emerald-600" />
          </div>
          <p className="text-[12px] text-gray-500 mt-3 leading-relaxed">Recent 列表按紧急度排序：需要用户决策的排最前，其次是等待他人，最后是 AI 自行处理中的任务。</p>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2: Workplan Panel */}
      {/* ============================================ */}
      <section className="mb-20">
        <div className="mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">02</span>
          <h2 className="text-[24px] font-bold tracking-tight mt-1">Work B — Workplan Panel</h2>
          <p className="text-[14px] text-gray-500 font-medium mt-1">右侧滑出的工作计划面板 — 结构化展示 SOP 执行进度</p>
        </div>

        <div className="space-y-6">
          {/* Row 1: Step + TANKA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Step */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5">Step</h4>
              <div className="space-y-4">
                {[
                  { id: 1, label: '盘点现有三端交互差异', desc: '梳理 Web、iOS、Android 三端当前的交互规范差异，建立对照清单' },
                  { id: 2, label: '制定跨端设计规范', desc: '输出统一的跨端交互设计规范文档，明确各端共性与差异化策略' },
                  { id: 3, label: '建立前置设计评审机制', desc: '在需求评审阶段增加跨端一致性检查环节' },
                  { id: 4, label: '搭建自动化检测工具', desc: '接入设计走查工具，自动对比三端 UI 还原度' },
                  { id: 5, label: '选取试点项目验证', desc: '在改版项目中试运行新流程，收集反馈并迭代' },
                  { id: 6, label: '输出总结报告与推广方案', desc: '总结试点效果，制定全团队推广计划' },
                ].map((step) => (
                  <div key={step.id} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-black text-gray-500">{step.id}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[13px] font-bold text-black leading-tight">{step.label}</h5>
                      <p className="text-[12px] text-gray-400 leading-relaxed mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">每个 Workplan 由具体的 Step 组成，Step 有序号、语义化 tag 和执行描述，是 AI 拆解任务后的最小可执行单元。</p>
            </div>

            {/* TANKA Stage Mapping */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5">TANKA Stage Mapping</h4>
              <div className="space-y-3">
                {[
                  { letter: 'T', name: 'Topic', desc: '明确主题与目标' },
                  { letter: 'A', name: 'Analyze', desc: '分析现状与约束' },
                  { letter: 'N', name: 'Normalize', desc: '对齐标准与规范' },
                  { letter: 'K', name: 'Kickoff', desc: '启动执行' },
                  { letter: 'A', name: 'Assessment', desc: '复盘与评估' },
                ].map((stage, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center text-[11px] font-black">{stage.letter}</span>
                    <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-black w-24">{stage.name}</span>
                    <span className="text-[12px] text-gray-400 font-medium">{stage.desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">TANKA 是工作计划的阶段框架，每个 Stage 在聊天流中作为 divider 出现，在面板中作为结构化索引，将非结构化对话映射到结构化流程。</p>
            </div>
          </div>

          {/* Row 2: Step Status Icons + AI Action Record */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Step Status Icons */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5">Step Status Icons</h4>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                    <Check className="w-3.5 h-3.5 text-[#007aff]" strokeWidth={3} />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-black">Completed</span>
                    <p className="text-[11px] text-gray-500">蓝色勾 + 淡蓝背景</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border border-dashed border-gray-300 flex items-center justify-center bg-white shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#007aff]" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-black">Active</span>
                    <p className="text-[11px] text-gray-500">虚线圆 + 蓝色圆点</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border border-dashed border-gray-200 bg-white" />
                  <div>
                    <span className="text-[13px] font-bold text-black">Pending</span>
                    <p className="text-[11px] text-gray-500">空虚线圆</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Action Record */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5">AI Action Record</h4>
              <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <Zap className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold uppercase tracking-widest text-blue-500 leading-none">
                      AI Action
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 tabular-nums uppercase tracking-widest">10:20 AM</span>
                  </div>
                  <span className="text-[14px] font-semibold text-black leading-none mt-px">创建群聊</span>
                </div>
              </div>
              <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">每个步骤完成时，AI 执行的行动会被记录在对应步骤下，形成可追溯的操作历史。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 3: Chat UI Elements */}
      {/* ============================================ */}
      <section className="mb-20">
        <div className="mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">03</span>
          <h2 className="text-[24px] font-bold tracking-tight mt-1">Work C — Chat UI Elements</h2>
          <p className="text-[14px] text-gray-500 font-medium mt-1">对话中的四种信息类型 — 从轻量文字到可操作卡片</p>
        </div>

        <div className="space-y-6">
          {/* User Message */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-end gap-2">
                  <div className="w-fit px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed font-semibold bg-gray-100 text-black rounded-tr-none border border-gray-100">
                    这个工作的进度目前到底怎么样了？
                  </div>
                  <div className="w-fit px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed font-semibold bg-gray-100 text-black rounded-tr-none border border-gray-100">
                    法务那边卡了多久了？
                  </div>
                  <div className="w-fit px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed font-semibold bg-gray-100 text-black rounded-tr-none border border-gray-100">
                    帮我催一下王总
                  </div>
                </div>
              </div>
              <div className="sm:w-48 shrink-0">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">User Message</span>
                <p className="text-[12px] text-gray-500 mt-2 leading-relaxed">用户消息靠右对齐，灰色气泡底色，右上角圆角缺口。视觉权重最轻，让 AI 回复成为焦点。</p>
              </div>
            </div>
          </div>

          {/* AI Response */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="px-0.5 py-1">
                  <div className="text-[14px] leading-[1.6] font-medium text-black tracking-tight">
                    目前总体进度为 68%。关键路径上的『法务审核』环节停滞在 12%，已导致后续市场投放计划顺延 48 小时。
                  </div>
                </div>
              </div>
              <div className="sm:w-48 shrink-0">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">AI Response</span>
                <p className="text-[12px] text-gray-500 mt-2 leading-relaxed">AI 回复靠左，无气泡容器，直接平铺文字。视觉上更"原生"，减少对话的拥挤感。</p>
              </div>
            </div>
          </div>

          {/* AI Proactive */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="px-0.5 py-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-purple-50 flex items-center justify-center">
                      <Lightbulb className="w-3 h-3 text-purple-500 fill-purple-500" />
                    </div>
                    <span className="text-[12px] font-bold text-purple-600 uppercase tracking-widest">AI initiated</span>
                  </div>
                  <div className="text-[14px] leading-[1.6] font-medium text-black tracking-tight">
                    已过去 48 小时，王总仍未回复催办邮件。要不要我再发一条微信消息催一下？
                  </div>
                </div>
              </div>
              <div className="sm:w-48 shrink-0">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">AI Initiated</span>
                <p className="text-[12px] text-gray-500 mt-2 leading-relaxed">AI 主动发起的消息（非用户触发）。紫色标签明确标注来源，让用户知道这是 AI 的判断而非指令的回应。</p>
              </div>
            </div>
          </div>

          {/* Stage Divider */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="flex-1 py-2">
                <div className="flex items-center gap-4 w-full opacity-40">
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-black whitespace-nowrap">
                    Analyze
                  </span>
                  <div className="h-[1px] flex-1 bg-gray-300" />
                </div>
              </div>
              <div className="sm:w-48 shrink-0">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Stage Divider</span>
                <p className="text-[12px] text-gray-500 mt-2 leading-relaxed">TANKA 阶段分割线。在聊天流中标记当前进入了哪个 Stage，把非结构化对话锚定到结构化流程节点上。</p>
              </div>
            </div>
          </div>

          {/* AI Action Card — Pre-confirm & Confirmed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Pre-confirm State */}
            <div className="space-y-3">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-lg shadow-black/[0.03] w-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-100">
                      <Zap className="w-4.5 h-4.5 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold uppercase tracking-widest block text-blue-500 leading-none">
                        AI Action
                      </span>
                      <span className="text-[14px] font-semibold text-black leading-none mt-px">发送邮件</span>
                    </div>
                  </div>
                  <button className="p-2 -mr-1 -mt-1 text-gray-300 rounded-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

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
                    <p className="text-[13px] text-gray-600 leading-relaxed font-medium whitespace-pre-line">王总您好，{"\n\n"}上周发送的合作合同（编号 CT-2026-0847），请您在方便时审阅并完成签署。如有条款需要沟通，请随时联系我们。{"\n\n"}谢谢！</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2.5 bg-black text-white rounded-lg text-[12px] font-bold">
                    Confirm
                  </button>
                  <button className="py-2.5 bg-gray-50 text-black rounded-lg text-[12px] font-bold">
                    Dismiss
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-black">AI Action Card · 确认前</h4>
                <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">AI 准备好行动方案后，以结构化卡片呈现完整内容，等待用户 Confirm 或 Dismiss。Human-in-the-Loop 的核心交互。</p>
              </div>
            </div>

            {/* Confirmed State */}
            <div className="space-y-3">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-lg shadow-black/[0.03] w-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-100">
                      <Zap className="w-4.5 h-4.5 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold uppercase tracking-widest block text-blue-500 leading-none">
                        AI Action
                      </span>
                      <span className="text-[14px] font-semibold text-black leading-none mt-px">发送邮件</span>
                    </div>
                  </div>
                  <button className="p-2 -mr-1 -mt-1 text-gray-300 rounded-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

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
                    <p className="text-[13px] text-gray-600 leading-relaxed font-medium whitespace-pre-line">王总您好，{"\n\n"}上周发送的合作合同（编号 CT-2026-0847），请您在方便时审阅并完成签署。如有条款需要沟通，请随时联系我们。{"\n\n"}谢谢！</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 py-2.5 bg-emerald-50 text-emerald-600 rounded-lg text-[12px] font-bold flex items-center justify-center gap-2">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    Confirmed and sent
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-black">AI Action Card · 确认后</h4>
                <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">用户确认后，双按钮合并为绿色横幅，不可逆操作，给予明确的执行反馈。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center text-[11px] text-gray-300 font-medium pb-8">
        Visual Language System for Chat Behaviors · Internal Document
      </div>
    </div>
    </div>
  );
};

export default DesignSystem;
