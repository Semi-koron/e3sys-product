import { DemandData, ResDemandData } from "../types/Demand";
import { ResTechData, TechData } from "../types/Tech";
import { ResUserData, UserData } from "../types/User";

const basePath = "http://localhost:8080";

export const fetchJson = async <T>(path: string, options: RequestInit) => {
  const response = await fetchURL(path, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }
  return (await response.json()) as T;
};

export const fetchURL = async (
  path: string,
  options: RequestInit,
  allowedStatusCodes?: number[]
): Promise<Response> => {
  allowedStatusCodes = allowedStatusCodes || [];

  const res: Response = await fetch(`${basePath}${path}`, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  if (res.ok || allowedStatusCodes.includes(res.status)) {
    return res;
  }

  throw new Error(`Failed to fetch: ${options.method} ${path}`);
};

export const fetchTechData = async () => {
  const res = await fetchJson<ResTechData[]>("/api/tech-data", {
    method: "GET",
  });
  // TechDataに変換
  const techData: TechData[] = res.map((tech) => ({
    techId: tech.id,
    techName: tech.name,
    needTech: tech.children.map((child) => child.id),
    neededTech: tech.parent.map((parent) => parent.id),
  }));
  return techData;
};

export const searchUserExist = async (uuid: string) => {
  const res = await fetchJson("/api/user-data/search", {
    method: "POST",
    body: JSON.stringify({ uuid: uuid }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const fetchUserData = async (uuid: string) => {
  const res = await fetchJson<ResUserData>("/api/user-data/get", {
    method: "POST",
    body: JSON.stringify({ uuid: uuid }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res === null) {
    return null;
  }
  const returndata: UserData = {
    userId: res.id,
    userName: res.name,
    masteredTech: res.learned
      .filter((tech) => tech.pivot.status === "mastered")
      .map((tech) => tech.id),
    learningTech: res.learned
      .filter((tech) => tech.pivot.status === "mastering")
      .map((tech) => tech.id),
  };
  return returndata;
};

export const fetchDemandData = async () => {
  const res = await fetchJson<ResDemandData[]>("/api/demand-data", {
    method: "GET",
  });
  const getTechId = (demand: ResDemandData) => {
    return demand.need.map((tech) => tech.id);
  };
  const returnData: DemandData[] = res.map((demand) => ({
    demandId: demand.id,
    demandName: demand.name,
    demandTech: getTechId(demand),
    startTime: new Date(demand.start_date),
    endTime: new Date(demand.end_date),
  }));
  return returnData;
};

export const tokenVerify = async (token: string) => {
  const res = await fetchJson<{ uid: string }>("/api/verify-token", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.uid;
};
