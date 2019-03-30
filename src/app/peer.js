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
peerserver.on('connection', function(id) { 
    console.log("connected ", id)
});

peerserver.on('disconnect', function(id) { 
    console.log("disconnect ", id)
});
server.listen(8080);
