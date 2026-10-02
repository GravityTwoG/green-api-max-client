import { createContext, type ReactNode, useContext, useMemo } from "react";

import { GreenAPIClient } from "../api";
import { VITE_GREEN_API_URL } from "../config";
import { useAPI } from "./api-context";

type Credentials = {
  idInstance: string;
  apiTokenInstance: string;
};

export type AuthContextValue = {
  isAuthenticated: boolean;
  signIn: (credentials: Credentials) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { client, setClient } = useAPI();

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: client !== null,
      signIn: async ({ idInstance, apiTokenInstance }) => {
        const candidate = new GreenAPIClient({
          apiURL: VITE_GREEN_API_URL,
          idInstance,
          apiTokenInstance,
        });

        await candidate.checkInstance();
        setClient(candidate);
      },
    }),
    [client, setClient],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return value;
}
