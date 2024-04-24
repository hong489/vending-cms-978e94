import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import client from "../../../services/restClient";
import TicketDataTable from "./TicketDataTable";
import SupervisorTicketEditDialogComponent from "./SupervisorTicketEditDialogComponent";

const SupervisorTicketPage = (props) => {
  const [tickets, setTickets] = useState([]);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tech, setTech] = useState([]);
  useEffect(() => {
    // Fetch ticket data from the server
    fetchTickets();
    fetchTechnicians();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await client.service("ticket").find();
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      // Handle error
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await client.service("Users").find({ query: { userType: "technician", $limit: 100 } });
      setTech(response.data); // Set tech state with technician data
    } catch (error) {
      console.error("Error fetching technicians:", error);
      // Handle error
    }
  };
  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
    setShowEditDialog(true);
  };

  const handleEditResult = (updatedTicket) => {
    // Update ticket in the tickets array
    const updatedTickets = tickets.map((ticket) =>
      ticket._id === updatedTicket._id ? updatedTicket : ticket
    );
    setTickets(updatedTickets);
    setShowEditDialog(false);
  };

  return (
    <div>
      <div className="mb-4">
        <h1>Supervisor Ticket Page</h1>
        <Button
          label="Refresh Tickets"
          icon="pi pi-refresh"
          onClick={fetchTickets}
        />
      </div>
      <TicketDataTable
        items={tickets}
        onEditRow={handleEdit}
        tech={tech}
      />
      <SupervisorTicketEditDialogComponent
        entity={selectedTicket}
        show={showEditDialog}
        onHide={() => setShowEditDialog(false)}
        onEditResult={handleEditResult}
      />
    </div>
  );
};

const mapState = (state) => ({
  // Map state properties here if needed
});

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  // Map dispatch actions here if needed
});

export default connect(mapState, mapDispatch)(SupervisorTicketPage);
