const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  dest: "../uploads"
});

module.exports = upload