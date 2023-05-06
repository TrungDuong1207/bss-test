const axios = require("axios");
const { queryAllProduct, getProductByCollectionsQuery, getProductByTagQuery  } =  require("../querys/product.query.js");


axios.defaults.baseURL = 'https://store-training-trung-dd.myshopify.com/admin/api/2023-04/';

// Set up the headers for the GraphQL API call
const shopifyHeaders = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": "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"
};

const getProducts = async () => {
    try {
        const response = await axios({
            method: 'POST',
            url: '/graphql.json',
            headers: shopifyHeaders,
            data: {
                query: queryAllProduct
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong!');
    }
};


const getProductByCollections = async (collectionHandles) => {
    try {
        const response = await axios({
            method: 'POST',
            url: '/graphql.json',
            headers: shopifyHeaders,
            data: {
                query: getProductByCollectionsQuery(collectionHandles)
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong!');
    }
};

const getProductByTags = async (tags) => {
    try {
        const response = await axios({
            method: 'POST',
            url: '/graphql.json',
            headers: shopifyHeaders,
            data: {
                query: getProductByTagQuery(tags)
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong!');
    }
};
module.exports = {getProducts, getProductByCollections, getProductByTags}