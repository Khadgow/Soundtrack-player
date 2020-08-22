import React from 'react';
import Navbar from "../navbar";
import {Route, Switch} from 'react-router-dom'
import {FavoritesPage, HomePage, ItemPage, NotFoundPage, SecretPage} from "../pages";
import Player from "../player/player";
import ErrorBoundary from "../error-boundary";

function App() {
  return (
      <>
        <Navbar/>
          <ErrorBoundary>
            <Player/>
            <Switch>
                <Route path="/" component={HomePage} exact/>
                <Route path="/games/:name" render={({match}) => {
                    const {name} = match.params;
                    return <ItemPage name={name}/>
                }}/>
                <Route path="/favorites" component={FavoritesPage}/>
                <Route path ="/secretPage" component={SecretPage} />
                <Route component={NotFoundPage}/>
                <Route />
            </Switch>
          </ErrorBoundary>
      </>
  );
}

export default App;
