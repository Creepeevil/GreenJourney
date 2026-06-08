# Tái sinh trang giấy - React/Vite Demo

Website demo giới thiệu dự án thiện nguyện **Tái sinh trang giấy**.

## Công nghệ

- React + Vite
- Component-based UI
- Mock data
- localStorage
- Không backend
- Login Gmail giả lập
- QR mô phỏng bằng CSS/React component

## Chạy chương trình

```bash
npm install
npm run dev
```

Sau đó mở đường dẫn Vite hiển thị trên terminal, thường là:

```txt
http://localhost:5173
```

## Cấu trúc chính

```txt
src/
  App.jsx
  main.jsx
  styles.css
  components/
    Header.jsx
    Footer.jsx
    AuthPage.jsx
    ProjectIntro.jsx
    DonationPage.jsx
    CommunityStories.jsx
    EducationResources.jsx
    ProfilePage.jsx
    QRMockup.jsx
    StoryCard.jsx
    ResourceCard.jsx
    Timeline.jsx
    ImpactStats.jsx
  data/
    mockData.js
  hooks/
    useLocalStorage.js
public/
  assets/img/
    hero-forest-girl.jpg
    robot-earth.jpg
    menstrual-mistakes.jpg
    period-cycle-guide.jpg
    beach-cleanup.jpg
    cycle-syncing.jpg
    earth-goddess.jpg
    plant-in-hands.jpg
```

## Chức năng đã có

- Màn hình đăng nhập bằng Gmail giả lập.
- Tạo tài khoản demo.
- Trang giới thiệu dự án.
- Timeline 4 tháng / 4 workshop.
- Thống kê tác động giả lập.
- Trang quyên góp với QR mô phỏng.
- Form quyên góp lưu vào localStorage.
- Trang cộng đồng: đăng story, upload ảnh, lọc chủ đề, thả tim/lưu cảm hứng, không có bình luận.
- Trang tài liệu giáo dục: modal chi tiết, checklist hành động, nguồn tham khảo mô phỏng.
- Trang tài khoản: chỉnh sửa thông tin cá nhân, huy hiệu, lịch sử hoạt động.
- Responsive desktop/tablet/mobile.
- Animation nhẹ: floating paper, hover card, welcome loading, pop modal.

## Lưu ý

- QR trong website là mã mô phỏng, không liên kết thanh toán thật.
- Dữ liệu demo nằm trong localStorage của trình duyệt. Muốn reset, mở DevTools > Application > Local Storage và xóa các key bắt đầu bằng `tsg_`.
