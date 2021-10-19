import { GET_CURRENT_LOC_WEATHER_DATA, SET_LOCATION , SET_CURRENT_LOC_WEATHER_DATA, SET_CURRENT_LOC_FORCAST_WEATHER_DATA} from "../actions/actionTypes";

const initialState = {
  pageList: [],
  location: null,
  isLoading: false,
  currentWeather:{},
  forcastWeather:[]
};
const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_LOC_WEATHER_DATA:
      return {
        ...state,
        currentWeather:{},
        isLoading:true
      };
    case SET_CURRENT_LOC_WEATHER_DATA:
      return {
        ...state,
        currentWeather: action.payload,
        isLoading:false,
      };
    case SET_CURRENT_LOC_FORCAST_WEATHER_DATA:

      return {
        ...state,
        forcastWeather: action.payload
      }
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};


export const getCurrentWeather = (location) => {
  
  return dispatch => {
    dispatch({type: GET_CURRENT_LOC_WEATHER_DATA, payload: {}});
      fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${location.lat}&lon=${location.lng}&appid=fae7190d7e6433ec3a45285ffcf55c86`,{
        method: 'GET'
        }).then(async(res) => {
          const data = await res.json();
          dispatch({type: SET_CURRENT_LOC_WEATHER_DATA, payload: data});

      }).catch(err => {
        console.log('error', err);
      });
  }
}

export const getForcastWeather = (location) => {
  return dispatch => {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${location.lat}&lon=${location.lng}&appid=fae7190d7e6433ec3a45285ffcf55c86`,{
        method: 'GET'
        }).then(async(res) => {
          const data = await res.json();
          dispatch({type: SET_CURRENT_LOC_FORCAST_WEATHER_DATA, payload: data});

      }).catch(err => {
        console.log('error', err);
      });
  }
}




export default weatherReducer;
