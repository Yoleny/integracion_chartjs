'use client';

import { getSumaProductType } from '@/service/Api';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


interface ProductData {
  productType: string;
  Total: number;
}

export default function SumaProductoType() {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: '',
        data: [] as number[],
        backgroundColor: [] as string[],
      },
    ],
  });

  useEffect(() => {
    getSumaProductType()
      .then((data: ProductData[]) => {
        const productType = data.map((item) => item.productType);
        const total = data.map((item) => item.Total);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const backgroundColors = total.map((_, index) => {
          const color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
          return color;
        });

        setChartData({
          labels: productType,
          datasets: [
            {
              label: 'Suma de productType',
              data: total,
              backgroundColor: backgroundColors,
            },
          ],
        });
      })
      .catch((error) => {
        console.log('Ocurrió un error', error);
      });
  }, []);

  return (
    <div>
      {chartData.labels.length > 0 ? (
        <div>
          <h3>Titulo del componente</h3>
          <Bar data={chartData} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}