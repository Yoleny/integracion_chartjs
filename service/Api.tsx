import axios from 'axios'


export const getSumaProductType = async ()=>{

    const response = await axios.get(`http://localhost:5000/totalProductType`);
    return response.data

}

export const getPromedioValueCurrency = async ()=>{

    const response = await axios.get(`http://localhost:5000/totalvalueCurrency`);
    return response.data

}
