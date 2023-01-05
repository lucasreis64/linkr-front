import axios from "axios";
/* const URL = 'https://linkr-backend.onrender.com/'; */
const URL = 'http://localhost:4000';
const headerCreator = (token) => {
    return {headers: {Authorization: `Bearer ${token}`}}
};

export function getTrendings(){
    const requisition = axios.get(
        `${URL}/trendings`);

    return requisition;
}