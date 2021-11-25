const uploadController = require("./multerware");
const fs = require("fs");
var path = require('path');
const sharp = require("sharp");
const imageUtils = require('./imageUtils');

exports.addRoutes = function addRoutes(api) {
  api.route('/').get((_req, res) => {
    res.sendFile(path.resolve('static/form.html'));
  });

  api.route('/hello').get((req, res) => {
    const name = req.query.name || "stranger";
    res.send({ message: `Hello ${name}!` });
  });

  api.route('/magic-image').post(async (req, res) => {
    await uploadController(req, res);

    const { length, width, degrees, format, grayscale, negative } = req.body
    let fileBuffer = req.file.buffer

    if (negative) {
      fileBuffer = await imageUtils.negative(fileBuffer)
    }

    if (grayscale) {
      fileBuffer = await imageUtils.grayscale(fileBuffer)
    }

    if (length > 0 && width > 0) {
      fileBuffer = await imageUtils.resize(fileBuffer, length, width)
    }

    if (degrees > 0) {
      fileBuffer = await imageUtils.rotate(fileBuffer, degrees)
    }

    if (format) {
      fileBuffer = await imageUtils.convert(fileBuffer, format)
    }

    res.contentType(`image/${format}`);
    res.send(fileBuffer);
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
