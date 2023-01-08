import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { contexto } from "../context/userContext";
import Post from "./Post";
import { getTimeline } from "../service/api";

export default function Posts(){
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState({});
    const { token } = useContext(contexto);
    const [status, setStatus] = useState(null);

    const message1 = 'An error occured while trying to fetch the posts, please refresh the page';
    const message2 = 'The are no posts yet';

    useEffect(() => {
        getTimeline(token.token)
        .then((res)=> {
            setLoading(false);
            setPosts(res.data.data);
            setUserData(res.data.loggedUser);
            setStatus(res.status);
        })
        .catch()
    }, []);

    const getMessage = () => {
        if(status !== 200){
            return message1;
        }
        return message2;
    }

    return(
        <>
            <PostsContainer>
                {posts && posts.length > 0 ?  (
                    posts.map(p => <Post key={p.id} data={p} user={userData}/>)
                ): (
                    <div>{loading ? 'Loading...' : getMessage()}</div>
                )}
            </PostsContainer>
        </>
    )
}

const PostsContainer = styled.div`
    width: 611px;
    margin-top: 29px;

    :last-child{
        margin-bottom: 50px;
    }

    @media screen and (max-width: 600px) {
        max-width: 100vw;

    }

    @media screen and (max-width: 768px) {
        max-width: 100vw;
    }
`
