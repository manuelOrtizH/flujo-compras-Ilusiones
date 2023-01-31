import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalWarehouse = (props) => {
    const {handleSubmit, ...res} = props
    const [formData, setFormData] = useState({});
    const onCustomFormChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return(
        <Modal
            {...res}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton className="text-center text-white" style={{'backgroundColor': '#3D454C'}}>
                <Modal.Title id="contained-modal-title-vcenter"  >
                Registro de almacén
                </Modal.Title>
            </Modal.Header>
            <form>
                <Modal.Body>
                    <h4>Llena los datos necesarios</h4>
                    <hr></hr>
                        <div className="form-group">
                            <label >Nombre del almacén</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="inputName" 
                                name='name'
                                aria-describedby="name"
                                placeholder="Ingresa el nombre"
                                onChange={e=>onCustomFormChange(e)}/>
                            
                        </div>
                        <div className="form-group">
                            <label className="mt-3" >Sub Inventario</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="inputSubInventary" 
                                name='subInventory'
                                aria-describedby="subInventary" 
                                placeholder="Ingresa el sub inventario"
                                onChange={e=>onCustomFormChange(e)}/>
                            <small id="emailHelp" className="form-text text-muted">Tiene que ser único</small>
                        </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn-success" onClick={() => props.handleSubmit(formData)} >Registrar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};


export default ModalWarehouse;