import React from "react";
import {withRouter} from 'react-router-dom'
import "./games-list-item.scss"
const GamesListItem = ({game, history}) => {
    const {name, imageurl, composer} = game;
    return (
        <div className="list-item" >
          <div onClick={()=>{history.push(`/games/${name}`)}}>
            <div>
                  <img src={imageurl}  width="238" height="238" alt="Game" />
            </div>
              <span className="music-name">{name}</span>
          </div>
              <span className="composer-name">{composer}</span>
        </div>
    );
};
export default withRouter(GamesListItem);
