import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { contexto } from "../context/userContext";
import Post from "./Post";
import { Oval } from "react-loader-spinner";
import { getTimeline } from "../service/api";
import InfiniteScroll from "react-infinite-scroll-component";
import useInterval from 'use-interval'

export default function Posts(){
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const { token, userData, setUserData, setDisplayReload, att, setAtt, setCount } = useContext(contexto);
    const [newPosts, setNewPosts] = useState([]);
    const [status, setStatus] = useState(null);

    const message1 = 'An error occured while trying to fetch the posts, please refresh the page';
    const message2 = 'The are no posts yet';

    useEffect(() => {
        getTimeline(token?.token)
        .then((res)=> {
            setLoading(false);
            setPosts(res.data.data);
            setStatus(res.status);
        })
        .catch()
    }, [att]);

    const fetchData = () =>{
        //API CALL
        getTimeline(token.token)
        .then((res)=> {
            setLoading(false);
            setPosts(res.data.data);
            setStatus(res.status);
        })
        .catch()
    }

    useInterval(() => {
        getTimeline(token.token)
        .then((res)=> {
            setNewPosts(res.data.data);

            for(i=0; i<newPosts.length; i++){
                if(newPosts[i].created_at <= posts[0].created_at){
                    var newArr = newPosts.splice(0, i)
                    setNewPosts(newArr)
                    return
                }
            }

            setCount(newPosts.length)
            setDisplayReload(true)
        })
        .catch()
    }, [15000])

    const getMessage = () => {
        if(status !== 200){
            return message1;
        }
        return message2;
    }

    return(
        <>
            <PostsContainer>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchData}
                    hasMore={true}
                    loader={<Oval 
                        color="#6D6D6D"
                        secondaryColor="#5E5E5E"
                    />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                        </p>
                    }
                >

                {loading ? <></> : posts && posts.length > 0 ?  (
                    posts.map(p => <Post 
                        key={p.id} 
                        data={p} 
                        user={userData}
                        setAtt={setAtt}
                        att={att}
                        token={token}/>)
                ) : (
                   !userData.following_count ?
                    <h4>Você ainda não seguiu ninguém. Siga alguém para ver suas publicações.</h4>
                    :
                    <h4>Seus amigos ainda não postaram nada. Siga mais pessoas para ver outras publicações.</h4>
                )}
                
                </InfiniteScroll>
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

    h4 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 23px;
        letter-spacing: 0.05em;

        color: #FFFFFF;
    }

    @media screen and (max-width: 600px) {
        max-width: 100vw;
    }

    @media screen and (max-width: 768px) {
        max-width: 100vw;
    }
`   
