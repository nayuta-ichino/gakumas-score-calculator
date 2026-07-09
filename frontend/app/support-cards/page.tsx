"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Card = {
  id: number;
  name: string;
  image: string;
  rarityName: string;
  typeName: string;
  planName: string;
  eventGetName: string;
  eventName1: string;
  eventName2: string;
  attribute: string
};

export default function SupportCardsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slot = searchParams.get("slot");

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRarity, setSelectedRarity] = useState<string>("ALL");

  useEffect(() => {
    fetch("http://localhost:8080/api/cards/detail")
      .then((res) => res.json())
      .then((data: Card[]) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("カード取得に失敗しました", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4">カードを読み込み中です...</div>;
  }

  const selectCard = (card: Card) => {
    if (!slot) return;
    router.push(
      `/formation?slot=${slot}&id=${card.id}&limitBreakCount=0&image=${card.image}&name=${card.name}&attribute=${card.attribute}`
    );
  };

  // タイプ別カラー
  const getTypeBorder = (type: string) => {
    switch (type) {
      case "ボーカル":
        return "border-pink-400";
      case "ダンス":
        return "border-blue-400";
      case "ビジュアル":
        return "border-yellow-400";
      case "アシスト":
        return "border-green-400";
      default:
        return "border-gray-300";
    }
  };

  // rarity フィルタリング
  const filteredCards =
    selectedRarity === "ALL"
      ? cards
      : cards.filter((card) => card.rarityName === selectedRarity);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">サポートカード一覧</h1>

      {/* rarity フィルターボタン */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setSelectedRarity("ALL")}
          className={`
            px-4 py-2 rounded-lg border font-semibold
            ${selectedRarity === "ALL" ? "bg-gray-300 text-black" : "bg-white"}
          `}
        >
          ALL
        </button>

        <button
          onClick={() => setSelectedRarity("SSR")}
          className={`
            px-4 py-2 rounded-lg border font-semibold text-white
            bg-gradient-to-br from-blue-500 via-pink-300 to-yellow-200 brightness-110
            ${selectedRarity === "SSR" ? "scale-[1.05]" : ""}
          `}
        >
          SSR
        </button>

        <button
          onClick={() => setSelectedRarity("SR")}
          className={`
            px-4 py-2 rounded-lg border font-semibold text-white
            bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 brightness-110
            ${selectedRarity === "SR" ? "scale-[1.05]" : ""}
          `}
        >
          SR
        </button>

        <button
          onClick={() => setSelectedRarity("R")}
          className={`
            px-4 py-2 rounded-lg border font-semibold text-white
            bg-gradient-to-br from-blue-300 to-blue-500
            ${selectedRarity === "R" ? "scale-[1.05]" : ""}
          `}
        >
          R
        </button>
      </div>

      {/* カード一覧 */}
      <div className="grid grid-cols-4 gap-4">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            onClick={() => selectCard(card)}
            className={`
              cursor-pointer border-2 rounded-xl shadow-sm transition-transform duration-200
              hover:scale-[1.03] hover:shadow-lg p-3
              ${getTypeBorder(card.typeName)}
            `}
          >

            {/* カード画像（カード名を重ねる） */}
            <div className="relative w-full h-20">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover rounded-lg object-[center_40%]"
              />

              {/* カード名（画像に重ねる） */}
              <div className="
                absolute bottom-0 left-0 right-0
                bg-black/60 text-white text-xs font-bold
                px-2 py-1 rounded-b-lg
                text-center
              ">
                {card.name}
              </div>
            </div>

            {/* 基本情報 */}
            <div className="mt-3">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 flex gap-4 justify-center">
                {/* rarity */}
                <div className="relative group">
                  <img
                    src={`/rarity-icons/${card.rarityName}.png`}
                    className="w-[50px] h-[28px] rounded-lg border border-gray-300 bg-white shadow-sm"
                    alt={card.rarityName}
                  />
                  <span className="
                    absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-black text-white rounded
                    opacity-0 group-hover:opacity-100 transition whitespace-nowrap
                  ">
                    {card.rarityName}
                  </span>
                </div>

                {/* type */}
                <div className="relative group">
                  <img
                    src={`/type-icons/${card.typeName}.png`}
                    className="w-[28px] h-[28px] rounded-lg border border-gray-300 bg-white shadow-sm"
                    alt={card.typeName}
                  />
                  <span className="
                    absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-black text-white rounded
                    opacity-0 group-hover:opacity-100 transition whitespace-nowrap
                  ">
                    {card.typeName}
                  </span>
                </div>

                {/* plan */}
                <div className="relative group">
                  <img
                    src={`/plan-icons/${card.planName}.png`}
                    className="w-[28px] h-[28px] rounded-lg border border-gray-300 bg-white shadow-sm"
                    alt={card.planName}
                  />
                  <span className="
                    absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-black text-white rounded
                    opacity-0 group-hover:opacity-100 transition whitespace-nowrap
                  ">
                    {card.planName}
                  </span>
                </div>
              </div>
            </div>

            {/* ▼ 獲得物 + イベント（横並び・別枠） */}
            <div className="mt-3 grid grid-cols-2 gap-3">

              {/* ▼ 獲得物（薄い枠） */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                <div className="text-xs font-bold text-gray-600 text-center mb-1">獲得物</div>

                <div className="flex justify-center">
                  <div className="relative group">
                    <img
                      src={`/event-get-icons/${card.eventGetName}.png`}
                      className="w-[28px] h-[28px] rounded-lg border border-gray-300 bg-white shadow-sm"
                      alt={card.eventGetName}
                    />
                    <span className="
                      absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-black text-white rounded
                      opacity-0 group-hover:opacity-100 transition whitespace-nowrap
                    ">
                      {card.eventGetName}
                    </span>
                  </div>
                </div>
              </div>

              {/* ▼ イベント（薄い枠） */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                <div className="text-xs font-bold text-gray-600 text-center mb-1">イベント</div>

                <div className="flex gap-3 justify-center">

                  <div className="relative group">
                    <img
                      src={`/event-icons/${card.eventName1}.png`}
                      className="w-[28px] h-[28px] rounded-lg border border-gray-300 bg-white shadow-sm"
                      alt={card.eventName1}
                    />
                    <span className="
                      absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-black text-white rounded
                      opacity-0 group-hover:opacity-100 transition whitespace-nowrap
                    ">
                      {card.eventName1}
                    </span>
                  </div>

                  <div className="relative group">
                    <img
                      src={`/event-icons/${card.eventName2}.png`}
                      className="w-[28px] h-[28px] rounded-lg border border-gray-300 bg-white shadow-sm"
                      alt={card.eventName2}
                    />
                    <span className="
                      absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-black text-white rounded
                      opacity-0 group-hover:opacity-100 transition whitespace-nowrap
                    ">
                      {card.eventName2}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
