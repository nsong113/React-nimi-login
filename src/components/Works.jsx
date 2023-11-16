import { FcDeleteDatabase } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { readPlanTodos, deleteTodos } from "../api/todosContent";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Works = () => {
  const navigate = useNavigate();

  //조회
  //data에 쿼리 키가 담겨.. ㅠ
  const { isLoading, isError, data, isFetching } = useQuery(
    //디버깅 -> isFetching: 데이터를 다시 불러오고 있는지..불려와 지고 있는 동안 true가 된다.
    //디버깅 -> useQuery의 enabled 속성은 쿼리가 처음 마운트될 때 실행되는지 여부를 제어.. enabled가 false로 설정되면 처음에는 쿼리가 실행되지 않는다. 그러나 enabled를 true로 설정하면 처음 마운트 시에 쿼리가 실행됨. 혹시나,, false라서 오류난것일까봐 true로 바꿈
    "readPlan",
    readPlanTodos,
    {
      enabled: true,
      onSuccess: (data) => {
        console.log("todosData", data);
      },
      onSettled: (data, error) => {
        if (isFetching) {
          console.log("페칭중입니다.");
        }
      },
    }
  );

  //mutation후 invalidate하기 위해 제일 상단에 new QueryClient(); 했던거 끌어오기
  //끌어오는 이유: useQueryClinet안에 invalidation이 있다.
  //트러블슈팅: invalidation이 먹히지 않았음
  //invalidation이 먹히는 조건.
  //1. useMutation와 useQuery 훅에서 동일한 queryClient를 사용
  //2. unique한 키 값이어야 함
  //3. new QueryClient()는 제일 상위에 한번만 사용
  //4. 생성한 쿼리 클라이언트를 전역으로 공유하려면 컴포넌트 내부에서 useQueryClient를 사용해야함
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("readPlan");
    },

    // 추가 로직이나 디버깅을 위한 코드 - invalidate안되서 디버깅하기
    //onSettled는 쿼리가 성공하든 실패하든 항상 호출되므로 쿼리의 상태에 따라 원하는 로직을 추가 가능
    //useQuery 훅에서 옵션 객체는 { enabled, onSuccess, onError, onSettled }와 같이 구성
    onSettled: (data, error) => {
      console.log("data", data);
      console.log("error", error);
    },
  });

  //로딩이 끝난 후에 return문으로 보내기 위함 ->
  //Works.jsx?t=1700032068439:121 Uncaught TypeError: Cannot read properties of undefined (reading 'map') 방지
  if (isLoading) {
    return console.log("works로딩중입니다.");
  }

  if (isError) {
    return console.log("works에러입니다.");
  }

  //트러블슈팅: 이벤트 버블링 막기
  //시도: 처음에는 동기비동기로 접근을 해서 useEffect랑 async await, promise로 접근하고 토글버튼도 이용했지만
  //해결: 이벤트 버블링이었다.   e.stopPropagation(); 사용
  const onClickDeleteWorksHandler = (e, id) => {
    e.stopPropagation();
    deleteMutation.mutate(id);
  };

  const navigateHandler = (id) => {
    navigate(`/works/${id}`);
  };

  return (
    <div className="worksContainer">
      <h1 className="worksH1">내 할일</h1>
      {data.map((item) => {
        return (
          <div
            className="worksFlex"
            onClick={() => navigateHandler(item.id)}
            key={item.id}
          >
            <div className="worksContent">
              <h4 className="worksTitle">{item.title}</h4>
              <p className="worksName">작성자 : {item.name}</p>
            </div>
            <FcDeleteDatabase
              style={{ fontSize: 40, zIndex: 10000 }}
              onClick={(e) => onClickDeleteWorksHandler(e, item.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Works;
