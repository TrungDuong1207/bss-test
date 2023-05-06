import { Button, Modal, Stack, TextContainer, TextField, ResourceList, Thumbnail, Checkbox } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { getProducts } from '../../services/productService';

function ModalSpecific(props) {
    const { isActive, setActive, selectedProducts, onSelectedProductsChange } = props;
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const toggleModal = useCallback(() => {
        setActive(false);
    }, [setActive]);

    const handleClose = useCallback(() => {
        setActive(false);
        onSelectedProductsChange([]);
    }, [setActive, selectedProducts]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getProducts();
                setProducts(response);
                setFilteredProducts(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (searchValue.length > 0) {
          const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchValue.toLowerCase())
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(products);
        }
      }, [searchValue, products]);

    const handleSearchChange = useCallback((value) => {
        setSearchValue(value);
    }, []);

    const handleProductSelection = useCallback((product, checked) => {
        if (checked) {
            const newSelectedProducts = [...selectedProducts, product];
            onSelectedProductsChange(newSelectedProducts);
        } else {
            const newSelectedProducts = selectedProducts.filter((item) => item !== product);
            onSelectedProductsChange(newSelectedProducts);
        }
    }, [selectedProducts, onSelectedProductsChange]);

    const resourceName = {
        singular: 'product',
        plural: 'products',
    };

    return (
        <Modal
            open={isActive}
            onClose={handleClose}
            title="SELECT SPECIFIC PRODUCTS"
            primaryAction={{
                content: 'Select',
                onAction: toggleModal,
            }}
        >
            <Modal.Section>
                <Stack vertical>
                    <Stack.Item>
                        <TextField
                            value={searchValue}
                            onChange={handleSearchChange}
                            autoFocus
                        />
                    </Stack.Item>
                    <Stack.Item>
                        <ResourceList
                            items={filteredProducts}
                            renderItem={(product) => {
                                const { id, title, image } = product;

                                return (
                                    <ResourceList.Item
                                        id={id}
                                        media={<Thumbnail source={image} alt={title} />}
                                        accessibilityLabel={`Select ${title}`}
                                    >
                                        <Stack>
                                            <Stack.Item fill>
                                                <Checkbox
                                                    label={title}
                                                    checked={selectedProducts.includes(product)}
                                                    onChange={(value) => handleProductSelection(product, value)}
                                                />
                                            </Stack.Item>
                                        </Stack>
                                    </ResourceList.Item>
                                );
                            }}
                        />
                    </Stack.Item>
                </Stack>
            </Modal.Section>
        </Modal>
    );
}

export default ModalSpecific;
