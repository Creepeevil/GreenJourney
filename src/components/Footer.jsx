export default function Footer({ onChangeTab }) {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <h3>📖 Tái sinh Giấy - Bảo vệ Em</h3>
        <p>
          Cùng nhau biến giấy cũ thành tri thức, gieo mầm xanh cho tương lai bền vững.
          Dự án U-Link • Đà Nẵng • 2026.
        </p>
        <div className="socials" aria-label="Mạng xã hội demo">
          <span title="Facebook">f</span>
          <span title="Instagram">ig</span>
          <span title="YouTube">yt</span>
          <span title="TikTok">tt</span>
        </div>
      </div>

      <blockquote>
        Mỗi trang giấy được tái sinh là một hy vọng được thắp sáng.
      </blockquote>

      <nav className="footer-links" aria-label="Điều hướng footer">
        <button onClick={() => onChangeTab('project')}>🌱 Dự án</button>
        <button onClick={() => onChangeTab('donation')}>🤲 Quyên góp</button>
        <button onClick={() => onChangeTab('community')}>💚 Cộng đồng</button>
        <button onClick={() => onChangeTab('education')}>📚 Tài liệu</button>
        <button onClick={() => onChangeTab('profile')}>👤 Tài khoản</button>
      </nav>
    </footer>
  )
}
