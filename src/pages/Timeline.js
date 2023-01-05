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
   
`;