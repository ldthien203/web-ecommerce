const AdminRouter = require("./admin");
const LoginRouter = require("./auth");
const ClientRouter = require("./client");

const routes = (app) => {
    app.use("/", LoginRouter)
    app.use("/admin", AdminRouter)
    app.use("/", ClientRouter)
}

module.exports = routes;
