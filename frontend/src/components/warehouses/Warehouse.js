import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Warehouse = () => {
    return (
        <div className='container mt-4'>
            <h1 className="text-center"> Almacenes </h1>
            <p className="mt-4">Crear y registra los diferentes almacenes, con su respectivo nombre, 
            su sub inventario y obtén información con respecto a sus inventarios y órdenes de compra.</p>
            <hr></hr>

            <div class="row">
                <div class="col text-center">
                    <Card >
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1490&q=80" />
                    <Card.Body>
                        <Card.Title className="text-center ">Registro de almacenes</Card.Title>
                        <Card.Text>
                        Crea y registra los diferentes almacenes con los que se trabaja.
                        </Card.Text>
                        <Button variant="primary">Crear</Button>
                    </Card.Body>
                    </Card>
                </div>
                <div class="col text-center">
                    <Card>
                        <Card.Img variant="top" className="text-center" src="https://images.unsplash.com/photo-1624927637280-f033784c1279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80" />
                        <Card.Body>
                            <Card.Title  className="text-center">Consulta de almacenes</Card.Title>
                            <Card.Text>
                            Obtén la información acerca de los almacenes actuales.
                            </Card.Text>
                            <Button className="text-center" variant="success">Consultar</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>

        </div>

    );

};

export default Warehouse;