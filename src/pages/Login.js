import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../redux/actions";
import logo from "../assets/logo.png";
import data from "../assets/users.json";

export const Login = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const matchUser = data.find((user) => user.username === userName);
    if (matchUser && matchUser.password === password) {
      dispatch(loginAction(userName));
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <Container style={{ overflowY: "hidden" }}>
        <Card
          className="rounded-3 p-0 w-50 mx-auto "
          style={{
            marginTop: "150px",
            height:'400px'
          }}
        >
          <Row className="m-0 h-100 rounded-3">
            <Col
              sm={5}
              className="text-center rounded-3 mx-auto p-5 bg-success"
            >
              <img src={logo} alt="logo" style={{ height: "70px", marginTop:'50px' }} />
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

      {/* <div className="w-100 d-flex align-items-center justify-content-center my-4">
      <div className="card p-3 rounded-3 w-25">
        
      </div>
    </div> */}
    </>
  );
};
