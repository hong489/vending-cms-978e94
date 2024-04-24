import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import _ from "lodash";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

import moment from "moment";

const HCMasterFormDataTable = ({
  items,
  onRowDelete,
  onRowClick,
  editHCmaster,
  editHCStage1,
  editHCStage2,
  editHCAgree1,
  editHCAgree2,
}) => {
  const pTemplate0 = (rowData, { rowIndex }) => <p>{rowData.RefNo}</p>;
  const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.Model}</p>;
  const pTemplate2 = (rowData, { rowIndex }) => <p>{rowData.SerialNo}</p>;
  const pTemplate3 = (rowData, { rowIndex }) => <p>{rowData.ManuYear}</p>;
  const pTemplate4 = (rowData, { rowIndex }) => <p>{rowData.Branch}</p>;
  const pTemplate5 = (rowData, { rowIndex }) => <p>{rowData.DateInspec}</p>;
  const pTemplate6 = (rowData, { rowIndex }) => <p>{rowData.DateRecall}</p>;
  const pTemplate7 = (rowData, { rowIndex }) => <p>{rowData.RecallLoc}</p>;
  const checkboxTemplate8 = (rowData, { rowIndex }) => (
    <Checkbox checked={rowData.ActiveCase}></Checkbox>
  );

  const editMaster = (rowData, { rowIndex }) => (
    <Button
      onClick={() => editHCmaster(rowData, rowIndex)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );

  const editstage1 = (rowData, { rowIndex }) => (
    <Button
      onClick={() => editHCStage1(rowData, rowIndex)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );

  const editStage1Agree = (rowData, { rowIndex }) => (
    <Button
      onClick={() => editHCAgree1(rowData, rowIndex)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );

  const editstage2 = (rowData, { rowIndex }) => (
    <Button
      onClick={() => editHCStage2(rowData, rowIndex)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );

  const editStage2Agree = (rowData, { rowIndex }) => (
    <Button
      onClick={() => editHCAgree2(rowData, rowIndex)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );

  const deleteTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onRowDelete(rowIndex)}
      icon="pi pi-times"
      className="p-button-rounded p-button-danger p-button-text"
    />
  );
  const pCreatedAt = (rowData, { rowIndex }) => (
    <p>{moment(rowData.createdAt).fromNow()}</p>
  );
  const pUpdatedAt = (rowData, { rowIndex }) => (
    <p>{moment(rowData.updatedAt).fromNow()}</p>
  );

  return (
    <DataTable
      value={items}
      onRowClick={onRowClick}
      scrollable
      rowHover
      paginator
      rows={10}
      rowClassName="cursor-pointer"
    >
      <Column
        field="RefNo"
        header="RefNo"
        body={pTemplate0}
        sortable
        style={{ minWidth: "8rem" }}
      />
      {/* <Column
        field="Model"
        header="Model"
        body={pTemplate1}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="SerialNo"
        header="SerialNo"
        body={pTemplate2}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="ManuYear"
        header="ManuYear"
        body={pTemplate3}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="Branch"
        header="Branch"
        body={pTemplate4}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="DateInspec"
        header="DateInspec"
        body={pTemplate5}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="DateRecall"
        header="DateRecall"
        body={pTemplate6}
        sortable
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="RecallLoc"
        header="RecallLoc"
        body={pTemplate7}
        sortable
        style={{ minWidth: "8rem" }}
      /> */}
      <Column
        field="ActiveCase"
        header="ActiveCase"
        body={checkboxTemplate8}
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="createdAt"
        header="created"
        body={pCreatedAt}
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="updatedAt"
        header="updated"
        body={pUpdatedAt}
        style={{ minWidth: "8rem" }}
        sortable
      />
      <Column
        field="EditMaster"
        header="EditMaster"
        body={editMaster}
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="EditStage1"
        header="EditStage1"
        body={editstage1}
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="EditAgree1"
        header="EditAgree1"
        body={editStage1Agree}
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="EditStage2"
        header="EditStage2"
        body={editstage2}
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="EditAgree2"
        header="EditAgree2"
        body={editStage2Agree}
        style={{ minWidth: "8rem" }}
      />
      {/* <Column header="Delete" body={deleteTemplate} /> */}
    </DataTable>
  );
};

export default HCMasterFormDataTable;
