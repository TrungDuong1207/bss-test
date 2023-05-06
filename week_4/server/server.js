let express = require('express');
let cors = require('cors');
let route = require('./src/routes/index.route.js');

let PORT = 8000;
let app = express();

app.use(cors());
app.use(express.json());

route(app);

app.listen(PORT, function() {
    console.log("App running with port: " + PORT);
});
