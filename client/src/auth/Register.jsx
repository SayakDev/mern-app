import React from "react";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {submitRegistration} from "../services/AuthServices";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router";
import {setTokenInLocalStorage} from "../utils/helper"
const schema = z.object({
    name: z.string().min(3),
    email: z.string().email().min(2),
    password: z.string().min(6),
    phone: z.string().regex(/^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/)
  });


function Register(){

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
        const res = await submitRegistration(data);
        if(res?.status===409){
          toast.error(res?.message);
        }else if(res?.status===0){
          toast.error('Invalid Data format');
        }else{
          toast.success('Registration completed successfully');
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
    <Container>
    <Row>
    <Col></Col>
    <Col xs={6}>
    <h1>Register</h1>
    <form
      onSubmit={handleSubmit(processForm)}
      style={{ display: "flex", flexDirection: "column", width: 300 }}
    >

      <input
        {...register("name")}
        name="name"
        type="text"
        className="form-control mt-4" placeholder="Enter Your Name"
      />
      {errors.name?.message && <span style={{color:"red"}}>{errors.name?.message}</span>}

      <input
        {...register("email", { required: true })}
        name="email"
        type="email"
        className="form-control mt-4" placeholder="Enter Email"
      />
      {errors.email?.message && <span style={{color:"red"}}>{errors.email?.message}</span>}

      <input
        {...register("phone", { required: true, minLength: 10 })}
        name="phone"
        type="text"
        className="form-control mt-4" placeholder="Enter Phone Number"
      />
      {errors.phone?.message && <span style={{color:"red"}}>{errors.phone?.message}</span>}

      <input
        {...register("password", { required: true, minLength: 6 })}
        name="password"
        type="password"
        className="form-control mt-4" placeholder="Enter Password"
      />
      {errors.password?.message && <span style={{color:"red"}}>{errors.password?.message}</span>}

      <button className="mt-4">Submit</button>
    </form>
      </Col>
      <Col></Col>
      </Row>
      </Container>
      </>)
}

export default Register;