
class LogController {

    static logs = [];

    constructor() {
        this.randomLogs();
    }

    async randomLogs() {
        const devices = ["TV", " Washer", "Refrigerator", "Selling Fan", "Fan", "Laptop", " Air purifier", "Airconditioner", "Bread Machine "];
        const actions = ["Turn On", "Turn Off", "Sleep"];
        for (let i = 0; i < 100; i++) {
            LogController.logs.push({
                deviceID: i+1,
                name: devices[Math.floor(Math.random() * 9)],
                action: actions[Math.floor(Math.random() * 3)],
                date: new Date().toISOString()
            });
        }
    }

    async getLogs(ctx) {
        try {
            let { page, limit, name } = ctx.query;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            name = name || "";

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            let logs = LogController.logs.filter(log => log.name.toLowerCase().includes(name.toLowerCase()));

            let total = logs.length;

            const totalPages = Math.ceil(logs.length / limit);
            logs = logs.slice(startIndex, endIndex);

            ctx.status = 200;
            ctx.body = {
                success: true,
                logs,
                pagination: {
                    totalPages,
                    currentPage: page
                },
                total
            };
        } catch (e) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { success: false, message: e.message };
        }
    }
}

module.exports = new LogController();