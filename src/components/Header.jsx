import React from "react";
import { BiSolidHomeHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="headerContainer">
      <BiSolidHomeHeart
        style={{ fontSize: 30 }}
        onClick={() => navigate("/")}
      />
      <h3>로그아웃</h3>
    </div>
  );
};

export default Header;
