import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

function App() {
  const { isLoggedIn } = useSelector((state) => state.login);
  console.log("login state:: ", isLoggedIn);
  return (
    <Routes>
      <Route exact path="/" element={isLoggedIn ? <Home /> : <Login />} />
    </Routes>
  );
}

export default App;
