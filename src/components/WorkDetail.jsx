import { useMutation, useQuery, useQueryClient } from "react-query";
import { readPlanTodos, patchPlanTodos } from "../api/todosContent";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { readCommend, addComment, deleteComment } from "../api/todosContent";
import useInputValue from "../hooks/useInputValue";
import WorkDetailComment

//디테일페이지랑, 디테일페이지 수정이랑 같은 컴포넌트 공유 -> button으로 조건부 랜더링
const WorkDetail = ({ button }) => {
  const param = useParams();
  const navigate = useNavigate();
  //'눌러서 댓글달기' 부분 dom조작
  const modalRef = useRef();

  //get해온 데이터를 내부에서 사용하기 위해 저장!
  const [stateData, setStateData] = useState({
    name: "",
    title: "",
    content: "",
    id: 0,
  });

  //조회 페이지 : 유즈쿼리 : get
  const { data } = useQuery("readPlanTodos", readPlanTodos, {
    //성공했을 경우 가져온 데이터 중에서 param과 동일한 것 추출
    onSuccess: (data) => {
      const foundData = data.find((item) => item.id === parseInt(param.id));

      //동일한 데이터를 내부에서 사용하기 위해 (렌더링)하기 위해 저장
      if (foundData) {
        setStateData(foundData);
      } else {
        console.log("foundData 찾을 수 없습니다.");
      }
    },
  });

  //이전으로 버튼 클릭
  const goPrevHandler = () => {
    navigate(-1);
  };

  //수정페이지로 이동
  const goWorkEditPage = () => {
    navigate(`/works/${stateData.id}/edit`);
  };

  //수정페이지에서 바뀐 데이터를 내부 state에 저장
  const onChangeWorkEditHandler = (e) => {
    setStateData({ ...stateData, content: e.target.value });
  };

  //수정 페이지 : 쿼리 뮤테이션 : 패치
  const workEditMutation = useMutation(patchPlanTodos, {
    onSuccess: () => {
      alert("수정되었습니다.");
      // navigate(`/works/${id}`);
    },
  });

  //수정페이지 쿼리 뮤테이션 사용
  const onClickWorkEditHandler = (stateData, id) => {
    workEditMutation.mutate({ stateData, id });
  };

  //useRef로 comment창 띄우기.
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
      {/* 슬라이드 모달창 */}
      <ViewComment modalRef={modalRef} id={stateData.id} />
    </div>
  );
};

//슬라이드 모달 창
const ViewComment = ({ modalRef, id }) => {
  //모달 내부 input 관리 state
  //custon hook 사용
  const [name, onChangeNameHandler] = useInputValue();
  const [content, onChangeContentHandler] = useInputValue();

  //ref로 dom 조작
  const closeModalHandler = () => {
    modalRef.current.classList.remove("show");
    modalRef.current.classList.add("hide");
  };

  //comment 조회 : 쿼리 get 요청
  const { data: comments } = useQuery("readCommend", readCommend);

  //comment 입력 : 쿼리 뮤테이션
  //뮤테이션을 하고 invalidate해주려면 상위에서 해준 newQueryClient를 가져와야 한다.
  const queryClient = useQueryClient();
  const commentAddMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("readCommend");
    },
  });

  //뮤테이션 사용
  const onCLickAddCommentHandler = (name, content, id) => {
    commentAddMutation.mutate({ name, content });
  };

  //데이터 삭제 뮤테이션
  const commentDeleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("readCommend");
    },
  });

  //데이터 삭제 뮤테이션 사용
  const onClickDeleteCommentHandler = (id) => {
    commentDeleteMutation.mutate(id);
  };

  //데이터 수정 -> 아직 안함...
  const onClickEditHandler = (id) => {
    //modalRef.current.classList.remove("show");
    // console.log(editTextAreaRef.current.);
    //useRef로 사용해서
  };

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

      {/* 여기를 다른 파일 컴포넌트고 빼고 -> 불러와서 ref를 따로 따 */}

      <div className="workDetailViewComments" onClick={closeModalHandler}>
        눌러서 댓글내리기
      </div>
    </div>
  );
};

export default WorkDetail;
