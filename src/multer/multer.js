const multer = require('multer');
module.exports = function loadfile(directly_link) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, directly_link)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname)
        }
    })

    var upload = multer({ storage: storage })
    return upload;
}