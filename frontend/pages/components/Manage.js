import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Footer } from "./Footer";
import SupplierNav from "./Navigation";
import TenderTable from "./TenderTable"

export default function Manage({setSupply}) {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("new")
  const tenders = [
    {
      num: 1,
      title: "Tender Document For the Supply of Laboratory Commodities ",
      date: "27/08/2022",
      hospital: "coast gen",
      supplier: "kemsa",
      supplies: [
        {
          name: "String",
          cost: 20,
          quantity: 10,
          manufacturer: "String",
          types: "String",
          date_of_manufacture: "String",
        },
        {
          name: "String1",
          cost: 20,
          quantity: 10,
          manufacturer: "String",
          types: "String",
          date_of_manufacture: "String",
        },
        {
          name: "String2",
          cost: 20,
          quantity: 10,
          manufacturer: "String",
          types: "String",
          date_of_manufacture: "String",
        },
      ],
      sponsor: "gok-moh",
      supply_cost: 212321.332,
      misc: [
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
      ],
      misc_cost: 2345234.22,
    },
    {
      num: 2,
      title:
        "Tender Document For the Supply of Health Products (Topical, Disinfectants, Antiseptics & Oral Liquid",
      date: "12/08/2022",
      hospital: "coast gen",
      supplier: "kemsa",
      supplies: [
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
      ],
      sponsor: "gok-moh",
      supply_cost: 212321.332,
      misc: [
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
      ],
      misc_cost: 2345234.22,
    },
    {
      num: 3,
      title: "Tender Document For the Supply of Health Products",
      date: "21/08/2022",
      hospital: "coast gen",
      supplier: "kemsa",
      supplies: [
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
      ],
      sponsor: "gok-moh",
      supply_cost: 212321.332,
      misc: [
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
      ],
      misc_cost: 2345234.22,
    },
    {
      num: 4,
      title: "Tender Document For the Supply of arvs",
      date: "21/08/2022",
      hospital: "coast gen",
      supplier: "kemsa",
      supplies: [
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
      ],
      sponsor: "gok-moh",
      supply_cost: 212321.332,
      misc: [
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
        { name: "pfizer", cost: 32.3 },
      ],
      misc_cost: 2345234.22,
    },
  ];

  useEffect(() => {
    
  }, [type])
  
  return (
    <div>
      <div className="sup-tab">
        <ListGroup horizontal>
          <ListGroup.Item action onClick={() => setType("new")}>
            New Tenders
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => setType("pending")}>
            Pending
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => setType("current")}>
            Current
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => setType("completed")}>
            Completed
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div className="sup-list">
        <TenderTable tenders={tenders} setSupply={setSupply} />
      </div>
    </div>
  );
}
