// import axios from "axios";
// import { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import {  Container, Row, Col } from "react-bootstrap";

// export default function TotalSale() {
//   const [dashboardData, setDashboardData] = useState([]);

//   const dashboardUrl =
//     "https://crystalsolutions.com.pk/emart/web/TotalSale.php";

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   function fetchDashboardData() {
//     const data = {
//       date: "01-08-2023",
//     };
//     const formData = new URLSearchParams(data).toString();

//     axios
//       .post(dashboardUrl, formData, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       })
//       .then((response) => {
//         setDashboardData(response.data[0]);
//         console.log("getting total sale data:", response.data[0]);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }

//   if (!dashboardData || Object.keys(dashboardData).length === 0) {
//     return <div>Loading...</div>;
//   }

//   const chartOptions = {
//     chart: {
//       type: "donut",
//       toolbar: {
//         show: false,
//       },
//     },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: "70%",
//           labels: {
//             show: true,
//             name: {
//               show: true,
//               fontSize: "16px",
//             },
//             value: {
//               show: true,
//               fontSize: "14px",
//               formatter: function (val) {
//                 if (val === parseFloat(dashboardData.Casesale - dashboardData.Cashsrn)) {
//                   return "Casesale"; // Display Casesale as the label for its value
//                 } else if (val === parseFloat(dashboardData.Crtsale - dashboardData.Crtsrn)) {
//                   return "Crtsale"; // Display Crtsale as the label for its value
//                 }
//                 return val.toLocaleString(); // Display other values normally
//               },
//             },
//             total: {
//               show: true,
//               label: "Total",
//               color: "#000",
//               formatter: function (w) {
//                 const totalValue =
//                   parseFloat(dashboardData.Casesale - dashboardData.Cashsrn) +
//                   parseFloat(dashboardData.Crtsale - dashboardData.Crtsrn);
//                 return totalValue.toLocaleString(); // Set the total value to the sum of Casesale and Crtsale
//               },
//             },
//           },
//         },
//       },
//     },
//     colors: ["#5DA2FA", "#4F46E5"],
//     labels: ["Cash Sale", "Credit Sale"], // Set the labels for each slice
//     series: [
//       parseFloat(dashboardData.Casesale - dashboardData.Cashsrn),
//       parseFloat(dashboardData.Crtsale - dashboardData.Crtsrn),
//     ],
//     responsive: [
//       {
//         breakpoint: 576, // Adjust font size on screens less than 576px wide (mobile screens)
//         options: {
//           plotOptions: {
//             pie: {
//               donut: {
//                 labels: {
//                   value: {
//                     fontSize: "12px", // Adjust font size for mobile screens
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     ],
//   };
  
//   return (
//     <>
//       <Container>
//         <Row className="bg-white shadow p-2 flex-row align-items-center">
//         <h6 style={{ color: 'var(--primary-color)' }}>Total Sale</h6>
//           <Col>
//             <ReactApexChart
//               options={chartOptions}
//               series={chartOptions.series}
//               type="donut"
//               height={200}
//             />
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }



// ...........................

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Row, Col } from 'react-bootstrap';
// import { Doughnut } from 'react-chartjs-2';
// import MonthlyCashSale from './MonthlyCashSale';
// import MonthlyCreditSale from './MonthlyCreditSale';
// import 'chart.js/auto';
// import { Chart } from 'react-chartjs-2';


// export default function TotalSale() {
//   const [dashboardData, setDashboardData] = useState([]);
//   const [selectedComponent, setSelectedComponent] = useState(null);

//   const dashboardUrl = 'https://crystalsolutions.com.pk/emart/web/TotalSale.php';

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   function fetchDashboardData() {
//     const data = {
//       date: '01-08-2023',
//     };
//     const formData = new URLSearchParams(data).toString();

//     axios
//       .post(dashboardUrl, formData, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       })
//       .then((response) => {
//         setDashboardData(response.data[0]);
//         console.log('getting total sale data:', response.data[0]);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }

//   const handleSliceClick = (_, elements) => {
//     if (elements.length === 0) {
//       return;
//     }

//     const clickedSliceIndex = elements[0].index;

//     if (clickedSliceIndex === 0) {
//       setSelectedComponent('cashSale');
//     } else if (clickedSliceIndex === 1) {
//       setSelectedComponent('creditSale');
//     }
//   };

//   if (!dashboardData || Object.keys(dashboardData).length === 0) {
//     return <div>Loading...</div>;
//   }

//   const totalValue =
//     parseFloat(dashboardData.Casesale - dashboardData.Cashsrn) +
//     parseFloat(dashboardData.Crtsale - dashboardData.Crtsrn);

//   const chartData = {
//     labels: ['Cash Sale', 'Credit Sale'],
//     datasets: [
//       {
//         data: [
//           parseFloat(dashboardData.Casesale - dashboardData.Cashsrn),
//           parseFloat(dashboardData.Crtsale - dashboardData.Crtsrn),
//         ],
//         backgroundColor: ['#5DA2FA', '#4F46E5'],
//       },
//     ],
//   };

//   const chartOptions = {
//     onClick: handleSliceClick,
//   };

//   return (
//     <Container>
//       <Row className="bg-white shadow p-2 flex-row align-items-center">
//         <h6 style={{ color: 'var(--primary-color)' }}>Total Sale</h6>
//         <Col>
//           <Doughnut data={chartData} options={chartOptions} height={200} />
//         </Col>
//         <Col>
//           {selectedComponent === 'cashSale' && <MonthlyCashSale />}
//           {selectedComponent === 'creditSale' && <MonthlyCreditSale />}
//         </Col>
//       </Row>
//     </Container>
//   );
// }
