"use client";

import { useState } from "react";

export default function UserInput({
  setTotalScore,
  formationSlots,
  scheduleInfo,
}: {
  setTotalScore: (score: number) => void;
  formationSlots: any;
  scheduleInfo: any;
}) {

  // ★ どのアコーディオンが開いているかを管理する
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // 汎用カウンター
  const Counter = ({ label, value, setValue }: {
    label: string;
    value: number;
    setValue: (v: number) => void;
  }) => (
    <div className="flex items-center justify-between py-2">
      <span className="font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 bg-blue-200 text-blue-900 rounded-lg shadow hover:bg-blue-300"
          onClick={() => setValue(Math.max(0, value - 1))}
        >
          −
        </button>
        <span className="w-8 text-center font-bold">{value}</span>
        <button
          className="px-2 py-1 bg-blue-200 text-blue-900 rounded-lg shadow hover:bg-blue-300"
          onClick={() => setValue(value + 1)}
        >
          ＋
        </button>
      </div>
    </div>
  );

  // ★ 親が open を管理するアコーディオン
  const Accordion = ({
    title,
    id,
    children,
  }: {
    title: string;
    id: string;
    children: React.ReactNode;
  }) => (
    <div className="border-2 border-blue-400 rounded-2xl bg-white shadow-lg mb-4 overflow-hidden">
      <button
        className="w-full text-left px-4 py-3 font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 
                   hover:from-blue-600 hover:to-blue-700 transition-all"
        onClick={() =>
          setOpenAccordion(openAccordion === id ? null : id)
        }
      >
        {title}
      </button>

      <div
        className={`px-4 py-3 bg-blue-50 transition-all duration-300 ${
          openAccordion === id ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );

  // ▼ state（ability_id に対応）
  const [mentalGet, setMentalGet] = useState(0);
  const [activeGet, setActiveGet] = useState(0);
  const [skillSSRGet, setSkillSSRGet] = useState(0);
  const [goodGet, setGoodGet] = useState(0);
  const [focusGet, setFocusGet] = useState(0);
  const [powerGet, setPowerGet] = useState(0);
  const [impressionGet, setImpressionGet] = useState(0);
  const [coolDownGet, setCoolDownGet] = useState(0);

  const [pItemGet, setProduceItemGet] = useState(0);
  const [pDrinkGet, setProduceDrinkGet] = useState(0);

  const [skillUp, setSkillUp] = useState(0);
  const [activeUp, setActiveUp] = useState(0);
  const [mentalUp, setMentalUp] = useState(0);

  const [skillDel, setSkillDel] = useState(0);
  const [activeDel, setActiveDel] = useState(0);
  const [mentalDel, setMentalDel] = useState(0);

  const [skillCustom, setSkillCustom] = useState(0);
  const [skillChange, setSkillChange] = useState(0);

  const [pDrinkTradeAfter, setProduceDrinkTradeAfter] = useState(0);

  return (
    <div className="basis-[18%] min-w-[280px] max-h-[90vh] overflow-y-scroll p-3 flex flex-col gap-6">

      {/* ★ 上段：合計スコア + 計算ボタン */}
      <div className="p-4 bg-white rounded-xl shadow-md border">
        <div className="text-xl font-bold mb-3 text-gray-700">
          合計スコア
        </div>

        <button
          onClick={async () => {
            const res = await fetch("http://localhost:8080/api/calculation/totalscore", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...formationSlots,
                scheduleInfomation: scheduleInfo,
                userInputInfomation: {
                  mentalGet,
                  activeGet,
                  skillSSRGet,
                  goodGet,
                  focusGet,
                  powerGet,
                  impressionGet,
                  coolDownGet,
                  produceItemGet: pItemGet,
                  produceDrinkGet: pDrinkGet,
                  skillUp,
                  activeUp,
                  mentalUp,
                  skillDel,
                  activeDel,
                  mentalDel,
                  skillCustom,
                  skillChange,
                  produceDrinkTradeAfter: pDrinkTradeAfter,
                },
              }),
            });

            const data = await res.json();
            setTotalScore(data.totalScore);
          }}
          className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700"
        >
          計算する
        </button>
      </div>

      {/* ★ 下段：ユーザー入力セクション */}
      <div className="p-4 bg-white rounded-xl shadow-md border">

        <h2 className="text-xl font-bold mb-4 text-gray-700">ユーザー入力</h2>

        <Accordion title="■ スキルカード獲得" id="skillGet">
          <Counter label="メンタル" value={mentalGet} setValue={setMentalGet} />
          <Counter label="アクティブ" value={activeGet} setValue={setActiveGet} />
          <Counter label="スキル（SSR）" value={skillSSRGet} setValue={setSkillSSRGet} />
          <Counter label="好調" value={goodGet} setValue={setGoodGet} />
          <Counter label="集中" value={focusGet} setValue={setFocusGet} />
          <Counter label="元気" value={powerGet} setValue={setPowerGet} />
          <Counter label="好印象" value={impressionGet} setValue={setImpressionGet} />
          <Counter label="温存" value={coolDownGet} setValue={setCoolDownGet} />
        </Accordion>

        <Accordion title="■ 獲得" id="get">
          <Counter label="Pアイテム" value={pItemGet} setValue={setProduceItemGet} />
          <Counter label="Pドリンク" value={pDrinkGet} setValue={setProduceDrinkGet} />
        </Accordion>

        <Accordion title="■ 強化" id="up">
          <Counter label="スキル" value={skillUp} setValue={setSkillUp} />
          <Counter label="アクティブ" value={activeUp} setValue={setActiveUp} />
          <Counter label="メンタル" value={mentalUp} setValue={setMentalUp} />
        </Accordion>

        <Accordion title="■ 削除" id="del">
          <Counter label="スキル" value={skillDel} setValue={setSkillDel} />
          <Counter label="アクティブ" value={activeDel} setValue={setActiveDel} />
          <Counter label="メンタル" value={mentalDel} setValue={setMentalDel} />
        </Accordion>

        <Accordion title="■ カスタム" id="custom">
          <Counter label="スキルカスタム" value={skillCustom} setValue={setSkillCustom} />
        </Accordion>

        <Accordion title="■ チェンジ" id="change">
          <Counter label="スキルチェンジ" value={skillChange} setValue={setSkillChange} />
        </Accordion>

        <Accordion title="■ 交換" id="trade">
          <Counter label="相談Pドリンク交換後" value={pDrinkTradeAfter} setValue={setProduceDrinkTradeAfter} />
        </Accordion>

      </div>
    </div>
  );
}
