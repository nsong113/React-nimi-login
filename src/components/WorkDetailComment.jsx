// import React, { useRef } from "react";
// import { useMutation, useQueryClient } from "react-query";
// import { deleteComment, editComment } from "../api/todosContent";

// const WorkDetailComment = ({
//   name,
//   content,
//   id,
//   commentRef,
//   onClickEditHandler,
// }) => {
//   return (
//     <div className="flexComments">
//       <div className="viewCommentIS">
//         <p className="viewCommentIsTitle">{name}</p>
//         <p className="viewCommentIsContents" ref={commentRef}>
//           {content}
//         </p>
//       </div>
//       <div className="buttons">
//         <WorkDetailComment onClickEditHandler={onClickEditHandler} id={id} />
//         <button className="button" onClick={() => onClickEditHandler(id)}>
//           수정
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WorkDetailComment;
