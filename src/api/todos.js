//axios 들어가는 모든 모듈
import axios from "axios";
import { useState } from "react";

// const [sta÷tus, setStatus] = useState("아직인증안됨");

//회원가입
const addUser = async ({ id, pw }) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_MOCK_SERVER}/register`,
      {
        id: id,
        password: pw,
      }
    );
    const token = res.data.token;
    localStorage.setItem("token", token);
    alert("회원가입에 성공하였습니다. ");
    return res.status;
  } catch (error) {
    alert(error.response.data.message);
  }
};

//post 로그인
const loginUser = async ({ id, pw }) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_MOCK_SERVER}/login`,
      {
        id: id,
        password: pw,
      }
    );
    // console.log(res);
    const token = res.data.token;

    localStorage.setItem("token", token);
    // document.cookies("token", token);

    alert("로그인에 성공하였습니다. ");
    return res.status;
  } catch (error) {
    alert(error.response.data.message);
  }
};

//인가 get
const getData = async () => {
  const accessToken = localStorage.token;
  console.log("accesstoken", accessToken);
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_MOCK_SERVER}/user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("response", response);
    //뭘 어디에 저장해야 하지?
    // localStorage.setItem(response.data.data);
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export { addUser, loginUser, getData };
