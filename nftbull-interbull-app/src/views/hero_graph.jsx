import React from 'react';
import faker from 'faker';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import ReactApexChart from 'react-apexcharts';
const options = {
  chart: {
    height: 350,
    type: 'line'
  },
  stroke: {
    width: [0, 4]
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1]
  },
  toolbar: {
    show: false
  },
  labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
  xaxis: {
    type: 'datetime'
  },
  yaxis: [{
    title: {
      text: 'Website Blog',
    },

  }, {
    opposite: true,
    title: {
      text: 'Social Media'
    }
  }]
};
const series = [
  {
    name: 'Volume',
    type: 'column',
    data: options.labels.map(() => faker.datatype.number({ min: 0, max: 240000 })),
  }, {
    name: 'Social Media',
    type: 'line',
    data: options.labels.map(() => faker.datatype.number({ min: 0, max: 240000 })),
  }
];



/* This example requires Tailwind CSS v2.0+ */

const stats = [
  { name: '🔥 growing rapidly', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
  { name: '👀 most people bought', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
  { name: '💵 most volume', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HeroGraph() {
  const [selectedStat, setSelectedStat] = React.useState(0);
  return (
    <div className='space-y-4 p-10'>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Last 24 hours</h3>
      <dl className="grid grid-cols-3 gap-2 overflow-hidden">
        {stats.map((item, i) => (
          <div onClick={() => setSelectedStat(i)} key={item.name} className={`bg-white shadow rounded-md px-4 py-2 cursor-pointer ${selectedStat == i ? "border-2 border-black" : ""}`}>
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 justify-between items-baseline space-y-2">
              <div className="flex items-center text-2xl font-semibold text-indigo-600">
                <img className='object-scale-down w-5 h-5' src="https://lh3.googleusercontent.com/OI59gxLlnJR1Vl2KffEVx_dK6hwpnAv2fkypmPuAMgJTJCFTEMuY4m40H6gotvEJN544Zg-XbcH49JC7diyPwmLGKUV8K2Vyt2YQKg=s120" />
                <span className="ml-2 text-sm font-medium text-gray-500">Gooniez Gang Official</span>
              </div>
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.stat}
                <span className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span>
              </div>
              

              <div
                className={classNames(
                  item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                  'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  )
}
