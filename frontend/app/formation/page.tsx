import SupportFormation from "./components/SupportFormation";
import Schedule from "./components/Schedule";
import UserInput from "./components/UserInput";

export default function FormationPage() {
  return (
    <div className="p-6 w-full max-w-[1600px] mx-auto flex flex-nowrap justify-between gap-10">

      <SupportFormation />
      <Schedule />
      <UserInput />

    </div>
  );
}
