import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Menu from "./General/Menu";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "./TableStyle.css";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import PathHead from "./General/BreadCrumbs";

export default function Category() {
  const [categoryData, setCategoryData] = useState([]);
  const [filterOption, setFilterOption] = useState("all");

  const categoryApiUrl =
    "https://www.crystalsolutions.com.pk/emart/web/Category.php";

  useEffect(() => {
    fetchCategoryData();
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
      { header: "Category Code", dataKey: "tctgcod" },
      { header: "Category Description", dataKey: "tctgdsc" },
      { header: "Status", dataKey: "tctgsts" },
    ];

    const tableData = filteredTableData.map((record, index) => ({
      index: index + 1,
      tctgcod: record.tctgcod,
      tctgdsc: record.tctgdsc,
      tctgsts: record.tctgsts,
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

    doc.save("category_data.pdf");
  };

  const downloadCSV = () => {
    const filteredTableData = getFilteredTableData();

    if (filteredTableData.length === 0) {
      alert("No data to download CSV for the selected filter.");
      return;
    }

    const csvData = filteredTableData.map((record, index) => ({
      "#": index + 1,
      CategoryCode: record.tctgcod,
      CategoryDescription: record.tctgdsc,
      Status: record.tctgsts,
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
      link.setAttribute("download", "category_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const fetchCategoryData = () => {
    axios
      .post(categoryApiUrl, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setCategoryData(response.data);
        console.log("getting category API data:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderFilteredData = () => {
    const filteredData = getFilteredTableData();

    return filteredData.map((data, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.tctgcod}</td>
        <td className="tb-left-align">{data.tctgdsc}</td>
        <td>{data.tctgsts}</td>
      </tr>
    ));
  };

  const getFilteredTableData = () => {
    let filteredData = categoryData;

    if (filterOption === "Active") {
      filteredData = categoryData.filter((data) => data.tctgsts === "A");
    } else if (filterOption === "Non Active") {
      filteredData = categoryData.filter((data) => data.tctgsts !== "A");
    }

    return filteredData;
  };

  return (
    <>
      <PathHead pageName="Reports > Lists > Category List" />
      <Container className="p-3">
        {categoryData.length > 0 && (
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
                  <th style={{ width: '20px' }}>#</th> {/* Adjust the width as needed */}
                    <th style={{ width: '150px' }}>Category Code</th>
                    <th>Category Description</th>
                    <th style={{ width: '20px' }}>Status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {categoryData.length > 0 && renderFilteredData()}
                </MDBTableBody>
              </MDBTable>
            </Row>
          </div>
        )}
      </Container>
    </>
  );
}
