import Header from "../components/Header";
import WorkDetail from "../components/WorkDetail";

const WorkEditView = () => {
  return (
    <>
      {/* 디테일페이지와 수정 페이지 컴포넌트 공유-> button으로 조건부렌더링 */}
      <Header />
      <WorkDetail button={"저장"} />
    </>
  );
};

export default WorkEditView;
