export const fetchGames = () => {
    return async dispatch =>{
        try {
            dispatch(showLoader());
            const response = await fetch("https://gkst-bdae3.firebaseio.com/GKST/games.json");
            const json = await response.json();
            dispatch({
                type: 'FETCH_GAMES_SUCCESS',
                payload: json
            })
        }
        catch (e) {
            dispatch(fetchError(e))
        }

    };
};

export const fetchMusic =(name) => {
    return async dispatch =>{
        try {
            dispatch(showLoader());
            const response = await fetch(`https://gkst-bdae3.firebaseio.com/GKST/soundtracks/${name}.json`);
            const json = await response.json();
            if(json === null){ //Firebase return null, instead of error 404
                dispatch(fetchError(404))
            }
            else {
                dispatch({
                    type: 'FETCH_MUSIC_SUCCESS',
                    payload: json
                })
            }
        }
        catch (e) {
            dispatch(fetchError(e))
        }
    };
};

export const showLoader = () => {
    return{
        type: 'FETCH_REQUEST'
    }
};

export const fetchError = (error) => {
    return {
        type: 'FETCH_FAILURE',
        payload: error
    }
};

 export const addMusic = (music) =>{
     return ({
        type: 'ADD_MUSIC',
         payload: music
     })
};

export const setVolume = (volume) =>{
    return ({
        type: 'SET_VOLUME',
        payload: volume>1 ? 1 : volume<0 ? 0 : volume
    })
};
export const setPause = (state) =>{
    return ({
        type: 'SET_PAUSE',
        payload: state
    })
};
export const setTime = (time) =>{
    return ({
        type: 'SET_TIME',
        payload: time
    })
};

export const changeFavoriteMusic = (favoriteMusic) =>{
    return ({
        type: 'CHANGE_FAVORITE_MUSIC',
        payload: favoriteMusic
    })
};
