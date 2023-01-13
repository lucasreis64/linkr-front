import { useContext, useState } from "react";
import styled from "styled-components";
import { contexto } from "../../context/userContext";
import send from "../../assets/images/send.png";
import { postComment } from "../../service/api";

export default function NewComment({ post_id, reload, reloadComments }) {
    const { token } = useContext(contexto);
    const [content, setContent] = useState("");
    const { profile_picture, id } = token.userData;

    function post() {
        if (content.length === 0) return;
        postComment(token.token, post_id, id, content)
            .then((res) => {
                reload(!reloadComments);
                setContent('')
            })
            .catch((err) => console.error(err));
    }

    return (
        <NewCommentContainer>
            <div className="profile-picture">
                <img src={profile_picture} alt={profile_picture} />
            </div>
            <div className="comment-area">
                <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="write a comment..."
                />
                <img onClick={post} src={send} alt="" />
            </div>
        </NewCommentContainer>
    );
}

const NewCommentContainer = styled.div`
    padding: 20px 0;
    display: flex;
    .profile-picture {
        img {
            width: 39px !important;
            height: 39px !important;
            border-radius: 50px;
        }
        margin-right: 20px;
    }
    .comment-area {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #252525;
        border-radius: 8px;
        input {
            padding: 0 15px;
            height: 39px;
            width: 100%;
            background: #252525;
            border-radius: 8px;
            outline: none;
            border: none;
            font-family: "Lato";
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            color: #acacac;
            &::placeholder {
                font-family: "Lato";
                font-style: italic;
                font-weight: 400;
                font-size: 14px;
                letter-spacing: 0.05em;
                color: #575757;
            }
        }
        img {
            width: 15px;
            height: 15px;
            margin: 0 10px;
            cursor: pointer;
        }
    }
`;
