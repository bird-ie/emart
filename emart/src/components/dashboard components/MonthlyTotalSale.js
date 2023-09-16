import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { Col, Container, Row } from "react-bootstrap";

export default function MonthlyTotalSale() {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [{ name: "Monthly Sales Amount", data: [] }],
  });

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("https://crystalsolutions.com.pk/emart/web/MonthlyTotalSale.php")
      .then((response) => {
        const data = processResponse(response.data);
        setChartData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function processResponse(apiData) {
    // Check if apiData has the necessary properties
    if (!apiData.detail || !apiData.tSale || !apiData.trSale) {
      console.error("API data is missing required properties:", apiData);
      return {
        categories: [],
        series: [{ name: "Monthly Sales Amount", data: [] }],
      };
    }

    // Extract data from the properties
    const detail = apiData.detail;
    const tSale = parseFloat(apiData.tSale.replace(/,/g, ""));
    const trSale = parseFloat(apiData.trSale.replace(/,/g, ""));

    // Process the 'detail' property if it contains the monthly data
    if (Array.isArray(detail)) {
      const months = detail.map((item) => item.month);
      const sales = detail.map((item) =>
        parseFloat(item.sale.replace(/,/g, ""))
      );

      return {
        categories: months,
        series: [
          {
            name: "Monthly Sales Amount",
            data: sales,
          },
        ],
      };
    } else {
      console.error("API data 'detail' is not an array:", apiData);
      return {
        categories: [],
        series: [{ name: "Monthly Sales Amount", data: [] }],
      };
    }
  }

  const chartOptions = {
    chart: {
      type: "bar",
      stacked: false,
    },
    xaxis: {
      categories: chartData.categories,
      title: {
        text: "Months",
        offsetY: -10,
      },
    },
    yaxis: [
      {
        title: {
          text: "Sales Amount",
        },
      },
    ],
    colors: ["#f58634"],
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      style: {
        colors: ["#00000000"],
        fontSize: "10px",
      },
    },
  };

  return (
    <Container>
      <Row className="bg-white shadow p-2 flex-row align-items-center">
        <h6 style={{ color: "var(--primary-color)" }}>Monthly Total Sale</h6>
        <Col>
          <ReactApexChart
            options={chartOptions}
            series={chartData.series}
            type="bar"
            height={188}
          />
        </Col>
      </Row>
    </Container>
  );
}
