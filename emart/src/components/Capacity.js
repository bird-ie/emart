import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Dropdown } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Menu from "./General/Menu";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "./TableStyle.css";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import PathHead from "./General/BreadCrumbs";

export default function Capacity() {
  const [capacityData, setCapacityData] = useState([]);
  const [filterOption, setFilterOption] = useState("all");

  const capacityApiUrl =
    "https://www.crystalsolutions.com.pk/emart/web/Capacity.php";

  useEffect(() => {
    fetchCapacityData();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    const tableColumns = [
      { header: "#", dataKey: "index" },
      { header: "Capacity Code", dataKey: "tcapcod" },
      { header: "Capacity Description", dataKey: "tcapdsc" },
      { header: "Status", dataKey: "tcapsts" },
    ];
    const tableData = capacityData.map((record, index) => ({
      index: index + 1,
      id: record.id,
      tcapcod: record.tcapcod,
      tcapdsc: record.tcapdsc,
      tcapsts: record.tcapsts,
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

    doc.save("capacity_data.pdf");
  };

  const downloadCSV = () => {
    const csvData = capacityData.map((record, index) => ({
      "#": index + 1,
      CapacityCode: record.tcapcod,
      CapacityDescription: record.tcapdsc,
      Status: record.tcapsts,
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
      link.setAttribute("download", "capacity_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  function fetchCapacityData() {
    axios
      .post(capacityApiUrl, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setCapacityData(response.data);
        console.log("getting capacity api data:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const renderFilteredData = () => {
    let filteredData = capacityData;

    if (filterOption === "Active") {
      filteredData = capacityData.filter((data) => data.tcapsts === "A");
    } else if (filterOption === "Non Active") {
      filteredData = capacityData.filter((data) => data.tcapsts !== "A");
    }

    return filteredData.map((data, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.tcapcod}</td>
        <td className="tb-left-align">{data.tcapdsc}</td>
        <td>{data.tcapsts}</td>
      </tr>
    ));
  };

  return (
    <>
      <PathHead pageName="Reports > Lists > Capacity List" />
      <Container className="p-3">
        {capacityData.length > 0 && (
          <div className="p-4">
            <Row className="gap-3">
              <Col>
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
                    <th style={{ width: '20px' }}>#</th>
                    <th style={{ width: '150px' }}>Capacity Code</th>
                    <th>Capacity Description</th>
                    <th style={{ width: '20px' }}>Status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {capacityData.length > 0 && renderFilteredData()}
                </MDBTableBody>
              </MDBTable>
            </Row>
          </div>
        )}
      </Container>
    </>
  );
}
