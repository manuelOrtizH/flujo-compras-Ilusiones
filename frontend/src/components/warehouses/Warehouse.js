import OptionsCard from "./OptionsCard";
import React, { useState, useEffect } from "react";
import ConsultWarehouse from "./ConsultWarehouse";
import axios from "axios";
import Alert from "sweetalert2";

const Warehouse = () => {
    const [warehouse, setWarehouse] = useState({sub_inventory: ''});
    const [inventory, setInventory] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState();
    
    useEffect(() => {
        const fetchInventory = async() => {
            await axios.get(`${process.env.REACT_APP_API_URL}/products/get_inventory/?name=${warehouse.sub_inventory}`)
            .catch(async(error) => {
                if (error.response){
                    await Alert.fire('Error', 'Error al obtener el inventario', 'error');
                } 
            }).then(async (res) => {
                await setInventory(res.data.body[0]);
            });
            
        };

        const fetchProducts = async() => {
            const ids = inventory.products.map(el => el.$oid).toString();
            await axios.get(`${process.env.REACT_APP_API_URL}/products/get_products/?ids=${ids}`)
            .catch(async(error) => {
                if (error.response){
                    await Alert.fire('Error', 'Error al obtener productos', 'error');
                } 
            }).then(async (res) => {
                await setProducts(res.data.body);
            });
            
            setIsLoading(false);
        };

        if(!inventory && warehouse.sub_inventory){
            fetchInventory();
        };

        if(!products && inventory){
            fetchProducts();
        };
        
        
    }, [warehouse.sub_inventory, inventory, products]);

    return (
        <div className='container mt-4'>
            <h1 className="text-center"> Almacenes </h1>
            <p className="mt-4">Crear y registra los diferentes almacenes, con su respectivo nombre, 
            su sub inventario y obtén información con respecto a sus inventarios y órdenes de compra.</p>
            <hr></hr>
            <div className="row">
                <div className="col text-center">
                    <OptionsCard
                        title={'Registro de almacenes'}
                        description={'Crea y registra los diferentes almacenes con los que se trabaja.'}
                        imageUrl={'https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1490&q=80'}
                        isModalNeeded={true}
                        setWarehouse={setWarehouse}
                    />
                </div>
                <div className="col text-center">
                    <OptionsCard
                        title={'Consulta de almacenes'}
                        description={'Obtén la información acerca de los almacenes actuales.'}
                        imageUrl={'https://images.unsplash.com/photo-1624927637280-f033784c1279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80'}
                        isModalNeeded={false}
                        setWarehouse={setWarehouse}
                    />
                </div>
            </div>
            <hr></hr>
            <div>
                {!isLoading ? 
                    <ConsultWarehouse name={warehouse.name} inventory={inventory.name} products={products}/> : 
                    <h2> </h2>}
            </div>
            
        </div>

    );

};

export default Warehouse;