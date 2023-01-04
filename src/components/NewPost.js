import styled from "styled-components"
import userphoto from "../assets/images/user.png"

export default function NewPost(){
    return(
        <>
        <NewPostContainer>
            <div>
                <img src={userphoto} alt="user"/>
                <h1>What are you going to share today?</h1>
                <Form>
                    <input></input>
                    <input></input>
                    <button>Publish</button>
                </Form>
            </div>
            <div></div>
        </NewPostContainer>
        </>
    )
}

const NewPostContainer = styled.div`
    width: 611px;
    height: 209px;
    border-radius: 16px;
    background-color: white;
    position: absolute;

    h1 {
        font-family: 'Lato', sans-serif;
        font-size: 20px;
        color: #707070;
        font-weight: 300;
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        width: 503px;
        background-color: #EFEFEF;
        border-radius: 5px;
    }

    button{
        width: 112px;
        height: 31px;
        border-radius: 5px;
        background-color: #1877F2;
        color: white;
        position: fixed;
        bottom: 0;
        right: 0;
    }
`