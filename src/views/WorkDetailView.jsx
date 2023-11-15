import Header from "../components/Header";
import WorkDetail from "../components/WorkDetail";

const WorkDetailView = () => {
  return (
    <div>
      <Header />
      <WorkDetail button={"수정"} />
    </div>
  );
};

export default WorkDetailView;
