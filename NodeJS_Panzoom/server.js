
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response) {
    var url = request.url;
    if(url == '/') {
        url = '/index.html';
    }
    
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
});

server.listen(9000, function() {
    console.log('Server is running on port 9000');
});

