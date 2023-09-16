import { Link } from "react-router-dom";
import React from "react";
import { Card } from "react-bootstrap";

export default function UserListCard() {
  return (
    <>
      <Link to="/user-list" style={{ textDecoration: "none" }}>
        <div>
          <Card className="shadow p-4 gap-2">
            <Card.Title>User List</Card.Title>
          </Card>
        </div>
      </Link>
    </>
  );
}
