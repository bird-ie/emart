// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button, DropdownButton, Dropdown, Nav, Navbar } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Auth";
// import "../../App.css";

// export default function Menu() {
//   const [menuData, setMenuData] = useState([]);
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//     useEffect(() => {
//       // Check if the user is authenticated
//       if (!user) {
//         // If not authenticated, navigate to the login page
//         navigate("/emart"); // You can adjust the login URL as needed
//       } else {
//         // Fetch employee data if the user is authenticated
//         fetchMenuData();
//       }
//     }, [navigate, user]);

//   const menuUrl = "https://www.crystalsolutions.com.pk/emart/web/get_usrmenu.php";

//   useEffect(() => {
//     fetchMenuData();
//   }, []);

//   function fetchMenuData() {
//     const data = {
//       userid: 74,
//     };
//     const formData = new URLSearchParams(data).toString();

//     axios
//       .post(menuUrl, formData, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       })
//       .then((response) => {
//         setMenuData(response.data);
//         console.log("Menu Data:", response.data);
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//       });
//   }

//   const customLinks = {
//   "1-01-00": "/store",
//   "1-09-00": "/company",
//   "4-26-00": "/capacity",
//   "4-06-00": "/type",
//   "3-01-03": "/category",
//   "4-01-00": "/employee-list",
//   "4-18-00": "/item",
//   "4-03-00": "/user-list",
//   "4-04-00": "/daily-sale",
//   "4-10-00": "/daily-sale-detail"
// };

//   // Group menu items by the first digit of tmencod and store the first label in each group
//   const groupedMenu = menuData.reduce((groups, item) => {
//     const groupKey = item.tmencod.charAt(0);
//     if (!groups[groupKey]) {
//       groups[groupKey] = {
//         label: item.tmendsc,
//         items: [],
//       };
//     }
//     groups[groupKey].items.push(item);
//     return groups;
//   }, {});


//   // // Function to handle user logout
//   // const handleLogout = () => {
//   //   // Clear user session or token (example using localStorage)
//   //   localStorage.removeItem("user"); // Replace with your actual storage mechanism

//   //   // Redirect the user to the login page
//   //   navigate("/emart"); // Navigate to the login page
//   // };


//   const handleLogout = () => {
//     logout();
//     navigate("/emart"); // Redirect to the login page after logout
//   };


//   return (
//     <Navbar style={{ backgroundColor: "var(--accent-color)" }} expand="lg" className="p-2">
//       <Navbar.Brand href="/emart/dashboard">Crystal Solutions</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav" className="gap-2">
//         <Nav className="mr-auto">
//           {Object.keys(groupedMenu).map((groupKey) => (
//             <Nav.Item key={groupKey}>
//               <DropdownButton
//                 id={`dropdown-${groupKey}`}
//                 title={groupedMenu[groupKey].label}
//                 className="custom-dropdown-button"
//               >
//                 {groupedMenu[groupKey].items.map((item, index) => (
//                   <Dropdown.Item
//                     key={item.tmencod}
//                     as={item.tmencod ? Link : undefined}
//                     to={customLinks[item.tmencod] || "#"}
//                     disabled={item.tmenprm === "N"}
//                     className={`custom-dropdown-item ${index === 0 ? 'first-item' : ''}`}
//                     style={index === 0 ? { display: "none" } : {}}
//                   >
//                     {item.tmendsc}
//                   </Dropdown.Item>
//                 ))}
//               </DropdownButton>
//             </Nav.Item>
//           ))}
//         </Nav>

//          {/* Logout button  */}
//          <Button variant="danger"
//           className="d-flex justify-self-end"
//           onClick={handleLogout}>
//            Logout
//          </Button>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }



// // const customLinks = {
// //   "1-01-00": "/store",
// //   "1-09-00": "/company",
// //   "4-26-00": "/capacity",
// //   "4-06-00": "/type",
// //   "3-01-03": "/category",
// //   "4-01-00": "/employee-list",
// //   "4-18-00": "/item",
// //   "4-03-00": "/user-list",
// //   "4-04-00": "/daily-sale",
// //   "4-10-00": "/daily-sale-detail"
// // };

//..................................................


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Auth";
// import "../../App.css";

// export default function Menu() {
//   const [menuData, setMenuData] = useState([]);
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   useEffect(() => {
//     // Check if the user is authenticated
//     if (!user) {
//       // If not authenticated, navigate to the login page
//       navigate("/emart"); // You can adjust the login URL as needed
//     } else {
//       // Fetch employee data if the user is authenticated
//       fetchMenuData();
//     }
//   }, [navigate, user]);

//   const menuUrl = "https://www.crystalsolutions.com.pk/emart/web/get_usrmenu.php";

//   useEffect(() => {
//     fetchMenuData();
//   }, []);

//   function fetchMenuData() {
//     const data = {
//       userid: 74,
//     };
//     const formData = new URLSearchParams(data).toString();

//     axios
//       .post(menuUrl, formData, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       })
//       .then((response) => {
//         setMenuData(response.data);
//         console.log("Menu Data:", response.data);
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//       });
//   }

//   const customLinks = {
//     "1-01-00": "/store",
//     "1-09-00": "/company",
//     "4-26-00": "/capacity",
//     "4-06-00": "/type",
//     "3-01-03": "/category",
//     "4-01-00": "/employee-list",
//     "4-18-00": "/item",
//     "4-03-00": "/user-list",
//     "4-04-00": "/daily-sale",
//     "4-10-00": "/daily-sale-detail",
//   };

//   // Create a nested menu structure
//   const nestedMenu = menuData.reduce((menu, item) => {
//     const [topLevel, subMenu] = item.tmencod.split("-");
//     if (!menu[topLevel]) {
//       menu[topLevel] = {
//         label: item.tmendsc,
//         items: [],
//       };
//     }
//     menu[topLevel].items.push({
//       label: item.tmendsc,
//       to: customLinks[item.tmencod] || "#",
//       disabled: item.tmenprm === "N",
//     });
//     return menu;
//   }, {});

//   // Function to handle user logout
//   const handleLogout = () => {
//     logout();
//     navigate("/emart"); // Redirect to the login page after logout
//   };

//   return (
//     <Navbar
//       style={{ backgroundColor: "var(--accent-color)" }}
//       expand="lg"
//       className="p-2"
//     >
//       <Navbar.Brand href="/emart/dashboard">Crystal Solutions</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav" className="gap-2">
//         <Nav className="mr-auto">
//           {Object.keys(nestedMenu).map((topLevel) => (
//             <Dropdown key={topLevel}>
//               <Dropdown.Toggle variant="transparent" id={`dropdown-${topLevel}`}>
//                 {nestedMenu[topLevel].label}
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 {nestedMenu[topLevel].items.map((item, index) => (
//                   <Dropdown.Item
//                     key={index}
//                     as={item.to !== "#" ? Link : undefined}
//                     to={item.to}
//                     disabled={item.disabled}
//                   >
//                     {item.label}
//                   </Dropdown.Item>
//                 ))}
//               </Dropdown.Menu>
//             </Dropdown>
//           ))}
//         </Nav>

//         {/* Logout button */}
//         <Button
//           variant="danger"
//           className="d-flex justify-self-end"
//           onClick={handleLogout}
//         >
//           Logout
//         </Button>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }
