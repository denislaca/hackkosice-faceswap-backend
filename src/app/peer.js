import {ExpressPeerServer} from "peer";
import Express from "express";
import {createServer} from "http";

const app = Express();

app.get('/api/*', async (req, res, next) => {
    res.send('Hello world!');
});

const server = createServer(app);
const peerserver = ExpressPeerServer(server, options);

app.use('/api', peerserver);

server.listen(8080);
