import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Chart } from "primereact/chart";
import { Divider } from "primereact/divider";

const FormList = () => {
  return (
    <div className="col-12 flex flex-column align-items-center">
      <div className="card flex w-12 h-12">
        <div className="card">
          <Link to="/HCFORM">Create HC Form</Link>
        </div>
        <div className="card">
          <Link to="/CBFORM">Create CB Form</Link>
        </div>
      </div>
    </div>
  );
};

export default connect()(FormList);
