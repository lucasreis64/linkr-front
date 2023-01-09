import { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import NewPost from "../components/NewPost";
import Posts from "../components/Posts";
import Trending from "../components/Trending";

export default function Timeline(){
    return (
        <>
            <NavBar></NavBar>
            <Body>     
            <T><h1>timeline</h1></T>  
            <Box>
            <TimelineContainer>                 
                <NewPost></NewPost>
                <Posts></Posts>
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
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 100px;
    margin-left: 20%;
    width: 100%;

    @media (max-width: 600px)
    {
        margin-left: 0%;
	}
    @media (min-width: 600px)
    {
        margin-left: 0%;
	}
    @media (min-width: 657px)
    {
        margin-left: 5%;
	}
    @media (min-width: 950px)
    {
        margin-left: 15%;
	}
    @media (min-width: 1550px)
    {
        margin-left: 20%;
	}
`

const T = styled.div` 
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    color: white;
    font-weight: 700;
`;