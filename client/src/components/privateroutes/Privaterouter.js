import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux';
import Feed from '../Blog/Feed';
import Posting from '../Blog/Posting';
import { useEffect } from "react"
import Logout from '../Blog/Logout';
import { useCookies } from 'react-cookie';

export default function PrivateRouter({component:Component,...rest}){
    const token = useSelector((store) => store.reducerLog.token)
    const [cookies, setCookie] = useCookies(['token']);
    function checkToken(){
        if(token!==""){;
            return true
        }
        else if(cookies.token!==undefined){
            console.log(cookies.token)
            return true;
        }
        else return false;
    }
    useEffect(() => {
       if(token){
        console.log(cookies)   
        setCookie('token',token)
        }
    }, [token])
    return(
  
        <Route {...rest}>{ checkToken()?<Component Logout={()=>Logout()} Feed={(setId)=>Feed(setId)} Posting={(update,setUpdate)=>Posting(update,setUpdate)}/>:<Redirect to="/"/>}</Route>
    )
}