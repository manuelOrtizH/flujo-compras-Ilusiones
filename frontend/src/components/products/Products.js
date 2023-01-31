import React, {useState} from "react";
import OptionsCard from "../common/OptionsCard";
import { triggerAlert } from "../common/Alert";
import S3 from 'react-aws-s3';
import AppLoading from "../common/Loading";
import axios from "axios";

window.Buffer = window.Buffer || require("buffer").Buffer;


const Products = () => {
    const [isLoading, setIsLoading] = useState(false);


    const createOrders = async(filename) => {
        let title = 'Éxito';
        let description = 'Se han creado todas las órdenes con éxito';
        let type = 'success'; 
        setIsLoading(true);
        await axios.post(`${process.env.REACT_APP_API_URL}/orders/create_order/`, {filename: filename})
        .catch(error => {
            if (error){
                title = 'Error';
                description = 'Un almacén no existe en el archivo o ha habido un error con el servidor';
                type = 'error';
            }
        }).then(async(res) => {
            await triggerAlert(title, description, type);
        });
        setIsLoading(false);
    };

    const createProducts = async(filename) => {
        let title = 'Éxito';
        let description = 'Se han creado los productos con éxito';
        let type = 'success'; 
        setIsLoading(true);
        await axios.post(`${process.env.REACT_APP_API_URL}/products/create_product/`, {filename: filename})
        .catch(error => {
            if (error){
                title = 'Error';
                description = 'Un almacén no existe en el archivo o ha habido un error con el servidor';
                type = 'error';
            }
        }).then(async(res) => {
            await triggerAlert(title, description, type);
        });
        setIsLoading(false);
    };

    


    const uploadFile = async(type, file) => {
        const config = {
            bucketName: 'm2crowd-ilusiones-bucket1',
            prefix: type,
            region: 'us-west-1',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            ACL: 'public-read',
        };

        const S3Client = new S3(config);

        S3Client
        .uploadFile(file, file.name)
        .then(data => console.log(data.location))
        .catch(async(err) => {
            if (err){
                await triggerAlert('Error', 'Ha habido un error al subir el archivo', 'error');
            }
        });
        if (type==='ordenes-de-compra'){
            createOrders(file.name);
        }else {
            createProducts(file.name);
        }
        

    } 

    return (
        <div className='container mt-4'>
            <h1 className="text-center"> Órdenes de Compra y Recepción de Mercancía </h1>
            <p className="mt-4">Sube todos los archivos tipo excel necesarios para 
            poder automatizar los datos de esos archivos. Asegúrate que cada archivo tenga las 
            columnas necesarias, sino el sistema lo rechazará.</p>
            <hr></hr>
            <div className="mb-5">
                {isLoading ? <div><h4 className="text-center">Se está procesando el archivo...</h4><AppLoading/> </div> : null}
            </div>
            <div className="row">
                <div className="col text-center">
                    <OptionsCard
                        title={'Subir órdenes de compra'}
                        description={'Sube el archivo de orden de compra. El archivo se subirá a un S3 Bucket de AWS para después crear órdenes.'}
                        imageUrl={'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'}
                        isOrder={true}
                        isProduct={true}
                        uploadFile={uploadFile}
                    />
                </div>
                <div className="col text-center">
                    <OptionsCard
                        title={'Subir recepción de mercancía'}
                        description={'Sube el archivo de orden de compra. El archivo se subirá a un S3 Bucket de AWS para después crear los productos necesarios o no.'}
                        imageUrl={'https://images.unsplash.com/photo-1651525670114-2b8117390b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}
                        isReception={true}
                        isProduct={true}
                        uploadFile={uploadFile}
                        
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;