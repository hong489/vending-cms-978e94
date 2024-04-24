import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../../services/restClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Image } from "primereact/image";
import sign from "../../../assets/media/Sign.jpg";
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

const CBAgree2 = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [Ref, setRef] = useState([]);

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

  const onSave = async () => {
    let _data = {
      Ref: _entity.Ref,
      TechName: _entity.TechName,
      TechSign: _entity.TechSign,
      TechDate: _entity.TechDate,
      TechTrade: _entity.TechTrade,
      SvName: _entity.SvName,
      SvSign: _entity.SvSign,
      SvDate: _entity.SvDate,
      SvTrade: _entity.SvTrade,
      MngrName: _entity.MngrName,
      MngrSign: _entity.MngrSign,
      MngrDate: _entity.MngrDate,
      MngrTrade: _entity.MngrTrade,
      Remarks: _entity.Remarks,
    };

    setLoading(true);

    try {
      await client.service("cbStage2Agree").patch(_entity._id, _data);
      const eagerResult = await client.service("cbStage2Agree").find({
        query: {
          $limit: 100,
          _id: { $in: [_entity._id] },
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
        title: "Edit info",
        message: "Info cbStage2Agree updated successfully",
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

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
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
      style={{ width: "80vw" }}
      footer={renderFooter()}
      resizable={false}
    >
      <div className="card grid agreement " style={{ background: "#fff59d" }}>
        <h3>STAGE 2 AGREEMENT</h3>
        <div
          className="grid col-12 flex-row text-center"
          style={{
            borderTop: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          <div className="col-2"></div>
          <div className="col-2">Name</div>
          <div className="col-2">Sign</div>
          <div className="col-2">Date</div>
          <div className="col-4 text-center">Release to trade?</div>
        </div>
        <div className="grid col-12 flex-row">
          <div className="col-2">Technician</div>
          <div className="col-2">
            <InputText
              value={_entity?.TechName}
              onChange={(e) => setValByKey("TechName", e.target.value)}
            />
          </div>
          <div className="col-2">
            <Image
              src={sign}
              alt="sign"
              preview
              width="150px"
              height="50px"
              className="image"
            />
          </div>
          <div className="col-2">
            <Calendar
              style={{ padding: "0px" }}
              dateFormat="dd/mm/yy"
              placeholder={"dd/mm/yy hh:mm"}
              value={new Date(_entity?.TechDate)}
              onChange={(e) => setValByKey("TechDate", e.target.value)}
              showTime
              showButtonBar
            />
          </div>
          <div className="col-1"></div>
          <div className="col-2">
            <Checkbox
              onChange={(e) =>
                setValByKey("TechTrade", e.checked ? true : null)
              }
              checked={_entity?.TechTrade === true}
            />
            <label> Yes</label>
          </div>
          <div className="col-1">
            <Checkbox
              onChange={(e) =>
                setValByKey("TechTrade", e.checked ? false : null)
              }
              checked={_entity?.TechTrade === false}
            />
            <label> No</label>
          </div>
        </div>
        <div className="grid col-12 flex-row">
          <div className="col-2">Supervisor</div>
          <div className="col-2">
            <InputText
              value={_entity?.SvName}
              onChange={(e) => setValByKey("SvName", e.target.value)}
            />
          </div>
          <div className="col-2">
            <Image
              src={sign}
              alt="sign"
              preview
              width="150px"
              height="50px"
              className="image"
            />
          </div>
          <div className="col-2">
            <Calendar
              style={{ padding: "0px" }}
              dateFormat="dd/mm/yy hh:mm"
              placeholder={"dd/mm/yy hh:mm"}
              value={new Date(_entity?.SvDate)}
              onChange={(e) => setValByKey("SvDate", e.target.value)}
              showTime
              showButtonBar
            />
          </div>
          <div className="col-1"></div>
          <div className="col-2">
            <Checkbox
              onChange={(e) => setValByKey("SvTrade", e.checked ? true : null)}
              checked={_entity?.SvTrade === true}
            />
            <label> Yes</label>
          </div>
          <div className="col-1">
            <Checkbox
              onChange={(e) => setValByKey("SvTrade", e.checked ? false : null)}
              checked={_entity?.SvTrade === false}
            />
            <label> No</label>
          </div>
        </div>
        <div className="grid col-12 flex-row">
          <div className="col-2">Manager</div>
          <div className="col-2">
            <InputText
              value={_entity?.MngrName}
              onChange={(e) => setValByKey("MngrName", e.target.value)}
            />
          </div>
          <div className="col-2">
            <Image
              src={sign}
              alt="sign"
              preview
              width="150px"
              height="50px"
              className="image"
            />
          </div>
          <div className="col-2">
            <Calendar
              style={{ padding: "0px" }}
              dateFormat="dd/mm/yy hh:mm"
              placeholder={"dd/mm/yy hh:mm"}
              value={new Date(_entity?.MngrDate)}
              onChange={(e) => setValByKey("MngrDate", e.target.value)}
              showTime
              showButtonBar
            />
          </div>
          <div className="col-1"></div>
          <div className="col-2">
            <Checkbox
              onChange={(e) =>
                setValByKey("MngrTrade", e.checked ? true : null)
              }
              checked={_entity?.MngrTrade === true}
            />
            <label> Yes</label>
          </div>
          <div className="col-1">
            <Checkbox
              onChange={(e) =>
                setValByKey("MngrTrade", e.checked ? false : null)
              }
              checked={_entity?.MngrTrade === false}
            />
            <label> No</label>
          </div>
        </div>
        <div className="col-12">
          Remarks :
          <div className="col-10">
            <InputTextarea
              id="remarks"
              className="custom-inputarea w-full"
              value={_entity?.Remarks}
              onChange={(e) => setValByKey("Remarks", e.target.value)}
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
    </Dialog>
  );
};

const mapState = (state) => {
  return {};
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CBAgree2);
