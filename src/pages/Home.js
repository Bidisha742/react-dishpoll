import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../redux/actions";
import { TabOneContent } from "./TabContents/TabOneContent";
import { TabTwoContent } from "./TabContents/TabTwoContent";

export const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };
  const [activeTab, setActiveTab] = useState("Tab One");
  return (
    <>
      <nav class="navbar navbar-dark bg-success">
        <h3 className="text-white fw-bold m-3">Syook</h3>
        <button className="btn  p-2 text-white fs-5 mx-3" onClick={handleLogout}>Logout</button>
      </nav>
      <div className="d-flex p-4">
        <div
          className={`px-3 text-success fs-5 ${
            activeTab === "Tab One" && "border-bottom border-success"
          }`}
          role="button"
          style={{
            "&:hover": { color: "#05a129" },
          }}
          onClick={() => setActiveTab("Tab One")}
        >
          Tab One
        </div>
        <div
          className={`px-3 text-success fs-5 ${
            activeTab === "Tab Two" && "border-bottom border-success"
          }`}
          role="button"
          style={{
            "&:hover": { color: "#05a129" },
          }}
          onClick={() => setActiveTab("Tab Two")}
        >
          Tab Two
        </div>
      </div>
      {activeTab === "Tab One" ? <TabOneContent /> : <TabTwoContent />}
    </>
  );
};
