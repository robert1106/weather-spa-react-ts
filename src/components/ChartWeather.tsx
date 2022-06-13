import React, { FC } from 'react';
import styled from 'styled-components';
import { IStyled } from '../types/types';
import { color, layout, position } from 'styled-system';

interface IChartWeather {
  arg: number;
  args: number[];
  children?: React.ReactNode;
  oneArg?: number;
}

const Chart = styled('div')<IStyled>(
  {
    marginTop: '10px',
  },
  layout
);

const ChartValue = styled('div')<IStyled>(
  {
    position: 'relative',
    lineHeight: '28px',
    color: '#000',
  },
  layout,
  position,
  color
);

const ChartWeather: FC<IChartWeather> = ({ arg, args, children, oneArg = 5 }) => {
  const heightChartValue = 26;
  const maxArg: number = Math.round(Math.max(...args));
  const minArg: number = Math.round(Math.min(...args));
  const differenceArgs: number = maxArg - minArg;
  const heightChart: number = differenceArgs * oneArg + heightChartValue;
  const calc: number = arg > 0 ? Math.round(105 - arg * 2.5) : Math.round(170 - arg * 2.5);
  const hsl = `hsl(${calc},100%,50%)`;

  function positionChart(arg: number) {
    return (maxArg - arg) * oneArg;
  }

  return (
    <Chart height={heightChart + 'px'}>
      <ChartValue
        height={heightChartValue + 'px'}
        top={positionChart(arg) + 'px'}
        backgroundColor={hsl}
      >
        {children}
        {arg}
      </ChartValue>
    </Chart>
  );
};

export default ChartWeather;
