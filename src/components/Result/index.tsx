import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import './styles.scss';

const DailyDetail = () => {
  return (
    <div className='detail-container'>
      <h1 className='detail-container__temp'>10&deg;C</h1>
      <h1 className='detail-container__city-name'>cityName</h1>
      <h3 className='detail-container__date'>date</h3>
      <div className='detail-container__forecast'>
        <img className='detail-container__forecast__img' alt='condition' />
        <span className='detail-container__forecast__condition'>
          description
        </span>
      </div>
    </div>
  );
};
const Result = () => {
  const series: ApexAxisChartSeries = [
    { name: 'series-1', data: [30, 40, 45, 50, 49, 60, 70, 91] },
    { name: 'series-2', data: [20, 30, 25, 30, 19, 30, 20, 51] },
  ];
  const options: ApexOptions = {
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
        breakpoint: 800,
        options: {
          legend: {
            show: false,
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
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
    yaxis: {
      title: {
        text: 'Temperature',
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };
  return (
    <div className='result'>
      <div className='result__weather-chart'>
        <Chart options={options} series={series} />
      </div>
      <DailyDetail />
    </div>
  );
};

export default Result;
