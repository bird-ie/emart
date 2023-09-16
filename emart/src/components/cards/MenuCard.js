import { Link } from "react-router-dom";
import React from "react";
import { Card } from "react-bootstrap";

export default function MenuCard() {
  return (
    <>
      <Link to="/menu" style={{ textDecoration: "none" }}>
        <div>
          <Card className="shadow p-4 gap-2">
            <Card.Title>Menu</Card.Title>
          </Card>
        </div>
      </Link>
    </>
  );
}
