import TweetCardHeader from "./TweetCardHeader";
import TweetCardContent from "./TweetCardContent";
import TweetCardImages from "./TweetCardImages";
import TweetCardFooter from "./TweetCardFooter";

function TweetCard({ tweetArray }) {
    return tweetArray.map((tweet) => (
        <div className="tweet-card" key={tweet.id}>
            <TweetCardHeader
                profile_image_url={tweet.profile_image_url}
                name={tweet.name}
                username={tweet.username}
            />
            <TweetCardContent
                content={tweet.text}
            />
            <TweetCardImages
                images={tweet.attachments}
            />
            <TweetCardFooter
                createdAt={tweet.created_at}
                retweetCount={tweet.public_metrics.retweet_count}
                likeCount={tweet.public_metrics.like_count}
            />
        </div>
    ));
};

export default TweetCard;