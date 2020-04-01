import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="home">
        <h1 className="title-app">Partifys</h1>

        <p className="highlight">A premium Spotify account is required to use Partifys</p>

        <input type="text" name="username" className="input-login icon-key" placeholder="Party code" />
        <button type="button" className="button-join">Join Party</button>
        <button type="button" className="button-login">Create Party</button>
      </div>
    </div>
  );
}

export default App;
