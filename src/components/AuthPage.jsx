import { useState } from 'react'
import QRMockup from './QRMockup.jsx'

export default function AuthPage({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '' })
  const [mode, setMode] = useState('gmail')

  const loginWithGmail = () => {
    onLogin({ name: 'Lan Anh', email: 'lananh.demo@gmail.com', loginType: 'gmail-demo' })
  }

  const createAccount = (event) => {
    event.preventDefault()
    onLogin({
      name: form.name.trim() || 'Người gieo mầm xanh',
      email: form.email.trim() || 'demo@taisinhtranggiay.org',
      loginType: 'account-demo',
    })
  }

  return (
    <div className="auth-page">
      {/* Floating decorative elements */}
      <div className="auth-floats" aria-hidden="true">
        <span className="auth-float af1">🌿</span>
        <span className="auth-float af2">📄</span>
        <span className="auth-float af3">✦</span>
        <span className="auth-float af4">🍃</span>
        <span className="auth-float af5">♻️</span>
      </div>
      <section className="auth-hero">
        <div className="auth-copy">
          <div className="auth-tagline">
            <span className="hero-tagline-dot" />
            Dự án "U-Link: Nâng cấp vòng đời - Kết nối đô thị và vùng yếu thế" • Đà Nẵng 
          </div>
          <h1>
            <em>Tái sinh Giấy</em><br />
            Bảo vệ Em 
          </h1>
        </div>

        <div className="auth-card">
          <img
            className="auth-illustration"
            src="/assets/img/hero-forest-girl.jpg"
            alt="Minh họa rừng và tái sinh"
          />
          {mode === 'create' ? (
            <div className="login-box">
              <h2>Tài khoản của bạn</h2>
              <form onSubmit={createAccount} style={{ display: 'grid', gap: 12 }}>
                <label>
                  Họ tên
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nhập tên của bạn"
                  />
                </label>
                <label>
                  Email
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="demo@gmail.com"
                  />
                </label>
                <button className="primary-btn full" type="submit">Vào website</button>
                <button className="ghost-btn full" type="button" onClick={() => setMode('gmail')}>
                  ← Quay lại đăng nhập
                </button>
              </form>
            </div>
          ) : (
            <div className="login-box">
              <h2>Đăng nhập để đồng hành</h2>
              <button className="google-btn" onClick={loginWithGmail}>
                <span className="g-icon">G</span>
                Continue with Gmail
              </button>
              <button className="ghost-btn full" onClick={() => setMode('create')}>
                Tạo tài khoản cá nhân
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
