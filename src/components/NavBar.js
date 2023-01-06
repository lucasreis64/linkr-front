import styled from "styled-components"
import logo from "../assets/images/logo.svg"
import userphoto from "../assets/images/user.png"
import {DebounceInput} from 'react-debounce-input';
import { useState } from "react";
import Suggestion from "./Suggestion";
import axios from "axios";
import { API_BASE_URL } from "../assets/constants/constants";

export default function NavBar(){

    const [search, setSearch] = useState("");
    const [suggestionsDisplay, setSuggestionsDisplay] = useState("none");
    const [suggestions, setSuggestions] = useState([])
    
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

    return (
        <NavContainer suggestionsDisplay={suggestionsDisplay}>
            <img className="logo" src={logo} alt="logo"/>
            <div className="search-container"
            onFocus={() => setSuggestionsDisplay("block")}
            onBlur={handleBlur}
            >
                <DebounceInput debounceTimeout={300} 
                onChange={handleChange}
                placeholder="Search for people"
                value={search}/>
                <div className="suggestions">
                    {suggestions.map((value, index) => <Suggestion data={value} key={index} last={index === suggestions.length - 1}/>)}
                </div>
            </div>
            <div className="profile-picture">
                <ion-icon name="chevron-down-outline"></ion-icon>
                <img src={userphoto} alt="user"/>
            </div>
        </NavContainer>
    )
}

const NavContainer = styled.div`
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: #151515;
    padding: 0 20px;
    position: absolute;
    top: 0;
    .search-container {
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
    }

    .logo {
        width: 100%;
        max-width: 100px;
        margin-right: 10px;
    }
    
    ion-icon {
        width: 25px;
        height: 25px;
        color: white;
    }

    .profile-picture {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`
