import React, { useEffect, useState } from 'react';
import { Select } from 'flowbite-react';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const GITHUB_USERNAME = 'ajSeadler';

const RevenueForecast = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Last 14 Days');
  const [commitData, setCommitData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
        const events = await res.json();

        const counts: { [date: string]: number } = {};

        events.forEach((event: any) => {
          if (event.type === 'PushEvent') {
            const date = new Date(event.created_at).toISOString().split('T')[0];
            const commitCount = event.payload.commits.length;
            counts[date] = (counts[date] || 0) + commitCount;
          }
        });

        const today = new Date();
        const last14Days = Array.from({ length: 14 }, (_, i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          return d.toISOString().split('T')[0];
        }).reverse();

        const commitCounts = last14Days.map((date) => counts[date] || 0);
        setCommitData(commitCounts);
      } catch (error) {
        console.error('Error fetching commits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [selectedPeriod]);

  const optionsAreaChart: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#3b82f6'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: Array.from({ length: 14 }, (_, i) => {
        const daysAgo = 13 - i;
        if (daysAgo === 0) return 'Today';
        if (daysAgo === 1) return 'Yesterday';
        return `${daysAgo}`;
      }),
      labels: {
        rotate: 0,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
    },
    tooltip: {
      theme: 'dark',
    },
    grid: {
      borderColor: '#90A4AE50',
    },
  };

  const areaChartData = [
    {
      name: 'Commits',
      data: commitData,
    },
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-4">
        <h5 className="card-title">GitHub Commits (Last 14 Days)</h5>
        <Select
          id="periods"
          className="select-md"
          value={selectedPeriod}
          onChange={handleSelectChange}
          required
        >
          <option value="Last 14 Days">Last 14 Days</option>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading commits...</div>
      ) : (
        <Chart
          options={optionsAreaChart}
          series={areaChartData}
          type="area"
          height="315px"
          width="100%"
        />
      )}
    </div>
  );
};

export { RevenueForecast };
