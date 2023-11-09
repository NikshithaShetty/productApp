
import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';


const App: React.FC = () => {

  const [trendingSuggestions, setTrendingSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);


  //Generate  faker api data
  const fakeSuggestion = () => {
    const fakeSuggestions: string[] = [];
    for (let i = 0; i < 5; i++) {
      fakeSuggestions.push(faker.commerce.productName());
    }
    setTrendingSuggestions(fakeSuggestions);
  }

  //Implement faker api for showing data when component rendered 
  useEffect(() => {
    fakeSuggestion()
  }, []);


  //When we focus on search input
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  //If we Generate trendingSuggestions  from faker and if we have search value
  useEffect(() => {
    //  filtering data based on the search query
    setFilteredData(trendingSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [searchQuery, trendingSuggestions]);


  const handleMouseEnter = (productId: number) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleWishlistClick = (productId: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  };


  return (
    <div className="App">
      <h1>Product App</h1>
      <div className="search-container">
        <input
          style={{
            padding: "10px",
            border: "1px solid black",
            margin: "5px",
            borderRadius: "20px",
          }}
          type="text"
          placeholder="Search latest trends"
          value={searchQuery}
          onFocus={handleInputFocus}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {isFocused ?
          (trendingSuggestions.length > 0 && (
            <div className="suggestion-box">
              <ul style={{padding:"0px"}}>{filteredData.length > 0 ? (filteredData.map((suggestion, index) => (
                <li style={{ listStyleType: "none" }} key={index} onClick={(e) => setSearchQuery(suggestion)}>{suggestion}</li>
              ))) : "No trending suggestions found"}

              </ul>
            </div>
          )) : ""}

      </div>
      <div style={{
        display: "flex",
        alignItems: "center", justifyContent: "center"
      }}>
        {filteredData.map((suggestion, index) => (
          <div style={{
            padding: "10px",
            border: "1px solid black",
            margin: "10px",
            borderRadius: "20px"
          }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div style={{ listStyleType: "none" }} key={index}   >Product Name : {suggestion}</div>
            <div style={{
              display: "flex",
              alignItems: "center", justifyContent: "center"
            }}>
              {hoveredProductId === index && (
                <button className="view-product-button" style={{
                  padding: "10px",
                  border: "1px solid black",
                  margin: "5px",
                  borderRadius: "20px"
                }}>
                  View Product
                </button>)}
              <button
                onClick={() => handleWishlistClick(index)}
                style={{
                  padding: "10px",
                  border: "1px solid black",
                  margin: "5px",
                  borderRadius: "20px",
                  backgroundColor: wishlist.includes(index) ? 'red' : 'white',
                }} >
                Wishlist
              </button>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default App;