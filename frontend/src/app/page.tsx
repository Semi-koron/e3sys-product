import MenuButton from "@/components/Button";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import Survey from "@/components/Survey";
import Graph from "@/components/Graph";

export default function Home() {
  return (
    <div className="bg-orange-400 min-h-screen p-8">
      <div className="flex justify-between items-center mb-4">
        <MenuButton />
        <div className="flex-1 flex justify-center">
          <Header />
        </div>
      </div>
      <main className="flex flex-col gap-4 mb-6">
        <Profile />
        <Survey />
        <Graph />
      </main>
    </div>
  );
}
