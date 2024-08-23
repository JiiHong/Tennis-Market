const http = require('http');

function start(route, handle) {
  function onRequest(request, response) {
    const url = new URL(request.url, 'http://localhost:8888');
    const pathname = url.pathname;
    const query = url.searchParams.get('productId');

    route(pathname, handle, response, query);
  }

  http.createServer(onRequest).listen(8080);
}

module.exports.start = start;
