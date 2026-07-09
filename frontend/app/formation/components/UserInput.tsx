"use client";

import { useState } from "react";

export default function UserInput() {

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

    // ゲームUI風アコーディオン
    const Accordion = ({ title, children }: {
        title: string;
        children: React.ReactNode;
    }) => {
        const [open, setOpen] = useState(false);

        return (
            <div className="border-2 border-blue-400 rounded-2xl bg-white shadow-lg mb-4 overflow-hidden">

                {/* タイトル部分 */}
                <button
                    className="w-full text-left px-4 py-3 font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 
                               hover:from-blue-600 hover:to-blue-700 transition-all"
                    onClick={() => setOpen(!open)}
                >
                    {title}
                </button>

                {/* 開閉部分 */}
                <div className={`px-4 py-3 bg-blue-50 transition-all duration-300 ${open ? "block" : "hidden"}`}>
                    {children}
                </div>
            </div>
        );
    };

    // ▼ 必要な項目だけ state を追加（SSRのみでOK）
    const [spVo, setSpVo] = useState(0);
    const [spDa, setSpDa] = useState(0);
    const [spVi, setSpVi] = useState(0);

    const [skillGet, setSkillGet] = useState(0);
    const [activeGet, setActiveGet] = useState(0);
    const [mentalGet, setMentalGet] = useState(0);

    const [skillUp, setSkillUp] = useState(0);
    const [activeUp, setActiveUp] = useState(0);
    const [mentalUp, setMentalUp] = useState(0);

    const [skillDel, setSkillDel] = useState(0);
    const [activeDel, setActiveDel] = useState(0);
    const [mentalDel, setMentalDel] = useState(0);

    const [pDrinkGet, setPDrinkGet] = useState(0);
    const [pDrinkTrade, setPDrinkTrade] = useState(0);

    const [otherItem, setOtherItem] = useState(0);

    return (
        <div className="basis-[15%] min-w-[260px] max-h-[90vh] overflow-y-scroll p-3">

            <h2 className="text-xl font-bold mb-4 text-gray-700">ユーザー入力</h2>

            {/* ■ 活動 */}
            <Accordion title="■ 活動">
                <Counter label="SPレッスン(Vo)" value={spVo} setValue={setSpVo} />
                <Counter label="SPレッスン(Da)" value={spDa} setValue={setSpDa} />
                <Counter label="SPレッスン(Vi)" value={spVi} setValue={setSpVi} />
            </Accordion>

            {/* ■ スキルカード獲得 */}
            <Accordion title="■ スキルカード獲得">
                <Counter label="スキルカード獲得" value={skillGet} setValue={setSkillGet} />
                <Counter label="アクティブスキル獲得" value={activeGet} setValue={setActiveGet} />
                <Counter label="メンタルスキル獲得" value={mentalGet} setValue={setMentalGet} />
            </Accordion>

            {/* ■ スキルカード強化 */}
            <Accordion title="■ スキルカード強化">
                <Counter label="スキルカード強化" value={skillUp} setValue={setSkillUp} />
                <Counter label="アクティブスキル強化" value={activeUp} setValue={setActiveUp} />
                <Counter label="メンタルスキル強化" value={mentalUp} setValue={setMentalUp} />
            </Accordion>

            {/* ■ スキルカード削除 */}
            <Accordion title="■ スキルカード削除">
                <Counter label="スキルカード削除" value={skillDel} setValue={setSkillDel} />
                <Counter label="アクティブスキル削除" value={activeDel} setValue={setActiveDel} />
                <Counter label="メンタルスキル削除" value={mentalDel} setValue={setMentalDel} />
            </Accordion>

            {/* ■ Pドリンク */}
            <Accordion title="■ Pドリンク">
                <Counter label="Pドリンク獲得" value={pDrinkGet} setValue={setPDrinkGet} />
                <Counter label="Pドリンク交換" value={pDrinkTrade} setValue={setPDrinkTrade} />
            </Accordion>

            {/* ■ その他 */}
            <Accordion title="■ その他">
                <Counter label="Pアイテム獲得" value={otherItem} setValue={setOtherItem} />
            </Accordion>

        </div>
    );
}
