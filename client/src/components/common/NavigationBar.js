import { Link } from 'react-router-dom';
import logo from '../../assets/bird-scout-logo.png';

function NavigationBar() {
    return (
        <header className="nav-bar">
            <img className="nav-bar--logo" src={logo} />
            <Link to="/" className="nav-bar--link">Home</Link>
            <Link to="/scout" className="nav-bar--link">Scout</Link>
            <Link to="/scoutHighlights" className="nav-bar--link">Scout Highlights</Link>
        </header>
    );
};

export default NavigationBar;
