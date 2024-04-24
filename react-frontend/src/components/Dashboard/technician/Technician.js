import React, { useEffect, useState } from "react";
import _, { map, set } from "lodash";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TicketDataTable from "./TicketAssignedTable";
import client from "../../../services/restClient";
import HCMasterFormDataTable from "./HCdatatable";
import CBMasterFormDataTable from "./CBdataTable";
import HCMasterFormEdit from "../HC/HCFORMEdit";
import CBMasterFormEdit from "../CB/CBFORMEdit";
import HCstage1 from "../HC/HCstage1";
import HCAgree1 from "../HC/HCAgree1";
import HCstage2 from "../HC/HCstage2";
import HCAgree2 from "../HC/HCAgree2";
import CBstage1 from "../CB/CBstage1";
import CBAgree1 from "../CB/CBAgree1";
import CBstage2 from "../CB/CBstage2";
import CBAgree2 from "../CB/CBAgree2";
import AreYouSureDialog from "../../common/AreYouSureDialog";

const TechnicianPage = ({ isLoggedIn, user, props }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [HCdataTable, setHCdataTable] = useState([]);
  const [CBdataTable, setCBdataTable] = useState([]);
  const [HCstage1Data, setHCStage1Data] = useState([]);
  const [HCstage2Data, setHCStage2Data] = useState([]);
  const [HCstage1AgreeData, setHCStage1AgreeData] = useState([]);
  const [HCstage2AgreeData, setHCStage2AgreeData] = useState([]);
  const [CBstage1Data, setCBstage1Data] = useState([]);
  const [CBstage2Data, setCBstage2Data] = useState([]);
  const [CBstage1AgreeData, setCBstage1AgreeData] = useState([]);
  const [CBstage2AgreeData, setCBstage2AgreeData] = useState([]);
  const [showHCMaster, setShowHCMaster] = useState(false);
  const [showHCstage1, setShowHCstage1] = useState(false);
  const [showHCstage2, setShowHCstage2] = useState(false);
  const [showHCAgree1, setShowHCAgree1] = useState(false);
  const [showHCAgree2, setShowHCAgree2] = useState(false);
  const [showCBMaster, setShowCBMaster] = useState(false);
  const [showCBstage1, setShowCBstage1] = useState(false);
  const [showCBstage2, setShowCBstage2] = useState(false);
  const [showCBAgree1, setShowCBAgree1] = useState(false);
  const [showCBAgree2, setShowCBAgree2] = useState(false);
  const [selectedEntityIndex, setSelectedEntityIndex] = useState();

  useEffect(() => {
    if (isLoggedIn && user) {
      fetchFilteredTickets();
      fetchHCDatatable();
      fetchCBDatatable();
      fetchCBAllData();
      fetchHCAllData();
    }
  }, [isLoggedIn, user]);

  const fetchHCDatatable = async () => {
    const response = await client
      .service("hCMasterForm")
      .find({ query: { $limit: 100 } });
    // console.log("HC Master Form Data:", response.data);
    setHCdataTable(response.data);
  };

  const fetchCBDatatable = async () => {
    const response = await client
      .service("cBMasterForm")
      .find({ query: { $limit: 100 } });
    // console.log("CB Master Form Data:", response.data);
    setCBdataTable(response.data);
  };

  const fetchFilteredTickets = async () => {
    try {
      const response = await client
        .service("ticket")
        .find({ query: { assignedTo: user._id } });
      // console.log("Filtered Tickets:", response.data); // Log filtered tickets
      setFilteredTickets(response.data);
    } catch (error) {
      console.log("Error fetching filtered tickets:", error);
    }
  };

  const fetchHCAllData = async () => {
    try {
      const [HCstage1Data, HCstage2Data, HCstage1AgreeData, HCstage2AgreeData] =
        await Promise.all([
          client
            .service("hCStage1")
            .find({
              query: {
                $limit: 100,
                $populate: [
                  { path: "Ref", service: "hCMasterForm", select: ["RefNo"] },
                ],
              },
            }),
          client
            .service("hCStage2")
            .find({
              query: {
                $limit: 100,
                $populate: [
                  { path: "Ref", service: "hCMasterForm", select: ["RefNo"] },
                ],
              },
            }),
          client
            .service("hCStage1Agree")
            .find({
              query: {
                $limit: 100,
                $populate: [
                  { path: "Ref", service: "hCMasterForm", select: ["RefNo"] },
                ],
              },
            }),
          client
            .service("hCStage2Agree")
            .find({
              query: {
                $limit: 100,
                $populate: [
                  { path: "Ref", service: "hCMasterForm", select: ["RefNo"] },
                ],
              },
            }),
        ]);

      setHCStage1Data(HCstage1Data.data);
      setHCStage2Data(HCstage2Data.data);
      setHCStage1AgreeData(HCstage1AgreeData.data);
      setHCStage2AgreeData(HCstage2AgreeData.data);
    } catch (error) {
      console.log("Error fetching HC data:", error);
      props.alert({
        title: "HC Data",
        type: "error",
        message: error.message || "Failed to get HC data",
      });
    }
  };

  const fetchCBAllData = async () => {
    try {
      const [CBstage1Data, CBstage2Data, CBstage1AgreeData, CBstage2AgreeData] =
        await Promise.all([
          client
            .service("cBStage1")
            .find({
              query: {
                $limit: 100,
                $populate: [
                  { path: "Ref", service: "cBMasterForm", select: ["RefNo"] },
                ],
              },
            }),
          client
            .service("cBStage2")
            .find({
              query: {
                $limit: 100,
                $populate: [
                  { path: "Ref", service: "cBMasterForm", select: ["RefNo"] },
                ],
              },
            }),
          client
            .service("cBStage1Agree")
            .find({
              query: {
                $limit: 100,
                $populate: [
                  { path: "Ref", service: "cBMasterForm", select: ["RefNo"] },
                ],
              },
            }),
          client
            .service("cBStage2Agree")
            .find({
              query: {
                $limit: 100,
                $populate: [
                  { path: "Ref", service: "cBMasterForm", select: ["RefNo"] },
                ],
              },
            }),
        ]);

      setCBstage1Data(CBstage1Data.data);
      setCBstage2Data(CBstage2Data.data);
      setCBstage1AgreeData(CBstage1AgreeData.data);
      setCBstage2AgreeData(CBstage2AgreeData.data);
    } catch (error) {
      console.log("Error fetching CB data:", error);
      props.alert({
        title: "CB Data",
        type: "error",
        message: error.message || "Failed to get CB data",
      });
    }
  };

  const onEditHCmaster = (rowData, rowIndex) => {
    setSelectedEntityIndex(rowIndex);
    setShowHCMaster(true);
  };
  const onEditHCStage1 = (rowData, rowIndex) => {
    setSelectedEntityIndex(rowIndex);
    setShowHCstage1(true);
  };
  const onEditHCStage2 = (rowData, rowIndex) => {
    setSelectedEntityIndex(rowIndex);
    setShowHCstage2(true);
  };
  const onEditHCAgree1 = (rowData, rowIndex) => {
    setSelectedEntityIndex(rowIndex);
    setShowHCAgree1(true);
  };
  const onEditHCAgree2 = (rowData, rowIndex) => {
    setSelectedEntityIndex(rowIndex);
    setShowHCAgree2(true);
  };

  const onEditCBmaster = (rowData, rowIndex) => {
    setSelectedEntityIndex(rowIndex);
    setShowCBMaster(true);
  };
  const onEditCBStage1 = (rowData, rowIndex) => {
    setSelectedEntityIndex(rowIndex);
    setShowCBstage1(true);
  };
  const onEditCBStage2 = (rowData, rowIndex) => {
    setSelectedEntityIndex(rowIndex);
    setShowCBstage2(true);
  };
  const onEditCBAgree1 = (rowData, rowIndex) => {
    setSelectedEntityIndex(rowIndex);
    setShowCBAgree1(true);
  };
  const onEditCBAgree2 = (rowData, rowIndex) => {
    setSelectedEntityIndex(rowIndex);
    setShowCBAgree2(true);
  };

  const onEditResult = (newEntity) => {
    let _newData = _.cloneDeep(data);
    _newData[selectedEntityIndex] = newEntity;
    setData(_newData);
  };

  const HConRowClick = ({ data }) => {
    navigate(`/hCForm/${data._id}`);
  };

  const CBonRowClick = ({ data }) => {
    navigate(`/cBForm/${data._id}`);
  };

  return (
    <div className="col-12 flex flex-column align-items-center">
      {isLoggedIn ? (
        <>
          <h2>Welcome aboard,</h2>
          <p>{user?.name}</p>
        </>
      ) : (
        <p>Please login</p>
      )}
      <div className="card grid flex w-12 h-12">
        <Link to="/HCFORM">
          <div className="card">Create HC Form</div>
        </Link>
        <Link to="/CBFORM">
          <div className="card">Create CB Form</div>
        </Link>
      </div>
      <div className="card flex w-12 h-12 TaskAssigned">
        <TicketDataTable items={filteredTickets} />
      </div>
      <div className="card grid flex w-12 h-12 ">
        <h3>Hot & Cold Machine Table</h3>
        <div className="col-12">
          <HCMasterFormDataTable
            items={HCdataTable}
            onRowClick={HConRowClick}
            editHCmaster={onEditHCmaster}
            editHCStage1={onEditHCStage1}
            editHCStage2={onEditHCStage2}
            editHCAgree1={onEditHCAgree1}
            editHCAgree2={onEditHCAgree2}
          />
        </div>
      </div>
      <div className="card grid flex w-12 h-12 ">
        <h3>Can & Bottle Machine Table</h3>
        <div className="col-12">
          <CBMasterFormDataTable
            items={CBdataTable}
            onRowClick={CBonRowClick}
            editCBmaster={onEditCBmaster}
            editCBStage1={onEditCBStage1}
            editCBStage2={onEditCBStage2}
            editCBAgree1={onEditCBAgree1}
            editCBAgree2={onEditCBAgree2}
          />
        </div>
      </div>
      <HCMasterFormEdit
        entity={HCdataTable[selectedEntityIndex]}
        show={showHCMaster}
        onHide={() => setShowHCMaster(false)}
        onEditResult={onEditResult}
      />
      <HCstage1
        entity={HCstage1Data[selectedEntityIndex]}
        show={showHCstage1}
        onHide={() => setShowHCstage1(false)}
        onEditResult={onEditResult}
      />
      <HCAgree1
        entity={HCstage1AgreeData[selectedEntityIndex]}
        show={showHCAgree1}
        onHide={() => setShowHCAgree1(false)}
        onEditResult={onEditResult}
      />
      <HCstage2
        entity={HCstage2Data[selectedEntityIndex]}
        show={showHCstage2}
        onHide={() => setShowHCstage2(false)}
        onEditResult={onEditResult}
      />
      <HCAgree2
        entity={HCstage2AgreeData[selectedEntityIndex]}
        show={showHCAgree2}
        onHide={() => setShowHCAgree2(false)}
        onEditResult={onEditResult}
      />
      <CBMasterFormEdit
        entity={CBdataTable[selectedEntityIndex]}
        show={showCBMaster}
        onHide={() => setShowCBMaster(false)}
        onEditResult={onEditResult}
      />
      <CBstage1
        entity={CBstage1Data[selectedEntityIndex]}
        show={showCBstage1}
        onHide={() => setShowCBstage1(false)}
        onEditResult={onEditResult}
      />
      <CBAgree1
        entity={CBstage1AgreeData[selectedEntityIndex]}
        show={showCBAgree1}
        onHide={() => setShowCBAgree1(false)}
        onEditResult={onEditResult}
      />
      <CBstage2
        entity={CBstage2Data[selectedEntityIndex]}
        show={showCBstage2}
        onHide={() => setShowCBstage2(false)}
        onEditResult={onEditResult}
      />
      <CBAgree2
        entity={CBstage2AgreeData[selectedEntityIndex]}
        show={showCBAgree2}
        onHide={() => setShowCBAgree2(false)}
        onEditResult={onEditResult}
      />
    </div>
  );
};

const mapState = (state) => {
  const { isLoggedIn, user } = state.auth;
  return { isLoggedIn, user };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(TechnicianPage);
