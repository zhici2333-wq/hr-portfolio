import { useEffect, useState } from 'react'
import { Play, ExternalLink, ChevronLeft, X } from 'lucide-react'

function CaseListModal({ cases, onPick, onClose }) {
  return (
    <div className="pd-modal case-layer" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="pd-panel pixel-frame case-list-panel" onClick={(e) => e.stopPropagation()}>
        <div className="pixel-frame-inner case-list-inner">
          <div className="video-modal-head">
            <div className="video-modal-title">
              <Play size={18} />
              <span>选择案例视频</span>
            </div>
            <button className="video-modal-close" onClick={onClose} aria-label="关闭弹窗">
              <X size={20} />
            </button>
          </div>
          <div className="case-list">
            {cases.map((c) => (
              <button key={c.id} className="case-item" onClick={() => onPick(c)}>
                <img className="case-item-thumb" src={c.poster} alt="" />
                <span className="case-item-data">
                  <i>播放 {c.play}</i>
                  <i>点赞 {c.like}</i>
                </span>
                <span className="case-item-body">
                  <b>{c.title}</b>
                  <span>{c.desc}</span>
                </span>
                <span className="case-item-play">
                  <Play size={20} fill="currentColor" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CasePlayerModal({ c, onBack, onClose }) {
  return (
    <div className="pd-modal case-layer case-player-layer" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="pd-panel pixel-frame case-player-panel" onClick={(e) => e.stopPropagation()}>
        <div className="pixel-frame-inner case-player-inner">
          <div className="video-modal-head">
            <button className="case-back" onClick={onBack}>
              <ChevronLeft size={16} /> 案例视频
            </button>
            <div className="video-modal-title">
              <Play size={18} />
              <span>{c.playerTitle || c.title}</span>
            </div>
            <button className="video-modal-close" onClick={onClose} aria-label="关闭弹窗">
              <X size={20} />
            </button>
          </div>
          <div className="video-modal-stage">
            {c.video ? (
              <video key={c.id} src={c.video} poster={c.poster} controls autoPlay muted playsInline preload="auto" />
            ) : (
              <img className="case-image-only" src={c.poster} alt={c.playerTitle || c.title} />
            )}
          </div>
          <div className="case-block">
            <h4>创作思路</h4>
            <p>{c.idea}</p>
          </div>
          {Array.isArray(c.script) && c.script.length > 0 && (
            <div className="case-block case-block--script">
              <h4>脚本解析</h4>
              <p className="case-script">
                {c.script.map((seg, i) =>
                  seg && seg.em ? (
                    <mark key={i}>{seg.t}</mark>
                  ) : (
                    <span key={i}>{seg?.t ?? ''}</span>
                  ),
                )}
              </p>
            </div>
          )}
          {(c.douyin || c.xiaohongshu || c.youtube || c.tiktok) && (
            <div className="case-block">
              <h4>原视频双平台链接</h4>
              <div className="case-links">
                {c.douyin && (
                  <a
                    className="case-link"
                    href={c.douyin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    抖音原视频链接 <ExternalLink size={14} />
                  </a>
                )}
                {c.xiaohongshu && (
                  <a
                    className="case-link"
                    href={c.xiaohongshu}
                    target="_blank"
                    rel="noreferrer"
                  >
                    小红书原视频链接 <ExternalLink size={14} />
                  </a>
                )}
                {c.youtube && (
                  <a
                    className="case-link"
                    href={c.youtube}
                    target="_blank"
                    rel="noreferrer"
                  >
                    YouTube 原视频链接 <ExternalLink size={14} />
                  </a>
                )}
                {c.tiktok && (
                  <a
                    className="case-link"
                    href={c.tiktok}
                    target="_blank"
                    rel="noreferrer"
                  >
                    TikTok 原视频链接 <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VideoCases({ cases, onClose }) {
  const [activeCase, setActiveCase] = useState(null)

  useEffect(() => {
    if (!cases || !cases.length) return undefined
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (activeCase) setActiveCase(null)
      else onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [cases, activeCase, onClose])

  if (!cases || !cases.length) return null

  return activeCase ? (
    <CasePlayerModal c={activeCase} onBack={() => setActiveCase(null)} onClose={onClose} />
  ) : (
    <CaseListModal cases={cases} onPick={setActiveCase} onClose={onClose} />
  )
}
