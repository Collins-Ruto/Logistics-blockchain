import Accordion from "react-bootstrap/Accordion";
import GroupExample from "./subpublic/news";
import Article from "./subpublic/article";
import About from "./subpublic/about";
function PubAccordion() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Article</Accordion.Header>
        <Accordion.Body>
            <Article />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>News / Latest-Info</Accordion.Header>
        <Accordion.Body>
           < GroupExample />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Patners</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>About</Accordion.Header>
        <Accordion.Body>
            
            <About />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default PubAccordion;
