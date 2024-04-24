import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import client from "../../../services/restClient";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
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

const CBstage2 = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [Ref, setRef] = useState([]);

  useEffect(() => {
    // replace this when there is a date field
    // const init  = { todate : new Date(), from : new Date()};
    // set_entity({...init});
    set_entity({});
  }, [props.show]);

  const componentList = [
    "ExternalBody",
    "InternalBody",
    "DisplayPanel",
    "DoorHandle",
    "CoinReturnLever",
    "CoinReturnPocket",
    "DeliveryDoorFlap",
    "SecDoorPanel",
    "SecDoorFlap",
    "ColumnStnd",
    "ColumnMod",
    "ColumnFlipper",
    "ProductChute",
    "MachineMaintenance",
    "PSUBoard",
    "VendBoard",
    "RelaySupply",
    "MemoryBoard",
    "Remote",
    "Compressor",
    "CoolingFan",
    "Wiring",
    "Motor",
  ];

  const onSave = async () => {
    let _data = {
      Ref: _entity.Ref,
      ExternalBody: _entity.ExternalBody,
      InternalBody: _entity.InternalBody,
      DisplayPanel: _entity.DisplayPanel,
      DoorHandle: _entity.DoorHandle,
      CoinReturnLever: _entity.CoinReturnLever,
      CoinReturnPocket: _entity.CoinReturnPocket,
      DeliveryDoorFlap: _entity.DeliveryDoorFlap,
      SelectorButton: _entity.SelectorButton,
      BodySticker: _entity.BodySticker,
      ProductCanister: _entity.ProductCanister,
      Chute: _entity.Chute,
      Tube: _entity.Tube,
      CarbonationUnit: _entity.CarbonationUnit,
      SyrupCanister: _entity.SyrupCanister,
      Valve: _entity.Valve,
      MachineFloorBoard: _entity.MachineFloorBoard,
      PaymentDevice: _entity.PaymentDevice,
      CashlessUnit: _entity.CashlessUnit,
      PSUBoard: _entity.PSUBoard,
      VendBoard: _entity.VendBoard,
      RelaySupply: _entity.RelaySupply,
      MemoryBoard: _entity.MemoryBoard,
      Remote: _entity.Remote,
      Compressor: _entity.Compressor,
      CoolingFan: _entity.CoolingFan,
      IceMaker: _entity.IceMaker,
    };
    // setLoading(true);

    try {
      const result = await client.service("cbStage2").create(_data);
      const eagerResult = await client.service("cbStage2").find({
        query: {
          $limit: 100,
          _id: { $in: [result._id] },
          $populate: [
            {
              path: "Ref",
              service: "cbMasterForm",
              select: ["RefNo"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info cbStage2 updated successfully",
      });
      props.onCreateResult(eagerResult.data[0]);
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create",
      });
    }
    // setLoading(false);
  };

  useEffect(() => {
    //on mount hCMasterForm
    client
      .service("cBMasterForm")
      .find({ query: { $limit: 100 } })
      .then((res) => {
        setRef(
          res.data.map((e) => {
            return { name: e["RefNo"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "CBMasterForm",
          type: "error",
          message: error.message || "Failed get CBMasterForm",
        });
      });
  }, []);

  const setValByKey = (component, value, checked) => {
    let new_entity = { ..._entity };

    // If it's a checkbox (service or repair), update the component status
    if (value === "service" || value === "repair") {
      // If checked, set the component to the value (service or repair)
      // If unchecked, set the component to null or false, depending on your requirement
      new_entity = { ...new_entity, [component]: checked ? value : null };
    } else {
      // Otherwise, it's an input text for replace/exchange, update the value directly
      new_entity = { ...new_entity, [component]: value };
    }

    set_entity(new_entity);
    setError("");
  };

  const RefOptions = Ref.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

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
      <Button label="save" onClick={onSave} loading={loading} />
    </div>
  );
};

export default CBstage2;
