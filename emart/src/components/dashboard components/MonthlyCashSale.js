import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Col, Container, Row } from "react-bootstrap";

export default function MonthlyCashSale() {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Sales",
        data: [],
      },
      {
        name: "SRN",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: false,
      },
      xaxis: {
        categories: [],
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
        {
          opposite: true,
          title: {
            text: "SRN",
          },
        },
      ],
      colors: [" #f58634", "#333333"],
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top", // Position of the data labels
            orientation: "vertical", // Set orientation to vertical
            angle: 90, // Rotate text by 90 degrees
            offsetY: 20, // Move labels below the bars
          },
        },
      },
      dataLabels: {
        style: {
          colors: ["#00000000", "#00000000"], // Colors for the data labels
          fontSize: "10px",
        },
      },
    },
  });
  

  useEffect(() => {
    const fetchData = () => {
      fetch("https://crystalsolutions.com.pk/emart/web/MonthlyCashSale.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `PLocCod=${encodeURIComponent("01")}&PColCod=${encodeURIComponent(
          "016"
        )}`,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('getting monthly cash sale data',data.detail);

          const months = data.detail.map((item) => item.month);
          const sales = data.detail.map((item) =>
            parseFloat(item.sale.replace(/,/g, ""))
          );
          const srn = data.detail.map((item) =>
            parseFloat(item.SRN.replace(/,/g, ""))
          );

          setChartData({
            series: [
              {
                name: "Sales",
                data: sales,
              },
              {
                name: "SRN",
                data: srn,
              },
            ],
            options: {
              chart: {
                type: "bar",
                stacked: false,
              },
              xaxis: {
                categories: months,
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
                {
                  opposite: true,
                  title: {
                    text: "SRN",
                  },
                },
              ],
              colors: ["#f58634", "#333333"],
              plotOptions: {
                bar: {
                  dataLabels: {
                    position: "top", // Position of the data labels
                  },
                },
              },
              dataLabels: {
                style: {
                  colors: ["#00000000", "#00000000"], // Colors for the data labels
                  fontSize: '10px',
                },
              },
            },
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Row className="bg-white shadow p-2 flex-row align-items-center">
        <h6 style={{ color: 'var(--primary-color)' }}>Monthly Cash Sale</h6>
        <Col>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={188}
          >
            <div>
              {chartData.series[0].data.map((value, index) => (
                <div key={index}>{value}</div>
              ))}
            </div>
          </ReactApexChart>
        </Col>
      </Row>
    </Container>
  );
}
