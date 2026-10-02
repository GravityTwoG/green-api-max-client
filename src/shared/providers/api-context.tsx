import { createContext, type ReactNode, use, useMemo, useState } from "react";

import type { GreenAPIClient } from "@/shared/api";

type APIContextValue = {
  client: GreenAPIClient | null;
  setClient: (client: GreenAPIClient | null) => void;
};

const APIContext = createContext<APIContextValue | null>(null);

export function APIProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<GreenAPIClient | null>(null);
  const value = useMemo(() => ({ client, setClient }), [client]);

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
}

export function useAPI() {
  const value = use(APIContext);
  if (!value) {
    throw new Error("useAPI must be used within APIProvider");
  }
  return value;
}
