import { ApexOptions } from 'apexcharts';
import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { Datum, WeatherForecastT } from '../../interfaces/forecast.interfaces';
import './styles.scss';

interface ResultProps {
  response: WeatherForecastT;
}
interface DailyDetailProps {
  city: string;
  selectedDay?: Datum;
}

const DailyDetail = ({ city, selectedDay }: DailyDetailProps) => {
  if (selectedDay) {
    const date = new Date(selectedDay.valid_date);
    const formattedDate =
      date.toLocaleDateString('en', { day: 'numeric' }) +
      ' ' +
      date.toLocaleDateString('en', { month: 'short' });
    return (
      <div className='detail-container'>
        <h1 className='detail-container__temp'>{selectedDay.temp}&deg;C</h1>
        <h1 className='detail-container__city-name'>{city}</h1>
        <h3 className='detail-container__date'>{formattedDate}</h3>
        <div className='detail-container__forecast'>
          <img
            className='detail-container__forecast__img'
            alt='condition'
            src={require(`../../assets/images/${selectedDay.weather.icon}.png`)}
          />
          <span className='detail-container__forecast__condition'>
            {selectedDay.weather.description}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const Result = ({ response }: ResultProps) => {
  const filterData = <T extends Datum, U extends keyof T>(
    forecast: T[],
    field: U
  ) => {
    return forecast?.map((fc) => fc[field]);
  };

  const initialOptions: ApexOptions = useMemo(() => {
    return {
      chart: {
        width: '100%',
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
        events: {},
      },
      responsive: [
        {
          breakpoint: 1100,
          options: {
            chart: {
              width: '100%',
            },
          },
        },
        {
          breakpoint: 650,
          options: {
            legend: {
              show: false,
            },
            dataLabels: {
              enabled: false,
            },
            title: {
              align: 'center',
              style: { fontWeight: 600, fontSize: '14px' },
            },
          },
        },
      ],
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Average High & Low Temperatures',
        align: 'center',
        style: { fontWeight: 500, fontSize: '20px' },
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        type: 'datetime',
        labels: {
          format: 'dd MMM',
        },
      },
      yaxis: {
        title: {
          text: 'Temperature',
        },
        forceNiceScale: true,
        min: (num) => num - 5,
        max: (num) => num + 5,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    };
  }, []);

  const [seriesForChart, setSeriesForChart] =
    useState<ApexAxisChartSeries | null>(null);
  const [optionsForChart, setOptionsForChart] = useState<ApexOptions | null>(
    null
  );
  const [selectedDay, setSelectedDay] = useState<Datum | null>(null);

  useEffect(() => {
    if (response) {
      const maxTemps = filterData(response.data, 'max_temp');
      const minTemps = filterData(response.data, 'min_temp');
      const validDates = filterData(response.data, 'valid_date');

      setSeriesForChart([
        {
          name: 'High',
          data: maxTemps,
        },
        {
          name: 'Low',
          data: minTemps,
        },
      ]);

      initialOptions.xaxis = {
        type: 'datetime',
        labels: {
          format: 'dd MMM',
        },
        categories: validDates,
      };

      if (initialOptions.title) {
        initialOptions.title.text += ` for ${response.city_name}, ${response.country_code}`;
      }
      if (initialOptions.chart?.events) {
        initialOptions.chart.events.click = (event, chartContext, config) => {
          const dataPointIndex = config.dataPointIndex;
          dataPointIndex !== -1 &&
            setSelectedDay(response.data[dataPointIndex]);
        };
      }

      setOptionsForChart(initialOptions);
      setSelectedDay(response.data[0]);
    }
  }, [response, initialOptions]);

  if (seriesForChart && optionsForChart) {
    return (
      <div className='result'>
        <div className='result__weather-chart'>
          <Chart options={optionsForChart} series={seriesForChart} />
        </div>
        <DailyDetail
          city={response?.city_name || ''}
          {...(selectedDay && { selectedDay })}
        />
      </div>
    );
  }
  return null;
};

export default Result;
