import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { contexto } from "../context/userContext";
import Post from "./Post";
import { Oval } from "react-loader-spinner";
import { getTimeline } from "../service/api";
import InfiniteScroll from "react-infinite-scroll-component";
import useInterval from "use-interval";

export default function Posts() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const { token, userData, setDisplayReload, att, setAtt, setCount } =
        useContext(contexto);
    const [newPosts, setNewPosts] = useState([]);
    const [status, setStatus] = useState(null);
    const [offset, setOffset] = useState(10);
    const [hasMore, setHasMore] = useState(true);

    const message1 =
        "An error occured while trying to fetch the posts, please refresh the page";
    const message2 = "The are no posts yet";

    useEffect(() => {
        getTimeline(token?.token, 0)
            .then((res) => {
                setLoading(false);
                setPosts(res.data.data);
            })
            .catch();
    }, [att]);

    const fetchData = () => {
        // pega posts mais antigos quando user scrolla pagina
        //API CALL
        console.log("Hi " + offset);
        getTimeline(token.token, offset)
            .then((res) => {
                setLoading(false);
                setPosts([...posts, ...res.data.data]);
                if (res.data.data.length < 10) setHasMore(false);
                setOffset(offset + 10);
            })
            .catch();
    };

    useInterval(() => {
        //veriica se existem novos posts
        getTimeline(token.token, offset)
            .then((res) => {
                setNewPosts(res.data.data);
                console.log("antes", newPosts);

            for(let i=0; i<newPosts.length; i++){
                if(newPosts[i].id <= posts[0].id){
                    let newArr = newPosts.splice(0, i)
                    setNewPosts(newArr)
                    return;
                }
            }
            if (newPosts.length > 0){
                setCount(newPosts.length)
                setDisplayReload(true)
            }
            console.log(posts)
            console.log("depois", newPosts)
        })
        .catch()
    }, [15000])

    const getMessage = () => {
        if (status !== 200) {
            return message1;
        }
        return message2;
    };

    return (
        <>
            <PostsContainer>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={
                        <div className="loader">
                            <Oval color="#6D6D6D" secondaryColor="#5E5E5E" />
                            <p>Loading more posts</p>
                        </div>
                    }
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <h4>Yay! You have seen it all</h4>
                        </p>
                    }
                >
                    {loading ? (
                        <></>
                    ) : posts && posts.length > 0 ? (
                        posts.map((p) => (
                            <Post
                                key={p.id}
                                data={p}
                                user={userData}
                                setAtt={setAtt}
                                att={att}
                                token={token}
                            />
                        ))
                    ) : !userData.following_count ? (
                        <h4>
                            Você ainda não seguiu ninguém. Siga alguém para ver
                            suas publicações.
                        </h4>
                    ) : (
                        <h4>
                            Seus amigos ainda não postaram nada. Siga mais
                            pessoas para ver outras publicações.
                        </h4>
                    )}
                </InfiniteScroll>
            </PostsContainer>
        </>
    );
}

const PostsContainer = styled.div`
    width: 611px;
    margin-top: 19px;

    :last-child {
        margin-bottom: 50px;
    }

    h4 {
        font-family: "Lato";
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 23px;
        letter-spacing: 0.05em;

        color: #ffffff;
    }

    .loader {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
            font-family: "Lato";
            font-style: normal;
            font-weight: 400;
            font-size: 22px;
            line-height: 26px;
            letter-spacing: 0.05em;

            color: #6d6d6d;
        }
    }

    @media screen and (max-width: 600px) {
        max-width: 100vw;
    }

    @media screen and (max-width: 768px) {
        max-width: 100vw;
    }
`;

