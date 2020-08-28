import express, {Express} from "express";

const http = require("http");
const next = require("next");
const bodyParser = require("body-parser");
const isDev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "4000", 10);
const app = next({
    dev: isDev,
    dir: "web"
});
const nextHandler = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    configureExpress(server);
    http.createServer(server).listen(port, () => {
        console.log(`> Server listening at http://localhost:${port} as ${isDev ? 'development' : process.env.NODE_ENV}`);
    });
});

function configureExpress(server: Express) {
    server.use(express.Router().use(bodyParser.json()));
    server.use(require("./api/transactions"));
    server.use(require("./api/account"));
    server.get("*", nextHandler);
}