import { string,object } from "zod";


export const signUpSchema = object({
  email: string({ required_error: "Email is required" }).email("Invalid email"),
  password: string({ required_error: "password is required" })
    .min(8, "Password must be atleast 8 letters")
    .max(32, "Password must be atmost 32 letters"),
});


export const signInSchema = object({
  email: string({ required_error: "Email is required" }).email("Invalid email"),
  password: string({ required_error: "password is required" })
    
});