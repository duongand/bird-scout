const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = 3001;

const axios = require('axios');
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.BEARER}`;

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

function getRecentTweets(query) {
	return axios.get('https://api.twitter.com/2/tweets/search/recent', {
		params: {
			'query': query,
			'tweet.fields': 'created_at,public_metrics,author_id',
			'user.fields': 'name,username,profile_image_url',
			'media.fields': 'preview_image_url,type,url,width,height',
			'expansions': 'author_id,attachments.media_keys,referenced_tweets.id'
		}
	}).catch((error) => {
		console.log(error, 'Error retreiving recent tweets');
	});
};

async function getUserRecentTweetByUsername(username) {
	const searchedUser = await axios.get(`https://api.twitter.com/2/users/by/username/${username}`)
		.catch((error) => {
			console.log(error, 'Error in getting that users timeline');
		});

	if (!searchedUser) {
		return searchedUser;
	} else {
		return getUserRecentTweetById(searchedUser.data.data.id);
	};
};

function getUserRecentTweetById(authorId) {
	return axios.get(`https://api.twitter.com/2/users/${authorId}/tweets`, {
		params: {
			'tweet.fields': 'created_at,public_metrics,author_id',
			'user.fields': 'name,username,profile_image_url',
			'media.fields': 'preview_image_url,type,url,width,height',
			'expansions': 'author_id,attachments.media_keys,referenced_tweets.id'
		}
	}).catch((error) => {
		console.log(error, 'Error pulling the user recent timeline');
	});
};

function linkAuthorInfo(authorData) {
	const authorProfileInfo = {};
	for (const author of authorData) {
		authorProfileInfo[author.id] = {
			"name": author.name,
			"username": author.username,
			"profile_image_url": author.profile_image_url
		};
	};

	return authorProfileInfo;
};

function linkMediaData(mediaData) {
	const mediaLinks = {};
	for (const media of mediaData) {
		mediaLinks[media.media_key] = media.url || media.preview_image_url;
	};

	return mediaLinks;
};

function linkReferenceTweets(referencedTweets) {
	const linkReferencedTweets = {};
	for (const tweet of referencedTweets) {
		linkReferencedTweets[tweet.id] = tweet.text;
	};

	return linkReferencedTweets;
};

function convertDate(date) {
	const dateObj = new Date(date);
	const dateString = `${dateObj.getDate()} ${months[dateObj.getMonth()]}, ${dateObj.getFullYear()}`;
	return dateString;
};

function mergeTweetData(tweetData, authorData, mediaData = [], referencedTweets = []) {
	const authorProfileInfo = linkAuthorInfo(authorData);
	const mediaLinks = linkMediaData(mediaData);
	const referencedTweetLinks = linkReferenceTweets(referencedTweets);

	const mergedTweetData = [];
	for (let tweet of tweetData) {
		const convertedCreateDate = convertDate(tweet.created_at);
		const attachments = [];

		if (tweet.attachments) {
			for (const mediaKey of tweet.attachments.media_keys) {
				attachments.push(mediaLinks[mediaKey]);
			};
		};

		if (tweet.text.substring(0, 2) === "RT") {
			const retweetPrefix = tweet.text.substring(0, tweet.text.indexOf(':') + 1);
			tweet.text = `${retweetPrefix} ${referencedTweetLinks[(tweet.referenced_tweets[0].id)]}`;
		};

		mergedTweetData.push({
			...tweet,
			"created_at": convertedCreateDate,
			"attachments": attachments,
			...authorProfileInfo[tweet.author_id]
		});
	};

	return mergedTweetData;
};

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('/api/recentTweets', async (req, res) => {
	const recentTweets = await getRecentTweets(req.query.query);
	if (recentTweets.data.meta.result_count > 0) {
		const mergedTweetData = mergeTweetData(recentTweets.data.data,
			recentTweets.data.includes.users,
			recentTweets.data.includes.media,
			recentTweets.data.includes.tweets);
		res.send(mergedTweetData);
	} else {
		res.send(undefined);
	};
});

app.get('/api/userRecentTweets', async (req, res) => {
	const userRecentTweets = await getUserRecentTweetByUsername(req.query.username);
	if (userRecentTweets) {
		const mergedTweetData = mergeTweetData(userRecentTweets.data.data,
			userRecentTweets.data.includes.users,
			userRecentTweets.data.includes.media,
			userRecentTweets.data.includes.tweets);
		res.send(mergedTweetData);
	} else {
		res.send(userRecentTweets);
	};
});

app.get('/api/getFavoriteUsers', async (req, res) => {
	const favoriteUsers = await getFavoriteUsersInfo(req.query.usernames);
	res.send(favoriteUsers.data.data);
});

app.listen(port, () => {
	console.log(`Twitter showcase application listening on port ${port}`);
});