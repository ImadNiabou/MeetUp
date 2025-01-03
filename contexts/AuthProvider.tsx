import { useEffect, useState, createContext, useContext } from 'react';
// supabase
import { supabase } from '~/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { ActivityIndicator } from 'react-native';

const AuthContext = createContext({});
export default function AuthProvider({ children }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <AuthContext.Provider value={{ session, user: session?.user, isAutenticated: !!session?.user }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
