import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { loginAction } from "./redux/actions";

function App() {
  const { isLoggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  //fetch loggedIn data from localstorage for auto login
  useEffect(() => {
    if(localStorage.getItem('loggedUser')){
      dispatch(loginAction(JSON.parse(localStorage.getItem('loggedUser'))));
    }
  },[]);

  return (
    <Routes>
      <Route exact path="/" element={isLoggedIn ? <Home /> : <Login />} />
    </Routes>
  );
}

export default App;
