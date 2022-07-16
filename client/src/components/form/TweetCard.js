function TweetCard({ tweetArray }) {
    return tweetArray.map((tweet) => (
        <div className="tweet-card">
            <p>{tweet.text}</p>
        </div>
    ));
};

export default TweetCard;