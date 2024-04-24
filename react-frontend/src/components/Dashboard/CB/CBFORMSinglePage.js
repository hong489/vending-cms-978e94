import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../../services/restClient";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import SingleCBstage1 from "./CBstage1SinglePage";
import SingleCBstage2 from "./CBstage2SinglePage";
import SingleCBAgree1 from "./CBAgree1SinglePage";
import SingleCBAgree2 from "./CBAgree2SinglePage";

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

const CBMasterForm = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const urlParams = useParams();

  useEffect(() => {
    set_entity({});
  }, [props.show]);

  useEffect(() => {
    //on mount
    client
      .service("cBMasterForm")
      .get(urlParams.singleCBMasterFormId, { query: { $populate: [] } })
      .then((res) => {
        set_entity(res || {});
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "CBMasterForm",
          type: "error",
          message: error.message || "Failed get cBMasterForm",
        });
      });
  }, [props, urlParams.singleCBMasterFormId]);

  const goBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <div className="" style={{ width: "90vw" }}>
      <div className="flex w-full">
        <div className="w-full">
          <div className="w-full flex justify-content-center flex-wrap">
            <div className="align-items-center flex ">
              <div className="card basecard ">
                <Button
                  className="p-button-text"
                  icon="pi pi-chevron-left"
                  onClick={() => goBack()}
                />
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
                      fontSize: "4rem",
                      marginRight: "0.5rem",
                      color: "white",
                    }}
                  />
                  <h2 style={{ margin: "0", color: "white" }}>
                    Machine Inspection Sheet for C&B & Combo
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
                        />
                      </div>
                      <div>
                        Model :{" "}
                        <InputText
                          className="w-8"
                          placeholder="Machine model"
                          value={_entity?.Model}
                        />
                      </div>
                      <div>
                        Seriel No :{" "}
                        <InputText
                          className="w-8"
                          placeholder="Machine Serial no"
                          value={_entity?.SerialNo}
                        />
                      </div>
                      <div>
                        ManuYear :{" "}
                        <InputText
                          className="w-8"
                          placeholder="Manufacture year"
                          value={_entity?.ManuYear}
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
                        />
                      </div>
                      <div>
                        Date Inspection :
                        <Calendar
                          className="w-8"
                          dateFormat="dd/mm/yy hh:mm"
                          placeholder={"dd/mm/yy hh:mm"}
                          value={new Date(_entity?.DateInspec)}
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
                <div className="card grid nested-grid col-12 stageForm">
                  <SingleCBstage1 />
                  <SingleCBstage2 />
                </div>
                <br />
                <SingleCBAgree1 />
                <SingleCBAgree2 />
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

export default connect(mapState, mapDispatch)(CBMasterForm);
