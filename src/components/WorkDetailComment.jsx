import React, { useState } from "react";

const WorkDetailComment = ({ content, isEdit }) => {
  const [commentInput, setCommentInput] = useState("");

  return (
    <>
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
    </>
  );
};

export default WorkDetailComment;
