import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css';
import favoriteUsers from './data/favoriteUsers';
import NavigationBar from './components/common/NavigationBar';
import WelcomePage from './routes/WelcomePage';
import Scout from './routes/Scout';
import Error from './routes/Error';
import ScoutHighlights from './routes/ScoutHighlights';

const axios = require('axios');

function App() {
	const [searchInput, setSearchInput] = useState({
		query: ''
	});
	const [queryString, setQueryString] = useState('');
	const [recentTweets, setRecentTweets] = useState([]);
	const [favoriteUsersInformation, setFavoriteUsersInformation] = useState([]);
	const [clickedFavoriteUser, setClickedFavoriteUser] = useState('');
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

	function onClick(event) {
		setClickedFavoriteUser(event);
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
		if (queryString === '') {
			setRecentTweets([]);
			return;
		};

		if (queryString.indexOf('@') > -1) {
			const username = queryString.substring(1, queryString.length);
			axios.get('http://localhost:3001/api/userRecentTweets', {
				params: {
					'username': username
				}
			}).then((response) => {
				setRecentTweets(response.data);
			});
		} else {
			axios.get('http://localhost:3001/api/recentTweets', {
				params: {
					'query': queryString
				}
			}).then((response) => {
				setRecentTweets(response.data);
			});
		};
	}, [queryString]);

	useEffect(() => {
		if (clickedFavoriteUser === '') return;

		axios.get('http://localhost:3001/api/getFavoriteUserTimeline', {
			params: {
				'id': clickedFavoriteUser
			}
		}).then((response) => {
			setFavoriteRecentTweets(response.data);
		});
	}, [clickedFavoriteUser])

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
					path="ScoutHighlights"
					element={<ScoutHighlights 
						favoriteUsers={favoriteUsersInformation}
						favoriteRecentTweets={favoriteRecentTweets}
						onClick={onClick}
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
