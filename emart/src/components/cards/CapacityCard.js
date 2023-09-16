import { Link } from "react-router-dom";
import React from "react";
import { Card } from "react-bootstrap";

export default function CapacityCard() {
  return (
    <>
      <Link to="/capacity" style={{ textDecoration: "none" }}>
        <div>
          <Card className="shadow p-4 gap-2">
            <Card.Title>Capacity List</Card.Title>
          </Card>
        </div>
      </Link>
    </>
  );
}
