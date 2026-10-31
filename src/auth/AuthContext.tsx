import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { ACCOUNTS_ENABLED } from '../config/features';

export type User = {
  email: string;
  district: number;
  affiliated: 'yes' | 'no' | 'unspecified';
  organization: string;
  discoverable: boolean;
};

type AuthState = {
  user: User | null;
  loading: boolean; // true until we know whether someone is signed in
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(ACCOUNTS_ENABLED);

  useEffect(() => {
    if (!ACCOUNTS_ENABLED) return;
    fetch('/api/me')
      .then((r) => (r.ok ? r.json() : { user: null }))
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/logout', { method: 'POST' }).catch(() => {});
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
