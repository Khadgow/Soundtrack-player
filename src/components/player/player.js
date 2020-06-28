import React, {Component} from "react";
import { setVolume, setPause, setTime, addMusic} from "../../actions";
import {connect} from 'react-redux';
import './player.scss'

class Player extends Component {

    componentDidMount() {
        setInterval(()=>{
            if(this.props.nowPlaying) {
                this.props.setTime({time: this.props.nowPlaying.currentTime, changeBy: "time"})
            }
        }, 500);
        if(localStorage.lastMusic){
            const {addMusic} = this.props;
            const {src, composer, img, name} = JSON.parse(localStorage.getItem("lastMusic"));
            addMusic({src, composer, img , name});

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.nowPlaying !== this.props.nowPlaying){
        if ( prevProps.nowPlaying){
            prevProps.nowPlaying.pause();
            this.props.nowPlaying.volume = this.props.volume;
            this.props.setPause(true);
            this.props.setTime(0);
        }
    }
    if(prevProps.volume !== this.props.volume){
        this.props.nowPlaying.volume = this.props.volume;
    }
    if(this.props.nowPlaying.currentTime === this.props.nowPlaying.duration){
        this.props.setPause(true);
    }
    if(prevProps.time !== this.props.time && this.props.changeBy==="set"){
        this.props.nowPlaying.currentTime = this.props.time;
    }
}


    render() {
        const {nowPlaying, setVolume, setPause, pause, time=0, setTime} = this.props;
        if (nowPlaying){
            const {composer, img, name} = this.props.nowPlayingInfo;
            return(
                <div className="player">

                            <PauseButton nowPlaying={nowPlaying} pause={pause} setPause={setPause}/>
                        <div id="volume-slider">
                            <input type="range" id="volume" name="volume" className="slider"
                                   min="0" max="1" step='0.01'  onChange={ ()=>{setVolume(Number(document.getElementById('volume').value))}}/>
                                <label htmlFor="volume">Volume</label>
                        </div>
                        <div id="time-slider">
                            <input type="range" id="time" name="time" className="slider" value={time}
                                   min="0" max={String(nowPlaying.duration)} step='0.000001' onChange={ ()=>setTime({time: Number(document.getElementById('time').value), changeBy: "set"})}/>
                        </div>
                        <div id="info">
                            <img alt="Music icon" src={img} />
                            <div>
                                <div>{name}</div>
                                <div className="composer">{composer}</div>
                            </div>
                        </div>
                </div>
            )
        }
        return (
            <div className="player">
                <span className="first-start">Select something</span>
            </div>
        )
    }

}

const PauseButton = ({nowPlaying, pause, setPause}) =>{

    if(pause){
     return (
         <div id="pause" onClick={()=>{nowPlaying.play(); setPause(false)}}>
             <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play"
                  className="svg-inline--fa fa-play fa-w-14" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                 <path fill="currentColor"
                       d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
             </svg>
         </div>
     )
    } else {
        return (
            <div id="pause" onClick={() => {
                nowPlaying.pause();
                setPause(true)
            }}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause"
                     className="svg-inline--fa fa-pause fa-w-14" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor"
                          d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
                </svg>
            </div>
        )
    }
};

const mapStateToProps = ({ nowPlaying, volume, pause, time, timerId, changeBy, nowPlayingInfo }) => {
    return {nowPlaying, volume, pause, time, timerId, changeBy, nowPlayingInfo} ;
};

const mapDispatchToProps = {
    setVolume,
    setPause,
    setTime,
    addMusic
};
export default connect(mapStateToProps, mapDispatchToProps)(Player)
