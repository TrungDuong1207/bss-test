import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function DeviceChart(props) {
    const { devices } = props;

    // Tính toán dữ liệu cho biểu đồ Doughnut
    const data = {
        labels: devices.map((device) => device.name),
        datasets: [
            {
                data: devices.map((device) => device.consumption),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#2ecc71',
                    '#9b59b6',
                    '#f1c40f',
                    '#e74c3c',
                    '#3498db',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#2ecc71',
                    '#9b59b6',
                    '#f1c40f',
                    '#e74c3c',
                    '#3498db',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            <Doughnut data={data} options={options} chart={Chart} key={Math.random()} />
        </div>
    );
}

export default DeviceChart;
