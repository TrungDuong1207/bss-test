const path = require('path');
const fs = require("fs");

class TagController {
    static tags = [];

    constructor() {
        this.readTags();
    }

    // async init() {
    //     await this.readTags();
    // }

    async readTags() {
        let fileTag = path.join(__dirname, '..', 'data', 'tagData.json');
        const data = fs.readFileSync(fileTag, { encoding: "utf8", flag: "r" });
        TagController.tags = JSON.parse(data);
    }

    static async saveTag(file) {
        const tagJson = JSON.stringify(TagController.tags);
        fs.writeFileSync(file, tagJson);
    }

    async getTags(req, res) {
        try {
            // await (new TagController()).init();
            res.status(200).json(TagController.tags);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message })
        }
    }

    async createTags(req, res) {
        try {
            let tag = req.body.tag;
            let fileTag = path.join(__dirname, '..', 'data', 'tagData.json');
            TagController.tags.push(tag);
            await TagController.saveTag(fileTag)
            res.status(200).json(TagController.tags);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = new TagController();