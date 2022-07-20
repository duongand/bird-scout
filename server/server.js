const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = 3001;

const axios = require('axios');
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.BEARER}`;

async function getRecentTweets(query) {
	try {
		const searchedUser = await axios.get(`https://api.twitter.com/2/users/by/username/${query}`)
		.catch((error) => {
			console.log(error, 'Error in retreiving that user');
		});

		return getUserRecentTweet(searchedUser.data.data.id);
	} catch {
		return axios.get('https://api.twitter.com/2/tweets/search/recent', {
			params: {
				'query': query,
				'expansions': 'author_id',
				'tweet.fields': 'created_at,author_id,public_metrics,text',
				'user.fields': 'id,name,username,profile_image_url'
			}
		}).catch((error) => {
			console.log(error, 'Error retreiving recent tweets.');
		});
	};		
};

function getFavoriteUsersInfo(usernames) {
	return axios.get('https://api.twitter.com/2/users/by', {
		params: {
			'usernames': usernames,
			'user.fields': 'profile_image_url'
		}
	}).catch((error) => {
		console.log(error, 'Error pulling the favorite user information');
	});
};

function getUserRecentTweet(authorId) {
	return axios.get(`https://api.twitter.com/2/users/${authorId}/tweets`, {
		params: {
			'tweet.fields': 'created_at,public_metrics,author_id',
			'user.fields': 'name,username,profile_image_url',
			'expansions': 'author_id',
			'media.fields': 'preview_image_url',
		}
	}).catch((error) => {
		console.log(error, 'Error pulling the user recent timeline');
	});
};

function mergeTweetData(tweetData, authorData) {
	const authorProfileInfo = {};
	for (const author of authorData) {
		authorProfileInfo[author.id] = {
			"name": author.name,
			"username": author.username,
			"profile_image_url": author.profile_image_url
		};
	};

	const mergedTweetData = [];
	for (let tweet of tweetData) {
		const convertedCreateDate = convertDate(tweet.created_at);

		mergedTweetData.push({
			...tweet,
			"created_at": convertedCreateDate,
			...authorProfileInfo[tweet.author_id]
		});
	};

	return mergedTweetData;
};

function convertDate(date) {
	const dateObj = new Date(date);
	const dateString = `${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
	return dateString;
};

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('/api/recenttweets', async (req, res) => {
	const recentTweets = await getRecentTweets(req.query.query);
	const mergedTweetData = mergeTweetData(recentTweets.data.data, recentTweets.data.includes.users);
	res.send(mergedTweetData);
});

app.get('/api/getFavoriteUsers', async (req, res) => {
	const favoriteUsers = await getFavoriteUsersInfo(req.query.usernames);
	res.send(favoriteUsers.data.data)
});

app.get('/api/getFavoriteUserTimeline', async (req, res) => {
	const favoriteUserTimeline = await getUserRecentTweet(req.query.id);
	const mergedTweetData = mergeTweetData(favoriteUserTimeline.data.data, favoriteUserTimeline.data.includes.users);
	res.send(mergedTweetData);
});

app.listen(port, () => {
	console.log(`Twitter showcase application listening on port ${port}`);
});