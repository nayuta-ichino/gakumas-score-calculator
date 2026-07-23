"use client";

import { useState, Suspense } from "react";
import SupportFormation from "./components/SupportFormation";
import Schedule from "./components/Schedule";
import UserInput from "./components/UserInput";

export default function FormationPage() {
  const [formationSlots, setFormationSlots] = useState({
    slot1: { id: 0, limitBreakCount: 0 },
    slot2: { id: 0, limitBreakCount: 0 },
    slot3: { id: 0, limitBreakCount: 0 },
    slot4: { id: 0, limitBreakCount: 0 },
    slot5: { id: 0, limitBreakCount: 0 },
    slot6: { id: 0, limitBreakCount: 0 },
  });

  const [scheduleInfo, setScheduleInfo] = useState({
    classDance: 0,
    classVisual: 0,
    classVocal: 0,
    lessonDance: 0,
    lessonVisual: 0,
    lessonVocal: 0,
    consultation: 0,
    gifts: 0,
    goingOut: 0,
    specialInstruction: 0,
    audition: 0,
    rest: 0,
  });

  const [totalScore, setTotalScore] = useState<number | null>(null);

  return (
    <div className="p-6 w-full max-w-[1600px] mx-auto flex flex-nowrap justify-between gap-10">

      {/* 合計スコア表示 */}
      <div className="fixed top-4 right-4 bg-white/80 backdrop-blur-md shadow-lg rounded-xl px-6 py-3 border border-gray-200">
        <p className="text-sm text-gray-500">合計スコア</p>
        <p className="text-2xl font-bold text-indigo-600">{totalScore ?? "-"}</p>
      </div>

      <Suspense fallback={<div className="text-gray-500">フォーメーションを読み込み中...</div>}>
        <SupportFormation setFormationSlots={setFormationSlots} />
      </Suspense>

      <Schedule setScheduleInfo={setScheduleInfo} />
      <UserInput
        setTotalScore={setTotalScore}
        formationSlots={formationSlots}
        scheduleInfo={scheduleInfo}
      />

    </div>
  );
}
