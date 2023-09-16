// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// export default function DynamicBreadcrumbs() {
//   const [menuData, setMenuData] = useState([]);
//   const location = useLocation();

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
//     // ... (your custom links here)
//   };

//   const hierarchicalMenuData = {};

//   menuData.forEach((item) => {
//     const [topLevel, middleLevel, subLevel] = item.tmencod.split("-");

//     if (!hierarchicalMenuData[topLevel]) {
//       hierarchicalMenuData[topLevel] = {
//         label: item.tmendsc,
//         items: [],
//       };
//     }

//     if (!hierarchicalMenuData[topLevel].items[middleLevel]) {
//       hierarchicalMenuData[topLevel].items[middleLevel] = {
//         label: item.tmendsc,
//         items: [],
//       };
//     }

//     hierarchicalMenuData[topLevel].items[middleLevel].items.push({
//       label: item.tmendsc,
//       to: customLinks[item.tmencod] || "#",
//       disabled: item.tmenprm === "N",
//     });
//   });

//   // Generate breadcrumbs based on the current route location
//   const generateBreadcrumbs = () => {
//     const pathSegments = location.pathname.split("/").filter((segment) => segment !== "");
//     const breadcrumbs = [];
//     let currentPath = "";
  
//     for (const segment of pathSegments) {
//       currentPath += `/${segment}`;
//       const menuItem = findMenuItem(currentPath);
//       console.log("Current Path:", currentPath);
//       console.log("MenuItem:", menuItem);
  
//       if (menuItem) {
//         breadcrumbs.push({
//           label: menuItem.label,
//           to: currentPath,
//         });
//       }
//     }
  
//     console.log("Breadcrumbs:", breadcrumbs);
//     return breadcrumbs;
//   };
  
//   // Helper function to find a menu item based on the given path
//   const findMenuItem = (path) => {
//     for (const topLevel in hierarchicalMenuData) {
//       if (topLevel === path) {
//         return {
//           label: hierarchicalMenuData[topLevel].label,
//         };
//       }

//       for (const middleLevel in hierarchicalMenuData[topLevel].items) {
//         if (middleLevel === path) {
//           return {
//             label: hierarchicalMenuData[topLevel].items[middleLevel].label,
//           };
//         }

//         for (const subLevel in hierarchicalMenuData[topLevel].items[middleLevel].items) {
//           if (subLevel === path) {
//             return {
//               label: hierarchicalMenuData[topLevel].items[middleLevel].items[subLevel].label,
//             };
//           }
//         }
//       }
//     }

//     return null;
//   };

//   // Generate breadcrumbs based on the current route location
//   const breadcrumbs = generateBreadcrumbs();


//   return (
//     <div className="breadcrumbs">
//       {breadcrumbs.map((breadcrumb, index) => (
//         <span key={breadcrumb.to}>
//           {index > 0 && " > "}
//           {breadcrumb.to ? (
//             <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
//           ) : (
//             breadcrumb.label
//           )}
//         </span>
//       ))}
//       Breadcrumbs here
//     </div>
//   );
// }
