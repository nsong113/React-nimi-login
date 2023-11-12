import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ title }) => {
  const navigate = useNavigate();

  //네비게이션 핸들러
  const navigatorHandler = (title) => {
    title === "로그인" ? navigate("/register") : navigate("/login");
  };

  useEffect(() => {
    alert("로그인이 필요합니다. 👻");
  }, []);

  return (
    <div className="loginContainer">
      <h1>{title}하기</h1> <br />
      <div>
        <h3>아이디</h3>
        <input
          type="text"
          className="inputID"
          placeholder="아이디를 입력하세요"
        ></input>
        <br />
        <br />
      </div>
      <div>
        <h3>비밀번호</h3>
        <input
          type="password"
          className="inputID"
          placeholder="비밀번호를 입력하세요"
        ></input>
      </div>
      <br />
      <div className="buttonContainer">
        <button className="button">{title}</button>
        <button className="button" onClick={() => navigatorHandler(title)}>
          {title === "로그인" ? "회원가입" : "로그인하기"}
        </button>
      </div>
    </div>
  );
};

export default Login;
