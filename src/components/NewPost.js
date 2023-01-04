import styled from "styled-components"
import axios from 'axios'
import userphoto from "../assets/images/user.png"
import { useState } from "react"

export default function NewPost(){
    const [url, setUrl] = useState(undefined)
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)

    function publishPost(e) {
        e.preventDefault();
        setLoading(true)

        const body = {
            url,
            text,
        }

        axios.post(URL, body)
            .then()
            .catch()
    }

    return(
        <>
        <NewPostContainer>
            <div>
                <img className="userphoto" src={userphoto} alt="user"/>
            </div>
            <div>
                <h2 className="question">What are you going to share today?</h2>
                <Form onSubmit={publishPost}>
                    <input
                        name="url"
                        type="url"
                        value={url}
                        required
                        placeholder="http://..."
                        onChange={u => setUrl(u.target.value)}
                        disabled={loading? true : false}
                    ></input>
                    <textarea
                        rows="5"
                        placeholder="Awesome article about #javascript"
                        onChange={t => setText(t.target.value)}
                        disabled={loading? true : false}
                    ></textarea>
                    <button 
                        type="submit"
                        disabled={loading? true : false}>
                       {loading ? <p>Publishing</p> : <p>Publish</p>} 
                    </button>
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

    .question {
        font-family: 'Lato', sans-serif;
        font-size: 20px;
        color: #707070;
        font-weight: 300;
        margin-top: 8px;
    }

    .userphoto {
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