export interface WeatherForecastT {
  data: Datum[];
  city_name: string;
  lon: string;
  timezone: string;
  lat: string;
  country_code: string;
  state_code: string;
}

export interface Datum {
  moonrise_ts: number;
  wind_cdir: string;
  rh: number;
  pres: number;
  high_temp: number;
  sunset_ts: number;
  ozone: number;
  moon_phase: number;
  wind_gust_spd: number;
  snow_depth: number;
  clouds: number;
  ts: number;
  sunrise_ts: number;
  app_min_temp: number;
  wind_spd: number;
  pop: number;
  wind_cdir_full: string;
  slp: number;
  moon_phase_lunation: number;
  valid_date: Date;
  app_max_temp: number;
  vis: number;
  dewpt: number;
  snow: number;
  uv: number;
  weather: Weather;
  wind_dir: number;
  max_dhi: null;
  clouds_hi: number;
  precip: number;
  low_temp: number;
  max_temp: number;
  moonset_ts: number;
  datetime: Date;
  temp: number;
  min_temp: number;
  clouds_mid: number;
  clouds_low: number;
}

export interface Weather {
  icon: string;
  code: number;
  description: string;
}
