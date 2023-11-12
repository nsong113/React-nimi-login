//axios 들어가는 모든 모듈
import axios from "axios";

//get 조회
const getTodos = async () => {
  const res = await axios.get(import.meta.env.VITE_APP_MOCK_SERVER);
  //   console.log();
  return res.data;
};

//  const getTodos = async () => {
//     try {
//       const { data } = await axios.get(import.meta.env.VITE_APP_MOCK_SERVER);
//       console.log("data", data);
//       setTodos(data);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

const postTodos = async (user) => {
  const res = await axios.post(import.meta.env.VITE_APP_MOCK_SERVER, {
    username: user.username,
    password: user.password,
  });
  return res.data;
};

// const postTodos = async () => {
//   try {
//     const { data } = await axios.post("http://3.38.191.164/", {
//       username: user.username,
//       password: user.password,
//     });
//     console.log(data);
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export { getTodos, postTodos };
