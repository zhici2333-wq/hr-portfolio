import { useState } from 'react'
import { Play, ListVideo, ArrowUpRight } from 'lucide-react'
import { projects, officialDetail, matrixDetail } from '../data'
import Reveal from './Reveal'
import ProjectDetailModal from './ProjectDetailModal'
import MatrixDetailModal from './MatrixDetailModal'
import KocReviewModal from './KocReviewModal'
import GuruReviewModal from './GuruReviewModal'
import VideoCases from './VideoCases'

const BASE_URL = import.meta.env.BASE_URL

// 每个项目卡片封面对应的真实案例缩略图（来自 public/media/covers）
const COVERS_BY_PROJECT = {
  'x11-matrix': [
    `${BASE_URL}media/covers/matrix-c1.jpg`,
    `${BASE_URL}media/covers/matrix-c2.jpg`,
    `${BASE_URL}media/covers/matrix-c3.jpg`,
    `${BASE_URL}media/covers/matrix-c4.jpg`,
  ],
  'x11-official': [
    `${BASE_URL}media/covers/c1-siamrip.jpg`,
    `${BASE_URL}media/covers/c2.jpg`,
    `${BASE_URL}media/covers/c3.jpg`,
    `${BASE_URL}media/covers/c4.jpg`,
  ],
  'koc-matrix': [
    `${BASE_URL}media/covers/koc-c1-illustration-girl.jpg`,
    `${BASE_URL}media/covers/koc-c3-butterbear.jpg`,
    `${BASE_URL}media/covers/koc-c2-recruit-campaign.jpg`,
    `${BASE_URL}media/covers/koc-c2-trick-or-treat.jpg`,
  ],
  'guru-overseas': [
    `${BASE_URL}media/covers/x11-guru-c1-mg4-tvc-autumn.jpg`,
    `${BASE_URL}media/covers/x11-guru-c2-mg4-different-colors.jpg`,
    `${BASE_URL}media/covers/x11-guru-c3-chery-tigo-day-night.jpg`,
    `${BASE_URL}media/covers/x11-guru-c4-nanfang-canton-tower.jpg`,
  ],
}

// 单独调整某些 cover cell 内图片的对齐 / 缩放，让主体居中或去黑边
// 用 CSS 变量驱动，避免 inline transform 覆盖全局 hover scale
const COVER_TWEAKS = {
  'x11-matrix': {
    // mini-1 原为竖屏 9:16 罗小黑图，cover + center 35% 让 cell 显示原图 31%-42% 区域，
    // 罗小黑身体 + 文字集中区域在 cell 中部偏下，眼睛和五官靠近 cell 视觉中心
    'mini-1': { objectFit: 'cover', objectPosition: 'center 35%' },
  },
  'x11-official': {
    // mini-1 Pingu 新品发布会海报：竖向海报，cover 充满即可
    'mini-1': { objectFit: 'cover', objectPosition: 'center center' },
  },
  'guru-overseas': {
    'mini-2': { '--cover-scale': '1.28' }, // 1月17日竖屏图：放大去左右黑边
  },
}

function casesFor(p) {
  const d = [officialDetail, matrixDetail].find((x) => x.id === p.id)
  if (d?.cases?.length) return d.cases
  return p.videos.map((v) => ({
    id: v.id,
    title: v.title,
    playerTitle: v.title,
    desc: v.desc,
    play: '—',
    like: '—',
    video: v.video,
    poster: v.poster,
    idea: v.idea ?? '待补充',
    douyin: '',
    xiaohongshu: '',
    youtube: v.youtube ?? '',
    tiktok: v.tiktok ?? '',
  }))
}

export default function Projects() {
  const [videoProject, setVideoProject] = useState(null)
  const [detailProject, setDetailProject] = useState(null)

  return (
    <section id="projects" className="section projects projects--coverwall">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-kicker pixel-font">FEATURED PROJECTS</span>
          <h2 className="section-title">精选项目</h2>
          <p className="section-sub">
            从 0→1 的矩阵搭建、官方账号全周期运营、素人种草到海外品牌创意——把每一段项目经验沉淀为可复用的方法论。
          </p>
        </Reveal>
        <div className="projects-grid projects-grid--coverwall">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 80}>
              <article className="pixel-frame project-card">
                <div className="pixel-frame-inner project-inner">
                  <div
                    className="project-cover project-cover--wall"
                    onClick={() => setVideoProject(p)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setVideoProject(p)
                      }
                    }}
                    aria-label={`查看 ${p.title} 案例视频`}
                  >
                    <div className="cover-wall">
                      {/* 左大主图 */}
                      {(COVERS_BY_PROJECT[p.id] || [])[0] && (
                        <div className="cover-cell cover-cell--big">
                          <img className="cover-cell-img" src={(COVERS_BY_PROJECT[p.id] || [])[0]} alt="" loading="lazy" style={COVER_TWEAKS[p.id]?.big} />
                          <span className="cover-cell-play">
                            <Play size={22} fill="currentColor" />
                          </span>
                        </div>
                      )}
                      {/* 右上 / 右下 两个关键数据 chip */}
                      {(p.results || []).slice(0, 2).map((r, idx) => (
                        <div key={`metric-${idx}`} className={`cover-cell cover-cell--data cover-cell--data-${idx + 1}`}>
                          <div className="cover-metric">
                            <b>{r.v}</b>
                            <span>{r.k}</span>
                          </div>
                        </div>
                      ))}
                      {/* 底左 / 底右 两个小方块图 */}
                      {(COVERS_BY_PROJECT[p.id] || []).slice(1, 3).map((src, idx) => {
                        const tweak = COVER_TWEAKS[p.id]?.[`mini-${idx + 1}`]
                        const cellStyle = tweak?.objectFit === 'contain' ? { background: 'var(--cream)' } : undefined
                        return (
                          <div key={`mini-${idx}`} className={`cover-cell cover-cell--mini cover-cell--mini-${idx + 1}`} style={cellStyle}>
                            <img className="cover-cell-img" src={src} alt="" loading="lazy" style={tweak} />
                          </div>
                        )
                      })}
                    </div>
                    <span className="project-no pixel-font">{p.no}</span>
                  </div>
                  <div className="project-body">
                    <div className="project-tags">
                      {p.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="project-title-row">
                      <h3 className="project-title">{p.title}</h3>
                    </div>
                    <button className="btn btn--pixel btn--detail" onClick={() => setDetailProject(p)}>
                      <ListVideo size={18} />
                      <span className="btn--detail-text">查看完整项目拆解</span>
                      <ArrowUpRight size={18} className="btn--detail-arrow" />
                    </button>
                    <p className="project-desc">{p.desc}</p>
                    <div className="project-results">
                      {p.results.map((r) => (
                        <div key={r.k} className="project-result">
                          <b>{r.v}</b>
                          <span>{r.k}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {videoProject && <VideoCases cases={casesFor(videoProject)} onClose={() => setVideoProject(null)} />}
      {detailProject?.id === matrixDetail.id ? (
        <MatrixDetailModal
          project={detailProject}
          onClose={() => setDetailProject(null)}
          onNavigate={setDetailProject}
          onOpenCase={(c) => setVideoProject(detailProject)}
        />
      ) : detailProject?.id === 'koc-matrix' ? (
        <KocReviewModal project={detailProject} onClose={() => setDetailProject(null)} onNavigate={setDetailProject} />
      ) : detailProject?.id === 'guru-overseas' ? (
        <GuruReviewModal project={detailProject} onClose={() => setDetailProject(null)} onNavigate={setDetailProject} />
      ) : (
        <ProjectDetailModal project={detailProject} onClose={() => setDetailProject(null)} onNavigate={setDetailProject} />
      )}
    </section>
  )
}