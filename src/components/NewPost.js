import styled from "styled-components"
import userphoto from "../assets/images/user.png"

export default function NewPost(){
    return(
        <>
        <NewPostContainer>
            <div>
                <img src={userphoto} alt="user"/>
            </div>
            <div>
                <h1>What are you going to share today?</h1>
                <Form>
                    <input
                        placeholder="http://..."
                    ></input>
                    <input
                        placeholder="Awesome article about #javascript"
                    ></input>
                    <button>Publish</button>
                </Form>
            </div>
        </NewPostContainer>
        </>
    )
}

const NewPostContainer = styled.div`
    width: 611px;
    height: 209px;
    border-radius: 16px;
    background-color: white;
    padding: 16px 20px;
    display: flex;
    justify-content: space-around;
    position: relative;

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
    margin-top: 20px;

    input {
        width: 503px;
        height: 30px;
        background-color: #EFEFEF;
        border-radius: 5px;
        border-style: none;
	    padding: 0 12px;
	    font-family: 'Lato';
	    font-size: 15px;
        font-weight: 300;
    }

    button {
        width: 112px;
        height: 31px;
        border-radius: 5px;
        border-style: none;
        background-color: #1877F2;
        color: white;
        font-weight: 700;
        position: absolute;
        bottom: 20px;
        right: 25px;
    }
`