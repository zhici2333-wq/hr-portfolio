import { useEffect, useRef, useState } from 'react'
import VideoCases from './VideoCases'
import { X, ChevronLeft, ChevronRight, Heart, Plus, Sparkles, ArrowRight } from 'lucide-react'
import { projects } from '../data'

const STAGE_TAGS = ['业务困境', '激励体系', '招募运营', '数据复盘']

const STAGE_BODIES = [
  {
    title: '业务困境',
    body:
      '传统广告内容生产成本高，新品上市节点缺乏真实种草笔记，难以快速触达精准用户群体。',
  },
  {
    title: '激励体系',
    body:
      '设计阶梯式激励：前期侧重发布数量快速培养创作者习惯，后期调整权重导向内容质量，筛选优质产出。',
  },
  {
    title: '招募运营',
    body:
      '48 场线上线下招募，覆盖小红书、抖音、B 站多渠道，沉淀 500+ 创作者社群，形成可持续的种草池。',
  },
  {
    title: '数据复盘',
    body:
      '周度数据复盘迭代内容方向，淘汰低质同质化内容，对优质爆文加热放大，形成可复用的内容 SOP。',
  },
]

const LEAD_METRICS = [
  { value: 2080, format: 'int', useGroup: true, suffix: null, k: '单次活动最高报名人数' },
  { value: 159, format: 'int', useGroup: false, suffix: 'W+', k: '话题总曝光' },
  { value: 23.2, format: 'dec', useGroup: false, suffix: '%', k: '内容爆文率' },
]

const SUB_METRICS = [
  { value: 48, format: 'int', useGroup: false, suffix: null, k: '场 · 累计招募活动' },
  { value: 185, format: 'int', useGroup: false, suffix: null, k: '篇 · 累计产出笔记' },
]

function useCountUp(target, { duration = 1000, decimals = 0, start = 0 } = {}) {
  const [val, setVal] = useState(start)
  const rafRef = useRef(null)
  const startTimeRef = useRef(null)
  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    startTimeRef.current = null
    setVal(start)
    const tick = (t) => {
      if (startTimeRef.current == null) startTimeRef.current = t
      const p = Math.min((t - startTimeRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(start + (target - start) * eased)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, decimals, start])
  return val
}

function formatNum(n, { format, useGroup, decimals }) {
  const v = format === 'dec' ? Number(n).toFixed(decimals) : Math.round(n).toString()
  if (!useGroup) return v
  const [intPart, decPart] = v.split('.')
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart ? `${grouped}.${decPart}` : grouped
}

function MetricValue({ metric }) {
  const decimals = metric.format === 'dec' ? 1 : 0
  const animated = useCountUp(metric.value, { duration: 1000, decimals })
  const display = formatNum(animated, { format: metric.format, useGroup: metric.useGroup, decimals })
  return (
    <b className="koc-data-v">
      <span>{display}</span>
      {metric.suffix && <sup>{metric.suffix}</sup>}
    </b>
  )
}

function SubMetricValue({ metric }) {
  const animated = useCountUp(metric.value, { duration: 1000 })
  const display = formatNum(animated, { format: metric.format, useGroup: metric.useGroup, decimals: 0 })
  return <b>{display}</b>
}

export default function KocReviewModal({ project, onClose, onNavigate }) {
  const [caseOpen, setCaseOpen] = useState(false)

  useEffect(() => {
    setCaseOpen(false)
  }, [project?.id])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (caseOpen) setCaseOpen(false)
        else onClose?.()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, caseOpen])

  if (!project) return null

  const idxInList = projects.findIndex((p) => p.id === project.id)
  const prevProject = projects[idxInList - 1]
  const nextProject = projects[idxInList + 1]

  return (
    <div className="koc-modal pd-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="koc-panel pd-panel pixel-frame" onClick={(e) => e.stopPropagation()}>
        <div className="pixel-frame-inner koc-inner">
          <span className="koc-deco koc-deco--tl" aria-hidden="true">
            <Plus size={14} />
            <Plus size={14} />
            <Plus size={14} />
          </span>
          <span className="koc-deco koc-deco--br" aria-hidden="true">
            <Heart size={14} fill="currentColor" />
            <Sparkles size={14} />
            <Plus size={14} />
          </span>

          <button className="koc-close video-modal-close" onClick={onClose} aria-label="关闭详情">
            <X size={20} />
          </button>

          <header className="koc-head">
            <span className="koc-eyebrow pixel-font">REVIEW · 2025.06 — 2027.07</span>
            <h2 className="koc-title">X11 KOC 矩阵项目复盘</h2>
            <p className="koc-tagline">
              <mark>0→1 搭建</mark>素人种草矩阵，<mark>极低成本的真实种草内容获取</mark>，形成可持续增长的 KOC 运营闭环。
            </p>
            {project.videos?.length > 0 && (
              <button
                type="button"
                className="koc-watch-btn pixel-font"
                onClick={() => setCaseOpen(true)}
              >
                播放案例视频
                <ArrowRight size={16} strokeWidth={2.4} />
              </button>
            )}
          </header>

          <div className="koc-body">
            <section className="koc-col koc-col--story">
              <span className="koc-col-label pixel-font">JOURNEY · 搭建过程</span>
              <ol className="koc-story">
                {STAGE_TAGS.map((tag, i) => (
                  <li className="koc-story-item" key={tag}>
                    <div className="koc-story-head">
                      <span className="koc-story-no pixel-font">0{i + 1}</span>
                      <b className="koc-story-title">{tag}</b>
                    </div>
                    <p className="koc-story-body">{STAGE_BODIES[i].body}</p>
                  </li>
                ))}
              </ol>
            </section>

            <aside className="koc-col koc-col--data">
              <div className="koc-data-card">
                <span className="koc-data-card-eyebrow pixel-font">CORE NUMBERS · 核心成果</span>
                <ul className="koc-data-list">
                  {LEAD_METRICS.map((m) => (
                    <li className="koc-data-item koc-data-item--lead" key={m.k}>
                      <MetricValue metric={m} />
                      <span className="koc-data-k">{m.k}</span>
                    </li>
                  ))}
                </ul>
                <ul className="koc-data-sub">
                  {SUB_METRICS.map((m) => (
                    <li key={m.k}>
                      <SubMetricValue metric={m} />
                      <span>{m.k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <div className="pd-nav">
            {prevProject ? (
              <button className="pd-nav-btn" onClick={() => onNavigate?.(prevProject)}>
                <ChevronLeft size={18} /> 上一个：{prevProject.title}
              </button>
            ) : (
              <span />
            )}
            {nextProject ? (
              <button className="pd-nav-btn" onClick={() => onNavigate?.(nextProject)}>
                下一个：{nextProject.title} <ChevronRight size={18} />
              </button>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>

      {caseOpen && project.videos?.length > 0 && (
        <VideoCases cases={project.videos} onClose={() => setCaseOpen(false)} />
      )}
    </div>
  )
}

