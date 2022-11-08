import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

  const [characters, setCharacters] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [filterCharacter, setFilterCharacters] = useState(characters);

    useEffect(() => {
    axios.get('https://breakingbadapi.com/api/characters')
      .then(res => {
        console.log(res)
        setCharacters(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },[]);

   useEffect (() => {
      const newFilterCharacters = characters.filter((character) =>{  
        return character.name.toLowerCase().includes(searchField);
      });
        setFilterCharacters(newFilterCharacters);
  }, [characters, searchField])
  

  const handleFilter = (event) => {
    const searchWord = event.target.value.toLowerCase();
      setSearchField(searchWord);

  };


  return (
 
    <div className="container">
        <div className="py-5 px-4 mb-4">
          <h1 className="title ps-2">Breaking Bad Rolodex</h1>
            <div className="search">
            <input type="search" 
                  className="search-box" 
                  placeholder="search characters..." 
                  onChange = {handleFilter}/>
            </div>
        </div>
      {
        filterCharacter.map(character => (
          <div key = {character.char_id} className ="characters">
            <div className="card">
              <img src={character.img} className="card-img" alt="..."/>
                <div className="card-body">
                    <h2>{character.name}</h2>
                    <p className="status">Status: {character.status}</p>
                    <p className="birthday">DOB: {character.birthday}</p>
                </div>
            </div>
          </div>
      ))} 
   
    </div>
  );
}

export default App;
