import React, { useState } from "react";
import Table from 'react-bootstrap/Table';

const ConsultWarehouse = (props) => {
    const [products, setProducts] = useState(props.products);
    const tableRows = [];

    for (const [key,value] of Object.entries(products)){
        tableRows.push(
            <tr key={value.$oid} value={value.$oid}>
                <td>{value.model}</td>
                <td>{value.invoice}</td>
                <td>{value.imei}</td>
            </tr>
        );
    };

    return(
        <div className="container mb-5">
            <h1 className="text-center">Almacén {props.name} </h1>

            <h4 className="text-center">Inventario {props.inventory}  </h4>

            
            
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">Modelo</th>
                        <th scope="col">Folio</th>
                        <th scope="col">IMEI</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
        </div>
    );
};


export default ConsultWarehouse;