import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import NewPost from "../../components/NewPost";
import Posts from "../../components/Posts";
import Trending from "../../components/Trending";
import StyledUserPage from "./StyledUserPage";
import { API_BASE_URL } from "../../assets/constants/constants";
import Post from "../../components/Post";

export default function UserPage(){

    const { id } = useParams();
    const [userData, setUserData] = React.useState("loading");

    React.useEffect(() => {
        axios.get(API_BASE_URL + '/users/' + id)
        .then(response => setUserData(response.data))
        .catch(e => console.log(e));
    })
    console.log(userData)
    return (
        <StyledUserPage userData={userData}>
            <NavBar></NavBar>
            {
            userData !== "loading" ?
            <div className="timeline-container">
                <div className="user-info">
                    <div/>
                    <h1>{userData.username}'s Posts</h1>
                </div>
                <main className="timeline">      
                    <div className="posts">          
                        {userData.user_posts.map(p => <Post key={p.id} data={p} user={userData}/>)}
                    </div>
                    <Trending/>
                </main>
            </div>
            :
            <div className="loader-container">
                <MutatingDots 
                    color="#FFFFFF"
                    secondaryColor="#C6C6C6"
                />
            </div>
            }
        </StyledUserPage>
    )
}

const TimelineContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    word-break: break-word;
    width: 100%;
`
