"use client";

import { useState } from "react";

interface Slot {
  id: number;
  limitBreakCount: number;
}

interface CalcResponse {
  totalScore: number;
  scoreSlot1: number;
  scoreSlot2: number;
  scoreSlot3: number;
  scoreSlot4: number;
  scoreSlot5: number;
  scoreSlot6: number;
}

export default function CalculatePage() {
  const [slots, setSlots] = useState<Slot[]>([
    { id: 0, limitBreakCount: 0 },
    { id: 0, limitBreakCount: 0 },
    { id: 0, limitBreakCount: 0 },
    { id: 0, limitBreakCount: 0 },
    { id: 0, limitBreakCount: 0 },
    { id: 0, limitBreakCount: 0 },
  ]);

  const [result, setResult] = useState<CalcResponse | null>(null);

  const handleChange = (index: number, field: keyof Slot, value: number) => {
    const newSlots = [...slots];
    newSlots[index][field] = value;
    setSlots(newSlots);
  };

  const calculate = async () => {
    const body = {
      slot1: slots[0],
      slot2: slots[1],
      slot3: slots[2],
      slot4: slots[3],
      slot5: slots[4],
      slot6: slots[5],
    };

    const res = await fetch("http://localhost:8080/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data: CalcResponse = await res.json();
    setResult(data);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">編成スコア計算</h1>

      {/* Slot 入力カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <h3 className="text-xl font-semibold mb-3">Slot {index + 1}</h3>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                カードID
              </label>
              <input
                type="number"
                value={slot.id}
                onChange={(e) =>
                  handleChange(index, "id", Number(e.target.value))
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                凸数（0〜4）
              </label>
              <input
                type="number"
                value={slot.limitBreakCount}
                onChange={(e) =>
                  handleChange(index, "limitBreakCount", Number(e.target.value))
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 計算ボタン */}
      <button
        onClick={calculate}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        計算する
      </button>

      {/* 結果表示 */}
      {result && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">計算結果</h2>

          <p className="text-lg mb-2">合計スコア：{result.totalScore}</p>

          <div className="grid grid-cols-2 gap-2">
            <p>Slot1：{result.scoreSlot1}</p>
            <p>Slot2：{result.scoreSlot2}</p>
            <p>Slot3：{result.scoreSlot3}</p>
            <p>Slot4：{result.scoreSlot4}</p>
            <p>Slot5：{result.scoreSlot5}</p>
            <p>Slot6：{result.scoreSlot6}</p>
          </div>
        </div>
      )}
    </div>
  );
}
