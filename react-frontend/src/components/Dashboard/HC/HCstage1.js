import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../../services/restClient";
import { Checkbox } from "primereact/checkbox";
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

const HCstage1 = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage1Status, setStage1Status] = useState({});
  const [Ref, setRef] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    set_entity(props.entity);
  }, [props.show, props.entity]);

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

  const onSave = async () => {
    let _data = {
      Ref: _entity.Ref,
      ExternalBody: _entity.ExternalBody,
      InternalBody: _entity.InternalBody,
      DisplayPanel: _entity.DisplayPanel,
      DoorHandle: _entity.DoorHandle,
      CoinReturnLever: _entity.CoinReturnLever,
      CoinReturnPocket: _entity.CoinReturnPocket,
      DeliveryDoorflap: _entity.DeliveryDoorflap,
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
      await client.service("hcStage1").patch(_entity._id, _data);
      const eagerResult = await client.service("hcStage1").find({
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
        message: "Info hcStage1 updated successfully",
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

  const setValByKey = (component, header, checked) => {
    // Update the _entity state with the selected value based on the status
    set_entity((prevEntity) => ({
      ...prevEntity,
      [component]: checked ? header : null, // Set the value to the header if checked is true, otherwise set it to null
    }));
    setError("");
  };

  return (
    <Dialog
      header="Edit info"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "45vw" }}
      footer={renderFooter()}
      resizable={false}
    >
      <div className="card grid nested-grid col-12 stage1">
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
                    onChange={(e) => setValByKey(component, header, e.checked)}
                  />
                </div>
              ))}
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

export default connect(mapState, mapDispatch)(HCstage1);
