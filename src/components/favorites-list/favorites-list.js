import React, {Component} from "react";
import {addMusic} from "../../actions";
import {connect} from 'react-redux';
import "./favorites-list.scss"
import FavoriteButton from "../favorite-button";


class FavoritesList extends Component {

    render() {
        const {addMusic, favoriteMusic} = this.props;
        if(favoriteMusic && favoriteMusic.length) {
            return (
                <ul className="favorites-list">
                    {favoriteMusic.map(({src, composer, img, name}) => {
                        return (
                            <li key={name}>
                                <div className="container">
                                    <div className="music-name"
                                     onClick={() => {
                                         addMusic({src, composer, img, name});
                                         localStorage.setItem("lastMusic", JSON.stringify({src, composer, img, name}));
                                     }}>{name} </div>
                                    <FavoriteButton name={name} src={src} composer={composer}
                                                    img={img} favoriteMusic={favoriteMusic}/>
                                </div>
                            </li>
                        )
                    })}</ul>
            )
        }
        else {
            return (
                <div className="empty">
                    Favorite list is empty
                </div>
            )
        }
    }
}

const mapStateToProps = ({favoriteMusic}) => {
    return {favoriteMusic} ;
};

const mapDispatchToProps = {
    addMusic
};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList)
