const fs = require('fs/promises');
const mariadb = require('./database/connect/mariadb');

async function main(response) {
  console.log('main');

  let main_view;
  try {
    main_view = await fs.readFile('./main.html', 'utf-8');
  } catch (err) {
    console.log(err);
  }
  mariadb.query('SELECT * FROM product', (err, data) => {
    console.log(data);
  });

  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.write(main_view);
  response.end();
}

async function redRacket(response) {
  let data;
  try {
    data = await fs.readFile('./img/redRacket.png');
  } catch (err) {
    console.log(err);
  }
  response.writeHead(200, { 'Content-Type': 'image/png;' });
  response.write(data);
  response.end();
}

async function blueRacket(response) {
  let data;
  try {
    data = await fs.readFile('./img/blueRacket.png');
  } catch (err) {
    console.log(err);
  }
  response.writeHead(200, { 'Content-Type': 'image/png;' });
  response.write(data);
  response.end();
}

async function blackRacket(response) {
  let data;
  try {
    data = await fs.readFile('./img/blackRacket.png');
  } catch (err) {
    console.log(err);
  }

  response.writeHead(200, { 'Content-Type': 'image/png;' });
  response.write(data);
  response.end();
}

function order(response, productId) {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  mariadb.query(
    'INSERT INTO orderlist VALUES (?, ?)',
    [productId, new Date().toLocaleDateString()],
    (err, data) => console.log(data),
  );

  response.write('order page');
  response.end();
}

async function orderlist(response) {
  console.log('orderlist');

  let orderlist_view;
  try {
    orderlist_view = await fs.readFile('./orderlist.html', 'utf-8');
  } catch (err) {
    console.log(err);
  }

  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  mariadb.query('SELECT * FROM orderlist', (err, data) => {
    response.write(orderlist_view);

    data.forEach((v) =>
      response.write(`
      <tr>
        <td>${v.product_id}</td>
        <td>${v.order_date}</td>
      </tr>
      `),
    );

    response.write('</table>');
    response.end();
  });
}

const handle = {};
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

module.exports.handle = handle;
