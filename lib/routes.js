const fs = require('fs');

exports.addRoutes = function addRoutes(api) {

  api.route('/hello').get((req, res) => {
    const name = req.query.name || "stranger";
    res.send({ message: `Hello ${name}!` });
  });

  api.route('/favicon.ico').get((_req, res) => {
    fs.readFile('static/favicon.ico', (err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.contentType('image/png');
        res.send(data);
      }
    });
  });

}
