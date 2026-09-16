import { useEffect, useRef, useState } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Plus,
  Sparkles,
  Play,
  ArrowRight,
} from 'lucide-react'
import { projects } from '../data'
import VideoCases from './VideoCases'

const _ovVideos = projects.find((p) => p.id === 'guru-overseas')?.videos ?? []

const FLOW_STEPS = [
  '客户对接',
  'TC 脚本创意撰写',
  '外部摄影资源拓展',
  '拍摄细节统筹',
  '现场跟拍',
  '监督成片剪辑',
]

const PROJECTS = [
  {
    id: 'mg',
    brand: 'MG 汽车',
    title: 'MG 海外社媒创意短视频',
    desc: [
      { t: '主导 MG 汽车海外社媒短视频' },
      { t: '全流程工作', em: true },
      { t: '。深度结合' },
      { t: '车型产品特点', em: true },
      { t: '主导创意方向，依据客户需求独立完成' },
      { t: '中英文双语 TC 脚本撰写', em: true },
      { t: '。自主拓展对接' },
      { t: '海外摄影摄制资源', em: true },
      { t: '，与海外摄制团队远程沟通，统筹拍摄全流程，敲定镜头、场景等拍摄细节，跟进监督成片剪辑，完成' },
      { t: '品牌广告短视频交付', em: true },
      { t: '。' },
    ],
    video: `${_ovVideos[0]?.video ?? ''}`,
    poster: `${_ovVideos[0]?.poster ?? ''}`,
    cases: [_ovVideos[0]].filter(Boolean),
    metrics: [
      { v: 25, suffix: '万', k: '作品最高播放' },
      { v: 200, suffix: '', k: '最高互动' },
    ],
  },
  {
    id: 'chery',
    brand: '奇瑞汽车',
    title: '奇瑞出海品牌创意短视频',
    desc: [
      { t: '负责奇瑞出海品牌短视频全流程统筹。结合' },
      { t: '墨西哥本土地域特色', em: true },
      { t: '、海外用户内容偏好，联动汽车产品本身特性输出创意，完成适配海外市场的' },
      { t: 'TC 脚本撰写', em: true },
      { t: '。' },
      { t: '广州本地现场统筹拍摄执行', em: true },
      { t: '，把控镜头语言，监督后期剪辑完成成片交付。' },
    ],
    video: `${_ovVideos[2]?.video ?? ''}`,
    poster: `${_ovVideos[2]?.poster ?? ''}`,
    cases: [_ovVideos[2]].filter(Boolean),
    metrics: [
      { v: 8.3, suffix: 'M', k: '作品最高播放' },
      { v: 32, suffix: 'K', k: '累计互动' },
    ],
  },
  {
    id: 'nanfang',
    brand: '南方新闻网',
    title: '南方新闻网海外专题短视频',
    desc: [
      { t: '受南方新闻网品牌委托，面向海外用户制作传播' },
      { t: '广东地域文化、文旅特色', em: true },
      { t: '的短视频内容。项目采用' },
      { t: '广州塔灯光结合服饰变装转场的核心创意', em: true },
      { t: '，精巧的内容结构创意思路大获认可，收获' },
      { t: '优异海外流量表现', em: true },
      { t: '。本人主导' },
      { t: '选题策划与脚本创意撰写', em: true },
      { t: '，' },
      { t: '全程监督成片输出', em: true },
      { t: '，把控' },
      { t: '品牌对外传播调性', em: true },
      { t: '。' },
    ],
    video: `${_ovVideos[3]?.video ?? ''}`,
    poster: `${_ovVideos[3]?.poster ?? ''}`,
    cases: [_ovVideos[3]].filter(Boolean),
    metrics: [
      { v: 680, suffix: '万', k: '作品最高播放' },
      { v: 24, suffix: '万', k: '累计互动' },
      { v: 2.3, suffix: '万', k: '账号月涨粉' },
    ],
  },
]

const ALL_CASES = _ovVideos.filter(Boolean)

// Guru 弹窗 Hero 视频区：每个 tab 固定显示各自的图（不跟 active/case 切换）
const HERO_BY_ID = {
  mg: './media/guru/mg4-global-launch-new.jpg',
  chery: './media/guru/mg-halloween-trunk-treat.jpg',
  nanfang: './media/guru/nanfang-canton-tower-host.jpg',
}

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

function MetricValue({ metric }) {
  const decimals = Number.isInteger(metric.v) ? 0 : 1
  const animated = useCountUp(metric.v, { duration: 1000, decimals })
  const display = decimals === 0 ? Math.round(animated).toString() : Number(animated).toFixed(decimals)
  return (
    <b className="guru-metric-v">
      <span>{display}</span>
      {metric.suffix && <sup>{metric.suffix}</sup>}
    </b>
  )
}

export default function GuruReviewModal({ project, onClose, onNavigate }) {
  const [active, setActive] = useState(0)
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

  const current = PROJECTS[active]

  const goPrev = () => setActive((i) => (i - 1 + PROJECTS.length) % PROJECTS.length)
  const goNext = () => setActive((i) => (i + 1) % PROJECTS.length)

  return (
    <div className="guru-modal pd-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="guru-panel pd-panel pixel-frame" onClick={(e) => e.stopPropagation()}>
        <div className="pixel-frame-inner guru-inner">
          <span className="guru-deco guru-deco--tl" aria-hidden="true">
            <Plus size={14} />
            <Plus size={14} />
            <Plus size={14} />
          </span>
          <span className="guru-deco guru-deco--br" aria-hidden="true">
            <Heart size={14} fill="currentColor" />
            <Sparkles size={14} />
            <Plus size={14} />
          </span>

          <button className="guru-close video-modal-close" onClick={onClose} aria-label="关闭详情">
            <X size={20} />
          </button>

          {/* Header */}
          <header className="guru-head">
            <div className="guru-head-text">
              <span className="guru-eyebrow pixel-font">OVERSEAS · 2022.07 — 2024.03</span>
              <h2 className="guru-title">OVERSEAS VIDEO PROJECT</h2>
              <p className="guru-tagline">海外商业短视频创意与摄制统筹</p>
            </div>
            {ALL_CASES.length > 0 && (
              <button
                type="button"
                className="guru-watch-btn pixel-font"
                onClick={() => setCaseOpen(true)}
              >
                播放案例视频
                <ArrowRight size={16} strokeWidth={2.4} />
              </button>
            )}
          </header>

          {/* Body 三列：左视频 / 中介绍 / 右数据 */}
          <div className="guru-body">
            <section className="guru-col guru-col--media">
              <figure className="guru-video">
                <img src={HERO_BY_ID[current.id] || HERO_BY_ID.mg} alt="Guru 海外项目 · 案例视频封面" loading="lazy" />
                <span className="guru-video-brand">{current.brand}</span>
              </figure>
            </section>

            <section className="guru-col guru-col--intro" key={`i-${current.id}`}>
              <span className="guru-intro-tag pixel-font">PROJECT · {String(active + 1).padStart(2, '0')}</span>
              <h3 className="guru-intro-title">{current.title}</h3>
              <p className="guru-intro-body">
                {current.desc.map((seg, i) =>
                  seg.em ? <mark key={i}>{seg.t}</mark> : <span key={i}>{seg.t}</span>,
                )}
              </p>
            </section>

            <aside className="guru-col guru-col--data">
              <div className="guru-data-card" key={`d-${current.id}`}>
                <span className="guru-data-card-eyebrow pixel-font">RESULTS · 项目成果</span>
                <ul className="guru-metric-list">
                  {current.metrics.map((m) => (
                    <li className="guru-metric" key={m.k}>
                      <MetricValue metric={m} />
                      <span className="guru-metric-k">{m.k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* 圆点指示器 */}
          <div className="guru-dots" role="tablist" aria-label="项目切换">
            {PROJECTS.map((p, i) => (
              <button
                type="button"
                key={p.id}
                role="tab"
                aria-selected={i === active}
                aria-label={`切换到 ${p.brand}`}
                className={`guru-dot ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="guru-dot-no pixel-font">0{i + 1}</span>
                <span className="guru-dot-name">{p.brand}</span>
              </button>
            ))}
            <span className="guru-dots-arrow" aria-hidden="true">
              <button type="button" className="guru-arrow" onClick={goPrev} aria-label="上一个项目">
                <ChevronLeft size={16} />
              </button>
              <button type="button" className="guru-arrow" onClick={goNext} aria-label="下一个项目">
                <ChevronRight size={16} />
              </button>
            </span>
          </div>

          {/* 流程标签 */}
          <footer className="guru-flow">
            <span className="guru-flow-label pixel-font">FLOW · 项目流程</span>
            <ol className="guru-flow-list">
              {FLOW_STEPS.map((s, i) => (
                <li className="guru-flow-step" key={s}>
                  <span className="guru-flow-no pixel-font">0{i + 1}</span>
                  <span className="guru-flow-name">{s}</span>
                  {i < FLOW_STEPS.length - 1 && (
                    <ArrowRight size={14} className="guru-flow-arrow" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </footer>

          {/* 上下导航 */}
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

      {caseOpen && ALL_CASES.length > 0 && (
        <VideoCases cases={ALL_CASES} onClose={() => setCaseOpen(false)} />
      )}
    </div>
  )
}
