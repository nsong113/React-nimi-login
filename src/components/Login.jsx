import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { addUser, loginUser, getData } from "../api/todos";

const Login = ({ title }) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const navigate = useNavigate();
  const [todos, setTodos] = useState(null);

  //네비게이션 핸들러
  const navigatorHandler = (title) => {
    title === "로그인" ? navigate("/register") : navigate("/login");
  };

  //마운트 alert,
  // useEffect(() => {
  //   alert("로그인이 필요합니다. 👻");
  // }, []);

  //onChangeHandler & 유효성검사
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

  //리엑트쿼리 관련 코드
  // const queryClient = useQueryClient();
  // const mutation = useMutation(postTodos, {
  //   onSuccess: () => {
  //     // queryClient.invalidateQuries('')
  //     console.log("포스트성공하였습니다.");
  //   },
  // });

  // const { getIsLoading, getIsError, getData } = useQuery("getTodos", getTodos);
  // // const { postIsLoading, postIsError, postData } = useQuery(
  // //   "postTodos",
  // //   postTodos
  // // );

  // const getTodoQuery = () => {
  //   if (getIsLoading === true) {
  //     return console.log("get 로딩중입니다.");
  //   }

  //   if (getIsError) {
  //     return console.log("get 오류 발생");
  //   }

  // console.log("쿼리결과", getData);
  //}

  // const postTodosQuery = () => {
  //   if (postIsLoading === true) {
  //     return console.log("post 로딩중입니다.");
  //   }

  //   if (postIsError) {
  //     return console.log("post 오류 발생");
  //   }

  //   console.log("쿼리결과", postData);
  // };

  //post 요청 - 회원가입
  const queryClient = useQueryClient();
  const SignupMutation = useMutation(addUser, {
    onSuccess: (res) => {
      //회원가입이 성공 시 실행할 아이
      queryClient.invalidateQueries(id, pw);
      setId("");
      setPw("");
      if (res === 201) {
        navigate("/login");
      }
    },
  });

  //post 요청 - 로그인
  const LoginMutation = useMutation(loginUser, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(id, pw);
      setId("");
      setPw("");
      if (res === 201) {
        getData();
        navigate("/");
      }
    },
  });

  const axiosOnclickHandler = (title) => {
    title === "로그인"
      ? LoginMutation.mutate({ id, pw })
      : SignupMutation.mutate({ id, pw });
  };

  // const onSubmitHandler = (e, titale) => {
  //   e.preventDefault();
  //   console.log(e);
  //   title === "로그인" ? getTodos() : postTodos();
  // };

  return (
    <div className="loginContainer">
      <div
      // onSubmit={() => onSubmitHandler(e, title)}
      >
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
