"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Card = {
  id: number;
  name: string;
  image: string;
  rarityId: number;
  typeId: number;
  planId: number;
  eventGetId: number;
  event1Id: number;
  event2Id: number;
};

export default function SupportCardsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slot = searchParams.get("slot");

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/cards")
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
      `/formation?slot=${slot}&id=${card.id}&limitBreakCount=0&image=${card.image}&name=${card.name}`
    );
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">サポートカード一覧</h1>

      {/* モダンな 4 列グリッド */}
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => selectCard(card)}
            className="cursor-pointer border rounded-xl bg-white shadow-sm hover:shadow-md transition
                       p-2 flex flex-col items-center gap-2"
          >
            {/* カード画像（半分サイズ） */}
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-28 object-cover rounded-lg"
            />

            {/* カード名 */}
            <div className="text-sm font-semibold text-center">{card.name}</div>

            {/* メタ情報（小さく） */}
            <div className="text-xs text-gray-600 text-center leading-tight">
              rarity: {card.rarityId} / type: {card.typeId} / plan: {card.planId}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
