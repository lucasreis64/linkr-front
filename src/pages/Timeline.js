import styled from "styled-components";
import NavBar from "../components/NavBar";
import NewPost from "../components/NewPost";
import Posts from "../components/Posts";

export default function Timeline(){
    return (
        <>
            <NavBar></NavBar>
            <TimelineContainer>
                <h1 className="title">timeline</h1>
                <NewPost></NewPost>
                <Posts></Posts>
            </TimelineContainer>
        </>
    )
}

const TimelineContainer = styled.div`
    margin: 125px 250px;

    .title {
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        color: white;
        font-weight: 700;
        margin-bottom: 45px;
    }
`