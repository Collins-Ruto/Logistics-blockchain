import React, { useEffect, useState } from 'react'
import Navigation from "./Navigation"
import { Footer } from './Footer';
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table';

export default function Supply({supply}) {
  const [mySupply, setMySupply] = useState(supply)
  let addedCost = []
  console.log("supply ", mySupply);
  
  const onConfirm = () => {
    setMySupply()
  }
  return (
    <div>
      <Navigation />
      <div className="mySupply">
        <h2>title: {mySupply.title}</h2>
        <h2>Hospital: {mySupply.hospital}</h2>
        <h3>Sponsor: {mySupply.sponsor}</h3>
        <h3>Supplier: {mySupply.supplier}</h3>
        <h3>Supply Cost: {mySupply.mySupply_cost}</h3>
        <h3>Miscellaneous Costs: {mySupply.misc_cost}</h3>
        <div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Tender Supplies</Accordion.Header>
              <Accordion.Body>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>name</th>
                      <th>type</th>
                      <th>quantity</th>
                      <th>add cost</th>
                      <th>manufacturer</th>
                      <th>D.O.M</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                  <tbody>
                    {mySupply.supplies.map((item, index) => {
                     
                      const inputCost = (e)=>{
                      let newSupply = {
                          ...mySupply, supplies: [...mySupply.supplies, {...mySupply.supplies[index], cost:e.target.value}]
                        };
                      // setMySupply((mySupply)=>{mySupply.filter()});
                        updateSupp()
                      }
                      
                      const updateSupp =()=>{
                        console.log("item to update",mySupply.supplies[index]);
                      }
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{item.name}</td>
                          <td>{item.types}</td>
                          <td>{item.quantity}</td>
                          <td>
                            <input name={item.name} onChange={(e)=>inputCost(e)}></input>
                          </td>
                          <td>{item.manufacturer}</td>
                          <td>{item.date_of_manufacture}</td>
                        </tr>
                      );
                    })}
                    <button onClick={() =>confirm()}>confirm</button>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Miscellaneous Items</Accordion.Header>
              <Accordion.Body>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>name</th>
                      <th>cost</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                  <tbody>
                    {mySupply.misc.map((item, index) => {

                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{item.name}</td>
                          <td>{item.cost}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
}
