import React, {Component} from "react";
import {connect} from 'react-redux';
import compose from "../../utils/compose";
import WithSountracksService from '../hoc'
import { gamesLoaded, gamesRequested, gamesError} from "../../actions";
import GamesListItem from "../games-list-item/games-list-item";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import './games-list.scss'


class GamesList extends Component {

    componentDidMount() {
        const {SoundtracksService, gamesLoaded} = this.props;
        gamesRequested();
        SoundtracksService.getSoundtracks()
            .then((data) => gamesLoaded(data))
            .catch((err) => gamesError(err));
    }

    render() {
        const {games, loading, error} = this.props;

        if(loading){
            return <div className='mainPage'><Spinner/></div>
        }
        if(error){
            return <div className='mainPage'><ErrorIndicator/></div>
        }
        return(
            <div className="mainPage">
                {
                    games.map( (game) =>{
                        return(
                            <div key={game.name}>
                                <GamesListItem game={game}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}

const mapStateToProps = ({ games, loading, error}) => {
    return {games, loading, error} ;
};

const mapDispatchToProps = {
    gamesLoaded,
    gamesRequested,
    gamesError
};
export default compose(
    WithSountracksService(),
    connect(mapStateToProps, mapDispatchToProps)
)(GamesList);
