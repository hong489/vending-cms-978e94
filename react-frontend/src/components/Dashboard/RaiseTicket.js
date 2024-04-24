import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import _ from "lodash";
import { Button } from "primereact/button";
import TicketDialog from "./TicketDialog";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import vending from "../../assets/media/vendingmachine.jpg";

const RaiseTicket = (props) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const handleToggleDialog = () => {
    setDialogVisible((prev) => !prev);
  };
  const onCreateResult = (newEntity) => {
    setData([...data, newEntity]);
  };
  return (
    <div className="grid">
      <div className="col-45">
        <Image
          src={vending}
          alt="vending"
          preview={false}
          width="500px"
          height="500px"
          className="image"
        />
      </div>
      <div>
        <Card
          className="p-mb-4"
          style={{ width: "400px", textAlign: "center" }}
        >
          <h2>Report a Broken Vending Machine</h2>
          <p>If you've found a broken vending machine, report it here.</p>
          <Button
            label="Report Now"
            icon="pi pi-arrow-right"
            className="p-button-raised p-mt-4"
            onClick={() => setShowCreateDialog(true)}
            role="ticket-add-button"
          />
        </Card>
      </div>
      <TicketDialog
        show={showCreateDialog}
        onHide={() => setShowCreateDialog(false)}
        onCreateResult={onCreateResult}
      />
    </div>
  );
};

const mapState = (state) => ({
  //
});
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  //
});

export default connect(mapState, mapDispatch)(RaiseTicket);
