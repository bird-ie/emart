import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

export default function DailySale() {
  const [dashboardData, setDashboardData] = useState([]);
  const dashboardUrl =
    "https://crystalsolutions.com.pk/emart/web/DailySale.php";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  function fetchDashboardData() {
    const data = {
      date: "01-08-2023",
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(dashboardUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setDashboardData(response.data.detail); 
        console.log("getting daily sale data:", response.data.detail);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <Container className="p-3">
        <div className="p-4">
          <Row className="gap-3">
            <h2 className="page-title">Daily Sale</h2>
            <MDBTable responsive scrollY striped maxHeight="360px">
              <MDBTableHead>
                <tr>
                  <th>#</th>
                  <th>Sale Return</th>
                  <th>Transaction Type</th>
                  <th>Customer Name</th>
                  <th>Mobile Number</th>
                  <th>Transaction Number</th>
                  <th>Sale Amount</th>
                  {/* Add more table headers as needed */}
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {dashboardData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.SaleReturn}</td>
                    <td>{item.ttrntyp}</td>
                    <td>{item.tcstnam}</td>
                    <td>{item.tmobnum}</td>
                    <td>{item.ttrnnum}</td>
                    <td>{item.sale}</td>
                    {/* Add more table cells as needed */}
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </Row>
        </div>
      </Container>
    </>
  );
}
