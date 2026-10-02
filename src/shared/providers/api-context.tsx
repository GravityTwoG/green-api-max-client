import { createContext, type ReactNode, useContext, useMemo, useState } from "react";

import type { GreenAPIClient } from "../api";

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
  const value = useContext(APIContext);
  if (!value) {
    throw new Error("useAPI must be used within APIProvider");
  }
  return value;
}
