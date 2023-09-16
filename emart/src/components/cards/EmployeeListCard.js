import { Link } from "react-router-dom";
import React from "react";
import { Card } from "react-bootstrap";

export default function EmployeeListCard() {
  return (
    <>
      <Link to="/employee-list" style={{ textDecoration: "none" }}>
        <div>
          <Card className="shadow p-4 gap-2">
            <Card.Title>Employees List</Card.Title>
          </Card>
        </div>
      </Link>
    </>
  );
}
