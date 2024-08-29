import React, { useState, useEffect } from 'react';
import axios from 'axios';
 import "./App.css"

function App() {
  const [inputValue, setInputValue] = useState([]);
  const [cardss, setCardss] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8000/cards')
    .then((response) =>{
      
      setCardss(response.data);
      console.log(response.data);
      setFilteredCards(response.data);
    })
    .catch((error) => {
      console.error('Error fetching cards:', error);
    });
  
  },[])

  // Handle search functionality
  useEffect(() => {
    const results = cardss.filter(card =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(results);
  }, [searchTerm, cardss]);

  return (
    <div className="App">
       <nav className='navbar'>
        <div className='left'>
         <p>Abstract | HelpCenter</p>
        </div>
        <div className='right'>
          <form action="http://localhost:8000/cards" method="POST">
  <div>
    <label for="title"></label>
    <input type="text" id='title' value={inputValue} onChange={handleInputChange} />
  </div>
  <div>
    <label for="description"></label>
    <input type="text" id='description' value={inputValue} onChange={handleInputChange} />
  </div>
  <div>
    
  </div>
</form>
          <button >Submit a request</button>
        </div>
      </nav>
      <div className='searchSection'>
      <h1>How can we help?</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
      <div className="card-container">
        {filteredCards.map(card => (
          <div key={card.id} className="card">
            <h3>{card.title}</h3>
            <hr/>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
      <div className='footer'>
        <div className='abstract'>
          <h3>Abstract</h3>
          <p>Branches</p>
        </div>
        <div className='abstract'>
          <h3>Resources</h3>
          <p>Help Center</p>
          <p>Blog</p>
          <p>Release Notes</p>
          <p>Status</p>
          </div>
        <div className='abstract'>
          <h3>Community</h3>
          <p>Twitter</p>
          <p>Linkedin</p>
          <p>Facebook</p>
          <p>Bribbble</p>
          <p>Podcast</p>
          </div>
        <div className='company'>
          <div>
          <h3>Company</h3>
          <p>About Us</p>
          <p>carreers</p>
          <p>Legal</p>
          </div>
          <div className='contact'>
            <div >
          <h3>Contact Us</h3>
          <p>info@abstract.com</p>
          </div>
          <div>
           <h3>@ copyright 2022</h3> 
           <h3>abstract Studio design,Inc.</h3> 
           <h3>All rights reserved</h3> 
          </div>
          </div>
          </div>
        
      </div>
    </div>
  );
}
export default App;
