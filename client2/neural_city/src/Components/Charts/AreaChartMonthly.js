import React from 'react';
import Chart from 'react-apexcharts';

const AreaChartMonthly = () => {
    const seriesData = [{
        name: 'Monthly Data',
        data: [80, 100, 95, 90, 85, 80, 70, 60, 50, 45, 40, 30] // Sample monthly data
    }];

    const chartOptions = {
        chart: {
            type: 'area',
            width: '900px', // Adjust width as per requirement
            height: 250, // Adjust height as per requirement
            zoom: {
                enabled: false
            },
            toolbar: {
                show: true
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yaxis: {
            max: 100,
            min: 0
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: "Monthly Analysis"
        },
        stroke: {
            curve: 'stepline',
        }
    };

    return (
        <div>
            <Chart
                options={chartOptions}
                series={seriesData}
                type="area"
                height={250}
                width={'600px'}
            />
        </div>
    );
};

export default AreaChartMonthly;