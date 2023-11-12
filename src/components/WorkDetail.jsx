const WorkDetail = () => {
  return (
    <div className="workDetailContainer">
      <div className="workDetailFlex">
        <h3 className="workDetailH3">id: 2</h3>
        <p className="WorkDetailPrev">이전으로</p>
      </div>
      <h1 className="workDetailTitle"> title </h1>
      <p className="workDetailContents">contents</p>
      <button className="workDetailModify">수정 </button>
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
