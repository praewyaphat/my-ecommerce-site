var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('{"contactSubject": ["Software Developer","System Administrator","Data Analyst","Cybersecurity Specialist","Cloud Engineer","UX/UI Designer","Other"]}');
}).listen(5000);