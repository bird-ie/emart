import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./TableStyle.css";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import PathHead from "./General/BreadCrumbs";
import { FaArrowLeft } from "react-icons/fa";

export default function EmployeeList() {
  const [employeeData, setEmployeeData] = useState([]);
  const [filterOption, setFilterOption] = useState("all");

  const employeeApiUrl =
    "https://www.crystalsolutions.com.pk/emart/web/EmployeeList.php";

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const generatePDF = () => {
    const filteredTableData = getFilteredTableData();

    if (filteredTableData.length === 0) {
      alert("No data to generate PDF for the selected filter.");
      return;
    }

    const doc = new jsPDF();

    const tableColumns = [
      { header: "#", dataKey: "index" },
      { header: "Name", dataKey: "tempnam" },
      { header: "Mobile No.", dataKey: "tphnnum" },
      { header: "Address", dataKey: "tadd001" },
      { header: "Address", dataKey: "tadd002" },
      { header: "Salary", dataKey: "tempsal" },
      { header: "Status", dataKey: "tempsts" },
      { header: "Delivery Code", dataKey: "tdlvcod" },
      { header: "Advance Code", dataKey: "tadvcod" },
    ];

    const tableData = filteredTableData.map((record, index) => ({
      index: index + 1,
      id: record.id,
      tempnam: record.tempnam,
      tphnnum: record.tphnnum,
      tadd001: record.tadd001,
      tadd002: record.tadd002,
      tempsal: record.tempsal,
      tempsts: record.tempsts,
      tdlvcod: record.tdlvcod,
      tadvcod: record.tadvcod,
    }));

    const companyName = "Crystal Solutions";
    const companyAddress = "Lahore, Pakistan";
    const titleWidth = doc.getTextWidth(companyName);
    const addressWidth = doc.getTextWidth(companyAddress);
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = (pageWidth - Math.max(titleWidth, addressWidth)) / 2;

    doc.setFontSize(16);
    doc.text(companyName, centerX, 10);
    doc.setFontSize(12);
    doc.text(companyAddress, centerX, 20);
    doc.setFontSize(12);

    doc.autoTable({
      head: [tableColumns.map((column) => column.header)],
      body: tableData.map((record) =>
        tableColumns.map((column) => record[column.dataKey])
      ),
      startY: 40,
    });

    doc.save("employee_data.pdf");
  };

  const downloadCSV = () => {
    const filteredTableData = getFilteredTableData();

    if (filteredTableData.length === 0) {
      alert("No data to download CSV for the selected filter.");
      return;
    }

    const csvData = filteredTableData.map((record, index) => ({
      "#": index + 1,
      Name: record.tempnam,
      Mobile: record.tphnnum,
      Address: record.tadd001,
      Address: record.tadd002,
      DeliveryCode: record.tdlvcod,
      AdvanceCode: record.tadvcod,
      Salary: record.tempsal,
      Status: record.tempsts,
    }));
    const csvHeaders = Object.keys(csvData[0]);
    const csvContent =
      csvHeaders.join(",") +
      "\n" +
      csvData
        .map((record) => csvHeaders.map((header) => record[header]).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "employee_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const fetchEmployeeData = () => {
    axios
      .post(employeeApiUrl, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setEmployeeData(response.data);
        console.log("getting employee API data:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderFilteredData = () => {
    const filteredData = getFilteredTableData();

    return filteredData.map((data, index) => (
      <tr key={index}>
        <td style={{ maxWidth: "20px" }}>{data.tempcod}</td>
        <td className="char-left">{data.tempnam}</td>
        <td>{data.tphnnum}</td>
        <td>{data.tempsts}</td>
      </tr>
    ));
  };

  const getFilteredTableData = () => {
    let filteredData = employeeData;

    if (filterOption === "Active") {
      filteredData = employeeData.filter((data) => data.tempsts === "A");
    } else if (filterOption === "Non Active") {
      filteredData = employeeData.filter((data) => data.tempsts !== "A");
    }

    return filteredData;
  };

  const handleReturnClick = () => {
    window.history.back();
  };

  return (
    <>
      <PathHead pageName="Reports > Lists > Employee List" />
      <Container className="p-3">
        {employeeData.length > 0 && (
          <div className="p-4">
            <Row className="mb-2" style={{ marginLeft: 5 }}>
              <Button className="fit-content-width" onClick={handleReturnClick}>
                {" "}
                <FaArrowLeft />
              </Button>
            </Row>
            <Row className="gap-3">
              <Col className="d-flex flex-row gap-2 align-items-center">
                <span>Status</span>
                <Dropdown className="ml-2">
                  <Dropdown.Toggle
                    variant="secondary"
                    id="filter-dropdown"
                    title={filterOption}
                    className="filter-button"
                  >
                    Filter
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onSelect={() => setFilterOption("all")}
                      active={filterOption === "all"}
                      onClick={() => setFilterOption("all")}
                      className="filter-dropdown-item"
                    >
                      All
                    </Dropdown.Item>
                    <Dropdown.Item
                      onSelect={() => setFilterOption("Active")}
                      active={filterOption === "Active"}
                      onClick={() => setFilterOption("Active")}
                      className="filter-dropdown-item"
                    >
                      Active
                    </Dropdown.Item>
                    <Dropdown.Item
                      onSelect={() => setFilterOption("Non Active")}
                      active={filterOption === "Non Active"}
                      onClick={() => setFilterOption("Non Active")}
                      className="filter-dropdown-item"
                    >
                      Non Active
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button className="pdf-csv-button" onClick={generatePDF}>
                  <FaFilePdf />
                </Button>
                <Button className="pdf-csv-button" onClick={downloadCSV}>
                  <FaFileCsv />
                </Button>
              </Col>
              <MDBTable responsive scrollY striped maxHeight="360px">
                <MDBTableHead>
                  <tr>
                    <th style={{ width: "20px" }}>Code</th>
                    <th style={{ width: "350px" }}>Name</th>
                    <th>Mobile No.</th>
                    <th style={{ width: "20px" }}>Status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {employeeData.length > 0 && renderFilteredData()}
                </MDBTableBody>
              </MDBTable>
            </Row>
          </div>
        )}
      </Container>
    </>
  );
}
