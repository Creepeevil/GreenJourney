import { useEffect, useRef } from 'react'
import Timeline from './Timeline.jsx'
import ImpactStats from './ImpactStats.jsx'

function useReveal() {
  const ref = useRef([])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: .15 }
    )
    ref.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function ProjectIntro({ onChangeTab }) {
  const revealRef = useReveal()
  const r = (i) => (el) => { revealRef.current[i] = el }

  return (
    <div className="project-page page-fade">

      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-tagline">
            <span className="hero-tagline-dot" />
            Dự án "U - Link" • Đà Nẵng
          </div>
          <h1>Tái sinh Giấy<br />Bảo vệ Em</h1>
          <h2>Together We Save</h2>
          <p>
            Dự án giải quyết tình trạng lãng phí giấy, góp phần giảm áp lực lên tài nguyên rừng,
            hạn chế xả bỏ giấy thải không đúng cách và nâng cao hiểu biết về vệ sinh kinh nguyệt
            cho trẻ em vùng khó khăn.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => onChangeTab('donation')}>🤲 Quyên góp giấy / vở cũ</button>
            <button className="secondary-btn" onClick={() => onChangeTab('community')}>💚 Cộng đồng kể chuyện</button>
          </div>
          <div className="mini-proof">
            <span className="proof-icon">🌱</span>
            <p><strong>4 workshop</strong> tại vùng sâu, vùng xa cùng học sinh THCS và tình nguyện viên.</p>
          </div>
        </div>

        <div className="hero-art-card">
          <img src="/assets/img/earth-goddess.jpg" alt="Minh họa hành tinh xanh" />
          <img src="/assets/img/hero-forest-girl.jpg" alt="Minh họa rừng trong mái tóc" />
          <div className="floating-note">Giấy cũ hôm nay<br /><em>Tri thức xanh ngày mai</em></div>
        </div>
      </section>

      {/* ── Impact Stats ── */}
      <ImpactStats />

      {/* ── Story: Problem → Solution ── */}
      <section className="section-block two-col" ref={r(0)}>
        <div>
          <h2>Không chỉ tái chế giấy,<br />mà tái sinh thói quen sống xanh</h2>
          <p>
            Trước workshop, tình nguyện viên được đào tạo về bảo vệ môi trường, tái chế giấy và kiến thức
            vệ sinh kinh nguyệt. Trong workshop, học sinh và tình nguyện viên cùng biến giấy/vở cũ thành
            những cuốn vở mới, sáng tạo theo hai chủ đề: bảo vệ rừng và kiến thức vệ sinh kinh nguyệt.
          </p>
        </div>
        <div className="quote-panel">
          <blockquote>
            Một trang giấy cũ không kết thúc ở thùng rác. Nó có thể trở thành một cuốn vở mới,
            một bài học mới và một hành động tử tế.
          </blockquote>
          <cite>— Thông điệp dự án Tái sinh trang giấy</cite>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section-block" ref={r(1)}>
        <div className="section-title-row">
          <h2>4 tháng • 4 workshop • 1 sứ mệnh</h2>
          <button className="ghost-btn" onClick={() => onChangeTab('education')}>
            📚 Xem tài liệu giáo dục
          </button>
        </div>
        <Timeline />
      </section>

      {/* ── Process cards ── */}
      <div className="process-grid" ref={r(2)}>
        <article className="process-card problem reveal reveal-delay-1">
          <div className="process-num">⚠️</div>
          <h3>Vấn đề</h3>
          <p>Giấy bị lãng phí, xả bỏ chưa đúng cách, học sinh vùng khó khăn thiếu vở và thiếu không gian học về sức khỏe tuổi dậy thì.</p>
        </article>
        <article className="process-card solution reveal reveal-delay-2">
          <div className="process-num">♻️</div>
          <h3>Giải pháp</h3>
          <p>Thu gom giấy/vở cũ từ đô thị, đào tạo tình nguyện viên, tổ chức workshop tái chế và trao tặng vở mới.</p>
        </article>
        <article className="process-card impact reveal reveal-delay-3">
          <div className="process-num">🌿</div>
          <h3>Tác động</h3>
          <p>Tăng lượng giấy được tái sử dụng, nâng cao hiểu biết về môi trường, vệ sinh kinh nguyệt và thói quen sống xanh.</p>
        </article>
      </div>

    </div>
  )
}
