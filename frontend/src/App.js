import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './components/Home';
import Header from './components/common/Header';
import Warehouse from './components/warehouses/Warehouse';
import Products from './components/products/Products';

const App = () => {
	return (
		<Router>
			<Header></Header>
			<Routes>
				<Route path='/' element={<Home/>}> </Route>
				<Route path='/warehouses' element={<Warehouse/>}> </Route>
				<Route path='/products' element={<Products/>}></Route>
			</Routes>
		</Router>
	)

};


export default App;
