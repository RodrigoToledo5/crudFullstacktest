import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { deletePost, getPost } from "../../actions";
import { useCookies} from 'react-cookie';
import styled from 'styled-components'
const StylePosting=styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin:5vh;
`
const StylePost=styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 3vh;
    padding:10px;
    background-color:#fdf9c4;
    justify-content: center;
    min-width:40vh;
    margin:2vh;
`

const Btn = styled.button`
width: 100%;
height: 10vh;
border: black;
border-radius: 3vh;
cursor: pointer;
font-size:  3.5vh;
&:hover{
    width: 100%;
    height: 10vh;
    background-color:#d4cdd4;
    border-radius: 3vh;
    cursor: pointer;
    font-size: 3.5vh;
}
`

export default function Feed({setId,setUpdate,update}) {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.reducerPost.posts)
    const token = useSelector(state => state.reducerLog.token)
    const [cookies, setCookie] = useCookies(['token']); 
    function handleClick(event){
        setId(event.target.value);
    }
    function handleDelete(event){  
        dispatch(deletePost(event.target.value,cookies.token))
        setTimeout(setUpdate("Deleted"),5000)
    }
    return (
        <StylePosting>
            {posts.map((post, i) => {
                return (
                    <StylePost key={i}>
                        <Btn value={post.id} onClick={(event)=>handleClick(event)}>Edit</Btn>
                        
                        <h2>
                            {`${post.title} N:${post.id}`}
                        </h2>
                        <p>
                            {post.createdAt.substring(0,post.createdAt.length-14)}
                        </p>
                        <h3>
                            {post.subtitle}
                        </h3>
                        <p>
                            {post.description}
                        </p>
                        <Btn value={post.id} onClick={(event)=>handleDelete(event)}>Delete</Btn>
                    </StylePost>
                )
            })}
        </StylePosting>
    )
}
//state.Leaded es un estado flag que use para que el codigo esa mas legible