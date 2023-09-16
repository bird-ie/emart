import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { useAuth } from "../Auth";
import Sidebar from "./Sidebar";

export default function Menu() {
  const [menuData, setMenuData] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to manage sidebar visibility
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Call the logout function to clear user authentication
    navigate("/emart"); // Redirect to the login page after logout
  };

  const menuUrl =
    "https://www.crystalsolutions.com.pk/emart/web/get_usrmenu.php";

  useEffect(() => {
    fetchMenuData();
  }, []);

  function fetchMenuData() {
    const data = {
      userid: 74,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(menuUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setMenuData(response.data);
        console.log("Menu Data:", response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }

  const customLinks = {
    "1-01-00": "/store",
    "3-01-02": "/company",
    "4-26-00": "/capacity",
    "4-06-00": "/type",
    "3-01-03": "/category",
    "3-01-11": "/employee-list",
    "3-01-09": "/item",
    "4-03-00": "/user-list",
    "3-02-08": "/daily-sale",
    "4-10-00": "/daily-sale-detail",
    "4-14-00": "/monthly-cash-sale/",
    "4-15-00": "/monthly-credit-sale/",
    "4-19-00": "/monthly-total-sale/",
  };

  const nestedMenu = menuData.reduce((menu, item) => {
    const [topLevel, subMenu] = item.tmencod.split("-");
    if (!menu[topLevel]) {
      menu[topLevel] = {
        label: item.tmendsc,
        items: [],
      };
    }
    // Skip the first item in each dropdown
    if (subMenu !== "00") {
      menu[topLevel].items.push({
        label: item.tmendsc,
        to: customLinks[item.tmencod] || "#",
        disabled: item.tmenprm === "N",
      });
    }
    return menu;
  }, {});

  const hierarchicalMenuData = {};

  menuData.forEach((item) => {
    const [topLevel, middleLevel, subLevel] = item.tmencod.split("-");

    if (!hierarchicalMenuData[topLevel]) {
      hierarchicalMenuData[topLevel] = {
        label: item.tmendsc,
        items: [],
      };
    }

    if (!hierarchicalMenuData[topLevel].items[middleLevel]) {
      hierarchicalMenuData[topLevel].items[middleLevel] = {
        label: item.tmendsc,
        items: [],
      };
    }

    hierarchicalMenuData[topLevel].items[middleLevel].items.push({
      label: item.tmendsc,
      to: customLinks[item.tmencod] || "#",
      disabled: item.tmenprm === "N",
    });
  });

  const toggleSidebar = () => {
    console.log("Toggle sidebar clicked");
    setIsSidebarVisible(!isSidebarVisible);
  };

  const renderSubSubDropdown = (topLevel) => {
    const middleLevelItems = hierarchicalMenuData[topLevel].items;
  
    return Object.keys(middleLevelItems).map((middleLevel) => {
      const subSubItems = middleLevelItems[middleLevel].items;
  
      // Check if there are more than 1 sub-sub-items
      if (subSubItems.length > 1) {
        // Filter out the first sub-sub-item
        const filteredSubSubItems = subSubItems.slice(1);
  
        return (
          <Dropdown key={middleLevel} className="custom-dropdown-button dropend">
            <Dropdown.Toggle
              variant="transparent"
              id={`dropdown-${topLevel}-${middleLevel}`}
              className="sub-dropdown-toggle "
            >
              {middleLevelItems[middleLevel].label}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {filteredSubSubItems.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  as={item.to !== "#" ? Link : undefined}
                  to={item.to}
                  disabled={item.disabled}
                  className="sub-dropdown-item"
                >
                  {item.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        );
      } else {
        // If there's only 1 sub-sub-item, render it as a regular dropdown item
        return middleLevelItems[middleLevel].items.map((item, index) => (
          
          <Dropdown.Item
            key={index}
            as={item.to !== "#" ? Link : undefined}
            to={item.to}
            disabled={item.disabled}
            className="custom-dropdown-item"
          >
            {item.label}
          </Dropdown.Item>
        ));
      }
    });
  };
  
  

  return (
    <>
      <Navbar
        style={{ backgroundColor: "var(--accent-color)" }}
        expand="lg"
        className="p-2"
      >
        <Navbar.Brand href="/emart/dashboard"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="gap-2">
          <Nav className="mr-auto">
            {Object.keys(hierarchicalMenuData).map((topLevel) => (
              <Dropdown key={topLevel} className="custom-dropdown-button">
                <Dropdown.Toggle
                  variant="transparent"
                  id={`dropdown-${topLevel}`}
                  
                >
                  {hierarchicalMenuData[topLevel].label}
                </Dropdown.Toggle>
                <Dropdown.Menu>{renderSubSubDropdown(topLevel)}</Dropdown.Menu>
              </Dropdown>
            ))}
          </Nav>
          <Button
            variant="danger"
            className="d-flex justify-self-end"
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Button onClick={toggleSidebar} variant="secondary">Sidebar</Button>
        </Navbar.Collapse>
      </Navbar>
      <Sidebar isVisible={isSidebarVisible} />
    </>
  );
}
