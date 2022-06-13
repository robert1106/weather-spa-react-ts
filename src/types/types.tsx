export interface IWeather {
  description: string;
  icon: string;
}

export interface IMain {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
}

export interface IWind {
  speed: number;
  gust: number;
}

export interface ISys {
  sunrise?: number;
  sunset?: number;
  pop?: string;
}

export interface ICity {
  id: number;
  name: string;
  sunrise: number;
  sunset: number;
}

export interface IWeatherTime {
  weather: IWeather[];
  main: IMain;
  wind: IWind;
  clouds: {
    all: number;
  };
  coord: ICoords;
  dt: string;
  id: number;
  sys?: ISys;
  pop?: number;
  dt_txt?: string;
  name?: string;
  cod: number;
}

export interface IForecast {
  list: IWeatherTime[];
  city: ICity;
}

export interface ICoords {
  lat: number;
  lon: number;
}

export interface IAddressComponent {
  types: string[];
  long_name: string;
}

export interface IPlace {
  address_components: IAddressComponent[];
  geometry: {
    location: ICoords;
  };
}

export interface IStyled {
  backgroundImage?: string;
  alignItems?: string;
  backgroundSize?: string;
  height?: string;
  pt?: string;
  backgroundColor?: string;
  top?: string;
  justifyContent?: string;
  background?: string;
  variant?: string;
  action?: string;
}

export interface IValueAsyncThunk {
  latLon: ICoords;
  variant: string;
}
