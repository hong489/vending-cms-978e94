import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import client from "../../../services/restClient";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";

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

const HCstage2 = (props) => {
  const [_entity, set_entity] = useState({});
  const urlParams = useParams();
  const [Ref, setRef] = useState([]);

  // useEffect(() => {
  //   // replace this when there is a date field
  //   // const init  = { todate : new Date(), from : new Date()};
  //   // set_entity({...init});
  //   set_entity({});
  // }, [props.show]);

  const componentList = [
    "ExternalBody",
    "InternalBody",
    "DisplayPanel",
    "DoorHandle",
    "CoinReturnLever",
    "CoinReturnPocket",
    "DeliveryDoorFlap",
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

  useEffect(() => {
    //on mount
    client
      .service("hcStage2")
      .get(urlParams.singleHcStage2Id, { query: { $populate: ["Ref"] } })
      .then((res) => {
        set_entity(res || {});
        const Ref = Array.isArray(res.Ref)
          ? res.Ref.map((elem) => ({ _id: elem._id, RefNo: elem.RefNo }))
          : res.Ref
            ? [{ _id: res.Ref._id, RefNo: res.Ref.RefNo }]
            : [];
        setRef(Ref);
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "HcStage2",
          type: "error",
          message: error.message || "Failed get hcStage2",
        });
      });
  }, [props, urlParams.singleHcStage2Id]);

  return (
    <div className="card grid nested-grid col-5 stage2">
      <div
        className="text-center col-12 stagetitle"
        style={{ height: "45 px" }}
      >
        <h3>STAGE 2</h3>
      </div>
      <div className="grid nested-grid col-12 list1">
        <div className="col-fixed">
          <p>Service</p>
        </div>
        <div className="col-fixed">
          <p>Repair</p>
        </div>
        <div className="col-4">
          <p>Replace/Exchange</p>
        </div>
      </div>
      <div className="grid nested-grid">
        {componentList.map((component, idx) => (
          <React.Fragment key={idx}>
            {/* Checkbox for Service */}
            <div className="col-fixed">
              <Checkbox
                inputId={`service_${component}`}
                checked={_entity?.[component]}
                onChange={(e) => setValByKey(component, "service", e.checked)}
              />
            </div>
            {/* Checkbox for Repair */}
            <div className="col-fixed">
              <Checkbox
                inputId={`repair_${component}`}
                checked={_entity?.[component]}
                onChange={(e) => setValByKey(component, "repair", e.checked)}
              />
            </div>
            {/* Input field for Replace/Exchange */}
            <div className="col-4 ">
              <InputText
                className="replaceinput"
                value={_entity?.[component] || ""}
                onChange={(e) => setValByKey(component, e.target.value)}
              />
            </div>
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
  //
});

export default connect(mapState, mapDispatch)(HCstage2);
