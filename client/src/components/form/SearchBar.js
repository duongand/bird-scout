function SearchBar({ searchInput, handleChange }) {
    function handleSubmit(event) {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
        <input 
            name="query"
            className="search-bar--search" 
            type="text" 
            placeholder="Search for a user or tweet..."
            value={searchInput}
            onChange={handleChange}
        />
        </form>
    );
};

export default SearchBar;