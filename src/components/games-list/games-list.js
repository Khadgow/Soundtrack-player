import React, {Component} from "react";
import {connect} from 'react-redux';
import { fetchGames} from "../../actions";
import GamesListItem from "../games-list-item/games-list-item";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import './games-list.scss'


class GamesList extends Component {

    componentDidMount() {
        const {fetchGames} = this.props;
        fetchGames();
    }

    render() {
        const {games, loading, error} = this.props;

        if(!games || loading){
            return <Spinner/>
        }
        if(error){
            return <ErrorIndicator/>
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
    fetchGames
};
export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
