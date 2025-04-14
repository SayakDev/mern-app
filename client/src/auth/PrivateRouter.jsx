import React from "react";
import {useEffect} from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from "../utils/helper";
import {checkAuthentication} from "../services/AuthServices"

function PrivateRouter(){
    const navigate = useNavigate();
    useEffect(()=>{
        checkAuth()
    }, [])

    const checkAuth = async () => {
        const token = getTokenFromLocalStorage();

        if (!token) {
            return navigate("/login");
        }

        try {
            const res = await checkAuthentication(token);
            if (res.status === 0) {
            navigate("/login");
            }
        } catch (err) {
            navigate("/login");
        }
    };

    const logOutFunction = async () => {
        await removeTokenFromLocalStorage();
        navigate('/login')
    }

    return (<>
    
    <div ><button style={{ marginLeft:"1442px"}} onClick={logOutFunction}>Logout</button></div>
    <Outlet />
    </>)
}

export default PrivateRouter;