import { FC } from 'react';
import { Button, WrapApp } from '../styles/styles';
import { changeLanguage } from '../translate';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setLang } from '../store/WeatherSlice';

const Lang: FC = () => {
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector((state) => state.useReducer);

  return (
    <WrapApp>
      <Button
        action={lang === 'uk' ? 'active' : ''}
        onClick={() => {
          dispatch(setLang('uk'));
          changeLanguage('uk');
        }}
      >
        Uk
      </Button>
      <Button
        action={lang === 'en' ? 'active' : ''}
        onClick={() => {
          dispatch(setLang('en'));
          changeLanguage('en');
        }}
      >
        En
      </Button>
    </WrapApp>
  );
};

export default Lang;
