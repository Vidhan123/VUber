const multer = require('multer');

exports.storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    let ext;
    switch (file.mimetype) {
      case 'image/png':
        ext = '.png';
        break;
      case 'image/jpg':
        ext = '.jpg';
        break;
      case 'image/jpeg':
        ext = '.jpeg';
        break;
      default:
        break;
    }
    cb(null, `${req.body.email}${ext}`);
  },
});

exports.fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  )
    cb(null, true);
  else cb(null, false);
};
