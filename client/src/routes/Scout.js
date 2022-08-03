import SearchBar from "../components/form/SearchBar";
import TweetCard from "../components/tweet-card/TweetCard";
import ErrorMessage from "./ErrorMessage";

function Scout({ tweetArray, searchInput, handleChange, onSubmit }) {
    return (
        <div className="scout-wrap">
            <div className="scout">
                <h1 className="search-bar--title">Scout here!</h1>
                <SearchBar
                    searchInput={searchInput}
                    handleChange={handleChange}
                    onSubmit={onSubmit}
                />
            </div>
            <div className="tweet-wrap">
                {tweetArray && <TweetCard tweetArray={tweetArray} />}
                {!tweetArray && <ErrorMessage />}
            </div>
        </div>
    );
};

export default Scout;
