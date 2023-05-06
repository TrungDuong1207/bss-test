import { Card, DataTable } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';


function ProductShow(props) {
    const { curentRule } = props;

    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (!curentRule || !curentRule.productFinal) return;
        const newRows = curentRule.productFinal.map((product) => [product.title, product.price, product.priceFinal]);
        setRows(newRows);
    }, [curentRule]);

    return (
        <Card>
            <DataTable
                verticalAlign={"top"}
                columnContentTypes={[
                    'text',
                    'text',
                    'text',
                ]}
                headings={[
                    'Title',
                    "Original Price ($)",
                    'Modified Price ($)',
                ]}
                rows={rows}
            />
        </Card>
    );

}

export default ProductShow;