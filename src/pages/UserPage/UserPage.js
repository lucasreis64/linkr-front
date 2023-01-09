import axios from "axios";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import Post from "../../components/Post";
import Trending from "../../components/Trending";
import { useParams } from "react-router-dom";
import React from "react";
import { useContext } from "react";
import { API_BASE_URL } from "../../assets/constants/constants";
import { MutatingDots } from "react-loader-spinner";
import { contexto } from "../../context/userContext";

export default function UserPage(){

    const { id } = useParams();
    const { token } = useContext(contexto);

    const [userData, setUserData] = React.useState("loading");
    const [att, setAtt] = React.useState(0);

    React.useEffect(() => {
        setUserData("loading")
        axios.get(API_BASE_URL + '/users/' + id)
        .then(response => setUserData(response.data))
        .catch(e => console.log(e));
    }, [att, id])

    return (
        <>
            <NavBar></NavBar>
            <Body userData={userData}>     
            <Box>
            <TimelineContainer> 
                <PostsContainer>
                    <div className="user-info">
                        <div/>
                        <h1>{userData.username}'s Posts</h1>
                    </div>
                    {userData !== "loading" ?  (
                        userData.user_posts.map(p => <Post att={att} setAtt={setAtt} token={token} key={p.id} data={{...p, ...userData, 'user_id': id}} user={{'id': id}}/>)
                    ):(
                        <div className="loader-container">
                            <MutatingDots 
                                color="#FFFFFF"
                                secondaryColor="#C6C6C6"
                            />
                        </div>
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
    margin-top: 54px;
    width: 100%;
    .user-info {
        margin-top: -120px;
        display: flex;
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        color: white;
        margin-bottom: 48px;
        font-weight: 700; 
        div {
            width: 50px;
            height: 50px;
            background-image: url(${props => props.userData.profile_picture});
            margin-right: 17px;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 26.5px;
        }        
    }
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