import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
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

async function getUserRecentTweetByUsername(username, maxResult=10) {
	const searchedUser = await axios.get(`https://api.twitter.com/2/users/by/username/${username}`)
		.catch((error) => {
			console.log(error, 'Error in getting that users timeline');
		});

	if (!searchedUser) return undefined;

	return getUserRecentTweetById(searchedUser.data.data.id, maxResult);
};

function getUserRecentTweetById(authorId, maxResult) {
	return axios.get(`https://api.twitter.com/2/users/${authorId}/tweets`, {
		params: {
			'tweet.fields': 'created_at,public_metrics,author_id',
			'user.fields': 'name,username,profile_image_url',
			'media.fields': 'preview_image_url,type,url,width,height',
			'expansions': 'author_id,attachments.media_keys,referenced_tweets.id',
			'max_results': maxResult.toString()
		}
	}).catch((error) => {
		console.log(error, 'Error pulling the user recent timeline');
	});
};

export { getFavoriteUsersInfo, getRecentTweets, getUserRecentTweetByUsername };