
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export const TabOneContent = (props) => {

  const [disable, setDisable] = useState(true);
  const [fetchDishes, setFetchDishes] = useState(props.dish)

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
            points: data.points + 30,
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
            points: data.points + 20,
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
            points: data.points + 10,
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
  

  return (
    <Container fluid>
      <div className="d-flex justify-content-between px-3">
        <h2>List of Foods</h2>
        <button
          className="btn bg-success p-2 px-4 text-white fw-bold roundeed-3"
          disabled={disable}
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
                <div className="btn-group" role="group">
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
