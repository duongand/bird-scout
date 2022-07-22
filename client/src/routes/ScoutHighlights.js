import TweetProfile from '../components/form/TweetProfile';
import TweetCard from '../components/tweet-card/TweetCard';

function ScoutHighlights({ favoriteUsers, favoriteRecentTweets, onClick }) {
    return (
        <div className="random-scout">
            <h1 className="random-scout--title">Choose a profile to get the latest tweets!</h1>

            <div className="random-scout--favorite-profiles">
                <TweetProfile favoriteUsers={favoriteUsers} onClick={onClick}/>
            </div>

            <div className="random-scout--tweets">
                <TweetCard tweetArray={favoriteRecentTweets} />
            </div>
        </div>
    );
};

export default ScoutHighlights;