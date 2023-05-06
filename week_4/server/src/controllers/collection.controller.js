// import { getCollections } from "../services/collection.service.js"
const getCollections  = require("../services/collection.service.js");

class CollectionController {
    async getCollections(req, res) {
        try {
            const response = await getCollections();
            const collections = await response.data.shop.collections.edges.map((collection) => {
                return {
                    id: collection.node.id,
                    title: collection.node.title,
                    handle: collection.node.handle
                }
            });
            res.status(200).json(collections);
        } catch (e) {
            console.log(e.message);
            res.status(500).json({ message: e.message })
        }

    }
}

module.exports = new CollectionController();