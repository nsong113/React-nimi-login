import React from "react";
import Header from "./Header";

const WorkAdd = () => {
  return (
    <div className="workAddContainer">
      <div className="workAddBox">
        <h3 className="workAddH3">작성자</h3>
        <input
          className="workAddText"
          type="text"
          placeholder="작성자의 이름을 입력해주세요. (5자 이내)"
        />
      </div>

      <div className="workAddBox">
        <h3 className="workAddH3">제목</h3>
        <input
          className="workAddText2"
          type="text"
          placeholder="제목을 입력해주세요. (50자 이내)"
        />
      </div>

      <div className="workAddBox-textArea">
        <h3 className="workAddH3">내용</h3>
        <textarea
          className="workAddTextarea"
          placeholder="내용을 입력해주세요. (200자 이내)"
        ></textarea>
      </div>

      <button className="addContent"> 추가하기 </button>
    </div>
  );
};

export default WorkAdd;
