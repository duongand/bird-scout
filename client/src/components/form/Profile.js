function Profile({ favoriteUsers, onClick }) {
    return favoriteUsers.map((user) => (
        <div className="profile" key={user.id}>
            <img 
                className="profile--profile-picture" 
                src={user.profile_image_url.replace('_normal', '')} 
                username={user.username}
                onClick={onClick}
            />
            <p className="profile--name">{user.name}</p>
            <p className="profile--username">{`@${user.username}`}</p>
        </div>
    ));
};

export default Profile;