import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './components/Home';
import Header from './components/common/Header';
import Warehouse from './components/warehouses/Warehouse';

const App = () => {
	return (
		<Router>
			<Header></Header>
			<Routes>
				<Route path='/' element={<Home/>}> </Route>
				<Route path='/warehouses' element={<Warehouse/>}> </Route>
			</Routes>
		</Router>
	)

};


export default App;
