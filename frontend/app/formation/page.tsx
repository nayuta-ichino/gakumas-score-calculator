"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Slot {
    id: number;
    limitBreakCount: number;
    image: string;
    name: string;
}

// =========================
// スケジュールデータ
// =========================

const selectionPhase = [
    { day: "1日", icons: ["Consultation", "Gifts", "SpecialInstruction"] },
    { day: "2日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
    { day: "3日", icons: ["ClassVocal", "ClassDance", "ClassVisual"] },
    { day: "4日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
    { day: "5日", icons: ["GoingOut", "Consultation"] },
    { day: "6日", icons: ["ClassVocal", "ClassDance", "ClassVisual"] },
    { day: "7日", icons: ["Selection1"] },
    { day: "8日", icons: ["GoingOut", "Gifts"] },
    { day: "9日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
    { day: "10日", icons: ["ClassVocal", "ClassDance", "ClassVisual"] },
    { day: "11日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
    { day: "12日", icons: ["Consultation", "SpecialInstruction"] },
    { day: "13日", icons: ["Selection2"] },
    { day: "14日", icons: ["GoingOut", "Gifts"] },
    { day: "15日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
    { day: "16日", icons: ["GoingOut", "Consultation", "Gifts"] },
    { day: "17日", icons: ["ClassVocal", "ClassDance", "ClassVisual"] },
    { day: "18日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
    { day: "19日", icons: ["Consultation", "SpecialInstruction"] },
    { day: "20日", icons: ["Selection3"] },
];

const mainBattlePhase = [
    { day: "1日", icons: ["ClassVocal", "ClassDance", "ClassVisual"] },
    { day: "2日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
    { day: "3日", icons: ["GoingOut", "Gifts"] },
    { day: "4日", icons: ["ClassVocal", "ClassDance", "ClassVisual"] },
    { day: "5日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
    { day: "6日", icons: ["Consultation"] },

    // ★ 当日は横長画像3つ
    { day: "当日", icons: ["Round1", "Interval", "Round2"] },
];

const iconPath = (name: string) => `/schedule-icons/${name}.png`;

const isWideRow = (day: string) => {
    return ["7日", "13日", "20日", "当日"].includes(day);
};

export default function FormationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedActions, setSelectedActions] = useState<Record<string, string>>({});

    // =========================
    // 初期ロード
    // =========================
    useEffect(() => {
        const saved = localStorage.getItem("formationSlots");
        if (saved) {
            setSlots(JSON.parse(saved));
        } else {
            setSlots([
                { id: 0, limitBreakCount: 0, image: "", name: "" },
                { id: 0, limitBreakCount: 0, image: "", name: "" },
                { id: 0, limitBreakCount: 0, image: "", name: "" },
                { id: 0, limitBreakCount: 0, image: "", name: "" },
                { id: 0, limitBreakCount: 0, image: "", name: "" },
                { id: 0, limitBreakCount: 0, image: "", name: "" },
            ]);
        }
    }, []);

    // =========================
    // カード選択反映
    // =========================
    useEffect(() => {
        const slot = searchParams.get("slot");
        const id = searchParams.get("id");
        const limitBreakCount = searchParams.get("limitBreakCount");
        const image = searchParams.get("image");
        const name = searchParams.get("name");

        if (slot && id && image && name) {
            setSlots((prev) => {
                const newSlots = [...prev];
                newSlots[Number(slot) - 1] = {
                    id: Number(id),
                    limitBreakCount: Number(limitBreakCount),
                    image: image,
                    name: name,
                };
                localStorage.setItem("formationSlots", JSON.stringify(newSlots));
                return newSlots;
            });
        }
    }, [searchParams]);

    // =========================
    // 初期ロード時に localStorage から読み込む
    // =========================
    useEffect(() => {
        const savedSchedule = localStorage.getItem("selectedActions");
        if (savedSchedule) {
            setSelectedActions(JSON.parse(savedSchedule));
        }
    }, []);


    // =========================
    // 一括操作ボタン（編成枠）
    // =========================
    const setAllLimitBreak0 = () => {
        const updated = slots.map(slot =>
            slot.id !== 0 ? { ...slot, limitBreakCount: 0 } : slot
        );
        setSlots(updated);
        localStorage.setItem("formationSlots", JSON.stringify(updated));
    };

    const setAllLimitBreak4 = () => {
        const updated = slots.map(slot =>
            slot.id !== 0 ? { ...slot, limitBreakCount: 4 } : slot
        );
        setSlots(updated);
        localStorage.setItem("formationSlots", JSON.stringify(updated));
    };

    const clearFormation = () => {
        const empty = slots.map(() => ({
            id: 0,
            limitBreakCount: 0,
            image: "",
            name: "",
        }));
        setSlots(empty);
        localStorage.setItem("formationSlots", JSON.stringify(empty));
    };

    // =========================
    // スケジュールクリア
    // =========================
    const clearSchedule = () => {
        setSelectedActions({});
        localStorage.removeItem("selectedActions");
    };

    // =========================
    // 現在のシナリオ（初 / NIA / HIF）
    // =========================
    const [scenario, setScenario] = useState("初");

    // =========================
    // スケジュール管理（大分類）
    // =========================
    const [openScenario, setOpenScenario] = useState("");

    const changeScenario = (scenarioName: string) => {
        setScenario(scenarioName);
        setOpenScenario("");
    };



    // =========================
    // 行動選択
    // =========================
    const handleSelectAction = (day: string, icon: string) => {
        if (isWideRow(day)) return;
        if (icon === "None") return;

        setSelectedActions((prev) => {
            const updated = { ...prev, [day]: icon };
            localStorage.setItem("selectedActions", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <div className="p-6 w-full max-w-[1600px] mx-auto font-sans bg-gray-50 text-gray-800 
                    flex flex-nowrap justify-between gap-10 overflow-hidden">

            {/* 左：編成 */}
            <div className="basis-[50%] min-w-[750px] pt-2">
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => {
                            const empty = slots.map(() => ({
                                id: 0,
                                limitBreakCount: 0,
                                image: "",
                                name: "",
                            }));
                            setSlots(empty);
                            localStorage.setItem("formationSlots", JSON.stringify(empty));
                        }}
                        className=" px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                    >
                        編成をクリア
                    </button>

                    {/* 一括操作ボタン */}
                    <button
                        onClick={setAllLimitBreak0}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition"
                    >
                        すべて0凸
                    </button>

                    <button
                        onClick={setAllLimitBreak4}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition"
                    >
                        すべて4凸
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {slots.map((slot, index) => (
                        <div
                            key={index}
                            className="border rounded-lg bg-white shadow-md hover:shadow-lg transition 
                            flex flex-col items-center justify-center
                            h-40 w-[240px] p-2 relative"
                        >
                            {slot.id !== 0 ? (
                                <div className="flex flex-col items-center justify-center h-full w-full">

                                    {/* ▼ Slot カード（一覧画面と同じデザイン＋高さ縮小＋画像クリックで変更） */}
                                    <div
                                        className="relative w-full h-20 cursor-pointer border-2 rounded-xl shadow-sm hover:shadow-lg transition"
                                        onClick={() => router.push(`/support-cards?slot=${index + 1}`)}
                                    >
                                        {/* カード画像 */}
                                        <img
                                            src={slot.image}
                                            alt={slot.name}
                                            className="w-full h-full object-cover rounded-xl object-[center_40%]"
                                        />

                                        {/* カード名（画像に重ねる） */}
                                        <div className="
                                            absolute bottom-0 left-0 right-0
                                            bg-black/60 text-white text-xs font-bold
                                            px-2 py-1 rounded-b-xl text-center
                                        ">
                                            {slot.name}
                                        </div>
                                    </div>

                                    {/* ▼ 凸ボタン（画像と重ならないように mt-3） */}
                                    <div className="mt-3 flex gap-1 justify-center">
                                        {[0, 1, 2, 3, 4].map((lv) => (
                                            <button
                                                key={lv}
                                                onClick={() => {
                                                    setSlots((prev) => {
                                                        const newSlots = [...prev];
                                                        newSlots[index].limitBreakCount = lv;
                                                        localStorage.setItem(
                                                            "formationSlots",
                                                            JSON.stringify(newSlots)
                                                        );
                                                        return newSlots;
                                                    });
                                                }}
                                                className={`px-2 py-1 rounded border text-sm ${slot.limitBreakCount === lv
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-200 hover:bg-gray-300"
                                                    }`}
                                            >
                                                {lv}凸
                                            </button>
                                        ))}
                                    </div>

                                </div>
                            ) : (
                                <button
                                    className="text-4xl font-bold text-blue-600 hover:text-blue-800 transition"
                                    onClick={() => router.push(`/support-cards?slot=${index + 1}`)}
                                >
                                    ＋
                                </button>
                            )}

                            {/* × ボタン（右上に配置） */}
                            <button
                                className="
                                    absolute top-1 right-1
                                    w-6 h-6 flex items-center justify-center
                                    bg-red-500 text-white rounded-full
                                    hover:bg-red-600 transition
                                "
                                onClick={() => {
                                    setSlots((prev) => {
                                        const newSlots = [...prev];
                                        newSlots[index] = {
                                            id: 0,
                                            image: "",
                                            name: "",
                                            limitBreakCount: 0,
                                        };
                                        localStorage.setItem("formationSlots", JSON.stringify(newSlots));
                                        return newSlots;
                                    });
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 中央：スケジュール */}
            <div className="basis-[30%] min-w-[380px]">
                {/* スケジュールクリアボタン */}
                <button
                    onClick={clearSchedule}
                    className="mb-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                    スケジュールをクリアする
                </button>
                <h2 className="text-2xl font-bold mb-4">スケジュール</h2>
                <div className="flex gap-4 mb-4">

                    {/* 初 */}
                    <div
                        className="relative"
                        onMouseEnter={() => setOpenScenario("初")}
                        onMouseLeave={() => setOpenScenario("")}
                    >
                        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                            初
                        </button>

                        {openScenario === "初" && (
                            <div className="
                                absolute left-0 mt-0.5 bg-white border rounded shadow 
                                p-2 flex flex-row gap-2 w-max min-w-[120px] z-50
                            ">
                                <button className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                    レギュラー
                                </button>
                                <button className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                    プロ
                                </button>
                                <button className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                    マスター
                                </button>
                                <button className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                    レジェンド
                                </button>
                            </div>
                        )}
                    </div>


                    {/* NIA */}
                    <div
                        className="relative"
                        onMouseEnter={() => setOpenScenario("NIA")}
                        onMouseLeave={() => setOpenScenario("")}
                    >
                        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                            NIA
                        </button>

                        {openScenario === "NIA" && (
                            <div className="
                                absolute left-0 mt-0.5 bg-white border rounded shadow 
                                p-2 flex flex-row gap-2 w-max min-w-[120px] z-50
                            ">
                                <button className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                    プロ
                                </button>
                                <button className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                    マスター
                                </button>

                            </div>
                        )}
                    </div>

                    {/* HIF（中分類なし） */}
                        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                            HIF
                        </button>
                    {/* <div
                        className="relative"
                        onMouseEnter={() => setOpenScenario("HIF")}
                        onMouseLeave={() => setOpenScenario("")}
                    >
                        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                            HIF
                        </button>

                        {openScenario === "HIF" && (
                            <div className="
                                absolute left-0 mt-0.5 bg-white border rounded shadow 
                                p-2 flex flex-row gap-2 w-max min-w-[120px] z-50
                            ">
                                <button className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                    プロ
                                </button>
                                <button className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                    マスター
                                </button>

                            </div>
                        )}
                    </div> */}

                </div>


                <div className="h-[70vh] overflow-y-scroll border rounded-xl p-5 bg-gray-50 shadow-lg w-full">

                    {/* 見出し */}
                    <h3 className="text-xl font-bold mb-4 text-center text-blue-600">
                        選抜試験
                    </h3>

                    {selectionPhase.map((row, idx) => {
                        const paddedIcons = [...row.icons];
                        while (paddedIcons.length < 3) paddedIcons.push("None");

                        return (
                            <div key={idx} className="mb-3">
                                {isWideRow(row.day) ? (
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="w-24 font-bold text-xl">{row.day}</div>
                                        <img
                                            src={iconPath(row.icons[0])}
                                            className="flex-1 h-20 object-contain"
                                            alt=""
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <div className="w-17 font-bold text-xl">{row.day}</div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {paddedIcons.map((icon, i) => (
                                                <div key={`${icon}-${i}`} className="relative">
                                                    {icon === "None" ? (
                                                        <div className="w-13 h-13 opacity-20 border border-gray-300 rounded-lg"></div>
                                                    ) : (
                                                        <>
                                                            <img
                                                                src={iconPath(icon)}
                                                                className={`cursor-pointer ${selectedActions[row.day] === icon
                                                                    ? ""
                                                                    : "opacity-40"
                                                                    } ${["Selection1", "Selection2", "Selection3", "Round1", "Round2", "Interval"].includes(icon)
                                                                        ? "w-10 h-10"
                                                                        : "w-13 h-13"
                                                                    }`}
                                                                onClick={() => handleSelectAction(row.day, icon)}
                                                                alt=""
                                                            />

                                                            {selectedActions[row.day] === icon && (
                                                                <span className="absolute top-0 right-0 text-blue-600 text-xl font-bold">
                                                                    ☑
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* 見出し */}
                    <h3 className="text-xl font-bold mt-6 mb-4 text-center text-red-600">
                        本戦
                    </h3>

                    {mainBattlePhase.map((row, idx) => {
                        const paddedIcons = [...row.icons];
                        while (paddedIcons.length < 3) paddedIcons.push("None");

                        return (
                            <div key={idx} className="mb-3">
                                {isWideRow(row.day) ? (
                                    <div className="flex items-start gap-3 w-full">
                                        <div className="w-17 font-bold text-xl">{row.day}</div>

                                        <div className="flex-1 flex flex-col gap-2">
                                            {row.icons.map((icon) => (
                                                <img
                                                    key={icon}
                                                    src={iconPath(icon)}
                                                    className="w-full h-20 object-contain"
                                                    alt=""
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <div className="w-24 font-bold text-xl">{row.day}</div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {paddedIcons.map((icon, i) => {
                                                const selected = selectedActions[row.day] === icon;

                                                return (
                                                    <div
                                                        key={`${icon}-${i}`}
                                                        className={`
                                                            relative p-1 rounded cursor-pointer transition
                                                            ${selected ? "scale-110 border-2 border-blue-500 bg-blue-100" : ""}
                                                        `}
                                                        onClick={() => handleSelectAction(row.day, icon)}
                                                    >
                                                        {icon === "None" ? (
                                                            <div className="w-13 h-13 opacity-20 border border-gray-300 rounded-lg"></div>
                                                        ) : (
                                                            <>
                                                                <img
                                                                    src={iconPath(icon)}
                                                                    className={`
                                                                            ${selected ? "" : "opacity-40"}
                                                                            ${["Selection1", "Selection2", "Selection3", "Round1", "Round2", "Interval"].includes(icon)
                                                                            ? "w-10 h-10"
                                                                            : "w-13 h-13"
                                                                        }
                                                                    `}
                                                                    alt=""
                                                                />

                                                                {selected && (
                                                                    <span className="absolute top-0 right-0 text-blue-600 text-xl font-bold">
                                                                        ☑
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 右：ユーザー入力枠 */}
            <div className="basis-[15%] min-w-[220px] flex flex-col gap-6">
                <div className="p-5 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <label className="font-semibold text-gray-700 text-sm">
                        アクティブカード取得枚数
                    </label>
                    <input
                        type="number"
                        className="w-full mt-2 p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="例：12"
                    />
                </div>

                <div className="p-5 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <label className="font-semibold text-gray-700 text-sm">
                        カードチェンジ回数
                    </label>
                    <input
                        type="number"
                        className="w-full mt-2 p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="例：3"
                    />
                </div>
            </div>

        </div>
    );
}
