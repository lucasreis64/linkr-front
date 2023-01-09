import styled from "styled-components";
import { useState, useContext, useEffect, useRef } from "react";
import { contexto } from "../context/userContext";
import { FaRegHeart, FaHeart, FaPen, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { postLike, removeLike } from "../service/api";
import { deletePost, updatePost } from "../service/api";
import { ReactTagify } from "react-tagify";
import Modal from "react-modal";
import LikeTooltip from "./Tooltip";
Modal.setAppElement('#root');

export default function Post(props){
    const {user, data, token} = {...props};
    const [form, setForm] = useState({ description: data.description });
    const [isLiked, setIsLiked] = useState([...data?.likes_users]?.includes(user.username));
    const [isEditable, setIsEditable] = useState(user.id === data.user_id);
    const [isEditing, setIsEditing] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [button, setButton] = useState("flex");
    const [loading, setloading] = useState("Are you sure you want to delete this post?");
    const [likesCount, setLikesCount] = useState(parseInt(data.likes_count));
    const [message, setMessage] = useState(likesCount > 0 ? updateLikeTooltip() : '');
    const { setAttpage } = useContext(contexto);
    const inputRef = useRef(null);
    console.log(data.user_id + " " + user.id)
    const navigate = useNavigate();

    const tagStyle = {
        fontWeight: 800,
        cursor: 'pointer'
      };   

    useEffect(() => {
        if (isEditing) {
          inputRef.current.focus();
        }
        
      }, [isEditing]);
    
    data.likes_count = data.likes_users.length;
    


    function handleForm({ value, name }) {
        setForm({
            [name]: value
        });
    }

    function handleSendForm(e)
    {
        e.preventDefault();
        setIsEditing(false);
        
        const requisicao = updatePost(token.token, form.description, data.link, data.id);

        requisicao.then((e) => 
        {
            props.setAtt(props.att+1);
            setAttpage(props.att+1);
            setForm({
                description: form.description
            });
        });
        requisicao.catch((e) => {
            
            alert("updatePost deu errado " + e);
            setIsEditing(true);
        });

        //UPDATE DO POST COM OBJETO FORM.description

    }

    function handleKeyDown(e)
    {
        if (e.keyCode === 27) 
        {
            e.preventDefault();
            setIsEditing(false);
            setForm({
                description: data.description
            });
        }
    }

    function tapLike(action) {
        setIsLiked(!isLiked);
        if(action === 'like'){
            postLike(token.token, data.id)
            .then((res)=> {
                console.log(res.status);
                setLikesCount(likesCount+1);
                setMessage(updateLikeTooltip());
            })
            .catch()
        }

        if(action === 'dislike') {

            removeLike(token.token, data.id)
            .then((res)=> {
                console.log(res.status);
                setLikesCount(likesCount-1);
                setMessage(updateLikeTooltip());
            })
            .catch()
        }
    }

    function afterOpenModal() 
    {

    }

    function openModal() 
    {
        setIsOpen(true);
    }
     
    function closeModal() 
    {
        setIsOpen(false);
    }

    function deleteP()
    {
        setButton("none");
        setloading("loading...");
        const requisicao = deletePost(token.token, data.id);

        requisicao.then((e) => 
        {
            props.setAtt(props.att+1);
            setAttpage(props.att+1);
            closeModal();
            setButton("flex");
            setloading("Are you sure you want to delete this post?");
        });
        requisicao.catch((e) => {
            
            alert("deletePost deu errado " + e);
            closeModal();
            setButton("flex");
            setloading("Are you sure you want to delete this post?");
        });
    }
    
    function updateLikeTooltip(){
        console.log(data?.likes_users);
        let param1, param2, param3 = '';
        
        if(isLiked){
            param1 = 'Você';
            
            if(likesCount > 1){
                param2 = (([...data?.likes_users]?.filter((i) => i !== user.username))[0]);
                
            }
            
        }

        if(!isLiked){
           
            param1 = data?.likes_users[0];
            if(likesCount > 1){
                param2 = data?.likes_users[1];
                
            }
            
        }

        if(likesCount > 2){
            const number = parseInt(likesCount)-2;
            param2 = ', ' + param2;
            param3 = ' e outras ' +number+ ' pessoas';
            
        }

        if(likesCount === 2){
            param2 = ' e ' + param2;
            
        }


        if(param1 === undefined || param1 === null){
            param1 = '';
        }
        if(param2 === undefined || param2 === null){
            param2 = '';
        }
        if(param3 === undefined || param3 === null){
            param3 = '';
        }
        //console.log(param1, param2, param3 )

        return ''+param1+param2+param3;

    }

    return (
        <>
            <PostContainer>
                <div className="left">
                    <img className="profile-picture" src={data.profile_picture} alt="user" onClick={() => navigate('/users/' + data.user_id)}/>
                    <div className="like-actions">
                        {isLiked ? (
                            <FaHeart cursor={"pointer"} color="red" onClick={() => tapLike('dislike')} />
                        ) : (
                            <FaRegHeart cursor={"pointer"} onClick={() => tapLike('like')} />
                        )}
                        <div>
                           {likesCount > 0 ?
                                <LikeTooltip 
                                    key={data.id}
                                    data={{message, likesCount, id: data.id}}
                                /> : ''
                            }        
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="header">
                        <Link to='/' className="username">{data.username}</Link>
                        <div className={`menu-op ${isEditable ? '' : 'hidden'}`} >
                            <FaPen cursor={"pointer"} onClick={() => setIsEditing(true)} />
                            <FaTrash cursor={"pointer"} onClick={() => openModal()} />
                            <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            contentLabel="onRequestClose Example"
                            style={customStyles}
                            
                            shouldCloseOnOverlayClick={false}
                            >
                                <Box>
                                    <h1>{loading}</h1>
                                    <Buttons display={button}>
                                        <B1 onClick={closeModal}>No, go back</B1>
                                        <B2 onClick={deleteP}>Yes, delete it</B2>
                                    </Buttons>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                <Form onSubmit={handleSendForm}>
                    {isEditing ? (
                        <Input
                        ref={inputRef}
                        name="description"
                        type="text"
                        value={form?.description}
                        required
                        onChange={(e) => handleForm({
                            name: e.target.name,
                            value: e.target.value
                        })}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    ):(
                        <Text><ReactTagify 
                        tagStyle={tagStyle} 
                        tagClicked={(tag)=> alert(tag)}>
                        <p>
                          {data.description}
                        </p>
                      </ReactTagify></Text>
                    )}
                    <button type="submit" className="hidden"></button>
                </Form>
                <a href={data.link_metadata?.url} target="_blank" rel="noreferrer" className={
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

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'transparent',
      border: 'none',
    },
  };

const Box = styled.div`
    display: flex;
    width: 597px;
    height: 262px;
    left: 413px;
    top: 349px;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background: #333333;
    border-radius: 50px;
    h1{
        font-weight: 700;
        font-size: 34px;
        line-height: 41px;
        text-align: center;
        width: 60%;

        color: #FFFFFF;
    }
`;

const Buttons = styled.div`
    display: ${props => props.display};
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 30px;
    margin-top: 25px;
`;

const B1 = styled.div`
    display: flex;
    width: 134px;
    height: 37px;
    background: #FFFFFF;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #1877F2;
    margin: 10px;
`;

const B2 = styled.div`
    display: flex;
    width: 134px;
    height: 37px;
    background: #1877F2;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #FFFFFF;
    margin: 10px;
`;


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
        flex-direction: column;
        display: flex;
        align-items: center;
        margin-right: 12px;

        .profile-picture {
            width: 50px;
            height: 50px;
            border-radius: 26px;
            margin-bottom: 19px;
            cursor: pointer;
        }
        
        .like-actions{
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 19px;
            text-align: center;

            .like-count{
                width: 60%;
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