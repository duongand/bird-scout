function TweetCardHeader({ profile_image_url, name, username }) {
    return (
        <div className="tweet-card--header">
            <img className="tweet-card--profile-picture" src={profile_image_url.replace('_normal', '')} />
            <p className="tweet-card--name">{name}</p>
            <p className="tweet-card--username">{`@${username}`}</p>
        </div>
    );
};

export default TweetCardHeader;