import { FetchTechData } from "./Tech";

type DemandData = {
  demandName: string;
  demandId: number;
  demandTech: number[];
  startTime: Date;
  endTime: Date;
};

export type ResDemandData = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  need: FetchTechData[];
  created_at: string;
  updated_at: string;
};

export type { DemandData };
