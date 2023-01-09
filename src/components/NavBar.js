import styled from "styled-components"
import logo from "../assets/images/logo.svg"
import lupa from "../assets/images/lupa.svg"
import down from "../assets/images/down.png"
import up from "../assets/images/up.png"
import {DebounceInput} from 'react-debounce-input';
import { useContext, useState } from "react";
import Suggestion from "./Suggestion";
    import axios from "axios";
    import { API_BASE_URL } from "../assets/constants/constants";
import { FallingLines } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import { contexto } from "../context/userContext"
import { slideTop } from "../assets/animations/animations"

export default function NavBar(){
    const [search, setSearch] = useState("");
    const [suggestionsDisplay, setSuggestionsDisplay] = useState("none");
    const [suggestions, setSuggestions] = useState([])
    const [logoutMenu, setLogoutMenu] = useState(false)
    const {setToken, userData} = useContext(contexto)
    const navigate = useNavigate()
    
    function handleChange(e) {
        const new_search = e.target.value;
        setSearch(new_search);
        if(new_search.length < 3)
            return;
        axios.get(API_BASE_URL + `/search?name=${new_search}`)
        .then(response => {setSuggestions(response.data)})
        .catch(e => console.log(e))
        return;
    }
    function handleBlur() {
        setTimeout(() => setSuggestionsDisplay('none'), 180);
    }

    function handleLogout () {
        setLogoutMenu(!logoutMenu);
    }

    return (
        <>
        <NavContainer>
            <img className="logo" src={logo} alt="logo" onClick={() => navigate('/timeline')}/>
            <SearchContainer origin={"desktop"}
            onFocus={() => setSuggestionsDisplay("block")}
            onBlur={handleBlur}
            suggestionsDisplay={suggestionsDisplay}
            >
                <DebounceInput debounceTimeout={300} 
                onChange={handleChange}
                placeholder="Search for people"
                value={search}/>
                <div className="suggestions">
                    {suggestions.map((value, index) => <Suggestion data={value} key={index} last={index === suggestions.length - 1}/>)}
                </div>
                <ion-icon name="search-outline"></ion-icon>            
            </SearchContainer>
            <UserContainer>
                {logoutMenu?<img onClick={handleLogout} className="arrow" src={up} alt="arrow"/>:<img onClick={handleLogout} className="arrow" src={down} alt="arrow"/>}
                <img className="profile-picture" src={userData.profile_picture} alt="user"/>
                {logoutMenu?<div className="logout-menu"><button onClick={()=><>{localStorage.clear()};{setToken({})};{navigate('/')}</>}>Logout</button></div>:true}
            </UserContainer>
        </NavContainer>
        <FakeNavBar/>
        <SearchContainer origin={"mobile"}
        onFocus={() => setSuggestionsDisplay("block")}
        onBlur={handleBlur}
        suggestionsDisplay={suggestionsDisplay}
        >
            <DebounceInput debounceTimeout={300} 
            onChange={handleChange}
            placeholder="Search for people"
            value={search}/>
            <div className="suggestions">
                {suggestions.map((value, index) => <Suggestion data={value} key={index} last={index === suggestions.length - 1}/>)}
            </div>
            <ion-icon name="search-outline"></ion-icon>            
        </SearchContainer>
        </>        
    )
}

const UserContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    .logout-menu{
        animation: ${slideTop} 500ms;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 72px;
        right: 0px;
        width: 150px;
        height: 47px;
        background-color: black;
        z-index: 3;
        border-bottom-left-radius: 20px;
        button{
            animation: ${slideTop} 500ms;
            font-size: 15px;
            border: none;
            background-color: inherit;
            font-family: 'Lato';
            font-style: normal;
            font-weight: 700;
            color: white;
        }
        button:hover{
            cursor: pointer;
        }
    }
`

const SearchContainer = styled.div`
    max-width: 563px;
    width: 100%;
    position: relative;
    .suggestions {
        display: ${props => props.suggestionsDisplay};
        max-width: 563px;
        min-height: 60px;
        width: 100%;
        position: fixed;
        top: 53px;
        z-index : 1;
        border-radius: 8px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        width: 100%;
        padding: 17px;
        background-color: #E7E7E7;
        -webkit-animation: slide-top 0.5s ease-in reverse both;
        animation: slide-top 0.5s ease-in reverse both;
    }
    ion-icon {
        color: #c6c6c6 !important;
        position: absolute !important;
        right: 13px !important;
        top: 11px !important;
        z-index: 2;
        @media (max-width: 600px) {
        display: none;
    }
    }
    input {
        width: 100%;
        height: 45px;
        padding: 17px;
        border-radius: 8px;
        z-index: 2;
        position: relative;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;  
        border: 0px;
        outline: none;
        @media (max-width: 600px) {
        display: none;
    }
    }
    @media (min-width: 600px) {
        display: ${props => props.origin === "desktop" ? "block" : "none"};
    }
    @media (max-width: 600px) {
        display: ${props => props.origin === "mobile" ? "flex" : "none"};
        justify-content: center;
        width: 100vw;
        input {
            width: 95vw;
            margin-top: 10px;
        }
        ion-icon {
            font-size: 20px;
            margin: 13px;
        }
        .suggestions {
            width:95vw;
            top: 120px;
        }
    }
`

const NavContainer = styled.div`
    z-index: 1;
    @-webkit-keyframes slide-top {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    100% {
        -webkit-transform: translateY(-37px);
                transform: translateY(-37px);
    }
    }
    @keyframes slide-top {
    0% {
        -webkit-transform: translateY(0);
                transform: translateY(0);
    }
    100% {
        -webkit-transform: translateY(-37px);
                transform: translateY(-37px);
    }
    }

    width: 100vw;
    height: 72px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #151515;
    padding: 0 20px;
    top: 0;
    display: hidden;

    .logo {
        cursor: pointer;
        width: 100%;
        max-width: 100px;
        margin-right: 10px;
    }
    
    .profile-picture {
        display: inline;
        width: 50px;
        height: 50px;
        border-radius: 26px;
    }

    .fake-navbar {
        height: 72px;
    }

    ion-icon {
        width: 25px;
        height: 25px;
        color: white;
    }        
`
const FakeNavBar = styled.div`
    height: 72px;
`