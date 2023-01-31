import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from "sweetalert2";
import CreateWarehouseModal from "./CreateWarehouseModal";
import axios from 'axios';

const OptionsCard = ({title,description,imageUrl,isModalNeeded, setWarehouse}) => {
    const [modalShow, setModalShow] = useState(false);
    const [subInventory, setSubInventory] = useState({name: ''});
    

    const handleSubmit = async(formData)=>{
        const body = {name: formData.name, sub_inventory: formData.subInventory, orders: [], inventories: []};
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        let titleAlert = 'Éxito';
        let titleDescription = 'Se ha registrado el almacén con éxito';
        let type = 'success';
        await axios.post(`${process.env.REACT_APP_API_URL}/warehouses/create_warehouse/`, body, config)
        .catch(error => {
            if (error.response){
                titleAlert = 'Error';
                titleDescription = 'Error al crear o ya existe un almacén con el sub inventario';
                type = 'error';
            } 
        }).finally(async() => {
            await Alert.fire(titleAlert, titleDescription, type);
            setModalShow(false);
        });
       
    }

    const onLabelChange = e => {setSubInventory({ ...subInventory, [e.target.name]: e.target.value })};
        
    const handleConsult = async()=>{
        await axios.get(`${process.env.REACT_APP_API_URL}/warehouses/get_warehouse/?sub_inventory=${subInventory.name}`)
        .catch(async(error) => {
            if (error.response){
                await Alert.fire('Error', 'Error al obtener el almacén', 'error');
            } 
        }).then(async (res) => {
            await setWarehouse(res.data.body[0]);
        });
        
    };

    return (
        <div>
            <Card>
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <Card.Title className="text-center ">{title}</Card.Title>
                    <Card.Text>
                    {description}
                    </Card.Text>
                    {isModalNeeded ? (
                        <Button variant="primary"  onClick={() => setModalShow(true)}>Crear</Button>) : 
                        <div className="row">
                            
                            <div className="col">
                                <input type="text" name='name' placeholder="Ingresa sub inventario" onChange={e=>onLabelChange(e)}/>
                            </div>
                            <div className="col mr-5">
                                <Button className="mt-2" variant="success"  onClick={() => handleConsult()}>Consultar</Button>    
                            </div>
                            
                        </div>}
                </Card.Body>
            </Card>

            <CreateWarehouseModal
                handleSubmit={handleSubmit}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )

};

export default OptionsCard;