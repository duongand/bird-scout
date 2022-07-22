function TweetCardImages({ images }) {
    const imageElements = images.map((link) => (
        <li className="tweet-card--image-list-item">
            <img className="tweet-card--image" src={link} />
        </li>
    ));

    return (
        <div className="tweet-card--images">
            <ul className="tweet-card--image-list">
                {imageElements}
                <li className="tweet-card--last-child"></li>
            </ul>
        </div>
    );
};

export default TweetCardImages;