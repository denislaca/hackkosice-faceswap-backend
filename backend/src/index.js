import {ExpressPeerServer} from "peer";
import Express from "express";
import {createServer} from "http";
import wLogger from "./logger";

const app = Express();
const logger = wLogger.create("index peer");
app.get("/api/*", async (req, res, next) => {
	res.send("Oh no a bug");
});

const server = createServer(app);
const options = {
	debug: true
};
const peerserver = ExpressPeerServer(server, options);

app.use("/api", peerserver);
peerserver.on("connection", function(id) { 
	logger.info(`Connected with id ${id}`);
});

peerserver.on("disconnect", function(id) { 
	logger.info(`Disconnected with id ${id}`);
});
console.log("server running on port 8080");
server.listen(8080);
