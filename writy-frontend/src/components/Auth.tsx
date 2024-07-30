"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import { SignupInputType, SigninInputType } from "@anmoldotx/writy-common"
import LabelledInput from "@/components/LabelledInput"
import { toast } from "sonner"
import axios, { AxiosResponse } from "axios"
import { BACKEND_URL } from "@/config/config"
import { signupResponseInterface } from "@/interfaces/signupResponseInterface"

export default function Auth({type}: {type : "signup" | "signin"}) {

  const [signupInput, setSignupInput] = useState<SignupInputType>({
    username : "",
    email : "",
    password : ""
  });

  const [signinInput, setSigninInput] = useState<SigninInputType>({
    email : "",
    password : ""
  });

  const signUpChangeHandler = (e : ChangeEvent<HTMLInputElement>)=>{
    setSignupInput({
      ...signupInput,
      [e.target.name] : e.target.value
    })
  }

  const signInChangeHandler = (e : ChangeEvent<HTMLInputElement>)=>{
    setSigninInput({
      ...signinInput,
      [e.target.name] : e.target.value
    })
  }

  const signUpSubmitHandler = async (e : FormEvent) => {
    e.preventDefault()
    try {
      const {data} : AxiosResponse<signupResponseInterface> = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,signupInput);
      if(data.status == 200) {
        toast.success(data.message)
      }

    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("unknown error while signUp submit")
      }
    }
  }

  const signInSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="flex items-center justify-center h-screen w-full bg-background">
      <div className="w-full max-w-md p-6 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{type === "signup" ? "Sign Up" : "Sign In"}</h1>
          <p className="text-muted-foreground">{type === "signup" ? "Create your account" : "Sign In to your account"}</p>
        </div>
        <form onSubmit={type === "signup" ? signUpSubmitHandler : signInSubmitHandler} className="space-y-4">
          {
            type === "signup" && (
              <LabelledInput
                label="username"
                placeholder="Enter your username"
                type="text"
                changeHandler={signUpChangeHandler}
              />
            )
          }
          <LabelledInput
            label="email"
            placeholder="Enter your email"
            type="email"
            changeHandler={type === "signup" ? signUpChangeHandler : signInChangeHandler}
          />
          <LabelledInput
            label="password"
            placeholder="Enter your password"
            type="password"
            changeHandler={type === "signup" ? signUpChangeHandler : signInChangeHandler}
          />
          <Button type="submit" className="w-full">
            {type === "signup" ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <div className="text-center text-muted-foreground">
          {
            type === "signup" ? "Already have an account ?" : "Don't have an account ?"
          }
          {" "}
          <Link href={type === "signup" ? "/publicRoute/signin" : "/publicRoute/signup"} className="font-medium hover:underline">
          {type === "signup" ? "Sign In" : "Sign Up"}
          </Link>
        </div>
      </div>
    </div>
  )
};