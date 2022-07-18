import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css';
import NavigationBar from './components/common/NavigationBar';
import WelcomePage from './routes/WelcomePage';
import Scout from './routes/Scout';
import Error from './routes/Error';
import RandomScout from './routes/RandomScout';
import tweetSampleData from './data/tweetSampleData1';
import userSampleData1 from './data/userSampleData1';
const axios = require('axios');

function App() {
	const [searchInput, setSearchInput] = useState({
		query: ''
	});
	const [queryString, setQueryString] = useState();

	function handleChange(event) {
		const { name, value } = event.target;
		setSearchInput(prevSearchInput => ({
			...prevSearchInput,
			[name]: value
		}));
	};

	function onSubmit() {
		setQueryString(searchInput.query);
	};

	useEffect(() => {
		axios.get('http://localhost:3001/api/recenttweets', {
			params: {
				'query': queryString
			}
		}).then((response) => {
			console.log(response.data);
		});
	}, [queryString]);

	return (
		<div className="App">
			<NavigationBar />
			<Routes>
				<Route 
					path="/" 
					element={<WelcomePage />}
				/>
				<Route 
					path="scout" 
					element={<Scout 
						tweetArray={tweetSampleData.data}
						userArray={userSampleData1.data}
						value={searchInput}
						handleChange={handleChange}
						onSubmit={onSubmit}
					/>}
				/>
				<Route 
					path="randomscout"
					element={<RandomScout />}
				/>
				<Route 
					path="*"
					element={<Error />}
				/>
			</Routes>
		</div>
	);
};

export default App;
