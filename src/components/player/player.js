import React, {Component} from "react";
import { setVolume, setPause, setTime, addMusic} from "../../actions";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import './player.scss'


class Player extends Component {

    componentDidMount() {
        if(localStorage.lastMusic){
            const {src, composer, img, name} = JSON.parse(localStorage.getItem("lastMusic"));
            this.props.addMusic({src, composer, img , name});
        }
        setInterval(()=>{
            if(this.props.nowPlaying) {
                this.props.setTime({time: this.props.nowPlaying.currentTime, changeBy: "time"})
            }
        }, 500);

        //KONAMI code for secret page
        const konamiCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
        let enterKeys = "";

        //Keyboard control
        document.addEventListener("keydown", (e) =>{
            enterKeys += e.key;
            if(!konamiCode.includes(enterKeys)){
                enterKeys = ""
            } else if(enterKeys===konamiCode){
                this.props.history.push("/secretPage");

            }

            if(this.props.nowPlaying){
                if(e.code === "ArrowRight") this.props.setTime({time:  this.props.nowPlaying.currentTime+5, changeBy: "set"});
                if(e.code === "ArrowLeft") this.props.setTime({time:  this.props.nowPlaying.currentTime-5, changeBy: "set"});
                if(e.code==="ArrowUp") this.props.setVolume(this.props.nowPlaying.volume + 0.05);
                if(e.code==="ArrowDown") this.props.setVolume(this.props.nowPlaying.volume - 0.05);
                if(e.code === "Space"){
                    if(this.props.pause){
                        this.props.setPause(false);
                        this.props.nowPlaying.play();
                    } else {
                        this.props.setPause(true);
                        this.props.nowPlaying.pause();
                    }
                }
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {nowPlaying, setPause, setTime, time, changeBy, volume} = this.props;
        if (prevProps.nowPlaying !== this.props.nowPlaying) {
            if (prevProps.nowPlaying) {
                prevProps.nowPlaying.pause();
                nowPlaying.volume = this.props.volume;
                setPause(true);
                setTime(0);
            }
        }
        if (prevProps.volume !== volume) {
           nowPlaying.volume = volume;
        }
        if (nowPlaying.ended) {
            setPause(true);
        }
        if (prevProps.time !== time && changeBy === "set") {
            nowPlaying.currentTime = time;
        }
    }


    render() {
        const {nowPlaying, setVolume, setPause, pause, time = 0, setTime, volume = 1} = this.props;
        if (nowPlaying) {

            const {composer, img, name} = this.props.nowPlayingInfo;
            return (
                <div className="player">

                    <PauseButton nowPlaying={nowPlaying} pause={pause} setPause={setPause}/>
                    <div id="volume-slider">
                        <input type="range" id="volume" name="volume" className="slider" value={volume}
                               min="0" max="1" step='0.01' onChange={() => {
                            setVolume(Number(document.getElementById('volume').value))
                        }}/>
                        <label htmlFor="volume">Volume</label>
                    </div>
                    <div id="time-slider">
                        <input type="range" id="time" name="time" className="slider" value={time}
                               min="0" max={String(nowPlaying.duration)} step='0.000001' onChange={(event) => setTime({
                            time: event.target.value,
                            changeBy: "set"
                        })}/>
                    </div>
                    <div id="info">
                        <img alt="Music icon" src={img}/>
                        <div>
                            <div>{name}</div>
                            <div className="composer">{composer}</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="player">
                    <span className="first-start">Select something</span>
                </div>
            )
        }

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
export default  compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Player)
