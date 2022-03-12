const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongoConfig: {
        url: 'mongodb://localhost/cw11_zush',
        options: { useNewUrlParser: true }
    }
};