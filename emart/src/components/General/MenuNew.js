import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Auth";

function NavBar() {

  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const [getUser, setUser] = useState();
  // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check if the user is logged in
  const { isLoggedIn, userData } = useAuth();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      fetchMenuItems(userData.id); // Fetch menu items based on user ID from userData
      console.log("user id is", userData.id);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);

  function fetchMenuItems(userID) {
    const apiUrl = "https://www.crystalsolutions.com.pk/csres/get_usrmenu.php";
    const data = {
      userid: '33',
      password: '7549'
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(apiUrl, formData)
      .then((response) => {
        setMenuItems(response.data);
        console.log("object is ", response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }
  const handleMenuItemClick = (menuItem) => {
    const routeMapping = {
        "3-02-01": "/store",
        "3-02-02": "/company",
        "3-02-04": "/capacity",
        "3-02-05": "/type",
        "3-02-08": "/category",
        "3-02-10": "/employee-list",
        "3-02-11": "/item",
        "3-02-12": "/user-list",
        "3-02-13": "/daily-sale",
        "4-10-00": "/daily-sale-detail",
        "4-14-00": "/monthly-cash-sale/",
        "4-15-00": "/monthly-credit-sale/",
        "4-19-00": "/monthly-total-sale/",
    };

    const route = routeMapping[menuItem.tmencod];
    if (route) {
      navigate(route);
    }
  };

  function handleMouseEnter(e) {
    e.target.style.backgroundColor = "rgba(247, 255, 249, 0.9)";
    e.target.style.color = "black";
  }

  function handleMouseLeave(e) {
    e.target.style.backgroundColor = "";
    e.target.style.color = "black";
  }

  function getMenuItemStyle(item) {
    return {
      fontSize: "12px",
      height: "16px",
      width: "200px",
      backgroundColor: "white",
      color: "black",
      padding: "0 20px",
      margin: "5px 0",
      display: "block",
      pointerEvents: item.tmenprm === "Y" ? "auto" : "none",
      opacity: item.tmenprm === "Y" ? 1 : 0.6,
    };
  }
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="" // Use a dark variant for better contrast
      className="custom-navbar" // Add your custom class for styling
      style={{
        paddingRight: "190px ",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <Container>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setShowNavbar(!showNavbar)}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={showNavbar ? "show" : ""}
        >
          <Nav className="me-auto justify-content-start">
            {menuItems.map((item) => {
              if (item.tmencod === "1-00-00") {
                return (
                  <NavDropdown
                    key={item.tmencod}
                    className="Dropdown_1 mr-3"
                    title={item.tmendsc.trim()}
                    id="collasible-nav-dropdown"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {menuItems.map((subItem) => {
                      if (subItem.tmencod === "1-09-00") {
                        const isEnabled = subItem.tmenprm === "Y";
                        const itemStyle = getMenuItemStyle(subItem);
                        return (
                          <NavDropdown
                            key={subItem.tmencod}
                            className="SubDropdown_1 mr-3 dropend"
                            title={subItem.tmendsc.trim()}
                            id="sub-collasible-nav-dropdown"
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor =
                                "rgba(255, 255, 255, 0.1)";
                              e.target.style.color = "black";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "";
                              e.target.style.color = "black";
                            }}
                            style={{
                              height: "20px",
                              marginTop: "-10px",
                              marginBottom: "10px",
                              fontSize: "14px",
                              marginLeft: "10px",
                            }}
                          >
                            {menuItems.map((subSubItem) => {
                              if (
                                subSubItem.tmencod === "1-09-01" ||
                                subSubItem.tmencod === "1-09-02" ||
                                subSubItem.tmencod === "1-09-03" ||
                                subSubItem.tmencod === "1-09-04" ||
                                subSubItem.tmencod === "1-09-05" ||
                                subSubItem.tmencod === "1-09-06"
                              ) {
                                const isEnabled = subItem.tmenprm === "Y";
                                const itemStyle = getMenuItemStyle(subItem);
                                return (
                                  <NavDropdown.Item
                                    onClick={() =>
                                      handleMenuItemClick(subSubItem)
                                    }
                                    key={subSubItem.tmencod}
                                    href={subSubItem.tmenurl}
                                    style={itemStyle}
                                    onMouseEnter={(e) => {
                                      e.target.style.backgroundColor =
                                        '#f58634';
                                      e.target.style.color = '#000000';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.backgroundColor = "";
                                      e.target.style.color = "";
                                    }}
                                  >
                                    {subSubItem.tmendsc.trim()}
                                  </NavDropdown.Item>
                                );
                              }

                              return null;
                            })}
                          </NavDropdown>
                        );
                      } else if (
                        subItem.tmencod === "1-01-00" ||
                        subItem.tmencod === "1-03-00" ||
                        subItem.tmencod === "1-05-00" ||
                        subItem.tmencod === "1-07-00" ||
                        subItem.tmencod === "1-10-00" ||
                        subItem.tmencod === "1-12-00" ||
                        subItem.tmencod === "1-14-00"
                      ) {
                        const itemStyle = getMenuItemStyle(subItem);

                        return (
                          <Nav.Link
                            key={subItem.tmencod}
                            href={subItem.tmenurl}
                            onClick={() => handleMenuItemClick(subItem)}
                            style={itemStyle}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#f58634';
                              e.target.style.color = '#000000';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "";
                              e.target.style.color = "";
                            }}
                            // style={{ height:'25px',fontSize:'14px',padding:'5px'}}
                          >
                            {subItem.tmendsc.trim()}
                          </Nav.Link>
                        );
                      }
                    })}
                  </NavDropdown>
                );
              }
              return null;
            })}

            {menuItems.map((item) => {
              if (item.tmenprm === "Y") {
                if (item.tmencod === "2-00-00") {
                  const subItems = menuItems.filter(
                    (subItem) =>
                      subItem.tmencod.startsWith("2-") &&
                      subItem.tmencod !== "2-00-00"
                  );

                  return (
                    <NavDropdown
                      key={item.tmencod}
                      className="Dropdown_1 mr-3"
                      title={item.tmendsc.trim()}
                      id="collapsible-nav-dropdown"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {subItems.map((subItem) => {
                        const isEnabled = subItem.tmenprm === "Y";
                        const itemStyle = getMenuItemStyle(subItem);

                        return (
                          <NavDropdown.Item
                            key={subItem.tmencod}
                            href={subItem.tmenurl}
                            style={itemStyle}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#f58634';
                              e.target.style.color = '#000000';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "";
                              e.target.style.color = "";
                            }}
                            onClick={() => handleMenuItemClick(subItem)}
                          >
                            {subItem.tmendsc.trim()}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                  );
                }
                return null;
              }
              return null;
            })}

            {menuItems.map((item) => {
              if (item.tmencod === "3-00-00") {
                return (
                  <NavDropdown
                    key={item.tmencod}
                    className="Dropdown_1 mr-3"
                    title={item.tmendsc.trim()}
                    id="collasible-nav-dropdown"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor =
                        "rgba(247, 255, 249, 0.9)";
                      e.target.style.color = "black";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "";
                      e.target.style.color = "black";
                    }}
                  >
                    {menuItems.map((subItem) => {
                      if (subItem.tmencod === "3-01-00") {
                        return (
                          <NavDropdown
                            key={subItem.tmencod}
                            className="SubDropdown_1 mr-3 dropend"
                            title={subItem.tmendsc.trim()}
                            id="sub-collasible-nav-dropdown"
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.color = "black";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "";
                              e.target.style.color = "black";
                            }}
                            style={{
                              marginLeft: "15px",
                              fontSize: "14px",
                              height: "30px",
                            }}
                          >
                            {menuItems.map((subSubItem) => {
                              if (
                                subSubItem.tmencod === "3-01-01" ||
                                subSubItem.tmencod === "3-01-02" ||
                                subSubItem.tmencod === "3-01-03" ||
                                subSubItem.tmencod === "3-01-04" ||
                                subSubItem.tmencod === "3-01-05" ||
                                subSubItem.tmencod === "3-01-07" ||
                                subSubItem.tmencod === "3-01-09" ||
                                subSubItem.tmencod === "3-01-12"
                              ) {
                                return (
                                  <NavDropdown.Item
                                    key={subSubItem.tmencod}
                                    href={subSubItem.tmenurl}
                                    style={{
                                      fontSize: "14px",
                                      height: "20px",
                                      backgroundColor: "white",
                                      color: "black",
                                      padding: "1px 20px",
                                      margin: "5px 0",
                                      display: "block",
                                      pointerEvents:
                                        subSubItem.tmenprm === "Y"
                                          ? "auto"
                                          : "none", // Enable or disable item based on permission
                                      opacity:
                                        subSubItem.tmenprm === "Y" ? 1 : 0.6, // Adjust opacity for disabled items
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.backgroundColor =
                                        '#f58634';
                                      e.target.style.color = '#000000';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.backgroundColor = "";
                                      e.target.style.color = "";
                                    }}
                                  >
                                    {subSubItem.tmendsc.trim()}
                                  </NavDropdown.Item>
                                );
                              }

                              return null;
                            })}
                          </NavDropdown>
                        );
                      } else if (subItem.tmencod === "3-02-00") {
                        return (
                          <NavDropdown
                            key={subItem.tmencod}
                            className="SubDropdown_1 mr-3 dropend"
                            title={subItem.tmendsc.trim()}
                            id="sub-collasible-nav-dropdown"
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.color = "black";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "";
                              e.target.style.color = "black";
                            }}
                            style={{
                              marginLeft: "15px",
                              fontSize: "14px",
                              height: "30px",
                            }}
                          >
                            {menuItems.map((subSubItem) => {
                              if (
                                subSubItem.tmencod === "3-02-01" ||
                                subSubItem.tmencod === "3-02-02" ||
                                subSubItem.tmencod === "3-02-04" ||
                                subSubItem.tmencod === "3-02-05" ||
                                subSubItem.tmencod === "3-02-07" ||
                                subSubItem.tmencod === "3-02-08" ||
                                subSubItem.tmencod === "3-02-10" ||
                                subSubItem.tmencod === "3-02-11" ||
                                subSubItem.tmencod === "3-02-13" ||
                                subSubItem.tmencod === "3-02-14" ||
                                subSubItem.tmencod === "3-02-15"
                              ) {
                                return (
                                  <NavDropdown.Item
                                    key={subSubItem.tmencod}
                                    href={subSubItem.tmenurl}
                                    style={{
                                      fontSize: "14px",
                                      height: "20px",
                                      backgroundColor: "white",
                                      color: "black",
                                      padding: "1px 20px",
                                      margin: "5px 0",
                                      display: "block",
                                      pointerEvents:
                                        subSubItem.tmenprm === "Y"
                                          ? "auto"
                                          : "none", // Enable or disable item based on permission
                                      opacity:
                                        subSubItem.tmenprm === "Y" ? 1 : 0.6, // Adjust opacity for disabled items
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.backgroundColor =
                                        '#f58634';
                                      e.target.style.color = '#000000';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.backgroundColor = "";
                                      e.target.style.color = "";
                                    }}
                                  >
                                    {subSubItem.tmendsc.trim()}
                                  </NavDropdown.Item>
                                );
                              }

                              return null;
                            })}
                          </NavDropdown>
                        );
                      } else if (subItem.tmencod === "3-03-00") {
                        return (
                          <NavDropdown
                            key={subItem.tmencod}
                            className="SubDropdown_1 mr-3 dropend"
                            title={subItem.tmendsc.trim()}
                            id="sub-collasible-nav-dropdown"
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.color = "black";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "";
                              e.target.style.color = "black";
                            }}
                            style={{
                              marginLeft: "15px",
                              fontSize: "14px",
                              height: "30px",
                            }}
                          >
                            {menuItems.map((subSubItem) => {
                              if (
                                subSubItem.tmencod === "3-03-01" ||
                                subSubItem.tmencod === "3-03-03" ||
                                subSubItem.tmencod === "3-03-05" ||
                                subSubItem.tmencod === "3-03-06" ||
                                subSubItem.tmencod === "3-03-11"
                              ) {
                                return (
                                  <NavDropdown.Item
                                    key={subSubItem.tmencod}
                                    href={subSubItem.tmenurl}
                                    style={{
                                      fontSize: "14px",
                                      height: "20px",
                                      backgroundColor: "white",
                                      color: "black",
                                      padding: "1px 20px",
                                      margin: "5px 0",
                                      display: "block",
                                      pointerEvents:
                                        subSubItem.tmenprm === "Y"
                                          ? "auto"
                                          : "none", // Enable or disable item based on permission
                                      opacity:
                                        subSubItem.tmenprm === "Y" ? 1 : 0.6, // Adjust opacity for disabled items
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.backgroundColor =
                                        '#f58634';
                                      e.target.style.color = '#000000';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.backgroundColor = "";
                                      e.target.style.color = "";
                                    }}
                                  >
                                    {subSubItem.tmendsc.trim()}
                                  </NavDropdown.Item>
                                );
                              }

                              return null;
                            })}
                          </NavDropdown>
                        );
                      } else if (subItem.tmencod === "3-04-00") {
                        return (
                          <NavDropdown
                            key={subItem.tmencod}
                            className="SubDropdown_1 mr-3 dropend"
                            title={subItem.tmendsc.trim()}
                            id="sub-collasible-nav-dropdown"
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.color = "black";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "";
                              e.target.style.color = "black";
                            }}
                            style={{
                              marginLeft: "15px",
                              fontSize: "14px",
                              height: "30px",
                            }}
                          >
                            {menuItems.map((subSubItem) => {
                              if (
                                subSubItem.tmencod === "3-04-01" ||
                                subSubItem.tmencod === "3-04-02" ||
                                subSubItem.tmencod === "3-04-04" ||
                                subSubItem.tmencod === "3-04-05" ||
                                subSubItem.tmencod === "3-04-07" ||
                                subSubItem.tmencod === "3-04-08" ||
                                subSubItem.tmencod === "3-04-09" ||
                                subSubItem.tmencod === "3-04-10" ||
                                subSubItem.tmencod === "3-04-12" ||
                                subSubItem.tmencod === "3-04-13" ||
                                subSubItem.tmencod === "3-04-15" ||
                                subSubItem.tmencod === "3-04-16"
                              ) {
                                return (
                                  <NavDropdown.Item
                                    key={subSubItem.tmencod}
                                    href={subSubItem.tmenurl}
                                    style={{
                                      fontSize: "14px",
                                      height: "20px",
                                      backgroundColor: "white",
                                      color: "black",
                                      padding: "1px 20px",
                                      margin: "5px 0",
                                      display: "block",
                                      pointerEvents:
                                        subSubItem.tmenprm === "Y"
                                          ? "auto"
                                          : "none", // Enable or disable item based on permission
                                      opacity:
                                        subSubItem.tmenprm === "Y" ? 1 : 0.6, // Adjust opacity for disabled items
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.backgroundColor =
                                        '#f58634';
                                      e.target.style.color = '#000000';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.backgroundColor = "";
                                      e.target.style.color = "";
                                    }}
                                  >
                                    {subSubItem.tmendsc.trim()}
                                  </NavDropdown.Item>
                                );
                              }

                              return null;
                            })}
                          </NavDropdown>
                        );
                      } else if (subItem.tmencod === "3-05-00") {
                        return (
                          <NavDropdown
                            key={subItem.tmencod}
                            className="SubDropdown_1 mr-3 dropend"
                            title={subItem.tmendsc.trim()}
                            id="sub-collasible-nav-dropdown"
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.color = "black";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "";
                              e.target.style.color = "black";
                            }}
                            style={{
                              marginLeft: "15px",
                              fontSize: "14px",
                              height: "30px",
                            }}
                          >
                            {menuItems.map((subSubItem) => {
                              if (
                                subSubItem.tmencod === "3-05-01" ||
                                subSubItem.tmencod === "3-05-02" ||
                                subSubItem.tmencod === "3-05-03" ||
                                subSubItem.tmencod === "3-05-05" ||
                                subSubItem.tmencod === "3-05-06" ||
                                subSubItem.tmencod === "3-05-08" ||
                                subSubItem.tmencod === "3-05-09" ||
                                subSubItem.tmencod === "3-05-11" ||
                                subSubItem.tmencod === "3-05-12" ||
                                subSubItem.tmencod === "3-05-14" ||
                                subSubItem.tmencod === "3-05-15"
                              ) {
                                return (
                                  <NavDropdown.Item
                                    key={subSubItem.tmencod}
                                    href={subSubItem.tmenurl}
                                    style={{
                                      fontSize: "14px",
                                      height: "20px",
                                      backgroundColor: "white",
                                      color: "black",
                                      padding: "1px 20px",
                                      margin: "5px 0",
                                      display: "block",
                                      pointerEvents:
                                        subSubItem.tmenprm === "Y"
                                          ? "auto"
                                          : "none", // Enable or disable item based on permission
                                      opacity:
                                        subSubItem.tmenprm === "Y" ? 1 : 0.6, // Adjust opacity for disabled items
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.backgroundColor =
                                        '#f58634';
                                      e.target.style.color = '#000000';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.backgroundColor = "";
                                      e.target.style.color = "";
                                    }}
                                  >
                                    {subSubItem.tmendsc.trim()}
                                  </NavDropdown.Item>
                                );
                              }

                              return null;
                            })}
                          </NavDropdown>
                        );
                      } else if (subItem.tmencod === "3-06-00") {
                        return (
                          <NavDropdown
                            key={subItem.tmencod}
                            className="SubDropdown_1 mr-3 dropend"
                            title={subItem.tmendsc.trim()}
                            id="sub-collasible-nav-dropdown"
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.color = "black";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "";
                              e.target.style.color = "black";
                            }}
                            style={{
                              marginLeft: "15px",
                              fontSize: "14px",
                              height: "30px",
                            }}
                          >
                            {menuItems.map((subSubItem) => {
                              if (
                                subSubItem.tmencod === "3-06-01" ||
                                subSubItem.tmencod === "3-06-02" ||
                                subSubItem.tmencod === "3-06-04" ||
                                subSubItem.tmencod === "3-06-05" ||
                                subSubItem.tmencod === "3-06-07" ||
                                subSubItem.tmencod === "3-06-8" ||
                                subSubItem.tmencod === "3-06-10" ||
                                subSubItem.tmencod === "3-06-14" ||
                                subSubItem.tmencod === "3-06-16" ||
                                subSubItem.tmencod === "3-06-18"
                              ) {
                                return (
                                  <NavDropdown.Item
                                    key={subSubItem.tmencod}
                                    href={subSubItem.tmenurl}
                                    style={{
                                      fontSize: "14px",
                                      height: "20px",
                                      backgroundColor: "white",
                                      color: "black",
                                      padding: "1px 20px",
                                      margin: "5px 0",
                                      display: "block",
                                      pointerEvents:
                                        subSubItem.tmenprm === "Y"
                                          ? "auto"
                                          : "none", // Enable or disable item based on permission
                                      opacity:
                                        subSubItem.tmenprm === "Y" ? 1 : 0.6, // Adjust opacity for disabled items
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.backgroundColor =
                                        '#f58634';
                                      e.target.style.color = '#000000';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.backgroundColor = "";
                                      e.target.style.color = "";
                                    }}
                                  >
                                    {subSubItem.tmendsc.trim()}
                                  </NavDropdown.Item>
                                );
                              }

                              return null;
                            })}
                          </NavDropdown>
                        );
                      } else if (subItem.tmencod === "3-07-00") {
                        return (
                          <NavDropdown
                            key={subItem.tmencod}
                            className="SubDropdown_1 mr-3 dropend"
                            title={subItem.tmendsc.trim()}
                            id="sub-collasible-nav-dropdown"
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.color = "black";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "";
                              e.target.style.color = "black";
                            }}
                            style={{
                              marginLeft: "15px",
                              fontSize: "14px",
                              height: "35px",
                            }}
                          >
                            {menuItems.map((subSubItem) => {
                              if (
                                subSubItem.tmencod === "3-07-01" ||
                                subSubItem.tmencod === "3-07-03" ||
                                subSubItem.tmencod === "3-07-04" ||
                                subSubItem.tmencod === "3-07-05" ||
                                subSubItem.tmencod === "3-07-07" ||
                                subSubItem.tmencod === "3-07-08" ||
                                subSubItem.tmencod === "3-07-09" ||
                                subSubItem.tmencod === "3-07-10" ||
                                subSubItem.tmencod === "3-07-11" ||
                                subSubItem.tmencod === "3-07-12" ||
                                subSubItem.tmencod === "3-07-14" ||
                                subSubItem.tmencod === "3-07-15" ||
                                subSubItem.tmencod === "3-07-17 " ||
                                subSubItem.tmencod === "3-07-18" ||
                                subSubItem.tmencod === "3-07-20" ||
                                subSubItem.tmencod === "3-07-22" ||
                                subSubItem.tmencod === "3-07-23" ||
                                subSubItem.tmencod === "3-07-25" ||
                                subSubItem.tmencod === "3-07-27" ||
                                subSubItem.tmencod === "3-07-28" ||
                                subSubItem.tmencod === "3-07-30" ||
                                subSubItem.tmencod === "3-07-31"
                              ) {
                                const itemStyle = getMenuItemStyle(subItem);

                                return (
                                  <NavDropdown.Item
                                    key={subSubItem.tmencod}
                                    href={subSubItem.tmenurl}
                                    style={{
                                      fontSize: "9px",
                                      height: "20px",
                                      backgroundColor: "white",
                                      color: "black",
                                      padding: "5px 20px",
                                      margin: "5px 0",
                                      display: "block",
                                      pointerEvents:
                                        subSubItem.tmenprm === "Y"
                                          ? "auto"
                                          : "none", // Enable or disable item based on permission
                                      opacity:
                                        subSubItem.tmenprm === "Y" ? 1 : 0.6, // Adjust opacity for disabled items
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.backgroundColor =
                                        '#f58634';
                                      e.target.style.color = '#000000';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.backgroundColor = "";
                                      e.target.style.color = "";
                                    }}
                                  >
                                    {subSubItem.tmendsc.trim()}
                                  </NavDropdown.Item>
                                );
                              }

                              return null;
                            })}
                          </NavDropdown>
                        );
                      } else if (
                        subItem.tmencod === "3-09-00" ||
                        subItem.tmencod === "3-10-00" ||
                        subItem.tmencod === "3-12-00" ||
                        subItem.tmencod === "3-13-00"
                      ) {
                        const itemStyle = getMenuItemStyle(subItem);

                        return (
                          <Nav.Link
                            key={subItem.tmencod}
                            href={subItem.tmenurl}
                            style={itemStyle}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#f58634';
                              e.target.style.color = '#000000';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "";
                              e.target.style.color = "";
                            }}
                          >
                            {subItem.tmendsc.trim()}
                          </Nav.Link>
                        );
                      }
                    })}
                  </NavDropdown>
                );
              }
              return null;
            })}

            {menuItems.map((item) => {
              if (item.tmenprm === "Y") {
                if (item.tmencod === "4-00-00") {
                  const subItems = menuItems.filter(
                    (subItem) =>
                      subItem.tmencod.startsWith("4-") &&
                      subItem.tmencod !== "4-00-00"
                  );

                  return (
                    <NavDropdown
                      key={item.tmencod}
                      className="Dropdown_1 mr-3"
                      title={item.tmendsc.trim()}
                      id="collapsible-nav-dropdown"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {subItems.map((subItem) => {
                        const isEnabled = subItem.tmenprm === "Y";
                        const itemStyle = getMenuItemStyle(subItem);

                        return (
                          <NavDropdown.Item
                            key={subItem.tmencod}
                            href={subItem.tmenurl}
                            style={itemStyle}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#f58634';
                              e.target.style.color = '#000000';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "";
                              e.target.style.color = "";
                            }}
                            onClick={() => handleMenuItemClick(subItem)}
                          >
                            {subItem.tmendsc.trim()}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                  );
                }
                return null;
              }
              return null;
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
