const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
var cors = require('cors')
app.use(cors())
// configure storage for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// create an instance of the multer middleware with the specified storage
const upload = multer({ storage: storage });

// route to handle file upload
app.post('/upload', upload.single('file'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

app.listen(3002, () => {
  console.log('Listening on port 3000');
});
