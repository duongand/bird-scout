import SearchBar from "./form/SearchBar";
import TweetCard from "./form/TweetCard";

function Scout({ tweetArray, userArray, searchInput, handleChange }) {
    return (
        <div className="scout-wrap">
            <div className="scout">
                <h1 className="search-bar--title">Scout here!</h1>
                <SearchBar
                    searchInput={searchInput}
                    handleChange={handleChange}
                />
            </div>
            <div className="tweet-wrap">
                {tweetArray ? <TweetCard tweetArray={tweetArray} userArray={userArray}/> : <p>Error</p>}
            </div>
        </div>
    );
};

export default Scout;
