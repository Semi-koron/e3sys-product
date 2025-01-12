import { DemandData } from "@/app/types/Demand";

type DemandCardProps = DemandData;

const DemandCard = (data: DemandData) => {
  return (
    <section className="bg-slate-300 p-4 rounded-lg">
      <h2 className="text-lg mb-4 text-black">{data.demandName}</h2>
      <p className="text-black">
        開始日: {data.startTime.getFullYear()}年{data.startTime.getMonth()}月
        {data.startTime.getDate()}日
      </p>
      <p className="text-black">
        終了日: {data.endTime.getFullYear()}年{data.endTime.getMonth()}月
        {data.endTime.getDate()}日
      </p>
    </section>
  );
};

export default DemandCard;
