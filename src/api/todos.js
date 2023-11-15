import axios from "axios";

//회원가입: post
const addUser = async ({ id, pw }) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_MOCK_SERVER}/register`,
      {
        id: id,
        password: pw,
      }
    );
    //서버로부터 온 respond에 토큰을 클라리언트에 저장
    //저장 : 총 3가지의 저장 방법이 있다.
    //그중 세션을 고른 이유: 자동 로그아웃 기능 때문, 단기간만 데이터를 보관하면 되서..!
    const token = res.data.token;
    sessionStorage.setItem("token", token);
    alert("회원가입에 성공하였습니다. ");

    return res.status;
  } catch (error) {
    alert(error.response.data.message);
  }
};

//post 로그인
//로그인이 get일것 같은데 post인 이유:
//사용자의 정보를 서버에 보내기 위해서.. 서버에서는 포스트요청으로 온 아이들을 확인하고 응답으로 세션을 생성해서 세션 키로써 쿠키/토큰을 전달
//get으로 보내려면 url에 아이디랑 비번을 넣어야 하는데 보안 문제가 생김
const loginUser = async ({ id, pw }) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_MOCK_SERVER}/login`,
      {
        id: id,
        password: pw,
      }
    );
    const token = res.data.token;
    sessionStorage.setItem("token", token);

    alert("로그인에 성공하였습니다. ");
    return res.status;
  } catch (error) {
    alert(error.response.data.message);
  }
};

//인가 get -> 어떻게 활용하는 건지 잘 모르겠음...
const getData = async () => {
  const accessToken = sessionStorage.token;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_MOCK_SERVER}/user`,
      {
        //토큰을 인가하면서 전달해서 본인인증하기
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    //잘은 모르겠지만,, 나중에 인가 후 -> 사용자에게 무언가를 하려면 여기에 보내야 하나.,....? 아니면 헤더에 보내야하나
    //reponse는 어떻게 활용하는건지...?
    //리턴은 뭘 해야하는 건지....
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export { addUser, loginUser, getData };
