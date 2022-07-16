import { useState, useEffect } from 'react';
import './style.css';
import NavigationBar from './components/common/NavigationBar';
import WelcomePage from './components/WelcomePage';
import Scout from './components/Scout'
import sampleData from './data/sampleData1';

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
				tweetArray={sampleData.data}
				value={searchInput}
				handleChange={handleChange}
			/>
			{/* <WelcomePage /> */}
		</div>
	);
};

export default App;
