"use client";

interface Row {
    day: string;
    icons: string[];
}

export default function HIFSchedule({
    selectionPhase,
    mainBattlePhase,
    selectedActions,
    handleSelectAction,
    iconPath,
    isWideRow,
}: {
    selectionPhase: Row[];
    mainBattlePhase: Row[];
    selectedActions: Record<string, string>;
    handleSelectAction: (day: string, icon: string) => void;
    iconPath: (name: string) => string;
    isWideRow: (day: string) => boolean;
}) {
    return (
        <div className="h-[70vh] overflow-y-scroll border rounded-xl p-5 bg-gray-50 shadow-lg w-[90%] mx-auto">

            {/* 見出し：選抜試験 */}
            <h3 className="text-xl font-bold mt-6 mb-4 text-center text-red-600">
                選抜試験
            </h3>

            {selectionPhase.map((row, idx) => {
                const paddedIcons = [...row.icons];
                while (paddedIcons.length < 3) paddedIcons.push("None");

                return (
                    <div key={idx} className="mb-3">
                        {isWideRow(row.day) ? (
                            <div className="flex items-center gap-3 w-full">
                                <div className="w-17 font-bold text-xl">{row.day}</div>
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

            {/* 見出し：本戦 */}
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
                                <div className="w-17 font-bold text-xl">{row.day}</div>

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
    );
}
