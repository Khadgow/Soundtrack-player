export const gamesLoaded = (newGames) => {
    return {
        type: 'FETCH_GAMES_SUCCESS',
        payload: newGames
    };
};

export const gamesRequested = () => {
    return{
        type: 'FETCH_GAMES_REQUEST'
    }
};

export const gamesError = (error) => {
    return {
        type: 'FETCH_GAMES_FAILURE',
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
        payload: volume
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

export const addFavorite = (music) =>{
    return ({
        type: 'ADD_FAVORITE',
        payload: music
    })
};

export const deleteFavorite = (music) =>{
    return ({
        type: 'DELETE_FAVORITE',
        payload: music
    })
};

export const changeFavoriteMusic = (favoriteMusic) =>{
    return ({
        type: 'CHANGE_FAVORITE_MUSIC',
        payload: favoriteMusic
    })
};
