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

export const fetchUserData = async (uuid: string) => {
  const res = await fetchJson<ResUserData>("/api/user-data/get", {
    method: "POST",
    body: JSON.stringify({ uuid: uuid }),
    headers: {
      "Content-Type": "application/json",
    },
  });
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

export const tokenVerify = async (token: string) => {
  const res = await fetchJson<{ uid: string }>("/api/verify-token", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.uid;
};
