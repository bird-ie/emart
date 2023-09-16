import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Row, Table } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Menu from "./General/Menu";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";

import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
} from "mdbreact";
import "./TableStyle.css";
import PathHead from "./General/BreadCrumbs";

export default function Item() {
  const [itemData, setItemData] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const ItemApiUrl =
    "https://www.crystalsolutions.com.pk/emart/web/ItemList.php";

  useEffect(() => {
    fetchItemData();
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
      { header: "Item Code", dataKey: "titmcod" },
      { header: "Item Description", dataKey: "titmdsc" },
      { header: "Status", dataKey: "titmsts" },
      { header: "Category Code", dataKey: "tctgcod" },
      { header: "Company Code", dataKey: "tcmpcod" },
      { header: "Purchase Rate", dataKey: "tpurrat" },
      { header: "Retail Rate", dataKey: "trtlrat" },
    ];
    const tableData = filteredTableData.map((record, index) => ({
      index: index + 1,
      titmcod: record.titmcod,
      titmdsc: record.titmdsc,
      titmsts: record.titmsts,
      tctgcod: record.tctgcod,
      tcmpcod: record.tcmpcod,
      tpurrat: record.tpurrat,
      trtlrat: record.trtlrat,
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

    doc.save("item_data.pdf");
  };

  const downloadCSV = () => {
    const filteredTableData = getFilteredTableData();

    if (filteredTableData.length === 0) {
      alert("No data to download CSV for the selected filter.");
      return;
    }

    const csvData = filteredTableData.map((record, index) => ({
      "#": index + 1,
      ItemCode: record.titmcod,
      ItemDescription: record.titmdsc,
      Status: record.titmsts,
      CategoryCode: record.tctgcod,
      CompanyCode: record.tcmpcod,
      PurchaseRate: record.tpurrat,
      RetailRate: record.trtlrat,
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
      link.setAttribute("download", "item_Data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  function fetchItemData() {
    axios
      .post(ItemApiUrl, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setItemData(response.data);
        console.log("getting item api data:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const renderFilteredData = () => {
    let filteredData = getFilteredTableData();

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);

    // Slice the data to display only the items for the current page
    const currentPageData = filteredData.slice(startIndex, endIndex);

    return currentPageData.map((data, index) => (
      <tr key={startIndex + index + 1}>
        <td>{startIndex + index + 1}</td>
        <td>{data.titmcod}</td>
        <td>{data.titmdsc}</td>
        <td>{data.titmsts}</td>
        <td>{data.tctgcod}</td>
        <td>{data.tcmpcod}</td>
        <td>{data.tpurrat}</td>
        <td>{data.trtlrat}</td>
      </tr>
    ));
  };

  const getFilteredTableData = () => {
    let filteredData = itemData;

    if (filterOption === "Active") {
      filteredData = itemData.filter((data) => data.titmsts === "A");
    } else if (filterOption === "Non Active") {
      filteredData = itemData.filter((data) => data.titmsts !== "A");
    }

    return filteredData;
  };

  return (
    <>
      <PathHead pageName="Reports > Lists > Items List" />
      <Container className="p-3">
        {itemData.length > 0 && (
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
                    <th>Item Code</th>
                    <th>Item Description</th>
                    <th style={{ width: '20px' }}>Status</th>
                    <th style={{ width: '150px' }}>Category Code</th>
                    <th style={{ width: '150px' }}>Company Code</th>
                    <th>Purchase Rate</th>
                    <th>Retail Code</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {itemData.length > 0 && renderFilteredData()}
                </MDBTableBody>
              </MDBTable>
              <MDBPagination className="mt-3 mb-3 custom-pagination">
                <MDBPageItem disabled={currentPage === 1}>
                  <MDBPageNav
                    className="pagination-btn"
                    aria-label="Previous"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </MDBPageNav>
                </MDBPageItem>
                {Array.from({
                  length: Math.ceil(itemData.length / itemsPerPage),
                }).map((page, index) => (
                  <MDBPageItem
                    key={index}
                    active={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    <MDBPageNav>{index + 1}</MDBPageNav>
                  </MDBPageItem>
                ))}
                <MDBPageItem
                  disabled={
                    currentPage === Math.ceil(itemData.length / itemsPerPage)
                  }
                >
                  <MDBPageNav
                    className="pagination-btn"
                    aria-label="Next"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </MDBPageNav>
                </MDBPageItem>
              </MDBPagination>
            </Row>
          </div>
        )}
      </Container>
    </>
  );
}
