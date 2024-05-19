"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleInpuChange } from "@/utils/InputChange";
import User from "@/model/user";
const page = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signup = async () => {
    const value = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:3000/api/users", value);
      if (res.status === 200) {
        router.push("/signin");
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center flex-col gap-2">
          <div>Username</div>
          <input
            type="text"
            className="border-2 border-black"
            name="name"
            onChange={(e) => handleInpuChange(e, setValues)}
          />
        </div>
        <div className="flex items-center flex-col gap-2">
          <div>Email</div>
          <input
            type="text"
            className="border-2 border-black"
            name="email"
            onChange={(e) => handleInpuChange(e, setValues)}
          />
        </div>
        <div className="flex items-center flex-col gap-2">
          <div>Password</div>
          <input
            type="text"
            className="border-2 border-black"
            name="password"
            onChange={(e) => handleInpuChange(e, setValues)}
          />
        </div>
        <div className="flex items-center flex-col gap-2">
          <div>Confirm Password</div>
          <input
            type="text"
            className="border-2 border-black"
            name="confirmPassword"
            onChange={(e) => handleInpuChange(e, setValues)}
          />
        </div>
      </div>
      <button
        className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onClick={signup}
        disabled={
          !values.name ||
          !values.email ||
          !values.password ||
          values.password !== values.confirmPassword
        }
      >
        Sign Up
      </button>
    </div>
  );
};

export default page;
