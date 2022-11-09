import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



function Agrid() {
  let Cards = [
    { title: "ICT VALUE AWARDS 2014 ", text: "On 3rd December 2014, KEMSA was declared a digital champion by the INFORMATION COMMUNICATION TECHNOLOGY ASSOCIATION OF KENYA (ICTAK) during the annual ICT Value awards 2014. KEMSA was the overall winner in the category for BEST USE OF ICT IN HEALTH." , image : "https://www.kemsa.co.ke/wp-content/uploads/2016/10/ict1small.jpg"},
    { title: "BUSINESS INITIATIVE DIRECTIONS (BID) INTERNATIONAL QUALITY AWARDS CEREMONY IN GENEVA", text: "  KEMSA CEO Dr. John Munyu displaying the Gold Award on Quality, Leadership and Management Systems presented to him during the Business Initiative Directions (BID) International Quality Awards ceremony in Geneva Switzerland. With him on immediate left the President and CEO BID Group Jose E. Prieto and Immediate Right KEMSA Quality Assurance Manager, Dr. John […]" , image : "https://www.kemsa.co.ke/wp-content/uploads/2016/10/CIO-100-award.jpg"},
    { title: "CIO 100 AWARD", text: "KEMSA receiving a certificate of recognition from CIO 100 award for outstanding achievements in the health sector in East Africa.", image : "https://www.kemsa.co.ke/wp-content/uploads/2016/10/CIO-100-award.jpg"},
    { title: "KEMSA ACHIEVES OUTSTANDING PERFORMANCE IN PERFORMANCE CONTRACT (PC) FOR FY 2013/2014TENDERS", text: "KEMSA achieves outstanding performance in Performance Contract (PC) for FY 2013/2014. A Trophy and Certificate of Excellence was presented to KEMSA by the Cabinet Secretary for Health on 26th November 2014.", image : "https://www.kemsa.co.ke/wp-content/uploads/2016/10/ict1small.jpg" },
  ];
  return (
    <Row xs={1} md={2} className="g-4">
      {Cards.map((C, idx) => (
        <Col>
          <Card>
             {/* if possible add the images icon ive tried its not working 
                also angalia image parameter how you can pass it
             */}
            <Card.Img variant="top" src= {C.image} />
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

export default Agrid;