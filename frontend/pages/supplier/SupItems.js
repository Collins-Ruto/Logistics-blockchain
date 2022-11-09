import ListGroup from "react-bootstrap/ListGroup";

function SupItems({ types }) {
  const [items, setItems] = React.useState([]);
  const updateItems = (type) => {
    setItems(type);
  };

  const itemList = items.map((item) => {
    <ListGroup horizontal>
      <ListGroup.Item>
        <Link onClick={() => updateItems(type)}>this</Link>
      </ListGroup.Item>
      <ListGroup.Item>ListGroup</ListGroup.Item>
      <ListGroup.Item>renders</ListGroup.Item>
      <ListGroup.Item>horizontally!</ListGroup.Item>
    </ListGroup>;
  });

  return <div>{itemList}</div>;
}

export default SupItems;
