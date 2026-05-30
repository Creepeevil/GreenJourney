export type NotebookChoice = "take_home" | "donate" | "undecided";
export type ProofStatus = "pending" | "approved" | "rejected";
export type RewardStatus = "locked" | "generated" | "sent_to_organizer" | "redeemed";
export type StopVisualStatus = "locked" | "available" | "completed";

export type Workshop = {
  id: string;
  title: string;
  topic: string;
  date: string;
  frequency: string;
  description: string;
  locationName: string;
  routeStopIds: string[];
};

export type RouteStop = {
  id: string;
  workshopId: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  proofHint: string;
  stampLabel: string;
  required: boolean;
  lat: number;
  lng: number;
  address: string;
};

export type Proof = {
  id: string;
  stopId: string;
  participantId: string;
  imageUrl?: string;
  localPreviewUrl?: string;
  note?: string;
  createdAt: string;
  status: ProofStatus;
};

export type ParticipantJourney = {
  participantId: string;
  workshopId: string;
  displayName?: string;
  notebookChoice?: NotebookChoice;
  completedStopIds: string[];
  proofs: Proof[];
  rewardCode?: string;
  rewardStatus?: RewardStatus;
};

export type MockRewardCode = {
  code: string;
  participantId: string;
  workshopId: string;
  status: RewardStatus;
  generatedAt: string;
};
