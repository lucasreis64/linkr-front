import axios from "axios";
//const URL = 'https://linkr-backend.onrender.com/';
const URL = "http://localhost:4000";
const headerCreator = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } };
};

export function getTrendings() {
    const requisition = axios.get(`${URL}/trendings`);

    return requisition;
}

export function getTimeline(token) {
    const requisition = axios.get(`${URL}/timeline`, headerCreator(token));

    return requisition;
}

export function getHashtagPage(token, hashtag) {
    const requisition = axios.get(
        `${URL}/hashtag/${hashtag}`,
        headerCreator(token)
    );

    return requisition;
}

export function postLike(token, postId) {
    const requisition = axios.post(
        `${URL}/timeline/like`,
        { post_id: postId },
        headerCreator(token)
    );

    return requisition;
}

export function removeLike(token, postId) {
    const requisition = axios.post(
        `${URL}/timeline/dislike`,
        { post_id: postId },
        headerCreator(token)
    );

    return requisition;
}

export function deletePost(token, id) {
    const requisition = axios.delete(
        `${URL}/delete/${id}`,
        headerCreator(token)
    );

    return requisition;
}

export function updatePost(token, description, link, post_id) {
    const requisition = axios.put(
        `${URL}/update/${post_id}`,
        { link: link, description: description },
        headerCreator(token)
    );

    return requisition;
}

export function getComments(token, post_id) {
    const requisition = axios.get(
        `${URL}/comments/${post_id}
        `,
        headerCreator(token)
    );

    return requisition;
}

export function postComment(token, post_id, user_id, content) {
    const requisition = axios.post(
        `${URL}/comments`,
        { post_id: post_id, user_id: user_id, content: content },
        headerCreator(token)
    );

    return requisition;
}
