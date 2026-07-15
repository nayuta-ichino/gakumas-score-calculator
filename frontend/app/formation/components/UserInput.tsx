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

    // アコーディオン
    const Accordion = ({ title, children }: {
        title: string;
        children: React.ReactNode;
    }) => {
        const [open, setOpen] = useState(false);

        return (
            <div className="border-2 border-blue-400 rounded-2xl bg-white shadow-lg mb-4 overflow-hidden">
                <button
                    className="w-full text-left px-4 py-3 font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 
                               hover:from-blue-600 hover:to-blue-700 transition-all"
                    onClick={() => setOpen(!open)}
                >
                    {title}
                </button>

                <div className={`px-4 py-3 bg-blue-50 transition-all duration-300 ${open ? "block" : "hidden"}`}>
                    {children}
                </div>
            </div>
        );
    };

    // ▼ state（ability_id に対応）
    // スキルカード獲得時（500番台）
    const [mentalGet, setMentalGet] = useState(0);
    const [activeGet, setActiveGet] = useState(0);
    const [skillSSRGet, setSkillSSRGet] = useState(0);
    const [goodGet, setGoodGet] = useState(0);
    const [focusGet, setFocusGet] = useState(0);
    const [genkiGet, setGenkiGet] = useState(0);
    const [impressionGet, setImpressionGet] = useState(0);
    const [onzonGet, setOnzonGet] = useState(0);

    // 獲得時（600番台）
    const [pItemGet, setPItemGet] = useState(0);
    const [pDrinkGet, setPDrinkGet] = useState(0);

    // 強化時（700番台）
    const [skillUp, setSkillUp] = useState(0);
    const [activeUp, setActiveUp] = useState(0);
    const [mentalUp, setMentalUp] = useState(0);

    // 削除時（800番台）
    const [skillDel, setSkillDel] = useState(0);
    const [activeDel, setActiveDel] = useState(0);
    const [mentalDel, setMentalDel] = useState(0);

    // カスタム時（1100番台）
    const [skillCustom, setSkillCustom] = useState(0);

    // チェンジ時（1200番台）
    const [skillChange, setSkillChange] = useState(0);

    // 交換後（1300番台）
    const [pDrinkTradeAfter, setPDrinkTradeAfter] = useState(0);

    return (
        <div className="basis-[15%] min-w-[260px] max-h-[90vh] overflow-y-scroll p-3">

            <h2 className="text-xl font-bold mb-4 text-gray-700">ユーザー入力</h2>
            {/* ■ スキルカード獲得 */}
            <Accordion title="■ スキルカード獲得">
                <Counter label="メンタル" value={mentalGet} setValue={setMentalGet} />
                <Counter label="アクティブ" value={activeGet} setValue={setActiveGet} />
                <Counter label="スキル（SSR）" value={skillSSRGet} setValue={setSkillSSRGet} />
                <Counter label="好調" value={goodGet} setValue={setGoodGet} />
                <Counter label="集中" value={focusGet} setValue={setFocusGet} />
                <Counter label="元気" value={genkiGet} setValue={setGenkiGet} />
                <Counter label="好印象" value={impressionGet} setValue={setImpressionGet} />
                <Counter label="温存" value={onzonGet} setValue={setOnzonGet} />
            </Accordion>

            {/* ■ 獲得 */}
            <Accordion title="■ 獲得">
                <Counter label="Pアイテム" value={pItemGet} setValue={setPItemGet} />
                <Counter label="Pドリンク" value={pDrinkGet} setValue={setPDrinkGet} />
            </Accordion>

            {/* ■ 強化 */}
            <Accordion title="■ 強化">
                <Counter label="スキル" value={skillUp} setValue={setSkillUp} />
                <Counter label="アクティブ" value={activeUp} setValue={setActiveUp} />
                <Counter label="メンタル" value={mentalUp} setValue={setMentalUp} />
            </Accordion>

            {/* ■ 削除 */}
            <Accordion title="■ 削除">
                <Counter label="スキル" value={skillDel} setValue={setSkillDel} />
                <Counter label="アクティブ" value={activeDel} setValue={setActiveDel} />
                <Counter label="メンタル" value={mentalDel} setValue={setMentalDel} />
            </Accordion>

            {/* ■ カスタム */}
            <Accordion title="■ カスタム">
                <Counter label="スキルカスタム" value={skillCustom} setValue={setSkillCustom} />
            </Accordion>

            {/* ■ チェンジ */}
            <Accordion title="■ チェンジ">
                <Counter label="スキルチェンジ" value={skillChange} setValue={setSkillChange} />
            </Accordion>

            {/* ■ 交換 */}
            <Accordion title="■ 交換">
                <Counter label="相談Pドリンク交換後" value={pDrinkTradeAfter} setValue={setPDrinkTradeAfter} />
            </Accordion>

        </div>
    );
}
