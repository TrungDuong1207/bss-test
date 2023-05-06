
class DeviceController {

    static devices = [];

    constructor() {
        this.readDevices();
    }

    async readDevices() {
        const path = require('path');
        let fileDevice = path.join(__dirname, '..', 'data', 'deviceList.json');
        let fs = require("fs");
        const data = fs.readFileSync(fileDevice, { encoding: "utf8", flag: "r" });
        DeviceController.devices = JSON.parse(data);
    }

    static async saveDevice(file) {
        let fs = require("fs");
        const deviceJson = JSON.stringify(DeviceController.devices);
        fs.writeFileSync(file, deviceJson);
    }

    async getDevices(ctx) {
        try {
            ctx.status = 200;
            ctx.body = { success: true, devices: DeviceController.devices };
        } catch (e) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { success: false, message: e.message };
        }
    }


    async createDevices(ctx) {
        try {
            const path = require('path');
            let fileDevice = path.join(__dirname, '..', 'data', 'deviceList.json');
            let device = ctx.request.body;
            let consumption = +device.consumption;
            let macAddress = "01:23:45:67:89:ab";
            let createDate = new Date().toLocaleDateString();
            device = { ...device, macAddress, createDate, consumption }
            DeviceController.devices.push(device);
            await DeviceController.saveDevice(fileDevice);
            ctx.status = 200;
            ctx.body = { success: true, devices: DeviceController.devices };
        } catch (e) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { success: false, message: e.message };
        }
    }
}

module.exports = new DeviceController();