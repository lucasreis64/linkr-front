import styled from "styled-components"
import axios from 'axios'
import userphoto from "../assets/images/user.png"
import { useState, useContext } from "react"
import { contexto } from "../context/userContext"
import { URLS } from "../assets/constants/constants";

export default function NewPost(){
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState(undefined)
    const [text, setText] = useState("")
    const { token } = useContext(contexto)

    function publishPost(e) {
        e.preventDefault();
        setLoading(true)

        axios.post(URLS.TIMELINE, {
                link: url,
                description: text,
                token})
            .then((res) => {
                setLoading(false)
            })
            .catch((err) => { 
                alert(`Houve um erro ao publicar seu link! \n${err.response.data.message}`)
                setLoading(false)})
    }

    return(
        <>
        <NewPostContainer>
            <div className="left">
                <img className="profile-picture" src={userphoto} alt="user"/>
            </div>
            <div className="right">
                <h2>What are you going to share today?</h2>
                <Form onSubmit={publishPost}>
                    <input
                        name="url"
                        type="url"
                        value={url}
                        required
                        placeholder="http://..."
                        onChange={(u) => setUrl(u.target.value)}
                        disabled={loading? true : false}
                    ></input>
                    <textarea
                        rows="5"
                        value={text}
                        placeholder="Awesome article about #javascript"
                        onChange={(t) => setText(t.target.value)}
                        disabled={loading? true : false}
                    ></textarea>
                    <button type="submit" disabled={loading? true : false}>
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

    h2 {
        font-family: 'Lato', sans-serif;
        font-size: 20px;
        color: #707070;
        font-weight: 300;
        margin-top: 8px;
    }

    .profile-picture {
        margin-right: 15px;
        display: inline;
    }

    .right{
        width:100%;
    }

    @media screen and (max-width: 600px) {
        max-width: 100%;
        border-radius: 0;

        .profile-picture {
            display: none;
        }

        h2 {
            text-align: center;
        }

        form {
            margin: 10px auto;
        }
    }

    @media screen and (max-width: 768px) {
        max-width: 100%;
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    max-width: 500px;

    input, textarea {
        width:100%;
        max-width: 500px;
        background-color: #EFEFEF;
        border-radius: 5px;
        border-style: none;
	    padding: 0 12px;
	    font-family: 'Lato';
	    font-size: 15px;
        font-weight: 300;
        margin-bottom: 5px;
    }

    input {
        height: 30px;
    }

    textarea {
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

    button:disabled, button[disabled]{
        opacity:1;
        background-color: #cccccc;
        cursor: not-allowed;  
    }
`