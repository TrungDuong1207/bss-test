import {
    Card,
    ChoiceList,
    TextField
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from 'react';


function CustomPrices(props) {
    const { selectedProducts, setRule, rule } = props;
    const [selected, setSelected] = useState(['fixed']);
    const [amount, setAmount] = useState(0);

    const handleChangeAmount = useCallback((newValue) => {
        setAmount(parseFloat(newValue));
    }, []);

    useEffect(() => {

        let updatedProducts = [...selectedProducts];

        if (selected[0] === "fixed") {
            updatedProducts = applyFixedDiscount(selectedProducts, amount);
        } else if (selected[0] === "amount") {
            updatedProducts = applyAmountDiscount(selectedProducts, amount);
        } else if (selected[0] === "percentage") {
            updatedProducts = applyPercentageDiscount(selectedProducts, amount);
        }

        setRule({
            ...rule,
            productFinal: updatedProducts.map((product) => ({
                id: product.id,
                title: product.title,
                price: product.price,
                priceFinal: product.priceFinal
            })),
        });

    }, [selected, selectedProducts, setRule, amount])

    const applyFixedDiscount = (selectedProducts, amount) => {
        return selectedProducts.map((product) => ({
            ...product,
            priceFinal: product.price < amount ? product.price : amount,
        }))
    }

    const applyAmountDiscount = (selectedProducts, amount) => {
        return selectedProducts.map((product) => ({
            ...product,
            priceFinal: product.price < amount ? 0 : product.price - amount,
        }))
    }

    const applyPercentageDiscount = (selectedProducts, percentage) => {
        return selectedProducts.map((product) => ({
            ...product,
            priceFinal: +(product.price) * (1 - (percentage / 100)),
        }))
    }


    const handleChange = useCallback(
        (newValue) => {
            setSelected(newValue)
        }, []
    );

    return (
        <Card title="Custom Prices" sectioned>
            <ChoiceList
                choices={[
                    { label: 'Apply a price to selected products', value: 'fixed' },
                    { label: 'Decrease a fixed amount of the original prices of selected products', value: 'amount' },
                    { label: 'Decrease the original prices of selected products by a percentage (%)', value: 'percentage' },
                ]}
                selected={selected}
                onChange={handleChange}
            />
            <TextField
                label="Amount"
                type="number"
                name="amount"
                step="1"
                value={amount}
                onChange={handleChangeAmount}
            />
        </Card>

    );
}

export default CustomPrices;