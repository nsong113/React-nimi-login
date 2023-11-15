import { useMutation, useQuery, QueryClient } from "react-query";
import { readPlanTodos, patchPlanTodos } from "../api/todosContent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { addComment } from "../api/todosContent";

const WorkDetail = ({ button }) => {
  const param = useParams();
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const [stateData, setStateData] = useState({
    name: "",
    title: "",
    content: "",
    id: 0,
  });
  const modalRef = useRef();

  const workEditMutation = useMutation(patchPlanTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("readPlanTodos");
    },
  });

  const { isLoading, isError, data } = useQuery(
    "readPlanTodos",
    readPlanTodos,
    {
      onSuccess: (data) => {
        const foundData = data.find((item) => item.id === parseInt(param.id));

        if (foundData) {
          setStateData(foundData);
        } else {
          console.log("foundData 찾을 수 없습니다.");
        }

        // console.log("stateData", stateData);
      },
    }
  );

  // console.log("work", work);
  const goPrevHandler = () => {
    navigate(-1);
  };

  const goWorkEditPage = () => {
    navigate(`/works/${stateData.id}/edit`);
  };

  const onChangeWorkEditHandler = (e) => {
    setStateData({ ...stateData, content: e.target.value });
    // console.log("stateData2", stateData);
  };
  ////////  ////////  ////////  ////////  ////////  ////////  ////////

  const onClickWorkEditHandler = (stateData, id) => {
    workEditMutation.mutate({ stateData, id });
    // workEditMutation.isLoading ? "workEditMutation 로딩중" : "";
  };
  ////////  ////////  ////////  ////////  ////////  ////////  ////////

  const viewCommentHandler = () => {
    modalRef.current.classList.add("show");
  };

  return (
    <div className="workDetailContainer">
      <div className="workDetailFlex">
        <h3 className="workDetailH3">id: {stateData.id}</h3>

        <p className="WorkDetailPrev" onClick={goPrevHandler}>
          이전으로
        </p>
      </div>
      <h1 className="workDetailTitle"> {stateData.title} </h1>

      {button === "수정" ? (
        <p className="workDetailContents">{stateData.content}</p>
      ) : (
        <textarea
          value={stateData.content}
          rows={10}
          cols={100}
          className="editTextArea"
          onChange={onChangeWorkEditHandler}
        />
      )}

      <button
        className="workDetailModify"
        onClick={() => {
          button === "수정"
            ? goWorkEditPage()
            : onClickWorkEditHandler(stateData, stateData.id);
        }}
      >
        {button}
      </button>

      {button === "수정" ? (
        <div className="workDetailViewComments" onClick={viewCommentHandler}>
          눌러서 댓글보기
        </div>
      ) : null}
      <ViewComment modalRef={modalRef} />
    </div>
  );
};

//슬라이드 모달 창
const ViewComment = ({ modalRef }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState({
    name: "",
    content: "",
  });

  const closeModalHandler = () => {
    modalRef.current.classList.remove("show");
    modalRef.current.classList.add("hide");
  };

  const onChangeNameHandler = (e) => {
    setName(e.target.value);
  };

  const onChangeContentHandler = (e) => {
    setContent(e.target.value);
  };

  const onCLickAddCommentHandler = (name, content) => {
    setComments({
      name,
      content,
    });
  };

  useEffect(() => {
    onCLickAddCommentHandler();
  }, [content]);

  return (
    <div className="commentModal " ref={modalRef}>
      <div className="viewCommentFlex">
        <input
          type="text"
          placeholder="이름 (5글자 이내)"
          className="viewCommentName"
          value={name}
          onChange={onChangeNameHandler}
        />{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className="commentButton"
          onClick={() => onCLickAddCommentHandler(name, content)}
        >
          댓글추가
        </button>
        <br /> <br />
        <textarea
          type="text"
          placeholder="댓글을 추가하세요. (100자이내)"
          className="viewCommentContent"
          value={content}
          onChange={onChangeContentHandler}
        />
      </div>

      {comments.content ? (
        // console.log(comments)
        comments.map((item) => {
          // return (
          //   <>
          //     <div className="flexComments">
          //       <div className="viewCommentIS">
          //         <p className="viewCommentIsTitle">{item.name}</p>
          //         <p className="vㅋiewCommentIsContents">{item.content}</p>
          //       </div>
          //       <div className="buttons">
          //         <button className="button">수정</button>
          //         <button className="button">삭제</button>
          //       </div>
          //     </div>
          //   </>
          // );
        })
      ) : (
        <div className="viewCommentNo">
          <p>댓글이 없네요.</p>
        </div>
      )}

      <div className="workDetailViewComments" onClick={closeModalHandler}>
        눌러서 댓글내리기
      </div>
    </div>
  );
};

export default WorkDetail;
