import { useEffect, useState } from "react";

export const useFetch = (url) => {

    console.log('ejecutando funcion useFetch');
    const [fetchResponse, setFetchResponse] = useState([]);

    useEffect(() => {
        
        const fetchRequest = async () => {
            console.log("Realizando peticion...");
            let res = await fetch(url);
            let data = await res.json();
            console.log('la data es',data);
            setFetchResponse(data);
        };

        fetchRequest();
    }, [url])

    return { fetchResponse }
}