const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
require('dotenv').config();

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

app.listen(port, () => {
	console.log(`Twitter showcase application listening on port ${port}`);
});