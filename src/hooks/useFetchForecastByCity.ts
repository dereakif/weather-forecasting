import axios, { AxiosError } from 'axios';
import { useEffect, useState, useRef } from 'react';
import { WeatherForecastT } from '../interfaces/forecast.interfaces';
import { useFetchWeatherT } from '../interfaces/useFetch.interfaces';

type useRefT<T> = { [key: string]: T };

export const useFetchWeatherByCity = () => {
  const cache = useRef<useRefT<WeatherForecastT>>({});

  const [state, setState] = useState<useFetchWeatherT>({
    response: null,
    loading: false,
    error: null,
  });
  const [city, setCity] = useState('');

  const BASE_URL =
    city &&
    `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=6ca9f6cd828945a2abb18dcf2d2c940d`;

  useEffect(() => {
    if (!city) return;
    if (cache.current[city]) {
      return setState((prev) => ({ ...prev, response: cache.current[city] }));
    }
    const timeoutId = setTimeout(() => {
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
            error: data ? null : 'noContent',
          }));
          cache.current[city] = data;
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
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [BASE_URL, city]);

  return { ...state, city, setCity };
};
