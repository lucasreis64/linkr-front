import styled from "styled-components";

export default function Comment({ user }) {
    const { profile_picture, username, content } = user;

    return (
        <>
            <CommentContainer>
                <div className="profile-picture">
                    <img src={profile_picture} alt={profile_picture} />
                </div>
                <div className="user-and-content">
                    <div className="userName">
                        <h1>{username}</h1>
                    </div>
                    <p>{content}</p>
                </div>
            </CommentContainer>
            <Line />
        </>
    );
}

const CommentContainer = styled.div`
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
    .user-and-content {
        h1 {
            font-family: "Lato";
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            color: #f3f3f3;
            margin-bottom: 4px;
        }
        p {
            font-family: "Lato";
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            color: #acacac;
        }
    }
`;

const Line = styled.div`
    background-color: #353535;
    height: 1px;
    width: 100%;
`;
