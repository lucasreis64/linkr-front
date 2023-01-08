import styled from "styled-components";
import { useState, useContext, useRef, useEffect } from "react";
import { FaRegHeart, FaHeart, FaPen, FaTrash, FaHandPointer} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deletePost, updatePost } from "../service/api";
import { contexto } from "../context/userContext";
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function Post(props){

    const {user, data, token} = {...props};
    

    const navigate = useNavigate();
    const [form, setForm] = useState({description: data.description});
    const [isLiked, setIsLiked] = useState(data.likes && data.likes.includes(user.username));
    const [isEditable, setIsEditable] = useState(user.id === data.user_id);
    const [isEditing, setIsEditing] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [button, setButton] = useState("flex");
    const [loading, setloading] = useState("Are you sure you want to delete this post?");
    const { setAttpage } = useContext(contexto);

    const inputRef = useRef(null);
    useEffect(() => {
        if (isEditing) {
          inputRef.current.focus();
        }
      }, [isEditing]);

    function handleForm({value, name}){
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

    function tapLike(){
        
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

    return(
        <>
        <PostContainer>
            <div className="left">
                <img className="profile-picture" src={data.profile_picture} alt="user" onClick={() => navigate("users/" + data.id)}/>
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
                        <FaTrash cursor={"pointer"} onClick={() => openModal()}/>
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