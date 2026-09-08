import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

type AuthState = {
  /** `undefined` while the initial session check is still in flight. */
  user: User | null | undefined;
  loading: boolean;
};

const AuthContext = createContext<AuthState>({ user: undefined, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    // Validate the persisted session against the server on first load — this
    // mirrors the `supabase.auth.getUser()` guard the old route used.
    supabase.auth.getUser().then(({ data, error }) => {
      if (cancelled) return;
      setUser(error || !data.user ? null : data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setUser(session?.user ?? null);
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ user, loading: user === undefined }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
