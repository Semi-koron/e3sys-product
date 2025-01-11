import { UserTechData } from "./Tech";

export type UserData = {
  userId: number;
  userName: string;
  masteredTech: number[];
  learningTech: number[];
};

export type fetchUserData = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type ResUserData = {
  id: number;
  name: string;
  learned: UserTechData[];
  created_at: string;
  updated_at: string;
};
