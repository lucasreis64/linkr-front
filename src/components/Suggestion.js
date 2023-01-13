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
        {data.is_followed !== '0' ? <h2>• following</h2> : <></>}
    </StyledSuggestion>
    );
}

const StyledSuggestion = styled.div`
    
    display: flex;
    align-items: center;
    ::hover {
        cursor: pointer;
    }
    h1 {
        margin-right: 4px;
        color: #515151; 
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
        background-size: cover;
        border-radius: 50px;
        margin-right: 12px;
    }
    margin-bottom: ${props => props.last ? 0 : "17px"};
    h2 {
        color: #C5C5C5;
    }
`