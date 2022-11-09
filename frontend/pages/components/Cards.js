import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import image3 from "../../images/927.jpg";
import {Link} from "react-router-dom"

function SupCards({cards}) {
  return (
    <Row xs={1} md={3} className="g-3 mt-2">
      {cards.map((card, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src={image3} />
            <Card.Body>
              <Card.Title> {card.title}</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Link to={card.link}>
              <Button variant="primary">Go somewhere</Button>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default SupCards;
