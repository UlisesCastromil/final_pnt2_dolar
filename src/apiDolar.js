import axios from "axios";

export const cotizacionDolar = async () => {
    try {
        const respuesta = await axios.get('https://api.bluelytics.com.ar/v2/latest');
        return respuesta.data.blue.value_sell;
    } catch(error) {
        console.error("Error al obtener la cotización del dólar:", error);
        return null;
    }
}