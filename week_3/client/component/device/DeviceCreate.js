import React, { useState } from 'react';

function DeviceCreate(props) {
    const [values, setValues] = useState({ name: '', ip: '', consumption: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { onSubmit } = props;
        let name = values.name;
        let ip = values.ip;
        let consumption = values.consumption;

        let errors = {};

        if (name.trim().length === 0) {
            errors = { ...errors, name: "Name couldn't be blank" }
        }

        if (ip.trim().length === 0) {
            errors = { ...errors, ip: "IP couldn't be blank" }
        } else {
            const regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
            if (!regex.test(ip.trim())) {
                errors = { ...errors, ip: "Invalid IP address" };
            }
        }

        if (consumption.trim().length === 0) {
            errors = { ...errors, consumption: "Power required and greater than or equal to 0" }
        } else {
            if (consumption < 0) {
                errors = { ...errors, consumption: "Power greater than or equal to 0" };
            }
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                if (onSubmit) {
                    onSubmit(values);
                }
                setValues({ name: '', ip: '', consumption: '' });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <form id="add-device-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                />
                {errors.name && <span id="errorName" aria-hidden="true" style={{ color: 'orangered', marginTop: '10px' }}>{errors.name}</span>}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="ip"
                    placeholder="IP"
                    value={values.ip}
                    onChange={handleChange}
                />
                {errors.ip && <span id="errorIp" aria-hidden="true" style={{ color: 'orangered', marginTop: '10px' }}>{errors.ip}</span>}
            </div>
            <div className="form-group">
                <input
                    type="number"
                    name="consumption"
                    placeholder="Power"
                    value={values.consumption}
                    onChange={handleChange}
                />
                {errors.consumption && <span id="errorPower" aria-hidden="true" style={{ color: 'orangered', marginTop: '10px' }}>{errors.consumption}</span>}
            </div>
            <div className="btn-submit">
                <button type="submit">Add device</button>
            </div>
        </form>
    );
}

export default DeviceCreate;
