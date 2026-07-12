function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-products">
      
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full"
      />
     
    </div>
  );
}

export default SearchBar;