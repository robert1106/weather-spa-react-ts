import { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IconWeather,
  NameCard,
  TextMinutes,
  TextStyled,
  TableWeather,
  WrapWeatherItem,
  Button,
  Flex,
  Loading,
} from '../styles/styles';
import List from './List';
import uniqid from 'uniqid';
import ChartWeather from './ChartWeather';
import GradientBlock from './GradientBlock';
import translate from '../translate';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addFetchWeatherItem } from '../store/WeatherSlice';

const WeatherItemPage: FC = () => {
  const dispatch = useAppDispatch();
  const { weatherItem, isLoading } = useAppSelector((state) => state.useReducer);
  const { idCity } = useParams<{ idCity: string }>();
  const navigate = useNavigate();
  const id = Number(idCity?.split('-')[0]);
  const city = String(idCity?.split('-')[1]);

  useEffect(() => {
    dispatch(addFetchWeatherItem(id));
  }, [id]);

  function dateGet(time: string | undefined) {
    if (time) {
      return new Date(time).getHours();
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <WrapWeatherItem>
            <Flex justifyContent="space-between">
              <NameCard>{city}</NameCard>
              <Button onClick={() => navigate('/')}>{translate('back')}</Button>
            </Flex>
            <TextStyled>{translate('perDay')}</TextStyled>
            <List
              items={weatherItem.list}
              renderItem={(item) => {
                const temp = Math.round(item.main.temp);
                const url = `url('http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png')`;
                return (
                  <TableWeather key={uniqid()}>
                    {dateGet(item.dt_txt)}
                    <TextMinutes>00</TextMinutes>
                    <IconWeather backgroundSize="70px" backgroundImage={url} />
                    <ChartWeather arg={temp} args={weatherItem.list.map((e) => e.main.temp)}>
                      {temp > 0 && '+'}
                    </ChartWeather>
                  </TableWeather>
                );
              }}
            />
          </WrapWeatherItem>
          <WrapWeatherItem>
            <TextStyled>{translate('pressure')}</TextStyled>
            <List
              items={weatherItem.list}
              renderItem={(item) => {
                const pressure = item.main.pressure;
                return (
                  <TableWeather key={uniqid()}>
                    {dateGet(item.dt_txt)}
                    <TextMinutes>00</TextMinutes>
                    <ChartWeather
                      arg={pressure}
                      args={weatherItem.list.map((e) => e.main.pressure)}
                    />
                  </TableWeather>
                );
              }}
            />
          </WrapWeatherItem>
          <WrapWeatherItem>
            <TextStyled>{translate('humidity')}</TextStyled>
            <List
              items={weatherItem.list}
              renderItem={(item) => {
                const humidity = item.main.humidity;
                return (
                  <TableWeather key={uniqid()}>
                    {dateGet(item.dt_txt)}
                    <TextMinutes>00</TextMinutes>
                    <ChartWeather
                      arg={humidity}
                      oneArg={1}
                      args={weatherItem.list.map((e) => e.main.humidity)}
                    />
                  </TableWeather>
                );
              }}
            />
          </WrapWeatherItem>
          <WrapWeatherItem>
            <TextStyled>{translate('speed')}</TextStyled>
            <List
              items={weatherItem.list}
              renderItem={(item) => {
                return (
                  <TableWeather key={uniqid()}>
                    {dateGet(item.dt_txt)}
                    <TextMinutes>00</TextMinutes>
                    <GradientBlock arg={item.wind.speed} />
                  </TableWeather>
                );
              }}
            />
            <TextStyled>{translate('gust')}</TextStyled>
            <List
              items={weatherItem.list}
              renderItem={(item) => {
                return (
                  <TableWeather key={uniqid()}>
                    <GradientBlock arg={item.wind.gust} />
                  </TableWeather>
                );
              }}
            />
          </WrapWeatherItem>
        </>
      )}
    </>
  );
};

export default WeatherItemPage;
