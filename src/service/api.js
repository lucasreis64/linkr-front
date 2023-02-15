import axios from "axios";
const URL = 'https://linkr-backend.onrender.com/';

const headerCreator = (token) => {
    return {headers: {Authorization: `Bearer ${token}`}}
};

export function getTrendings(){
    const requisition = axios.get(
        `${URL}/trendings`);

    return requisition;
}

export function getTimeline(token, offset){
    console.log(offset)
    const requisition = axios.get(
        `${URL}/timeline?offset=${offset}`, 
        headerCreator(token),
        );

    return requisition;
}

export function getHashtagPage(token, hashtag) {
    const requisition = axios.get(
        `${URL}/hashtag/${hashtag}`,  
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

export function deletePost(token, id){
    const requisition = axios.delete(
        `${URL}/delete/${id}`, 
        headerCreator(token)
        );

    return requisition;
}

export function updatePost(token, description, link, post_id){
    const requisition = axios.put(
        `${URL}/update/${post_id}`,
        {link: link, 
        description: description}, 
        headerCreator(token)
        );

    return requisition;
}

export function getShare(post_id){
    const requisition = axios.get(
        `${URL}/timeline/share/${post_id}`,
        );

    return requisition;
}

export function postShare(token, post_id){
    console.log(token);
    const requisition = axios.post(
        `${URL}/timeline/share/${post_id}`,
        {},
        headerCreator(token)
        );

    return requisition;
}

export function removeShare(token, post_id){
    const requisition = axios.post(
        `${URL}/timeline/removeshare/${post_id}`,
        {},
        headerCreator(token)
        );

    return requisition;
}
