import { useEffect, useRef, useState } from 'react'
import {
  PenLine,
  Clapperboard,
  LayoutGrid,
  Video,
  Globe2,
  ListTodo,
  Bot,
  Sparkles,
} from 'lucide-react'
import { strengths } from '../data'
import Reveal from './Reveal'

const iconMap = { PenLine, Clapperboard, LayoutGrid, Video, Globe2, ListTodo, Bot, Sparkles }

function AnimatedChars({ text, className = '' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span ref={ref} className={`anim-chars ${inView ? 'in' : ''} ${className}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span key={i} className="anim-char" style={{ transitionDelay: `${120 + i * 45}ms` }}>
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Strengths() {
  return (
    <section id="strengths" className="section strengths">
      <div className="container strengths-wrap">
        <div className="strengths-head">
          <h2 className="strengths-title">
            <AnimatedChars text="个人优势" />
          </h2>
          <div className="strengths-en-line" aria-hidden="true">
            <span className="strengths-en-rule" />
            <span className="pixel-font strengths-en-text">STRENGTHS</span>
            <span className="strengths-en-rule" />
          </div>
          <Reveal>
            <p className="strengths-lead">
              我的竞争力不止于做好内容，更擅长把内容、组织、流程与增长目标连接成一套可落地、可复制、可持续放大的运营体系。
            </p>
          </Reveal>
        </div>
        <div className="strengths-grid">
          {strengths.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Sparkles
            return (
              <Reveal key={s.no} delay={(i % 4) * 60}>
                <article className="strength-card">
                  <span className="strength-sweep" aria-hidden="true" />
                  <div className="strength-face">
                    <span className="strength-icon">
                      <Icon size={26} />
                    </span>
                    <div className="strength-body">
                      <span className="pixel-font strength-no">{s.no}</span>
                      <h3 className="strength-title">{s.title}</h3>
                      <p className="strength-desc">{s.desc}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
