import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, onAuthStateChanged, browserSessionPersistence } from "firebase/auth";

import { createContext, useContext, useEffect, useState } from "react";
import { firebaseConfig } from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);


type State = {
    user: any;
    auth: any;
};

const AuthContext = createContext<State | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
  auth: any;
}) => {
  const [user, setUser] = useState<any>(null);
  const state = { user, auth };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            setPersistence(auth, browserSessionPersistence)
          } else {
            // No user is signed in.
          }
    });

    // cleanup function
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAppAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAppAuth must be used within a AuthProvider");
  }
  return context;
};
