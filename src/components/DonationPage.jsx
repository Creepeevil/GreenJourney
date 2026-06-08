import { useState } from 'react'
import { donationOptions } from '../data/mockData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import QRMockup from './QRMockup.jsx'

const initialForm = {
  name: '',
  contact: '',
  type: 'Giấy cũ',
  amount: '',
  address: '',
  note: '',
}

export default function DonationPage({ user }) {
  const [donations, setDonations] = useLocalStorage('tsg_donations', [])
  const [form, setForm] = useState({ ...initialForm, name: user?.name || '', contact: user?.email || '' })
  const [success, setSuccess] = useState(false)

  const submitDonation = (event) => {
    event.preventDefault()
    const nextDonation = {
      id: `donation-${Date.now()}`,
      ...form,
      createdAt: new Date().toISOString(),
      status: 'Đã ghi nhận',
    }
    setDonations([nextDonation, ...donations])
    setForm({ ...initialForm, name: user?.name || '', contact: user?.email || '' })
    setSuccess(true)
  }

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="donation-page page-fade">

      <section className="page-hero">
        <div>
          <h1>Mỗi đóng góp là một vòng đời mới cho trang giấy cũ</h1>
          <p>
            Chọn quyên góp giấy, vở cũ, dụng cụ học tập hoặc hỗ trợ chi phí workshop.
            Tất cả dữ liệu ở bản demo này được lưu bằng localStorage.
          </p>
        </div>
        <img src="/assets/img/plant-in-hands.jpg" alt="Cây non trong tay" />
      </section>

      <section className="donation-layout">
        <div className="donation-left">
          <QRMockup />
          <div className="demo-warning">
            ⚠️ Đây là QR mô phỏng cho giao diện demo, không thực hiện giao dịch thật.
          </div>
        </div>

        <div className="donation-right">
          <h2>Bạn có thể ủng hộ bằng</h2>
          <div className="donation-options">
            {donationOptions.map((option) => (
              <button
                type="button"
                className={`donation-option ${option.color} ${form.type === option.title ? 'selected' : ''}`}
                key={option.title}
                onClick={() => updateField('type', option.title)}
              >
                <span className="opt-icon">{option.icon}</span>
                <strong>{option.title}</strong>
                <small>{option.description}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="section-title-row">
          <h2>Gửi thông tin để dự án liên hệ nhận đóng góp</h2>
          <span className="soft-badge">Đã ghi nhận: {donations.length}</span>
        </div>

        <form className="eco-form" onSubmit={submitDonation}>
          <div className="field-grid">
            <label>
              Họ tên
              <input required value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Nguyễn Văn A" />
            </label>
            <label>
              Email / SĐT
              <input required value={form.contact} onChange={(e) => updateField('contact', e.target.value)} placeholder="email@gmail.com / 09..." />
            </label>
            <label>
              Loại quyên góp
              <select value={form.type} onChange={(e) => updateField('type', e.target.value)}>
                {donationOptions.map((o) => <option key={o.title}>{o.title}</option>)}
              </select>
            </label>
            <label>
              Số lượng
              <input value={form.amount} onChange={(e) => updateField('amount', e.target.value)} placeholder="Ví dụ: 15kg giấy / 20 cuốn vở" />
            </label>
          </div>
          <label>
            Địa điểm nhận
            <input value={form.address} onChange={(e) => updateField('address', e.target.value)} placeholder="Địa chỉ hoặc khu vực thuận tiện" />
          </label>
          <label>
            Ghi chú
            <textarea value={form.note} onChange={(e) => updateField('note', e.target.value)} placeholder="Thời gian liên hệ, tình trạng giấy/vở, lời nhắn..." />
          </label>
          <button className="primary-btn" type="submit">🌿 Gửi thông tin quyên góp</button>
        </form>
      </section>

      {success && (
        <div className="modal-backdrop" onClick={() => setSuccess(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🌿</div>
            <h2>Cảm ơn bạn!</h2>
            <p>Cảm ơn bạn đã góp thêm một vòng đời mới cho trang giấy cũ. Dự án sẽ liên hệ sớm!</p>
            <button className="primary-btn" onClick={() => setSuccess(false)}>Tiếp tục đồng hành</button>
          </div>
        </div>
      )}
    </div>
  )
}
