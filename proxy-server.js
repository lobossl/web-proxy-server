//load net module
const net = require("net");

//set port to proxy server
const PROXY_SERVER_PORT = 80;

//add servers by adding "hostname:port"
const SERVERS = ["localhost:3331","localhost:3332","localhost:3333"];

//starting at index 0
let CURRENT_SERVER = 0;

const server = net.createServer((clientSocket) =>
{
        handleRequest(clientSocket);
});

function handleRequest(clientSocket)
{
        //split hostname:port
        const [host, port] = SERVERS[CURRENT_SERVER].split(":");

        const serverSocket = net.connect(port,host,() =>
        {
                clientSocket.pipe(serverSocket);
                serverSocket.pipe(clientSocket);
        });

        serverSocket.on("error",() =>
        {
                CURRENT_SERVER = (CURRENT_SERVER + 1) % SERVERS.length;

                if(CURRENT_SERVER === 0)
                {
                        clientSocket.end("unable to find a server to connect to right now, please try again later");
                }
                else
                {
                        handleRequest(clientSocket);
                }
        });

        clientSocket.on("error",() =>
        {
                serverSocket.end();
        });

        clientSocket.on("end",() =>
        {
                serverSocket.end();
        });
}

server.listen(PROXY_SERVER_PORT,() =>
{
        console.log("Started Proxy Server On Port:", PROXY_SERVER_PORT);
});
