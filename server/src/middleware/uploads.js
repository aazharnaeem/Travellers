const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, 'uploads' + '-' + Date.now() + path.extname(file.origionalname));
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})

module.exports = upload