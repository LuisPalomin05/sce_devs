require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

const startServer = () => {
    const startTime = new Date().toLocaleString();

    app.listen(PORT,  () => {
        console.log("=================================");
        console.log("🚀 SERVER RUNNING");
        console.log(`🌍 Environment: ${ENV}`);
        console.log(`⏰ Start time: ${startTime}`);
        console.log(`🌐 http://localhost:${PORT}`);
        console.log(`📡 API: http://localhost:${PORT}/api`);
        console.log("=================================");
    });
};

startServer();