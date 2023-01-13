import styled from "styled-components";
import { useState, useContext, useEffect, useRef } from "react";
import { contexto } from "../context/userContext";
import { FaRegHeart, FaHeart, FaPen, FaTrash } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { getShare, removeShare, postShare, postLike, removeLike } from "../service/api";
import { deletePost, updatePost } from "../service/api";
import { ReactTagify } from "react-tagify";
import Modal from "react-modal";
import LikeTooltip from "./Tooltip";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
Modal.setAppElement('#root');
let msgR = "";

export default function Post(props){
    const {user, data, token} = {...props};
    const [form, setForm] = useState({ description: data.description });
    const [isLiked, setIsLiked] = useState([...data?.likes_users]?.includes(user.username) || [...data?.likes_users]?.includes(user.id));
    const [shares, setShares] = useState({});
    const [isRepost, setIsRepost] = useState(false);
    const [isRepostBy, setIsRepostBy] = useState(false);
    const [isEditable, setIsEditable] = useState(user.id === data.user_id);
    const [isEditing, setIsEditing] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [button, setButton] = useState("flex");
    const [loading, setloading] = useState("Are you sure you want to delete this post?");
    const [likesCount, setLikesCount] = useState(parseInt(data.likes_count));
    const [message, setMessage] = useState(likesCount > 0 ? updateLikeTooltip() : '');
    const [msgRepost, setMsgRepost] = useState("");
    const [border, setBorder] = useState("none");
    const [uRepost, setuRepost] = useState("");
    const [attRepost, setAttRepost] = useState(false);
    const { setAttpage } = useContext(contexto);
    const inputRef = useRef(null);
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

      useEffect(() => {
        if (data.repostBy != undefined) 
        {
          setIsRepostBy(true);
          setBorder("0px 0px 16px 16px");
          if(data.repostBy === user.username)
          {
            setuRepost("Voce");
          }
          else
          {
            setuRepost(data.repostBy);
          }
        }
        else
        {
            setIsRepostBy(false);
        }
        
      }, [props.att]);

      useEffect(() => {
        let isApiSubscribed = true;
        getShare(data.id).then((res) => {
          if(isApiSubscribed) 
          {
            setShares(res.data);
            let vc = false;
            if(res.data.length > 0)
            {
                setAttRepost(true);
                for(let i = 0; i < res.data.length; i++)
                {
                    if(res.data[i].username === user.username)
                    {
                        setIsRepost(true);
                        vc = true;
                    }
                    else
                    {
                        msgR = res.data[i].username;
                    }
                }
                if(vc === false)
                {
                    if(res.data.length > 2)
                    {
                        setMsgRepost( msgR + ", " + res.data[0].username + " e outras " + (res.data.length - 2) + " pessoas");
                    }
                    else
                    if(res.data.length === 2)
                    {
                        setMsgRepost( msgR + " e " + res.data[0].username);
                    }
                }
                if(vc === true)
                {
                    if(res.data.length === 1)
                    {
                        setMsgRepost( "Você");
                    }
                    else
                    if(res.data.length === 2)
                    {
                        setMsgRepost( "Você e " + msgR);
                    }
                    else
                    if(res.data.length > 2)
                    {
                        setMsgRepost("Você, " + msgR + " e outras " + (res.data.length - 2) + " pessoas");
                    }

                }
                
            }    
          }
        })
        .catch()

        return () => 
        {
          isApiSubscribed = false;
        };
    }, [props.att]);
    
    data.likes_count = data.likes_users.length;

    function handleForm({ value, name }) {
        setForm({
            [name]: value
        });
    }

    function handleSendForm(e){
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

    function handleKeyDown(e){
        if (e.keyCode === 27) {
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

    function postS()
    {
        setButton("none");
        setloading("loading...");
        setAttRepost(false);
        const req = postShare(token.token, data.id);
        req.then((e) => 
        {
            props.setAtt(props.att+1);
            setAttpage(props.att+1);
            closeModal2();
            setIsRepost(true);
            setAttRepost(true);
            setButton("flex");
            setloading("Do you want to re-post this link?");
        });
        req.catch((e) => {
            
            alert("sharePost deu errado " + e);
            setButton("flex");
            setloading("Do you want to re-post this link?");
            setAttRepost(true);
        });
    }

    function removeS()
    {
        const requisicao = removeShare(token.token, data.id);
        setAttRepost(false);
        requisicao.then((e) => 
        {
            props.setAtt(props.att+1);
            setAttpage(props.att+1);
            setIsRepost(false);
            setAttRepost(true);
        });
        requisicao.catch((e) => {
            alert("removeShare deu errado " + e);
            setAttRepost(true);
        });
    }

    function openModal() {
        setIsOpen(true);
    }
     
    function closeModal() {
        setIsOpen(false);
    }

    function openModal2() 
    {
        setIsOpen2(true);
    }
     
    function closeModal2() 
    {
        setIsOpen2(false);
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
        //console.log(data?.likes_users);
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
            {isRepostBy? (
                            <Repost>
                                <BiRepost cursor={"pointer"} color="white" /> <h1>Re-post by {uRepost}</h1>
                            </Repost>             
                           ): (
                            ''
                           )} 
            <PostContainer border = {border}>
            
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
                    <div className="share-actions">
                        {isRepost ? (
                            <BiRepost cursor={"pointer"} color="red"  onClick={() => removeS()} />
                            
                        ): (
                            <BiRepost cursor={"pointer"}  onClick={() => openModal2()} />
                        )}       
                        
                        <div>
                           {(shares.length > 0 && attRepost === true) ?
                                <><p id={data.id + 0.5}
                                    className="share-count"
                                    data-tooltip-content={msgRepost}
                                    data-tooltip-variant="light">
                                    {shares.length} shares
                                </p><Tooltip anchorId={data.id + 0.5} place='bottom' style={{ fontSize: '11px' }} /></>
                            : ''}  
                        </div>
                        <Modal
                            isOpen={modalIsOpen2}
                            onRequestClose={closeModal2}
                            contentLabel="onRequestClose Example"
                            style={customStyles}
                            onAfterOpen={()=> setloading("Do you want to re-post this link?")}
                            shouldCloseOnOverlayClick={false}
                            >
                                <Box>
                                    <h1>{loading}</h1>
                                    <Buttons display={button}>
                                        <B1 onClick={closeModal2}>No, cancel</B1>
                                        <B2 onClick={postS}>Yes, share!</B2>
                                    </Buttons>
                                </Box>
                            </Modal>
                    </div>
                </div>
                <div className="right">
                    <div className="header">
                        <Link to={`/users/` + data.user_id} className="username">{data.username}</Link>
                        <div className={`menu-op ${isEditable ? '' : 'hidden'}`} >
                            <FaPen cursor={"pointer"} onClick={() => setIsEditing(true)} />
                            <FaTrash cursor={"pointer"} onClick={() => openModal()} />
                            <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="onRequestClose Example"
                            style={customStyles}
                            onAfterOpen={()=> setloading("Are you sure you want to delete this post?")}
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
                        tagClicked={(tag)=> navigate(`/hashtag/${tag.substring(1)}`)}>
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

  const Repost = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    padding: 10px;
    background: #1E1E1E;
    border-radius: 16px 16px 0px 0px;
       h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        margin: 5px;
        color: #FFFFFF;
       }
`;

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
    border-radius: ${props => props.border};
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
                width: 100%;
                margin-top: 5px;
                font-size: 11px;
                line-height: 13px;
            }
           
        }

        .share-actions{
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 27px;
            text-align: center;
            margin-top: 15px;

            .share-count{
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
    height: 100%;
    min-height: 30px;
    border-radius: 5px;
    border-style: none;
	color: #B7B7B7;
    font-size: 17px;
    line-height: 20px;
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
