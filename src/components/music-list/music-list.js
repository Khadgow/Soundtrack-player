import React, {Component} from "react";
import {gamesError, gamesLoaded, gamesRequested, addMusic} from "../../actions";
import compose from "../../utils/compose";
import WithSountracksService from "../hoc";
import {connect} from "react-redux";
import Spinner from "../spinner";
import './music-list.scss'
import ErrorIndicator from "../error-indicator";
import FavoriteButton from '../favorite-button'

class MusicList extends Component {


    componentDidMount() {
        const {SoundtracksService, gamesLoaded, gamesError} = this.props;
        gamesRequested();
        SoundtracksService.getSoundtracks()
            .then((data) => gamesLoaded(data))
            .catch((err) => gamesError(err));
    }

    render() {
        const {name, games, loading, error, addMusic, favoriteMusic} = this.props;
        if(loading){
            return <div className='musicList'><Spinner/></div>
        }
        if(error){
            return <div className='musicList'><ErrorIndicator/></div>
        }
        const game = games.find( (game) => (name === game.name));
        if (game) {
            return (
                <div className="musicList">
                    <h1>{game.name}</h1>
                    <ul>
                        {
                            game.soundtracks.map(({src, name, composer, imageurl}) => {
                                return (
                                    <li key={name}>
                                        <div className="container">
                                            <div className="music-name" onClick={
                                                () => {
                                                    addMusic({src, composer: game.composer, img: game.imageurl , name});
                                                    localStorage.setItem("lastMusic", JSON.stringify({src, composer: game.composer, img: game.imageurl , name}));
                                                }}>{name}</div>
                                            <FavoriteButton name={name} src={src} composer={game.composer}
                                                            img={game.imageurl} favoriteMusic={favoriteMusic}/>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        }
        return <div className='musicList'>Page not found</div>
    }
}

const mapStateToProps = ({ games, loading, error, favoriteMusic}) => {
    return {games, loading, error, favoriteMusic} ;
};

const mapDispatchToProps = {
    gamesLoaded,
    gamesRequested,
    gamesError,
    addMusic

};
export default compose(
    WithSountracksService(),
    connect(mapStateToProps, mapDispatchToProps)
)(MusicList);
