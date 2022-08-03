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

function linkMediaData(mediaData = []) {
    const mediaLinks = {};
    for (const media of mediaData) {
        mediaLinks[media.media_key] = media.url || media.preview_image_url;
    };

    return mediaLinks;
};

function linkReferenceTweets(referencedTweets = []) {
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

function mergeTweetData(userRecentTweets) {
    const tweetData = userRecentTweets.data.data;
    const authorProfileInfo = linkAuthorInfo(userRecentTweets.data.includes.users);
    const mediaLinks = linkMediaData(userRecentTweets.data.includes.media);
    const referencedTweetLinks = linkReferenceTweets(userRecentTweets.data.includes.tweets);

    const mergedTweetData = [];
    for (let tweet of tweetData) {
        const attachments = [];

        if (tweet.attachments) {
            for (const mediaKey of tweet.attachments.media_keys) {
                attachments.push(mediaLinks[mediaKey]);
            };
        };

        if (isRetweet(tweet)) {
            const retweetPrefix = tweet.text.substring(0, tweet.text.indexOf(':') + 1);
            tweet.text = `${retweetPrefix} ${referencedTweetLinks[(tweet.referenced_tweets[0].id)]}`;
        };

        mergedTweetData.push({
            ...tweet,
            "created_at": convertDate(tweet.created_at),
            "attachments": attachments,
            ...authorProfileInfo[tweet.author_id]
        });
    };

    return mergedTweetData;
};

const months = ['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

function isRetweet(tweet) {
    return tweet.text.substring(0, 2) === "RT";
};

export { mergeTweetData }