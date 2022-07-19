import TweetProfile from '../components/form/TweetProfile';
import TweetCard from '../components/form/TweetCard';

function RandomScout({ favoriteUsers, favoriteRecentTweets, onClick }) {
    return (
        <div className="random-scout">
            <h1 className="random-scout--title">Choose a profile to get a random tweet!</h1>

            <div className="random-scout--favorite-profiles">
                <TweetProfile favoriteUsers={favoriteUsers} onClick={onClick}/>
            </div>

            <div className="random-scout--tweets">
                <TweetCard tweetArray={favoriteRecentTweets} />
            </div>
        </div>
    );
};

export default RandomScout;