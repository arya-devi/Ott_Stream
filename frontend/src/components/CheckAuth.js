import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export const checkAuth = (Component) =>{
    function Wrapper(props){
        var user = localStorage.getItem('token');
        var navigate = useNavigate();
        useEffect(()=>{
            if(!user){
                navigate('/login/You are not Authenticated');
            }
        },[user]);
        return <Component {...props}/>;
    }
    return Wrapper;
}

export default checkAuth;