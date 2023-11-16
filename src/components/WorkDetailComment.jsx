import React, { useState } from "react";

const WorkDetailComment = ({
  content,
  onClickEditHandler,
  onClickDeleteCommentHandler,
  id,
  name,
}) => {
  const [commentInput, setCommentInput] = useState(content);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div key={id}>
      <div className="flexComments">
        <div className="viewCommentIS">
          <p className="viewCommentIsTitle">{name}</p>

          {/*  */}
          {isEdit ? (
            <input
              value={commentInput}
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
            />
          ) : (
            <p className="viewCommentIsContents" r>
              {content}
            </p>
          )}

          {/*  */}
        </div>
        <div className="buttons">
          <button
            className="button"
            onClick={() => {
              setIsEdit(!isEdit);
              isEdit && onClickEditHandler({ id, commentInput });
            }}
          >
            수정
          </button>
          <button
            className="button"
            onClick={() => onClickDeleteCommentHandler(id)}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkDetailComment;
