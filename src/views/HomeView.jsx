import React from "react";
import Header from "../components/Header";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const navigate = useNavigate();
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
