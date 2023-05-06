import {
    Stack,
    Tag,
    Listbox,
    Combobox,
    Icon,
    TextContainer,
    Button
} from '@shopify/polaris';
import {
    CirclePlusMajor
} from '@shopify/polaris-icons';

import { SearchMinor } from '@shopify/polaris-icons';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { getTags } from '../../services/tagService';
import { getProductsTag } from '../../services/productService';
import { addTags } from '../../services/tagService';

function TagProduct(props) {
    const { onSelectedProductsChange } = props;
    const [deselectedOptions, setDeselectedOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(deselectedOptions);
    const [showAddButton, setShowAddButton] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getTags();
                let valueSelect = response.map(item => ({ value: item, label: item }));
                setDeselectedOptions(valueSelect);
                setOptions(valueSelect);

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (!onSelectedProductsChange) return;

        async function fetchData() {
            try {
                const response = await getProductsTag(selectedOptions);
                onSelectedProductsChange(response)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();

    }, [selectedOptions]);
    
    const updateText = useCallback(
        (value) => {
            setInputValue(value);

            if (value === '') {
                setOptions(deselectedOptions);
                setShowAddButton(false);
                return;
            }

            const filterRegex = new RegExp(value, 'i');
            const resultOptions = deselectedOptions.filter((option) =>
                option.label.match(filterRegex),
            );
            const isNewValue = deselectedOptions.findIndex((option) => option.label.toLowerCase() === value.toLowerCase()) === -1;
            setOptions(resultOptions);
            setShowAddButton(isNewValue && value !== '');
        },
        [deselectedOptions],
    );

    const updateSelection = useCallback(
        (selected) => {
            if (selectedOptions.includes(selected)) {
                setSelectedOptions(
                    selectedOptions.filter((option) => option !== selected),
                );
            } else {
                setSelectedOptions([...selectedOptions, selected]);
            }

            updateText('');
        },
        [selectedOptions, updateText],
    );

    const removeTag = useCallback(
        (tag) => () => {
            const options = [...selectedOptions];
            options.splice(options.indexOf(tag), 1);
            setSelectedOptions(options);
        },
        [selectedOptions],
    );

    const tagsMarkup = selectedOptions.map((option) => (
        <Tag key={`option-${option}`} onRemove={removeTag(option)}>
            {option}
        </Tag>
    ));

    const optionsMarkup =
        options.length > 0
            ? options.map((option) => {
                const { label, value } = option;

                return (
                    <Listbox.Option
                        key={`${value}`}
                        value={value}
                        selected={selectedOptions.includes(value)}
                        accessibilityLabel={label}
                    >
                        {label}
                    </Listbox.Option>
                );
            })
            : null;

    return (
        <div >
            <Combobox
                allowMultiple
                activator={
                    <Combobox.TextField
                        prefix={<Icon source={SearchMinor} />}
                        onChange={updateText}
                        label="Search tags"
                        labelHidden
                        value={inputValue}
                        placeholder="Search tags"
                        autoComplete="off"
                    />
                }
            >
                {optionsMarkup ? (
                    <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
                ) : null}
            </Combobox>
            {showAddButton && (
                <Button plain

                >
                    <div style={{ display: 'flex', gap: "5px" }}
                        onClick={async () => {
                            try {
                                // Thêm tag mới bằng API
                                const response = await addTags(inputValue);

                                // Cập nhật danh sách tag
                                const updatedOptions = response.map(item => ({ value: item, label: item }));;
                                setDeselectedOptions(updatedOptions);
                                setOptions(updatedOptions);

                                //Chọn tag mới thêm
                                // setSelectedOptions([...selectedOptions, inputValue]);
                                setInputValue('');
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        <Icon
                            source={CirclePlusMajor}
                            color="base"
                        />
                        Add "{inputValue}"
                    </div>

                </Button>
            )}
            <TextContainer>
                <Stack>{tagsMarkup}</Stack>
            </TextContainer>
        </div>
    );
}

export default TagProduct;