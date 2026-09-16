import { useEffect } from 'react'
import { X, Film, ExternalLink, Video } from 'lucide-react'

export default function VideoModal({ project, video, onClose }) {
  useEffect(() => {
    if (!video) return undefined
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [video, onClose])

  if (!video || !project) return null

  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-label={video.title} onClick={onClose}>
      <div className="video-modal-panel pixel-frame" onClick={(e) => e.stopPropagation()}>
        <div className="pixel-frame-inner video-modal-inner">
          <div className="video-modal-head">
            <div className="video-modal-title">
              <Film size={18} />
              <span>{project.title}</span>
            </div>
            <div className="video-modal-tools">
              <span className="tag tag--placeholder">占位视频 · 待替换成片</span>
              <button className="video-modal-close" onClick={onClose} aria-label="关闭弹窗">
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="video-modal-title2">{video.title}</div>
          <div className="video-modal-stage">
            <video key={video.id} src={video.video} poster={video.poster} controls autoPlay muted playsInline preload="auto" />
          </div>
          <div className="video-modal-desc">{video.desc}</div>
          <div className="video-modal-foot">
            <span>
              <Video size={14} /> 案例视频
            </span>
            {video.link ? (
              <a className="btn btn--pixel btn--sm btn--primary" href={video.link} target="_blank" rel="noreferrer">
                <ExternalLink size={15} /> {video.linkLabel || '打开原视频'}
              </a>
            ) : (
              <span className="video-modal-hint">原视频链接待补充：在 src/data.js 对应视频的 link 字段填写</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
