import { useEffect, useRef, useState } from 'react'
import { impactStats } from '../data/mockData.js'

function AnimatedNumber({ value, visible }) {
  const [display, setDisplay] = useState('0')
  const rafRef = useRef(null)

  useEffect(() => {
    if (!visible) return
    const numMatch = value.match(/[\d,]+/)
    if (!numMatch) { setDisplay(value); return }
    const raw = parseInt(numMatch[0].replace(/,/g, ''), 10)
    const suffix = value.replace(numMatch[0], '')
    const duration = 1400
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * raw)
      setDisplay(current.toLocaleString('vi-VN') + suffix)
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [visible, value])

  return <span>{display}</span>
}

export default function ImpactStats() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: .3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="impact-grid" ref={ref}>
      {impactStats.map((item, i) => (
        <div
          className="impact-card reveal"
          key={item.label}
          style={{ transitionDelay: `${i * .12}s` }}
          ref={(el) => { if (el && visible) el.classList.add('visible') }}
        >
          <div className="stat-icon">{item.icon}</div>
          <strong>
            <AnimatedNumber value={item.value} visible={visible} />
          </strong>
          <p>{item.label}</p>
        </div>
      ))}
    </section>
  )
}
