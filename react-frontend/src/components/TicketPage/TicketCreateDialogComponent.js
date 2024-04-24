import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

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

const TicketCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // replace this when there is a date field
    // const init  = { todate : new Date(), from : new Date()};
    // set_entity({...init});
    set_entity({});
  }, [props.show]);

  const onSave = async () => {
    let _data = {
      Location: _entity.Location,
      DateRaised: _entity.DateRaised,
      Address: _entity.Address,
      Description: _entity.Description,
      Status: _entity.Status,
      assignedTo: _entity.assignedTo,
      DateAssigned: _entity.DateAssigned,
      DateClosed: _entity.DateClosed,
    };

    setLoading(true);

    try {
      const result = await client.service("ticket").create(_data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info ticket created successfully",
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
      header="Create"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max"
      footer={renderFooter()}
      resizable={false}
    >
      <div role="ticket-create-dialog-component">
        <div>
          <p className="m-0">Location:</p>
          <InputText
            className="w-full mb-3"
            value={_entity?.Location}
            onChange={(e) => setValByKey("Location", e.target.value)}
          />
        </div>
        <div>
          <p className="m-0">DateRaised:</p>
          <Calendar
            dateFormat="dd/mm/yy hh:mm"
            placeholder={"dd/mm/yy hh:mm"}
            value={new Date(_entity?.DateRaised)}
            onChange={(e) => setValByKey("DateRaised", e.target.value)}
            showTime
            showIcon
            showButtonBar
          ></Calendar>
        </div>
        <div>
          <p className="m-0">Address:</p>
          <InputText
            className="w-full mb-3"
            value={_entity?.Address}
            onChange={(e) => setValByKey("Address", e.target.value)}
          />
        </div>
        <div>
          <p className="m-0">Description:</p>
          <InputText
            className="w-full mb-3"
            value={_entity?.Description}
            onChange={(e) => setValByKey("Description", e.target.value)}
          />
        </div>
        <div>
          <p className="m-0">Status:</p>
          <InputText
            className="w-full mb-3"
            value={_entity?.Status}
            onChange={(e) => setValByKey("Status", e.target.value)}
          />
        </div>
        <div>
          <p className="m-0">AssignedTo:</p>
          <InputText
            className="w-full mb-3"
            value={_entity?.assignedTo}
            onChange={(e) => setValByKey("assignedTo", e.target.value)}
          />
        </div>
        <div>
          <p className="m-0">DateAssigned:</p>
          <Calendar
            dateFormat="dd/mm/yy hh:mm"
            placeholder={"dd/mm/yy hh:mm"}
            value={new Date(_entity?.DateAssigned)}
            onChange={(e) => setValByKey("DateAssigned", e.target.value)}
            showTime
            showIcon
            showButtonBar
          ></Calendar>
        </div>
        <div>
          <p className="m-0">DateClosed:</p>
          <Calendar
            dateFormat="dd/mm/yy hh:mm"
            placeholder={"dd/mm/yy hh:mm"}
            value={new Date(_entity?.DateClosed)}
            onChange={(e) => setValByKey("DateClosed", e.target.value)}
            showTime
            showIcon
            showButtonBar
          ></Calendar>
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
    </Dialog>
  );
};

const mapState = (state) => {
  return {};
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(TicketCreateDialogComponent);
