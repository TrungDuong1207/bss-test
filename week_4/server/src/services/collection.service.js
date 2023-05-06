const axios = require("axios");
const queryCollections  = require( "../querys/collection.query.js") ;

axios.defaults.baseURL = 'https://store-training-trung-dd.myshopify.com/admin/api/2023-04/';

// Set up the headers for the GraphQL API call
const shopifyHeaders = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": "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"
};



const getCollections = async () => {
    try {
        const response = await axios({
            method: 'POST',
            url: '/graphql.json',
            headers: shopifyHeaders,
            data: {
                query: queryCollections
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Something went wrong!');
    }
};

module.exports = getCollections;