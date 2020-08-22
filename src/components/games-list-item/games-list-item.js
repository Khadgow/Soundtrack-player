import React from "react";
import {withRouter} from 'react-router-dom'
import "./games-list-item.scss"
const GamesListItem = ({game, history}) => {
    const {name, image, composer} = game;
    return (
        <div className="list-item" >
            <div>
                  <img src={image}  alt="Game" onClick={()=>{history.push(`/games/${name}`)}}/>
            </div>
              <span className="music-name" onClick={()=>{history.push(`/games/${name}`)}}>{name}</span>
              <span className="composer-name">{composer}</span>
        </div>
    );
};
export default withRouter(GamesListItem);
