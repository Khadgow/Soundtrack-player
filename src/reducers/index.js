const initialState = {
    games:[],
    playlist:[],
    volume: 1,
    pause: true,
    time: 0,
    changeBy: null,
    nowPlaying: null,
    nowPlayingInfo: null,
    loading: true,
    error: null,
    favoriteMusic: localStorage.favorites ? JSON.parse(localStorage.favorites) : null
};

const reducer = (state = initialState, action) =>{
switch (action.type) {

    case 'FETCH_GAMES_REQUEST':
        return {
            ...state,
            games: [],
            loading: true,
            error: null
        };
    case 'FETCH_GAMES_SUCCESS':
        return {
            ...state,
            games: [ ...action.payload],
            loading: false,
            error: null
        };
    case 'FETCH_GAMES_FAILURE':
        return {
            ...state,
            games: [],
            loading: false,
            error: action.payload
        };
    case 'ADD_MUSIC':
        const {composer, img, name, src} = action.payload;
        const aud = new Audio(src);
        aud.volume= state.volume;
        return {
            ...state,
            nowPlaying: aud,
            nowPlayingInfo: {composer, img, name}
        };
    case 'SET_VOLUME':
        return {
            ...state,
            volume: action.payload
        };
    case 'SET_PAUSE':
        return {
            ...state,
            pause: action.payload
        };
    case 'SET_TIME':
        return {
            ...state,
            time: action.payload.time,
            changeBy: action.payload.changeBy
        };
    case 'CHANGE_FAVORITE_MUSIC':
        return {
            ...state,
            favoriteMusic: action.payload
        };
    default:
        return state;
    }


};

export default reducer;
