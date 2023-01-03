import styled from "styled-components"
import logo from "../assets/images/logo.svg"
import userphoto from "../assets/images/user.png"

export default function NavBar(){
    return (
        <NavContainer>
            <img src={logo} alt="logo"/>
            <div>
                <ion-icon name="chevron-down-outline"></ion-icon>
                <img src={userphoto} alt="user-photo"/>
            </div>
        </NavContainer>
    )
}

const NavContainer = styled.div`
    width: 100vw;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: #151515;
    padding: 0 20px;
    position: fixed;
    top: 0;

    ion-icon {
        width: 25px;
        height: 25px;
        color: white;
    }

    div {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`
