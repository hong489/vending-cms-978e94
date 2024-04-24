import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
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

const TicketDialog = (props) => {
  const [selectedState, setSelectedState] = useState(null);
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const states = [
    { name: "Johor" },
    { name: "Kedah" },
    { name: "Kelantan" },
    { name: "Melaka" },
    { name: "Negeri Sembilan" },
    { name: "Pahang" },
    { name: "Perak" },
    { name: "Perlis" },
    { name: "Pulau Pinang" },
    { name: "Sabah" },
    { name: "Sarawak" },
    { name: "Selangor" },
    { name: "Terengganu" },
    { name: "Kuala Lumpur" },
    { name: "Labuan" },
    { name: "Putrajaya" },
  ];

  useEffect(() => {
    // replace this when there is a date field
    // const init  = { todate : new Date(), from : new Date()};
    // set_entity({...init});
    set_entity({});
  }, [props.show]);

  const onSave = async () => {
    const currentDate = new Date();

    let _data = {
      Location: _entity.Location,
      DateRaised: currentDate,
      Address: _entity.Address,
      Description: _entity.Description,
      Status: "open",
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
        label="Submit"
        className="p-button-text no-focus-effect"
        onClick={onSave}
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
      header="Raise a Ticket"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "30vw" }}
      className="min-w-max"
      footer={renderFooter()}
      resizable={false}
    >
      <div className="">
        <div className="">
          <label htmlFor="state">State : {""}</label>
          <Dropdown
            id="state"
            value={_entity?.Location}
            options={states}
            optionValue="name"
            onChange={(e) => setValByKey("Location", e.value)}
            optionLabel="name"
            placeholder="Select a state"
          />
        </div>
        <div className="">
          <label htmlFor="address">Address : </label>
          <InputText
            className="w-10 mb-3"
            value={_entity?.Address}
            onChange={(e) => setValByKey("Address", e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="details">Details : </label>
          <InputTextarea
            id="details"
            value={_entity?.Description}
            onChange={(e) => setValByKey("Description", e.target.value)}
            rows={5}
            style={{ width: "380px", height: "300px" }}
          />
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

export default connect(mapState, mapDispatch)(TicketDialog);
