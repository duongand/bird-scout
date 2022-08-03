import express from 'express';
export const apiRouter = new express.Router();

import {
    getFavoriteUsersInfo,
    getRecentTweets,
    getUserRecentTweetByUsername
} from './requests.js';

import { mergeTweetData } from './helpers.js';

apiRouter.get('/recentTweets', async (req, res) => {
    const recentTweets = await getRecentTweets(req.query.query);

    if (recentTweets.data.meta.result_count === 0) {
        res.send(undefined);
        return;
    };

    const mergedTweetData = mergeTweetData(recentTweets);
    res.send(mergedTweetData);
});

apiRouter.get('/userRecentTweets', async (req, res) => {
    const userRecentTweets = await getUserRecentTweetByUsername(req.query.username);

    if (!userRecentTweets) {
        res.send(undefined);
        return;
    };

    const mergedTweetData = mergeTweetData(userRecentTweets);
    res.send(mergedTweetData);
});

apiRouter.get('/favoriteRandomTweet', async (req, res) => {
    const userRecentTweets = await getUserRecentTweetByUsername(req.query.username, 50);

    if (!userRecentTweets) {
        res.send(undefined);
        return;
    };

    const mergedTweetData = mergeTweetData(userRecentTweets);
    const randomTweet = getRandomTweet(mergedTweetData);
    res.send(randomTweet);
});

apiRouter.get('/getFavoriteUsers', async (req, res) => {
    const favoriteUsers = await getFavoriteUsersInfo(req.query.usernames);
    res.send(favoriteUsers.data.data);
});

function getRandomTweet(tweets) {
    const randomNumber = Math.floor(Math.random() * tweets.length);
    return [tweets[randomNumber]];
};