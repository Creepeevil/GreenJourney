import type { RouteStop } from "../types/journey";

export const routeStops: RouteStop[] = [
  {
    id: "stop-seed-paper",
    workshopId: "green-paper-2026-06-13",
    order: 1,
    title: "Gieo Mầm Giấy Cũ",
    subtitle: "Chapter 1",
    description: "Mang giấy vở cũ đến điểm thu gom để bắt đầu một vòng đời mới cho trang giấy.",
    mission: "Chụp ảnh giấy hoặc vở cũ đã mang đến và xác nhận đã gửi cho BTC.",
    proofHint: "Ảnh chồng giấy, vở cũ hoặc khoảnh khắc bàn giao tại bàn thu gom.",
    stampLabel: "Đã gieo mầm",
    required: true,
    lat: 10.7769,
    lng: 106.7009,
    address: "Bàn thu gom giấy, khu workshop trung tâm"
  },
  {
    id: "stop-rebirth-page",
    workshopId: "green-paper-2026-06-13",
    order: 2,
    title: "Tái Sinh Trang Giấy",
    subtitle: "Chapter 2",
    description: "Khám phá cách giấy cũ được nghiền, ép, phơi và trở thành những trang giấy mới.",
    mission: "Chụp ảnh quá trình tái chế hoặc thành phẩm giấy mới. Ghi một điều bạn học được.",
    proofHint: "Ảnh khay giấy, tấm giấy tái sinh hoặc khu vực hướng dẫn quy trình.",
    stampLabel: "Đã tái sinh",
    required: true,
    lat: 10.7777,
    lng: 106.7022,
    address: "Trạm trải nghiệm tái sinh giấy"
  },
  {
    id: "stop-cover-story",
    workshopId: "green-paper-2026-06-13",
    order: 3,
    title: "Kể Chuyện Trên Bìa Vở",
    subtitle: "Chapter 3",
    description: "Trang trí bìa vở theo chủ đề truyền thông để gửi gắm một thông điệp xanh.",
    mission: "Chụp ảnh bìa vở đã decor và nhập tên câu chuyện hoặc thông điệp của bạn.",
    proofHint: "Ảnh chính diện bìa vở, thấy rõ màu sắc và thông điệp.",
    stampLabel: "Đã kể chuyện",
    required: true,
    lat: 10.7788,
    lng: 106.7012,
    address: "Bàn decor bìa vở"
  },
  {
    id: "stop-green-photobooth",
    workshopId: "green-paper-2026-06-13",
    order: 4,
    title: "Photobooth Xanh",
    subtitle: "Chapter 4",
    description: "Lưu lại khoảnh khắc bạn và cuốn vở tái chế vừa hoàn thành.",
    mission: "Upload ảnh photobooth hoặc ảnh chụp cùng sản phẩm. Chọn quyền dùng ảnh truyền thông.",
    proofHint: "Ảnh bạn cùng cuốn vở tại photobooth, hoặc ảnh sản phẩm trên phông nền xanh.",
    stampLabel: "Đã lưu khoảnh khắc",
    required: true,
    lat: 10.7795,
    lng: 106.6997,
    address: "Góc photobooth xanh"
  },
  {
    id: "stop-give-love",
    workshopId: "green-paper-2026-06-13",
    order: 5,
    title: "Gửi Trao Yêu Thương",
    subtitle: "Chapter 5",
    description: "Chọn mang vở về làm kỷ niệm hoặc gửi lại để BTC trao tặng học sinh vùng sâu vùng xa.",
    mission: "Chọn cách bạn muốn tiếp tục hành trình của cuốn vở. Nếu gửi lại, chụp ảnh bàn giao.",
    proofHint: "Ảnh bàn giao vở cho BTC hoặc ảnh cuốn vở bạn chọn giữ lại.",
    stampLabel: "Đã gửi trao",
    required: true,
    lat: 10.7805,
    lng: 106.7011,
    address: "Bàn gửi vở thiện nguyện"
  },
  {
    id: "stop-forest-keeper",
    workshopId: "green-paper-2026-06-13",
    order: 6,
    title: "Người Giữ Rừng Giấy",
    subtitle: "Final Chapter",
    description: "Xem lại passport số, xác nhận hoàn thành và nhận mã đổi quà xanh từ BTC.",
    mission: "Hoàn thành các trạm bắt buộc trước đó, mở passport và nhận mã đổi quà.",
    proofHint: "Trạm tổng kết không cần ảnh mới. Hãy kiểm tra passport trước khi nhận thưởng.",
    stampLabel: "Hoàn thành hành trình",
    required: true,
    lat: 10.7815,
    lng: 106.7023,
    address: "Quầy tổng kết hành trình"
  }
];

export const getStopsByWorkshop = (workshopId: string) =>
  routeStops
    .filter((stop) => stop.workshopId === workshopId)
    .sort((a, b) => a.order - b.order);
