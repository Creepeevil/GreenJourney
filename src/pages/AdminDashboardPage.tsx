import { CheckCircle2, Gift, Image, QrCode, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { QrLinkCard } from "../components/admin/QrLinkCard";
import { PageShell } from "../components/layout/PageShell";
import { mockParticipants, mockRewardCodes } from "../data/mockParticipants";
import { getStopsByWorkshop } from "../data/routeStops";
import { workshops } from "../data/workshops";
import { loadJourney } from "../services/journeyStorage";
import type { MockRewardCode, ParticipantJourney, Proof } from "../types/journey";

const choiceLabel: Record<string, string> = {
  donate: "Gửi tặng",
  take_home: "Mang về",
  undecided: "Chưa quyết định"
};

export function AdminDashboardPage() {
  const activeWorkshop = workshops[0];
  const stops = getStopsByWorkshop(activeWorkshop.id);
  const [localJourney] = useState<ParticipantJourney>(() => loadJourney(activeWorkshop.id));

  const participants = useMemo(() => {
    const all = [localJourney, ...mockParticipants];
    return all.filter((participant, index, source) => source.findIndex((item) => item.participantId === participant.participantId) === index);
  }, [localJourney]);

  const [proofs, setProofs] = useState<Proof[]>(() => participants.flatMap((participant) => participant.proofs));
  const [rewardCodes, setRewardCodes] = useState<MockRewardCode[]>(() => {
    const localReward = localJourney.rewardCode
      ? [{
          code: localJourney.rewardCode,
          participantId: localJourney.participantId,
          workshopId: localJourney.workshopId,
          status: localJourney.rewardStatus ?? "generated",
          generatedAt: new Date().toISOString()
        } satisfies MockRewardCode]
      : [];
    return [...localReward, ...mockRewardCodes].filter((reward, index, source) => source.findIndex((item) => item.code === reward.code) === index);
  });

  const stats = [
    { label: "Lượt quét QR", value: 186, icon: QrCode },
    { label: "Người tham gia", value: participants.length, icon: Users },
    { label: "Lượt đóng dấu", value: participants.reduce((sum, item) => sum + item.completedStopIds.length, 0), icon: CheckCircle2 },
    { label: "Ảnh minh chứng", value: proofs.length, icon: Image },
    { label: "Vở gửi thiện nguyện", value: participants.filter((item) => item.notebookChoice === "donate").length, icon: Gift }
  ];

  const verifyProof = (proofId: string) => {
    setProofs((items) => items.map((proof) => proof.id === proofId ? { ...proof, status: "approved" } : proof));
  };

  const rejectProof = (proofId: string) => {
    setProofs((items) => items.map((proof) => proof.id === proofId ? { ...proof, status: "rejected" } : proof));
  };

  const markRedeemed = (code: string) => {
    setRewardCodes((items) => items.map((reward) => reward.code === code ? { ...reward, status: "redeemed" } : reward));
  };

  return (
    <PageShell workshopId={activeWorkshop.id}>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-kraft">Admin mock</p>
            <h1 className="text-3xl font-black text-leaf-900">Dashboard BTC</h1>
            <p className="mt-2 text-ink/70">Demo quản lý workshop, QR theo trạm, minh chứng và mã đổi quà. MVP chưa có bảo mật thật.</p>
          </div>
        </div>

        <section className="mt-6 grid gap-3 md:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="rounded-lg border border-leaf-900/10 bg-white/85 p-4 shadow-sm">
                <Icon className="text-leaf-700" />
                <p className="mt-3 text-2xl font-black text-leaf-900">{item.value}</p>
                <p className="text-sm text-ink/60">{item.label}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-6 rounded-lg border border-leaf-900/10 bg-white/85 p-4 shadow-soft">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <div>
              <h2 className="text-xl font-black text-leaf-900">QR / Deep-link cho workshop</h2>
              <p className="mt-1 text-sm text-ink/65">Dùng các link này để tạo QR thật. QR tổng vào map, QR từng trạm sẽ mở đúng drawer nhiệm vụ.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <QrLinkCard workshopId={activeWorkshop.id} label="QR tổng vào bản đồ" />
            {stops.map((stop) => <QrLinkCard key={stop.id} workshopId={activeWorkshop.id} stop={stop} />)}
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-leaf-900/10 bg-white/85 p-4 shadow-soft">
            <h2 className="text-xl font-black text-leaf-900">Workshops</h2>
            <div className="mt-4 space-y-3">
              {workshops.map((workshop) => (
                <div key={workshop.id} className="rounded-lg bg-paper p-3">
                  <p className="font-bold">{workshop.topic}</p>
                  <p className="text-sm text-ink/65">{workshop.date} - {workshop.frequency}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-leaf-900/10 bg-white/85 p-4 shadow-soft">
            <h2 className="text-xl font-black text-leaf-900">Route stops</h2>
            <div className="mt-4 space-y-2">
              {stops.map((stop) => <p key={stop.id} className="rounded-lg bg-paper p-3 text-sm">{stop.order}. {stop.title} — {stop.stampLabel}</p>)}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-leaf-900/10 bg-white/85 p-4 shadow-soft">
          <h2 className="text-xl font-black text-leaf-900">Participants</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-kraft">
                <tr>
                  <th className="py-2">ID</th>
                  <th>Tên</th>
                  <th>Lựa chọn</th>
                  <th>Stamps</th>
                  <th>Proofs</th>
                  <th>Reward</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr key={participant.participantId} className="border-t border-leaf-900/10">
                    <td className="py-3 font-semibold">{participant.participantId}</td>
                    <td>{participant.displayName || "Khách QR"}</td>
                    <td>{choiceLabel[participant.notebookChoice ?? "undecided"]}</td>
                    <td>{participant.completedStopIds.length}/{stops.length}</td>
                    <td>{participant.proofs.length}</td>
                    <td>{participant.rewardCode ?? "Locked"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-leaf-900/10 bg-white/85 p-4 shadow-soft">
            <h2 className="text-xl font-black text-leaf-900">Proof review</h2>
            <div className="mt-4 space-y-3">
              {proofs.length ? proofs.map((proof) => (
                <div key={proof.id} className="rounded-lg bg-paper p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-leaf-900">{proof.participantId}</p>
                      <p className="text-sm text-ink/65">Stop: {stops.find((stop) => stop.id === proof.stopId)?.title ?? proof.stopId}</p>
                      <p className="text-sm font-semibold text-kraft">Trạng thái: {proof.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => verifyProof(proof.id)} className="rounded-lg bg-leaf-700 px-3 py-2 text-sm font-bold text-white">Approve</button>
                      <button onClick={() => rejectProof(proof.id)} className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-kraft">Reject</button>
                    </div>
                  </div>
                  {proof.localPreviewUrl || proof.imageUrl ? <img src={proof.localPreviewUrl ?? proof.imageUrl} alt="Proof" className="mt-3 h-32 w-full rounded-lg object-cover" /> : null}
                  {proof.note && <p className="mt-2 text-sm text-ink/65">{proof.note}</p>}
                </div>
              )) : <p className="text-sm text-ink/60">Chưa có proof mock hoặc proof từ thiết bị hiện tại.</p>}
            </div>
          </div>
          <div className="rounded-lg border border-leaf-900/10 bg-white/85 p-4 shadow-soft">
            <h2 className="text-xl font-black text-leaf-900">Reward codes</h2>
            <div className="mt-4 space-y-3">
              {rewardCodes.length ? rewardCodes.map((reward) => (
                <div key={reward.code} className="rounded-lg bg-paper p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-leaf-900">{reward.code}</p>
                      <p className="text-sm text-ink/65">{reward.participantId}</p>
                      <p className="text-sm font-semibold text-kraft">{reward.status}</p>
                    </div>
                    <button onClick={() => markRedeemed(reward.code)} className="rounded-lg bg-kraft px-3 py-2 text-sm font-bold text-white">Mark redeemed</button>
                  </div>
                </div>
              )) : <p className="text-sm text-ink/60">Chưa có mã đổi quà.</p>}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
