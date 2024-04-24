import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../../services/restClient";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = [];
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg.push(element.message);
      }
    }
  }
  return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const SingleHCstage1 = ({ props, refNo }) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [Ref, setRef] = useState([]);
  const urlParams = useParams();

  useEffect(() => {
    console.log("refNo", refNo);
    getStage1();
  }, [refNo]);

  const componentList = [
    "ExternalBody",
    "InternalBody",
    "DisplayPanel",
    "DoorHandle",
    "CoinReturnLever",
    "CoinReturnPocket",
    "DeliveryDoorflap",
    "SelectorButton",
    "BodySticker",
    "ProductCanister",
    "Chute",
    "Tube",
    "CarbonationUnit",
    "SyrupCanister",
    "Valve",
    "MachineFloorBoard",
    "PaymentDevice",
    "CashlessUnit",
    "PSUBoard",
    "VendBoard",
    "RelaySupply",
    "MemoryBoard",
    "Remote",
    "Compressor",
    "CoolingFan",
    "IceMaker",
  ];

  const stage1ColumnHeaders = ["Average", "Good", "Not Good", "Bad"];

  const getStage1 = async () => {
    const response = await client
      .service("hCStage1")
      .find({ query: { Ref: refNo } });
    setRef(response._entity);
  };

  return (
    <div className="card grid nested-grid col-7 stage1">
      <div className="text-center col-12 stagetitle">
        <h3>STAGE 1</h3>
      </div>
      <div className="grid nested-grid col-12 list1">
        <div className="col-fixed" style={{ width: "150px" }}>
          <p>Component</p>
        </div>
        <div className="col-fixed">
          <p>Average</p>
        </div>
        <div className="col-fixed">
          <p>Good</p>
        </div>
        <div className="col-fixed">
          <p>Not Good</p>
        </div>
        <div className="col-fixed">
          <p>Bad</p>
        </div>
      </div>
      <div className="grid nested-grid comp">
        {componentList.map((component, idx) => (
          <React.Fragment key={idx}>
            <div
              className="col-fixed"
              style={{ width: "155px", textAlign: "left" }}
            >
              {component}
            </div>
            {stage1ColumnHeaders.map((header, index) => (
              <div className="col-fixed" key={`${component}_${header}`}>
                <Checkbox
                  inputId={`${component}_${header}`}
                  checked={_entity && _entity[component] === header}
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {};
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleHCstage1);
