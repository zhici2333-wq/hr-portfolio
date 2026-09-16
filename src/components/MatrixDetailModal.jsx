import { useEffect, useState } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  AlertTriangle,
  Rocket,
  BookOpen,
  Cpu,
  TrendingUp,
  FileText,
  MessageCircle,
  Eye,
  Flame,
  Sparkles,
  MapPin,
  Calendar,
  Briefcase,
  Layers,
  BarChart3,
  Users,
  Play,
} from 'lucide-react'
import { projects, matrixDetail, matrixStages, BASE_URL } from '../data'
import { MetricCard } from './ProjectDetailModal'

const TAB_ICONS = [AlertTriangle, Rocket, BookOpen, Cpu]

function highlight(text, keys) {
  const out = []
  let keyIdx = 0
  for (const k of keys) {
    const idx = text.indexOf(k)
    if (idx < 0) continue
    if (idx > 0) out.push(text.slice(0, idx))
    out.push(<strong key={`b${keyIdx++}`}>{k}</strong>)
    text = text.slice(idx + k.length)
  }
  if (text) out.push(text)
  return out
}

/* ---------- 可视化 ①：全国门店分布图 ---------- */
function FragmentVisual() {
  return (
    <div className="mx-viz mx-viz--fragment">
      <div className="mx-viz-head">
        <span className="mx-viz-tag pixel-font">BEFORE</span>
        <h4>170+ 门店账号 · 各自为战</h4>
        <p>账号分散、无统一运营标准，门店质量参差不齐。</p>
      </div>
      <div className="mx-frag">
        <img
          className="mx-frag-img"
          src={`${BASE_URL}media/map/x11-map.png`}
          alt="X11 潮玩 全国门店分布"
          loading="lazy"
        />
      </div>
      <div className="mx-viz-legend">
        <span className="mx-legend-dot mx-legend-dot--dim" /> 无统一标准
        <span className="mx-legend-dot mx-legend-dot--warn" /> 质量参差
        <span className="mx-legend-dot mx-legend-dot--bad" /> 管理成本高
      </div>
    </div>
  )
}

/* ---------- 可视化 ②：从量到质（1-12 月趋势图）---------- */
function ColdstartVisual() {
  return (
    <div className="mx-viz mx-viz--coldstart">
      <div className="mx-viz-head">
        <span className="mx-viz-tag pixel-font">DURING</span>
        <h4>1-12 月产出趋势：量变带动质变</h4>
        <p>不同阶段的运营动作 → 数据曲线变化，每一步沉淀成可复制的 SOP。</p>
      </div>

      <div className="mx-trend">
        <img
          src={`${BASE_URL}media/trend_1-12.svg`}
          alt="1-12 月内容产出趋势：发布量 + 爆文量"
          className="mx-trend-svg"
          loading="lazy"
        />
      </div>
    </div>
  )
}

/* ---------- 可视化 ③：产品全生命周期 ---------- */
function ContentVisual() {
  return (
    <div className="mx-viz mx-viz--content">
      <div className="mx-viz-head">
        <span className="mx-viz-tag pixel-font">FRAMEWORK</span>
        <h4>产品全生命周期 · 内容模板体系</h4>
        <p>从单品模板升级为覆盖产品完整节点的创作方法论。</p>
      </div>
      <div className="mx-viz-image">
        <img
          src={`${BASE_URL}media/lifecycle-y2k-pink-800x530.jpg`}
          alt="产品全生命周期四阶段：初创期 / 成长期 / 成熟期 / 衰退期"
          loading="lazy"
        />
      </div>
    </div>
  )
}

/* ---------- 可视化 ④：Vibe Coding 自建系统 ---------- */
function VibeVisual() {
  const modules = [
    { icon: Sparkles, name: 'AI 内容审核', desc: '实时反馈 · 降低风险' },
    { icon: BarChart3, name: '激励自动核算', desc: '替代人工统计' },
    { icon: Eye, name: '数据看板', desc: '全链路透明可见' },
    { icon: Users, name: '钉钉 MCP 协同', desc: '流程自动化协同' },
  ]
  const shots = [
    { src: `${BASE_URL}media/system/dashboard.png`, alt: '数据看板：KOS 总人数 / 活跃人员 / 平台账号分布 / 区域账号分布 / 奖励结算', title: '数据看板' },
    { src: `${BASE_URL}media/system/ai-review.png`, alt: 'AI 自动审核：违规词 / 风险词 / 必要标签 / 格式规则 / 违规规则 / IP 角色名检测', title: 'AI 审核' },
    { src: `${BASE_URL}media/system/incentive.png`, alt: '奖励结算：短文奖 / 突破奖 / 先锋门店奖 / 先锋区经奖 规则说明', title: '激励核算' },
    { src: `${BASE_URL}media/system/store.png`, alt: '门店端：门店笔记列表 / 审核状态 / 问题详情 / 修改建议', title: '门店端' },
  ]
  const [activeShot, setActiveShot] = useState(null)

  useEffect(() => {
    if (activeShot == null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveShot(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [activeShot])

  return (
    <div className="mx-viz mx-viz--vibe">
      <div className="mx-viz-head">
        <span className="mx-viz-tag pixel-font">SYSTEM</span>
        <h4>KOS 门店矩阵管理系统</h4>
        <p>对接钉钉 MCP，审核 · 激励 · 分发全链路自动化。</p>
      </div>
      <div className="mx-sys">
        <div className="mx-sys-modules">
          {modules.map((m) => {
            const Icon = m.icon
            return (
              <div className="mx-sys-card" key={m.name}>
                <span className="mx-sys-card-icon">
                  <Icon size={20} />
                </span>
                <div className="mx-sys-card-body">
                  <b>{m.name}</b>
                  <span>{m.desc}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mx-sys-shot">
          <span className="mx-sys-shot-label pixel-font">SYSTEM SCREENSHOTS · 系统界面实拍 · 点击放大</span>
          <div className="mx-sys-shot-grid">
            {shots.map((s) => (
              <button
                type="button"
                className="mx-sys-shot-cell"
                key={s.src}
                onClick={() => setActiveShot(s)}
                aria-label={`放大查看 ${s.title}`}
              >
                <img src={s.src} alt={s.alt} loading="lazy" />
                <span className="mx-sys-shot-zoom" aria-hidden="true">⤢</span>
                <figcaption>{s.title}</figcaption>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeShot && (
        <div
          className="mx-shot-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveShot(null)}
        >
          <button
            type="button"
            className="mx-shot-lightbox-close"
            onClick={(e) => { e.stopPropagation(); setActiveShot(null) }}
            aria-label="关闭放大"
          >
            <X size={22} />
          </button>
          <figure
            className="mx-shot-lightbox-figure"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={activeShot.src} alt={activeShot.alt} />
            <figcaption>{activeShot.title} · 点击背景或按 Esc 关闭</figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}

const STAGE_VISUALS = [FragmentVisual, ColdstartVisual, ContentVisual, VibeVisual]

/* ---------- 案例卡片 ---------- */
function CaseCard({ c, onOpen }) {
  return (
    <button className="mx-case" onClick={onOpen}>
      <div className="mx-case-cover">
        <img src={c.poster} alt={c.title} loading="lazy" />
        <span className="mx-case-play">
          <Play size={22} fill="currentColor" />
        </span>
        <span className="mx-case-like pixel-font">赞 {c.like}</span>
      </div>
      <div className="mx-case-body">
        <b className="mx-case-title">{c.title}</b>
        <p className="mx-case-desc">{c.desc}</p>
        <span className="mx-case-more">
          查看创作思路 <ArrowUpRight size={14} />
        </span>
      </div>
    </button>
  )
}

/* ---------- 顶部 KPI ---------- */
function HeroKPI() {
  const items = [
    { v: '170+', k: '门店矩阵', icon: MapPin, tone: 'rose' },
    { v: '4.7 万', k: '原创笔记', icon: FileText, tone: 'bean' },
    { v: '969', k: '平台爆文', icon: Flame, tone: 'rose' },
    { v: '750 W', k: '矩阵曝光', icon: Eye, tone: 'cyan' },
  ]
  return (
    <div className="mx-hero-kpis">
      {items.map((it) => {
        const Icon = it.icon
        return (
          <div className={`mx-hero-kpi mx-hero-kpi--${it.tone}`} key={it.k}>
            <span className="mx-hero-kpi-icon">
              <Icon size={16} />
            </span>
            <b className="mx-hero-kpi-v">{it.v}</b>
            <span className="mx-hero-kpi-k">{it.k}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function MatrixDetailModal({ project, onClose, onNavigate, onOpenCase }) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    setStage(0)
  }, [project?.id])

  if (!project) return null

  const detail = matrixDetail
  const idxInList = projects.findIndex((p) => p.id === project.id)
  const prevProject = projects[idxInList - 1]
  const nextProject = projects[idxInList + 1]
  const active = matrixStages[stage]
  const StageIcon = TAB_ICONS[stage]
  const StageVisual = STAGE_VISUALS[stage]
  const metaParts = (detail.meta || '').split('｜').map((s) => s.trim()).filter(Boolean)

  return (
    <div className="pd-modal mx-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="pd-panel mx-panel" onClick={(e) => e.stopPropagation()}>
        <button className="mx-close" onClick={onClose} aria-label="关闭详情">
          <X size={20} />
        </button>

        {/* ========== HERO ========== */}
        <header className="mx-hero mx-hero--no-cover">
          <div className="mx-hero-body">
            <div className="mx-hero-left">
              <div className="mx-hero-tags">
                {project.tags.map((t) => (
                  <span className="mx-hero-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="mx-hero-title">{project.title}</h2>
              <p className="mx-hero-tagline">{detail.tagline}</p>
            </div>
            <div className="mx-hero-right">
              <ul className="mx-hero-meta">
                {metaParts.map((m) => {
                  const [label, ...rest] = m.split('：')
                  const value = rest.join('：') || label
                  const Icon = m.includes('周期') ? Calendar : m.includes('范围') ? MapPin : m.includes('角色') ? Briefcase : Sparkles
                  return (
                    <li className="mx-hero-meta-item" key={m}>
                      <span className="mx-hero-meta-icon">
                        <Icon size={14} />
                      </span>
                      <span className="mx-hero-meta-k">{label || '信息'}</span>
                      <span className="mx-hero-meta-v">{value}</span>
                    </li>
                  )
                })}
              </ul>
              <HeroKPI />
            </div>
          </div>
        </header>

        {/* ========== 4 步时间轴 ========== */}
        <section className="mx-process">
          <div className="mx-section-head">
            <span className="pixel-font">PROCESS · 4 步拆解</span>
            <h3>从 0→1 的方法论</h3>
            <p>现状痛点 → 冷启动搭建 → 内容标准 → 系统提效，每一步沉淀可复制的 SOP。</p>
          </div>

          <div className="mx-process-rail">
            {matrixStages.map((s, i) => {
              const Icon = TAB_ICONS[i]
              const isActive = stage === i
              return (
                <button
                  key={s.id}
                  className={`mx-rail-step ${isActive ? 'is-active' : ''} ${i < stage ? 'is-done' : ''}`}
                  onClick={() => setStage(i)}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span className="mx-rail-no pixel-font">0{i + 1}</span>
                  <span className="mx-rail-icon">
                    <Icon size={14} />
                  </span>
                  <span className="mx-rail-label">{s.tab}</span>
                </button>
              )
            })}
          </div>

          <div className="mx-stage">
            <div className="mx-stage-text">
              <div className="mx-stage-head">
                <span className="mx-stage-icon">
                  <StageIcon size={20} />
                </span>
                <div>
                  <h4>{active.title}</h4>
                  <p>{active.sub}</p>
                </div>
              </div>
              <ul className="mx-points">
                {active.points.map((p, i) => (
                  <li className="mx-point" key={p.text}>
                    <span className="mx-point-no pixel-font">P0{i + 1}</span>
                    <p>{highlight(p.text, p.keys)}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mx-stage-visual">
              <StageVisual />
            </div>
          </div>
        </section>

        {/* ========== 数据看板 ========== */}
        <section className="mx-dashboards">
          <div className="mx-section-head">
            <span className="pixel-font">KEY NUMBERS · 核心数据</span>
            <h3>矩阵结果一览</h3>
            <p>{detail.note}</p>
          </div>
          <div className="mx-dashboards-grid">
            {detail.dashboards.map((d) => (
              <MetricCard key={d.label} d={d} />
            ))}
          </div>
        </section>

        {/* ========== 总结 + 导航 ========== */}
        <section className="mx-summary">
          <div className="mx-summary-quote">
            <Sparkles size={18} />
            <p>把分散的门店账号，沉淀成一套可落地、可复制、可持续放大的内容增长体系。</p>
          </div>

          <div className="pd-nav">
            {prevProject ? (
              <button className="pd-nav-btn" onClick={() => onNavigate(prevProject)}>
                <ChevronLeft size={18} /> 上一个：{prevProject.title}
              </button>
            ) : (
              <span />
            )}
            {nextProject ? (
              <button className="pd-nav-btn" onClick={() => onNavigate(nextProject)}>
                下一个：{nextProject.title} <ChevronRight size={18} />
              </button>
            ) : (
              <span />
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
