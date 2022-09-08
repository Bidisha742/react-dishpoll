import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export const TabOneContent = (props) => {
  const [disable, setDisable] = useState(true);
  const [fetchDishes, setFetchDishes] = useState(props.dishes);
  const [storedDishes, setStoredDishes] = useState();

  const handleSelectRank = (id, rankId) => {
    let result;
    if (rankId === "rank1") {
      result = fetchDishes.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            isRank1: true,
            isRank2: false,
            isRank3: false,
          };
        }
        return { ...data, isRank1: false };
      });
    } else if (rankId === "rank2") {
      result = fetchDishes.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            isRank2: true,
            isRank1: false,
            isRank3: false,
          };
        }
        return { ...data, isRank2: false };
      });
    } else {
      result = fetchDishes.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            isRank3: true,
            isRank2: false,
            isRank1: false,
          };
        }
        return { ...data, isRank3: false };
      });
    }
    const filteredResult = result.filter(
      (res) => res.isRank1 || res.isRank2 || res.isRank3
    );
    if (filteredResult.length === 3) {
      setDisable(false);
    }

    setFetchDishes(result);
  };

  useEffect(() => {
    setStoredDishes(JSON.parse(localStorage.getItem("dishes")));
  }, []);

  const handleSubmitDishes = () => {
    const selectedDishesId = fetchDishes
      .filter((dish) => dish.isRank1 || dish.isRank2 || dish.isRank3)
      .map((dish) => dish.id);
    const selectedDishes = fetchDishes.filter(
      (dish) => dish.isRank1 || dish.isRank2 || dish.isRank3
    );
    const updatedDishes = storedDishes.map((dish) => {
      if (selectedDishesId.includes(dish.id)) {
        const dishFromSelection = fetchDishes.find((d) => d.id === dish.id);
        return {
          ...dish,
          points: dishFromSelection.isRank1
            ? +dish.points + 30
            : dishFromSelection.isRank2
            ? +dish.points + 20
            : +dish.points + 10,
        };
      }
      return dish;
    });
    localStorage.setItem("dishes", JSON.stringify(updatedDishes));
    const allUsers = localStorage.getItem("users");
    const loggedInUserId = JSON.parse(localStorage.getItem("loggedUser")).id;
    const loggedInUser = JSON.parse(allUsers).find(
      (u) => u.id === loggedInUserId
    );
    const reUpdatedDishes = updatedDishes.map((dish) => {
      return {
        ...dish,
        points:
          loggedInUser.dishRankOne === dish.id
            ? dish.points - 30
            : loggedInUser.dishRankTwo === dish.id
            ? dish.points - 20
            : loggedInUser.dishRankThree === dish.id
            ? dish.points - 10
            : dish.points,
      };
    });
    const updatedUserData = JSON.parse(allUsers).map((user) => {
      if (user.id === loggedInUserId) {
        return {
          ...user,
          dishRankOne: selectedDishes.find((d) => d.isRank1).id,
          dishRankTwo: selectedDishes.find((d) => d.isRank2).id,
          dishRankThree: selectedDishes.find((d) => d.isRank3).id,
        };
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUserData));
    localStorage.setItem("dishes", JSON.stringify(reUpdatedDishes));
    setFetchDishes(props.dishes);
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between px-3">
        <h2>List of Foods</h2>
        <button
          className="btn bg-success p-2 px-4 text-white fw-bold roundeed-3"
          disabled={disable}
          onClick={handleSubmitDishes}
        >
          Submit
        </button>
      </div>
      <Row>
        {fetchDishes.map((data) => (
          <Col lg={3} md={6} sm={12}>
            <Card className="p-3 mx-3 my-5">
              <Card.Img
                variant="top"
                src={data.image}
                className="w-100"
                style={{ height: "200px" }}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  {data.dishName}
                </Card.Title>
                <Card.Text
                  style={{
                    height: "100px",
                    fontSize: "12px",
                    color: "#c2bbba",
                  }}
                >
                  {data.description}
                </Card.Text>
                <div className="btn-group text-center d-block" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    checked={data.isRank1}
                  />
                  <label
                    className="btn btn-outline-primary"
                    onClick={() => handleSelectRank(data.id, "rank1")}
                  >
                    Rank 1
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    checked={data.isRank2}
                  />
                  <label
                    className="btn btn-outline-success"
                    onClick={() => handleSelectRank(data.id, "rank2")}
                  >
                    Rank 2
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    checked={data.isRank3}
                  />
                  <label
                    className="btn btn-outline-danger"
                    onClick={() => handleSelectRank(data.id, "rank3")}
                  >
                    Rank 3
                  </label>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
