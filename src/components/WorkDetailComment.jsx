import React from "react";

const WorkDetailComment = ({comments,onClickEditHandler,onClickDeleteCommentHandler}) => {
  return (
    {comments ? (
        comments.map((item) => {
          return (
            <div key={item.id}>
              <div className="flexComments">
                <div className="viewCommentIS">
                  <p className="viewCommentIsTitle">{item.name}</p>
                  <p className="viewCommentIsContents">{item.content}</p>
                </div>
                <div className="buttons">
                  <button
                    className="button"
                    onClick={() => onClickEditHandler(item.id)}
                  >
                    수정
                  </button>
                  <button
                    className="button"
                    onClick={() => onClickDeleteCommentHandler(item.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="viewCommentNo">
          <p>댓글이 없네요.</p>
        </div>
      )}
  )



  
};

export default WorkDetailComment;
