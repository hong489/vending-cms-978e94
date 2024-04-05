import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";

function HCMasterForm() {
  const [value, setValue] = useState("");
  const [stage1Status, setStage1Status] = useState({});
  const [stage2Service, setStage2Service] = useState({});
  const [stage2Repair, setStage2Repair] = useState({});
  const [stage2Replace, setStage2Replace] = useState({});

  const componentList = [
    "External Body",
    "Internal Body",
    "Display Panel",
    "Door Handle",
    "Coin Return Lever",
    "Coin Return Pocket",
    "Delivery Door Flap",
    "Selector Button",
    "Body Sticker",
    "Product Canister",
    "Chute",
    "Tube",
    "Carbonation Unit",
    "Syrup Canister",
    "Valve",
    "Machine Floor Board",
    "Payment Device",
    "Cashless Unit",
    "PSU Board",
    "Vend Board",
    "Relay/Supply Board",
    "Memory Board",
    "Remote",
    "Compressor",
    "Cooling Fan",
    "Ice Maker",
  ];

  const stage1ColumnHeaders = ["Average", "Good", "Not Good", "Bad"];
  const stage2ColumnHeaders = [
    "Service",
    "Repair",
    "Replace/Exchange with remarks",
  ];

  const handleStage1CheckboxChange = (component, status) => {
    const updatedStatus = {};
    Object.keys(stage1Status).forEach((comp) => {
      updatedStatus[comp] = comp === component ? status : "";
    });
    setStage1Status(updatedStatus);
  };

  const handleStage2ServiceChange = (component, checked) => {
    setStage2Service({ ...stage2Service, [component]: checked });
  };

  const handleStage2RepairChange = (component, checked) => {
    setStage2Repair({ ...stage2Repair, [component]: checked });
  };

  const handleStage2ReplaceChange = (component, value) => {
    setStage2Replace({ ...stage2Replace, [component]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Stage 1:", stage1Status);
    console.log("Stage 2 Service:", stage2Service);
    console.log("Stage 2 Repair:", stage2Repair);
    console.log("Stage 2 Replace:", stage2Replace);
  };

  return (
    <div className="col-12 flex flex-column align-items-center">
      <div className="flex w-10">
        <div className="w-12">
          <div className="w-full flex justify-content-center flex-wrap">
            <div className="align-items-center flex ">
              <div className="card " style={{ width: "1085px" }}>
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#7f7f7f",
                      borderRadius: "4px",
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
                    <div className="col-5 ">
                      <div className="grid flex flex-column">
                        <div>
                          RefNo :{" "}
                          <InputText
                            placeholder="Internal Tracking no"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                        <div>
                          Model :{" "}
                          <InputText
                            placeholder="Machine model"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                        <div>
                          Seriel No :{" "}
                          <InputText
                            placeholder="Machine Serial no"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                        <div>
                          ManuYear :{" "}
                          <InputText
                            placeholder="Manufacture year"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid nested-grid col-7">
                      <div className="grid flex col-10 flex-column ">
                        <div>
                          Branch :{" "}
                          <InputText
                            placeholder="Respected branch"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                        <div>
                          Date Inspection :
                          <Calendar
                            dateFormat="dd/mm/yy hh:mm"
                            placeholder={"dd/mm/yy hh:mm"}
                            value={value}
                            onChange={(e) =>
                              setValByKey("DateInspec", e.target.value)
                            }
                            showTime
                            showIcon
                            showButtonBar
                          ></Calendar>
                        </div>
                        <div>
                          Date Recall :
                          <Calendar
                            dateFormat="dd/mm/yy hh:mm"
                            placeholder={"dd/mm/yy hh:mm"}
                            value={value}
                            onChange={(e) =>
                              setValByKey("DateRecall", e.target.value)
                            }
                            showTime
                            showIcon
                            showButtonBar
                          ></Calendar>
                        </div>
                        <div>
                          Recall Location :{" "}
                          <InputText
                            placeholder="Location name"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card grid nested-grid stageForm">
                    <div className="grid col-11">
                      <div className="col-2 col-offset-3">
                        <h5>Stage 1</h5>
                      </div>
                      <div className="col-5">
                        <h5>Stage2</h5>
                      </div>
                    </div>
                    <div
                      className="grid grid-nogutter col-12"
                      style={{
                        borderTop: "3px solid",
                        borderBottom: "3px solid",
                      }}
                    >
                      <div className="col-fixed" style={{ width: "140px" }}>
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
                      <div
                        className="col-fixed"
                        style={{ borderLeft: "3px solid" }}
                      >
                        <p>Service</p>
                      </div>
                      <div className="col-fixed">
                        <p>Repair</p>
                      </div>
                      <div className="col-3">
                        <p>Replace/Exchange with remarks</p>
                      </div>
                    </div>
                    <div className="grid grid-nogutter col-12">
                      {componentList.map((component, idx) => (
                        <React.Fragment key={idx}>
                          <div
                            className="col-fixed"
                            style={{ width: "140px", textAlign: "left" }}
                          >
                            {component}
                          </div>
                          {stage1ColumnHeaders.map((header, index) => (
                            <div
                              className="col-fixed"
                              key={`${component}_${header}`}
                            >
                              <Checkbox
                                inputId={`${component}_${header}`}
                                checked={stage1Status[component] === header}
                                onChange={(e) =>
                                  handleStage1CheckboxChange(
                                    component,
                                    header,
                                    e.checked,
                                  )
                                }
                              />
                            </div>
                          ))}
                          <div
                            className="col-fixed"
                            style={{ borderLeft: "3px solid" }}
                          >
                            <Checkbox
                              inputId={`service_${component}`}
                              checked={stage2Service[component]}
                              onChange={(e) =>
                                handleStage2ServiceChange(component, e.checked)
                              }
                            />
                          </div>
                          <div className="col-fixed">
                            <Checkbox
                              inputId={`repair_${component}`}
                              checked={stage2Repair[component]}
                              onChange={(e) =>
                                handleStage2RepairChange(component, e.checked)
                              }
                            />
                          </div>
                          <div className="col-3">
                            <InputText
                              value={stage2Replace[component] || ""}
                              onChange={(e) =>
                                handleStage2ReplaceChange(
                                  component,
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <br></br>

                  <div className="card grid nested-grid">
                    <h5>Stage 1 agreement</h5>
                    <div className="grid col-12 HC1Agreement">
                      <div className="grid flex-row col-12">
                        <div className="col-2">Stage 1</div>
                        <div className="col-2">Name</div>
                        <div className="col-2">Sign</div>
                        <div className="col-2">Date</div>
                        <div className="col-4">Proceed to Stage 2?</div>
                      </div>
                      <div className="grid flex-row col-12">
                        <div className="col-2">Technician</div>
                        <div className="col-2">
                          <InputText />
                        </div>
                        <div className="col-2">
                          <InputText />
                        </div>
                        <div className="col-2">
                          <Calendar dateFormat="dd/mm/yy" />
                        </div>
                        <div className="col-2">
                          <Checkbox />
                          <label>Yes</label>
                        </div>
                        <div className="col-2">
                          <Checkbox />
                          <label>No</label>
                        </div>
                      </div>
                      <div className="grid flex-row col-12">
                        <div className="col-2">Supervisor</div>
                        <div className="col-2">
                          <InputText />
                        </div>
                        <div className="col-2">
                          <InputText />
                        </div>
                        <div className="col-2">
                          <Calendar dateFormat="dd/mm/yy" />
                        </div>
                        <div className="col-2">
                          <Checkbox />
                          <label>Yes</label>
                        </div>
                        <div className="col-2">
                          <Checkbox />
                          <label>No</label>
                        </div>
                      </div>
                      <div className="grid flex-row col-12">
                        <div className="col-2">Manager</div>
                        <div className="col-2">
                          <InputText />
                        </div>
                        <div className="col-2">
                          <InputText />
                        </div>
                        <div className="col-2">
                          <Calendar dateFormat="dd/mm/yy" />
                        </div>
                        <div className="col-2">
                          <Checkbox />
                          <label>Yes</label>
                        </div>
                        <div className="col-2">
                          <Checkbox />
                          <label>No</label>
                        </div>
                      </div>
                    </div>
                    <div>
                      Remarks :
                      <InputTextarea
                        id="remarks"
                        autoResize
                        rows={5}
                        cols={30}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="card grid nested-grid">
                    <h5>Stage 1 agreement</h5>
                    <div className="grid col-12 HC1Agreement">
                      <div className="grid flex-row col-12">
                        <div className="col-2">Stage 2</div>
                        <div className="col-2">Name</div>
                        <div className="col-2">Sign</div>
                        <div className="col-2">Date</div>
                        <div className="col-4">Release to trade?</div>
                      </div>
                      <div className="grid flex-row col-12">
                        <div className="col-2">Technician</div>
                        <div className="col-2">
                          <InputText />
                        </div>
                        <div className="col-2">
                          <InputText />
                        </div>
                        <div className="col-2">
                          <Calendar dateFormat="dd/mm/yy" />
                        </div>
                        <div className="col-2">
                          <Checkbox />
                          <label>Yes</label>
                        </div>
                        <div className="col-2">
                          <Checkbox />
                          <label>No</label>
                        </div>
                      </div>
                      <div className="grid flex-row col-12">
                        <div className="col-2">Supervisor</div>
                        <div className="col-2">
                          <InputText />
                        </div>
                        <div className="col-2">
                          <InputText />
                        </div>
                        <div className="col-2">
                          <Calendar dateFormat="dd/mm/yy" />
                        </div>
                        <div className="col-2">
                          <Checkbox />
                          <label>Yes</label>
                        </div>
                        <div className="col-2">
                          <Checkbox />
                          <label>No</label>
                        </div>
                      </div>
                      <div className="grid flex-row col-12">
                        <div className="col-2">Manager</div>
                        <div className="col-2">
                          <InputText />
                        </div>
                        <div className="col-2">
                          <InputText />
                        </div>
                        <div className="col-2">
                          <Calendar dateFormat="dd/mm/yy" />
                        </div>
                        <div className="col-2">
                          <Checkbox />
                          <label>Yes</label>
                        </div>
                        <div className="col-2">
                          <Checkbox />
                          <label>No</label>
                        </div>
                      </div>
                    </div>
                    <div>
                      Remarks :
                      <InputTextarea
                        id="remarks"
                        autoResize
                        rows={5}
                        cols={30}
                      />
                    </div>
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HCMasterForm;
