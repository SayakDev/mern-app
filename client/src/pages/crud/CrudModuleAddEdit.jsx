import React from "react"
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {submitCrud} from "../../services/CrudServices";
const MAX_FILE_SIZE = 5*1024*1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
  document: z
    .any()
    .refine((file)=>  file?.length===1, 'File is required')
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
});

function CrudModuleAddEdit(){
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm({
        resolver: zodResolver(schema)
      });
    
      const processForm = async (data) => {
        console.log(data)
        const formData = new FormData();
        formData.append('document', data?.document[0]);
        formData.append('email', data?.email);
        formData.append('password', data?.password);
        await submitCrud(formData);

    
        //reset();
      };
    
      return (
        <>
        
        <form
          onSubmit={handleSubmit(processForm)}
          style={{ display: "flex", flexDirection: "column", width: 300, marginLeft: "500px" }}
        >
            <h1> Add Form</h1>
          <input
            {...register("email", { required: true })}
            name="email"
            className="form-control mt-5"
            type="email"
          />
          {errors.email?.message && <span>{errors.email?.message}</span>}
    
          <input
            {...register("password", { required: true, minLength: 6 })}
            name="password"
            type="password"
            className="form-control mt-5"
          />
          {errors.password?.message && <span>{errors.password?.message}</span>}

          <input
            {...register("document")}
            name="document"
            type="file"
            className="form-control mt-5"
          />
          {errors?.document?.message && <span style={{color:'red'}}>{errors?.document?.message}</span>}
    
          <button className="btn btn-primary mt-5">Submit</button>
        </form>
        </>)
}

export default CrudModuleAddEdit;