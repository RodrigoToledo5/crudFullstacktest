import { useState,useEffect } from "react";
import { useCookies} from 'react-cookie';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { desLog } from "../../actions";
import styled from 'styled-components'

const Form=styled.form`
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-left:5vh;
    margin-right:5vh;
    margin-top:3vh;
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
export default function Logout(){
    const [clear, setClear] = useState(false); 
    const [cookies, setCookie] = useCookies(['token']); 
    const dispatch = useDispatch()
    let history=useHistory();
    function handleClick(){
        setCookie('token','')
    }
    useEffect(() => {
        dispatch(desLog())
        if(cookies.token==='')history.push('/')
     }, [])
    return(
        <Form onSubmit={handleClick}>
            <Btn type="submit">
                Logout
            </Btn>
        </Form>
    )
}