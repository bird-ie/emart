import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import MonthlyCashSale from "./MonthlyCashSale";
import MonthlyCreditSale from "./MonthlyCreditSale";
import MonthlyTotalSale from "./MonthlyTotalSale";
import "chart.js/auto";
import "chartjs-plugin-datalabels";

export default function TotalSale() {
  const [dashboardData, setDashboardData] = useState([]);
  const [selectedComponent, setSelectedComponent] =
    useState("monthlyTotalSale"); // Initialize to "monthlyTotalSale"

  const dashboardUrl =
    "https://crystalsolutions.com.pk/emart/web/TotalSale.php";

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
        setDashboardData(response.data[0]);
        console.log("getting total sale data:", response.data[0]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleSliceClick = (_, elements) => {
    if (!elements || elements.length === 0) {
      setSelectedComponent("monthlyTotalSale"); // Set it to "monthlyTotalSale" when no slice is selected
      return;
    }

    const clickedSliceIndex = elements[0].index;

    if (clickedSliceIndex === 0) {
      setSelectedComponent("cashSale");
    } else if (clickedSliceIndex === 1) {
      setSelectedComponent("creditSale");
    }
  };

  if (!dashboardData || Object.keys(dashboardData).length === 0) {
    return <div>Loading...</div>;
  }

  const totalValue =
    parseFloat(dashboardData.Casesale - dashboardData.Cashsrn) +
    parseFloat(dashboardData.Crtsale - dashboardData.Crtsrn);

  const chartData = {
    labels: ["Cash Sale", "Credit Sale"],
    datasets: [
      {
        data: [
          parseFloat(dashboardData.Casesale - dashboardData.Cashsrn),
          parseFloat(dashboardData.Crtsale - dashboardData.Crtsrn),
        ],
        backgroundColor: ["#f58634", "#333333"],
      },
    ],
  };

  const chartOptions = {
    onClick: handleSliceClick,
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          if (context.dataset.data.indexOf(value) === 0) {
            return totalValue.toString();
          }
          return "";
        },
        color: "#fff",
      },
    },
  };

  return (
    <Container>
      <Row className="bg-white shadow p-2 flex-row align-items-center">
        <h6 style={{ color: "var(--primary-color)" }}>Total Sale</h6>
        <Col xs={12} md={6} lg={6}>
          <Doughnut
            data={chartData}
            options={chartOptions}
            className="smaller-chart"
          />
        </Col>
        <Col xs={12} md={6} lg={6}>
          {selectedComponent === "monthlyTotalSale" && <MonthlyTotalSale />}
          {selectedComponent === "cashSale" && <MonthlyCashSale />}
          {selectedComponent === "creditSale" && <MonthlyCreditSale />}
        </Col>
      </Row>
    </Container>
  );
}
