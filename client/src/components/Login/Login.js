//no hace falta hacer el import de react porque babel ya reconoce que se esta usando funciones de react
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from '../../actions';
import { useHistory } from 'react-router';
import { useCookies, Cookies } from 'react-cookie';
import img from '../images/background2.jpg'
import styled from 'styled-components'
const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url(${img});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    overflow: hidden;
`

const Error=styled.p`
 color:red;
 fontSize:10vh;
 margin:5vh;
`
const Btn = styled.button`
        width: 15vh;
        height: 10vh;
        border: black;
        margin:10px;
        border-radius: 3vh;
        box-shadow: 50px 50px 90px 20px rgb(46, 46, 46);
        cursor: pointer;
        font-size: 1.5vh;
        &:hover{
            width: 15vh;
            height: 10vh;
            background-color:#d4cdd4;
            border-radius: 3vh;
            box-shadow: 50px 50px 90px 20px rgb(46, 46, 46);
            cursor: pointer;
            font-size: 1.5vh;
        }
    `
const Input = styled.input`
        width: 40vh;
        padding:10px;
        height: 10vh;
        border: black;
        border-radius: 3vh;
        box-shadow: 50px 50px 90px 20px rgb(46, 46, 46);
        font-size: 3.5vh;
        margin:2vh;
    `

export default function Login() {
    const [error, setError] = useState(null);

    const [email, setEmail] = useState("");
    const [cookies, setCookie] = useCookies(['token']);
    const [password, setPassword] = useState("");
    const token = useSelector(state => state.reducerLog.token)
    const dispatch = useDispatch()
    var history = useHistory();
    function onHandleChange(events) {
        if (events.target.name === "email") {
            setEmail(events.target.value);
        }
        if (events.target.name === "password") {
            setPassword(events.target.value);
        }
    }
    function handleSumit(event) {
        event.preventDefault();

        if (email) {
            dispatch(login(email, password));
            setError(null);
        }
        else {
            alert("Empty fields")
            setError("Invalid email")
        }
    }
    function onHandleBlur(event) {
        if (!/\S+@\S+\.\S+/.test(event.target.value)) {
            setError("Invalid email")
        }
        else{
            setError(null);
        }
    }

    useEffect(() => {
        if (token !== "") {
            console.log(cookies.token)
            setCookie('token', token);
            history.push("/feed")
        }
    }, [token])
    return (

        <Div >
            <form onSubmit={(event) => handleSumit(event)}>
            <Error>{error&&error}</Error>
                    <Input
                        className={error && "error"}
                        placeholder= "Email"
                        autoComplete="email"
                        type="email"
                        name="email"
                        value={email}
                        onBlur={(event) => onHandleBlur(event)}
                        onChange={(events) => onHandleChange(events)}
                    ></Input>
                    
                    
            
                <Input
                    placeholder="Password"
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(events) => onHandleChange(events)}
                ></Input>
                <Btn type="submit" >
                    <h1>Login</h1>
                </Btn>
            </form>
        </Div>

    )
}