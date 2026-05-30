import type { Workshop } from "../types/journey";

export const workshops: Workshop[] = [
  {
    id: "green-paper-2026-06-13",
    title: "Green Journey Map - Hành Trình Tái Sinh Giấy",
    topic: "Một trang giấy, thêm một vòng đời",
    date: "2026-06-13",
    frequency: "2 tuần/lần",
    description: "Workshop tái sinh giấy, decor bìa vở, photobooth và gửi vở tặng học sinh vùng sâu vùng xa.",
    locationName: "Không gian cộng đồng Green Hub",
    routeStopIds: [
      "stop-seed-paper",
      "stop-rebirth-page",
      "stop-cover-story",
      "stop-green-photobooth",
      "stop-give-love",
      "stop-forest-keeper"
    ]
  },
  {
    id: "green-paper-2026-06-27",
    title: "Green Journey Map - Hành Trình Tái Sinh Giấy",
    topic: "Bìa vở kể chuyện những tán cây",
    date: "2026-06-27",
    frequency: "2 tuần/lần",
    description: "Phiên workshop tiếp theo với chủ đề thiết kế bìa vở từ ký ức về cây xanh.",
    locationName: "Không gian cộng đồng Green Hub",
    routeStopIds: []
  }
];

export const getWorkshopById = (workshopId?: string) =>
  workshops.find((workshop) => workshop.id === workshopId) ?? workshops[0];
