import { useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function ProfilePage({ profile, setProfile, user, onLogout, onChangeTab }) {
  const [draft, setDraft] = useState(profile)
  const [stories] = useLocalStorage('tsg_stories', [])
  const [donations] = useLocalStorage('tsg_donations', [])
  const [saved, setSaved] = useState(false)

  const userStories = useMemo(() => stories.filter((story) => story.name === user?.name), [stories, user])
  const activities = [
    ...donations.slice(0, 3).map((item) => ({
      icon: '🤲',
      text: `Đã gửi form quyên góp: ${item.type}`,
      time: new Date(item.createdAt).toLocaleDateString('vi-VN'),
    })),
    ...userStories.slice(0, 3).map((item) => ({
      icon: '💚',
      text: `Đã đăng câu chuyện: ${item.message.slice(0, 50)}...`,
      time: item.time,
    })),
    { icon: '📚', text: 'Đã mở tài liệu giáo dục về vệ sinh kinh nguyệt và hành động khí hậu', time: 'Demo' },
  ]

  const saveProfile = (event) => {
    event.preventDefault()
    setProfile(draft)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="profile-page page-fade">
      <section className="profile-grid">

        {/* ── Sidebar ── */}
        <aside className="profile-card-main">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar-ring" />
            <img src={profile.avatar || '/assets/img/plant-in-hands.jpg'} alt="Avatar" />
          </div>
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
          <div className="badge-wrap">
            <span>🌱 Người gieo mầm xanh</span>
            <span>♻️ Người tái sinh giấy</span>
            <span>💚 Đại sứ câu chuyện xanh</span>
            <span>🎒 Bạn đồng hành workshop</span>
          </div>
          <div className="profile-stats">
            <div><strong>{stories.length}</strong><span>Bài chia sẻ</span></div>
            <div><strong>{donations.length}</strong><span>Quyên góp</span></div>
            <div><strong>Lv.4</strong><span>Huy hiệu</span></div>
          </div>
          <button className="ghost-btn full danger" onClick={onLogout}>Đăng xuất</button>
        </aside>

        {/* ── Content ── */}
        <section className="profile-content">
          <div className="section-title-row">
            <h2 style={{ margin: 0, fontStyle: 'italic', color: 'var(--green-950)' }}>
              Chỉnh sửa thông tin
            </h2>
            <button className="ghost-btn" onClick={() => onChangeTab('community')}>
              💚 Đăng câu chuyện mới
            </button>
          </div>

          <div className="section-block" style={{ padding: '26px 28px' }}>
            <form className="eco-form" onSubmit={saveProfile}>
              <div className="field-grid">
                <label>Họ tên<input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></label>
                <label>Email<input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></label>
                <label>SĐT<input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></label>
                <label>Thành phố<input value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} /></label>
              </div>
              <label>Avatar URL<input value={draft.avatar} onChange={(e) => setDraft({ ...draft, avatar: e.target.value })} /></label>
              <label>Giới thiệu ngắn<textarea value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} /></label>
              <button className="primary-btn" type="submit">
                {saved ? '✅ Đã lưu!' : '💾 Lưu thông tin'}
              </button>
            </form>
          </div>

          <div className="activity-card">
            <h2>Hoạt động gần đây</h2>
            {activities.slice(0, 6).map((activity, index) => (
              <div className="activity-item" key={`${activity.text}-${index}`}>
                <span className="activity-icon">{activity.icon}</span>
                <p>
                  {activity.text}
                  <small>{activity.time}</small>
                </p>
              </div>
            ))}
          </div>
        </section>

      </section>
    </div>
  )
}
