import { Phone, Mail, MapPin } from 'lucide-react'
import { profile, timeline } from '../data'
import Reveal from './Reveal'

export default function About() {
  const { name, title, phone, email, location, relocation, about } = profile
  return (
    <section id="about" className="section about">
      <div className="container">
        <Reveal className="section-head about-head">
          <h2 className="section-title">关于我</h2>
          <span className="section-kicker pixel-font">ABOUT ME</span>
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-left">
            <div className="pixel-frame about-card">
              <div className="pixel-frame-inner about-card-inner">
                <div className="about-avatar-wrap">
                  <img className="about-avatar" src={profile.avatar} alt="崔紫燕头像" />
                </div>
                <h3 className="about-name">{name}</h3>
                <p className="about-role">{title}</p>
                <div className="about-contacts">
                  <a className="chip chip--contact" href={`tel:${phone}`}>
                    <Phone size={15} /> {phone}
                  </a>
                  <a className="chip chip--contact" href={`mailto:${email}`}>
                    <Mail size={15} /> {email}
                  </a>
                  <span className="chip">
                    <MapPin size={15} /> {location}
                  </span>
                  <span className="chip">{relocation}</span>
                </div>
                <div className="about-metrics">
                  <h4 className="about-metrics-title">项目数据</h4>
                  <ul className="about-metrics-list">
                    <li>KOS 账号累计产出爆文笔记 <strong>969 篇</strong>，矩阵总曝光量达 <strong>1366 万+</strong></li>
                    <li>完成品牌新媒体账号从 <strong>0-1</strong> 启动，粉丝增长 <strong>5 万</strong></li>
                    <li>参与 <strong>10+ 国际品牌</strong> 海外社媒运营，视频最高播放量达 <strong>1800 万</strong></li>
                    <li>建立 <strong>500+ 人</strong> 私域创作社群，相关话题曝光量达 <strong>159 万+</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="about-right">
            <Reveal>
              <div className="pixel-frame about-intro-card">
                <div className="pixel-frame-inner about-intro-inner">
                  <div className="about-intro-head">
                    <h3>{about.heading}</h3>
                    <span className="pixel-font about-intro-en">PROFILE</span>
                  </div>
                  <p className="about-intro">
                    2022 年南昌大学广告学本科毕业，拥有 <strong>4 年短视频内容编导经验</strong>。擅长
                    <strong>爆款脚本创作、拍摄统筹、账号从 0→1 搭建</strong>；兼具
                    <strong>品牌方与广告公司双视角</strong>；熟悉 <strong>抖音、小红书、TikTok、Instagram</strong>
                    主流短视频平台流量逻辑；具备 <strong>新媒体矩阵孵化与多项目统筹能力</strong>。
                  </p>
                  <div className="about-tags">
                    {about.tags.map((t) => (
                      <span key={t} className="about-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="timeline-head">
                <h3>工作经历</h3>
                <span className="pixel-font timeline-head-en">WORK EXPERIENCE</span>
              </div>
              <ol className="timeline">
                {timeline.map((t) => (
                  <li className="timeline-item" key={t.company}>
                    <span className="timeline-dot" aria-hidden="true" />
                    <div className="pixel-frame timeline-card">
                      <div className="pixel-frame-inner timeline-inner">
                        <span className="timeline-period">{t.period}</span>
                        <h4 className="timeline-company">{t.company}</h4>
                        <span className="timeline-role">{t.role}</span>
                        <p className="timeline-brief">{t.brief}</p>
                        <div className="timeline-results">
                          {t.results.map((r) => (
                            <div key={r.k} className="tl-result">
                              <b>{r.v}</b>
                              <span>{r.k}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
