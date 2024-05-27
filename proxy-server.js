/*
        Coded by LoboSSL 2024
        version 1.0
*/
const net = require("net");

//this is the default proxy server port 80 for your hub
const PROXY_SERVER_PORT = 80;
//add so many backend servers you want "hostname:port"
const SERVERS = ["web.server1.com:80","web.server2.com:80","web.server3.com:80","ssl.server4.com:443"]; //Examples..

let CURRENT_SERVER = 0;

const server = net.createServer((clientSocket) =>
{
        handleRequest(clientSocket);
});

function handleRequest(clientSocket)
{
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
