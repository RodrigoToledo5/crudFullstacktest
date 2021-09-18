import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { sendPost } from "../../actions"
import { useCookies} from 'react-cookie';
import styled from 'styled-components'
const Form=styled.form`
    display:flex;
    flex-direction: column;
    align-items: center;
`
const Input=styled.input`
    display: block;
    flex-direction: column;
    align-items: center;
    width: 50vh;
    height: 5vh;
    border: black;
        border-radius: 1vh;
        box-shadow: 10px 50px 90px 10px rgb(46, 46, 46);
        font-size: 3.5vh;
        margin:2vh;
`
const StyledTextarea = styled.textarea`
    display: block;
    align-items: center;
    resize:none;
    width: 50vh;
    height: 20vh;
    border: black;
    border-radius: 1vh;
        box-shadow: 10px 50px 90px 10px rgb(46, 46, 46);
        font-size: 3.5vh;
        margin:2vh;
`
const Btn = styled.button`
width: 15vh;
height: 10vh;
border: black;
border-radius: 3vh;
box-shadow: 15px 50px 100px 20px rgb(46, 46, 46);
cursor: pointer;
font-size: 3vh;
&:hover{
    width: 15vh;
    height: 10vh;
    background-color:#d4cdd4;
    border-radius: 3vh;
    box-shadow: 15px 50px 100px 20px rgb(46, 46, 46);
    cursor: pointer;
    font-size: 3vh;
}
`
export default function Posting({update,setUpdate,id}) {
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [description, setDescription] = useState("")
    const [cookies, setCookie] = useCookies(['token']); 
    const dispatch = useDispatch();
    function handleChange(event) {
        if (event.target.name === "title") {
            setTitle(event.target.value);
        }
        if (event.target.name === "subtitle") {
            setSubtitle(event.target.value);
        }
        if (event.target.name === "description") {
            setDescription(event.target.value);
        }
    }
    function clearAll(){
        setTitle("");
        setSubtitle("");
        setDescription("");
    }
    function handleSubmit(event){
        event.preventDefault();
        if(id!=='')dispatch(sendPost(title,subtitle,description,cookies.token,id));
        else dispatch(sendPost(title,subtitle,description,cookies.token));
        clearAll();
        setTimeout(setUpdate("Post Updated"),5000)
    }
    return (
        <>
            <Form onSubmit={(event)=>handleSubmit(event)}>
                <Input
                placeholder="Title"
                    value={title}
                    onChange={(event) => handleChange(event)}
                    type="text"
                    name="title">
                </Input>
                <Input
                placeholder="Subtitle"
                    value={subtitle}
                    onChange={(event) => handleChange(event)}
                    type="text"
                    name="subtitle">
                </Input>
                <StyledTextarea
                placeholder="Say hi"
                    value={description}
                    onChange={(event) => handleChange(event)}
                    type="text"
                    name="description">
                </StyledTextarea>
                <Btn type="submit">Subir</Btn>
            </Form>
        </>
    )
}