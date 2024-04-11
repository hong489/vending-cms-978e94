import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleTicketPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("ticket")
            .get(urlParams.singleTicketId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Ticket", type: "error", message: error.message || "Failed get ticket" });
            });
    }, [props,urlParams.singleTicketId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Ticket</h3>
                </div>
                <p>ticket/{urlParams.singleTicketId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Location</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Location}</p></div>
                    <label className="text-sm text-primary">DateRaised</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.DateRaised}</p></div>
                    <label className="text-sm text-primary">Address</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Address}</p></div>
                    <label className="text-sm text-primary">Description</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Description}</p></div>
                    <label className="text-sm text-primary">Status</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Status}</p></div>
                    <label className="text-sm text-primary">AssignedTo</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.assignedTo}</p></div>
                    <label className="text-sm text-primary">DateAssigned</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.DateAssigned}</p></div>
                    <label className="text-sm text-primary">DateClosed</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.DateClosed}</p></div>
            
                    <label className="text-sm text-primary">created</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <label className="text-sm text-primary">updated</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
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
    //
});

export default connect(mapState, mapDispatch)(SingleTicketPage);
