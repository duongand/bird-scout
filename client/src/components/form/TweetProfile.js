function TweetProfile({ favoriteUsers, onClick }) {
    function handleClick(event) {
        event.stopPropagation();
        onClick(event.target.id);
    };

    return favoriteUsers.map((user) => (
        <div className="tweet-profile" key={user.id}>
            <img 
                className="tweet-profile--profile-picture" 
                src={user.profile_image_url.replace('_normal', '')} 
                id={user.id}
                onClick={handleClick}
            />
            <p className="tweet-profile--name">{user.name}</p>
            <p className="tweet-profile--username">{`@${user.username}`}</p>
        </div>
    ));
};

export default TweetProfile;