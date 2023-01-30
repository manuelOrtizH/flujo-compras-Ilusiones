import React from 'react';
import './Home.css';
import { Card, Row, Text } from "@nextui-org/react";

const Home = () => {
    return (
        <div>
            <div className = 'jumbotron jumbotron-fluid text-white' >
                <div className='container'>
                    <h1 className='display-4 ' style={{color:'white', fontWeight:'bolder'}}>Ilusiones S.A de C.V</h1>
                    <p className='lead'>La empresa Ilusiones S.A. de C.V. vende equipos celulares y necesita realizar compras de mercancía
                    a través de 2 archivos que envía la empresa matriz y que corresponden a 2 archivos: un archivo Excel
                    de Orden de Compras y otro archivo Excel de Recepción de Mercancía.</p>
                    <hr className='my-4 text-white'/>
                    <p>Desarrollado por Manuel Ortiz</p>
                    <p>Caso por parte de M2CROWD</p>
                    <br></br>
                    <br></br>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm">
                        <Card hoverable className='mb-3'>
                            <Card.Body css={{ p: 0 }}>
                            <Card.Image
                                objectFit="cover"
                                src='https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                                width="100%"
                                height={140}
                                alt='sda'
                            />
                            </Card.Body>
                            <Card.Footer justify="flex-start" style={{backgroundColor: '#880808'}}>
                            <Row wrap="wrap" justify="space-between">
                                <Text b style={{fontSize: '25px', color: 'white'}}>Crea y registra los diferentes almacenes</Text>
                            </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                    <div className="col-sm">
                        <Card hoverable className='mb-3'>
                            <Card.Body css={{ p: 0 }}>
                            <Card.Image
                                objectFit="cover"
                                src='https://images.unsplash.com/photo-1546198632-9ef6368bef12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                                width="100%"
                                height={140}
                                alt='sda'
                            />
                            </Card.Body>
                            <Card.Footer justify="flex-start" style={{backgroundColor: '#880808'}}>
                            <Row wrap="wrap" justify="space-between">
                            <Text b style={{fontSize: '25px', color: 'white'}}>Consulta inventarios por almancenes</Text>
                            </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                    <div className="col-sm">
                        <Card hoverable className='mb-3'>
                            <Card.Body css={{ p: 0 }}>
                            <Card.Image
                                objectFit="cover"
                                src='https://images.unsplash.com/photo-1529078155058-5d716f45d604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
                                width="100%"
                                height={140}
                                alt='sda'
                            />
                            </Card.Body>
                            <Card.Footer justify="flex-start" style={{backgroundColor: '#880808'}}>
                            <Row wrap="wrap" justify="space-between">
                                <Text b style={{fontSize: '25px', color: 'white'}}>Sube archivos de órdenes y de mercancía</Text>
                            </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;