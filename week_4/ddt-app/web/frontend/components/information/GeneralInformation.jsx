
import React, { useState } from 'react';
import {
    Card,
    TextField,
    Select,
} from "@shopify/polaris";

function GeneralInformation(props) {
    const { setRule, rule, generalInfo, setGeneralInfo } = props;
    
    const [errors, setErrors] = useState({});

    const handleChange = (value, name) => {
        let newName = generalInfo.name;
        let newPriority = generalInfo.priority;
        let newErrors = {}
        if (name === 'name') {
            newName = value;
            if (newName.trim().length === 0) {
                newErrors = { ...newErrors, name: "Name couldn't be blank" };
            }
        }

        if (name === 'priority') {
            newPriority = value;
            if (newPriority.trim().length === 0) {
                newErrors = { ...newErrors, priority: "Priority couldn't be blank" };
            } else {
                if (parseInt(newPriority) < 0 || parseInt(newPriority) > 99) {
                    newErrors = { ...newErrors, priority: "Please enter an integer from 0 to 99. 0 is the hightest priority" };
                }
            }
        }

        setErrors(newErrors);

        setGeneralInfo({
            ...generalInfo, [name]: value
        });


        setRule({
            ...rule,
            name: newName,
            priority: newPriority,
            status: generalInfo.status,
        });


    };

    const options = [
        { label: 'Enable', value: 'enable' },
        { label: 'Disable', value: 'disable' },
    ];

    return (
        <Card title="General information" sectioned>
            <TextField
                label="Name"
                name="name"
                value={generalInfo.name}
                onChange={(value) => handleChange(value, 'name')}
                autoComplete="off"
            />
            {errors.name && <span aria-hidden="true" style={{ color: 'orangered', marginTop: '10px' }}>{errors.name}</span>}
            <TextField
                label="Priority"
                type="number"
                name="priority"
                step="1"
                value={generalInfo.priority}
                onChange={(value) => handleChange(value, 'priority')}
            />
            {errors.priority && <span aria-hidden="true" style={{ color: 'orangered', marginTop: '10px' }}>{errors.priority}</span>}

            <Select
                label="Status"
                name="status"
                options={options}
                value={generalInfo.status}
                onChange={(value) => setGeneralInfo({ ...generalInfo, status: value })}
            />
        </Card>
    );
}

export default GeneralInformation;
