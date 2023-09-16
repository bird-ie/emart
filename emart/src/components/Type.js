import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Row, Table } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Menu from "./General/Menu";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "./TableStyle.css";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import PathHead from "./General/BreadCrumbs";

export default function Type() {
  const [typeData, setTypeData] = useState([]);
  const [filterOption, setFilterOption] = useState("all");

  const typeApiUrl = "https://www.crystalsolutions.com.pk/emart/web/Type.php";

  useEffect(() => {
    fetchTypeData();
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
      { header: "Type Code", dataKey: "ttypcod" },
      { header: "Type Description", dataKey: "ttypdsc" },
      { header: "Status", dataKey: "ttypsts" },
    ];
    const tableData = filteredTableData.map((record, index) => ({
      index: index + 1,
      ttypcod: record.ttypcod,
      ttypdsc: record.ttypdsc,
      ttypsts: record.ttypsts,
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

    doc.save("type_data.pdf");
  };

  const downloadCSV = () => {
    const filteredTableData = getFilteredTableData();

    if (filteredTableData.length === 0) {
      alert("No data to download CSV for the selected filter.");
      return;
    }

    const csvData = filteredTableData.map((record, index) => ({
      "#": index + 1,
      TypeCode: record.ttypcod,
      TypeDescription: record.ttypdsc,
      Status: record.ttypsts,
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
      link.setAttribute("download", "type_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  function fetchTypeData() {
    axios
      .post(typeApiUrl, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setTypeData(response.data);
        console.log("getting type api data:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const renderFilteredData = () => {
    let filteredData = typeData;

    if (filterOption === "Active") {
      filteredData = typeData.filter((data) => data.ttypsts === "A");
    } else if (filterOption === "Non Active") {
      filteredData = typeData.filter((data) => data.ttypsts !== "A");
    }

    return filteredData.map((data, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.ttypcod}</td>
        <td className="tb-left-align">{data.ttypdsc}</td>
        <td>{data.ttypsts}</td>
      </tr>
    ));
  };

  const getFilteredTableData = () => {
    let filteredData = typeData;

    if (filterOption === "Active") {
      filteredData = typeData.filter((data) => data.ttypsts === "A");
    } else if (filterOption === "Non Active") {
      filteredData = typeData.filter((data) => data.ttypsts !== "A");
    }

    return filteredData;
  };

  return (
    <>
      <PathHead pageName="Reports > Lists > type List" />
      <Container className="p-3">
        {typeData.length > 0 && (
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
              <MDBTable responsive scrollY maxHeight="550px">
                <MDBTableHead>
                  <tr>
                    <th style={{ width: '20px' }}>#</th>
                    <th style={{ width: '20px' }}>Type Code</th>
                    <th>Type Description</th>
                    <th style={{ width: '20px' }}>Status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {typeData.length > 0 && renderFilteredData()}
                </MDBTableBody>
              </MDBTable>
            </Row>
          </div>
        )}
      </Container>
    </>
  );
}
