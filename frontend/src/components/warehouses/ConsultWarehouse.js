import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';


const ConsultWarehouse = (props) => {
    const [products, setProducts] = useState(props.products);
    let tableRows = [];
    const [inputText, setInputText] = useState("");

    // useEffect(() => {
    //     if(inputText){
    //         setProducts(products.filter(record => record.imei === inputText));
    //     }else{
    //         setProducts(props.products);
    //     } 
        
    // }, [inputText,products, props.products]);

    const inputHandler = (e) => { setInputText(e.target.value.toUpperCase())};

    // for (const [key,value] of Object.entries(products)){
    //     tableRows.push(
    //         <tr key={key} value={value.imei}>
    //             <td>{value.model}</td>
    //             <td>{value.invoice}</td>
    //             <td>{value.imei}</td>
    //         </tr>
    //     );
    // };

    
    


    return(
        <div className="container mb-5">
            <h1 className="text-center">Almacén {props.name} </h1>

            <h4 className="text-center">Inventario {props.inventory}  </h4>

            
            
            <div className="search text-center mb-3">
                
                <input
                    id="outlined-basic"
                    name='value'
                    onChange={(e) => inputHandler(e)}
                    variant="outlined"
                    fullWidth
                    label="Search"
                    placeholder="Buscar"
                />
                
            </div>
            <p className="text-center">Busca el Producto necesario</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">Modelo</th>
                        <th scope="col">Folio</th>
                        <th scope="col">IMEI</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {props.products.map(el => {
                        return(
                        <tr key={el.imei} value={el.imei}>
                            <td>{el.model}</td>
                            <td>{el.invoice}</td>
                            <td>{el.imei}</td>
                        </tr>) ||
                    })} */}
                    {products.filter(el=> {
                                        console.log('imei', el.imei)
                                        console.log('txt', inputText)
                                        if (el.imei === inputText || inputText === '') {
                                            return el
                                        } return null})
                                   .map(el=>{
                                    return(
                                        <tr key={el.imei} value={el.imei}>
                                        <td>{el.model}</td>
                                        <td>{el.invoice}</td>
                                        <td>{el.imei}</td>
                                        </tr>
                                    )
                                   })}
                </tbody>
            </Table>
        </div>
    );
};


export default ConsultWarehouse;