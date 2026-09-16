import { useEffect, useState } from 'react'
import {
  Play,
  ChevronLeft,
  ChevronRight,
  X,
  TrendingUp,
  FileText,
  MessageCircle,
  Eye,
  Flame,
  Zap,
  Heart,
  Star,
} from 'lucide-react'
import { projects, officialDetail, matrixDetail } from '../data'
import VideoCases from './VideoCases'

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

const iconMap = { trend: TrendingUp, doc: FileText, chat: MessageCircle, eye: Eye, spark: Flame }

export function MetricCard({ d }) {
  const Icon = iconMap[d.icon]
  const TRACK_H = 84
  const mineH = Math.round((d.mine / d.max) * TRACK_H)
  const peerH = Math.round((d.peer / d.max) * TRACK_H)
  return (
    <div className="metric-card">
      {Icon && (
        <span className="metric-icon">
          <Icon size={22} />
        </span>
      )}
      <div className="metric-label">{d.label}</div>
      <div className="metric-value">
        {d.value}
        {d.viz === 'ringBolt' && <Zap className="metric-bolt" size={20} />}
      </div>
      {d.viz ? (
        <>
          <p className="metric-desc">{d.desc}</p>
          {d.viz === 'progress' && (
            <div className="m-progress">
              <span className="m-progress-fill" />
              <FileText className="m-progress-icon" size={18} />
            </div>
          )}
          {d.viz === 'columns' && (
            <div className="m-columns">
              <span className="m-col-tag">爆文标签</span>
              <div className="m-col-bars">
                <i className="c1" style={{ height: '40%' }} />
                <i className="c2" style={{ height: '62%' }} />
                <i className="c3" style={{ height: '90%' }} />
              </div>
            </div>
          )}
          {d.viz === 'ringBolt' && (
            <div
              className="m-ring"
              style={{
                background: 'conic-gradient(#d96c8c 0 40%, #ee9fb5 40% 70%, #f7cddc 70% 100%)',
              }}
            >
              <Zap className="m-ring-zap" size={30} />
            </div>
          )}
          {d.viz === 'trend' && (
            <div className="m-trend">
              <svg viewBox="0 0 120 46" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M4 40 C 28 38, 44 30, 60 27 S 94 16, 116 8"
                  fill="none"
                  stroke="var(--rose)"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <circle cx="42" cy="31" r="2.5" fill="var(--rose)" />
                <circle cx="94" cy="15" r="2.5" fill="var(--rose)" />
              </svg>
              <MessageCircle className="m-trend-bub b1" size={16} />
              <MessageCircle className="m-trend-bub b2" size={16} />
            </div>
          )}
          {d.viz === 'stacks' && (
            <div className="m-stacks" aria-hidden="true">
              <span className="m-stack s3"><FileText size={14} /></span>
              <span className="m-stack s2"><FileText size={14} /></span>
              <span className="m-stack s1"><FileText size={14} /></span>
              <span className="m-stack s0"><FileText size={14} /></span>
              <span className="m-stack-tag">47,000+</span>
            </div>
          )}
          {d.viz === 'flames' && (
            <div className="m-flames" aria-hidden="true">
              <div className="m-flame-bars">
                <span className="m-flame-bar b1" />
                <span className="m-flame-bar b2" />
                <span className="m-flame-bar b3" />
              </div>
              <Flame className="m-flame-icon" size={26} />
              <span className="m-flame-count">969</span>
            </div>
          )}
          {d.viz === 'radar' && (
            <div className="m-radar" aria-hidden="true">
              <span className="m-radar-ring r3" />
              <span className="m-radar-ring r2" />
              <span className="m-radar-ring r1" />
              <Eye className="m-radar-eye" size={26} />
              <span className="m-radar-tag">750W</span>
            </div>
          )}
          {d.viz === 'social' && (
            <div className="m-social" aria-hidden="true">
              <span className="m-social-item m-social-like">
                <Heart size={18} fill="currentColor" />
                <small>赞</small>
              </span>
              <span className="m-social-item m-social-chat">
                <MessageCircle size={18} />
                <small>评</small>
              </span>
              <span className="m-social-item m-social-star">
                <Star size={18} fill="currentColor" />
                <small>藏</small>
              </span>
              <span className="m-social-badge">58W+</span>
            </div>
          )}
        </>
      ) : d.donut ? (
        <>
          <div
            className="metric-ring"
            style={{
              background: `conic-gradient(var(--rose) 0 ${d.donut[0].pct}%, #c9a3e0 ${d.donut[0].pct}% 100%)`,
            }}
          >
            <span className="metric-ring-center">
              {d.donut[0].pct}%<small>{d.donut[0].name}</small>
            </span>
          </div>
          <p className="metric-desc">{d.desc}</p>
        </>
      ) : d.mine != null ? (
        <>
          <div className="metric-bars">
            <div className="metric-bar-col metric-bar-col--mine">
              <span className="metric-bar-col-value">
                {d.mine}
                {d.unit}
              </span>
              <div className="metric-bar-col-track">
                <span className="metric-bar-col-fill" style={{ height: `${mineH}px` }} />
              </div>
              <span className="metric-bar-col-label">我</span>
            </div>
            <div className="metric-bar-col metric-bar-col--peer">
              <span className="metric-bar-col-value">
                {d.peer}
                {d.unit}
              </span>
              <div className="metric-bar-col-track">
                <span className="metric-bar-col-fill" style={{ height: `${peerH}px` }} />
              </div>
              <span className="metric-bar-col-label">同行</span>
            </div>
          </div>
          <p className="metric-desc">{d.desc}</p>
        </>
      ) : (
        <p className="metric-desc">{d.desc}</p>
      )}
    </div>
  )
}

export default function ProjectDetailModal({ project, onClose, onNavigate }) {
  const [caseOpen, setCaseOpen] = useState(false)

  useEffect(() => {
    setCaseOpen(false)
  }, [project?.id])

  if (!project) return null

  const detail = [officialDetail, matrixDetail].find((d) => d.id === project.id) || null
  const idxInList = projects.findIndex((p) => p.id === project.id)
  const prevProject = projects[idxInList - 1]
  const nextProject = projects[idxInList + 1]

  return (
    <div className="pd-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="pd-panel pixel-frame" onClick={(e) => e.stopPropagation()}>
        <div className="pixel-frame-inner pd-inner">
          <div className="pd-head">
            <div className="pd-head-left">
              <h2 className="pd-title">{project.title}</h2>
              {detail && <p className="pd-tagline">{detail.tagline}</p>}
            </div>
            <div className="pd-head-right">
              {detail?.cases?.length && (
                <button className="btn btn--pixel btn--primary pd-play" onClick={() => setCaseOpen(true)}>
                  <Play size={16} fill="currentColor" /> 播放案例视频
                </button>
              )}
              <button className="video-modal-close" onClick={onClose} aria-label="关闭详情">
                <X size={20} />
              </button>
            </div>
          </div>

          {detail && <div className="pd-meta">{detail.meta}</div>}

          {detail ? (
            <>
              <div className="pd-section-head">
                <h3>核心数据看板</h3>
                <span className="pixel-font">KEY NUMBERS</span>
              </div>
              <div className="pd-metrics-note">{detail.note}</div>
              <div className="pd-metrics">
                {detail.dashboards.map((d) => (
                  <MetricCard key={d.label} d={d} />
                ))}
              </div>

              <div className="pd-tags">
                {detail.tags.map((t) => (
                  <span key={t} className="pd-tag">
                    <i className="pd-tag-icon" />
                    {t}
                  </span>
                ))}
              </div>

              <div className="pd-points">
                {detail.points.map((pt) => (
                  <div key={pt.text} className="pd-point">
                    <span className="pd-point-no" />
                    <p>{highlight(pt.text, pt.keys)}</p>
                  </div>
                ))}
              </div>

              {detail.extra?.vibe && (
                <div className="pd-extra">
                  <h4>{detail.extra.vibe.heading}</h4>
                  <p>{detail.extra.vibe.text}</p>
                  <div className="vibe-shots">
                    {detail.extra.vibe.screenshots?.length ? (
                      detail.extra.vibe.screenshots.map((s) => <img key={s} src={s} alt="系统界面截图" />)
                    ) : (
                      <span className="vibe-shots-empty">系统界面截图待补充</span>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="pd-empty">完整项目拆解正在整理中，敬请期待。</div>
          )}

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
        </div>
      </div>

      {caseOpen && detail && <VideoCases cases={detail.cases} onClose={() => setCaseOpen(false)} />}
    </div>
  )
}
