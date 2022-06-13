import styled from 'styled-components';
import { flexbox, background } from 'styled-system';
import { IStyled } from '../types/types';
import iconSearch from '../mock/icon-search.svg';
import loadIcon from '../mock/update-icon.svg';

export const WrapApp = styled('div')({
  width: '500px',
  margin: '0 auto',
});

export const WrapCard = styled('div')({
  borderRadius: '8px',
  boxShadow: '0 5px 15px rgb(0, 0, 0, 0.1)',
  background: '#4AD0FA',
  color: 'white',
  cursor: 'pointer',
  marginBottom: '20px',
});

export const IWrapCardContent = styled('div')({
  position: 'relative',
  padding: '15px',
});

export const CloseCardButton = styled('div')({
  position: 'absolute',
  top: '5px',
  right: '5px',
  color: 'yellow',
  backgroundColor: 'inherit',
  fontSize: '18px',
  margin: 0,
  padding: 0,
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    fontSize: '22px',
  },
});

export const WrapSearch = styled('div')({
  position: 'relative',
  margin: '15px 0',
});

export const InputSearch = styled('input')({
  width: '100%',
  height: '45px',
  borderRadius: '7px',
  borderStyle: 'none',
  boxShadow: '0 5px 15px rgb(0, 0, 0, 0.1)',
  padding: '7px 7px 7px 40px',
  fontSize: '20px',
  fontWeight: 300,
  backgroundImage: `url(${iconSearch})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '8px center',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  '&:focus-visible': {
    outline: 'none',
  },
  '&::placeholder': {
    color: '#AAB4BD',
  },
});

export const AutocompleteDropdownContainer = styled('div')({
  position: 'absolute',
  borderRadius: '6px',
  overflow: 'hidden',
  top: '55px',
  left: '0',
  width: '100%',
  zIndex: 1,
});

export const SelectOption = styled('div')({
  background: 'white',
  padding: '7px',
  cursor: 'pointer',
  '&:hover': {
    background: '#f3f3f3',
  },
  '&:not(:first-child)': {
    borderTop: '1px solid #000',
  },
});

export const NameCard = styled('h2')({
  width: '300px',
  fontWeight: 500,
  fontSize: '28px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const TextNotCities = styled('span')({
  display: 'inline-block',
  margin: '15px',
  fontSize: '25px',
  fontWeight: 500,
  color: 'white',
});

export const TextStyled = styled('p')({
  width: '300px',
  fontSize: '16px',
  fontWeight: 500,
  '&::first-letter': {
    textTransform: 'uppercase',
  },
});

export const IconWeather = styled('div')<IStyled>(
  {
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100px',
    height: '65px',
  },
  background
);

export const IconUpdate = styled('div')({
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundImage: `url(${loadIcon})`,
  width: '35px',
  height: '35px',
  cursor: 'pointer',
  '&:hover': {
    transform: 'rotate(360deg)',
    transition: 'transform 1s',
  },
});

export const TempStyled = styled('span')({
  fontSize: '85px',
  fontWeight: 300,
});

export const FlexColumSB = styled('div')<IStyled>(
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexbox
);

export const Flex = styled('div')<IStyled>(
  {
    display: 'flex',
  },
  flexbox
);

export const FlexSB = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

export const WrapWeatherItem = styled('div')({
  width: '700px',
  padding: '15px',
  margin: '10px auto',
  background: '#4AD0FA',
  borderRadius: '8px',
  border: 'none',
  color: '#fff',
});

export const TextMinutes = styled('sup')({
  fontSize: '13px',
});

export const TableWeather = styled('div')({
  fontSize: '20px',
  fontWeight: 400,
  margin: '15px 0',
  display: 'inline-block',
  width: 'calc(100%/8)',
  textAlign: 'center',
});

export const Button = styled.button<IStyled>`
  padding: 0 10px;
  border-radius: 6px;
  border: 2px solid ${(props) => (props.action === 'active' ? '#4AD0FA' : '#fff')};
  background: inherit;
  font-size: ${(props) => (props.action === 'active' ? '27px' : '20px')};
  font-weight: 500;
  color: ${(props) => (props.action === 'active' ? '#4AD0FA' : '#fff')};
  cursor: pointer;
  margin-left: 15px;
`;

export const Loading = styled('div')({
  margin: '20px auto',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundImage: `url(${loadIcon})`,
  width: '80px',
  height: '80px',
  animationName: 'rotate',
  animationDuration: '2s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
  '@keyframes rotate': {
    from: { transform: 'rotate(-360deg)' },
    to: { transform: 'rotate(360deg)' },
  },
});
