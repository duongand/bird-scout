import { useState, useEffect } from 'react';
import './style.css';
import NavigationBar from './components/common/NavigationBar';
import WelcomePage from './components/WelcomePage';
import Scout from './components/Scout'
import tweetSampleData from './data/tweetSampleData1';
import userSamepleData from './data/recentSampleData1';
import userSampleData1 from './data/userSampleData1';

function App() {
	const [searchInput, setSearchInput] = useState({
		query: ''
	});

	function handleChange(event) {
		const { name, value } = event.target;
		setSearchInput(prevSearchInput => ({
			...prevSearchInput,
			[name]: value
		}));
	};

	return (
		<div className="App">
			<NavigationBar />
			<Scout 
				tweetArray={tweetSampleData.data}
				userArray={userSampleData1.data}
				value={searchInput}
				handleChange={handleChange}
			/>
			{/* <WelcomePage /> */}
		</div>
	);
};

export default App;
