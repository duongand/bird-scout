const path = require('path');
const express = require('express');
const app = express();
const port = 3001;
const axios = require('axios');
require('dotenv').config();


app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('/api/recenttweets', async (req, res) => {
	const submittedQuery = req.query.query;
	const recentTweetsResponse = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
		params: {
			'query': submittedQuery
		},
		headers: {
			'Authorization': `Bearer ${process.env.BEARER}`
		}
	}).catch((error) => {
		console.log(error);
		res.sendStatus(500);
	});

	const tweetIdsString = recentTweetsResponse.data.data.map((recentTweet) => {
		return recentTweet.id
	}).join(',');

	const tweetInformationResponse = await axios.get('https://api.twitter.com/2/tweets', {
		params: {
			'ids': tweetIdsString,
			'tweet.fields': 'author_id,created_at,attachments,public_metrics',
		},
		headers: {
			'Authorization': `Bearer ${process.env.BEARER}`
		}
	}).catch((error) => {
		console.log(error);
		res.sendStatus(500);
	});

	const tweetInformationData = tweetInformationResponse.data.data;
	const tweetAuthorIdsString = tweetInformationData.map((tweet) => {
		return tweet.author_id
	}).join(',');

	const authorInformationResponse = await axios.get('https://api.twitter.com/2/users', {
		params: {
			'ids': tweetAuthorIdsString,
			'user.fields': 'profile_image_url'
		},
		headers: {
			'Authorization': `Bearer ${process.env.BEARER}`
		}
	}).catch((error) => {
		console.log(error);
		res.sendStatus(500);
	});

	const authorInformation = authorInformationResponse.data.data;
	const finalArray = [];
	for (let i = 0; i < tweetInformationData.length; i++) {
		finalArray.push({
			...tweetInformationData[i],
			'username': authorInformation[i].username,
			'name': authorInformation[i].name,
			'profile_image_url': authorInformation[i].profile_image_url,
		});
	};

	res.send(finalArray);
});

app.get('/api/getFavoriteUsers', async (req, res) => {
	const favoriteUserInformation = await axios.get('https://api.twitter.com/2/users/by', {
		params: {
			'usernames': req.query.usernames,
			'user.fields': 'profile_image_url'
		},
		headers: {
			'Authorization': `Bearer ${process.env.BEARER}`
		}
	}).catch((error) => {
		console.log(error);
		res.sendStatus(500);
	});
	
	res.send(favoriteUserInformation.data.data);
});

app.get('/api/getFavoriteUserTimeline', async (req, res) => {
	const favoriteUserTimeline = await axios.get(`https://api.twitter.com/2/users/${req.query.id}/tweets`, {
	params: {
		'tweet.fields': 'public_metrics'
	},
	headers: {
		'Authorization': `Bearer ${process.env.BEARER}`
	}
	}).catch((error) => {
		console.log(error);
		res.sendStatus(500);
	});

	const authorInformation = await axios.get(`https://api.twitter.com/2/users/${req.query.id}`, {
		params: {
			'user.fields': 'profile_image_url'
		},
		headers: {
			'Authorization': `Bearer ${process.env.BEARER}`
		}
	}).catch((error) => {
		console.log(error);
		res.sendStatus(500);
	});

	const profile = authorInformation.data.data;
	const finalArray = favoriteUserTimeline.data.data.map((tweet) => ({
		...tweet,
		"profile_image_url": profile.profile_image_url,
		"username": profile.username,
		"name": profile.name
	}));

	res.send(finalArray);
});

app.listen(port, () => {
	console.log(`Twitter showcase application listening on port ${port}`);
});