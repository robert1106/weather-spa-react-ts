import { FC } from 'react';
import styled from 'styled-components';
import { IStyled } from '../types/types';
import { background } from 'styled-system';

interface IGradientBlock {
  arg: number;
}

const GradientBlockStyled = styled('div')<IStyled>(
  {
    color: '#000',
    lineHeight: '28px',
    height: '28px',
    marginTop: '15px',
    transform: 'skew(-12deg) ',
    width: '60px',
  },
  background
);

const GradientBlock: FC<IGradientBlock> = ({ arg }) => {
  let level = '';

  const integer = Math.round(arg);

  if (integer <= 1) {
    level = 'inherit';
  } else if (integer <= 6) {
    level = 'linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(235, 236, 237, 1) 30%)';
  } else {
    level = 'linear-gradient(90deg, rgba(255, 255, 255, .1), rgba(255, 235, 170, 1) 30%)';
  }

  return <GradientBlockStyled background={level}>{integer || '-'}</GradientBlockStyled>;
};

export default GradientBlock;
