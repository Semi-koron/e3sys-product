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
