import { FC, useEffect } from 'react';
import uniqid from 'uniqid';
import Card from './components/Card';
import { IWeatherTime } from './types/types';
import SearchCity from './components/SearchCity';
import { Loading, TextNotCities, WrapApp } from './styles/styles';
import { useBeforeunload } from 'react-beforeunload';
import List from './components/List';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { addFetchWeather, addWeatherCityLS, findMyLocation } from './store/WeatherSlice';
import translate, { messages } from './translate';
import { IntlProvider } from 'react-intl';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { weatherCities, weatherMyLocation, isLoading, myLocation, lang } = useAppSelector(
    (state) => state.useReducer
  );

  function setLocalStorage() {
    localStorage.setItem('weatherCities', JSON.stringify(weatherCities));
  }

  useEffect(() => {
    if (localStorage.getItem('weatherCities')) {
      const add: string | null = localStorage.getItem('weatherCities');
      if (add) {
        const addType: IWeatherTime[] = JSON.parse(add);
        dispatch(addWeatherCityLS(addType));
      }
    }

    dispatch(findMyLocation());
  }, []);

  useEffect(() => {
    if (myLocation) {
      const latLon = myLocation;
      const variant = 'MY_LOCATION';
      dispatch(addFetchWeather({ latLon, variant }));
    }
  }, [myLocation]);

  useBeforeunload(() => setLocalStorage());

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <WrapApp>
        <SearchCity />
        {!weatherMyLocation && !weatherCities.length && (
          <TextNotCities>{translate('check')}</TextNotCities>
        )}
        {weatherMyLocation && (
          <Card weather={weatherMyLocation} setLocalStorage={setLocalStorage} />
        )}
        <List
          items={weatherCities}
          renderItem={(weather: IWeatherTime, index) => (
            <Card
              weather={weather}
              index={index}
              setLocalStorage={setLocalStorage}
              key={uniqid()}
            />
          )}
        />
        {isLoading && <Loading />}
      </WrapApp>
    </IntlProvider>
  );
};

export default App;
