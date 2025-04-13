import React from "react";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {submitLogin} from "../services/AuthServices";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router";
import {setTokenInLocalStorage} from "../utils/helper"
const schema = z.object({
    email: z.string().email().min(2),
    password: z.string().min(6),
  });


function Login(){

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm({
        resolver: zodResolver(schema)
      });
    const navigate = useNavigate();
    const processForm = async (data) => {
      
    try{
        const res = await submitLogin(data);
        if(res?.status===0){
          toast.error('Invalid User Credentials');
        }else{
          toast.success('Successfully logged in!');
          setTokenInLocalStorage(res?.token);
          reset();
          navigate('/')
        }
    }catch(err){
        console.log(err)
        toast.error('Something went wrong!!');
    }

    
    };


    return (<>
    <Toaster />
    <Container style={{top:100, left: 500, position: "absolute", border: "1px solid grey", width: 500}}>
    <div style={{  margin: 100 }}>
    <h1>Login</h1>
    <form
      onSubmit={handleSubmit(processForm)}
      style={{ display: "flex", flexDirection: "column", width: 300, }}
    >

      <input
        {...register("email", { required: true })}
        name="email"
        type="email"
        className="form-control mt-4" placeholder="Enter Email"
      />
      {errors.email?.message && <span style={{color:"red"}}>{errors.email?.message}</span>}

      <input
        {...register("password", { required: true, minLength: 6 })}
        name="password"
        type="password"
        className="form-control mt-4" placeholder="Enter Password"
      />
      {errors.password?.message && <span style={{color:"red"}}>{errors.password?.message}</span>}

      <button className="mt-4">Submit</button>
    </form>
    </div>
      </Container>
      </>)
}

export default Login;