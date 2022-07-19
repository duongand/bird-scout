import TweetProfile from '../components/form/TweetProfile';

function RandomScout({ favoriteUsers }) {
    return (
        <div className="random-scout">
            <h1 className="random-scout--title">Choose a profile to get a random tweet!</h1>

            <div className="random-scout--favorite-profiles">
                <TweetProfile favoriteUsers={favoriteUsers} />
            </div>
        </div>
    );
};

export default RandomScout;