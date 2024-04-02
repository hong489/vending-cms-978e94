
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';

import moment from "moment";

const CbStage2DataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.Ref?.RefNo}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.ExternalBody}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.InternalBody}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.DisplayPanel}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.DoorHandle}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.CoinReturnLever}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.CoinReturnPocket}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.DeliveryDoorFlap}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.SecDoorPanel}</p>
    const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.SecDoorFlap}</p>
    const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.ColumnStnd}</p>
    const pTemplate11 = (rowData, { rowIndex }) => <p >{rowData.ColumnMod}</p>
    const pTemplate12 = (rowData, { rowIndex }) => <p >{rowData.ColumnFlipper}</p>
    const pTemplate13 = (rowData, { rowIndex }) => <p >{rowData.MachineMaintenance}</p>
    const pTemplate14 = (rowData, { rowIndex }) => <p >{rowData.PSUBoard}</p>
    const pTemplate15 = (rowData, { rowIndex }) => <p >{rowData.VendBoard}</p>
    const pTemplate16 = (rowData, { rowIndex }) => <p >{rowData.RelaySupply}</p>
    const pTemplate17 = (rowData, { rowIndex }) => <p >{rowData.MemoryBoard}</p>
    const pTemplate18 = (rowData, { rowIndex }) => <p >{rowData.Remote}</p>
    const pTemplate19 = (rowData, { rowIndex }) => <p >{rowData.Compressor}</p>
    const pTemplate20 = (rowData, { rowIndex }) => <p >{rowData.CoolingFan}</p>
    const pTemplate21 = (rowData, { rowIndex }) => <p >{rowData.Wiring}</p>
    const pTemplate22 = (rowData, { rowIndex }) => <p >{rowData.Motor}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
      const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="Ref" header="Ref" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="ExternalBody" header="ExternalBody" body={pTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="InternalBody" header="InternalBody" body={pTemplate2} sortable style={{ minWidth: "8rem" }} />
            <Column field="DisplayPanel" header="DisplayPanel" body={pTemplate3} sortable style={{ minWidth: "8rem" }} />
            <Column field="DoorHandle" header="DoorHandle" body={pTemplate4} sortable style={{ minWidth: "8rem" }} />
            <Column field="CoinReturnLever" header="CoinReturnLever" body={pTemplate5} sortable style={{ minWidth: "8rem" }} />
            <Column field="CoinReturnPocket" header="CoinReturnPocket" body={pTemplate6} sortable style={{ minWidth: "8rem" }} />
            <Column field="DeliveryDoorFlap" header="DeliveryDoorFlap" body={pTemplate7} sortable style={{ minWidth: "8rem" }} />
            <Column field="SecDoorPanel" header="SecDoorPanel" body={pTemplate8} sortable style={{ minWidth: "8rem" }} />
            <Column field="SecDoorFlap" header="SecDoorFlap" body={pTemplate9} sortable style={{ minWidth: "8rem" }} />
            <Column field="ColumnStnd" header="ColumnStnd" body={pTemplate10} sortable style={{ minWidth: "8rem" }} />
            <Column field="ColumnMod" header="ColumnMod" body={pTemplate11} sortable style={{ minWidth: "8rem" }} />
            <Column field="ColumnFlipper" header="ColumnFlipper" body={pTemplate12} sortable style={{ minWidth: "8rem" }} />
            <Column field="MachineMaintenance" header="MachineMaintenance" body={pTemplate13} sortable style={{ minWidth: "8rem" }} />
            <Column field="PSUBoard" header="PSUBoard" body={pTemplate14} sortable style={{ minWidth: "8rem" }} />
            <Column field="VendBoard" header="VendBoard" body={pTemplate15} sortable style={{ minWidth: "8rem" }} />
            <Column field="RelaySupply" header="RelaySupply" body={pTemplate16} sortable style={{ minWidth: "8rem" }} />
            <Column field="MemoryBoard" header="MemoryBoard" body={pTemplate17} sortable style={{ minWidth: "8rem" }} />
            <Column field="Remote" header="Remote" body={pTemplate18} sortable style={{ minWidth: "8rem" }} />
            <Column field="Compressor" header="Compressor" body={pTemplate19} sortable style={{ minWidth: "8rem" }} />
            <Column field="CoolingFan" header="CoolingFan" body={pTemplate20} sortable style={{ minWidth: "8rem" }} />
            <Column field="Wiring" header="Wiring" body={pTemplate21} sortable style={{ minWidth: "8rem" }} />
            <Column field="Motor" header="Motor" body={pTemplate22} sortable style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default CbStage2DataTable;