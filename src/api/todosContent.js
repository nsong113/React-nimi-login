//todos를 추가, 수정, 삭제에 관한 api 모음

import axios from "axios";

const addPlanTodos = async (plan) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_MOCK_JIU_SERVER}/todos`,
      plan
    );
    const data = res.data;
    alert("플랜이 추가되었습니다.");

    return data;
  } catch (error) {
    console.log("플랜 추가 에러", error);
  }
};

const readPlanTodos = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_MOCK_JIU_SERVER}/todos`
    );

    return res.data;
  } catch (error) {
    console.log("readPlanTodos에러", error);
  }
};

export { addPlanTodos, readPlanTodos };
