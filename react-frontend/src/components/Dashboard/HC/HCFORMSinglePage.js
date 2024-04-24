import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../../services/restClient";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import SingleHCstage1 from "./HCstage1SinglePage";
import SingleHCstage2 from "./HCstage2SinglePage";
import SingleHCAgree1 from "./HCAgree1SinglePage";
import SingleHCAgree2 from "./HCAgree2SinglePage";

const SingleHCMasterForm = (props, user) => {
  const [_entity, set_entity] = useState();
  const navigate = useNavigate();
  const urlParams = useParams();
  const [error, setError] = useState("");
  const [refNo, setRefNo] = useState([]);

  useEffect(() => {
    //on mount
    client
      .service("hCMasterForm")
      .get(urlParams.singleHCMasterFormId, { query: { $populate: [] } })
      .then((res) => {
        set_entity(res || {});
        setRefNo(_entity?.RefNo);
        console.log("", _entity.RefNo);
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "HCMasterForm",
          type: "error",
          message: error.message || "Failed get hCMasterForm",
        });
      });
  }, [props, urlParams.singleHCMasterFormId]);

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
                  <SingleHCstage1 refNo={refNo} />
                  <SingleHCstage2 />
                </div>
                <br />
                <SingleHCAgree1 />
                <SingleHCAgree2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  user: state.auth.user,
});

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleHCMasterForm);
