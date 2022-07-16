import SearchBar from "./form/SearchBar";
import TweetCard from "./form/TweetCard";

function Scout({ tweetArray, searchInput, handleChange }) {
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
                <TweetCard tweetArray={tweetArray} />
            </div>
        </div>
    );
};

export default Scout;
