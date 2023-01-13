import styled from "styled-components";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import Trending from "../components/Trending";
import { MutatingDots } from "react-loader-spinner";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { contexto } from "../context/userContext";
import { getHashtagPage } from "../service/api";

export default function HashtagPage(){
    const { token } = useContext(contexto);
    const { hashtag } = useParams();
    const [hashtagPosts, setHashtagPosts] = useState([]);
    const [userData, setUserData] = useState({});
    const [att, setAtt] = useState(0);
    const [status, setStatus] = useState(null);
    const { attpage } = useContext(contexto);
    const [temPosts, setTemPosts] = useState(false);
    
    useEffect(() => {
        setTemPosts(false);
        getHashtagPage(token.token, hashtag)
        .then((res)=> {
            console.log(res.data);
            setHashtagPosts(res.data.data);
            setStatus(res.status);
            setTemPosts(true);
        })
        .catch()
    }, [att, attpage]);

    return (
        <>
            <NavBar></NavBar>
            <Body>      
            <Box>
            <TimelineContainer>
                <PostsContainer>  
                <T>
                    <div/>
                    <h1>#{hashtag}</h1>
                </T>  
                {temPosts ?  (
                        hashtagPosts.map(p => <Post 
                            key={p.id} 
                            data={p} 
                            user={userData}
                            setAtt={setAtt}
                            att={att}
                            token={token}/>)
                    ): (
                        <MutatingDots 
                        color="#FFFFFF"
                        secondaryColor="#C6C6C6"
                    />                    
                    )}
                </PostsContainer>
            </TimelineContainer>
            <Trending/>
            </Box>
            </Body>
        </>
    )
}

const Box = styled.div`
	display: flex;
    box-sizing: border-box;
    word-break: break-word;
    margin: 0 auto;
    margin-top: 75px;
`;

const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    word-break: break-word;
    width: 100%;
`
const Body = styled.div`
    display: flex;
    box-sizing: border-box;
    word-break: break-word;
    justify-content: center;
    align-items: flex-start;
    margin-top: 54px;
    width: 100%;
    
`
const T = styled.div` 
    margin-top: -120px;
    display: flex;
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    color: white;
    margin-bottom: 48px;
    font-weight: 700; 
`
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
`;