"use client";

import { handleInpuChange } from "@/utils/InputChange";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const page = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  console.log(values);
  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <div>
      <div className="flex items-center flex-col gap-2">
        <div>email</div>
        <input
          className="border-2 border-black"
          type="email"
          name="email"
          onChange={(e) => handleInpuChange(e, setValues)}
        />
      </div>
      <div className="flex items-center flex-col gap-2">
        <div>password</div>
        <input
          className="border-2 border-black"
          type="text"
          name="password"
          onChange={(e) => handleInpuChange(e, setValues)}
        />
        <button
          onClick={() =>
            signIn("credentials", {
              email: values.email,
              password: values.password,
              redirect: true,
              callbackUrl: "/",
            })
          }
          className="disabled:bg-red-500 bg-blue-500"
          disabled={!values.email || !values.password}
        >
          Sign In
        </button>

        <button onClick={handleGoogleSignIn}>
          <div>Google</div>
        </button>
      </div>
    </div>
  );
};

export default page;
