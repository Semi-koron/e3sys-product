type TechData = {
  techId: number;
  techName: string;
  needTech: number[];
  neededTech: number[];
};

type FetchTechData = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

type ResTechData = {
  id: number;
  name: string;
  children: FetchTechData[];
  parent: FetchTechData[];
  created_at: string;
  updated_at: string;
};

export type UserTechData = {
  id: number;
  name: string;
  pivot: pivot;
  created_at: string;
  updated_at: string;
};

type pivot = {
  user_data_id: number;
  tech_data_id: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export type { TechData, ResTechData, FetchTechData };
