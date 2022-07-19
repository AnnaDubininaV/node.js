const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><h1>Hi there!!! This is assignment # 1</h1><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Users</title><head>');
    res.write(
      `<body>
      <h1>Users!!!</h1>
      <ul>
      <li>User 1</li>
      <li>User 2</li>
      </ul>
      </body>`
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split('=')[1];

      console.log(userName);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Assignment # 1</title><head>');
  res.write('<body><h1>Page not found :( </h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = requestHandler;

// module.exports = {handler: requestHandler}
// exports.handler = requestHandler
