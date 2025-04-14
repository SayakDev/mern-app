import React from "react"
import { useNavigate } from "react-router";

function Home(){

    const navigate = useNavigate()
    return (<>
    <h1>Home Page</h1>
    <br />
    <div>
        <ul>
            <li><div className="btn btn-primary" onClick={()=>navigate("/crud-module")}>Crud Module List</div></li>
        </ul>
    </div>
    </>)
}

export default Home;