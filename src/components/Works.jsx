import { FcDeleteDatabase } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { addPlanTodos, readPlanTodos } from "../api/todosContent";
import { useQuery } from "react-query";

const Works = () => {
  const navigate = useNavigate();

  //data에 쿼리 키가 담겨.. ㅠ
  const { isLoading, isError, data } = useQuery("readPlan", readPlanTodos);

  //만약에 쿼리를 여러개 사용해서 isLoading같은게 많아짐-> 그럼 고유한 이름 변경 가능?
  //객체를 풀지 않고 특정 변수로 묶고 그 다음데 todos.isError로 사용.
  //아니면 data: datA 이렇게 가능

  if (isLoading) {
    return console.log("works로딩중입니다.");
  }

  if (isError) {
    return console.log("works에러입니다.");
  }

  return (
    <div className="worksContainer">
      <h1 className="worksH1">내 할일</h1>
      {data.map((item) => {
        return (
          <div
            className="worksFlex"
            onClick={() => {
              navigate(`/works/${item.id}`);
            }}
            key={item.id}
          >
            <div className="worksContent">
              <h4 className="worksTitle">{item.title}</h4>
              <p className="worksName">작성자 : {item.name}</p>
            </div>
            <FcDeleteDatabase style={{ fontSize: 40 }} />
          </div>
        );
      })}
    </div>
  );
};

export default Works;
