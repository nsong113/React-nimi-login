import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginView from "./views/LoginView";
import SignupView from "./views/SignupView";
import { QueryClient, QueryClientProvider } from "react-query";
import HomeView from "./views/HomeView";
import WorkAddView from "./views/WorkAddView";
import WorksView from "./views/WorksView";
import WorkDetailView from "./views/WorkDetailView";
import WorkEdit from "./views/WorkEdit";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<SignupView />} />
          <Route path="/work/add" element={<WorkAddView />} />
          <Route path="/works" element={<WorksView />} />
          <Route path="/works/:id" element={<WorkDetailView />} />
          <Route path="/works/:id/edit" element={<WorkEdit />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
