import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function TenderTable({ tenders, setSupply }) {
  const tenderList = tenders.map((tenders) => {
    console.log("tender is " + tenders)
    return (
      <tr key={tenders.title} onClick={() => setSupply(tenders)}>
        <Link to="/supply">
          <td>{tenders.num}</td>
          <td>{tenders.title}</td>
          <td>{tenders.date}</td>
        </Link>
      </tr>
    );
  });
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Tender Title</th>
          <th>Deadline</th>
        </tr>
      </thead>
      <tbody>{tenderList}</tbody>
    </Table>
  );
}

export default TenderTable;
