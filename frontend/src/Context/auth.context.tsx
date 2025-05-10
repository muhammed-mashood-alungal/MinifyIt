

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthServices } from "../Services/auth.services";

interface User {
   id: string;
   email: string;
}

interface AuthContextType {
  user: User | null
  loading: boolean,
  checkAuth :  () => Promise<void>,
  logout:()=>void
}


const AuthContext = createContext<AuthContextType>({user : null , loading : false , checkAuth :async () => {} , logout:()=>{} })


interface AuthProviderProps { 
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  const checkAuth = async () => {
    try {
      const res : User = await AuthServices.authMe() as User
      setUser(res)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  };
  const logout=()=>{
    localStorage.removeItem('minify_token')
    setUser(null)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading  ,checkAuth ,logout}}>
      {children}
    </AuthContext.Provider>
  );
};


export function useAuth() {
  return useContext(AuthContext);
}
