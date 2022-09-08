import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions";
import { TabOneContent } from "./TabContents/TabOneContent";
import { TabTwoContent } from "./TabContents/TabTwoContent";
import dishes from "../assets/db.json";

export const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    setActiveTab("Tab One");
    localStorage.removeItem("loggedUser");
    dispatch(logoutAction());
  };
  const [activeTab, setActiveTab] = useState("Tab One");
  const [fetchedData, setFetchedData] = useState();
  const fetchData = () => {
    axios
      .get(
        "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"
      )
      .then((res) => {
        setFetchedData(
          res.data.map((data) => ({
            ...data,
            isRank1: false,
            isRank2: false,
            isRank3: false,
          }))
        );
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchData();
    if (!localStorage.getItem("dishes")) {
      localStorage.setItem(
        "dishes",
        JSON.stringify(dishes.map((dish) => ({ ...dish, points: 0 })))
      );
    }
  }, []);

  return (
    <>
      <nav class="navbar navbar-dark bg-success">
        <h3 className="text-white fw-bold m-3">Syook</h3>
        <button
          className="btn  p-2 text-white fs-5 mx-3"
          onClick={handleLogout}
        >
          Logout
        </button>
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
      {activeTab === "Tab One" && fetchedData ? (
        <TabOneContent dishes={fetchedData} />
      ) : (
        <TabTwoContent dishes={JSON.parse(localStorage.getItem("dishes"))} />
      )}
    </>
  );
};
