import { Card, Col, Container, Row } from "react-bootstrap";

export const TabTwoContent = (props) => {
  console.log(props.dish);
  return (
    <Container>
      <div className="my-4">
        <h2>Leaderboard</h2>
      </div>
      <Container className="card">
        <Row
          className="fw-bold p-3 bg-success text-white"
          style={{  fontSize: "20px" }}
        >
        
          <Col sm={1}>Rank</Col>
          <Col>Dish Name</Col>
          <Col>Points</Col>
        </Row>
        
        {props.dish.map((data,index) => (
          <Row className="fw-bold p-3 border-bottom text-black-50 ">
          <Col sm={1}>{index+1}</Col>
            <Col><img src={data.image} alt = 'dishes' style={{width:'5%',borderRadius:'50%'}}/>&nbsp;&nbsp;{data.dishName}</Col>
            {/* <Col>{data.sort((b,a)=>b.data.points-a.data.points)}</Col> */}
            <Col>{data.points}</Col>
          </Row>
        ))}
      </Container>
    </Container>
  );
};
