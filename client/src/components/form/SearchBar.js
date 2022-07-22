function SearchBar({ searchInput, handleChange, onSubmit }) {
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="query"
                className="search-bar--search" 
                type="text" 
                placeholder="Search for an @user or tweet..."
                value={searchInput}
                onChange={handleChange}
            />
        </form>
    );
};

export default SearchBar;