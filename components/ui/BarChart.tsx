import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';



interface Props {
  data: any;
}

const BarChart: React.FC<Props> = ({ data }) => {
    if (!data || !data.game_indices || data.game_indices.length === 0) {
        console.log('here')
        return <div>No data available</div>;
      }
    console.log(data)
  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: data?.game_indices.map((game: any) => game.generation.name),
      title: {
        text: 'Generation',
      },
    },
    yaxis: {
      title: {
        text: 'Cost',
      },
    },
  };

  const series = [{
    name: 'Cost',
    data: data?.game_indices.map((game: any) => game.game_index),
  }];

  return (
    
    <Chart options={options} series={series} type="bar" height={350} />
  );
};

export default BarChart;
