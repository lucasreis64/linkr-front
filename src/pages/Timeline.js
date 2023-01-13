import styled from "styled-components";
import NavBar from "../components/NavBar";
import NewPost from "../components/NewPost";
import Posts from "../components/Posts";
import Trending from "../components/Trending";
import reload from "../assets/images/reload.png"
import { useContext } from "react";
import { contexto } from "../context/userContext";

export default function Timeline(){
    const { displayReload, att, setAtt, count } = useContext(contexto);

    return (
        <>
            <NavBar></NavBar>
            <Body>     
            <T><h1>timeline</h1></T>  
            <Box>
            <TimelineContainer>                 
                <NewPost></NewPost>
                {displayReload && <ReloadBox onClick={setAtt(att+1)}>
                    <p>{count} new posts, load more!</p> 
                    <img className="reload" src={reload} alt="reload"/>
                </ReloadBox>}
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

const ReloadBox = styled.div`
    height: 60px;
    background-color: #1877F2;
    border-radius: 12px;
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        color: white;
        font-family: 'Lato', sans-serif;
        margin-right: 10px;
    }
`