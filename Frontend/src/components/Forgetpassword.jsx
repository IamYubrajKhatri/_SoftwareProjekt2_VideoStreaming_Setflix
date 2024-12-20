import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
    //to navigate to other page 
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 {/* left side the name from backend ,right side from frontend */}
  const onSubmit = async (data) => {
    try {
        //we send server or backend a post req with the given user credientals
        //we put user given email and code with data.email data.code
        //left side is like postman variable we created in backend(email,code) 
      const res = await axios.post("/api/auth/forgot-password", {
        
        email: data.email,
      });
    //it checks if server/backend response and contains data
    //it holds a payload sent by backend after our post req.
    //if res.data is truthly then it is finished or eamil is verified

      if (res.data) {
        toast.success("Code sent successfully!");
        // Optionally redirect to the login page
        navigate("/reset-password"); 
      }
    } catch (err) {
      if (err.response) {
        toast.error("Email failed: " + err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
<>
    

   

    <div className="flex h-screen items-center justify-center bg-[url('background.jpg')] bg-cover bg-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-100 p-8 rounded-xl border shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Enter Your Email Adresse</h2>

        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        
        <button
          type="submit"
          className="btn btn-error  text-white hover:text-black"
        >
          Send Verification Code
        </button>
      </form>
    </div>

    
    </>
  );
}

export default ForgetPassword;
