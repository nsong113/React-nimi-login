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

const patchPlanTodos = async ({ id, stateData }) => {
  // console.log(dataBox.id);
  // console.log(dataBox.stateData);
  console.log(id);
  console.log(stateData);
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_APP_MOCK_JIU_SERVER}/todos/${id}`,
      {
        content: stateData.content,
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("patchPlanTodos error", error);
  }
};

const deleteTodos = async (id) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_APP_MOCK_JIU_SERVER}/todos/${id}`
  );

  return res.data;
};

const addComment = async (id) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_MOCK_JIU_SERVER}/comments/${id}`,
      {
        //
      }
    );
    return res.data;
  } catch (error) {
    console.log("addComment error", error);
  }
};

export { addPlanTodos, readPlanTodos, patchPlanTodos, deleteTodos, addComment };
