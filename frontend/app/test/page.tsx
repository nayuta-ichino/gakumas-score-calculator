"use client";

export default function TestPage() {
  const testFormation = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/formation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot1: 1,
          slot2: 7,
          slot3: 5,
          slot4: 10,
          slot5: 11,
          slot6: 2,
          slotList: [1, 7, 5, 10, 11, 2]
        })
      });

      const data = await res.json();
      console.log("Formation API result:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={testFormation}>編成APIテスト</button>
    </div>
  );
}
