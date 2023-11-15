import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { addUser, loginUser, getData } from "../api/todos";

//로그인 로그아웃 같은 컴포넌트 사용 -> 각각 페이지에서 보낼 때 title에 로그인인지 로그아웃인지 담아서 보냄
const Login = ({ title }) => {
  const navigate = useNavigate();

  //아이디 패스워드 input value를 위한 state
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  //로그인 유효성검사를 위한 세팅
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  //true되면 로그인 disabled 풀림
  const [notAllow, setNotAllow] = useState(true);

  //네비게이션 핸들러 => 타이틀에 따라 다르게 네비게이션 작동
  const navigatorHandler = (title) => {
    title === "로그인" ? navigate("/register") : navigate("/login");
  };

  //로그인 input onChangeHandler & 유효성검사
  const onChangeIdHandler = (e) => {
    setId(e.target.value);
    /@/.test(id) ? setIdValid(true) : setIdValid(false);
  };

  const onChangePwHandler = (e) => {
    setPw(e.target.value);
    /[\d]/.test(parseInt(pw)) ? setPwValid(true) : setPwValid(false);
  };

  useEffect(() => {
    idValid && pwValid && setNotAllow(false);
  }, [idValid, pwValid]);

  //쿼리 post 요청 뮤테이션 - 회원가입
  const SignupMutation = useMutation(addUser, {
    onSuccess: (res) => {
      setId("");
      setPw("");
      //respond가 201로 오면 성공 -> 로그인페이지로 이동
      //cf) return res.status를 리턴받음
      if (res === 201) {
        navigate("/login");
      }
    },
  });

  //쿼리 post 요청 뮤테이션 - 로그인
  const LoginMutation = useMutation(loginUser, {
    onSuccess: (res) => {
      setId("");
      setPw("");
      //res.statu가 201일 경우 홈으로 이동 + getData(인가)
      if (res === 201) {
        getData();
        navigate("/");
      }
    },
  });

  //쿼리 뮤테이션 사용
  const axiosOnclickHandler = (title) => {
    title === "로그인"
      ? LoginMutation.mutate({ id, pw })
      : SignupMutation.mutate({ id, pw });
  };

  return (
    <div className="loginContainer">
      <div>
        <h1>{title}하기</h1> <br />
        <div>
          <h3 className="h3login">아이디 - username</h3>
          <input
            type="text"
            className="inputID"
            placeholder="abce@gmail.com"
            value={id}
            onChange={onChangeIdHandler}
          ></input>
          <div className="ErrorMsg">
            {!idValid && <div>이메일 형식의 아이디를 입력해주세요</div>}
          </div>

          <br />
          <br />
        </div>
        <div>
          <h3 className="h3login"> 비밀번호 - password</h3>
          <input
            type="password"
            className="inputID"
            placeholder="0123456789"
            value={pw}
            onChange={onChangePwHandler}
          ></input>
          <div className="ErrorMsg">
            {!pwValid && <div>숫자로 이루어진 비밀번호를 작성해주세요</div>}
          </div>
        </div>
        <br />
        <div className="buttonContainer">
          <button
            type="submit"
            className="button"
            disabled={notAllow}
            onClick={() => axiosOnclickHandler(title)}
          >
            {title}
          </button>
          <button className="button" onClick={() => navigatorHandler(title)}>
            {title === "로그인" ? "회원가입" : "로그인하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
