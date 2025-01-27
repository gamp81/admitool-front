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
    const [user,setUser]=useState({});
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
      // Dividir el token en sus partes
      const [header, payload, signature] = newToken.split(".");

      // Decodificar el payload (segunda parte) de Base64
      const decodedPayload = JSON.parse(atob(payload));
      console.log(decodedPayload.nombre);
      setUser(decodedPayload);
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
        value={{ isAuthenticated, token,user, login, logout }} > 
            {children}
        </AuthContext.Provider>

    )
}
