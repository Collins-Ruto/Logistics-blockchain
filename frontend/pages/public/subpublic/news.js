import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function GroupExample() {
  return (
    <CardGroup>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Covid 19 Update</Card.Title>
          <Card.Text>
          The KEMSA CEO received a delegation from the Federation of Kenya Pharmaceuticals Manufacturers (FKPM) for an introduction
           meeting and discussed

          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title> KEMSA in Homabay</Card.Title>
          <Card.Text>
          Homabay Receives Sh60 Million Medical Supplies from KEMSA
          Health Facilities in Homabay County received a Sh60m medical commodities boost following deliveries by KEMSA. 
          The consignment was received by
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Mombasa ASK show</Card.Title>
          <Card.Text>
          KEMSA Bags Awards at the Mombasa ASK Show
          The Kenya Medical Supplies Authority bagged two awards at the Mombasa ASK Show 2018.
           The Awards include; the 2nd Best
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}

export default GroupExample;