const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname,'../files/'))
  },
  filename: function(req, file, cb) {
    const date = new Date();
    const isinamafile = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+'-'+ date.getTime()+file.originalname.replace(/ /g, "");
    cb(null, isinamafile)
  }
})
const fileGambar = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true);
  else
    cb(null, false);
};
const fileDoc = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
      cb(null, true);
    else
      cb(null, false);
  };
const uploadGambar = multer({storage:storage, fileFilter:fileGambar});
const uploadDoc = multer({storage:storage, fileFilter:fileDoc});
const uploadApaaja = multer({storage:storage});

module.exports = { uploadGambar, uploadDoc, uploadApaaja };