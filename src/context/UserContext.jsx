import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext"; // Importa tu contexto de autenticación si ya lo tienes

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_URL ;
    const { user,token} = useContext(AuthContext); // Obtiene los datos del usuario autenticado
    const [userData, setUserData] = useState(null);
    const [ postulanteData, setPostulanteData] = useState(null);
    useEffect(() => {
        if (user) {
            fetch(`https://localhost:7198/api/Postulant/GetDataPostulant?id=${user.usrId}`)
                .then(response => response.json())
                .then(result => {
                    console.log("Datos obtenidos data: ", result.data);
                    setUserData(result.data);
                })
                .catch(error => console.log("Error al obtener los datos:", error));

           
        }
        fetch(`https://localhost:7198/api/Postulation/GetLastInscription`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
             },             
          })
            .then(response => response.json())
            .then(result => {
                console.log("Datos obtenidos result.data: ", result.data);
                setPostulanteData(result.data);
                console.log("Datos obtenidos postulanteData: ",postulanteData);
            })
            .catch(error => console.log("Error al obtener los datos:", error));
    }, [user]);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
