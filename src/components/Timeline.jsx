import { useEffect, useRef } from 'react'
import { timelineSteps } from '../data/mockData.js'

export default function Timeline() {
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: .2 }
    )
    cardsRef.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="timeline">
      {timelineSteps.map((step, i) => (
        <article
          className="timeline-card reveal"
          key={step.number}
          ref={(el) => { cardsRef.current[i] = el }}
          style={{ transitionDelay: `${i * .15}s` }}
        >
          <div className="step-head">
            <span className="step-number">{step.number}</span>
            <span className="step-icon">{step.icon}</span>
          </div>
          <small>{step.subtitle}</small>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </article>
      ))}
    </div>
  )
}
