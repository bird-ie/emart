import React from "react";

function PathHead({ pageName }) {

  return (

      <div className="text-white align-items-center d-flex" style={{ paddingLeft: "3%",paddingBottom:"0.5%", backgroundColor:"#999999" }}>{pageName}</div>
  );
}

export default PathHead;