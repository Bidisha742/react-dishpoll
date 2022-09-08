import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions";
import logo from "../assets/logo.png";
import data from "../assets/users.json";

export const Login = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const [users, setUsers] = useState();
  //on load storing user data in localstorage to use further.
  useEffect(() => {
    //if localstorage is empty on users, then fetch from static json, else use the localstorage data
    if (localStorage.getItem("users")) {
      setUsers(JSON.parse(localStorage.getItem("users")));
    } else {
      setUsers(data);
      localStorage.setItem("users", JSON.stringify(data));
    }
  }, []);

  const handleLogin = () => {
    const matchUser = users.find((user) => user.username === userName);
    if (matchUser && matchUser.password === password) {
      dispatch(loginAction(userName));
      localStorage.setItem("loggedUser", JSON.stringify(matchUser));
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <Container style={{ overflowY: "hidden" }}>
        <Card
          className="rounded-3 p-0 w-50 mx-auto"
          style={{
            marginTop: "150px",
            height: "400px",
          }}
        >
          <Row className="m-0 h-100 rounded-3">
            <Col
              sm={5}
              className="text-center rounded-3 mx-auto p-5 bg-success"
            >
              <img
                src={logo}
                alt="logo"
                style={{ height: "70px", marginTop: "50px" }}
              />
              <h2 className="m-3 text-white">LET'S USE</h2>
            </Col>
            <Col sm={7} className="text-center m-auto rounded-3">
              <h2 className="mt-2">Login</h2>
              <input
                className="form-control mx-auto my-4 rounded-pill w-75"
                type="text"
                placeholder="User Name"
                onChange={(event) => setUserName(event.target.value)}
              />
              <input
                className="form-control mx-auto my-4 rounded-pill w-75"
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              {showError && (
                <p className="text-danger">
                  Enter valid Username and Password.
                </p>
              )}
              <button
                className="btn bg-success p-2 text-white fw-bold rounded-pill w-75"
                onClick={handleLogin}
              >
                Login
              </button>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};
