"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CardComponent from "../../support-cards/components/CardComponent";

type Slot = {
    id: number;
    limitBreakCount: number;
    image: string;
    name: string;
    attribute: "Vo" | "Da" | "Vi" | "";
};

export default function SupportFormation({
    setFormationSlots,
}: {
    setFormationSlots: (slots: any) => void;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [slots, setSlots] = useState<Slot[]>([]);

    // ① 初期ロード：6枠を必ず用意する
    useEffect(() => {
        const saved = localStorage.getItem("formationSlots");
        if (saved) {
            setSlots(JSON.parse(saved));
        } else {
            setSlots([
                { id: 0, limitBreakCount: 0, image: "", name: "", attribute: "" },
                { id: 0, limitBreakCount: 0, image: "", name: "", attribute: "" },
                { id: 0, limitBreakCount: 0, image: "", name: "", attribute: "" },
                { id: 0, limitBreakCount: 0, image: "", name: "", attribute: "" },
                { id: 0, limitBreakCount: 0, image: "", name: "", attribute: "" },
                { id: 0, limitBreakCount: 0, image: "", name: "", attribute: "" },
            ]);
        }
    }, []);

    // ② カード選択画面から戻ってきたときに slots を更新する
    useEffect(() => {
        const slot = searchParams.get("slot");
        const id = searchParams.get("id");
        const limitBreakCount = searchParams.get("limitBreakCount");
        const image = searchParams.get("image");
        const name = searchParams.get("name");
        const rawAttr = searchParams.get("attribute");
        const attribute: "Vo" | "Da" | "Vi" | "" =
            rawAttr === "Vo" || rawAttr === "Da" || rawAttr === "Vi" ? rawAttr : "";

        if (slot && id && image && name) {
            setSlots((prev) => {
                const newSlots = [...prev];

                newSlots[Number(slot) - 1] = {
                    id: Number(id),
                    limitBreakCount: Number(limitBreakCount),
                    image,
                    name,
                    attribute,
                };

                localStorage.setItem("formationSlots", JSON.stringify(newSlots));
                return newSlots;
            });
        }
    }, [searchParams]);

    // ③ slots が変わったら、formationSlots を親に渡す
    useEffect(() => {
        setFormationSlots({
            slot1: { id: slots[0]?.id ?? 0, limitBreakCount: slots[0]?.limitBreakCount ?? 0 },
            slot2: { id: slots[1]?.id ?? 0, limitBreakCount: slots[1]?.limitBreakCount ?? 0 },
            slot3: { id: slots[2]?.id ?? 0, limitBreakCount: slots[2]?.limitBreakCount ?? 0 },
            slot4: { id: slots[3]?.id ?? 0, limitBreakCount: slots[3]?.limitBreakCount ?? 0 },
            slot5: { id: slots[4]?.id ?? 0, limitBreakCount: slots[4]?.limitBreakCount ?? 0 },
            slot6: { id: slots[5]?.id ?? 0, limitBreakCount: slots[5]?.limitBreakCount ?? 0 },
        });
    }, [slots]);

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
            attribute: "" as "",
        }));
        setSlots(empty);
        localStorage.setItem("formationSlots", JSON.stringify(empty));
    };

    // =========================
    // UI（後半）
    // =========================
    return (
        <div className="w-full">

            {/* 一括操作ボタンエリア */}
            <div className="flex gap-4 mb-6">

                <button
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow text-white"
                    onClick={clearFormation}
                >
                    編成クリア
                </button>

                <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow text-sm"
                    onClick={setAllLimitBreak0}
                >
                    すべて0凸
                </button>

                <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow text-sm"
                    onClick={setAllLimitBreak4}
                >
                    すべて4凸
                </button>

            </div>

            {/* カード一覧 */}
            <div className="grid grid-cols-3 gap-6">
                {slots.map((slot, index) => (
                    slot.id !== 0 ? (
                        <CardComponent
                            key={index}
                            card={{
                                id: slot.id,
                                name: slot.name,
                                attribute: slot.attribute,
                                limitBreak: slot.limitBreakCount,
                                image: slot.image,
                            }}
                            onDelete={() => {
                                setSlots((prev) => {
                                    const newSlots = [...prev];
                                    newSlots[index] = {
                                        id: 0,
                                        image: "",
                                        name: "",
                                        attribute: "",
                                        limitBreakCount: 0,
                                    };
                                    localStorage.setItem("formationSlots", JSON.stringify(newSlots));
                                    return newSlots;
                                });
                            }}
                            onChangeLimitBreak={(id, newLimitBreak) => {
                                setSlots((prev) => {
                                    const newSlots = [...prev];
                                    newSlots[index].limitBreakCount = newLimitBreak;
                                    localStorage.setItem("formationSlots", JSON.stringify(newSlots));
                                    return newSlots;
                                });
                            }}
                        />
                    ) : (
                        <button
                            key={index}
                            className="
                                border border-gray-300 rounded-xl shadow-md bg-white
                                flex items-center justify-center
                                h-40
                                text-3xl font-bold text-blue-600 hover:text-blue-800 transition
                            "
                            onClick={() => router.push(`/support-cards?slot=${index + 1}`)}
                        >
                            ＋
                        </button>
                    )
                ))}
            </div>

        </div>
    );

}
