import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import client from "../../../services/restClient";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import HCstage1 from "./HCstage1";
import HCstage2 from "./HCstage2";
import HCAgree1 from "./HCAgree1";
import HCAgree2 from "./HCAgree2";

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

const HCMasterForm = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    set_entity({});
  }, [props.show]);

  const onSave = async () => {
    let _data = {
      RefNo: _entity.RefNo,
      Model: _entity.Model,
      SerialNo: _entity.SerialNo,
      ManuYear: _entity.ManuYear,
      Branch: _entity.Branch,
      DateInspec: _entity.DateInspec,
      DateRecall: _entity.DateRecall,
      RecallLoc: _entity.RecallLoc,
      active: true,
    };

    setLoading(true);

    try {
      const result = await client.service("hCMasterForm").create(_data);
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info hCMasterForm created successfully",
      });
      props.onCreateResult(result);
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
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError("");
  };

  return (
    <div className="" style={{ width: "90vw" }}>
      <div className="flex w-full">
        <div className="w-full">
          <div className="w-full flex justify-content-center flex-wrap">
            <div className="align-items-center flex ">
              <div className="card basecard ">
                <div
                  className="HCbanner"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#7f7f7f",
                    borderRadius: "4px",
                    height: "5rem",
                  }}
                >
                  <i
                    className="pi pi-bookmark"
                    style={{
                      fontSize: "2.5rem",
                      marginRight: "0.5rem",
                      color: "white",
                    }}
                  />
                  <h2 style={{ margin: "0", color: "white" }}>
                    Machine Inspection Sheet for H&C
                  </h2>
                </div>
                <br />
                <div className="grid nested-grid col-12 flex flex-row ">
                  <div className="col-5 col-offset-0">
                    <div className="grid flex flex-column text-right">
                      <div>
                        RefNo :{" "}
                        <InputText
                          className="w-8"
                          placeholder="Internal Tracking no"
                          value={_entity?.RefNo}
                          onChange={(e) => setValByKey("RefNo", e.target.value)}
                        />
                      </div>
                      <div>
                        Model :{" "}
                        <InputText
                          className="w-8"
                          placeholder="Machine model"
                          value={_entity?.Model}
                          onChange={(e) => setValByKey("Model", e.target.value)}
                        />
                      </div>
                      <div>
                        Seriel No :{" "}
                        <InputText
                          className="w-8"
                          placeholder="Machine Serial no"
                          value={_entity?.SerialNo}
                          onChange={(e) =>
                            setValByKey("SerialNo", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        ManuYear :{" "}
                        <InputText
                          className="w-8"
                          placeholder="Manufacture year"
                          value={_entity?.ManuYear}
                          onChange={(e) =>
                            setValByKey("ManuYear", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid nested-grid col-5 col-offset-1">
                    <div className="grid flex col-12 flex-column text-right ">
                      <div>
                        Branch :{" "}
                        <InputText
                          className="w-8"
                          placeholder="Respected branch"
                          value={_entity?.Branch}
                          onChange={(e) =>
                            setValByKey("Branch", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        Date Inspection :
                        <Calendar
                          className="w-8"
                          dateFormat="dd/mm/yy hh:mm"
                          placeholder={"dd/mm/yy hh:mm"}
                          value={new Date(_entity?.DateInspec)}
                          onChange={(e) =>
                            setValByKey("DateInspec", e.target.value)
                          }
                          showTime
                          showButtonBar
                        ></Calendar>
                      </div>
                      <div>
                        Date Recall :
                        <Calendar
                          className="w-8"
                          dateFormat="dd/mm/yy hh:mm"
                          placeholder={"dd/mm/yy hh:mm"}
                          value={new Date(_entity?.DateRecall)}
                          onChange={(e) =>
                            setValByKey("DateRecall", e.target.value)
                          }
                          showTime
                          showButtonBar
                        ></Calendar>
                      </div>
                      <div>
                        Recall Location :{" "}
                        <InputText
                          className="w-8"
                          placeholder="Location name"
                          value={_entity?.RecallLoc}
                          onChange={(e) =>
                            setValByKey("RecallLoc", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <small className="p-error">
                      {Array.isArray(error)
                        ? error.map((e, i) => (
                            <p className="m-0" key={i}>
                              {e}
                            </p>
                          ))
                        : error}
                    </small>
                    <Button
                      label="create"
                      // className="p-button-text no-focus-effect"
                      onClick={onSave}
                      loading={loading}
                    />
                  </div>
                </div>
                <div className="card grid nested-grid col-12 stageForm">
                  <HCstage1 />
                  <HCstage2 />
                </div>
                <br />

                <HCAgree1 />
                <HCAgree2 />
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapState, mapDispatch)(HCMasterForm);
