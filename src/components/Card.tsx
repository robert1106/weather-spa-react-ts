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

  function clicksCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    if (e.target && e.currentTarget.matches('div#closed')) {
      index !== -1 ? dispatch(removeWeatherCity(index)) : dispatch(removeWeatherMyLocation());
    }
    if (e.target && e.currentTarget.matches('div#update')) {
      index !== -1
        ? dispatch(updateFetchWeatherCities(index))
        : dispatch(updateFetchWeatherMyLocation());
    }
    if (
      !(e.currentTarget && e.currentTarget.matches('div#closed')) &&
      !(e.currentTarget && e.currentTarget.matches('div#update'))
    ) {
      setLocalStorage();
      index !== -1
        ? navigate('/' + weatherCities[index].id + '-' + weatherCities[index].name)
        : navigate('/' + weatherMyLocation?.id + '-' + weatherMyLocation?.name);
    }
  }

  return (
    <WrapCard onClick={(event) => clicksCard(event)}>
      <IWrapCardContent>
        <CloseCardButton id="closed">&#10006;</CloseCardButton>
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
            <IconUpdate id="update" />
          </FlexColumSB>
        </FlexSB>
      </IWrapCardContent>
    </WrapCard>
  );
};

export default Card;
