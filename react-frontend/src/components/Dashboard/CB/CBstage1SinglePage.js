import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
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

const CBstage1 = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage1Status, setStage1Status] = useState({});
  const [Ref, setRef] = useState([]);

  useEffect(() => {
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
      DeliveryDoorFlap: _entity.DeliveryDoorFlap,
      SecDoorPanel: _entity.SecDoorPanel,
      SecDoorFlap: _entity.SecDoorFlap,
      ColumnStnd: _entity.ColumnStnd,
      ColumnMod: _entity.ColumnMod,
      ColumnFlipper: _entity.ColumnFlipper,
      ProductChute: _entity.ProductChute,
      MachineMaintenance: _entity.MachineMaintenance,
      PSUBoard: _entity.PSUBoard,
      VendBoard: _entity.VendBoard,
      RelaySupply: _entity.RelaySupply,
      MemoryBoard: _entity.MemoryBoard,
      Remote: _entity.Remote,
      Compressor: _entity.Compressor,
      CoolingFan: _entity.CoolingFan,
      Wiring: _entity.Wiring,
      Motor: _entity.Motor,
    };

    setLoading(true);

    try {
      const result = await client.service("cbStage1").create(_data);
      const eagerResult = await client.service("cbStage1").find({
        query: {
          $limit: 100,
          _id: { $in: [result._id] },
          $populate: [
            {
              path: "Ref",
              service: "cBMasterForm",
              select: ["RefNo"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info cbStage1 updated successfully",
      });
      // props.onCreateResult(eagerResult.data[0]);
      navigate("/technician");
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    //on mount cBMasterForm
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
          message: error.message || "Failed get cBMasterForm",
        });
      });
  }, []);

  const setValByKey = (component, header, checked) => {
    // Update the _entity state with the selected value based on the status
    set_entity((prevEntity) => ({
      ...prevEntity,
      [component]: checked ? header : null, // Set the value to the header if checked is true, otherwise set it to null
    }));
    setError("");
  };

  const RefOptions = Ref.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

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
                  // onChange={(e) => setValByKey(component, header, e.checked)}
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

export default connect(mapState, mapDispatch)(CBstage1);
