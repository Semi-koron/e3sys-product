"use client";

import { useEffect } from "react";
import { Section } from "@/components/ui/Section";
import DemandCard from "@/components/DemandCard";
import { DemandData } from "@/app/types/Demand";

type DemandListProps = {
  demandData: DemandData[];
};

const DemandList = ({ demandData }: DemandListProps) => {
  return (
    <Section title="案件一覧">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {demandData.map((data) => (
          <DemandCard key={data.demandId} {...data} />
        ))}
      </div>
    </Section>
  );
};

export default DemandList;
