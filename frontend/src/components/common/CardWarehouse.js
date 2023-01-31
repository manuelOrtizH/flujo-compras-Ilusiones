import {React,useState} from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from "sweetalert2";
import CreateWarehouseModal from "../warehouses/CreateWarehouseModal";

const CardWarehouse = ({title,description,imageUrl,isModalNeeded}) => {
    const [modalShow, setModalShow] = useState(false);
    const warehouse = {name: '', subInventory: '', orders: [], inventories: []};

    const handleSubmit = async(formData)=>{
        warehouse.name = formData.name;
        warehouse.subInventory = formData.subInventory;
        await Alert.fire("Almacén registrado!", `Has creado y registrado un nuevo almacén`, "success");
        setModalShow(false);
        console.log(`Warehouse to create: ${warehouse.name} ${warehouse.subInventory}`)
    }

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
                        <Button variant="success">Consultar</Button>}
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

export default CardWarehouse;