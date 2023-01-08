import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { contexto } from "../context/userContext";
import { FaRegHeart, FaHeart, FaPen, FaTrash } from "react-icons/fa";
import { Parser } from "simple-text-parser";
import { Link, useNavigate } from "react-router-dom";
import { postLike, removeLike } from "../service/api";

export default function Post({ data, user }) {
    
    const [form, setForm] = useState({ description: data.description });
    const [isLiked, setIsLiked] = useState([...data.likes_users].includes(user.username));
    const [isEditable, setIsEditable] = useState(user.id === data.user_id);
    const [isEditing, setIsEditing] = useState(false);
    const [likesCount, setLikesCount] = useState(parseInt(data.likes_count));

    const {token} = useContext(contexto);
    const navigate = useNavigate();

    const parser = new Parser();
    parser.addRule(/\#[\S]+/gi, function (tag) {
        return `<span className="tag" 
                onClick={() => navigate('/hashtag/${tag.substring(1)}')}>
                ${tag}
                </span>`;
        });

    const description = parser.render(data.description)
    console.log(description)

    function handleForm({ value, name }) {
        setForm({
            [name]: value
        });
    }

    function handleSendForm(e) {
        e.preventDefault();
        setIsEditing(false);
        //UPDATE DO POST COM OBJETO FORM.description

    }

    function tapLike(action) {
        setIsLiked(!isLiked);
        if(action === 'like'){
            postLike(token.token, data.id)
            .then((res)=> {
                console.log(res.status);
                setLikesCount(likesCount+1);
            })
            .catch()
        }

        if(action === 'dislike') {

            removeLike(token.token, data.id)
            .then((res)=> {
                console.log(res.status);
                setLikesCount(likesCount-1);
            })
            .catch()
        }
    }

    return (
        <>
            <PostContainer>
                <div className="left">
                    <img className="profile-picture" src={data.profile_picture} alt="user" />
                    <div className="like-actions">
                        {isLiked ? (
                            <FaHeart cursor={"pointer"} color="red" onClick={() => tapLike('dislike')} />
                        ) : (
                            <FaRegHeart cursor={"pointer"} onClick={() => tapLike('like')} />
                        )}
                        <div className="like-count">{likesCount > 0 ? `${likesCount} likes` : null}</div>
                    </div>
                </div>
                <div className="right">
                    <div className="header">
                        <Link to='/' className="username">{data.username}</Link>
                        <div className={`menu-op ${isEditable ? '' : 'hidden'}`} >
                            <FaPen cursor={"pointer"} onClick={() => setIsEditing(true)} />
                            <FaTrash cursor={"pointer"} onClick={() => alert("função deletar")} />
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
                        ) : (
                            <Text>{description}</Text>
                        )}
                        <button type="submit" className="hidden"></button>
                    </Form>
                    <a href={data.link_metadata?.url} className={
                        data.link_metadata?.url !== undefined
                        && data.link_metadata?.url !== null
                        && data.link_metadata?.url !== '' ?
                        ('') : ('hidden')
                    }>
                        <div className="link-container">
                            <div className="text-container">
                                <h2>{data.link_metadata?.title}</h2>
                                <p>{data.link_metadata?.description}</p>
                                <p>{data.link_metadata?.url}</p>
                            </div>
                            <Image
                                url={data.link_metadata?.image}
                            />
                        </div>
                    </a>
                    

                </div>
            </PostContainer>
        </>
    )
}

const PostContainer = styled.div`
    width: 611px;
    height: 280px;
    border-radius: 16px;
    background-color: #171717;
    padding: 16px 18px;
    display: flex;
    position: relative;
    color: #FFFFFF;
    font-family: 'Lato', sans-serif;
    margin-bottom: 16px;
    box-sizing: border-box;

    a{
        text-decoration: none;
    }

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
            font-size: 19px;

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


            .username{        
                font-size: 20px;
                line-height: 23px;
                margin-top: 8px;
                text-decoration: none;
                color: #FFFFFF;

                :hover{
                    opacity: 0.8;
                }
            }

            .menu-op{
                width: 10%;
                display: flex;
                justify-content: space-between;
            }
        }

        .link-container{
            width: 100%;
            height: 155px;
            display: flex;
            justify-content: space-between;
            border: 1px solid #4D4D4D;
            border-radius: 11px;
    

            .text-container{
                width: 60%;
                height: 100%;
                padding: 16px 20px;

                h2{
                    font-size: 16px;
                    line-height: 19px;
                    color: #CECECE;
                    margin-bottom: 5px;
                    height: 40px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                p{
                    font-size: 11px;
                    line-height: 13px;
                    margin-bottom: 13px;
                    color: #9B9595;
                    max-width: 100%;
                    height: 30px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                p{
                    font-size: 11px;
                    line-height: 13px;
                    text-decoration: none;
                    color: #CECECE;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
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
    margin-bottom: 5px;

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
`

const Text = styled.div`
    width:100%;
    height: 50px;
    min-height: 44px;
    border-radius: 5px;
    border-style: none;
	color: #B7B7B7;
    font-size: 17px;
    line-height: 20px;

    .tag {
        font-weight: bold;
    }
`

const Image = styled.div`
    width: 30%;
    height: 100%;
    border-radius: 0px 12px 13px 0px;
    background: url(${props => props.url}) no-repeat padding-box;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover; 
             
`