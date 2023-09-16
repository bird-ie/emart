import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import TotalSale from "./dashboard components/TotalSale";

export default function Dashboard() {
  return (
    <>
      <Container fluid className="mt-5 mb-5">
        <Row className="gx-2 gx-md-3">
          <Col xs={12} md={12} lg={12} className="mb-3 mb-md-0">
            <TotalSale />
          </Col>
        </Row>
      </Container>
    </>
  );
}
