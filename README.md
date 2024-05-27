[PROXY WEB SERVER]
- Simple web server proxy, you can hide all your servers behind this server.
- Make sure this server is well protected by ddos protection, and great network connection.
- This will act as the HUB of your webservers, and will hide your real backend server ip.

[HOW TO USE]
- Edit the file, add backend server's.
- node web-proxy-server.js

[EXAMPLE]
1) Start this web-proxy-server.js node server
2) Open browser http://127.0.0.1:80/
3) All your backend servers are now hidden behind this proxy server, if one of your backend server fails, it will try next backend server in list.
