import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import hand from '../../images/hand.jpg';
import  people from '../../images/people.jpg';
import bussiness from '../../images/bussiness.jpg';
import calendar from '../../images/calendar.jpg';

function GridExample() {
  let Cards = [
    { title: "WHO ARE WE ", text: "Kenya Medical Supplies Authority (KEMSA) is a state corporation under the Ministry of Health established under the KEMSA Act 2013" , image : {hand}},
    { title: "OUR MISSION", text: "KEMSA will provide reliable, affordable and quality health products and supply chain solutions to improve healthcare in Kenya and beyond" , image : {hand}},
    { title: "BUSINESS MODEL", text: "The KEMSA business model is necessitated by the fact that the country has now embraced devolved system of government and the health function has been devolved to the Counties.", image : {hand}},
    { title: "TENDERS", text: "Medical supplies tender notifications are published in the website as downloads, newspapers, in the local press, and in other selected communication mediums", image : {hand} },
  ];
  return (
    <Row xs={1} md={2} className="g-4">
      {Cards.map((C, idx) => (
        <Col>
          <Card>
             {/* if possible add the images icon ive tried its not working 
                also angalia image parameter how you can pass it
             */}
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{C.title}</Card.Title>
              <Card.Text>
                {C.text}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default GridExample;