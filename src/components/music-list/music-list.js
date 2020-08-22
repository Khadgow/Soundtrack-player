import React, {Component} from "react";
import {addMusic, fetchMusic} from "../../actions";
import {connect} from "react-redux";
import Spinner from "../spinner";
import './music-list.scss'
import ErrorIndicator from "../error-indicator";
import FavoriteButton from '../favorite-button'
import {NotFoundPage} from "../pages";

class MusicList extends Component {


    componentDidMount() {
        const {fetchMusic} = this.props;
        fetchMusic(window.location.pathname.slice(7));
    }

    render() {
        const {name, music, loading, error, addMusic, favoriteMusic} = this.props;
        if(error){
            if(error===404){
                return <NotFoundPage/>
            }
            return <div className='musicList'><ErrorIndicator/></div>
        }
        if(!music || loading){
            return <div className='musicList'><Spinner/></div>
        }

        if(music) {
            return (
                <div className="musicList">
                    <h1>{name}</h1>
                    <ul>
                        {
                            music.soundtracks.map(({src, name}) => {
                                return (
                                    <li key={name}>
                                        <div className="container">
                                            <div className="music-name" onClick={
                                                () => {
                                                    addMusic({src, composer: music.composer, img: music.image, name});
                                                    localStorage.setItem("lastMusic", JSON.stringify({
                                                        src,
                                                        composer: music.composer,
                                                        img: music.image,
                                                        name
                                                    }));
                                                }}>{name}</div>
                                            <FavoriteButton name={name} src={src} composer={music.composer}
                                                            img={music.image} favoriteMusic={favoriteMusic}/>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            );
        }

    }
}

const mapStateToProps = ({ music, loading, error, favoriteMusic}) => {
    return {music, loading, error, favoriteMusic} ;
};

const mapDispatchToProps = {
    fetchMusic,
    addMusic

};
export default connect(mapStateToProps, mapDispatchToProps)(MusicList);
