import { LoginSignup } from "@/components/LoginSignup/LoginSignup";
import React from "react";
import { useSearchParams } from "react-router-dom";

const Auth = () => {
  const [URLSearchParams] = useSearchParams();
  const url = URLSearchParams.get("createNew");
  console.log(url);
  return (
    <div className=" flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {!url ? "Hold up! Let's login first.." : "Login / Signup"}
      </h1>
      <LoginSignup />
    </div>
  );
};

export default Auth;
