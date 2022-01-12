import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { WeatherForecastT } from '../interfaces/forecast.interfaces';
import { useFetchWeatherT } from '../interfaces/useFetch.interfaces';

export const useFetchWeatherByCityV2 = (city: string) => {
  const [state, setState] = useState<useFetchWeatherT>({
    response: null,
    loading: false,
    error: null,
  });

  const BASE_URL =
    city &&
    `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=6ca9f6cd828945a2abb18dcf2d2c940d`;

  useEffect(() => {
    if (!city) return;
    setState((prev) => ({
      ...prev,
      loading: true,
    }));
    axios
      .get<WeatherForecastT>(BASE_URL)
      .then((res) => {
        const { data } = res;
        setState((prev) => ({
          ...prev,
          response: data || null,
          error: null,
        }));
      })
      .catch((error) => {
        const err = error as AxiosError;
        setState({
          loading: false,
          response: null,
          error: err.response?.data?.error,
        });
      })
      .finally(() => {
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  }, [BASE_URL]);

  return state;
};
