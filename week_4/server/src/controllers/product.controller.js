// import { getProducts, getProductByCollections, getProductByTags } from "../services/product.service.js";
const { getProducts, getProductByCollections, getProductByTags } = require("../services/product.service.js");

class ProductController {
    async getProducts(req, res) {
        try {
            const response = await getProducts();
            const products = await response.data.products.edges.map((edge) => {
                return {
                    id: edge.node.id,
                    title: edge.node.title,
                    image: edge.node.images.edges[0].node.originalSrc,
                    price: edge.node.variants.edges[0].node.price
                }
            });
            res.status(200).json(products);
        } catch (e) {
            console.log(e.message);
            res.status(500).json({ message: e.message })
        }

    }

    async getProductsFromCollection(req, res) {
        try {
            const collectionHandles = req.query.handles;
            const productsResponse = await getProductByCollections(collectionHandles);
            let products = [];
            collectionHandles.forEach((handle, index) => {
                const collectionName = `collection_${index}`;
                const productEdges = productsResponse.data[collectionName].products.edges;
                productEdges.forEach((edge) => {
                    products.push({
                        id: edge.node.id,
                        title: edge.node.title,
                        image: edge.node.images.edges[0].node.originalSrc,
                        price: edge.node.variants.edges[0].node.price
                    });
                });
            })

            res.status(200).json(products);
        } catch (e) {
            console.log(e.message);
            res.status(500).json({ message: e.message })
        }
    }

    async getProductsFromTag(req, res) {
        try {
            const tags = req.query.tags;
            const tagQuery = tags.map(tag => `tag:${tag}`).join(" AND ");
            const response = await getProductByTags(tagQuery);
            const products = await response.data.products.edges.map((edge) => {
                return {
                    id: edge.node.id,
                    title: edge.node.title,
                    image: edge.node.images.edges[0].node.originalSrc,
                    price: edge.node.variants.edges[0].node.price
                }
            });

            res.status(200).json(products);

        } catch (error) {

        }
    }
}

module.exports = new ProductController();