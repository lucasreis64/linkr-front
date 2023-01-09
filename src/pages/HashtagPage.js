import axios from "axios";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import Trending from "../components/Trending";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URLS } from "../assets/constants/constants";

export default function HashtagPage(){
    const { hashtag } = useParams();
    const [hashtagPosts, setHashtagPosts] = useState([])

    useEffect(() => {
        axios.get(URLS.HASHTAG + hashtag)
        .then(response => {
            setHashtagPosts(response.data)
            console.log(response.data)
        })
        .catch(e => console.log(e));
    })

    return (
        <>
            <NavBar></NavBar>
            <Body>     
            <T><h1>hashtagPosts</h1></T>  
            <Box>
            <TimelineContainer> 
                <PostsContainer>
                    {hashtagPosts && hashtagPosts.length > 0 ?  (
                        hashtagPosts.map(p => <Post key={p.id} data={p} user={p.userData}/>)
                    ): (
                        <div>Loading...</div>
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
    position: absolute;
    box-sizing: border-box;
    word-break: break-word;
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
    margin-top: 100px;
    width: 100%;
`

const T = styled.div` 
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    color: white;
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