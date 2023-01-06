import styled from "styled-components";
import { useState, useContext } from "react";
import { contexto } from "../context/userContext";
import { FaRegHeart, FaHeart, FaPen, FaTrash, FaHandPointer} from "react-icons/fa";

export default function Post({data, user}){

    const [form, setForm] = useState({description: data.description});
    const [isLiked, setIsLiked] = useState(data.likes_users.includes(user.username));
    const [isEditable, setIsEditable] = useState(user.id === data.user_id);
    const [isEditing, setIsEditing] = useState(false);

    function handleForm({value, name}){
        setForm({
            [name]: value
        });
    }

    function handleSendForm(e){
        e.preventDefault();
        setIsEditing(false);
        //UPDATE DO POST COM OBJETO FORM.description

    }

    function tapLike(){
        
    }
     

    return(
        <>
        <PostContainer>
            <div className="left">
                <img className="profile-picture" src={data.profile_picture} alt="user"/>
                <div className="like-actions">
                    {isLiked ? (
                        <FaHeart cursor={"pointer"} color="red" onClick={() => tapLike()}/>
                    ): (
                        <FaRegHeart cursor={"pointer"} onClick={() => tapLike()}/>
                    )}
                    <div className="like-count">{data.likes_count > 0 ? `${data.likes_count} likes` : null}</div>
                </div>
            </div>
            <div className="right">
                <div className="header">
                    <h2>{data.username}</h2>
                    <div className={`menu-op ${isEditable ? '' : 'hidden'}`} >
                        <FaPen cursor={"pointer"} onClick={() => setIsEditing(true)} />
                        <FaTrash cursor={"pointer"} onClick={() => alert("função deletar")}/>
                    </div>
                </div>
                <Form onSubmit={handleSendForm}>
                    {isEditing ? (
                        <Input
                        name="description"
                        type="text"
                        value={form?.description}
                        required
                        onChange={(e) => handleForm({
                            name: e.target.name,
                            value: e.target.value
                        })}
                    />
                    ):(
                        <Text>{data.description}</Text>
                    )}
                    <button type="submit" className="hidden"></button>
                </Form>
                <div className="link-container">{data.link}</div>
            </div>
        </PostContainer>
        </>
    )
}

const PostContainer = styled.div`
    width: 611px;
    height: 209px;
    border-radius: 16px;
    background-color: #171717;
    padding: 16px 20px;
    display: flex;
    position: relative;
    color: #FFFFFF;
    font-family: 'Lato', sans-serif;
    margin-bottom: 16px;

    .hidden{
        visibility: hidden;
    }

    .left{
        width: 10%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 12px;

        .profile-picture {
            width: 50px;
            height: 50px;
            border-radius: 26px;
            margin-bottom: 19px;
        }
        
        .like-actions{
            display: flex;
            flex-direction: column;
            align-items: center;

            .like-count{
                width: 100%;
                margin-top: 5px;
                font-size: 11px;
                line-height: 13px;
            }
        }
    }

    .right{
        width:85%;

        .header{
            width: 100%;
            display: flex;
            justify-content: space-between;


            h2 {        
                font-size: 20px;
                line-height: 23px;
                margin-top: 8px;
            }

            .menu-op{
                width: 10%;
                display: flex;
                justify-content: space-between;
            }
        }

        

    }

    @media screen and (max-width: 600px) {
        max-width: 100%;
        border-radius: 0;

        
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

`

const Input = styled.input`
    width:100%;
    max-width: 500px;
    height: fit-content;
    min-height: 44px;
    background-color: #EFEFEF;
    border-radius: 5px;
    border-style: none;
	padding: 0 12px;
	font-family: 'Lato';
	font-size: 15px;
    font-weight: 300;
    margin-bottom: 5px;

    
`

const Text = styled.div`
    width:100%;
    height: fit-content;
    min-height: 44px;
    border-radius: 5px;
    border-style: none;
	color: #B7B7B7;
    font-size: 17px;
    line-height: 20px;
    margin-bottom: 5px;
`