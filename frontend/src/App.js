import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './components/Home';
import Header from './components/common/Header';

const App = () => {
	return (
		<Router>
			<Header></Header>
			<Routes>
				<Route path='/' element={<Home/>}> </Route>
			</Routes>
		</Router>
	)

};


export default App;
