import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../../services/restClient";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";

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

const HCMasterFormEdit = (props, user) => {
  const [_entity, set_entity] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

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
      ActiveCase: _entity.ActiveCase,
    };

    setLoading(true);
    try {
      const result = await client
        .service("hCMasterForm")
        .patch(_entity._id, _data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Edit info",
        message: "Info hCMasterForm updated successfully",
      });
      props.onEditResult(result);
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

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError("");
  };

  return (
    <Dialog
      header="Edit Info"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "75vw" }}
      className="min-w-max"
      footer={renderFooter()}
      resizable={false}
    >
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
                  onChange={(e) => setValByKey("SerialNo", e.target.value)}
                />
              </div>
              <div>
                ManuYear :{" "}
                <InputText
                  className="w-8"
                  placeholder="Manufacture year"
                  value={_entity?.ManuYear}
                  onChange={(e) => setValByKey("ManuYear", e.target.value)}
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
                  onChange={(e) => setValByKey("Branch", e.target.value)}
                />
              </div>
              <div>
                Date Inspection :
                <Calendar
                  className="w-8"
                  dateFormat="dd/mm/yy hh:mm"
                  placeholder={"dd/mm/yy hh:mm"}
                  value={new Date(_entity?.DateInspec)}
                  onChange={(e) => setValByKey("DateInspec", e.target.value)}
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
                  onChange={(e) => setValByKey("DateRecall", e.target.value)}
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
                  onChange={(e) => setValByKey("RecallLoc", e.target.value)}
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
          </div>
        </div>
        <div>
          <label className="m-0">ActiveCase : </label>
          <Checkbox
            checked={_entity?.ActiveCase}
            onChange={(e) => setValByKey("ActiveCase", e.checked)}
          ></Checkbox>
        </div>
      </div>
    </Dialog>
  );
};

const mapState = (state) => ({
  user: state.auth.user,
});

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(HCMasterFormEdit);
