# Green Journey Map - Hành Trình Tái Sinh Giấy

MVP web map chuyển số lộ trình thiện nguyện: QR -> bản đồ hành trình -> nhiệm vụ theo trạm -> upload ảnh minh chứng -> đóng dấu passport -> nhận mã đổi quà -> BTC kiểm tra ở admin mock.

## 1. Chạy project

```bash
npm install
npm run dev
```

Mở trình duyệt ở URL Vite hiển thị, thường là `http://localhost:5173`.

Build production:

```bash
npm run build
npm run preview
```

## 2. Các route chính

- `/` chuyển về workshop mặc định.
- `/journey/green-paper-2026-06-13` landing từ QR.
- `/journey/green-paper-2026-06-13/map` bản đồ hành trình.
- `/journey/green-paper-2026-06-13/map?stopId=stop-seed-paper` mở trực tiếp trạm 1, mô phỏng QR tại từng địa điểm.
- `/journey/green-paper-2026-06-13/passport` passport số của người tham gia.
- `/admin` dashboard mock cho BTC.

## 3. Flow demo 3-5 phút

1. Người tham gia quét QR và vào landing page.
2. Landing giới thiệu Green Journey Map, workshop, topic, tần suất 2 tuần/lần.
3. Người tham gia nhập tên hiển thị, chọn mang vở về hoặc gửi BTC đi thiện nguyện.
4. Bấm **Bắt đầu** để vào map.
5. Click trạm 1 **Gieo Mầm Giấy Cũ**.
6. Upload ảnh giấy/vở cũ hoặc ghi note minh chứng.
7. Bấm **Gửi minh chứng**, sau đó **Đóng dấu trạm này**.
8. Tiếp tục làm trạm 2-5: tái sinh giấy, decor bìa, photobooth, gửi trao yêu thương.
9. Mở **Passport** để xem stamp và ảnh minh chứng đã lưu.
10. Vào trạm cuối **Người Giữ Rừng Giấy**.
11. Đóng dấu trạm cuối để nhận mã đổi quà.
12. Mở `/admin`, BTC xem participant, proof review, reward code và đánh dấu đã đổi quà.

## 4. Cách QR hoạt động trong MVP

Trong MVP, QR được mô phỏng bằng URL. BTC có thể lấy link ở `/admin`:

- QR tổng workshop: mở map hành trình.
- QR từng trạm: mở map và tự bật drawer đúng trạm bằng `stopId`.

Sau này chỉ cần dùng các URL này để tạo QR thật bằng công cụ tạo QR hoặc backend.

## 5. Rule nghiệp vụ đã có

- Người tham gia có `participantId` lưu bằng `localStorage`.
- Trạng thái hành trình không mất khi reload.
- Mỗi trạm 1-5 cần ảnh minh chứng hoặc note trước khi đóng dấu.
- Trạm cuối chỉ mở reward khi các trạm trước đã hoàn thành.
- Mã đổi quà chỉ tạo một lần và giữ cố định.
- Admin mock có thể xem proof/reward và thao tác approve/reject/redeem trong phiên demo.

## 6. Cấu trúc chính

```txt
src/
  app/
  components/
    admin/
    journey/
    layout/
    map/
  data/
  pages/
  services/
  types/
  utils/
```

## 7. Gợi ý phát triển tiếp

- Thay localStorage bằng backend API.
- Lưu ảnh minh chứng lên Cloudinary hoặc server storage.
- Thêm auth đơn giản cho admin.
- Thêm bảng workshop thật, route stop thật, participant thật.
- Thêm trạng thái BTC xác minh proof trước khi stamp được tính chính thức.
- Tạo QR thật từ backend hoặc thư viện QR.
