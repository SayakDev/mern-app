import React from "react";
import {useEffect} from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { getTokenFromLocalStorage } from "../utils/helper";
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

    return (<><Outlet /></>)
}

export default PrivateRouter;