import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoords, IForecast, IValueAsyncThunk, IWeatherTime } from '../types/types';
import { WEATHER_API_KEY } from '../params/params';
import axios from 'axios';
import { RootState } from './store';
import { getPureCityName } from '../functions/get-pure-city-name';

interface WeatherState {
  myLocation: ICoords | null;
  weatherMyLocation: IWeatherTime | null;
  weatherItem: IForecast;
  weatherCities: IWeatherTime[];
  isLoading: boolean;
  error: string;
  lang: 'uk' | 'en';
}

const initialState: WeatherState = {
  myLocation: null,
  weatherMyLocation: null,
  weatherItem: {
    list: [],
    city: { name: '', id: 0, sunrise: 0, sunset: 0 },
  },
  weatherCities: [],
  isLoading: false,
  error: '',
  lang: 'uk',
};

export const findMyLocation = createAsyncThunk(
  'weather/createAsyncThunk',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        dispatch(setMyLocation({ lat, lon }));
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
    }
  }
);

export const addFetchWeatherItem = createAsyncThunk(
  'weather/addFetchWeatherItem',
  async (id: number, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const lang = state.useReducer.lang;
      const url = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${WEATHER_API_KEY}&units=metric&cnt=8&lang=${lang}`;
      await axios.get<IForecast>(url).then(({ data }) => dispatch(addWeatherItem(data)));
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
    }
  }
);

export const addFetchWeather = createAsyncThunk(
  'weather/addFetchWeather',
  async ({ latLon, variant }: IValueAsyncThunk, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const lang = state.useReducer.lang;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&lang=${lang}&appid=${WEATHER_API_KEY}&units=metric`;
      await axios.get<IWeatherTime>(url).then(({ data }) => {
        getPureCityName(latLon, lang).then((city) => {
          data.dt = String(new Date());
          data.name = city;
          switch (variant) {
            case 'ADD_CITY':
              dispatch(addWeatherCity(data));
              break;
            case 'MY_LOCATION':
              dispatch(setWeatherMyLocation(data));
              break;
          }
        });
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
    }
  }
);

export const updateFetchWeatherCities = createAsyncThunk(
  'weather/updateFetchWeatherCities',
  async (index: number, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const lang = state.useReducer.lang;
      const weather = [...state.useReducer.weatherCities];
      const { lat, lon } = weather[index].coord;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&appid=${WEATHER_API_KEY}&units=metric`;
      await axios.get<IWeatherTime>(url).then(({ data }) => {
        getPureCityName({ lat, lon }, lang).then((city) => {
          data.dt = String(new Date());
          data.name = city;
          weather[index] = { ...data };
          dispatch(updateWeatherCity(weather));
        });
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
    }
  }
);

export const updateFetchWeatherMyLocation = createAsyncThunk(
  'weather/updateFetchWeatherMyLocation',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const lang = state.useReducer.lang;
      if (state.useReducer.weatherMyLocation) {
        const { lat, lon } = state.useReducer.weatherMyLocation.coord;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&appid=${WEATHER_API_KEY}&units=metric`;
        await axios.get<IWeatherTime>(url).then(({ data }) => {
          getPureCityName({ lat, lon }, lang).then((city) => {
            data.dt = String(new Date());
            data.name = city;
            dispatch(setWeatherMyLocation(data));
          });
        });
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
    }
  }
);

const setError = (state: WeatherState, action: PayloadAction<string>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const pending = (state: WeatherState) => {
  state.isLoading = true;
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<'uk' | 'en'>) {
      state.lang = action.payload;
    },
    setMyLocation(state, action: PayloadAction<ICoords>) {
      state.myLocation = action.payload;
    },
    addWeatherCityLS(state, action: PayloadAction<IWeatherTime[]>) {
      state.weatherCities = action.payload;
    },
    addWeatherCity(state, action: PayloadAction<IWeatherTime>) {
      state.weatherCities.push(action.payload);
    },
    addWeatherItem(state, action: PayloadAction<IForecast>) {
      state.weatherItem = action.payload;
    },
    updateWeatherCity(state, action: PayloadAction<IWeatherTime[]>) {
      state.weatherCities = action.payload;
    },
    removeWeatherCity(state, action: PayloadAction<number>) {
      state.weatherCities.splice(action.payload, 1);
    },
    setWeatherMyLocation(state, action: PayloadAction<IWeatherTime>) {
      state.weatherMyLocation = action.payload;
    },
    removeWeatherMyLocation(state) {
      state.weatherMyLocation = null;
    },
  },
  extraReducers: {
    [addFetchWeather.pending.type]: pending,
    [findMyLocation.pending.type]: pending,
    [addFetchWeatherItem.pending.type]: pending,
    [addFetchWeather.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [findMyLocation.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [addFetchWeatherItem.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [addFetchWeather.rejected.type]: setError,
    [findMyLocation.rejected.type]: setError,
    [addFetchWeatherItem.rejected.type]: setError,
  },
});

export const {
  addWeatherCity,
  addWeatherItem,
  updateWeatherCity,
  removeWeatherCity,
  setWeatherMyLocation,
  removeWeatherMyLocation,
  addWeatherCityLS,
  setMyLocation,
  setLang,
} = weatherSlice.actions;
export default weatherSlice.reducer;
