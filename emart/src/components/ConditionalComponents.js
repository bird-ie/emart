import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./General/Header";
import GeneralHeader from "./General/GeneralHeader";
import Login from "./Login"; // Import Login.js as needed

const ConditionalComponents = () => {
  const location = useLocation();

  // Define an array of routes where you want to display GeneralHeader.js
  const routesToShowGeneralHeader = ["/", "/dashboard"]; // Add your routes here

  // Define an array of routes where you don't want to display any header
  const routesToExcludeHeader = ["/emart"]; // Add routes where header should be excluded

  // Check if the current route is in the array of routes to exclude header
  const shouldExcludeHeader = routesToExcludeHeader.includes(location.pathname);

  // Check if the current route is in the array of routes for GeneralHeader.js
  const shouldShowGeneralHeader =
    !shouldExcludeHeader &&
    !routesToShowGeneralHeader.includes(location.pathname);

  const isLoginPage = location.pathname === "/emart";

  return (
    <div>
      {isLoginPage ? null : shouldShowGeneralHeader ? (
        <GeneralHeader />
      ) : (
        <Header />
      )}
      {/* Render Login component here if needed */}
    </div>
  );
};

export default ConditionalComponents;
