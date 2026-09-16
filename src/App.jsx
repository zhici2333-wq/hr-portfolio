import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Strengths from './components/Strengths'
import Contact from './components/Contact'
import { PixelSprite, art } from './sprites'

export default function App() {
  return (
    <div className="app">
      <div className="site-bg" aria-hidden="true">
        <div className="site-bg-grid" />
        <PixelSprite
          art={art.heartBow}
          palette={{ X: 'var(--mac-pink)', P: 'var(--mac-purple)', H: '#FFF6FA' }}
          cell={4}
          className="bg-deco bg-deco--bow1"
        />
        <PixelSprite art={art.starburst} color="var(--mac-yellow)" cell={4} className="bg-deco bg-deco--burst1" />
        <PixelSprite
          art={art.diamondRing}
          palette={{ X: 'var(--rose)', W: '#FFF6FA', Y: 'var(--mac-yellow)', C: 'var(--mac-cyan)' }}
          cell={5}
          className="bg-deco bg-deco--ring1"
        />
        <PixelSprite art={art.sparkle} color="var(--mac-cyan)" cell={4} className="bg-deco bg-deco--spark1" />
        <PixelSprite art={art.heartCute} color="var(--mac-red)" color2="#FFE3EA" cell={3} className="bg-deco bg-deco--heartA" />
        <PixelSprite
          art={art.daisy}
          palette={{ X: 'var(--mac-pink)', Y: 'var(--mac-yellow)' }}
          cell={4}
          className="bg-deco bg-deco--daisyA"
        />
        <PixelSprite art={art.cross} color="var(--mac-purple)" cell={4} className="bg-deco bg-deco--crossA" />
        <PixelSprite art={art.square} color="var(--mac-cyan)" cell={4} className="bg-deco bg-deco--squareA" />
        <PixelSprite art={art.starburst} color="var(--mac-pink)" cell={4} className="bg-deco bg-deco--burst2" />
        <PixelSprite art={art.heartCute} color="var(--mac-purple)" color2="#F1E7FF" cell={3} className="bg-deco bg-deco--heartB" />
        <PixelSprite
          art={art.daisy}
          palette={{ X: 'var(--mac-red)', Y: 'var(--mac-yellow)' }}
          cell={4}
          className="bg-deco bg-deco--daisyB"
        />
        <PixelSprite art={art.cross} color="var(--mac-red)" cell={3} className="bg-deco bg-deco--crossB" />
        <PixelSprite art={art.sparkle} color="var(--mac-yellow)" cell={3} className="bg-deco bg-deco--spark2" />
        <PixelSprite art={art.heartCute} color="var(--mac-cyan)" color2="#E2F9FC" cell={3} className="bg-deco bg-deco--heartC" />
        <PixelSprite art={art.cross} color="var(--mac-cyan)" cell={3} className="bg-deco bg-deco--crossC" />
        <PixelSprite art={art.square} color="var(--mac-yellow)" cell={3} className="bg-deco bg-deco--squareB" />
      </div>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Strengths />
        <Contact />
      </main>
    </div>
  )
}
