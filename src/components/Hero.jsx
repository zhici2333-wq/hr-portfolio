import { ArrowDown, Play, Mail, Download } from 'lucide-react'
import { profile } from '../data'

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Polaroid({ data, className }) {
  return (
    <figure className={`polaroid-frame ${className}`} aria-hidden="true">
      <div className="polaroid-card">
        <img className="polaroid-photo" src={data.img} alt="" loading="lazy" />
        <figcaption className="polaroid-caption">{data.caption}</figcaption>
      </div>
    </figure>
  )
}

export default function Hero() {
  const { hero, polaroids } = profile
  return (
    <section id="home" className="hero">
      <Polaroid data={polaroids.pro} className="polaroid--pro" />
      <Polaroid data={polaroids.cute} className="polaroid--cute" />

      <div className="hero-content">
        <span className="hero-badge pixel-font">{hero.badge}</span>
        <h1 className="hero-name">{hero.title}</h1>
        <p className="hero-sub">{hero.subtitle}</p>
        <p className="hero-tag">{hero.tag}</p>
        <div className="hero-cta">
          <button className="btn btn--pixel btn--primary" onClick={() => scrollToId('projects')}>
            <Play size={18} fill="currentColor" /> 查看作品
          </button>
          <a className="btn btn--pixel btn--ghost" href={profile.resumeUrl} download="崔紫燕简历.pdf">
            <Download size={18} /> 下载简历
          </a>
          <button className="btn btn--pixel btn--ghost" onClick={() => scrollToId('contact')}>
            <Mail size={18} /> 联系我
          </button>
        </div>
      </div>

      <button className="hero-scroll" onClick={() => scrollToId('about')} aria-label="向下滚动">
        <ArrowDown size={20} />
      </button>
    </section>
  )
}
