import type { MockRewardCode, ParticipantJourney } from "../types/journey";

export const mockParticipants: ParticipantJourney[] = [
  {
    participantId: "PAPER-AN-001",
    workshopId: "green-paper-2026-06-13",
    displayName: "An",
    notebookChoice: "donate",
    completedStopIds: ["stop-seed-paper", "stop-rebirth-page", "stop-cover-story", "stop-green-photobooth", "stop-give-love", "stop-forest-keeper"],
    rewardCode: "GREEN-2026-A7K2",
    rewardStatus: "redeemed",
    proofs: [
      {
        id: "proof-an-1",
        stopId: "stop-seed-paper",
        participantId: "PAPER-AN-001",
        imageUrl: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=600&q=80",
        note: "Em gửi lại giấy vở cũ cho vòng đời mới.",
        createdAt: "2026-06-13T03:10:00.000Z",
        status: "approved"
      }
    ]
  },
  {
    participantId: "PAPER-MAI-002",
    workshopId: "green-paper-2026-06-13",
    displayName: "Mai",
    notebookChoice: "take_home",
    completedStopIds: ["stop-seed-paper", "stop-rebirth-page", "stop-cover-story"],
    rewardStatus: "locked",
    proofs: []
  },
  {
    participantId: "PAPER-LONG-003",
    workshopId: "green-paper-2026-06-13",
    displayName: "Long",
    notebookChoice: "undecided",
    completedStopIds: ["stop-seed-paper"],
    rewardStatus: "locked",
    proofs: []
  }
];

export const mockRewardCodes: MockRewardCode[] = [
  {
    code: "GREEN-2026-A7K2",
    participantId: "PAPER-AN-001",
    workshopId: "green-paper-2026-06-13",
    status: "redeemed",
    generatedAt: "2026-06-13T05:20:00.000Z"
  },
  {
    code: "GREEN-2026-M4P8",
    participantId: "PAPER-DEMO-004",
    workshopId: "green-paper-2026-06-13",
    status: "generated",
    generatedAt: "2026-06-13T06:00:00.000Z"
  }
];
