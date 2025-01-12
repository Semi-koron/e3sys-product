"use client";
import type { TechData } from "@/app/types/Tech";
import { CheckBox } from "@/components/ui/CheckBox";
import { Section } from "@/components/ui/Section";

type TechSelectorProps = {
  setTechIds: React.Dispatch<React.SetStateAction<number[]>>;
  techData: TechData[];
};

const TechSelector = ({ setTechIds, techData }: TechSelectorProps) => {
  return (
    <Section title="技術選択">
      <div className="h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300">
        <ul>
          {techData.map((tech, index) => (
            <li key={index}>
              <CheckBox setValue={setTechIds} techId={techData[index].techId}>
                {tech.techName}
              </CheckBox>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default TechSelector;
