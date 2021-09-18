import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { getPost } from "../../actions";
import { useCookies, Cookies } from 'react-cookie';
import styled from 'styled-components'
import img from '../images/background2.jpg'
const StyleLayout=styled.div`
    display: flex;
    flex-direction: column;
    background-image: url(${img});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    overflow: hidden;
`
const StylePosting=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`
const StyleModal=styled.div`
    position: fixed;
    padding:10px;
    border-radius: 1vh;
    width:100vh;
    hight:100vh;
    background-color:#808080;
    left:25%;
    top:15%;
`
const Btn = styled.button`
width: 15vh;
height: 10vh;
border: black;
border-radius: 3vh;
cursor: pointer;
font-size:  3.5vh;
&:hover{
    width: 15vh;
    height: 10vh;
    background-color:#d4cdd4;
    border-radius: 3vh;
    cursor: pointer;
    font-size: 3.5vh;
}
`
export default function Layout({ Feed: Feed, Posting: Posting, Logout }) {
    const [update, setUpdate] = useState("");
    const [id, setId] = useState('')
    const [cookies, setCookie] = useCookies(['token']);
    const dispatch = useDispatch()
    
    useEffect(() => {
         if(update==="Deleted")dispatch(getPost(cookies.token))
         if(update==="Post Updated")dispatch(getPost(cookies.token))
         dispatch(getPost(cookies.token))
         setUpdate("")
    },[update])
    return (
        <StyleLayout>
            <div>
                <Logout />
            </div>

            <StylePosting>
                <Posting update={update} setUpdate={setUpdate} ></Posting>
            </StylePosting>
            {id&&
            <>
            <StyleModal>
            <Btn onClick={()=>setId()}>X</Btn>
                <Posting update={update} setUpdate={setUpdate} id={id}></Posting>
            </StyleModal>
           
            </>
            }
            <div>
                <Feed setId={setId} update={update} setUpdate={setUpdate}></Feed>
            </div>
        </StyleLayout>
    )
}