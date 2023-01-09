import styled from "styled-components"
import { useState, useEffect, useContext } from "react"
import { getTrendings } from "../service/api";
import { Link } from "react-router-dom";
import { contexto } from "../context/userContext";

export default function Trending(){
    const [trends, setTrends] = useState([]);
    const { attpage, setAttpage } = useContext(contexto);
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
           {trends.map((trend, index) => <Link key={index} onClick={()=> setAttpage(attpage+1)} to={`/hashtag/${trend.hashtag}`}><li># {trend.hashtag}</li></Link>)}
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
    width: 300px;
    height: 400px;
    background: #171717;
    border-radius: 16px;
    position: fixed;
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
        margin: 5px;
        margin-left: 15px;
        color: #FFFFFF;
    }
    @media (max-width: 1205px)
    {
        display: none;
	}
    @media (min-width: 1150px)
    {
        margin-left: 51%;
	}
    @media (min-width: 1360px)
    {
        margin-left: 46%;
	}
    @media (min-width: 1550px)
    {
        margin-left: 40%;
	}
`;

