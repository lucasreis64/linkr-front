import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { contexto } from "../context/userContext";
import Post from "./Post";
import { getTimeline } from "../service/api";

export default function Posts(){
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState({});
    const [att, setAtt] = useState(0);
    const { token } = useContext(contexto);
    console.log(token);
    useEffect(() => {
        getTimeline(token.token)
        .then((res)=> {
            setPosts(res.data.data);
            setUserData(res.data.loggedUser);
        })
        .catch()
    }, [att]);


    return(
        <>
            <PostsContainer>
                {posts && posts.length > 0 ? (
                    posts.map(p => <Post 
                        key={p.id} 
                        data={p} 
                        user={userData}
                        setAtt={setAtt}
                        att={att}
                        token={token}/>)
                ): (
                    <div>loading...</div>
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
