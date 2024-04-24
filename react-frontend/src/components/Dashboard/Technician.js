import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Chart } from "primereact/chart";

const FormList = () => {
  return (
    <div className="col-12 flex flex-column align-items-center">
      <div className="card flex w-12 h-12">
        <Link to="/HCFORM">
          <div className="card">Create HC Form</div>
        </Link>
        <Link to="/CBFORM">
          <div className="card">Create CB Form</div>
        </Link>
      </div>
      <div className="card flex w-12 h-12">

      </div>
      <div className="card flex w-12 h-12">
        
      </div>
    </div>
  );
};

export default connect()(FormList);
