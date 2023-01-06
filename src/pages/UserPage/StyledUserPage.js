import styled from "styled-components";

const StyledUserPage = styled.section`
    .posts {
        display: flex;
        flex-direction: column;
    }
    .loader-container {
        height: calc(100vh - 72px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    svg {
        width: 160px;
        height: 160px;
    }
    .user-info {
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
            background-size: contain;
            border-radius: 26.5px;
        }
    }
    .timeline-container {
        margin: 0 auto;
        margin-top: 53px;
        width: 80%;
        main {
            display: flex;
        }
    }
`

export default StyledUserPage