import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css';
import favoriteUsers from './data/favoriteUsers';
import NavigationBar from './components/common/NavigationBar';
import WelcomePage from './routes/WelcomePage';
import Scout from './routes/Scout';
import Error from './routes/Error';
import RandomScout from './routes/RandomScout';

const axios = require('axios');

function App() {
	const [searchInput, setSearchInput] = useState({
		query: ''
	});
	const [queryString, setQueryString] = useState('');
	const [recentTweets, setRecentTweets] = useState([]);
	const [favoriteUsersInformation, setFavoriteUsersInformation] = useState([]);
	const [favoriteRecentTweets, setFavoriteRecentTweets] = useState([]);

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
		axios.get('http://localhost:3001/api/getFavoriteUsers', {
			params: {
				'usernames': favoriteUsers.data.join(',')
			}
		}).then((response) => {
			setFavoriteUsersInformation(response.data);
		});
	}, []);

	useEffect(() => {
		if (queryString === '') return;

		axios.get('http://localhost:3001/api/recenttweets', {
			params: {
				'query': queryString
			}
		}).then((response) => {
			setRecentTweets(response.data);
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
						tweetArray={recentTweets}
						value={searchInput}
						handleChange={handleChange}
						onSubmit={onSubmit}
					/>}
				/>
				<Route 
					path="randomscout"
					element={<RandomScout 
						favoriteUsers={favoriteUsersInformation}
					/>}
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
