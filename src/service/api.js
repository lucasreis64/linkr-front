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

export function getTimeline(token){
    const requisition = axios.get(
        `${URL}/timeline`, 
        headerCreator(token),
        );

    return requisition;
}

export function deletePost(token, id)
{
    const requisition = axios.delete(
        `${URL}/delete/${id}`, 
        headerCreator(token)
        );

    return requisition;
}

export function updatePost(token, description, link, id)
{
    const requisition = axios.put(
        `${URL}/update/${id}`,
        {link: link, 
        description: description}, 
        headerCreator(token)
        );

    return requisition;
}

