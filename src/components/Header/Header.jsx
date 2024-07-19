import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { HeaderDropdownMenu } from "./DropdownMenu";

const Header = () => {
  const navigate = useNavigate();
  let isLogin = true;
  return (
    <nav className="my-7 justify-between flex">
      <Link>
        <img className="h-16" src="/public/logo.png" alt="" />
      </Link>
      <div>
        {isLogin ? (
          <HeaderDropdownMenu />
        ) : (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
