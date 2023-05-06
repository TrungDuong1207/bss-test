import {
    Card,
    RadioButton,
    ResourceList,
    TextField,
    Thumbnail
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';
import CollectionProduct from '../colectionProduct/CollectionProduct';
import CustomPrices from '../customPrices/CustomPrices';
import ModalSpecific from '../modal/ModalSpecific';
import TagProduct from '../tagProduct/TagProduct';

function ApplyProduct(props) {
    const {setRule, rule} = props;
    const [value, setValue] = useState('all');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isModalActive, setIsModalActive] = useState(true);

    const handleChange = useCallback((newValue) => {
        if (newValue === "all") {
            async function fetchData() {
                try {
                    const response = await getProducts();
                    setSelectedProducts(response)
                    setValue(newValue);
                } catch (error) {
                    console.error(error);
                }
            }
            fetchData()
        }
        setValue(newValue);
        setSelectedProducts([]);

    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getProducts();
                setSelectedProducts(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const handleSelectedProducts = useCallback((newSelectedProducts) => {
        setSelectedProducts(newSelectedProducts);
    }, []);

    const handleFocus = useCallback(() => {
        setIsModalActive(true);
    }, []);

    return (
        <>
            <Card title="Apply to Products" sectioned>
                <div>
                    <RadioButton
                        label="All products"
                        checked={value === 'all'}
                        id="all"
                        name="applyProduct"
                        onChange={() => handleChange('all')}
                    />
                </div>
                <div>
                    <RadioButton
                        label="Specific products"
                        name="applyProduct"
                        checked={value === 'specific'}
                        onChange={() => handleChange('specific')}
                    />
                </div>

                {value.includes('specific') && (
                    <>
                        <TextField placeholder='Search product' onFocus={handleFocus} />
                        <ModalSpecific
                            isActive={isModalActive}
                            setActive={setIsModalActive}
                            selectedProducts={selectedProducts}
                            onSelectedProductsChange={handleSelectedProducts}
                        />
                        <ResourceList
                            items={selectedProducts}
                            renderItem={(product) => {
                                const { id, title, image } = product;
                                return (
                                    <ResourceList.Item
                                        id={id}
                                        media={<Thumbnail source={image} alt={title} />}
                                        accessibilityLabel={`Select ${title}`}
                                    >
                                        {title}
                                    </ResourceList.Item>
                                );
                            }}
                        />

                    </>
                )}

                <div>
                    <RadioButton
                        label="Product collections"
                        name="applyProduct"
                        checked={value === 'collections'}
                        onChange={() => handleChange('collections')}
                    />
                </div>

                {value.includes('collections') && (
                    <>
                        <CollectionProduct onSelectedProductsChange={handleSelectedProducts} />
                    </>
                )}
                <div>
                    <RadioButton
                        label="Product Tags"
                        name="applyProduct"
                        checked={value === 'tags'}
                        onChange={() => handleChange('tags')}
                    />
                </div>

                {value.includes('tags') && (
                    <>
                        <TagProduct onSelectedProductsChange={handleSelectedProducts} />
                    </>
                )}

            </Card>

            <CustomPrices selectedProducts={selectedProducts} setRule={setRule} rule={rule}/>
        </>

    );
}

export default ApplyProduct;

