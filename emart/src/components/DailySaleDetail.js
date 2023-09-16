import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

export default function DailySaleDetail() {
  const [dashboardData, setDashboardData] = useState([]);
  const dashboardUrl =
    "https://crystalsolutions.com.pk/emart/web/DailySaleDetail.php";

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
        console.log("getting daily sale detail data:", response.data.detail);
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
            <h2 className="page-title">Daily Sale Detail</h2>
            <MDBTable responsive scrollY maxHeight="550px">
              <MDBTableHead>
                <tr>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Quantity</th>
                  <th>Item Code</th>
                  <th>Transaction Desctiption</th>
                  <th>Transaction Number</th>
                  <th>Transaction Type</th>
                  {/* Add more table headers as needed */}
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {dashboardData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.Amount}</td>
                    <td>{item.Qnty}</td>
                    <td>{item.titmcod}</td>
                    <td>{item.ttrndsc}</td>
                    <td>{item.ttrnnum}</td>
                    <td>{item.ttrntyp}</td>
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
