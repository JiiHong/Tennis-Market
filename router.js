function route(pathname, handle, response, productId) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, productId);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write('Not Found');
    response.end();
  }
}

module.exports.route = route;
