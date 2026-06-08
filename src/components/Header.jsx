import { navItems } from '../data/mockData.js'

export default function Header({ activeTab, onChangeTab, user, onLogout }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={() => onChangeTab('project')} aria-label="Về trang dự án">
        <span className="brand-mark">📖</span>
        <span>
          <strong>Thông điệp ý nghĩa</strong>
          <em>U-Link • Đà Nẵng</em>
        </span>
      </button>

      <nav className="nav-tabs" aria-label="Điều hướng chính">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={activeTab === item.id ? 'nav-item active' : 'nav-item'}
            onClick={() => onChangeTab(item.id)}
          >
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button className="qr-chip" onClick={() => onChangeTab('donation')}>
          <span className="tiny-qr" />
          Quét mã QR
        </button>
        <button className="user-pill" onClick={() => onChangeTab('profile')}>
          <img src={user?.avatar || '/assets/img/plant-in-hands.jpg'} alt="Avatar" />
          <span>{user?.name || 'Tài khoản'}</span>
        </button>
        <button className="ghost-btn small danger" onClick={onLogout}>Đăng xuất</button>
      </div>
    </header>
  )
}
