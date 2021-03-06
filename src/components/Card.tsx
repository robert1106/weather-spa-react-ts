import React, { FC } from 'react';
import { IWeatherTime } from '../types/types';
import {
  CloseCardButton,
  TextStyled,
  IconWeather,
  IWrapCardContent,
  NameCard,
  FlexColumSB,
  TempStyled,
  FlexSB,
  IconUpdate,
  WrapCard,
} from '../styles/styles';
import {
  removeWeatherCity,
  removeWeatherMyLocation,
  updateFetchWeatherCities,
  updateFetchWeatherMyLocation,
} from '../store/WeatherSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { formatAMPM } from '../functions/format-time-ampm';
import translate from '../translate';

interface CardProps {
  weather: IWeatherTime;
  setLocalStorage: () => void;
  index?: number;
}

const Card: FC<CardProps> = ({ weather, index = -1, setLocalStorage }) => {
  const urlIcon = ` http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
  const { weatherCities, weatherMyLocation, lang } = useAppSelector((state) => state.useReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function clickCard() {
    setLocalStorage();
    index !== -1
      ? navigate('/' + weatherCities[index].id + '-' + weatherCities[index].name)
      : navigate('/' + weatherMyLocation?.id + '-' + weatherMyLocation?.name);
  }

  const clickClosed: React.MouseEventHandler<HTMLDivElement> = (event) => {
    index !== -1 ? dispatch(removeWeatherCity(index)) : dispatch(removeWeatherMyLocation());
    event.stopPropagation();
  };

  const clickUpdate: React.MouseEventHandler<HTMLDivElement> = (event) => {
    index !== -1
      ? dispatch(updateFetchWeatherCities(index))
      : dispatch(updateFetchWeatherMyLocation());
    event.stopPropagation();
  };

  return (
    <WrapCard onClick={clickCard}>
      <IWrapCardContent>
        <CloseCardButton onClick={clickClosed}>&#10006;</CloseCardButton>
        <FlexSB>
          <FlexColumSB>
            <div>
              <NameCard>{index === -1 ? translate('gps') : weather.name}</NameCard>
              <TextStyled>
                {index === -1 && weather.name} {formatAMPM(weather.dt, lang)}
              </TextStyled>
            </div>
            <div>
              <IconWeather backgroundImage={'url(' + urlIcon + ')'} />
              <TextStyled>{weather.weather[0].description}</TextStyled>
              <TextStyled>
                {translate('feelsLike')} {Math.round(weather.main.feels_like)}&#176;
              </TextStyled>
            </div>
          </FlexColumSB>
          <FlexColumSB alignItems="end">
            <TempStyled>{Math.round(weather.main.temp)}&#176;</TempStyled>
            <IconUpdate onClick={clickUpdate} />
          </FlexColumSB>
        </FlexSB>
      </IWrapCardContent>
    </WrapCard>
  );
};

export default Card;
