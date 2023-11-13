import { useQuery } from "react-query";
import { readPlanTodos } from "../api/todosContent";
import { useNavigate, useParams } from "react-router-dom";

const WorkDetail = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery("readPlanTodos", readPlanTodos);

  if (isLoading) {
    return console.log("workDetail로딩중");
  }

  if (isError) {
    return console.log("workDetail 에러남요");
  }

  let work = "";
  data.forEach((element, i) => {
    const findData = data[i];
    console.log("findData", findData);
    if (findData.id === parseInt(param.id)) {
      return (work = findData);
    }
  });
  // console.log("work", work);
  const goPrevHandler = () => {
    navigate(-1);
  };

  const goWoekEditPage = () => {
    navigate(`/works/${work.id}/edit`);
  };

  return (
    <div className="workDetailContainer">
      <div className="workDetailFlex">
        <h3 className="workDetailH3">id: {work.id}</h3>
        <p className="WorkDetailPrev" onClick={goPrevHandler}>
          이전으로
        </p>
      </div>
      <h1 className="workDetailTitle"> {work.title} </h1>
      <p className="workDetailContents">{work.content}</p>
      <button className="workDetailModify" onClick={goWoekEditPage}>
        수정{" "}
      </button>
      <div className="workDetailViewComments">눌러서 댓글보기</div>
    </div>
  );
};

const viewComment = () => {
  return (
    <>
      <div className="workDetailViewComments">눌러서 댓글내리기</div>
      <div className="viewCommentFlex">
        <input
          type="text"
          placeholder="이름 (5글자 이내)"
          className="viewCommentName"
        />
        <input
          type="text"
          placeholder="댓글을 추가하세요. (100자이내)"
          className="viewCommentContent"
        />
      </div>
      <div className="viewCommentNo">
        <p>댓글이 없네요.</p>
      </div>
      <div className="viewCommentIS">
        <p className="viewCommentIsTitle">title</p>
        <p className="viewCommentIsContents">contents</p>
      </div>
    </>
  );
};

export default WorkDetail;
