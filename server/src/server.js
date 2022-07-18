const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
require('dotenv').config();

app.get('/api/recenttweets', async (req, res) => {
	const query = req.query.query;

	const recentTweets = await axios.get(`https://api.twitter.com/2/tweets/search/recent/?query=${query}`, {
		headers: {
			'Authorization': `Bearer ${process.env.BEARER}`
		}
	}).catch((error) => {
		console.log(error);
		res.sendStatus(500);
	});

	const tweetsIdsArray = [];
	for (const tweet of recentTweets.data.data) {
		tweetsIdsArray.push(tweet.id);
	};
	const tweetIds = tweetsIdsArray.join(',');

	const tweetInformationResponse = await axios.get('https://api.twitter.com/2/tweets', {
		params: {
			'ids': tweetIds,
			'tweet.fields': 'author_id,created_at,attachments,public_metrics',
		},
		headers: {
			'Authorization': `Bearer ${process.env.BEARER}`
		}
	}).catch((error) => {
		console.log(error);
	});

	const tweetInformation = tweetInformationResponse.data.data;

	const tweetAuthorIds = [];
	for (const tweet of tweetInformation) {
		tweetAuthorIds.push(tweet.author_id);
	};
	const tweetAuthors = tweetAuthorIds.join(',');

	const authorInformationResponse = await axios.get('https://api.twitter.com/2/users', {
		params: {
			'ids': tweetAuthors,
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
	for (let i = 0; i < tweetInformation.length; i++) {
		finalArray.push({
			...tweetInformation[i],
			'username': authorInformation[i].username,
			'name': authorInformation[i].name,
			'profile_image_url': authorInformation[i].profile_image_url,
		});
	};

	console.log(finalArray);
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Twitter showcase application listening on port ${port}`);
});