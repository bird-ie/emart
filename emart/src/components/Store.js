import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Row, Table } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Menu from "./General/Menu";
import "./TableStyle.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import PathHead from "./General/BreadCrumbs";

export default function Store() {
  const [storeData, setStoredata] = useState([]);
  const [filterOption, setFilterOption] = useState("all");

  const storeApiUrl = "https://www.crystalsolutions.com.pk/emart/web/Store.php";

  useEffect(() => {
    fetchStoreData();
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
      { header: "Abbreviation", dataKey: "tstrabb" },
      { header: "Code", dataKey: "tstrcod" },
      { header: "Description", dataKey: "tstrdsc" },
      { header: "Stock Status", dataKey: "tstrstk" },
      { header: "Status", dataKey: "tstrsts" },
    ];
    const tableData = filteredTableData.map((record, index) => ({
      index: index + 1,
      tstrabb: record.tstrabb,
      tstrcod: record.tstrcod,
      tstrdsc: record.tstrdsc,
      tstrstk: record.tstrstk,
      tstrsts: record.tstrsts,
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

    doc.save("store_data.pdf");
  };

  const downloadCSV = () => {
    const filteredTableData = getFilteredTableData();

    if (filteredTableData.length === 0) {
      alert("No data to download CSV for the selected filter.");
      return;
    }

    const csvData = filteredTableData.map((record, index) => ({
      "#": index + 1,
      Abbreviation: record.tstrabb,
      Code: record.tstrcod,
      Description: record.tstrdsc,
      StockStatus: record.tstrstk,
      Status: record.tstrsts,
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
      link.setAttribute("download", "store_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  function fetchStoreData() {
    axios
      .post(storeApiUrl, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("API response data:", response.data);
        setStoredata(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const renderFilteredData = () => {
    let filteredData = storeData;

    if (filterOption === "Active") {
      filteredData = storeData.filter((data) => data.tstrsts === "A");
    } else if (filterOption === "Non Active") {
      filteredData = storeData.filter((data) => data.tstrsts !== "A");
    }

    return filteredData.map((data, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td className="tb-left-align">{data.tstrabb}</td>
        <td>{data.tstrcod}</td>
        <td className="tb-left-align">{data.tstrdsc}</td>
        <td>{data.tstrstk}</td>
        <td>{data.tstrsts}</td>
      </tr>
    ));
  };

  const getFilteredTableData = () => {
    let filteredData = storeData;

    if (filterOption === "Active") {
      filteredData = storeData.filter((data) => data.tempsts === "A");
    } else if (filterOption === "Non Active") {
      filteredData = storeData.filter((data) => data.tempsts !== "A");
    }

    return filteredData;
  };

  return (
    <>
      <PathHead pageName="Files > Store Maintenance" />
      <Container className="p-3">
        <div className="p-4"></div>
        <Row className="gap-3">
          {/* <h2 className="page-title">Store Data</h2> */}
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
                <th>Abbreviation</th>
                <th style={{ width: '20px' }}>Code</th>
                <th>Description</th>
                <th style={{ width: '150px' }}>Stock Status</th>
                <th style={{ width: '20px' }}>Status</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {storeData.length > 0 && renderFilteredData()}
            </MDBTableBody>
          </MDBTable>
        </Row>
      </Container>
    </>
  );
}
