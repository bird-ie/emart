import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {} from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import './SidebarNew.css'

import moment from "moment";

const MAIN_MENU_CODE1 = "1-00-00";

const MAIN_MENU_CODE = "3-00-00";
const SUB_MENU_PREFIX = "3-";
const SUB_MENU_PREFIX1 = "1-";

const SideBar = () => {
  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem("user");

    // Redirect to the login page
    navigate("/login");
  };
  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      console.log("user id is", userData.userid); // Updated to access the 'id' property
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);
  const [getUser, setUser] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const handleMenuItemClick = (menuItem) => {
    const routeMapping = {
      "1-01-00": "/Get_Location",
      "1-05-00": "/Get_Item",
      "1-14-00": "/login",
      "1-09-01": "/Get_Area",
      "1-09-02": "/Get_Inquiry",
      "1-09-03": "/Get_Reference",
      "1-09-04": "/Get_Group",
      "1-09-05": "/Get_Collector",
      "1-07-00": "/Get_Employee",
      "1-09-06": "/Get_Customer",
      "4-03-00": "/UserManagement1",
      "4-01-00": "/GetCategory",
      "4-04-00": "/Get_Item",
      "4-06-00": "/ItemType",
      "4-10-00": "/GroupCode",
      "4-14-00": "/AccountCod",
    };

    const route = routeMapping[menuItem.tmencod];
    if (route) {
      navigate(route);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      fetchMenuItems(userData.id);
    } else {
      console.error("User data not available in local storage.");
    }
  }, []);

  const fetchMenuItems = (userID) => {
    const apiUrl = "https://www.crystalsolutions.com.pk/csres/get_usrmenu.php";
    const params = new URLSearchParams({ userid: userID });

    axios
      .post(apiUrl, params)
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const generateSubsubItems = (subItem, prefix) => {
    return menuItems.filter(
      (subsubItem) =>
        subsubItem.tmencod.startsWith(prefix) &&
        subsubItem.tmencod !== subItem.tmencod
    );
  };

  const renderSubMenu = (subItems) => {
    return subItems.map((subItem) => {
      let subsubItems = [];

      if (subItem.tmencod.startsWith("3-01")) {
        subsubItems = generateSubsubItems(subItem, "3-01");
      } else if (subItem.tmencod.startsWith("3-02")) {
        subsubItems = generateSubsubItems(subItem, "3-02");
      } else if (subItem.tmencod.startsWith("3-03")) {
        subsubItems = generateSubsubItems(subItem, "3-03");
      } else if (subItem.tmencod.startsWith("3-04")) {
        subsubItems = generateSubsubItems(subItem, "3-04");
      } else if (subItem.tmencod.startsWith("3-05")) {
        subsubItems = generateSubsubItems(subItem, "3-05");
      } else if (subItem.tmencod.startsWith("3-06")) {
        subsubItems = generateSubsubItems(subItem, "3-06");
      }
      // Add more conditions for other prefixes as needed

      return (
        <li key={subItem.tmencod}>
          <a
            style={{ color: "#000000", height: "1.7rem", fontSize: "12px" }}
            href={subItem.tmenurl}
            onClick={() => setSelectedSubMenu(subItem.tmencod)}
          >
            {subItem.tmendsc.trim()}
            {subsubItems.length > 0 && (
              <span style={{ marginLeft: "-13%" }}>&rsaquo;</span>
            )}
          </a>
          {subsubItems.length > 0 && subItem.tmencod === selectedSubMenu && (
            <ul
              className="dropdown"
              style={{
                width: "250px",
                left: "200px",
                backgroundColor: "#f58634",
              }}
            >
              {subsubItems.map((subsubItem) => (
                <li key={subsubItem.tmencod}>
                  <a
                    style={{
                      color: "#000000",
                      height: "1.7rem",
                      fontSize: "12px",
                    }}
                    href={subsubItem.tmenurl}
                  >
                    {subsubItem.tmendsc.trim()}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    });
  };

  const styleMenuItem = (subItem, onClickHandler) => {
    return (
      <li key={subItem.tmencod} onClick={() => handleMenuItemClick(subItem)}>
        <a
          style={{ color: "#000000", height: "1.8rem", fontSize: "12px" }}
          href={subItem.tmenurl}
          onClick={() => setSelectedSubMenu(subItem.tmencod)}
        >
          {subItem.tmendsc.trim()}
        </a>
      </li>
    );
  };
  const renderSubMenu1 = (subItems) => {
    return subItems.map((subItem) => {
      const subsubItems = menuItems.filter(
        (subsubItem) =>
          subsubItem.tmencod.startsWith("1-09") &&
          subsubItem.tmencod !== subItem.tmencod
      );

      if (subItem.tmencod === "1-09-00") {
        return (
          <li key={subItem.tmencod}>
            <a
              style={{ color: "#000000", height: "1.8rem", fontSize: "12px" }}
              href={subItem.tmenurl}
              onClick={() => setSelectedSubMenu(subItem.tmencod)}
            >
              {subItem.tmendsc.trim()}
              <span style={{ marginLeft: "-13%" }}>&rsaquo;</span>
            </a>
            {subsubItems.length > 0 && subItem.tmencod === selectedSubMenu && (
              <ul
                className="dropdown"
                style={{
                  width: "200px",
                  left: "200px",
                  backgroundColor: "#f58634",
                }}
              >
                {subsubItems.map((subsubItem) =>
                  styleMenuItem(subsubItem, handleMenuItemClick)
                )}
              </ul>
            )}
          </li>
        );
      } else if (subItem.tmencod === "1-01-00") {
        return styleMenuItem(subItem, handleMenuItemClick);
      } else if (subItem.tmencod === "1-03-00") {
        return styleMenuItem(subItem, handleMenuItemClick);
      } else if (subItem.tmencod === "1-05-00") {
        return styleMenuItem(subItem, handleMenuItemClick);
      } else if (subItem.tmencod === "1-07-00") {
        return styleMenuItem(subItem, handleMenuItemClick);
      } else if (subItem.tmencod === "1-10-00") {
        return styleMenuItem(subItem, handleMenuItemClick);
      } else if (subItem.tmencod === "1-12-00") {
        return styleMenuItem(subItem, handleMenuItemClick);
      } else if (subItem.tmencod === "1-14-00") {
        return styleMenuItem(subItem, handleMenuItemClick);
      }
      // Add more conditions for other subItem.tmencod values here

      return null;
    });
  };

  return (
    <div
      className="header"
      style={{ backgroundColor: "#f58634", borderBottom: "3px solid red" }}
    >
      <button className="toggle-button" onClick={handleToggle}>
        <span
          className="toggle-button__bar"
          style={{ backgroundColor: "#000000" }}
        ></span>
        <span
          className="toggle-button__bar"
          style={{ backgroundColor: "#000000" }}
        ></span>
        <span
          className="toggle-button__bar"
          style={{ backgroundColor: "#000000" }}
        ></span>
      </button>

      <div style={{ textAlign: "left" }}>
        <h1
          style={{
            fontSize: "40px",
            margin: "0",
            color: "#000000",
            paddingRight: "800px",
          }}
        >
          Emart
        </h1>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h5
          style={{
            fontSize: "14px",
            margin: "0",
            marginRight: "20px",
            color: "#000000",
          }}
        >
          {moment().format("L")}
        </h5>
        <div className="btn-group">
          <button
            className="btn"
            style={{ fontSize: "14px", color: "#000000" }}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          <ul className="dropdown-menu dropdown-menu-left">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#f58634";
                  e.target.style.color = "#000000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "";
                  e.target.style.color = "";
                }}
              >
                {getUser && getUser.tusrid}
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#f58634";
                  e.target.style.color = "#000000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "";
                  e.target.style.color = "";
                }}
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
        style={{ backgroundColor: "#f58634" }}
      >
        <ul className="sidebar__list">
          {menuItems.map((item) => {
            if (item.tmencod === MAIN_MENU_CODE1) {
              const subItems = menuItems.filter(
                (subItem) =>
                  subItem.tmencod.startsWith(SUB_MENU_PREFIX1) &&
                  subItem.tmencod.endsWith("-00") &&
                  subItem.tmencod !== MAIN_MENU_CODE1
              );

              return (
                <li key={item.tmencod} className="sidebar__list-item1">
                  <a href="#" style={{ color: "#000000" }}>
                    {item.tmendsc.trim()}
                    <span>&rsaquo;</span>
                  </a>
                  <ul
                    className="dropdown"
                    style={{ width: "200px", backgroundColor: "#f58634" }}
                  >
                    {renderSubMenu1(subItems)}
                  </ul>
                </li>
              );
            }

            return null;
          })}

          {menuItems.map((item) => {
            if (item.tmencod === "2-00-00") {
              // Find sub-items for the main menu item
              const subItems = menuItems.filter(
                (subItem) =>
                  subItem.tmencod.startsWith("2-") &&
                  subItem.tmencod !== "2-00-00"
              );

              return (
                <li
                  key={item.tmencod}
                  className="sidebar__list-item1"
                  style={{ backgroundColor: "#f58634" }}
                >
                  <a href="#" style={{ color: "#000000" }}>
                    {item.tmendsc.trim()}
                    <span>&rsaquo;</span>
                  </a>
                  <ul
                    className="dropdown"
                    style={{
                      width: "250px",
                      left: "250px",
                      backgroundColor: "#f58634",
                    }}
                  >
                    {subItems.map((subItem) => (
                      <li key={subItem.tmencod}>
                        <a
                          style={{
                            color: "#000000",
                            height: "1.7rem",
                            fontSize: "12px",
                          }}
                          href={subItem.tmenurl}
                        >
                          {subItem.tmendsc.trim()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            return null;
          })}

          {menuItems.map((item) => {
            if (item.tmencod === MAIN_MENU_CODE) {
              const subItems = menuItems.filter(
                (subItem) =>
                  subItem.tmencod.startsWith(SUB_MENU_PREFIX) &&
                  subItem.tmencod.endsWith("-00") &&
                  subItem.tmencod !== MAIN_MENU_CODE
              );

              return (
                <li key={item.tmencod} className="sidebar__list-item1">
                  <a
                    href="#"
                    style={{ color: "#000000" }}
                    onClick={() => setSelectedSubMenu(null)}
                  >
                    {item.tmendsc.trim()}
                    <span>&rsaquo;</span>
                  </a>
                  <ul
                    className="dropdown"
                    style={{
                      width: "200px",
                      left: "250px",
                      backgroundColor: "#f58634",
                    }}
                  >
                    {renderSubMenu(subItems)}
                  </ul>
                </li>
              );
            }

            return null;
          })}

          {menuItems.map((item) => {
            if (item.tmencod === "4-00-00") {
              // Find sub-items for the main menu item
              const subItems = menuItems.filter(
                (subItem) =>
                  subItem.tmencod.startsWith("4-") &&
                  subItem.tmencod !== "4-00-00"
              );

              return (
                <li key={item.tmencod} className="sidebar__list-item1">
                  <a href="#" style={{ color: "#000000" }}>
                    {item.tmendsc.trim()}
                    <span>&rsaquo;</span>
                  </a>
                  <ul
                    className="dropdown"
                    style={{
                      width: "250px",
                      left: "250px",
                      backgroundColor: "#f58634",
                    }}
                  >
                    {subItems.map((subItem) => (
                      <li key={subItem.tmencod}>
                        <a
                          style={{
                            color: "#000000",
                            height: "1.7rem",
                            fontSize: "12px",
                          }}
                          href={subItem.tmenurl}
                        >
                          {subItem.tmendsc.trim()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
