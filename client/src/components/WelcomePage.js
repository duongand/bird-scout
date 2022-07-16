import peteGuanPhoto from '../assests/pete-guan-black-white-bird.png';

function WelcomePage() {
    return (
        <div className="homepage">
            <img className="homepage--banner" src={peteGuanPhoto}/>
            <div class="homepage--information">
                <h1 className="homepage--title">Bird Scout</h1>
                <p className="homepage--description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sapien dui, pulvinar vel malesuada ac, lacinia at urna. Quisque aliquet fringilla nunc, sit amet commodo sem dignissim ut. Sed efficitur nulla lacus, nec porta tortor efficitur sit amet. Nunc viverra enim ac odio ultrices rutrum a id purus. Proin venenatis at diam in consequat. Praesent suscipit tellus ac porta tristique. Duis vel enim vitae magna tempor luctus. 
                </p>
            </div>
        </div>
    );
};

export default WelcomePage;