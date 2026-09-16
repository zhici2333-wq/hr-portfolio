import { useState } from 'react'
import { Phone, Mail, MapPin, Copy, Check, Send } from 'lucide-react'
import { profile } from '../data'
import Reveal from './Reveal'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* 剪贴板不可用时静默 */
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <Reveal>
          <span className="section-kicker pixel-font">CONTACT</span>
          <h2 className="contact-title">期待合作</h2>
          <p className="contact-sub">招聘、新媒体项目合作均可联系；base 东莞，接受广东省内调动。</p>
          <div className="contact-rows">
            <a className="contact-row" href={`tel:${profile.phone}`}>
              <span className="contact-icon">
                <Phone size={20} />
              </span>
              <span>
                <small>电话</small>
                <b>{profile.phone}</b>
              </span>
            </a>
            <div className="contact-row">
              <span className="contact-icon">
                <Mail size={20} />
              </span>
              <span>
                <small>邮箱</small>
                <b>{profile.email}</b>
              </span>
            </div>
            <div className="contact-row">
              <span className="contact-icon">
                <MapPin size={20} />
              </span>
              <span>
                <small>所在地</small>
                <b>
                  {profile.location} · {profile.relocation}
                </b>
              </span>
            </div>
          </div>
          <div className="contact-cta">
            <a
              className="btn btn--pixel btn--primary"
              href={`mailto:${profile.email}?subject=${encodeURIComponent('合作邀约｜崔紫燕 · 短视频内容运营')}`}
            >
              <Send size={16} /> 发邮件聊聊
            </a>
            <button className="btn btn--pixel btn--ghost" onClick={copyEmail}>
              {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? '已复制邮箱' : '复制邮箱'}
            </button>
          </div>
        </Reveal>
      </div>
      <footer className="contact-foot">
        <span>© 2026 {profile.name} · {profile.title}</span>
        <span>base 东莞 · 接受广东省内调动</span>
        <span>React + Vite 构建 · 视频素材为占位，后续替换</span>
      </footer>
    </section>
  )
}
