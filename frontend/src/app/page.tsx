import Header from "../../components/Header";
import Profile from "../../components/Profile";
import Survey from "../../components/Survey";
import Graph from "../../components/Graph";

export default function Home() {
  return (
    <div className="bg-orange-500 min-h-screen p-8">
      <Header />
      <main className="grid grid-rows-[1fr_1fr_3fr] gap-4 mb-6">
        <Profile />
        <Survey />
        <Graph />
      </main>
    </div>
  );
}
