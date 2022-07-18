import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <header className="nav-bar">
            {/* <a href="/" className="nav-bar--link">Home</a>
            <a href="/scout" className="nav-bar--link">Scout</a>
            <a href="/randomscout" className="nav-bar--link">Random Scout</a> */}

            <Link to="/" className="nav-bar--link">Home</Link>
            <Link to="/scout" className="nav-bar--link">Scout</Link>
            <Link to="/randomscout" className="nav-bar--link">Random Scout</Link>
        </header>
    );
};

export default NavigationBar;
