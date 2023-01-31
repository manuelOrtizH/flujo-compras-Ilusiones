import {React,useState} from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from "sweetalert2";
import CreateWarehouseModal from "../common/CreateWarehouseModal";
import axios from 'axios';

const OptionsCard = ({title,description,imageUrl,isModalNeeded}) => {
    const [modalShow, setModalShow] = useState(false);
    

    const handleSubmit = async(formData)=>{
        const body = {name: formData.name, subInventory: formData.subInventory, orders: [], inventories: []};
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        console.log('UWU', process.env.REACT_APP_API_URL)
        await axios.post(`http://127.0.0.1:8000/api/warehouses/create_warehouse/`, body, config)
        .then((res)=>console.log(res));
        await Alert.fire("Almacén registrado!", `Has creado y registrado un nuevo almacén`, "success");
        setModalShow(false);
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

export default OptionsCard;