import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface Props {
  data: any;
}

const RadarChart: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  const options: ApexOptions = {
    chart: {
      type: 'radar',
    },
    xaxis: {
      categories: data.attributes.map((attribute: any) => attribute.name),
    },
    yaxis: {
      title: {
        text: 'Value',
      },
    },
  };

  const series = [{
    name: 'X-Attack',
    data: data.attributes.map((attribute: any) => attribute.url ? 1 : 0), // Assuming presence of URL indicates usability
  }];

  return (
    <Chart options={options} series={series} type="radar" height={350} />
  );
};

export default RadarChart;
