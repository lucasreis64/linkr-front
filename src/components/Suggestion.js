import { useNavigate } from "react-router-dom";
import styled from "styled-components"

export default function Suggestion({data, last}) {
    const navigate = useNavigate();
    function handleClick(event) {
        navigate('/users/' + data.id)
    }

    return (
    <StyledSuggestion onClick={handleClick} last={last} img={data.profile_picture}>
        <div/>
        <h1>{data.username}</h1>
    </StyledSuggestion>
    );
}

const StyledSuggestion = styled.div`
    
    display: flex;
    align-items: center;
    ::hover {
        cursor: pointer;
    }

    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    div {
        width: 39px;
        height: 39px;
        background-image: url(${props => props.img});
        background-repeat: no-repeat;
        background-size: contain;
        margin-right: 12px;
    }
    margin-bottom: ${props => props.last ? 0 : "17px"};
    color: #515151; 
`