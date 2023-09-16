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

export default function UserList() {
  const [userData, setUserData] = useState([]);
  const [filterOption, setFilterOption] = useState("all");

  const userApiUrl =
    "https://www.crystalsolutions.com.pk/emart/web/UserList.php";

  useEffect(() => {
    fetchUserData();
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
      { header: "User Code", dataKey: "tusrcod" },
      { header: "User Name", dataKey: "tusrnam" },
      { header: "User Type", dataKey: "tusrtyp" },
      { header: "Mobile No.", dataKey: "tmobnum" },
      { header: "Status", dataKey: "tusrsts" },
    ];
    const tableData = filteredTableData.map((record, index) => ({
      index: index + 1,
      tusrcod: record.tusrcod,
      tusrnam: record.tusrnam,
      tusrtyp: record.tusrtyp,
      tmobnum: record.tmobnum,
      tusrsts: record.tusrsts,
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

    doc.save("user_data.pdf");
  };

  const downloadCSV = () => {
    const filteredTableData = getFilteredTableData();

    if (filteredTableData.length === 0) {
      alert("No data to download CSV for the selected filter.");
      return;
    }

    const csvData = filteredTableData.map((record, index) => ({
      "#": index + 1,
      UserCode: record.tusrcod,
      UserName: record.tusrnam,
      UserType: record.tusrtyp,
      MobileNo: record.tmobnum,
      Status: record.tusrsts,
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
      link.setAttribute("download", "user_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  function fetchUserData() {
    axios
      .post(userApiUrl, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setUserData(response.data);
        console.log("getting user api data:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const renderFilteredData = () => {
    let filteredData = userData;

    if (filterOption === "Active") {
      filteredData = userData.filter((data) => data.tusrtyp === "A");
    } else if (filterOption === "Non Active") {
      filteredData = userData.filter((data) => data.tusrtyp !== "A");
    }

    return filteredData.map((data, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.tusrcod}</td>
        <td>{data.tusrnam}</td>
        <td>{data.tusrtyp}</td>
        <td>{data.tmobnum}</td>
        <td>{data.tusrsts}</td>
      </tr>
    ));
  };

  const getFilteredTableData = () => {
    let filteredData = userData;

    if (filterOption === "Active") {
      filteredData = userData.filter((data) => data.tusrtyp === "A");
    } else if (filterOption === "Non Active") {
      filteredData = userData.filter((data) => data.tusrtyp !== "A");
    }

    return filteredData;
  };

  return (
    <>
      <PathHead pageName="Reports > Lists > user List" />
      <Container className="p-3">
        {userData.length > 0 && (
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
                    <th style={{ width: "20px" }}>#</th>
                    <th style={{ width: "20px" }}>User Code</th>
                    <th>User Name</th>
                    <th>User Type</th>
                    <th>Mobile No.</th>
                    <th style={{ width: "20px" }}>Status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {userData.length > 0 && renderFilteredData()}
                </MDBTableBody>
              </MDBTable>
            </Row>
          </div>
        )}
      </Container>
    </>
  );
}
