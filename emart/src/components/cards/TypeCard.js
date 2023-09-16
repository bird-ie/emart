import { Link } from "react-router-dom";
import React from "react";
import { Card } from "react-bootstrap";

export default function TypeCard() {
  return (
    <>
      <Link to="/type" style={{ textDecoration: "none" }}>
        <div>
          <Card className="shadow p-4 gap-2">
            <Card.Title>Type</Card.Title>
          </Card>
        </div>
      </Link>
    </>
  );
}
