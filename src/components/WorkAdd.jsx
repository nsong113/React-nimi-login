import { useState } from "react";
import { addPlanTodos } from "../api/todosContent";
import { useMutation } from "react-query";

const WorkAdd = () => {
  //1. 인풋창에 무엇인가를 입력하고 보여준다 = input을 vlaue와 onChange로 엮어준다.

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [plan, setPlan] = useState({
    //plan은 쿼리 뮤테이션 post 요청을 할 때 객체로 묶어서 보내는 방법 사용하기 위해 만듬.
    name,
    title,
    content,
  });

  //input에 들어온 각각의 값을 set해준다.
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

  //plan 추가 = onClick post 요청
  const addPlanMutation = useMutation(addPlanTodos, {
    onSuccess: () => {
      //성공했을 때 invalidation할 필요 없음: 1.R을 하지 않아서, 2.보여주지 않아서
      setName("");
      setTitle("");
      setContent("");
    },
  });

  const onSubmitHandler = (e) => {
    //form이라서 리로딩 방지를 위해 preventDefault
    e.preventDefault();
    console.log(plan.name.length);

    //유효성검증
    if (
      plan.name.length > 5 ||
      plan.title.length > 50 ||
      plan.content.length > 200
    ) {
      setName("");
      setTitle("");
      setContent("");
      return alert("글자 수 조건을 맞춰서 다시 입력해 주세요");
    } else {
      //쿼리 mutation 사용 -> plan을 전달.
      addPlanMutation.mutate(plan);
    }
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
