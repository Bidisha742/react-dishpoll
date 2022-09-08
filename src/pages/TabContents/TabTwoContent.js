import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { COLORS } from "../../constants/colors";

export const TabTwoContent = (props) => {
  const [sortedDishes, setSortedDishes] = useState();

  useEffect(() => {
    if (props.dishes) {
      const tempSorted = [...props.dishes];
      tempSorted.sort((a, b) => b.points - a.points);
      const users = localStorage.getItem("users");
      const userInfo = localStorage.getItem("loggedUser");
      const loggedInUser = JSON.parse(users).find(
        (u) => u.id === JSON.parse(userInfo).id
      );
      const newDishes = tempSorted.map((dish) => ({
        ...dish,
        color:
          dish.id === loggedInUser.dishRankTwo
            ? COLORS.two
            : dish.id === loggedInUser.dishRankOne
            ? COLORS.one
            : dish.id === loggedInUser.dishRankThree
            ? COLORS.three
            : "white",
      }));

      setSortedDishes(newDishes);
    }
  }, [props]);

  return (
    <Container className="pb-4">
      <div className="my-4">
        <h2>Leaderboard</h2>
      </div>
      <div className="d-flex">
        <Container className="card col-9 m-0">
          <Row className="fw-bold p-3" style={{ fontSize: "20px" }}>
            <Col sm={1}>Rank</Col>
            <Col>Dish Name</Col>
            <Col sm={2}>Points</Col>
          </Row>

          {sortedDishes &&
            sortedDishes.map((data, index) => (
              <Row
                className="fw-bold p-3 border-bottom"
                style={{
                  backgroundColor: data.color,
                  color: data.color !== "white" ? "white" : "grey",
                }}
              >
                <Col sm={1}>{index + 1}</Col>
                <Col>
                  <img
                    src={data.image}
                    alt="dishes"
                    style={{ width: "5%", borderRadius: "50%" }}
                  />
                  &nbsp;&nbsp;{data.dishName}
                </Col>
                {/* <Col>{data.sort((b,a)=>b.data.points-a.data.points)}</Col> */}
                <Col sm={2}>{data.points}</Col>
              </Row>
            ))}
        </Container>
        <Card className="col-3 mx-4 p-3 rounded-3 fw-bold h-100">
          <h4>Your Selection</h4>
          <div className="d-flex w-75 align-items-center my-3">
            <input
              type="radio"
              className="mx-3"
              checked
              style={{ accentColor: COLORS.one }}
            />
            <label style={{ color: COLORS.one }}>Rank One</label>
          </div>
          <div className="d-flex w-75 align-items-center my-3">
            <input
              type="radio"
              className=" mx-3"
              checked
              style={{ accentColor: COLORS.two }}
            />
            <label style={{ color: COLORS.two }}>Rank Two</label>
          </div>
          <div className="d-flex w-75 align-items-center my-3">
            <input
              type="radio"
              className="mx-3"
              checked
              style={{ accentColor: COLORS.three }}
            />
            <label style={{ color: COLORS.three }}>Rank Three</label>
          </div>
        </Card>
      </div>
    </Container>
  );
};
