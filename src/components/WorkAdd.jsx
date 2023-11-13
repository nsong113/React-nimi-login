import { useState } from "react";
import { addPlanTodos } from "../api/todosContent";
import { useMutation, useQueryClient } from "react-query";

const WorkAdd = () => {
  //input을 value와 onchange로 엮어준다.
  //추가 버튼을 누르면 onclick으로 db에 post 요청을 보낸다.
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [plan, setPlan] = useState({
    name,
    title,
    content,
  });
  // console.log("plan", plan);

  const onChangeNameHandler = (e) => {
    setName(e.target.value);
    setPlan({ ...plan, name: e.target.value });
  };
  const onChangeTitleHandler = (e) => {
    setTitle(e.target.value);
    setPlan({ ...plan, title: e.target.value });
  };
  const onChangeContentHandler = (e) => {
    setContent(e.target.value);
    setPlan({ ...plan, content: e.target.value });
  };

  //plan추가 post 요청
  const queryClient = useQueryClient();
  const addPlanMutation = useMutation(addPlanTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries(plan);
      setName("");
      setTitle("");
      setContent("");
    },
  });

  //plan 추가 변경 요청
  const onSubmitHandler = (e) => {
    e.preventDefault();
    addPlanMutation.mutate(plan);
  };

  return (
    <form className="workAddContainer" onSubmit={onSubmitHandler}>
      <div className="workAddBox">
        <h3 className="workAddH3">작성자</h3>
        <input
          value={name}
          onChange={onChangeNameHandler}
          className="workAddText"
          type="text"
          placeholder="작성자의 이름을 입력해주세요. (5자 이내)"
        />
      </div>

      <div className="workAddBox">
        <h3 className="workAddH3">제목</h3>
        <input
          value={title}
          onChange={onChangeTitleHandler}
          className="workAddText2"
          type="text"
          placeholder="제목을 입력해주세요. (50자 이내)"
        />
      </div>

      <div className="workAddBox-textArea">
        <h3 className="workAddH3">내용</h3>
        <textarea
          value={content}
          onChange={onChangeContentHandler}
          className="workAddTextarea"
          placeholder="내용을 입력해주세요. (200자 이내)"
        ></textarea>
      </div>

      <button className="addContent"> 추가하기 </button>
    </form>
  );
};

export default WorkAdd;
