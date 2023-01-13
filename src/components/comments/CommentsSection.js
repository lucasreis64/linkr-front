import { useContext, useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import styled from "styled-components";
import { contexto } from "../../context/userContext";
import Comment from "./Comment";
import NewComment from "./NewComment";

export default function CommentsSection({ post_id, comment, reloadComments, setReloadComments }) {

    return (
        <CommentsContainer>
            {comment ? (
                comment.map((c) => <Comment user={c} />)
            ) : (
                <MutatingDots color="#FFFFFF" secondaryColor="#C6C6C6" />
            )}
            <NewComment
                reload={setReloadComments}
                reloadComments={reloadComments}
                post_id={post_id}
            />
        </CommentsContainer>
    );
}

const CommentsContainer = styled.div`
    margin-top: -16px;
    background-color: #1e1e1e;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    width: 100%;
    padding: 0 30px;
    padding-top: 16px;
`;
