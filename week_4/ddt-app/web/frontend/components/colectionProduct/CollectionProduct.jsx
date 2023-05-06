import { Button, Modal, Stack, TextContainer, TextField, ResourceList, Thumbnail, Checkbox } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { getCollections } from '../../services/collectionService';
import { getProductsCollection } from '../../services/productService';

function CollectionProduct(props) {
    const { onSelectedProductsChange } = props;
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [collections, setCollections] = useState([]);
    const [filteredCollections, setFilteredCollections] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getCollections();
                setCollections(response);
                setFilteredCollections(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (searchValue.length > 0) {
            const filtered = collections.filter((collection) =>
                collection.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredCollections(filtered);
        } else {
            setFilteredCollections(collections);
        }
    }, [searchValue, collections]);

    useEffect(() => {
        if (!onSelectedProductsChange) return;

        async function fetchData() {
            try {
                const collectionHandles = selectedCollections.map(collection => collection.handle);
                const response = await getProductsCollection(collectionHandles);
                onSelectedProductsChange(response)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();

    }, [selectedCollections]);

    const handleSearchChange = useCallback((value) => {
        setSearchValue(value);
    }, []);

    const handleCollectionSelection = useCallback((collection, checked) => {
        if (checked) {
            const newSelectedCollections = [...selectedCollections, collection];
            setSelectedCollections(newSelectedCollections);
        } else {
            const newSelectedCollections = selectedCollections.filter((item) => item !== collection);
            setSelectedCollections(newSelectedCollections);
        }
    }, [selectedCollections]);


    return (

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
                    items={filteredCollections}
                    renderItem={(collection) => {
                        const { id, title } = collection;

                        return (
                            <ResourceList.Item
                                id={id}
                                accessibilityLabel={`Select ${title}`}
                            >
                                <Stack>
                                    <Stack.Item fill>
                                        <Checkbox
                                            label={title}
                                            checked={selectedCollections.includes(collection)}
                                            onChange={(value) => handleCollectionSelection(collection, value)}
                                        />
                                    </Stack.Item>
                                </Stack>
                            </ResourceList.Item>
                        );
                    }}
                />
            </Stack.Item>
        </Stack>

    );
}

export default CollectionProduct;
