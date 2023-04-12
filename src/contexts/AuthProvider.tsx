import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { createContext, useContext, useEffect, useState } from "react";
import { firebaseConfig } from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);


type State = {
    user: Record<any, any> | null;
    auth: any;
    pending: boolean;
};

const AuthContext = createContext<State | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
  auth: any;
}) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [pending, setPending] = useState<any>(true);
  const state = { user: currentUser, auth, pending };

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setPending(false)
            setCurrentUser(user)
        } else {
            setPending(false)
            setCurrentUser(null)
        }
    });

    // cleanup function
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if(!currentUser) {
        console.log('nope')
        return;
    } else {
        localStorage.setItem('accessToken', JSON.stringify(currentUser.accessToken))
    }
  }, [currentUser])
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAppAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAppAuth must be used within a AuthProvider");
  }
  return context;
};
