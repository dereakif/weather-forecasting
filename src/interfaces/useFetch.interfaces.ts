import { WeatherForecastT } from './forecast.interfaces';

export interface useFetchWeatherT {
  response: WeatherForecastT | null;
  loading: boolean;
  error: string | null;
}
