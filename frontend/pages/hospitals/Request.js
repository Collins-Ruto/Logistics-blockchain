import React, { useState } from 'react'
import Navigation from "../components/Navigation"
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function Request() {
    const [items, setItems] = useState([{}])
    
    const itemList = items?.map((item) => {
      return (
        <tr>
          <td>{item.num}</td>
          <td>{item.name}</td>
          <td>{item.amount}</td>
        </tr>
      );
    });
  return (
    <div>
      <Navigation />
      Request
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Text>Item name and Quantity</InputGroup.Text>
          <Form.Control name="name" placeholder="Item name" aria-label="name" />
          <Form.Control name="quantity" placeholder="Quantity" aria-label="quantity" />
          <Button variant="outline-secondary">Add</Button>
        </InputGroup>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>{itemList}</tbody>
        </Table>
        <Button variant="outline-secondary">Submit</Button>
      </div>
    </div>
  );
}
