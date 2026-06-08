import { useMemo, useState } from 'react'
import { educationResources } from '../data/mockData.js'
import ResourceCard from './ResourceCard.jsx'

export default function EducationResources() {
  const [selected, setSelected] = useState(null)
  const grouped = useMemo(() => ({
    menstrual: educationResources.filter((item) => item.group === 'menstrual'),
    climate: educationResources.filter((item) => item.group === 'climate'),
  }), [])

  return (
    <div className="education-page page-fade">

      <section className="page-hero education-hero">
        <div>
          <h1>Học để hiểu cơ thể và bảo vệ hành tinh</h1>
          <p>
            Nội dung được viết theo hướng gần gũi với học sinh THCS trở lên, ưu tiên ngôn ngữ
            tôn trọng, không kỳ thị và có checklist hành động cụ thể.
          </p>
        </div>
        <img src="/assets/img/period-cycle-guide.jpg" alt="Tài liệu giáo dục" />
      </section>

      <div className="safe-note">
        <strong>📌 Lưu ý:</strong> Nội dung chỉ mang tính giáo dục. Nếu có vấn đề sức khỏe bất thường,
        hãy trao đổi với người lớn đáng tin cậy hoặc nhân viên y tế.
      </div>

      <section className="resource-panels">
        <div className="resource-panel menstrual-panel">
          <h2>Vệ sinh kinh nguyệt an toàn</h2>
          <div className="resource-list">
            {grouped.menstrual.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} onOpen={setSelected} />
            ))}
          </div>
        </div>

        <div className="resource-panel climate-panel">
          <h2>Hành động khí hậu & bảo vệ rừng</h2>
          <div className="resource-list">
            {grouped.climate.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} onOpen={setSelected} />
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal-card resource-modal" onClick={(e) => e.stopPropagation()}>
            <img src={selected.image} alt={selected.title} />
            <div className="resource-modal-inner">
              <div className="resource-meta" style={{ marginBottom: 10 }}>
                <span>{selected.age}</span>
                <span>{selected.readTime}</span>
              </div>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <h3>✅ Checklist hành động</h3>
              <ul>
                {selected.checklist.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <small>Nguồn tham khảo: {selected.source}</small>
              <button className="primary-btn full" onClick={() => setSelected(null)}>Đã hiểu, cảm ơn!</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
