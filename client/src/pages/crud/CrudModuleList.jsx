import React from "react"
import { useNavigate } from "react-router";
function CrudModuleList(){

    const navigate = useNavigate()

    
    return (<><h1>crudModule List</h1>
    <br />
    <div className="btn btn-primary" onClick={()=>navigate("/crud-module-add")}>Crud Module Add</div></>)
}

export default CrudModuleList;