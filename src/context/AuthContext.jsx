import { createContext, useState, useContext,useEffect} from 'react';

export const AuthContext =  createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth musst be used within a AuthProvider')
    }
    return context;
};

export const AuthPovider = ({children}) => {
   /*  const [user,setUser]=useState(null); */
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   console.log("verifica isAuthenticated antes de useefect ");
    const [token, setToken] = useState(null);

    useEffect(() => {
      // Cargar el token desde localStorage al cargar la app
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
      }
    }, []);
  
    const login = (newToken) => {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      console.log("verifica token en context ");
      
    };
  
    const logout = () => {
      localStorage.removeItem("token");
      setToken(null);
      setIsAuthenticated(false);
      console.log("funcion logout ")
    };

    return (
            
        <AuthContext.Provider 
        value={{
            isAuthenticated, token, login, logout
        }}> 
            {children}
        </AuthContext.Provider>

    )
}
