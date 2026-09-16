import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile, navItems } from '../data'

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      let current = ''
      for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top <= 130) current = item.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => scrollToId('home')}>
          <span className="pixel-heart nav-logo-heart" aria-hidden="true" />
          <span className="nav-logo-text">
            {profile.name}
            <small>{profile.title}</small>
          </span>
        </button>
        <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="主导航">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${active === item.id ? 'is-active' : ''}`}
              onClick={() => {
                scrollToId(item.id)
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            className="btn btn--pixel btn--sm nav-cta"
            onClick={() => {
              scrollToId('contact')
              setOpen(false)
            }}
          >
            找我聊聊
          </button>
        </nav>
        <button className="nav-burger" aria-label={open ? '关闭菜单' : '打开菜单'} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}
