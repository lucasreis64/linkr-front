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

export function postLike(token, postId){
    const requisition = axios.post(
        `${URL}/timeline/like`, {post_id: postId},
        headerCreator(token),
        );

    return requisition;
}

export function removeLike(token, postId){
    const requisition = axios.post(
        `${URL}/timeline/dislike`, {post_id: postId},
        headerCreator(token),
        );

    return requisition;
}


