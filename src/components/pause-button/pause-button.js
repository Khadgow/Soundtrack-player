import React from "react";

const PauseButton = ({nowPlaying}) =>{

    if(nowPlaying.paused){
        return (
            <li onClick={()=>{nowPlaying.play()}}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play"
                     className="svg-inline--fa fa-play fa-w-14" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor"
                          d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                </svg>
            </li>
        )
    } else {
        return (
            <li onClick={() => {
                nowPlaying.pause()
            }}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause"
                     className="svg-inline--fa fa-pause fa-w-14" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor"
                          d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
                </svg>
            </li>
        )
    }
};
