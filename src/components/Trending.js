import styled from "styled-components"
import { useState, useEffect, useContext } from "react"
import { getTrendings } from "../service/api";
import { Link } from "react-router-dom";
import { contexto } from "../context/userContext";

export default function Trending(){
    const [trends, setTrends] = useState([]);
    const { attpage } = useContext(contexto);
    //const token = localStorage.getItem("token");
    
    useEffect(() => {
        let isApiSubscribed = true;
        getTrendings().then((res) => {
          if(isApiSubscribed) 
          {
            setTrends(res.data);
            
          }
        });

        return () => 
        {
          isApiSubscribed = false;
        };
      }, [attpage]);

    return(
        <>
        <TrendContainer>
            <Topo>
                <h1>trending</h1>
            </Topo>
           {trends.map((trend, index) => <Link key={index} to={`/hashtag/${trend.hashtag}`}><li># {trend.hashtag}</li></Link>)}
        </TrendContainer>
        </>
    )
}
const Topo = styled.div`
    border-bottom: 1px solid #484848;
    width: 100%;
    
`;
const TrendContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 400px;
    height: 500px;
    background: #171717;
    border-radius: 16px;
    margin-left: 15px;
    position: sticky;
    
    a{
        text-decoration: none;
    }
h1{
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    margin: 10px;
    color: #FFFFFF;
    
}
li{
    list-style-type: none;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    margin: 10px;
    color: #FFFFFF;
}
`;

