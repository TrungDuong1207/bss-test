import React, { useEffect, useState } from 'react';
import Layout from '../component/layout/Layout';
import PrivateRoute from '../component/private/PrivateRoute';
import Head from 'next/head';
import DeviceList from '../component/device/DeviceList';
import DeviceCreate from '../component/device/DeviceCreate';
import DeviceChart from '../component/device/DeviceChart';
import { getDevices, createDevice } from '../services/deviceService';

function Dashboard() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        async function fetchData() {
            try {
                const response = await getDevices(token);
                setDevices(response.devices);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const handleDeviceFormSubmit = async (values) => {
        const token = localStorage.getItem('token');
        try {
            const newDevice = await createDevice(token, values);
            setDevices(newDevice.devices);
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <PrivateRoute>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Layout>
                <div className="content">
                    <div className="device-list">
                        <DeviceList devices={devices} />
                    </div>
                    <div className="chart">
                        <DeviceChart devices={devices} />
                    </div>
                    <div className="device-create">
                        <DeviceCreate onSubmit={handleDeviceFormSubmit} />
                    </div>
                </div>
            </Layout>
        </PrivateRoute>
    );
}

export default Dashboard;
