//todos를 추가, 수정, 삭제에 관한 api 모음

import axios from "axios";

//플랜 추가 :post
const addPlanTodos = async (plan) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_GLICH_DEPLOY}/todos`,
      plan
    );
    const data = res.data;
    alert("플랜이 추가되었습니다.");

    return data;
  } catch (error) {
    console.log("플랜 추가 에러", error);
  }
};

//플랜 조회 : get
const readPlanTodos = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_GLICH_DEPLOY}/todos`
    );

    return res.data;
  } catch (error) {
    console.log("readPlanTodos에러", error);
  }
};

//플랜 수정 : patch
const patchPlanTodos = async ({ id, stateData }) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_APP_GLICH_DEPLOY}/todos/${id}`,
      {
        content: stateData.content,
      }
    );
    return res.data;
  } catch (error) {
    console.log("patchPlanTodos error", error);
  }
};

////플랜 삭제 : delete
const deleteTodos = async (id) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_APP_GLICH_DEPLOY}/todos/${id}`
  );
  // return res.data;
};

//코멘트 조회 : get
const readCommend = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_GLICH_DEPLOY}/comments`
    );
    return data;
  } catch (error) {
    console.log("readCommend error", error);
  }
};

//코멘트 추가 : post
const addComment = async ({ name, content }) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_GLICH_DEPLOY}/comments`,
      {
        name,
        content,
      }
    );
    return res.data;
  } catch (error) {
    console.log("addComment error", error);
  }
};

//코멘트 수정 : patch -> 아직 못함...
const editComment = async (id) => {
  try {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_APP_GLICH_DEPLOY}/comments/${id}`,
      {
        //수정할 내용
      }
    );
    return data;
  } catch (error) {
    console.log("editComment error", error);
  }
};

//코멘트 삭제 : delete
const deleteComment = async (id) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_APP_GLICH_DEPLOY}/comments/${id}`
    );
    // return data;
  } catch (error) {
    console.log("deleteComment error", error);
  }
};

export {
  addPlanTodos,
  readPlanTodos,
  patchPlanTodos,
  deleteTodos,
  addComment,
  readCommend,
  editComment,
  deleteComment,
};
