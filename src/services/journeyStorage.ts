import type { NotebookChoice, ParticipantJourney, Proof, RewardStatus } from "../types/journey";
import { generateRewardCode } from "./rewardCode";

const PARTICIPANT_KEY = "greenJourney.participantId";
const journeyKey = (workshopId: string) => `greenJourney.${workshopId}`;

export const getOrCreateParticipantId = () => {
  const existing = localStorage.getItem(PARTICIPANT_KEY);
  if (existing) return existing;

  const created = `PAPER-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  localStorage.setItem(PARTICIPANT_KEY, created);
  return created;
};

export const createEmptyJourney = (workshopId: string): ParticipantJourney => ({
  participantId: getOrCreateParticipantId(),
  workshopId,
  completedStopIds: [],
  proofs: [],
  rewardStatus: "locked"
});

export const loadJourney = (workshopId: string): ParticipantJourney => {
  const raw = localStorage.getItem(journeyKey(workshopId));
  if (!raw) return createEmptyJourney(workshopId);

  try {
    return { ...createEmptyJourney(workshopId), ...JSON.parse(raw) };
  } catch {
    return createEmptyJourney(workshopId);
  }
};

export const saveJourney = (journey: ParticipantJourney) => {
  localStorage.setItem(journeyKey(journey.workshopId), JSON.stringify(journey));
};

export const updateProfile = (
  workshopId: string,
  updates: Pick<ParticipantJourney, "displayName"> & { notebookChoice?: NotebookChoice },
) => {
  const journey = { ...loadJourney(workshopId), ...updates };
  saveJourney(journey);
  return journey;
};

export const upsertProof = (workshopId: string, proof: Proof) => {
  const journey = loadJourney(workshopId);
  const proofs = journey.proofs.filter((item) => item.stopId !== proof.stopId);
  const next = { ...journey, proofs: [...proofs, proof] };
  saveJourney(next);
  return next;
};

export const completeStop = (workshopId: string, stopId: string) => {
  const journey = loadJourney(workshopId);
  if (journey.completedStopIds.includes(stopId)) return journey;

  const next = {
    ...journey,
    completedStopIds: [...journey.completedStopIds, stopId]
  };
  saveJourney(next);
  return next;
};

export const ensureRewardCode = (workshopId: string) => {
  const journey = loadJourney(workshopId);
  if (journey.rewardCode) return journey;

  const next: ParticipantJourney = {
    ...journey,
    rewardCode: generateRewardCode(Date.now() + journey.participantId.length),
    rewardStatus: "generated"
  };
  saveJourney(next);
  return next;
};

export const setRewardStatus = (workshopId: string, rewardStatus: RewardStatus) => {
  const journey = { ...loadJourney(workshopId), rewardStatus };
  saveJourney(journey);
  return journey;
};

export const resetJourney = (workshopId: string) => {
  const fresh = createEmptyJourney(workshopId);
  localStorage.setItem(journeyKey(workshopId), JSON.stringify(fresh));
  return fresh;
};
