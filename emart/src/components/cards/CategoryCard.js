import { Link } from "react-router-dom";
import React from "react";
import { Card } from "react-bootstrap";

export default function CategoryCard() {
  return (
    <>
      <Link to="/category" style={{ textDecoration: "none" }}>
        <div>
          <Card className="shadow p-4 gap-2">
            <Card.Title>Category List</Card.Title>
          </Card>
        </div>
      </Link>
    </>
  );
}
