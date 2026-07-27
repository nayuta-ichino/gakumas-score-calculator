"use client";

import { useEffect, useState } from "react";

import InitialRegularSchedule from "./schedule/InitialRegularSchedule";
import InitialProSchedule from "./schedule/InitialProSchedule";
import InitialMasterSchedule from "./schedule/InitialMasterSchedule";
import InitialLegendSchedule from "./schedule/InitialLegendSchedule";

import NIAProSchedule from "./schedule/NIAProSchedule";
import NIAMasterSchedule from "./schedule/NIAMasterSchedule";

import HIFSchedule from "./schedule/HIFSchedule";

export default function Schedule({
    setScheduleInfo,
}: {
    setScheduleInfo: (info: any) => void;
}) {


    const [selectedActions, setSelectedActions] = useState<Record<string, string>>({});
    const iconPath = (name: string) => `/schedule-icons/${name}.png`;

    // ★ 初期化用オブジェクト（useEffect より前に置く）
    const defaultCounts = {
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
    };

    // ★ selectedActions が変わるたびに FormationPage に集計結果を渡す
    useEffect(() => {
        // アイコン名 → scheduleInfo のキーへの対応表
        const mapping: Record<string, keyof typeof defaultCounts> = {
            ClassDance: "classDance",
            ClassVisual: "classVisual",
            ClassVocal: "classVocal",
            LessonDance: "lessonDance",
            LessonVisual: "lessonVisual",
            LessonVocal: "lessonVocal",
            Consultation: "consultation",
            Gifts: "gifts",
            GoingOut: "goingOut",
            SpecialInstruction: "specialInstruction",
            Audition: "audition",
            Rest: "rest",
        };

        // 初期化
        const counts = { ...defaultCounts };

        // selectedActions を集計
        Object.values(selectedActions).forEach(icon => {
            const key = mapping[icon];
            if (key) counts[key] += 1;
        });

        // FormationPage に渡す
        setScheduleInfo(counts);

    }, [selectedActions]);


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
    const [scenario, setScenario] = useState("HIF");

    // =========================
    // スケジュール管理（大分類）
    // =========================
    const [openScenario, setOpenScenario] = useState("");

    const changeScenario = (scenarioName: string) => {
        setScenario(scenarioName);
        setOpenScenario("");
    };

    // =========================
    // スケジュールデータ
    // =========================
    const selectionPhase = [
        { day: "S_1日", displayDay: "1日", icons: ["Consultation", "Gifts", "SpecialInstruction"] },
        { day: "S_2日", displayDay: "2日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
        { day: "S_3日", displayDay: "3日", icons: ["ClassVocal", "ClassDance", "ClassVisual"] },
        { day: "S_4日", displayDay: "4日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
        { day: "S_5日", displayDay: "5日", icons: ["GoingOut", "Consultation"] },
        { day: "S_6日", displayDay: "6日", icons: ["ClassVocal", "ClassDance", "ClassVisual"] },
        { day: "S_7日", displayDay: "7日", icons: ["Selection1"] },
        { day: "S_8日", displayDay: "8日", icons: ["GoingOut", "Gifts"] },
        { day: "S_9日", displayDay: "9日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
        { day: "S_10日", displayDay: "10日", icons: ["ClassVocal", "ClassDance", "ClassVisual"] },
        { day: "S_11日", displayDay: "11日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
        { day: "S_12日", displayDay: "12日", icons: ["Consultation", "SpecialInstruction"] },
        { day: "S_13日", displayDay: "13日", icons: ["Selection2"] },
        { day: "S_14日", displayDay: "14日", icons: ["GoingOut", "Gifts"] },
        { day: "S_15日", displayDay: "15日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
        { day: "S_16日", displayDay: "16日", icons: ["GoingOut", "Consultation", "Gifts"] },
        { day: "S_17日", displayDay: "17日", icons: ["ClassVocal", "ClassDance", "ClassVisual"] },
        { day: "S_18日", displayDay: "18日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
        { day: "S_19日", displayDay: "19日", icons: ["Consultation", "SpecialInstruction"] },
        { day: "S_20日", displayDay: "20日", icons: ["Selection3"] },
    ];
    const mainBattlePhase = [
        { day: "M_1日", displayDay: "1日", icons: ["ClassVocal", "ClassDance", "ClassVisual"] },
        { day: "M_2日", displayDay: "2日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
        { day: "M_3日", displayDay: "3日", icons: ["GoingOut", "Gifts"] },
        { day: "M_4日", displayDay: "4日", icons: ["ClassVocal", "ClassDance", "ClassVisual"] },
        { day: "M_5日", displayDay: "5日", icons: ["LessonVocal", "LessonDance", "LessonVisual"] },
        { day: "M_6日", displayDay: "6日", icons: ["Consultation"] },
        // ★ 当日は横長画像3つ
        { day: "M_当日", displayDay: "当日", icons: ["Round1", "Interval", "Round2"] },
    ];
    const isWideRow = (day: string) => {
        return ["S_7日", "S_13日", "S_20日", "M_当日"].includes(day);
    };

    // =========================
    // 行動選択
    // =========================
    const handleSelectAction = (day: string, icon: string) => {
        if (isWideRow(day)) return;
        if (icon === "None") return;

        setSelectedActions(prev => {
            // ★ すでに同じアイコンが選ばれていたら「解除」
            if (prev[day] === icon) {
                const updated = { ...prev };
                delete updated[day]; // ← 選択解除
                localStorage.setItem("selectedActions", JSON.stringify(updated));
                return updated;
            }

            // ★ 新しく選択
            const updated = { ...prev, [day]: icon };
            localStorage.setItem("selectedActions", JSON.stringify(updated));
            return updated;
        });
    };



    {/* スケジュール */ }
    return (
        <div className="basis-[30%] min-w-[380px]">

            {/* スケジュールクリアボタン */}
            <button
                onClick={clearSchedule}
                className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition"
            >
                スケジュールをクリア
            </button>

            {/* 大分類 */}
            <div className="flex gap-4 mb-4">

                {/* 初 */}
                <div
                    className="relative"
                    onMouseEnter={() => setOpenScenario("初")}
                    onMouseLeave={() => setOpenScenario("")}
                >
                    <button
                        className={`px-4 py-2 rounded transition
                                ${scenario.startsWith("初")
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        初
                    </button>

                    {openScenario === "初" && (
                        <div className="
                            absolute left-0 top-full bg-white border rounded shadow 
                            p-2 flex flex-row gap-2 w-max min-w-[120px] z-50
                        ">
                            <button onClick={() => changeScenario("初-レギュラー")} className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                レギュラー
                            </button>
                            <button onClick={() => changeScenario("初-プロ")} className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                プロ
                            </button>
                            <button onClick={() => changeScenario("初-マスター")} className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                マスター
                            </button>
                            <button onClick={() => changeScenario("初-レジェンド")} className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
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
                    <button
                        className={`px-4 py-2 rounded transition
                                ${scenario.startsWith("NIA")
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        NIA
                    </button>

                    {openScenario === "NIA" && (
                        <div className="
                            absolute left-0 top-full bg-white border rounded shadow 
                            p-2 flex flex-row gap-2 w-max min-w-[120px] z-50
                        ">
                            <button onClick={() => changeScenario("NIA-プロ")} className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                プロ
                            </button>
                            <button onClick={() => changeScenario("NIA-マスター")} className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200">
                                マスター
                            </button>
                        </div>
                    )}
                </div>

                {/* HIF */}
                <button
                    onClick={() => changeScenario("HIF")}
                    className={`px-4 py-2 rounded transition
                            ${scenario === "HIF"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    HIF
                </button>
            </div>

            {/* 初-レギュラー */}
            {scenario === "初-レギュラー" && (
                <InitialRegularSchedule />
            )}

            {/* 初-プロ */}
            {scenario === "初-プロ" && (
                <InitialProSchedule />
            )}

            {/* 初-マスター */}
            {scenario === "初-マスター" && (
                <InitialMasterSchedule />
            )}

            {/* 初-レジェンド */}
            {scenario === "初-レジェンド" && (
                <InitialLegendSchedule />
            )}

            {/* NIA-プロ */}
            {scenario === "NIA-プロ" && (
                <NIAProSchedule />
            )}

            {/* NIA-マスター */}
            {scenario === "NIA-マスター" && (
                <NIAMasterSchedule />
            )}

            {/* HIF */}
            {scenario === "HIF" && (
                <HIFSchedule
                    selectionPhase={selectionPhase}
                    mainBattlePhase={mainBattlePhase}
                    selectedActions={selectedActions}
                    handleSelectAction={handleSelectAction}
                    iconPath={iconPath}
                    isWideRow={isWideRow}
                />
            )}
        </div>
    )
}