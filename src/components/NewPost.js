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
                <h2>What are you going to share today?</h2>
                <Form>
                    <input
                        className="small"
                        placeholder="http://..."
                    ></input>
                    <textarea
                        className="big"
                        rows="5"
                        placeholder="Awesome article about #javascript"
                    ></textarea>
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
    justify-content: space-evenly;
    position: relative;
    box-sizing: border-box;

    h2 {
        font-family: 'Lato', sans-serif;
        font-size: 20px;
        color: #707070;
        font-weight: 300;
        margin-top: 8px;
    }

    img {
        margin-right: 15px;
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;

    input, textarea {
        background-color: #EFEFEF;
        border-radius: 5px;
        border-style: none;
	    padding: 0 12px;
	    font-family: 'Lato';
	    font-size: 15px;
        font-weight: 300;
        margin-bottom: 5px;
        box-sizing: border-box;
    }

    input {
        width: 500px;
        height: 30px;
    }

    textarea {
        width: 500px;
        height: 70px;
        padding-top: 5px;
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
        bottom: 14px;
        right: 20px;
    }
`