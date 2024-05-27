/*
        Simple Proxy Server

        [Coded by LoboSSL 2024]

        - Added Multiple Servers, if server is down try next in list [SERVERS].
*/
let express = require("express");
let request = require("request");

let app = express();

let FAKE_SERVER_PORT = 80;

let SERVERS = ["http://localhost:4441","http://localhost:4442","http://localhost:3331"]; //Add servers

let CURRENT_SERVER = 0

app.all("*",(req,res) =>
{
        con(req,res);
});

function con(req,res)
{
        request(SERVERS[CURRENT_SERVER] + req.url,(error,response,body) =>
        {
                if(!error && response.statusCode === 200)
                {
                        res.send(body);
                }
                else
                {
                        if(CURRENT_SERVER == SERVERS.length)
                        {
                                CURRENT_SERVER = 0
                        }
                        else
                        {
                                CURRENT_SERVER += 1

                                con(req,res);
                        }
                }
        });
}

app.listen(FAKE_SERVER_PORT,() =>
{
        console.log("Started Proxy Server On Port:",FAKE_SERVER_PORT);
});
