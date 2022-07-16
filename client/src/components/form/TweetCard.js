function TweetCard({ tweetArray, userArray }) {
    const combinedArray = [];
    for (let i = 0; i < tweetArray.length; i++) {
        combinedArray.push(({
            ...tweetArray[i],
            username: userArray[i].username,
            name: userArray[i].name,
            profile_image_url: userArray[i].profile_image_url
        }));
    };

    return combinedArray.map((tweet) => (
        <div className="tweet-card" key={tweet.id}>
            <div className="tweet-card--header">
                <img src={tweet.profile_image_url} />
                <div>
                    <p>{tweet.name}</p>
                    <p>{tweet.username}</p>
                </div>
            </div>
            <br/>
            <div className="tweet-card--content">
                <p>{tweet.text}</p>
            </div>

            <div className="tweet-card--metrics">
                <p className="tweet-card--created-date">{tweet.created_at}</p>
                <p>{tweet.public_metrics.retweet_count}</p>
                <p>{tweet.public_metrics.like_count}</p>
                <p>{tweet.public_metrics.reply_count}</p>
            </div>
        </div>
    ));
};

export default TweetCard;