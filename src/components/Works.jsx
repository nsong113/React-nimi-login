import { FcDeleteDatabase } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Works = () => {
  const navigate = useNavigate();

  const moveToWorkDetail = () => {
    navigate("/works/:id");
  };

  return (
    <div className="worksContainer">
      <h1 className="worksH1">내 할일</h1>
      <div className="worksFlex" onClick={moveToWorkDetail}>
        <div className="worksContent">
          <h4 className="worksTitle">title</h4>
          <p className="worksName">작성자 : name</p>
        </div>
        <FcDeleteDatabase style={{ fontSize: 40 }} />
      </div>
    </div>
  );
};

export default Works;
