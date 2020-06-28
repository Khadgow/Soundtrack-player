import React from 'react';
import './App.scss';
import Navbar from "../navbar";
import {Route} from 'react-router-dom'
import {FavoritesPage, HomePage, ItemPage} from "../pages";
import Player from "../player/player";

function App() {
  return (
      <div>
        <Navbar/>
        <Player/>
            <Route path="/" component={HomePage} exact/>
            <Route path="/games/:name" render={({match}) => {
                const {name} = match.params;
                return <ItemPage name={name}/>
            }}/>
          <Route path="/favorites" component={FavoritesPage}/>
      </div>
  );
}

export default App;
