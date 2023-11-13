import { useEffect } from "react";
import Header from "../components/Header";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const navigate = useNavigate();

  //만약 토큰이 없으면 로그인페이지로 랜딩 배꿔주기
  useEffect(() => {
    if (!sessionStorage.token) {
      return navigate("/login");
    }
  }, []);

  const moveToWorkAdd = () => {
    navigate("/work/add");
  };

  const moveWorksView = () => {
    navigate("/works");
  };

  return (
    <>
      <Header></Header>
      <div className="homeContainer">
        <h1 className="homeH1">무엇을 할까요?</h1>
        <div className="homeDiv" onClick={moveToWorkAdd}>
          할일 기록하기
          <BsFillArrowRightCircleFill style={{ fontSize: 20 }} />
        </div>
        <div className="homeDiv" onClick={moveWorksView}>
          TODO LIST
          <BsFillArrowRightCircleFill style={{ fontSize: 20 }} />
        </div>
      </div>
    </>
  );
};

export default HomeView;
