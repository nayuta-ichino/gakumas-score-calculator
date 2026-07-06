"use client";

import { useEffect, useState } from "react";

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

export default function Page() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Spring Boot の API を叩く
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
    return <div>カードを読み込み中です...</div>;
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">サポートカード一覧</h1>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="border p-2">
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-auto mb-2"
            />
            <div className="text-sm font-semibold">{card.name}</div>
            <div className="text-xs text-gray-600">
              rarity: {card.rarityId} / type: {card.typeId} / plan: {card.planId}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
