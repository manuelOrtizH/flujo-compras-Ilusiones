
import OptionsCard from "./OptionsCard";
import { React } from "react";

const Warehouse = () => {
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
                    />
                </div>
                <div className="col text-center">
                    <OptionsCard
                        title={'Consulta de almacenes'}
                        description={'Obtén la información acerca de los almacenes actuales.'}
                        imageUrl={'https://images.unsplash.com/photo-1624927637280-f033784c1279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80'}
                        isModalNeeded={false}
                    />
                </div>
            </div>
            
            
        </div>

    );

};

export default Warehouse;