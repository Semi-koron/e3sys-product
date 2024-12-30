"use client";
import { useState } from "react";
import { CheckBox } from "@/components/ui/CheckBox";
import { Section } from "@/components/ui/Section";

const techData = [
  // フロントエンド技術
  { techId: 1, techName: "HTML", needTech: [], neededTech: [2, 3] },
  { techId: 2, techName: "CSS", needTech: [1], neededTech: [4] },
  { techId: 3, techName: "JavaScript", needTech: [1], neededTech: [5, 6] },
  { techId: 4, techName: "Sass", needTech: [2], neededTech: [] },
  { techId: 5, techName: "React", needTech: [3], neededTech: [7, 8] },
  { techId: 6, techName: "Vue.js", needTech: [3], neededTech: [] },
  { techId: 7, techName: "Redux", needTech: [5], neededTech: [] },
  { techId: 8, techName: "Next.js", needTech: [5], neededTech: [] },

  // バックエンド技術
  { techId: 9, techName: "Node.js", needTech: [3], neededTech: [10, 11] },
  { techId: 10, techName: "Express.js", needTech: [9], neededTech: [] },
  { techId: 11, techName: "NestJS", needTech: [9], neededTech: [] },
  { techId: 12, techName: "Ruby on Rails", needTech: [], neededTech: [] },
  { techId: 13, techName: "Django", needTech: [], neededTech: [] },
  { techId: 14, techName: "Flask", needTech: [], neededTech: [] },

  // インフラ技術
  { techId: 15, techName: "AWS", needTech: [], neededTech: [16, 17] },
  { techId: 16, techName: "Amazon S3", needTech: [15], neededTech: [] },
  { techId: 17, techName: "Amazon EC2", needTech: [15], neededTech: [] },
  { techId: 18, techName: "Docker", needTech: [], neededTech: [19] },
  { techId: 19, techName: "Kubernetes", needTech: [18], neededTech: [] },
  { techId: 20, techName: "Terraform", needTech: [], neededTech: [] },

  // モバイル開発技術
  { techId: 21, techName: "Swift", needTech: [], neededTech: [22] },
  { techId: 22, techName: "UIKit", needTech: [21], neededTech: [] },
  { techId: 23, techName: "Kotlin", needTech: [], neededTech: [24] },
  { techId: 24, techName: "Jetpack Compose", needTech: [23], neededTech: [] },
  { techId: 25, techName: "React Native", needTech: [5], neededTech: [] },
  { techId: 26, techName: "Flutter", needTech: [3], neededTech: [] },

  // ゲーム開発技術
  { techId: 27, techName: "Unity", needTech: [3], neededTech: [28] },
  { techId: 28, techName: "C#", needTech: [27], neededTech: [] },
  { techId: 29, techName: "Unreal Engine", needTech: [], neededTech: [30] },
  { techId: 30, techName: "C++", needTech: [29], neededTech: [] },
  { techId: 31, techName: "Godot", needTech: [3], neededTech: [] },

  // その他
  { techId: 32, techName: "GraphQL", needTech: [9], neededTech: [] },
  { techId: 33, techName: "MongoDB", needTech: [9], neededTech: [] },
  { techId: 34, techName: "PostgreSQL", needTech: [], neededTech: [] },
  { techId: 35, techName: "SQLite", needTech: [], neededTech: [] },
  { techId: 36, techName: "Git", needTech: [], neededTech: [] },
  { techId: 37, techName: "GitHub", needTech: [36], neededTech: [] },
  { techId: 38, techName: "GitLab", needTech: [36], neededTech: [] },
  { techId: 39, techName: "Jenkins", needTech: [], neededTech: [] },
  { techId: 40, techName: "CircleCI", needTech: [], neededTech: [] },
  { techId: 41, techName: "Webpack", needTech: [3], neededTech: [] },
  { techId: 42, techName: "Vite", needTech: [3], neededTech: [] },
  { techId: 43, techName: "ESLint", needTech: [3], neededTech: [] },
  { techId: 44, techName: "Prettier", needTech: [3], neededTech: [] },
  { techId: 45, techName: "Three.js", needTech: [3], neededTech: [] },
  { techId: 46, techName: "AR.js", needTech: [3], neededTech: [] },
  { techId: 47, techName: "TensorFlow.js", needTech: [3], neededTech: [] },
  { techId: 48, techName: "PyTorch", needTech: [], neededTech: [] },
  { techId: 49, techName: "OpenCV", needTech: [], neededTech: [] },
  { techId: 50, techName: "Rust", needTech: [], neededTech: [] },
];

type TechSelectorProps = {
  setTechIds: React.Dispatch<React.SetStateAction<number[]>>;
  techIds: number[];
};

const TechSelector = ({ setTechIds, techIds }: TechSelectorProps) => {
  return (
    <Section title="アンケート">
      <ul>
        {techData.map((tech, index) => (
          <li key={index}>
            <CheckBox setValue={setTechIds} techId={techData[index].techId}>
              {tech.techName}
            </CheckBox>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default TechSelector;
