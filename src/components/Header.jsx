import { BiSolidHomeHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  //로그아웃기능 (토큰을 초기화 시키기 + 로그인으로 페이지 이동)
  const logoutOnClickHandler = () => {
    localStorage.token = "";
    console.log("로그아웃", localStorage.token);
    navigate("/login");
  };

  return (
    <div className="headerContainer">
      <BiSolidHomeHeart
        style={{ fontSize: 30 }}
        onClick={() => navigate("/")}
      />
      <h3 onClick={logoutOnClickHandler}>로그아웃</h3>
    </div>
  );
};

export default Header;
