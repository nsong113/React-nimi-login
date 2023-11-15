import { FcDeleteDatabase } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { addPlanTodos, readPlanTodos, deleteTodos } from "../api/todosContent";
import {
  QueryCache,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useEffect, useState } from "react";

const Works = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //new QueryClient
  //useQeuryClient안에 invalidation이 있음
  const [canNavigate, setCanNavigate] = useState(true);

  // useEffect(() => {
  //   console.log("useEffect", canNavigate);
  // }, [canNavigate]);

  //invalidate가 먹히지 않음..
  //useMutation와 useQuery 훅에서 동일한 queryClient를 사용해야 합니다
  //현재 코드에서 queryClient를 const queryClient = new QueryClient();로 생성하고 있습니다. 이것은 컴포넌트 내부에서만 유효한 queryClient입니다. 전역으로 공유하려면 컴포넌트 외부에서 생성한 queryClient를 사용해야 합니다

  const deleteMutation = useMutation(deleteTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("readPlan");
    },
    onSettled: (data, error) => {
      // 추가 로직이나 디버깅을 위한 코드 - invalidate안되서 디버깅하기
      console.log("data", data);
      console.log("error", error);
    },
  });

  //data에 쿼리 키가 담겨.. ㅠ
  const { isLoading, isError, data, isFetching } = useQuery(
    "readPlan",
    readPlanTodos,
    {
      enabled: true,
      onSettled: (data, error) => {
        if (isFetching) {
          console.log("페칭중입니다.");
        }
      },
    }
  );

  //isFetching: 데이터를 다시 불러오고 있는지..불려와 지고 있는 동안 true가 됨다.
  //useQuery의 enabled 속성은 쿼리가 처음 마운트될 때 실행되는지 여부를 제어합니다. enabled가 false로 설정되면 처음에는 쿼리가 실행되지 않습니다. 그러나 enabled를 true로 설정하면 처음 마운트 시에 쿼리가 실행
  //onSettled는 쿼리가 성공하든 실패하든 항상 호출되므로 쿼리의 상태에 따라 원하는 로직을 추가
  //useQuery 훅에서 옵션 객체는 { enabled, onSuccess, onError, onSettled }와 같이 구성

  //만약에 쿼리를 여러개 사용해서 isLoading같은게 많아짐-> 그럼 고유한 이름 변경 가능?
  //객체를 풀지 않고 특정 변수로 묶고 그 다음데 todos.isError로 사용.
  //아니면 data: datA 이렇게 가능

  if (isLoading) {
    return console.log("works로딩중입니다.");
  }

  if (isError) {
    return console.log("works에러입니다.");
  }

  //1
  // const onClickDeleteWorksHandler = async (id) => {
  //   await deleteMutation.mutate(id);
  //   console.log("클릭되었습니다.");

  //   setCanNavigate(false);
  //   navigateHandler(id);
  // };

  //2
  // const navigateHandler = (item) => {
  //   navigate(canNavigate === true && `/works/${item.id}`);
  //   console.log("down", canNavigate); //트루
  // };

  // const onClickDeleteWorksHandler = (id) => {
  //   deleteMutation.mutate(id);
  //   console.log("클릭되었습니다.");
  //   new Promise((resolve) => {
  //     setCanNavigate(false);
  //     resolve(canNavigate);
  //   }).then((previd) => {
  //     return new Promise((id) => {
  //       navigate(canNavigate === true && `/works/${id}`);
  //       console.log("down", canNavigate); //트루
  //     });
  //   });
  // };

  // console.log("up", canNavigate); //트루

  //3
  const onClickDeleteWorksHandler = (e, id) => {
    // setCanNavigate(false);
    e.stopPropagation();
    deleteMutation.mutate(id);

    // e.preventDefault();
    // new Promise((resolve) => {
    //   setCanNavigate(false);
    //   resolve();
    // }).then(() => {
    //   navigateHandler();
    // });
  };

  const navigateHandler = (id) => {
    // navigate(canNavigate === true && `/works/${id}`);
    navigate(`/works/${id}`);
  };

  // 버튼 만들어서 invalidate 디버깅 -> 이렇게 따로 호출해도 리렌더링이 안됨
  const onClickReloadData = async () => {
    queryClient.invalidateQueries("readPlan");

    // 현재 fetching 중인 모든 쿼리에 대해 refetch 수행
    // await QueryCache.refetchQueries();
  };

  return (
    <div className="worksContainer">
      <h1 className="worksH1">내 할일</h1>
      {/* <button onClick={onClickReloadData}>디버그하기</button> */}
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
            {/* 이벤트버블링 */}
            {/* e.preventDefault() */}
            {/* e.stoppropagation() */}
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
