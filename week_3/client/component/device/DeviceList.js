import React from 'react';

function DeviceList(props) {
    const { devices } = props;
    const totalConsumption = devices.reduce((total, device) => total + device.consumption, 0);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Devices</th>
                    <th>MAC Address</th>
                    <th>IP</th>
                    <th>Created Date</th>
                    <th>Devices Consumption (Kw/H)</th>
                </tr>
            </thead>
            <tbody>
                {devices.map((device, index) => {
                    return (
                        <tr key={index}>
                            <td>{device.name}</td>
                            <td>{device.macAddress}</td>
                            <td>{device.ip}</td>
                            <td>{device.createDate}</td>
                            <td>{device.consumption}</td>
                        </tr>)
                })}
                <tr className="total">
                    <th>Total</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>{totalConsumption}</th>
                </tr>
            </tbody>
        </table>
    );
}

export default DeviceList;