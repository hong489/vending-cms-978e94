import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../../services/restClient";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [Ref, setRef] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

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

    setLoading(true);

    try {
      await client.service("hcStage2").patch(_entity._id, _data);
      const eagerResult = await client.service("hcStage2").find({
        query: {
          $limit: 100,
          _id: { $in: [_entity._id] },
          $populate: [
            {
              path: "Ref",
              service: "hCMasterForm",
              select: ["RefNo"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Edit info",
        message: "Info hcStage2 updated successfully",
      });
      props.onEditResult(eagerResult.data[0]);
      navigate("/technician");
    } catch (error) {
      console.log("error", error);
      setError(
        getSchemaValidationErrorsStrings(error) || "Failed to update info",
      );
      props.alert({
        type: "error",
        title: "Edit info",
        message: "Failed to update info",
      });
    }
    setLoading(false);
  };

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

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  return (
    <Dialog
      header="Edit info"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "30vw" }}
      footer={renderFooter()}
      resizable={false}
    >
      <div className="card grid nested-grid col-12 stage2">
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
    </Dialog>
  );
};

const mapState = (state) => {
  return {};
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});
export default connect(mapState, mapDispatch)(HCstage2);
