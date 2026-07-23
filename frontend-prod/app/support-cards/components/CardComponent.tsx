"use client";

import { useState } from "react";

export default function CardComponent({
    card,
    onDelete,
    onChangeLimitBreak,
}: {
    card: {
        id: number;
        name: string;
        attribute: "Vo" | "Da" | "Vi" | "";
        limitBreak: number;
        image: string;
    };
    onDelete: (id: number) => void;
    onChangeLimitBreak: (id: number, newLimitBreak: number) => void;
}) {

    const [openLimitBreak, setOpenLimitBreak] = useState(false);
    const [openLimitBreakPopup, setOpenLimitBreakPopup] = useState(false);

    return (
        <div
            className="
                border border-gray-300 rounded-xl shadow-lg bg-white
                overflow-hidden transition-all duration-300 h-52
                relative
            "
        >

            {/* ヘッダー（黒帯） */}
            <div className="bg-[#1A1A1A] text-white px-3 py-2 flex items-center justify-between relative">

                {/* 左側：凸ボタン（大分類） */}
                <div className="flex items-center gap-3">

                    {/* 大分類：現在の凸数 */}
                    <button
                        className="min-w-[42px] h-6 px-2 text-[11px] leading-none rounded text-center bg-blue-700 text-white"
                        onClick={() => setOpenLimitBreak(!openLimitBreak)}
                    >
                        {card.limitBreak}凸
                    </button>

                    {/* 中分類：凸数一覧（横並び） */}
                    {openLimitBreak && (
                        <div className="
                            absolute left-3 top-10 bg-white text-black border rounded shadow
                            flex flex-row gap-2 px-2 py-2 z-50
                        ">
                            {[0, 1, 2, 3, 4].map((t) => (
                                <button
                                    key={t}
                                    className={`
                                        min-w-[35px] h-6 px-1 text-[11px] leading-none rounded text-center
                                        ${card.limitBreak === t ? "bg-blue-500 text-white" : "bg-gray-200"}
                                    `}
                                    onClick={() => {
                                        onChangeLimitBreak(card.id, t);
                                        setOpenLimitBreak(false);
                                    }}
                                >
                                    {t}凸
                                </button>

                            ))}
                        </div>
                    )}

                </div>

                {/* 右側：削除ボタン */}
                <button
                    className="text-xl hover:text-red-400"
                    onClick={() => onDelete(card.id)}
                >
                    ×
                </button>
            </div>

            {/* 画像 */}
            <div className="w-full h-24 overflow-hidden relative">
                <img
                    src={card.image}
                    className="
                        w-full h-full object-cover
                        object-[center_50%]
                        clip-middle-half
                    "
                    alt=""
                />
            </div>

            {/* テキスト */}
            <div className="px-3 py-2">
                <p className="font-medium text-gray-800 truncate">
                    {card.name}
                </p>
            </div>
        </div>
    );
}
